const { MongoClient, ServerApiVersion } = require('mongodb');
const logger = require("../../utilities/logger")

const mongoConfig = require('../../config/db/mongo/config.json');

const uri = `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}/?retryWrites=true&w=majority&appName=Nivo`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const db = client.db(mongoConfig.database);
logger.info("Pinged your deployment. You successfully connected to MongoDB!")
module.exports = db;
