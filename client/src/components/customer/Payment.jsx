import React from "react";
import { MdLocationOn } from "react-icons/md";
import CustomerLayout from "./CustomerLayout";
import "./Customer.css";
import logo from "../../assets/logo.png";

export default function Payment() {
  return (
    <CustomerLayout>
      <div className="payment-content">
        <h1>Treatment Payment</h1>
        <div className="payment-policy">
          <p>I agree to be on date for my appointment and refunds follow the center’s policy, and are processed manually at center.</p>
          <input type="checkbox" />
        </div>
        <div className="payment-box">
          <div className="payment-left">
            <div className="payment-logo-row"><img src={logo} alt="logo" /><h3>Holistic Centers</h3></div>
            <div className="payment-treatment-card">
              <p><strong>Hijama</strong> (Cupping Therapy)</p>
              <p>Center: Abna Freish Center</p>
              <p>Price: 10 OMR</p>
              <p>Duration: 45 minutes</p>
              <div className="payment-location"><p>Location: Muscat</p><MdLocationOn /><p>Al Seeb</p></div>
              <hr />
              <div className="payment-total"><strong>Total</strong><strong>10.000 OMR</strong></div>
            </div>
          </div>
          <div className="payment-right">
            <h3>Pay With Card</h3>
            <label>Card Information</label>
            <input type="text" placeholder="Card Number" className="payment-input" />
            <div className="payment-small-inputs"><input type="text" placeholder="MM / YY" /><input type="text" placeholder="CVV" /></div>
            <label>Name on Card</label>
            <input type="text" placeholder="Full Name" className="payment-input" />
            <button className="pay-btn">Pay 10.000 OMR</button>
            <button className="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
