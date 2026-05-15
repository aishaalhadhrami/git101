import React, { useState } from "react";
import { FaBars, FaMoon, FaSun, FaEdit, FaSave, FaStethoscope, FaTag } from "react-icons/fa";
import {
  MdLanguage, MdAttachMoney, MdTimer, MdLocationOn, MdAccountCircle, MdHome,
  MdDashboard, MdSettings, MdHistory, MdAddCircle,
  MdEdit, MdEventAvailable, MdLocalOffer, MdPerson
} from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import "./UpdateTreatment.css";

const SidebarItem = ({ icon, label, onClick, active }) => (
  <div className={`sidebar-item ${active ? "active" : ""}`} onClick={onClick}>
    <span className="sidebar-icon">{icon}</span>
    {label}
  </div>
);

export default function EditTretment() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [treatment, setTreatment] = useState({
    name: "Hijama (cupping Therapy)",
    price: "10",
    duration: "45",
    location: "Muscat",
    category: "Therapy",
    description: "Traditional wet cupping therapy for pain relief and detoxification."
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Treatment updated successfully!");
    navigate("/center/dashboard");
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? Unsaved changes will be lost.")) {
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
              <SidebarItem icon={<MdAddCircle />} label="Add Treatment" onClick={() => navigate("/center/add-treatment")} />
              <SidebarItem icon={<MdEdit />} label="Edit Treatment" active />
              <SidebarItem icon={<MdEventAvailable />} label="Management Appointments" onClick={() => navigate("/center/management-appointment")} />
              <SidebarItem icon={<MdLocalOffer />} label="Special Offer" onClick={() => navigate("/center/ManageSpecialOffer")} />
            </div>
            <div className="sidebar-logout" onClick={() => navigate("/")}>
              <IoLogOutOutline size={20} /> Logout
            </div>
          </div>

          <div className="content-wrapper">
            <img src={logoImg} alt="HCS Logo" className="profile-logo" style={{ width: '180px', marginBottom: '10px' }} />
            <h2 className="title"><FaEdit /> Update Treatment</h2>

            <form className="form-box" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="card-label"><FaStethoscope /> Treatment Name</label>
                <input type="text" className="styled-input" value={treatment.name}
                  onChange={(e) => setTreatment({ ...treatment, name: e.target.value })} />
              </div>

              <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="card-label"><MdAttachMoney /> Price (OMR)</label>
                  <input type="text" className="styled-input" value={treatment.price}
                    onChange={(e) => setTreatment({ ...treatment, price: e.target.value })} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="card-label"><MdTimer /> Duration</label>
                  <input type="text" className="styled-input" value={treatment.duration}
                    onChange={(e) => setTreatment({ ...treatment, duration: e.target.value })} />
                </div>
              </div>

              <div className="form-group">
                <label className="card-label"><FaTag /> Category</label>
                <select className="styled-input" value={treatment.category}
                  onChange={(e) => setTreatment({ ...treatment, category: e.target.value })}>
                  <option value="Therapy">Therapy</option>
                  <option value="Massage">Massage</option>
                  <option value="Hijama">Hijama</option>
                </select>
              </div>

              <div className="form-group">
                <label className="card-label"><MdLocationOn /> Location</label>
                <input type="text" className="styled-input" value={treatment.location}
                  onChange={(e) => setTreatment({ ...treatment, location: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="card-label">Description</label>
                <textarea className="styled-input" rows="3" value={treatment.description}
                  onChange={(e) => setTreatment({ ...treatment, description: e.target.value })}></textarea>
              </div>

              <div className="form-actions" style={{ display: 'flex', gap: '15px' }}>
                <button type="submit" className="save-btn" style={{ flex: 1 }}>
                  <FaSave /> Save
                </button>
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