import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBaluaraById, updateBaluara } from '../../api';
import BackButton from './BackButton';

const EditBaluara = () => {
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
        const fetchData = async () => {
            const data = await getBaluaraById(id);
            if (data) {
                setFormData(data);
            } else {
                alert('Baluara tidak ditemukan!');
                navigate('/admin/manajemen-baluara');
            }
        };
        fetchData();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBaluara(id, formData);
            alert('Baluara berhasil diperbarui!');
            navigate('/admin/manajemen-baluara');
        } catch (error) {
            alert('Gagal memperbarui baluara.');
        }
    };

    return (
        <div className="admin-container">
            <BackButton />
            <h2>Edit Baluara</h2>
            <form className="form-admin" onSubmit={handleSubmit}>
                <label>Nama Baluara</label>
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

                <button type="submit">Simpan Perubahan</button>
            </form>
        </div>
    );
};

export default EditBaluara;
