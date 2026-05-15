import React from "react";
import { Link } from "react-router-dom";
import CustomerLayout from "./CustomerLayout";
import "./Customer.css";

import AbnaLogo from "../../assets/AbnaFreish.png";
import MuscatLogo from "../../assets/Muscat.jpg";
import AlManarLogo from "../../assets/AlManar.jpg";
import AlYahyeaiLogo from "../../assets/AlYahyeai.jpeg";
import BmcLogo from "../../assets/BMC.jpg";

export default function CustomerCenters() {
  const centers = [
    { name: "Abna Freish Center", phone: "+69899558654", image: AbnaLogo },
    { name: "Muscat Hijama Center", phone: "+69899558654", image: MuscatLogo },
    { name: "Al Manar Hijama Center", phone: "+69899558654", image: AlManarLogo },
    { name: "AlYahyaei Hijama Center", phone: "+69899558654", image: AlYahyeaiLogo },
    { name: "BMC Center", phone: "+69899558654", image: BmcLogo },
  ];

  return (
    <CustomerLayout>
      <div className="centers-content">
        <h1>Discover our Trusted Centers</h1>
        <div className="centers-grid">
          {centers.map((center, index) => (
            <div className="center-card-customer" key={index}>
              <img src={center.image} alt={center.name} />
              <h3>{center.name}</h3>
              <p>{center.phone}</p>
              <Link to="/customer/center-details" state={{ center }}>
                <button className="center-card-btn">
                  View Center
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
}
