// config/db.js
import dbConfig from '../config/dbconfig.js';
import pkg from 'pg';

const { Pool } = pkg;

let connection;

if (dbConfig.DATABASE_URL) {
    connection = new Pool({
        connectionString: dbConfig.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
        // Important: Neon pooler ke liye
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
    });
    
    // Better connection handling
    connection.on('error', (err) => {
        console.error('Unexpected database error:', err.message);
    });
    
    console.log('📡 Neon Database configured');
} else {
    console.error('❌ DATABASE_URL not found in .env file');
}

// Test connection (improved)
const testConnection = async () => {
    try {
        const client = await connection.connect();
        console.log('✅ Database connected successfully!');
        client.release();
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        // Retry after 5 seconds
        setTimeout(testConnection, 5000);
    }
};

testConnection();

export default connection;