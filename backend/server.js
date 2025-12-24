const fastify = require('fastify')({ logger: true })
const { PrismaClient } = require('@prisma/client')
const mercurius = require('mercurius')
const arcjet = require('@arcjet/node')

// Load environment variables (dotenv usually needed, but fastify has plugins or just use process.env)
// Assuming DATABASE_URL is set in env
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/asguard'

// 1. Database Connection: Prisma (Business Lane)
const prisma = new PrismaClient()

// 2. Database Connection: Fastify Postgres (Fast Path)
fastify.register(require('@fastify/postgres'), {
  connectionString: DATABASE_URL
})

// 3. Security: Arcjet (Rate Limiting)
const aj = arcjet({
  key: process.env.ARCJET_KEY || 'aj_mock_key', // Replace with real key in prod
  rules: [
    arcjet.tokenBucket({
      mode: "LIVE", // or "DRY_RUN"
      refillRate: 1000, // 1000 tokens per interval
      interval: 60, // 60 seconds
      capacity: 5000,
    }),
  ],
})

// Middleware/Plugin for Arcjet
fastify.addHook('onRequest', async (req, reply) => {
  if (req.url.startsWith('/v1/sentinel/ping')) {
    const decision = await aj.protect(req, { requested: 1 }) // Deduct 1 token
    if (decision.isDenied()) {
      reply.code(429).send({ error: 'Too Many Requests', reason: decision.reason })
    }
  }
})

// 4. GraphQL: The "Business Lane" (Users, Billing, etc.)
const schema = `
  type Query {
    users: [User]
    taxis: [Taxi]
  }
  type User {
    id: Int
    email: String
    name: String
  }
  type Taxi {
    id: Int
    plate: String
    owner: User
  }
`

const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany()
    },
    taxis: async () => {
      return await prisma.taxi.findMany({ include: { owner: true } })
    }
  }
}

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true
})

// 5. The "Fast Path": Ingestion (Raw SQL)
// Bypasses Prisma for high-throughput sensor data
fastify.post('/v1/sentinel/ping', async (req, reply) => {
  const { sentinel_id, latitude, longitude, speed, heading, timestamp } = req.body

  // Validation (Simple check, can be improved with schema validation)
  if (!sentinel_id || !latitude || !longitude) {
    return reply.code(400).send({ error: 'Missing required fields' })
  }

  // Raw SQL Insert
  // Using TimescaleDB hypertable 'pings'
  const query = `
    INSERT INTO pings (time, sentinel_id, latitude, longitude, speed, heading)
    VALUES ($1, $2, $3, $4, $5, $6)
  `
  
  const ts = timestamp ? new Date(timestamp) : new Date()

  try {
    const client = await fastify.pg.connect()
    try {
      await client.query(query, [ts, sentinel_id, latitude, longitude, speed || 0, heading || 0])
    } finally {
      client.release()
    }
    return { status: 'ok' }
  } catch (err) {
    fastify.log.error(err)
    return reply.code(500).send({ error: 'Internal Server Error' })
  }
})

// Health Check
fastify.get('/ping', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
    console.log(`Server listening at http://localhost:3000`)
    console.log(`GraphQL playground at http://localhost:3000/graphiql`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
