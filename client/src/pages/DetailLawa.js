import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getLawaById } from "../api";
import { Container, Button } from "react-bootstrap";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DetailLawa = ({ language, darkMode }) => {
    const { id } = useParams();
    const [lawa, setLawa] = useState(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        const fetchLawa = async () => {
            const data = await getLawaById(id);
            if (data && data.latitude && data.longitude) {
                setLawa(data);
            } else {
                console.error("Data lokasi tidak valid atau lawa tidak ditemukan.");
            }
        };
        fetchLawa();
    }, [id]);

    useEffect(() => {
        if (lawa && lawa.latitude && lawa.longitude) {
            if (!mapRef.current) {
                mapRef.current = L.map("map").setView([lawa.latitude, lawa.longitude], 17);
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);

                markerRef.current = L.marker([lawa.latitude, lawa.longitude])
                    .addTo(mapRef.current)
                    .bindPopup(`<b>${lawa.nama}</b>`)
                    .openPopup();
            }
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
                markerRef.current = null;
            }
        };
    }, [lawa]);

    if (!lawa) return <p>{language === "id" ? "Memuat data gerbang..." : "Loading gate data..."}</p>;

    const handleNavigate = () => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lawa.latitude},${lawa.longitude}`, "_blank");
    };

    return (
        <Container className={`mt-5 pt-5 ${darkMode ? "dark-mode" : ""}`}>
            <h2 className="text-center mb-4">{lawa.nama}</h2>
            <img src={`/images/${lawa.gambar}`} alt={lawa.nama} className="img-fluid rounded mb-3" style={{ maxHeight: "60vh", objectFit: "cover" }} />

            <div className="row">
                {/* Peta di sebelah kiri */}
                <div className="col-md-6">
                    <div id="map" style={{ height: "400px", width: "100%" }}></div>
                </div>

                {/* Deskripsi di sebelah kanan */}
                <div className="col-md-6">
                    <p className="text-justify">
                        {language === "id" ? lawa.deskripsi_id : lawa.deskripsi_en}
                    </p>
                    <Button variant="primary" onClick={handleNavigate}>
                        {language === "id" ? "Pergi ke Lokasi" : "Go to Location"}
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default DetailLawa;
