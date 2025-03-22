require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');
const wisataRoutes = require('./routes/wisataRoutes');
const lawaRoutes = require('./routes/lawaRoutes');
const baluaraRoutes = require('./routes/baluaraRoutes');
const sliderRoutes = require("./routes/sliderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Tambahkan untuk menangani form-data

// 🔹 Menyajikan gambar dari folder public/images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// 🔹 Menyajikan gambar dari folder uploads (untuk slider)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔹 Menambahkan semua route yang diperlukan
app.use('/api/wisata', wisataRoutes);
app.use('/api/lawa', lawaRoutes);
app.use('/api/baluara', baluaraRoutes);
app.use("/api/sliders", sliderRoutes);

// 🔹 Error Handling Middleware (Menangani Route yang Tidak Ditemukan)
app.use((req, res) => {
    res.status(404).json({ error: "Route tidak ditemukan" });
});

// 🔹 Menjalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
