import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3002/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        password,
      }),
    });

    const data = await res.json();

    setMessage(data.message);

    if (data.message === "Password updated successfully") {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-box">

          <img src="/logo.png" alt="HCS" className="login-logo" />

          <h2 className="login-heading">Reset Password</h2>

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

            <button className="login-button" type="submit">
              Update Password
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}