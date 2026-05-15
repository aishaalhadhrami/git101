import React, { useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import { MdOutlineLanguage } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

// استيراد الصور من المسارات الصحيحة
import AbnaFreish from "../../assets/AbnaFreish.png";
import Muscat from "../../assets/Muscat.jpg";
import AlYahyeai from "../../assets/AlYahyeai.jpeg";

export default function Home() {
  const [lang, setLang] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const centers = [
    { id: 1, name: "Abna Freish Center", nameAr: "مركز أبناء فريش", img: AbnaFreish, rating: 3 },
    { id: 2, name: "Muscat Hijama Center", nameAr: "مركز مسقط للحجامة", img: Muscat, rating: 3 },
    { id: 3, name: "AlYahyeai Hijama Center", nameAr: "مركز اليحيائي للحجامة", img: AlYahyeai, rating: 3 },
    { id: 4, name: "BMC Center", nameAr: "مركز بي إم سي", img: "/BMC.png", rating: 3 },
    { id: 5, name: "Al Manar Hijama Center", nameAr: "مركز المنار للحجامة", img: "/AlManar.png", rating: 3 },
  ];

  const t = {
    en: {
      home: "Home", centers: "Centers", dashboard: "Dashboard", login: "Logout",
      heroTitle: "Find and book the best traditional wellness centers in Muscat",
      searchPlaceholder: "Search centers", featured: "Featured Centers",
      all: "All Centers", view: "View Center", contact: "contact"
    },
    ar: {
      home: "الرئيسية", centers: "المراكز", dashboard: "لوحة التحكم", login: "دخول",
      heroTitle: "ابحث واحجز أفضل مراكز الاستشفاء التقليدية في مسقط",
      searchPlaceholder: "ابحث عن المراكز", featured: "المراكز المميزة",
      all: "كل المراكز", view: "عرض المركز", contact: "اتصل بنا"
    }
  };

  const current = t[lang];

  const filteredCenters = centers.filter((c) =>
    (lang === "en" ? c.name : c.nameAr).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`home-wrapper ${darkMode ? "dark" : ""} ${lang === "ar" ? "rtl" : ""}`}>

      {/* Navbar - الهيدر العلوي */}
      <nav className="navbar-custom">
        <div className="nav-logo-section">
          <span>Holistic Centers</span>
        </div>
        <ul className="nav-menu">

          <li>
            <Link to="/home" className="active">
              {current.home}
            </Link>
          </li>

          <li>
            <Link to="/customer/centers">
              {current.centers}
            </Link>
          </li>

          <li>
            <Link to="/customer/dashboard">
              {current.dashboard}
            </Link>
          </li>

          <li>
            <Link to="/login">
              {current.login}
            </Link>
          </li>

        </ul>
        <div className="nav-tools">
          <span className="tool-icon" onClick={() => setDarkMode(!darkMode)}>{darkMode ? <FaSun /> : <MdDarkMode />}</span>
          <span
            className="tool-icon"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
          >
            <MdOutlineLanguage />
          </span>
        </div>
      </nav>

      {/* Hero Section - الشريط الذي يحتوي على الخلفية والبحث */}
      <header className="hero-container">
        <div className="hero-bg-overlay">
          <img src="/logo.png" alt="Logo" className="hero-logo-img" />
          <h2 className="hero-text">{current.heroTitle}</h2>
          <div className="hero-search-wrapper">
            <input
              type="text"
              placeholder={current.searchPlaceholder}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-glass">🔍</span>
          </div>
        </div>
      </header>

      {/* Main Content - قسم البطاقات */}
      <main className="cards-section">
        <div className="container-inner">
          <h3 className="section-title">{current.featured}</h3>
          <div className="cards-layout">
            {filteredCenters.slice(0, 3).map((center) => (
              <div className="center-card-item" key={center.id}>
                <div className="center-card-img">
                  <img src={center.img} alt={center.name} />
                </div>
                <h4 className="center-card-name">{lang === "en" ? center.name : center.nameAr}</h4>
                <div className="center-card-stars">{"⭐".repeat(center.rating)}</div>

                <Link
  to="/customer/center-details"
  state={{ center }}
>
  <button className="center-card-btn">
    {current.view}
  </button>
</Link>
              </div>
            ))}
          </div>

          <h3 className="section-title" style={{ marginTop: '40px' }}>{current.all}</h3>
          <div className="cards-layout">
            {filteredCenters.map((center) => (
              <div className="center-card-item" key={center.id}>
                <div className="center-card-img">
                  <img src={center.img} alt={center.name} />
                </div>
                <h4 className="center-card-name">{lang === "en" ? center.name : center.nameAr}</h4>
                <div className="center-card-stars">{"⭐".repeat(center.rating)}</div>
                <Link
  to="/customer/center-details"
  state={{ center }}
>
  <button className="center-card-btn">
    {current.view}
  </button>
</Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer-simple-box" id="contact">
        <p onClick={() => navigate("/customer/contact")} className="footer-contact-link">
          <FaPhoneAlt className="footer-mini-icon" />
          {current.contact} +96899558654
        </p>

        <p onClick={() => navigate("/customer/contact")} className="footer-contact-link">
          <MdEmail className="footer-mini-icon" />
          customerservice@holisticcenter.com
        </p>
      </footer>
    </div>
  );
}