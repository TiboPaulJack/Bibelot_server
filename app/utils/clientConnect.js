const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.NODE_ENV === "production" ? process.env.DATABASE_URL : '',
  ssl: process.env.NODE_ENV === "production" ? {
    rejectUnauthorized: false
  } : false,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Error connecting to database:", error);
  });

module.exports = pool;
