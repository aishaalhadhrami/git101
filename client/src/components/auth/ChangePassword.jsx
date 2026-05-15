import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const code = location.state?.code;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:3002/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code, password }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.message === "Password updated successfully") {
      alert("Password updated successfully");
      navigate("/login");
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-box">
          <img src="/logo.png" alt="HCS" className="login-logo" />

          <h2 className="login-heading">Change Password</h2>

          <h5 style={{ color: "red" }}>{message}</h5>

          <form onSubmit={handleSubmit}>
            <div className="login-input-wrap">
              <input
                type="password"
                placeholder="New Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login-input-wrap">
              <input
                type="password"
                placeholder="Confirm Password"
                className="login-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="login-button" type="submit">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}