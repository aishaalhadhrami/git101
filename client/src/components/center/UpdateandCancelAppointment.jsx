import React, { useState } from "react";
import { FaBars, FaMoon, FaSun, FaEdit, FaTimesCircle, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import {
  MdLanguage, MdAttachMoney, MdOutlineMedicalServices, MdEmail, MdAccountCircle, MdHome,
  MdDashboard, MdSettings, MdHistory, MdAddCircle,
  MdEdit, MdEventAvailable, MdLocalOffer, MdPerson
} from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import "./UpdateandCancelAppointment.css";

const SidebarItem = ({ icon, label, onClick, active }) => (
  <div className={`sidebar-item ${active ? "active" : ""}`} onClick={onClick}>
    <span className="sidebar-icon">{icon}</span>
    {label}
  </div>
);

export default function UpdateandCancelAppointment() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [appointments, setAppointments] = useState([
    { id: 1, customerName: "Ali Ahmed", email: "Ali@gmail.com", price: "10 OMR", duration: "45 Minutes", location: "Seeb", service: "Hijama Session" },
    { id: 2, customerName: "Sara Said", email: "Sara@gmail.om", price: "25 OMR", duration: "60 Minutes", location: "Bawshar", service: "Physical Therapy" }
  ]);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments(appointments.filter(appt => appt.id !== id));
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
              <SidebarItem icon={<MdEventAvailable />} label="Management Appointments" active />
              <SidebarItem icon={<MdLocalOffer />} label="Special Offer" onClick={() => navigate("/center/ManageSpecialOffer")} />
            </div>
            <div className="sidebar-logout" onClick={() => navigate("/")}>
              <IoLogOutOutline size={20} /> Logout
            </div>
          </div>

          <div className="content-wrapper">
            <img src={logoImg} alt="HCS Logo" className="profile-logo" style={{ width: '180px', marginBottom: '10px' }} />
            <h2 className="title"><MdOutlineMedicalServices /> Update and Cancel Appointment</h2>

            <div className="appointments-list-container">
              {appointments.length > 0 ? (
                appointments.map((appt) => (
                  <div key={appt.id} className="form-box appointment-card">
                    <div className="card-header-info">
                      <div className="user-profile-info">
                        <MdAccountCircle size={40} color="#76a37b" />
                        <div>
                          <h3>{appt.customerName}</h3>
                          <span className="email-span"><MdEmail /> {appt.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="appointment-details-grid">
                      <div className="detail-item">
                        <label><MdOutlineMedicalServices /> Service</label>
                        <p>{appt.service}</p>
                      </div>
                      <div className="detail-item">
                        <label><MdAttachMoney /> Price</label>
                        <p>{appt.price}</p>
                      </div>
                      <div className="detail-item">
                        <label><FaClock /> Duration</label>
                        <p>{appt.duration}</p>
                      </div>
                      <div className="detail-item">
                        <label><FaMapMarkerAlt /> Location</label>
                        <p>{appt.location}</p>
                      </div>
                    </div>

                    <div className="form-actions card-btns">
                      <button className="save-btn edit-btn"
                        onClick={() => navigate("/center/update-appointment", { state: { appointment: appt } })}>
                        <FaEdit /> Edit
                      </button>
                      <button className="save-btn cancel-btn" onClick={() => handleCancel(appt.id)}>
                        <FaTimesCircle /> Cancel
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>No appointments found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}