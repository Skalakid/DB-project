import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '1521';
const DB_DATABASE = process.env.DB_DATABASE || 'mydb';
const DB_USER = process.env.DB_USER || 'user';
const DB_PASS = process.env.DB_PASS || 'password';

const ORACLE = {
  host: DB_HOST,
  database: DB_DATABASE,
  port: DB_PORT,
  user: DB_USER,
  pass: DB_PASS,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'megasecretAccess';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'megasecretRefresh';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  tokens: {
    accessTokenSecret: ACCESS_TOKEN_SECRET,
    refreshTokenSecret: REFRESH_TOKEN_SECRET,
  },
};

const config = {
  oracle: ORACLE,
  server: SERVER,
};

export default config;
