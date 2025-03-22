import React, { useState } from "react";
import { tambahSlider } from "../../api";

const TambahSlider = ({ onSuccess }) => {
    const [formData, setFormData] = useState({ nama: "", gambar: null });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, gambar: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await tambahSlider(formData);
        onSuccess();
    };

    return (
        <div className="admin-form">
            <h4>Tambah Slider</h4>
            <form className="form-admin" onSubmit={handleSubmit}>
                <input type="text" name="nama" value={formData.nama} onChange={handleInputChange} required placeholder="Nama" />
                <input type="file" name="gambar" onChange={handleFileChange} required />
                <button type="submit">Tambah</button>
            </form>
        </div>
    );
};

export default TambahSlider;
