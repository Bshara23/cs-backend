const Pool = require ('pg').Pool;

const local = {
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: '5432',
  database: 'pcshop',
  ssl: true,
};
const remote = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool (process.env.NODE_ENV === 'production' ? remote : local);

module.exports = pool;
