import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../../css/style.css';

const AdminLayout = () => {
    return (
        <div className="admin-dashboard">
            {/* Sidebar Admin */}
            <aside className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    <NavLink to="/admin/manajemen-wisata" activeclassname="active">Manajemen Wisata</NavLink>
                    <NavLink to="/admin/manajemen-lawa" activeclassname="active">Manajemen Lawa</NavLink>
                    <NavLink to="/admin/manajemen-baluara" activeclassname="active">Manajemen Baluara</NavLink>
                </nav>
            </aside>

            {/* Konten Utama */}
            <main className="admin-content">
                <Outlet /> {/* Tempat menampilkan isi menu yang dipilih */}
            </main>
        </div>
    );
};

export default AdminLayout;
