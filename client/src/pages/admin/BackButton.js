import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = ({ to = '/admin/dashboard' }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(to)}
            className="btn-back"
            title="Kembali"
        >
            <FaArrowLeft size={20} /> Kembali
        </button>
    );
};

export default BackButton;
    