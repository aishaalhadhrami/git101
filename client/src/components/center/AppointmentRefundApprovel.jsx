import React, { useState } from "react";
import "./AppointmentRefundApproval.css";
import { FaBars, FaMoon, FaSun, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
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

export default function AppointmentRefundApproval() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [refundRequests, setRefundRequests] = useState([
    { id: 1, patient: "Ahmed Ali", service: "Hijama", amount: "15 OMR", reason: "Double Booking", status: "pending" },
    { id: 2, patient: "Sara Salem", service: "Bee Venom", amount: "25 OMR", reason: "Health Emergency", status: "pending" },
    { id: 3, patient: "John Doe", service: "Herbal Medicine", amount: "10 OMR", reason: "Travel Plans Changed", status: "pending" },
  ]);

  const handleAction = (id, actionType) => {
    const label = actionType === "approved" ? "approve" : "reject";
    if (!window.confirm(`Are you sure you want to ${label} this refund request?`)) return;

    setRefundRequests((prev) =>
      prev.map((req) => req.id === id ? { ...req, status: actionType } : req)
    );
    setTimeout(() => {
      setRefundRequests((prev) => prev.filter((req) => req.id !== id));
    }, 3000);
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
              <SidebarItem icon={<MdHistory />} label="Refund Requests" active />
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
            <img src={logoImg} alt="Logo" className="profile-logo" style={{ width: '180px', marginBottom: '10px' }} />
            <h2 className="title">Refund Requests Approval</h2>

            <div className="requests-container">
              {refundRequests.map((request) => (
                <div key={request.id} className="refund-card-wrapper">
                  {request.status === "pending" ? (
                    <div className="refund-card">
                      <div className="request-info">
                        <div className="patient-name">{request.patient}</div>
                        <div className="service-name">{request.service} - <span className="price-text-highlight">{request.amount}</span></div>
                        <div className="refund-reason">Reason: {request.reason}</div>
                      </div>
                      <div className="approval-actions">
                        <button className="approve-btn" onClick={() => handleAction(request.id, "approved")}>
                          <FaCheckCircle /> Approve
                        </button>
                        <button className="reject-btn" onClick={() => handleAction(request.id, "rejected")}>
                          <FaTimesCircle /> Reject
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={`status-message-box ${request.status}`}>
                      {request.status === "approved"
                        ? "Request Approved. A notification has been sent to the user."
                        : "Request Rejected. A notification has been sent to the user."}
                    </div>
                  )}
                </div>
              ))}
              {refundRequests.length === 0 && <p className="no-requests">No pending refund requests.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}