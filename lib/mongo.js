// lib/mongo.js
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let db;
async function getDb() {
  if (!db) {
    await client.connect();
    db = client.db(); // default db from URI
  }
  return db;
}

module.exports = { getDb };
