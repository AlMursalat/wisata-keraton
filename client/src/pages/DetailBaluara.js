import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getBaluaraById } from "../api";
import { Container, Button } from "react-bootstrap";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DetailBaluara = ({ language, darkMode }) => {
    const { id } = useParams();
    const [baluara, setBaluara] = useState(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        const fetchBaluara = async () => {
            const data = await getBaluaraById(id);
            if (data && data.latitude && data.longitude) {
                setBaluara(data);
            } else {
                console.error("Data lokasi tidak valid atau baluara tidak ditemukan.");
            }
        };
        fetchBaluara();
    }, [id]);

    useEffect(() => {
        if (baluara && baluara.latitude && baluara.longitude) {
            if (!mapRef.current) {
                mapRef.current = L.map("map").setView([baluara.latitude, baluara.longitude], 17);
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);

                markerRef.current = L.marker([baluara.latitude, baluara.longitude])
                    .addTo(mapRef.current)
                    .bindPopup(`<b>${baluara.nama}</b>`)
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
    }, [baluara]);

    if (!baluara) return <p>{language === "id" ? "Memuat data baluara..." : "Loading bastion data..."}</p>;

    const handleNavigate = () => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${baluara.latitude},${baluara.longitude}`, "_blank");
    };

    return (
        <Container className={`mt-5 pt-5 ${darkMode ? "dark-mode" : ""}`}>
            <h2 className="text-center mb-4">{baluara.nama}</h2>
            <img src={`/images/${baluara.gambar}`} alt={baluara.nama} className="img-fluid rounded mb-3" style={{ maxHeight: "60vh", objectFit: "cover" }} />

            <div className="row">
                {/* Peta di sebelah kiri */}
                <div className="col-md-6">
                    <div id="map" style={{ height: "400px", width: "100%" }}></div>
                </div>

                {/* Deskripsi di sebelah kanan */}
                <div className="col-md-6">
                    <p className="text-justify">
                        {language === "id" ? baluara.deskripsi_id : baluara.deskripsi_en}
                    </p>
                    <Button variant="primary" onClick={handleNavigate}>
                        {language === "id" ? "Pergi ke Lokasi" : "Go to Location"}
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default DetailBaluara;
