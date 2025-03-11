import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/style.css";
import { getWisata, tambahWisata, updateWisata, deleteWisata } from "../../api";
import { getLawa, tambahLawa, updateLawa, deleteLawa } from "../../api";
import { getBaluara, tambahBaluara, updateBaluara, deleteBaluara } from "../../api";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("Manajemen Wisata");
    const [dataList, setDataList] = useState([]);
    const [formData, setFormData] = useState({ id: null, nama: "", deskripsi_id: "", deskripsi_en: "", longitude: "", latitude: "", gambar: "" });
    const [isEditMode, setIsEditMode] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            navigate("/admin/login");
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [activeMenu]);

    // 🔹 Fungsi Menghilangkan Alert Setelah 5 Detik
    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => setAlertMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [alertMessage]);

    const fetchData = async () => {
        let data = [];
        try {
            switch (activeMenu) {
                case "Manajemen Wisata":
                    data = await getWisata();
                    break;
                case "Manajemen Lawa":
                    data = await getLawa();
                    break;
                case "Manajemen Baluara":
                    data = await getBaluara();
                    break;
                default:
                    data = [];
            }
            setDataList(data);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateData();
                setAlertMessage({ type: "success", text: "Data berhasil diperbarui!" });
            } else {
                await addData();
                setAlertMessage({ type: "success", text: "Data berhasil ditambahkan!" });
            }
            fetchData();
            resetForm();
        } catch (error) {
            setAlertMessage({ type: "error", text: "Gagal menyimpan data!" });
        }
    };

    const addData = async () => {
        switch (activeMenu) {
            case "Manajemen Wisata":
                await tambahWisata(formData);
                break;
            case "Manajemen Lawa":
                await tambahLawa(formData);
                break;
            case "Manajemen Baluara":
                await tambahBaluara(formData);
                break;
        }
    };

    const updateData = async () => {
        switch (activeMenu) {
            case "Manajemen Wisata":
                await updateWisata(formData.id, formData);
                break;
            case "Manajemen Lawa":
                await updateLawa(formData.id, formData);
                break;
            case "Manajemen Baluara":
                await updateBaluara(formData.id, formData);
                break;
        }
    };

    const handleEdit = (data) => {
        setFormData(data);
        setIsEditMode(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
        try {
            switch (activeMenu) {
                case "Manajemen Wisata":
                    await deleteWisata(id);
                    break;
                case "Manajemen Lawa":
                    await deleteLawa(id);
                    break;
                case "Manajemen Baluara":
                    await deleteBaluara(id);
                    break;
            }
            setAlertMessage({ type: "success", text: "Data berhasil dihapus!" });
            fetchData();
        } catch (error) {
            setAlertMessage({ type: "error", text: "Gagal menghapus data!" });
        }
    };

    const resetForm = () => {
        setFormData({ id: null, nama: "", deskripsi_id: "", deskripsi_en: "", longitude: "", latitude: "", gambar: "" });
        setIsEditMode(false);
    };

    // 🔹 Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="admin-layout">
            <div className="admin-sidebar">
                <h2>DASHBOARD ADMIN</h2>
                <ul>
                    <li className={activeMenu === "Manajemen Wisata" ? "active" : ""} onClick={() => setActiveMenu("Manajemen Wisata")}>Manajemen Wisata</li>
                    <li className={activeMenu === "Manajemen Lawa" ? "active" : ""} onClick={() => setActiveMenu("Manajemen Lawa")}>Manajemen Lawa</li>
                    <li className={activeMenu === "Manajemen Baluara" ? "active" : ""} onClick={() => setActiveMenu("Manajemen Baluara")}>Manajemen Baluara</li>
                </ul>
                <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>

            <div className="admin-content">
                <h3>{activeMenu}</h3>
                {alertMessage && (
                    <div className={`alert ${alertMessage.type === "success" ? "alert-success" : "alert-error"}`}>
                        {alertMessage.text}
                    </div>
                )}

                <div className="admin-grid">
                    <div className="admin-form">
                        <form className="form-admin" onSubmit={handleSubmit}>
                            <input type="text" name="nama" placeholder="Nama" value={formData.nama} onChange={handleInputChange} required />
                            <textarea name="deskripsi_id" placeholder="Deskripsi (ID)" value={formData.deskripsi_id} onChange={handleInputChange} required />
                            <textarea name="deskripsi_en" placeholder="Deskripsi (EN)" value={formData.deskripsi_en} onChange={handleInputChange} required />
                            <input type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleInputChange} required />
                            <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleInputChange} required />
                            <input type="text" name="gambar" placeholder="Nama File Gambar" value={formData.gambar} onChange={handleInputChange} required />
                            <button type="submit" className="btn-tambah">{isEditMode ? "Update" : "Tambah"}</button>
                            {isEditMode && <button type="button" onClick={resetForm} className="btn-cancel">Batal</button>}
                        </form>
                    </div>

                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{item.nama}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                                            <button className="btn-delete" onClick={() => handleDelete(item.id)}>Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination */}
                        {dataList.length > itemsPerPage && (
                            <div className="pagination">
                                {Array.from({ length: Math.ceil(dataList.length / itemsPerPage) }, (_, index) => (
                                    <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
