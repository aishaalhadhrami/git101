import React from "react";
import CustomerLayout from "./CustomerLayout";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./Customer.css";

export default function Contact() {
  return (
    <CustomerLayout>
      <div className="contact-content">
        <h1>Contact With Center</h1>
        <p className="contact-subtitle">
          We are here to help you on your wellness journey.
        </p>

        <div className="contact-card">
          <div className="contact-row">
            <div className="contact-icon">
              <FaPhoneAlt />
            </div>
            <p>Contact: +96899558654</p>
          </div>

          <div className="contact-line"></div>

          <div className="contact-row">
            <div className="contact-icon">
              <MdEmail />
            </div>
            <p>customerservice@holisticcenter.com</p>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}