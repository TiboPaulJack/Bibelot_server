// require dotenv
/*require("dotenv").config();*/
const debug = require("debug")("3db: clientConnect");


/**
 * @description - connect to database
 * @returns {object} - database connection
 */
const { Client } = require("pg");
const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PG_DATABASE,
  port: process.env.PGPORT
});
client.connect();



module.exports = client;
