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

export default function AddTreatment() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      navigate("/center/dashboard");
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
              <SidebarItem icon={<MdAddCircle />} label="Add Treatment" active />
              <SidebarItem icon={<MdEdit />} label="Edit Treatment" onClick={() => navigate("/center/edit-treatment")} />
              <SidebarItem icon={<MdEventAvailable />} label="Management Appointments" onClick={() => navigate("/center/management-appointment")} />
              <SidebarItem icon={<MdLocalOffer />} label="Special Offer" onClick={() => navigate("/center/ManageSpecialOffer")} />
            </div>
            <div className="sidebar-logout" onClick={() => navigate("/")}>
              <IoLogOutOutline size={20} /> Logout
            </div>
          </div>

          <div className="content-wrapper">
            <img src={logoImg} alt="HCS Logo" className="profile-logo"
              style={{ width: '180px', height: 'auto', marginBottom: '10px' }} />
            <h2 className="title">Add Treatment</h2>

            <form className="form-box">
              <div className="form-group">
                <label className="card-label">Treatment Name</label>
                <input type="text" className="styled-input" placeholder="Hijama (cupping Therapy)" />
              </div>

              <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="card-label">Price</label>
                  <input type="text" className="styled-input" placeholder="10 OMR" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="card-label">Duration</label>
                  <input type="text" className="styled-input" placeholder="45 min" />
                </div>
              </div>

              <div className="form-group">
                <label className="card-label">Upload Image Link</label>
                <input type="text" className="styled-input" placeholder="https://..." />
              </div>

              <div className="form-group">
                <label className="card-label">Location</label>
                <input type="text" className="styled-input" placeholder="Muscat" />
              </div>

              <div className="form-group">
                <label className="card-label">Description</label>
                <textarea className="styled-input" rows="3" placeholder="Enter description here..."></textarea>
              </div>

              <div className="form-actions" style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button type="submit" className="save-btn" style={{ flex: 1 }}>Add</button>
                <button type="button" className="save-btn cancel-btn" style={{ flex: 1 }} onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}