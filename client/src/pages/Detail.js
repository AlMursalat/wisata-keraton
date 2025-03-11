import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getWisataById } from "../api";
import { Container, Button } from "react-bootstrap";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Detail = ({ language, darkMode }) => {
    const { id } = useParams();
    const [wisata, setWisata] = useState(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        getWisataById(id).then(data => {
            if (data && data.longitude && data.latitude) {
                setWisata(data);
            } else {
                console.error("Data lokasi tidak valid:", data);
            }
        });
    }, [id]);

    useEffect(() => {
        if (wisata && wisata.longitude && wisata.latitude) {
            const mapContainer = document.getElementById("map");
            if (!mapContainer) {
                console.error("Map container not found");
                return;
            }

            if (!mapRef.current) {
                mapRef.current = L.map("map").setView([wisata.latitude, wisata.longitude], 16);
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);
            }

            if (!markerRef.current) {
                markerRef.current = L.marker([wisata.latitude, wisata.longitude]).addTo(mapRef.current)
                    .bindPopup(`<b>${wisata.nama}</b>`).openPopup();
            }
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
                markerRef.current = null;
            }
        };
    }, [wisata]);

    if (!wisata) return <p>{language === "id" ? "Memuat..." : "Loading..."}</p>;

    const handleNavigate = () => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${wisata.latitude},${wisata.longitude}`, "_blank");
    };

    return (
        <Container className={`mt-5 pt-5 ${darkMode ? "dark-mode" : ""}`}>
            <h2>{wisata.nama}</h2>
            <img src={`/images/${wisata.gambar}`} alt={wisata.nama} className="img-fluid rounded mb-3" />

            <div className="row">
                <div className="col-md-8">
                <p>
    {language === "id" ? wisata.deskripsi_id : wisata.deskripsi_en}
</p>
                    <Button variant="primary" onClick={handleNavigate}>
                        {language === "id" ? "Pergi Sekarang" : "Go Now"}
                    </Button>
                </div>
                <div className="col-md-4">
                    <div id="map" style={{ height: "400px", width: "100%" }}></div>
                </div>
            </div>
        </Container>
    );
};

export default Detail;
