import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code) {
      alert("Code is required");
      return;
    }

    navigate("/change-password", {
      state: { email, code },
    });
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-box">
          <img src="/logo.png" alt="HCS" className="login-logo" />

          <h2 className="login-heading">Verify Code</h2>

          <form onSubmit={handleSubmit}>
            <div className="login-input-wrap">
              <input
                type="text"
                placeholder="Enter Code"
                className="login-input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <button className="login-button" type="submit">
              Verify Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}