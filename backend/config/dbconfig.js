// config/dbconfig.js
import dotenv from 'dotenv';
dotenv.config();
const dbConfig = {
    // Local development के लिए (optional - अगर local DB bhi use karna हो)
    // HOST: process.env.DB_HOST || "localhost",
    // USER: process.env.DB_USER || "postgres",
    // PASSWORD: process.env.DB_PASSWORD || "root",
    // DB: process.env.DB_NAME || "todo",
    
    // Neon specific - connection string direct use करने के लिए
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_zCEsi4SR8YPX@ep-old-mountain-an3xczoq-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    
    
    // Neon के लिए SSL required hai
    SSL: true
};

export default dbConfig;


