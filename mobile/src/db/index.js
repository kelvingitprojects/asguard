import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { mySchema } from './schema'
import Ping from './model/Ping'

const adapter = new SQLiteAdapter({
  schema: mySchema,
  // (You might want to comment out migrationEvents for now or implement them)
  // migrations,
  jsi: true, /* Platform.OS === 'ios' */
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
    console.error('Database setup error', error)
  }
})

export const database = new Database({
  adapter,
  modelClasses: [
    Ping,
  ],
})
