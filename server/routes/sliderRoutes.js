const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Sesuaikan dengan database Anda

// 🔹 Ambil semua slider
router.get('/', async (req, res) => {
    try {
        const sliders = await db.query("SELECT * FROM sliders");
        res.json(sliders.rows);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data slider" });
    }
});

// 🔹 Tambah slider baru
router.post('/', async (req, res) => {
    const { gambar } = req.body;
    try {
        await db.query("INSERT INTO sliders (gambar) VALUES ($1)", [gambar]);
        res.json({ message: "Slider berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan slider" });
    }
});

// 🔹 Hapus slider
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM sliders WHERE id = $1", [id]);
        res.json({ message: "Slider berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus slider" });
    }
});

module.exports = router;
