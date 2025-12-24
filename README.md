# Asguard: Guardian

"We see you."

Asguard is a high-performance Guardian Tech stack optimized for the South African landscape (AWS Cape Town) and the technical hurdles of the taxi industry.

## Tech Stack (The "9/10" Upgrade)

### Backend ("The Ping Engine")
- **Framework**: Fastify (Node.js)
- **Ingestion**: "Fast Path" using Raw SQL (`@fastify/postgres`) for sub-millisecond ping ingestion.
- **Business Logic**: "Lane B" using GraphQL (`mercurius`) + Prisma ORM.
- **Database**: PostgreSQL + PostGIS + TimescaleDB (Hypertables for time-series pings).
- **Security**: Arcjet for rate limiting.
- **Infrastructure**: Docker Compose (Local), ready for AWS App Runner + PgBouncer.

### Mobile ("The Witness")
- **Framework**: React Native (Expo with Development Client).
- **BLE Management**: `react-native-ble-plx` (Background scanning).
- **Persistence**: WatermelonDB (Offline-first sync).

## Project Structure

- `backend/`: Fastify API server.
- `mobile/`: React Native Expo app.
- `infrastructure/`: Docker Compose and IaC configs.

## Getting Started

### Backend

1. Navigate to `backend/`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the database (Postgres + TimescaleDB):
   ```bash
   cd ../infrastructure
   docker-compose up -d
   ```
4. Initialize Prisma:
   ```bash
   cd ../backend
   npx prisma migrate dev
   ```
5. Run the server:
   ```bash
   node server.js
   ```

### Mobile

1. Navigate to `mobile/`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development client:
   ```bash
   npx expo start --dev-client
   ```

## Key Features

- **Fast Path Ingestion**: `/v1/sentinel/ping` bypasses heavy ORM logic for raw speed.
- **TimescaleDB**: Automatically partitions ping data for efficient time-series queries.
- **WatermelonDB**: Stores pings locally on the device when offline and syncs when back online.
- **BLE Scanning**: Scans for other "Guardian" devices to form a mesh network (Store-and-Forward).
