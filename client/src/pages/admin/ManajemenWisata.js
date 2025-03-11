import React, { useEffect, useState } from 'react';
import { getWisata, deleteWisata } from '../../api';
import BackButton from './BackButton';
import { useNavigate } from 'react-router-dom';

const ManajemenWisata = () => {
    const [wisataList, setWisataList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWisataData();
    }, []);

    const fetchWisataData = () => {
        getWisata().then(data => setWisataList(data));
    };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus wisata ini?")) {
            await deleteWisata(id);
            fetchWisataData(); // Refresh data setelah hapus
        }
    };

    return (
        <div className="admin-container">
            <BackButton />
            <h2>Manajemen Wisata</h2>
            
            {/* Tombol Tambah Wisata Baru */}
            <div className="text-end mb-3">
                <button className="btn-tambah" onClick={() => navigate('/admin/tambah-wisata')}>
                    Tambah Wisata Baru
                </button>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Wisata</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {wisataList.map((wisata, index) => (
                        <tr key={wisata.id}>
                            <td>{index + 1}</td>
                            <td>{wisata.nama}</td>
                            <td>
                                <button onClick={() => navigate(`/admin/edit-wisata/${wisata.id}`)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(wisata.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManajemenWisata;
