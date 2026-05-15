import React, { useState } from "react";
import "./Center.css";
import {
  MdLanguage, MdAccountCircle, MdHome, MdPhone, MdCloudUpload,
  MdDashboard, MdSettings, MdHistory, MdAddCircle,
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

export default function CenterProfile() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [phone, setPhone] = useState("98765432");
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    alert("Changes saved successfully!");
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
              <SidebarItem icon={<MdPerson />} label="Profile" active />
              <SidebarItem icon={<MdDashboard />} label="Dashboard" onClick={() => navigate("/center/dashboard")} />
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
            <div className="profile-image-container" style={{ position: 'relative', marginBottom: '20px' }}>
              <img
                src={profileImage || logoImg}
                alt="Center Profile"
                className="profile-logo"
                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #76a37b' }}
              />
              <label htmlFor="upload-photo" className="upload-icon-label" style={{
                position: 'absolute', bottom: '5px', right: '5px', background: '#76a37b',
                color: 'white', borderRadius: '50%', padding: '8px', cursor: 'pointer', display: 'flex'
              }}>
                <MdCloudUpload size={20} />
                <input type="file" id="upload-photo" hidden onChange={handleImageChange} accept="image/*" />
              </label>
            </div>

            <h2 className="title">Center Profile</h2>

            <form className="form-box" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="card-label">Center Name</label>
                <input type="text" className="styled-input" value="HCS Medical Center" readOnly
                  style={{ background: '#f5f5f5', cursor: 'not-allowed' }} />
              </div>
              <div className="form-group">
                <label className="card-label">Email Address</label>
                <input type="email" className="styled-input" value="center@hcs.com" readOnly
                  style={{ background: '#f5f5f5', cursor: 'not-allowed' }} />
              </div>
              <div className="form-group">
                <label className="card-label">Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" className="styled-input" value={phone}
                    onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone Number" />
                  <MdPhone style={{ position: 'absolute', right: '15px', top: '12px', color: '#76a37b' }} />
                </div>
              </div>
              <div className="form-actions" style={{ marginTop: '20px' }}>
                <button type="button" className="save-btn" style={{ width: '100%' }} onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}