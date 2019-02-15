const dotenv = require('dotenv');

dotenv.config();

const dbconfig = {
  test: process.env.DB_TEST,
  development: process.env.DB_DEV,
  production: process.env.DATABASE_URL,
  dbEnv: process.env.NODE_ENV || 'development',
};

module.exports = dbconfig;