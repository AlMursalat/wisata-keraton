import React, { useEffect, useState } from "react";
import { getBaluara, deleteBaluara } from "../../api";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

const ManajemenBaluara = () => {
    const [baluaraList, setBaluaraList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await getBaluara();
        setBaluaraList(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus baluara ini?")) {
            await deleteBaluara(id);
            fetchData();
        }
    };

    return (
        <div className="admin-container">
            <BackButton />
            <h2>Manajemen Baluara</h2>
            <button className="btn-tambah" onClick={() => navigate('/admin/tambah-baluara')}>Tambah Baluara Baru</button>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Baluara</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {baluaraList.map((baluara, index) => (
                        <tr key={baluara.id}>
                            <td>{index + 1}</td>
                            <td>{baluara.nama}</td>
                            <td>
                                <button onClick={() => navigate(`/admin/edit-baluara/${baluara.id}`)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(baluara.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManajemenBaluara;
