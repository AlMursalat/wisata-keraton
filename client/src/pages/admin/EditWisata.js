import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWisataById, updateWisata } from '../../api';
import BackButton from '../admin/BackButton';
import '../../css/style.css';

const EditWisata = () => {
    const { id } = useParams();
    const [nama, setNama] = useState('');
    const [deskripsi_id, setDeskripsiId] = useState('');
    const [deskripsi_en, setDeskripsiEn] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [gambar, setGambar] = useState('');

    useEffect(() => {
        getWisataById(id).then(data => {
            setNama(data.nama);
            setDeskripsiId(data.deskripsi_id);
            setDeskripsiEn(data.deskripsi_en);
            setLongitude(data.longitude);
            setLatitude(data.latitude);
            setGambar(data.gambar);
        });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedData = { nama, deskripsi_id, deskripsi_en, longitude, latitude, gambar };
        updateWisata(id, updatedData)
            .then(() => alert('Data berhasil diperbarui'))
            .catch(err => alert('Gagal memperbarui data'));
    };

    return (
        <div className="admin-container">
            <BackButton />
            <h2>Edit Wisata</h2>
            <form className="form-admin" onSubmit={handleUpdate}>
                <label>Nama Wisata</label>
                <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />

                <label>Deskripsi (ID)</label>
                <textarea value={deskripsi_id} onChange={(e) => setDeskripsiId(e.target.value)} required />

                <label>Deskripsi (EN)</label>
                <textarea value={deskripsi_en} onChange={(e) => setDeskripsiEn(e.target.value)} required />

                <label>Longitude</label>
                <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />

                <label>Latitude</label>
                <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />

                <label>Gambar (Nama File)</label>
                <input type="text" value={gambar} onChange={(e) => setGambar(e.target.value)} required />

                <button type="submit">Simpan Perubahan</button>
            </form>
        </div>
    );
};

export default EditWisata;
