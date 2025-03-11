const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Ambil semua data wisata
router.get('/', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT id, nama, deskripsi_id, deskripsi_en, 
                   ST_X(lokasi) AS longitude, 
                   ST_Y(lokasi) AS latitude, 
                   gambar 
            FROM wisata
        `);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Data wisata tidak ditemukan" });
        }

        res.json(result.rows);
    } catch (error) {
        console.error("Error mengambil data wisata:", error.message);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
});

// Ambil data wisata berdasarkan ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(`
            SELECT id, nama, deskripsi_id, deskripsi_en, 
                   ST_X(lokasi) AS longitude, 
                   ST_Y(lokasi) AS latitude, 
                   gambar 
            FROM wisata WHERE id = $1
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Wisata tidak ditemukan" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error mengambil data wisata berdasarkan ID:", error.message);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
});

// Tambah wisata baru
router.post('/', async (req, res) => {
    const { nama, deskripsi_id, deskripsi_en, longitude, latitude, gambar } = req.body;

    try {
        const query = `
            INSERT INTO wisata (nama, deskripsi_id, deskripsi_en, lokasi, gambar) 
            VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326), $6)
            RETURNING *;
        `;
        const values = [nama, deskripsi_id, deskripsi_en, longitude, latitude, gambar];

        const result = await db.query(query, values);
        res.status(201).json({ message: "Wisata berhasil ditambahkan", data: result.rows[0] });
    } catch (error) {
        console.error("Error menambahkan data wisata:", error);
        res.status(500).json({ error: "Terjadi kesalahan saat menambahkan data wisata" });
    }
});



// Update data wisata
router.put('/:id', async (req, res) => {
    const { nama, deskripsi_id, deskripsi_en, gambar, latitude, longitude } = req.body;
    const { id } = req.params;
    try {
        await db.query(`
            UPDATE wisata 
            SET nama=$1, deskripsi_id=$2, deskripsi_en=$3, gambar=$4, lokasi=ST_SetSRID(ST_MakePoint($5, $6), 4326)
            WHERE id=$7
        `, [nama, deskripsi_id, deskripsi_en, gambar, longitude, latitude, id]);
        res.json({ message: 'Wisata berhasil diperbarui' });
    } catch (error) {
        res.status(500).json({ error: 'Gagal memperbarui data' });
    }
});

// Hapus wisata berdasarkan ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM wisata WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Data wisata tidak ditemukan" });
        }

        res.json({ message: "Data wisata berhasil dihapus" });
    } catch (error) {
        console.error("Error menghapus data wisata:", error);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
});




module.exports = router;
