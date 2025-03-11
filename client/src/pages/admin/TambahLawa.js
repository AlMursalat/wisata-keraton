import React, { useState } from 'react';
import BackButton from './BackButton';
import { tambahLawa } from '../../api';
import { useNavigate } from 'react-router-dom';
import '../../css/style.css';

const TambahLawa = () => {
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
            await tambahLawa(formData);
            alert('Lawa berhasil ditambahkan!');
            navigate('/admin/manajemen-lawa');
        } catch (error) {
            alert('Gagal menambahkan Lawa. Silakan coba lagi.');
        }
    };

    return (
        <div className="admin-container">
            <BackButton />
            <h2>Tambah Lawa Baru</h2>
            <form className="form-admin" onSubmit={handleSubmit}>
                <label>Nama Lawa</label>
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

                <button type="submit" className="btn-simpan">Simpan</button>
            </form>
        </div>
    );
};

export default TambahLawa;
