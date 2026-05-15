import React from "react";
import { Link, useLocation  } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";
import CustomerLayout from "./CustomerLayout";
import "./Customer.css";

import AbnaLogo from "../../assets/AbnaFreish.png";
import F1 from "../../assets/F1.jpg";
import F2 from "../../assets/F2.jpg";
import F3 from "../../assets/F3.webp";
import F4 from "../../assets/F4.jpg";

export default function CenterDetails() {
  const location = useLocation();
  const center = location.state?.center || {
    name: "Abna Freish Center",
    img: "/AbnaFreish.png",
  };
  const treatments = [
    { name: "Hijama", price: "10 OMR", image: F1 },
    { name: "Oil Massage", price: "15 OMR", image: F2 },
    { name: "Headache & Migraine Treatment", price: "7 OMR", image: F3 },
    { name: "Nerve Treatment", price: "8 OMR", image: F4 },
  ];

  return (
    <CustomerLayout>
      <div className="center-details-page">
        <div className="center-details-logo-box"><img src={center.img} alt={center.name} /></div>
        <div className="treatment-list">
          {treatments.map((item, index) => (
            <div className="treatment-card" key={index}>
              <img src={item.image} alt={item.name} />
              <div className="treatment-info"><p>{item.name}</p><span>{item.price}</span></div>
              <Link to="/customer/appointment-book"><button type="button">Details</button></Link>
            </div>
          ))}
        </div>
        <div className="reviews-section">
          <h3>Customers Reviews</h3>
          <div className="reviews-box">
            <div className="review-card">
              <div className="review-user"><CgProfile className="small-profile-icon" /><span>Maha Al-Rashdi</span></div>
              <p>I tried cupping with them, and the experience was excellent. I did it with Dr. Aisha, and her touch is very gentle.</p>
              <div className="review-icons"><BsFillHandThumbsDownFill className="clickable-icon" /><BsFillHandThumbsUpFill className="clickable-icon" /></div>
            </div>
            <div className="review-card">
              <div className="review-user"><CgProfile className="small-profile-icon" /><span>Ali Salim</span></div>
              <p>I took my mother for herbal treatment, and the experience was excellent. Her joint pain eased significantly.</p>
              <div className="review-icons"><RiDeleteBin2Fill className="clickable-icon delete-icon" /></div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
