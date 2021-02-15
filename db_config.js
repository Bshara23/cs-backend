const Pool = require ('pg').Pool;

const local = {
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: '5432',
  database: 'pcshop',
};
const remote = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool (process.env.NODE_ENV === 'production' ? remote : local);

module.exports = pool;
