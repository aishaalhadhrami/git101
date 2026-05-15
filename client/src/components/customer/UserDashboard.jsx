import React, { useState } from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaHospital } from "react-icons/fa";
import CustomerLayout from "./CustomerLayout";
import "./Customer.css";

export default function UserDashboard() {
  const [activeCard, setActiveCard] = useState("");

  return (
    <CustomerLayout>
      <div className="user-dashboard-content">
        <h1>User Dashboard</h1>
        <p>Manage Your Holistic Centers System</p>

        <div className="user-dashboard-cards">
          <div
            className="user-dashboard-card clickable-dashboard-card"
            onClick={() => setActiveCard("booking")}
          >
            <MdOutlineCalendarMonth className="user-dashboard-icon" />
            <p>Booking</p>
            <h3>2</h3>
          </div>

          <div
            className="user-dashboard-card clickable-dashboard-card"
            onClick={() => setActiveCard("center")}
          >
            <FaHospital className="user-dashboard-icon" />
            <p>Total Center</p>
            <h3>5</h3>
          </div>
        </div>

        {activeCard === "booking" && (
          <div className="dashboard-record-box">
            <h2>Booking Summary</h2>

            <div className="dashboard-record-card">
              <p><strong>Treatment:</strong> Hijama</p>
              <p><strong>Center:</strong> Abna Freish Center</p>
              <p><strong>Date:</strong> 15 May 2026</p>
              <p><strong>Time:</strong> 10:00 AM</p>
              <p><strong>Price:</strong> 10 OMR</p>
              <p><strong>Status:</strong> Confirmed</p>
            </div>

            <div className="dashboard-record-card">
              <p><strong>Treatment:</strong> Oil Massage</p>
              <p><strong>Center:</strong> Abna Freish Center</p>
              <p><strong>Date:</strong> 20 May 2026</p>
              <p><strong>Time:</strong> 12:00 PM</p>
              <p><strong>Price:</strong> 15 OMR</p>
              <p><strong>Status:</strong> Pending</p>

              <div className="pending-btn-box">
                <button className="approval-btn">
                  Request Approval
                </button>
              </div>
            </div>
          </div>
        )}

        {activeCard === "center" && (
          <div className="dashboard-record-box">
            <h2>Centers Summary</h2>

            <div className="dashboard-record-card">
              <p><strong>Total Centers:</strong> 5</p>
              <p>Abna Freish Center</p>
              <p>Muscat Hijama Center</p>
              <p>Al Manar Hijama Center</p>
              <p>AlYahyaei Hijama Center</p>
              <p>BMC Center</p>
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}