import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/style.css";
import { 
    getWisata, tambahWisata, updateWisata, deleteWisata, 
    getLawa, tambahLawa, updateLawa, deleteLawa, 
    getBaluara, tambahBaluara, updateBaluara, deleteBaluara, 
    getSliders, tambahSlider, updateSlider, deleteSlider 
} from "../../api";

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
    }, [activeMenu, currentPage]);

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
                case "Manajemen Slider":
                    data = await getSliders();
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
            case "Manajemen Slider":
                await tambahSlider(formData);
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
            case "Manajemen Slider":
                await updateSlider(formData.id, formData);
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
                case "Manajemen Slider":
                    await deleteSlider(id);
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

    // Pagination
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
                    <li className={activeMenu === "Manajemen Slider" ? "active" : ""} onClick={() => setActiveMenu("Manajemen Slider")}>Manajemen Slider</li>
                </ul>
                <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>

            <div className="admin-content">
                <h3>{activeMenu}</h3>

                <div className="admin-grid">
                    <div className="admin-form">
                        <h4>{isEditMode ? "Edit" : "Tambah"} {activeMenu}</h4>
                        <form className="form-admin" onSubmit={handleSubmit}>
                            <input type="text" name="nama" value={formData.nama} onChange={handleInputChange} required placeholder="Nama" />
                            <textarea name="deskripsi_id" value={formData.deskripsi_id} onChange={handleInputChange} required placeholder="Deskripsi (ID)" />
                            <textarea name="deskripsi_en" value={formData.deskripsi_en} onChange={handleInputChange} required placeholder="Deskripsi (EN)" />
                            <input type="text" name="latitude" value={formData.latitude} onChange={handleInputChange} required placeholder="Latitude" />
                            <input type="text" name="longitude" value={formData.longitude} onChange={handleInputChange} required placeholder="Longitude" />
                            <input type="text" name="gambar" value={formData.gambar} onChange={handleInputChange} required placeholder="Nama File Gambar" />
                            <button type="submit">{isEditMode ? "Update" : "Tambah"}</button>
                        </form>
                    </div>

                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Gambar</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.nama}</td>
                                        <td>{item.latitude}</td>
                                        <td>{item.longitude}</td>
                                        <td><img src={`/images/${item.gambar}`} alt="Gambar" className="table-img" /></td>
                                        <td><button onClick={() => handleEdit(item)}>Edit</button> <button onClick={() => handleDelete(item.id)}>Hapus</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
