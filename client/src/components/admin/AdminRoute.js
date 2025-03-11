import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const isAdminLoggedIn = sessionStorage.getItem("adminToken") === "true";

    return isAdminLoggedIn ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminRoute;
