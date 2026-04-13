const dbConfig = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "postgres",
    PASSWORD: process.env.DB_PASSWORD || "root",
    DB: process.env.DB_NAME || "todo"
};

export default dbConfig;

// DB_HOST=localhost
// DB_USER=postgres
// DB_PASSWORD=root
// DB_NAME=todo
// DB_PORT=5432 