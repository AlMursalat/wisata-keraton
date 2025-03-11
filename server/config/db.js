const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "benteng_keraton",
    password: process.env.DB_PASSWORD || "admin",
    port: process.env.DB_PORT || 5432,
});

pool.connect((err, client, release) => {
    if (err) {
        console.error("❌ Gagal terhubung ke database:", err.stack);
    } else {
        console.log("✅ Terhubung ke database PostgreSQL!");
        release();
    }
});

module.exports = pool;
