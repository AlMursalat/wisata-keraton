import axios from "axios";

// Base URL untuk semua API
const BASE_URL = "http://localhost:5000/api";

// ============================
// WISATA API
// ============================

// 🔹 Ambil semua data wisata
export const getWisata = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/wisata`);
        return response.data;
    } catch (error) {
        console.error("Error fetching wisata:", error);
        return [];
    }
};

// 🔹 Ambil data wisata berdasarkan ID
export const getWisataById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/wisata/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching wisata dengan id ${id}:`, error);
        return null;
    }
};

// 🔹 Tambah Wisata
export const tambahWisata = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/wisata`, data);
        return response.data;
    } catch (error) {
        console.error("Gagal menambahkan wisata:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Update data wisata
export const updateWisata = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/wisata/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating wisata:", error);
        throw error;
    }
};

// 🔹 Hapus Wisata
export const deleteWisata = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/wisata/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting wisata dengan id ${id}:`, error);
        throw error;
    }
};

// 🔹 Ambil semua data lawa
export const getLawa = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/lawa`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Lawa:", error);
        return [];
    }
};

// 🔹 Ambil data lawa berdasarkan ID
export const getLawaById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/lawa/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching Lawa dengan id ${id}:`, error);
        return null;
    }
};

// 🔹 Tambah Lawa
export const tambahLawa = async (lawaData) => {
    try {
        const response = await axios.post(`${BASE_URL}/lawa`, lawaData);
        return response.data;
    } catch (error) {
        console.error("Error menambahkan Lawa:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Update Lawa
export const updateLawa = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/lawa/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating Lawa dengan id ${id}:`, error);
        throw error;
    }
};

// 🔹 Hapus Lawa
export const deleteLawa = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/lawa/${id}`);
    } catch (error) {
        console.error("Error deleting Lawa:", error);
        throw error;
    }
};

// Ambil semua baluara
export const getBaluara = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/baluara");
        return response.data;
    } catch (error) {
        console.error("Error fetching baluara:", error);
        return [];
    }
};

// Ambil baluara berdasarkan ID
export const getBaluaraById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/baluara/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching baluara with id ${id}:`, error);
        return null;
    }
};

// Tambah baluara
export const tambahBaluara = async (data) => {
    try {
        const response = await axios.post("http://localhost:5000/api/baluara", data);
        return response.data;
    } catch (error) {
        console.error("Error adding baluara:", error);
        throw error;
    }
};

// Update baluara
export const updateBaluara = async (id, data) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/baluara/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating baluara with id ${id}:`, error);
        throw error;
    }
};

// Hapus baluara
export const deleteBaluara = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/baluara/${id}`);
    } catch (error) {
        console.error(`Error deleting baluara with id ${id}:`, error);
        throw error;
    }
};
