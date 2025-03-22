const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const pool = require("../config/db"); // Sesuaikan dengan konfigurasi database

// Konfigurasi penyimpanan gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// 🔹 GET semua slider
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM sliders");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching sliders:", error);
        res.status(500).json({ error: "Gagal mengambil data sliders" });
    }
});

// 🔹 POST tambah slider
router.post("/", upload.single("gambar"), async (req, res) => {
    try {
        const { nama } = req.body;
        const gambar = req.file ? req.file.filename : null;

        if (!nama || !gambar) {
            return res.status(400).json({ error: "Nama dan gambar harus diisi!" });
        }

        const result = await pool.query(
            "INSERT INTO sliders (nama, gambar) VALUES ($1, $2) RETURNING *",
            [nama, gambar]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error menambahkan slider:", error);
        res.status(500).json({ error: "Gagal menambahkan slider" });
    }
});

// 🔹 DELETE slider
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM sliders WHERE id = $1", [id]);
        res.json({ message: "Slider berhasil dihapus" });
    } catch (error) {
        console.error("Error menghapus slider:", error);
        res.status(500).json({ error: "Gagal menghapus slider" });
    }
});

module.exports = router;
