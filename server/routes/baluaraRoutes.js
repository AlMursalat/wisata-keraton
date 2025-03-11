const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ GET semua baluara
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM baluara');
        res.json(result.rows);
    } catch (error) {
        console.error("Gagal mengambil data baluara:", error);
        res.status(500).json({ error: "Gagal mengambil data baluara" });
    }
});

// ✅ GET baluara berdasarkan ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM baluara WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Baluara tidak ditemukan" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Gagal mengambil data baluara:", error);
        res.status(500).json({ error: "Gagal mengambil data baluara" });
    }
});

// ✅ POST tambah baluara
router.post('/', async (req, res) => {
    const { nama, deskripsi_id, deskripsi_en, latitude, longitude, gambar } = req.body;
    try {
        await db.query(`
            INSERT INTO baluara (nama, deskripsi_id, deskripsi_en, latitude, longitude, gambar) 
            VALUES ($1, $2, $3, $4, $5, $6)
        `, [nama, deskripsi_id, deskripsi_en, latitude, longitude, gambar]);
        res.status(201).json({ message: "Baluara berhasil ditambahkan" });
    } catch (error) {
        console.error("Gagal menambahkan baluara:", error);
        res.status(500).json({ error: "Gagal menambahkan baluara" });
    }
});

// ✅ PUT edit baluara berdasarkan ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nama, deskripsi_id, deskripsi_en, latitude, longitude, gambar } = req.body;
    try {
        const result = await db.query(`
            UPDATE baluara 
            SET nama = $1, deskripsi_id = $2, deskripsi_en = $3, latitude = $4, longitude = $5, gambar = $6
            WHERE id = $7
        `, [nama, deskripsi_id, deskripsi_en, latitude, longitude, gambar, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Baluara tidak ditemukan" });
        }

        res.json({ message: "Baluara berhasil diperbarui" });
    } catch (error) {
        console.error("Gagal memperbarui baluara:", error);
        res.status(500).json({ error: "Gagal memperbarui baluara" });
    }
});

// ✅ DELETE hapus baluara berdasarkan ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM baluara WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Baluara tidak ditemukan" });
        }

        res.json({ message: "Baluara berhasil dihapus" });
    } catch (error) {
        console.error("Gagal menghapus baluara:", error);
        res.status(500).json({ error: "Gagal menghapus baluara" });
    }
});

module.exports = router;
