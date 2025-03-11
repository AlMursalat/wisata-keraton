require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');
const wisataRoutes = require('./routes/wisataRoutes');
const lawaRoutes = require('./routes/lawaRoutes');
const baluaraRoutes = require('./routes/baluaraRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔹 Menyajikan gambar dari folder public/images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// 🔹 Pastikan route benar
app.use('/api/wisata', wisataRoutes);

app.use('/api/lawa', lawaRoutes);

app.use('/api/baluara', baluaraRoutes);

// 🔹 Error Handling Middleware (Menangani Route yang Tidak Ditemukan)
app.use((req, res) => {
    res.status(404).json({ error: "Route tidak ditemukan" });
});

// 🔹 Menjalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

