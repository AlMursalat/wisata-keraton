import React, { useState } from 'react';
import BackButton from './BackButton';
import { tambahBaluara } from '../../api';
import { useNavigate } from 'react-router-dom';
import '../../css/style.css';

const TambahBaluara = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: '',
        deskripsi_id: '',
        deskripsi_en: '',
        latitude: '',
        longitude: '',
        gambar: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await tambahBaluara(formData);
            alert('Baluara berhasil ditambahkan!');
            navigate('/admin/manajemen-baluara');
        } catch (error) {
            alert('Gagal menambahkan Baluara. Silakan coba lagi.');
        }
    };

    return (
        <div className="admin-container">
            <BackButton />
            <h2>Tambah Baluara Baru</h2>
            <form className="form-admin" onSubmit={handleSubmit}>
                <label>Nama Baluara</label>
                <input type="text" name="nama" value={formData.nama} onChange={handleChange} required />

                <label>Deskripsi (ID)</label>
                <textarea name="deskripsi_id" value={formData.deskripsi_id} onChange={handleChange} required />

                <label>Deskripsi (EN)</label>
                <textarea name="deskripsi_en" value={formData.deskripsi_en} onChange={handleChange} required />

                <label>Latitude</label>
                <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />

                <label>Longitude</label>
                <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />

                <label>Gambar (Nama File)</label>
                <input type="text" name="gambar" value={formData.gambar} onChange={handleChange} required />

                <button type="submit">Simpan</button>
            </form>
        </div>
    );
};

export default TambahBaluara;
