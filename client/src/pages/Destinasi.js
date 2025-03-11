import React, { useEffect, useState } from 'react';
import { getWisata } from '../api';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Destinasi = ({ language, darkMode }) => {
    const [wisataList, setWisataList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getWisata().then(data => setWisataList(data));
    }, []);

    return (
        <Container className={`mt-5 pt-5 ${darkMode ? "dark-mode" : ""}`}>
            <h2 className="text-center mb-4">
                {language === "id" ? "Semua Destinasi Wisata" : "All Tourist Destinations"}
            </h2>
            <Row>
                {wisataList.map(wisata => (
                    <Col key={wisata.id} md={6} className="mb-4">
                        <Card className={`shadow-sm ${darkMode ? "dark-card" : ""}`}
                            onClick={() => navigate(`/detail/${wisata.id}`)}
                            style={{ cursor: 'pointer' }}>
                            <Row className="g-0">
                                <Col md={6}>
                                    <Card.Img src={`/images/${wisata.gambar}`} className="h-100 w-100 object-fit-cover" />
                                </Col>
                                <Col md={6}>
                                    <Card.Body className="d-flex flex-column justify-content-center text-center">
                                        <Card.Title>{wisata.nama}</Card.Title>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Destinasi;
