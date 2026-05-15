import React, { useState } from "react";
import "./Management.css";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import {
  MdLanguage, MdAccountCircle, MdHome, MdDashboard, MdSettings, MdHistory, MdAddCircle,
  MdEdit, MdEventAvailable, MdLocalOffer, MdPerson
} from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";

const SidebarItem = ({ icon, label, onClick, active }) => (
  <div className={`sidebar-item ${active ? "active" : ""}`} onClick={onClick}>
    <span className="sidebar-icon">{icon}</span>
    {label}
  </div>
);

export default function CenterManagement() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [categories, setCategories] = useState(["Hijama", "Bee Venom", "Herbal Medicine"]);

  const handleDelete = (indexToDelete) => {
    if (window.confirm(`Are you sure you want to delete "${categories[indexToDelete]}"?`)) {
      setCategories(categories.filter((_, index) => index !== indexToDelete));
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
              <SidebarItem icon={<MdSettings />} label="Management" active />
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
            <img src={logoImg} alt="HCS Logo" className="profile-logo" style={{ width: '180px', marginBottom: '10px' }} />
            <h2 className="title">Center Management</h2>

            <div className="categories-box">
              <div className="box-header">Existing Categories</div>
              {categories.map((cat, index) => (
                <div key={index} className="category-row">
                  <span className="category-name">{cat}</span>
                  <div className="action-buttons">
                    <button className="btn-dark" onClick={() => navigate("/center/edit-treatment")}>Edit</button>
                    <button className="btn-dark delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>

            <button className="add-category-btn" onClick={() => navigate("/center/add-treatment")}>
              Add New Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}