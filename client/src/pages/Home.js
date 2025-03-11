import React, { useEffect, useState, useRef } from 'react';
import { getWisata, getLawa, getBaluara, getSliders } from '../api';
import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import content from '../data/content';

const Home = ({ language, darkMode }) => {
    const [sliderImages, setSliderImages] = useState([]);
    const [wisataList, setWisataList] = useState([]);
    const [lawaList, setLawaList] = useState([]);
    const [baluaraList, setBaluaraList] = useState([]);
    const [showAllWisata, setShowAllWisata] = useState(false);
    const navigate = useNavigate();

    const sectionRefs = useRef([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sliders = await getSliders();
                const wisata = await getWisata();
                const lawa = await getLawa();
                const baluara = await getBaluara();
                
                setSliderImages(sliders);
                setWisataList(wisata);
                setLawaList(lawa);
                setBaluaraList(baluara);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                }
            });
        }, { threshold: 0.2 });

        sectionRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <Container fluid className={`mt-5 pt-5 ${darkMode ? "dark-mode" : ""}`}>
            {/* 🔹 Carousel mengambil gambar dari database */}
            <Carousel className="carousel-container">
                {sliderImages.length > 0 ? (
                    sliderImages.map((slide, index) => (
                        <Carousel.Item key={index}>
                            <img className="d-block w-100 carousel-img" src={`/images/${slide.gambar}`} alt={`Slide ${index + 1}`} />
                        </Carousel.Item>
                    ))
                ) : (
                    <p className="text-center">Loading slider...</p>
                )}
            </Carousel>

            {/* 🔹 Tentang Benteng */}
            <Container ref={el => sectionRefs.current[0] = el} className="mt-4 section">
                <h2 className="text-center mb-3">{language === "id" ? "Tentang Benteng Keraton Buton" : "About Benteng Keraton Buton"}</h2>
                <div className="about-text">
                    {content.tentangBenteng[language].map((paragraph, index) => (
                        <p key={index} className="text-justify">{paragraph}</p>
                    ))}
                </div>
            </Container>

            <hr className="section-divider" />

            {/* 🔹 Daftar Wisata */}
            <Container ref={el => sectionRefs.current[1] = el} className="mt-4 section">
                <h2 className="text-center mb-4">{language === "id" ? "Destinasi Wisata" : "Tourist Destinations"}</h2>
                <Row>
                    {(showAllWisata ? wisataList : wisataList.slice(0, 4)).map(wisata => (
                        <Col key={wisata.id} md={3} xs={6} className="mb-4">
                            <Card className={`shadow-sm wisata-card ${darkMode ? "dark-card" : ""}`} 
                                onClick={() => navigate(`/detail/${wisata.id}`)} 
                                style={{ cursor: 'pointer' }}>
                                <Card.Img variant="top" src={`/images/${wisata.gambar}`} />
                                <Card.Body className="text-center">
                                    <Card.Title>{wisata.nama}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* 🔹 Tombol "Lihat Selengkapnya" & "Lihat Lebih Sedikit" */}
                {wisataList.length > 4 && (
                    <div className="text-center mt-4">
                        {!showAllWisata ? (
                            <Button variant="primary" onClick={() => setShowAllWisata(true)}>
                                {language === "id" ? "Lihat Selengkapnya" : "See More"}
                            </Button>
                        ) : (
                            <Button variant="secondary" onClick={() => setShowAllWisata(false)}>
                                {language === "id" ? "Lihat Lebih Sedikit" : "See Less"}
                            </Button>
                        )}
                    </div>
                )}
            </Container>

            <hr className="section-divider" />

            {/* 🔹 Daftar 12 Pintu Gerbang (Lawa) */}
            <Container ref={el => sectionRefs.current[2] = el} className="mt-4 section">
                <h2 className="text-center mb-4">{language === "id" ? "12 Pintu Gerbang (Lawa)" : "12 Fortress Gates (Lawa)"}</h2>
                <Row>
                    {lawaList.map(lawa => (
                        <Col key={lawa.id} md={3} xs={6} className="mb-4">
                            <Card className={`shadow-sm wisata-card ${darkMode ? "dark-card" : ""}`} 
                                onClick={() => navigate(`/detail-lawa/${lawa.id}`)} 
                                style={{ cursor: 'pointer' }}>
                                <Card.Img variant="top" src={`/images/${lawa.gambar}`} />
                                <Card.Body className="text-center">
                                    <Card.Title>{lawa.nama}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <hr className="section-divider" />

            {/* 🔹 16 Baluara (Bastion) */}
            <Container ref={el => sectionRefs.current[3] = el} className="mt-4 section">
                <h2 className="text-center mb-4">{language === "id" ? "16 Baluara (Bastion)" : "16 Baluara (Bastions)"}</h2>
                <Row>
                    {baluaraList.map(baluara => (
                        <Col key={baluara.id} md={3} xs={6} className="mb-4">
                            <Card className={`shadow-sm wisata-card ${darkMode ? "dark-card" : ""}`} 
                                onClick={() => navigate(`/detail-baluara/${baluara.id}`)} 
                                style={{ cursor: 'pointer' }}>
                                <Card.Img variant="top" src={`/images/${baluara.gambar}`} />
                                <Card.Body className="text-center">
                                    <Card.Title>{baluara.nama}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
};

export default Home;
