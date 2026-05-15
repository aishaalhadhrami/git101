import React, { useState } from "react";
import "./Center.css";
import {
  MdLanguage, MdAccountCircle, MdHome, MdDashboard, MdSettings, MdHistory, MdAddCircle,
  MdEdit, MdEventAvailable, MdLocalOffer, MdPerson
} from "react-icons/md";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";

const SidebarItem = ({ icon, label, onClick, active }) => (
  <div className={`sidebar-item ${active ? "active" : ""}`} onClick={onClick}>
    <span className="sidebar-icon">{icon}</span>
    {label}
  </div>
);

export default function ManageSpecialOffer() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [offerData, setOfferData] = useState({ treatment: '', price: '', details: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferData({ ...offerData, [name]: value });
  };

  const handleSend = (e) => {
    e.preventDefault();
    setMessage('The offer has been successfully submitted');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all fields?")) {
      setOfferData({ treatment: '', price: '', details: '' });
      setMessage('');
    }
  };

  return (
    <div className={`center-page ${darkMode ? "dark" : ""}`}>
      <div className="center-overlay">
        <div className="topbar">
          <div className="topbar-left">
            <button className="icon-btn" onClick={() => setOpen(!open)}><FaBars /></button>
            <button className="icon-btn profile-nav-btn" onClick={() => navigate("/center/center-profile")}>
              <MdAccountCircle size={32} />
            </button>
            <span className="menu-text">Center Panel</span>
          </div>

          <div className="topbar-center"></div>

          <div className="topbar-right">
            <button className="icon-btn" onClick={() => navigate("/center/dashboard")} title="Dashboard Home">
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
              <SidebarItem icon={<MdDashboard />} label="Dashboard" onClick={() => navigate("/center/dashboard")} />
              <SidebarItem icon={<MdSettings />} label="Management" onClick={() => navigate("/center/management")} />
              <SidebarItem icon={<MdHistory />} label="Refund Requests" onClick={() => navigate("/center/appointment-refundApproval")} />
              <SidebarItem icon={<MdAddCircle />} label="Add Treatment" onClick={() => navigate("/center/add-treatment")} />
              <SidebarItem icon={<MdEdit />} label="Edit Treatment" onClick={() => navigate("/center/edit-treatment")} />
              <SidebarItem icon={<MdEventAvailable />} label="Management Appointments" onClick={() => navigate("/center/management-appointment")} />
              <SidebarItem icon={<MdLocalOffer />} label="Special Offer" active />
            </div>
            <div className="sidebar-logout" onClick={() => navigate("/")}>
              <IoLogOutOutline size={20} /> Logout
            </div>
          </div>

          <div className="content-wrapper">
            <img src={logoImg} alt="HCS Logo" className="profile-logo"
              style={{ width: '180px', height: 'auto', marginBottom: '10px' }} />
            <h2 className="title">Manage Special Offer</h2>

            <form className="form-box" onSubmit={handleSend} style={{ width: '100%', maxWidth: '600px' }}>
              <div className="form-group">
                <label className="card-label">Treatment Name</label>
                <input type="text" name="treatment" className="styled-input"
                  placeholder="e.g. Hijama Special Session"
                  value={offerData.treatment} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label className="card-label">Offer Price (OMR)</label>
                <input type="number" name="price" className="styled-input"
                  placeholder="25" value={offerData.price} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label className="card-label">Offer Details</label>
                <textarea name="details" className="styled-input" rows="4"
                  placeholder="Enter specific offer details and duration..."
                  value={offerData.details} onChange={handleChange} required
                  style={{ resize: 'none' }}></textarea>
              </div>

              {message && (
                <div style={{
                  textAlign: 'center', color: '#76a37b', marginBottom: '15px',
                  fontWeight: 'bold', padding: '10px',
                  background: 'rgba(118, 163, 123, 0.1)', borderRadius: '8px'
                }}>
                  {message}
                </div>
              )}

              <div className="form-actions" style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button type="submit" className="save-btn" style={{ flex: 1 }}>Send Offer</button>
                <button type="button" className="save-btn cancel-btn"
                  style={{ flex: 1, backgroundColor: 'transparent', border: '2px solid #76a37b', color: '#76a37b' }}
                  onClick={handleClear}>
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}