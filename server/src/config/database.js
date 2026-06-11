/**
 * Reusable PostgreSQL connection pool for Render PostgreSQL.
 * The pool is created only when DATABASE_URL is configured.
 */
const { Pool } = require("pg");
const { env } = require("./environment");

const pool = env.databaseUrl
  ? new Pool({
      connectionString: env.databaseUrl,
      ssl: env.isProduction ? { rejectUnauthorized: false } : false,
    })
  : null;

const query = async (text, params = []) => {
  if (!pool) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return pool.query(text, params);
};

module.exports = {
  pool,
  query,
};
