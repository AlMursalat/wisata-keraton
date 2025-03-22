import React, { useState } from "react";
import { updateSlider } from "../../api";

const EditSlider = ({ data, onCancel, onSuccess }) => {
    const [formData, setFormData] = useState({ nama: data.nama, gambar: data.gambar });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, gambar: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateSlider(data.id, formData);
        onSuccess();
        onCancel();
    };

    return (
        <div className="admin-form">
            <h4>Edit Slider</h4>
            <form className="form-admin" onSubmit={handleSubmit}>
                <input type="text" name="nama" value={formData.nama} onChange={handleInputChange} required />
                <input type="file" name="gambar" onChange={handleFileChange} />
                <button type="submit">Update</button>
                <button type="button" onClick={onCancel}>Batal</button>
            </form>
        </div>
    );
};

export default EditSlider;
