import dbConfig from '../config/dbconfig.js';
import pkg from 'pg';

const { Pool } = pkg;

const connection = new Pool({
    user: dbConfig.USER,
    host: dbConfig.HOST,
    database: dbConfig.DB,
    password: dbConfig.PASSWORD,
    port: 5432,
});

export default connection;