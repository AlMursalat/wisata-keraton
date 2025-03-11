const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET semua lawa
router.get('/', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT id, nama, deskripsi_id, deskripsi_en, gambar, latitude, longitude
            FROM lawa
        `);
        res.json(result.rows);
    } catch (error) {
        console.error("Gagal mengambil data lawa:", error);
        res.status(500).json({ error: "Gagal mengambil data lawa" });
    }
});

// GET lawa by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(`
            SELECT id, nama, deskripsi_id, deskripsi_en, gambar, latitude, longitude
            FROM lawa WHERE id = $1
        `, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Lawa tidak ditemukan" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Gagal mengambil data lawa:", error);
        res.status(500).json({ error: "Gagal mengambil data lawa" });
    }
});

// POST (Tambah Lawa)
router.post('/', async (req, res) => {
    const { nama, deskripsi_id, deskripsi_en, gambar, latitude, longitude } = req.body;

    try {
        const query = `
            INSERT INTO lawa (nama, deskripsi_id, deskripsi_en, gambar, latitude, longitude)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [nama, deskripsi_id, deskripsi_en, gambar, latitude, longitude];

        const result = await db.query(query, values);
        res.status(201).json({ message: "Lawa berhasil ditambahkan", data: result.rows[0] });
    } catch (error) {
        console.error("Gagal menambahkan data lawa:", error);
        res.status(500).json({ error: "Gagal menambahkan data lawa" });
    }
});

// PUT (Update Lawa)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nama, deskripsi_id, deskripsi_en, gambar, latitude, longitude } = req.body;

    try {
        const query = `
            UPDATE lawa
            SET nama = $1, deskripsi_id = $2, deskripsi_en = $3, gambar = $4, latitude = $5, longitude = $6
            WHERE id = $7
            RETURNING *;
        `;
        const values = [nama, deskripsi_id, deskripsi_en, gambar, latitude, longitude, id];

        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Lawa tidak ditemukan" });
        }

        res.json({ message: "Lawa berhasil diperbarui", data: result.rows[0] });
    } catch (error) {
        console.error("Gagal memperbarui data lawa:", error);
        res.status(500).json({ error: "Gagal memperbarui data lawa" });
    }
});

// DELETE (Hapus Lawa)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(`DELETE FROM lawa WHERE id = $1 RETURNING *`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Lawa tidak ditemukan" });
        }
        res.json({ message: "Lawa berhasil dihapus" });
    } catch (error) {
        console.error("Gagal menghapus data lawa:", error);
        res.status(500).json({ error: "Gagal menghapus data lawa" });
    }
});

module.exports = router;
