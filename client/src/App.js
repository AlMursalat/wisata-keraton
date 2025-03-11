import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import DetailLawa from "./pages/DetailLawa";
import DetailBaluara from "./pages/DetailBaluara";
import Destinasi from "./pages/Destinasi";

// Admin Pages
import LoginAdmin from "./pages/admin/LoginAdmin";
import AdminRoute from "./components/admin/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManajemenWisata from "./pages/admin/ManajemenWisata";
import ManajemenLawa from "./pages/admin/ManajemenLawa";
import ManajemenBaluara from "./pages/admin/ManajemenBaluara";

const AppContent = () => {
    const [language, setLanguage] = useState("id");
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
    const location = useLocation();

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Mengecek apakah halaman admin sedang diakses
    const isAdminPage = location.pathname.startsWith("/admin");

    return (
        <>
            {!isAdminPage && (
                <NavigationBar
                    language={language}
                    setLanguage={setLanguage}
                    toggleDarkMode={toggleDarkMode}
                    darkMode={darkMode}
                />
            )}

            <Routes>
                {/* Rute User */}
                <Route path="/" element={<Home language={language} darkMode={darkMode} />} />
                <Route path="/detail/:id" element={<Detail language={language} darkMode={darkMode} />} />
                <Route path="/detail-lawa/:id" element={<DetailLawa language={language} darkMode={darkMode} />} />
                <Route path="/detail-baluara/:id" element={<DetailBaluara language={language} darkMode={darkMode} />} />
                <Route path="/destinasi" element={<Destinasi language={language} darkMode={darkMode} />} />

                {/* Rute Admin */}
                <Route path="/admin/login" element={<LoginAdmin />} />
                <Route path="/admin" element={<AdminRoute />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="manajemen-wisata" element={<ManajemenWisata />} />
                    <Route path="manajemen-lawa" element={<ManajemenLawa />} />
                    <Route path="manajemen-baluara" element={<ManajemenBaluara />} />
                </Route>
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;