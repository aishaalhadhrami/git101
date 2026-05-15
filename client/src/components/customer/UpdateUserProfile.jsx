import React from "react";
import CustomerLayout from "./CustomerLayout";
import "./Customer.css";

export default function UpdateUserProfile() {
  return (
    <CustomerLayout>
      <div className="customer-content">
        <div className="customer-box">
          <img src="/logo.png" alt="HCS" className="customer-logo" />
          <h2>Update User Profile</h2>
          <form className="customer-form">
            <input type="text" placeholder="Username" />
            
            <input type="tel" placeholder="Phone Number" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button type="button">Update</button>
          </form>
        </div>
      </div>
    </CustomerLayout>
  );
}
