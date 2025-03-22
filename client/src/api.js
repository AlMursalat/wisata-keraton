import axios from "axios";
// Base URL untuk semua API
const BASE_URL = "http://localhost:5000/api";

/* ==============================
   🔹 FUNGSI CRUD UNTUK WISATA
   ============================== */
export const getWisata = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/wisata`);
        return response.data;
    } catch (error) {
        console.error("Error fetching wisata:", error);
        return [];
    }
};

export const getWisataById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/wisata/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching wisata dengan id ${id}:`, error);
        return null;
    }
};

// 🔹 Tambah Wisata (Dikembalikan!)
export const tambahWisata = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/wisata`, data);
        return response.data;
    } catch (error) {
        console.error("Error menambahkan wisata:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Update Wisata (Dikembalikan!)
export const updateWisata = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/wisata/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating wisata:", error);
        throw error;
    }
};

// 🔹 Hapus Wisata (Dikembalikan!)
export const deleteWisata = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/wisata/${id}`);
    } catch (error) {
        console.error("Error deleting wisata:", error);
        throw error;
    }
};

/* ==============================
   🔹 FUNGSI CRUD UNTUK LAWA
   ============================== */
export const getLawa = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/lawa`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Lawa:", error);
        return [];
    }
};

export const getLawaById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/lawa/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching Lawa dengan id ${id}:`, error);
        return null;
    }
};

export const tambahLawa = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/lawa`, data);
        return response.data;
    } catch (error) {
        console.error("Error menambahkan Lawa:", error.response?.data || error.message);
        throw error;
    }
};

export const updateLawa = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/lawa/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating Lawa dengan id ${id}:`, error);
        throw error;
    }
};

export const deleteLawa = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/lawa/${id}`);
    } catch (error) {
        console.error("Error deleting Lawa:", error);
        throw error;
    }
};

/* ==============================
   🔹 FUNGSI CRUD UNTUK BALUARA
   ============================== */
export const getBaluara = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/baluara`);
        return response.data;
    } catch (error) {
        console.error("Error fetching baluara:", error);
        return [];
    }
};

export const getBaluaraById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/baluara/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching baluara dengan id ${id}:`, error);
        return null;
    }
};

export const tambahBaluara = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/baluara`, data);
        return response.data;
    } catch (error) {
        console.error("Error adding baluara:", error);
        throw error;
    }
};

export const updateBaluara = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/baluara/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating baluara dengan id ${id}:`, error);
        throw error;
    }
};

export const deleteBaluara = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/baluara/${id}`);
    } catch (error) {
        console.error(`Error deleting baluara dengan id ${id}:`, error);
        throw error;
    }
};

/* ==============================
   🔹 FUNGSI CRUD UNTUK SLIDER
   ============================== */

// 🔹 Ambil semua slider
export const getSliders = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/sliders");
        return response.data.map(slider => ({
            id: slider.id,
            nama: slider.nama,
            gambar: slider.gambar ? `http://localhost:5000/uploads/${slider.gambar}` : ""
        }));
    } catch (error) {
        console.error("Error fetching sliders:", error);
        return [];
    }
};


// 🔹 Tambah Slider
export const tambahSlider = async (data) => {
    try {
        const formData = new FormData();
        formData.append("nama", data.nama);
        formData.append("gambar", data.gambar); // Pastikan gambar dikirim

        const response = await axios.post(`${BASE_URL}/sliders`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data;
    } catch (error) {
        console.error("Error menambahkan slider:", error);
        throw error;
    }
};

// 🔹 Update Slider
export const updateSlider = async (id, data) => {
    try {
        const formData = new FormData();
        formData.append("nama", data.nama);
        if (data.gambar) {
            formData.append("gambar", data.gambar);
        }

        const response = await axios.put(`${BASE_URL}/sliders/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data;
    } catch (error) {
        console.error("Error mengupdate slider:", error);
        throw error;
    }
};

// 🔹 Hapus Slider
export const deleteSlider = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/sliders/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error menghapus slider:", error);
        throw error;
    }
};
