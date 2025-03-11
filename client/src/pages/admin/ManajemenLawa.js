import React, { useEffect, useState } from 'react';
import { getLawa, deleteLawa } from '../../api';
import BackButton from './BackButton';
import { useNavigate } from 'react-router-dom';

const ManajemenLawa = () => {
    const [lawaList, setLawaList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLawaData();
    }, []);

    const fetchLawaData = () => {
        getLawa().then(data => setLawaList(data));
    };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus data Lawa ini?")) {
            await deleteLawa(id);
            fetchLawaData(); // Refresh data setelah hapus
        }
    };

    return (
        <div className="admin-container">
            <BackButton />
            <h2>Manajemen Lawa</h2>

            {/* Tombol Tambah Lawa Baru */}
            <div className="text-end mb-3">
                <button className="btn-tambah" onClick={() => navigate('/admin/tambah-lawa')}>
                    Tambah Lawa Baru
                </button>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Lawa</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {lawaList.map((lawa, index) => (
                        <tr key={lawa.id}>
                            <td>{index + 1}</td>
                            <td>{lawa.nama}</td>
                            <td>
                                <button onClick={() => navigate(`/admin/edit-lawa/${lawa.id}`)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(lawa.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManajemenLawa;
