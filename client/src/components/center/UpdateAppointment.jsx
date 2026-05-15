import React, { useState } from "react";
import "./UpdateAppointment.css"; 
import { FaBars, FaMoon, FaSun, FaCalendarAlt, FaSave } from "react-icons/fa";
import { MdLanguage, MdAccountCircle, MdDashboard, MdSettings, MdHistory, MdAddCircle, 
  MdEdit, MdEventAvailable, MdLocalOffer, MdPerson } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import logoImg from "../../assets/logo.png"; 

const SidebarItem = ({ icon, label, onClick, active }) => (
  <div className={`sidebar-item ${active ? "active" : ""}`} onClick={onClick}>
    <span className="sidebar-icon">{icon}</span>
    {label}
  </div>
);

export default function UpdateAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const appointment = location.state?.appointment;

  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const day = date.getUTCDay(); 

    if (day === 5) {
      alert("Friday is a holiday. Please choose another day.");
      setSelectedDate("");
    } else {
      setSelectedDate(e.target.value);
    }
  };

  const handleSave = () => {
    if(!selectedDate) return alert("Please select a date");
    alert("Appointment date updated successfully!");
    navigate("/center/management-appointment");
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
          
          <div className="topbar-center">
            <div className="nav-item" onClick={() => navigate("/center/dashboard")}>Dashboard</div>
          </div>

          <div className="topbar-right">
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
              <SidebarItem icon={<MdEventAvailable />} label="Management Appointments" active />
              <SidebarItem icon={<MdLocalOffer />} label="Special Offer" onClick={() => navigate("/center/ManageSpecialOffer")} />
            </div>
            
            <div className="sidebar-logout" onClick={() => navigate("/")}>
              <IoLogOutOutline size={20} /> Logout
            </div>
          </div>

          <div className="content-wrapper">
            <img src={logoImg} alt="HCS Logo" className="profile-logo" style={{ width: '180px', marginBottom: '10px' }} />
            <h2 className="title"><FaCalendarAlt /> Update Appointment Date</h2>

            {appointment && (
              <div className="form-box" style={{ maxWidth: '450px', marginBottom: '20px' }}>
                <p style={{ marginBottom: '8px' }}><strong>Patient:</strong> {appointment.customerName}</p>
                <p style={{ marginBottom: '8px' }}><strong>Service:</strong> {appointment.service}</p>
                <p style={{ marginBottom: '8px' }}><strong>Price:</strong> {appointment.price}</p>
                <p style={{ marginBottom: '0' }}><strong>Duration:</strong> {appointment.duration}</p>
              </div>
            )}

            <div className="form-box" style={{ maxWidth: '450px' }}>
              <div className="form-group">
                <label className="card-label"><FaCalendarAlt /> New Appointment Date</label>
                <input 
                  type="date" 
                  className="styled-input"
                  min={today}
                  value={selectedDate}
                  onChange={handleDateChange}
                />
                <p className="hint-text">* Note: Fridays are not available for booking.</p>
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>
                  <FaSave /> Save New Date
                </button>
                <button className="save-btn cancel-btn" onClick={() => navigate("/center/management-appointment")}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}