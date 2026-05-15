import React, { useState } from "react";
import "./Center.css";
import {
  MdOutlineCalendarMonth, MdLanguage, MdOutlineReviews,
  MdMedicalServices, MdAccountCircle, MdAccessTime, MdFilterList,
  MdTrendingUp, MdAttachMoney, MdPhone, MdHome,
  MdDashboard, MdSettings, MdHistory, MdAddCircle,
  MdEdit, MdEventAvailable, MdLocalOffer, MdPerson
} from "react-icons/md";
import { FaMoon, FaSun, FaBars, FaStar, FaRegStar, FaUserAlt } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ icon, label, onClick, active }) => (
  <div className={`sidebar-item ${active ? "active" : ""}`} onClick={onClick}>
    <span className="sidebar-icon">{icon}</span>
    {label}
  </div>
);

export default function CenterDashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeCard, setActiveCard] = useState("");

  const [filterDate, setFilterDate] = useState("");
  const [filterYear, setFilterYear] = useState("2026");
  const [filterMonth, setFilterMonth] = useState("All");

  const bookingsData = [
    { id: 1, userName: "Ahmed Al-Saadi", userEmail: "ahmed@example.com", date: "2026-05-10", time: "09:00 AM", price: 25, treatmentType: "Hijama" },
    { id: 2, userName: "Sara Al-Balushi", userEmail: "sara@example.com", date: "2026-06-15", time: "11:30 AM", price: 40, treatmentType: "Chinese Medicine" },
    { id: 3, userName: "Mazin Al-Harthy", userEmail: "mazin@example.com", date: "2026-05-10", time: "01:00 PM", price: 15, treatmentType: "Herbs" },
    { id: 4, userName: "Laila Al-Riyami", userEmail: "laila@example.com", date: "2025-08-20", time: "10:00 AM", price: 30, treatmentType: "Massage" },
    { id: 5, userName: "Oman Al-Rawahi", userEmail: "oman@example.com", date: "2024-12-05", time: "04:00 PM", price: 20, treatmentType: "Hijama" },
    { id: 6, userName: "Fahad Al-Abri", userEmail: "fahad@example.com", date: "2026-05-22", time: "08:00 AM", price: 25, treatmentType: "Hijama" },
  ];

  const reviewsData = [
    { id: 1, userName: "Salim Al-Kindi", phone: "91234567", stars: 5, date: "2026-05-01" },
    { id: 2, userName: "Muna Al-Farsi", phone: "98765432", stars: 4, date: "2026-05-05" },
    { id: 3, userName: "Ishaq Al-Nabi", phone: "92233445", stars: 3, date: "2026-05-08" },
  ];

  const filteredBookings = bookingsData.filter(b => {
    const matchesDate = filterDate === "" || b.date === filterDate;
    const matchesYear = b.date.startsWith(filterYear);
    return matchesDate && matchesYear;
  });

  const getAnalysis = () => {
    let totalRev = 0;
    const stats = {};
    bookingsData.forEach(b => {
      const [bYear, bMonth] = b.date.split("-");
      if (bYear === filterYear && (filterMonth === "All" || bMonth === filterMonth)) {
        stats[b.treatmentType] = (stats[b.treatmentType] || 0) + 1;
        totalRev += b.price;
      }
    });
    return {
      services: Object.entries(stats).sort((a, b) => b[1] - a[1]),
      totalRev,
      count: Object.values(stats).reduce((a, b) => a + b, 0)
    };
  };

  const { services, totalRev, count } = getAnalysis();

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      i < rating ? <FaStar key={i} color="#f1c40f" /> : <FaRegStar key={i} color="#f1c40f" />
    ));
  };

  return (
    <div className={`center-page ${darkMode ? "dark" : ""}`}>
      <div className="background-glow-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      <div className="center-overlay">

        <div className="topbar">
          <div className="topbar-left">
            <button className="icon-btn" onClick={() => setOpen(!open)}><FaBars /></button>
            <button className="icon-btn profile-nav-btn" onClick={() => navigate("/center/center-profile")}>
              <MdAccountCircle size={32} />
            </button>
            <span className="menu-text">Center Panel</span>
          </div>

          <div className="topbar-center">

          </div>

          <div className="topbar-right">
            <button className="icon-btn" onClick={() => setActiveCard("")} title="Dashboard Home">
              <MdHome size={28} style={{ color: darkMode ? "#fff" : "#3b3f2e" }} />
            </button>
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun color="#f1c40f" /> : <FaMoon />}
            </button>
            <button className="icon-btn"><MdLanguage /></button>
          </div>
        </div>

        <div className="layout">

          <div className={`sidebar ${open ? "open" : ""}`}>
            <div className="sidebar-content">
              <SidebarItem icon={<MdPerson />} label="Profile" onClick={() => navigate("/center/center-profile")} />
              <SidebarItem icon={<MdDashboard />} label="Dashboard" active />
              <SidebarItem icon={<MdSettings />} label="Management" onClick={() => navigate("/center/management")} />
              <SidebarItem icon={<MdHistory />} label="Refund Requests" onClick={() => navigate("/center/appointment-refundApproval")} />
              <SidebarItem icon={<MdAddCircle />} label="Add Treatment" onClick={() => navigate("/center/add-treatment")} />
              <SidebarItem icon={<MdEdit />} label="Edit Treatment" onClick={() => navigate("/center/edit-treatment")} />
              <SidebarItem icon={<MdEventAvailable />} label="Management Appointments" onClick={() => navigate("/center/management-appointment")} />
              <SidebarItem icon={<MdLocalOffer />} label="Special Offer" onClick={() => navigate("/center/ManageSpecialOffer")} />
            </div>

            <div className="sidebar-logout" onClick={() => navigate("/")}>
              <IoLogOutOutline size={20} /> Logout
            </div>
          </div>

          <div className="content-wrapper">
            <h2 className="title">Center Dashboard</h2>

            <div className="cards-container">
              <div className={`card clickable-card ${activeCard === "bookings" ? "active-card" : ""}`}
                onClick={() => setActiveCard(activeCard === "bookings" ? "" : "bookings")}>
                <MdOutlineCalendarMonth className="card-icon" />
                <p>Total Booking</p>
                <h3>{bookingsData.length}</h3>
              </div>

              <div className={`card clickable-card ${activeCard === "reviews" ? "active-card" : ""}`}
                onClick={() => setActiveCard(activeCard === "reviews" ? "" : "reviews")}>
                <MdOutlineReviews className="card-icon" />
                <p>Reviews</p>
                <div className="stars-row">
                  <FaStar color="#f1c40f" /><FaStar color="#f1c40f" /><FaStar color="#f1c40f" /><FaStar color="#f1c40f" /><FaRegStar color="#f1c40f" />
                </div>
                <h3>4.0</h3>
              </div>

              <div className={`card clickable-card ${activeCard === "analysis" ? "active-card" : ""}`}
                onClick={() => setActiveCard(activeCard === "analysis" ? "" : "analysis")}>
                <MdMedicalServices className="card-icon" />
                <p>Services Analysis</p>
                <h3>{services.length}</h3>
              </div>
            </div>

            {activeCard === "bookings" && (
              <div className="output-section">
                <div className="filter-container-row">
                  <div className="filter-item">
                    <label><MdFilterList /> Year:</label>
                    <select className="styled-select" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                    </select>
                  </div>
                  <div className="filter-item">
                    <label><MdOutlineCalendarMonth /> Date:</label>
                    <input type="date" className="styled-date-input" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
                  </div>
                  <button className="reset-btn" onClick={() => { setFilterDate(""); setFilterYear("2026") }}>Reset</button>
                </div>

                <div className="result-cards-grid">
                  {filteredBookings.map((b) => (
                    <div key={b.id} className="info-result-card">
                      <div className="res-header">
                        <span className="type-badge">{b.treatmentType}</span>
                        <span className="price-text">{b.price} OMR</span>
                      </div>
                      <div className="res-body">
                        <h4><FaUserAlt size={12} /> {b.userName}</h4>
                        <p>{b.userEmail}</p>
                        <div className="res-footer">
                          <span><MdOutlineCalendarMonth size={14} /> {b.date}</span>
                          <span><MdAccessTime size={14} /> {b.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeCard === "reviews" && (
              <div className="output-section">
                <div className="result-cards-grid">
                  {reviewsData.map((r) => (
                    <div key={r.id} className="info-result-card">
                      <div className="res-header">
                        <div className="stars-row">
                          {renderStars(r.stars)}
                        </div>
                        <span className="price-text">{r.stars}.0</span>
                      </div>
                      <div className="res-body">
                        <h4><FaUserAlt size={12} /> {r.userName}</h4>
                        <p><MdPhone size={14} /> {r.phone}</p>
                        <div className="res-footer">
                          <span><MdOutlineCalendarMonth size={14} /> {r.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeCard === "analysis" && (
              <div className="output-section">
                <div className="filter-container-row">
                  <div className="filter-item">
                    <label><MdFilterList /> Year:</label>
                    <select className="styled-select" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                    </select>
                  </div>
                  <div className="filter-item">
                    <label><MdOutlineCalendarMonth /> Month:</label>
                    <select className="styled-select" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                      <option value="All">All Months</option>
                      <option value="01">January</option><option value="02">February</option>
                      <option value="03">March</option><option value="04">April</option>
                      <option value="05">May</option><option value="06">June</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                  <button className="reset-btn" onClick={() => { setFilterMonth("All"); setFilterYear("2026") }}>Reset</button>
                </div>

                <div className="analysis-summary-row">
                  <div className="summary-mini-card">
                    <MdTrendingUp color="#76a37b" />
                    <span>Bookings: <strong>{count}</strong></span>
                  </div>
                  <div className="summary-mini-card">
                    <MdAttachMoney color="#2c3123" />
                    <span>Total income: <strong>{totalRev} OMR</strong></span>
                  </div>
                </div>

                <div className="result-cards-grid">
                  {services.map(([type, sCount]) => (
                    <div key={type} className="info-result-card analysis-card">
                      <div className="res-header">
                        <span className="type-badge">{type}</span>
                        <div className="trend-indicator">%{Math.round((sCount / (count || 1)) * 100)}</div>
                      </div>
                      <div className="res-body-analysis">
                        <div className="stat-circle">
                          <h2>{sCount}</h2>
                          <p>Bookings</p>
                        </div>
                        <div className="progress-bar-container">
                          <div className="progress-fill" style={{ width: `${(sCount / (count || 1)) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}