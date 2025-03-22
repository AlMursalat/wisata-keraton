import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/style.css";

const LoginAdmin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Cek jika admin sudah login sebelumnya
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("adminToken");
        if (isLoggedIn === "true") {
            navigate("/admin/dashboard");
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();

        // Simulasi autentikasi (Ganti dengan API backend jika ada)
        if (username === "admin" && password === "admin123") {
            localStorage.setItem("adminToken", "true");  // Simpan sesi login
            navigate("/admin/dashboard");  // Redirect ke dashboard
        } else {
            setErrorMessage("Username atau password salah!");
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginAdmin;
