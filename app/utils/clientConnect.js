// require dotenv
/*require("dotenv").config();*/
const debug = require("debug")("3db: clientConnect");


/**
 * @description - connect to database
 * @returns {object} - database connection
 */
const { Pool } = require("pg");
const pool = new Pool({
  
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
  
});
pool.connect;

/**
 * @description - export pool
 */
module.exports = pool;
