import React, { useState } from 'react';
import BackButton from '../admin/BackButton';
import '../../css/style.css';
import { tambahWisata } from '../../api';
import { useNavigate } from 'react-router-dom';

const TambahWisata = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nama: '',
        deskripsi_id: '',
        deskripsi_en: '',
        longitude: '',
        latitude: '',
        gambar: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await tambahWisata(formData);
            alert('Data wisata berhasil ditambahkan!');
            navigate('/admin/manajemen-wisata');  // Redirect ke manajemen wisata
        } catch (error) {
            alert('Gagal menambahkan data. Silakan coba lagi.');
        }
    };

    return (
        <div className="admin-container">
            <BackButton />
            <h2>Tambah Wisata Baru</h2>
            <form className="form-admin" onSubmit={handleSubmit}>
                <label>Nama Wisata</label>
                <input type="text" name="nama" value={formData.nama} onChange={handleChange} required />

                <label>Deskripsi (ID)</label>
                <textarea name="deskripsi_id" value={formData.deskripsi_id} onChange={handleChange} required />

                <label>Deskripsi (EN)</label>
                <textarea name="deskripsi_en" value={formData.deskripsi_en} onChange={handleChange} required />

                <label>Longitude</label>
                <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />

                <label>Latitude</label>
                <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />

                <label>Nama File Gambar</label>
                <input type="text" name="gambar" value={formData.gambar} onChange={handleChange} required />

                <button type="submit">Simpan</button>
            </form>
        </div>
    );
};

export default TambahWisata;
