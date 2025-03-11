import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from './BackButton';
import { getLawaById, updateLawa } from '../../api';
import '../../css/style.css';

const EditLawa = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nama: '',
        deskripsi_id: '',
        deskripsi_en: '',
        longitude: '',
        latitude: '',
        gambar: ''
    });

    useEffect(() => {
        const fetchLawaData = async () => {
            const data = await getLawaById(id);
            if (data) {
                setFormData(data);
            } else {
                alert("Data Lawa tidak ditemukan!");
                navigate('/admin/manajemen-lawa');
            }
        };
    
        fetchLawaData();
    }, [id, navigate]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateLawa(id, formData);
            alert('Data Lawa berhasil diperbarui!');
            navigate('/admin/manajemen-lawa');
        } catch (error) {
            alert('Gagal memperbarui data Lawa. Silakan coba lagi.');
        }
    };

    return (
        <div className="admin-container">
            <BackButton />
            <h2>Edit Lawa</h2>
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

                <button type="submit" className="btn-simpan">Simpan Perubahan</button>
            </form>
        </div>
    );
};

export default EditLawa;
