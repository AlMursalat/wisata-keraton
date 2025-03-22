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
    const [activeMenu, setActiveMenu] = useState("Manajemen Beranda");  // Set default to "Manajemen Beranda"
    const [dataList, setDataList] = useState([]);
    const [formData, setFormData] = useState({ id: null, nama: "", gambar: null });
    const [isEditMode, setIsEditMode] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [deskripsiBeranda, setDeskripsiBeranda] = useState("");
    const [sliders, setSliders] = useState([]);  // State to hold sliders
    const itemsPerPage = 6;

    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            navigate("/admin/login");
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();
    }, [activeMenu, currentPage]);

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
                case "Manajemen Beranda":
                    const slidersData = await getSliders();  // Fetch sliders
                    setSliders(slidersData);
                    setDeskripsiBeranda("Tentang Benteng Keraton Buton...");
                    return;
                case "Monitoring Kunjungan":
                    data = [
                        { id: 1, nama: "Benteng Buton", kunjungan: 150 },
                        { id: 2, nama: "Baluara", kunjungan: 80 }
                    ];
                    break;
                case "Pengumuman":
                    data = [
                        { id: 1, teks: "Benteng Buton tutup sementara" },
                        { id: 2, teks: "Event budaya diadakan minggu depan" }
                    ];
                    break;
            }
            setDataList(data);
        } catch (error) {
            console.error(`Gagal mengambil data ${activeMenu}:`, error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    const handleInputChange = (e) => {
        if (e.target.name === "gambar") {
            setFormData({ ...formData, gambar: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateData();
            } else {
                await addData();
            }
            fetchData();
            resetForm();
        } catch (error) {
            console.error("Gagal menyimpan data:", error);
        }
    };

    const addData = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append("nama", formData.nama);
        formDataToSend.append("gambar", formData.gambar);

        switch (activeMenu) {
            case "Manajemen Wisata":
                await tambahWisata(formDataToSend);
                break;
            case "Manajemen Lawa":
                await tambahLawa(formDataToSend);
                break;
            case "Manajemen Baluara":
                await tambahBaluara(formDataToSend);
                break;
            case "Manajemen Beranda":  // Add sliders in Manajemen Beranda
                if (formData.gambar) {
                    await tambahSlider(formDataToSend);
                }
                break;
            case "Pengumuman":
                console.log("Pengumuman ditambahkan:", formData.nama);
                break;
        }
    };

    const updateData = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append("nama", formData.nama);
        if (formData.gambar) {
            formDataToSend.append("gambar", formData.gambar);
        }

        switch (activeMenu) {
            case "Manajemen Wisata":
                await updateWisata(formData.id, formDataToSend);
                break;
            case "Manajemen Lawa":
                await updateLawa(formData.id, formDataToSend);
                break;
            case "Manajemen Baluara":
                await updateBaluara(formData.id, formDataToSend);
                break;
            case "Manajemen Beranda":
                setDeskripsiBeranda(formData.nama);  // Update description
                if (formData.gambar) {
                    await updateSlider(formData.id, formDataToSend);  // Update slider
                }
                break;
        }
    };

    const handleEdit = (data) => {
        setFormData({ id: data.id, nama: data.nama, gambar: null });
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
                case "Manajemen Beranda":
                    await deleteSlider(id);  // Delete slider
                    break;
            }
            fetchData();
        } catch (error) {
            console.error("Gagal menghapus data:", error);
        }
    };

    const resetForm = () => {
        setFormData({
            id: null,
            nama: "",
            deskripsi_id: "",
            deskripsi_en: "",
            longitude: "",
            latitude: "",
            gambar: "",
        });
        setIsEditMode(false);
    };

    return (
        <div className="admin-layout">
            <div className="admin-sidebar">
                <h2>DASHBOARD ADMIN</h2>
                <ul>
                    <li onClick={() => setActiveMenu("Manajemen Wisata")}>Manajemen Wisata</li>
                    <li onClick={() => setActiveMenu("Manajemen Lawa")}>Manajemen Lawa</li>
                    <li onClick={() => setActiveMenu("Manajemen Baluara")}>Manajemen Baluara</li>
                    <li onClick={() => setActiveMenu("Manajemen Beranda")}>Manajemen Beranda</li>  {/* Unified menu */}
                    <li onClick={() => setActiveMenu("Monitoring Kunjungan")}>Monitoring Kunjungan</li>
                    <li onClick={() => setActiveMenu("Pengumuman")}>Pengumuman</li>
                </ul>
                <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>

            <div className="admin-content">
                <h3>{activeMenu}</h3>
                {activeMenu === "Manajemen Beranda" ? (
                    <div>
                        <textarea value={deskripsiBeranda} onChange={(e) => setDeskripsiBeranda(e.target.value)} />
                        <button onClick={updateData}>Simpan Deskripsi</button>

                        <h4>Manajemen Slider</h4>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="nama" placeholder="Nama Gambar" value={formData.nama} onChange={handleInputChange} />
                            <input type="file" name="gambar" onChange={handleInputChange} />
                            <button type="submit">{isEditMode ? "Update Slider" : "Tambah Slider"}</button>
                        </form>

                        <div className="slider-list">
                            {sliders.map((slider) => (
                                <div key={slider.id}>
                                    <img src={slider.gambar} alt={slider.nama} className="slider-img" />
                                    <button onClick={() => handleEdit(slider)}>Edit</button>
                                    <button onClick={() => handleDelete(slider.id)}>Hapus</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Gambar</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataList.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.nama}</td>
                                        <td><img src={item.gambar} alt={item.nama} className="table-img" /></td>
                                        <td><button onClick={() => handleEdit(item)}>Edit</button> <button onClick={() => handleDelete(item.id)}>Hapus</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
