const { Client } = require("pg")
const postgresConfig = require("../../config/db/postgres/config.json")

const connectionString = `postgresql://${postgresConfig.username}:${postgresConfig.password}@${postgresConfig.host}:${postgresConfig.port}/${postgresConfig.database}`;

const client = new Client({
  connectionString: connectionString
});

client.connect()
.then(() => {
  console.log('Connected to PostgreSQL');
})
.catch(err => {
  console.error('Error connecting to PostgreSQL:', err);
  process.exit(1); // Exit the process if connection fails
})

module.exports = client;