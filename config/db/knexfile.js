
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {
    staging: {
      client: 'postgresql',
      connection: {
        database: 'Analytics',
        user:     'postgres',
        password: '123'
      },
      acquireConnectionTimeout: 1000000,
      pool: {
        min: 2,
        max: 1000000
      }
    }
  };