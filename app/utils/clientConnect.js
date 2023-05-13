// require dotenv
/*require("dotenv").config();*/
const debug = require("debug")("3db: clientConnect");

const { Client } = require('pg');

const pool = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

module.exports = pool;

