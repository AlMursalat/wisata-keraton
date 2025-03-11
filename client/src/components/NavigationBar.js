import React, { useState, useEffect, useRef } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaSun, FaMoon } from "react-icons/fa";

const NavigationBar = ({ language, setLanguage, toggleDarkMode, darkMode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(window.scrollY); // 🔹 Gunakan useRef untuk menyimpan scrollY

  useEffect(() => {
    document.documentElement.setAttribute("lang", selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setLanguage(lang);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setHidden(true); // 🔹 Sembunyikan navbar saat scroll ke bawah
      } else {
        setHidden(false); // 🔹 Tampilkan navbar saat scroll ke atas
      }
      lastScrollY.current = window.scrollY; // 🔹 Simpan posisi scroll terakhir
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      className={`navbar-custom ${darkMode ? "navbar-dark-mode" : "navbar-light-mode"} ${hidden ? "hidden" : ""}`}
      expand="lg"
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="/">Wisata Buton</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">{selectedLanguage === "id" ? "Beranda" : "Home"}</Nav.Link>
            <Nav.Link href="/destinasi">{selectedLanguage === "id" ? "Destinasi" : "Destinations"}</Nav.Link>

            {/* Dropdown Bahasa */}
            <NavDropdown title={selectedLanguage === "id" ? "Indonesia" : "English"} id="language-dropdown">
              <NavDropdown.Item onClick={() => handleLanguageChange("id")}>Indonesia</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLanguageChange("en")}>English</NavDropdown.Item>
            </NavDropdown>

            {/* Mode Gelap/Terang */}
            <Nav.Link onClick={toggleDarkMode} style={{ cursor: "pointer" }}>
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
