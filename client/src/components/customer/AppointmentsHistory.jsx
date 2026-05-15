import React from "react";
import CustomerLayout from "./CustomerLayout";
import "./Customer.css";

export default function AppointmentsHistory() {
  return (
    <CustomerLayout>
      <div className="history-content">
        <h1>Booking History</h1>
        <div className="history-wrapper">
          <h2>order summary</h2>
          <div className="history-card">
            <p><strong>Hijama</strong> (Cupping Therapy)</p>
            <p>Center: Abna Freish Center</p>
            <p>Price: <span>10 OMR</span></p>
            <p>Duration: 45 minutes</p>
            <br />
            <p>Location: Muscat</p>
          </div>
          <button className="history-btn">Request Approval for Cancel and Refund</button>
        </div>
      </div>
    </CustomerLayout>
  );
}
