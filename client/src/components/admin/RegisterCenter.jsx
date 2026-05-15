import React, { useState } from "react";
import "./Admin.css";
import {
  FaMoon,
  FaSun,
  FaBars,
  FaPlus,
  FaHome,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { MdLanguage } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function RegisterCenter() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const passChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  const isPasswordValid = Object.values(passChecks).every(Boolean);

  const isPhoneValid =
    phone.length === 8 &&
    (phone.startsWith("9") || phone.startsWith("7"));

  const handleRegister = async () => {
    setMessage("");
    setError("");

    if (!username || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      setError("Email must end with @gmail.com");
      return;
    }

    if (!isPhoneValid) {
      setError("Phone number must be 8 digits and start with 9 or 7");
      return;
    }

    if (!isPasswordValid) {
      setError("Password does not meet requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:3002/register-center", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          phone,
          password,
        }),
      });

      const result = await res.json();

      if (result.message === "Center Registered") {
        setMessage("Center registered successfully!");

        setUsername("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(result.message);
      }

    } catch (error) {
      setError("Server Error");
    }
  };

  return (
    <div className={`admin-page ${darkMode ? "dark" : ""}`}>
      <div className="overlay">

        <div className="topbar">

          <div className="topbar-left">
            <button
              className="icon-btn"
              onClick={() => setOpen(!open)}
            >
              <FaBars />
            </button>

            <span className="menu-text">
              Menu
            </span>
          </div>

          <div className="topbar-center">

            <span
              className="nav-item"
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
            </span>

            <span
              className="nav-item"
              onClick={() => navigate("/admin/management")}
            >
              Admin Management
            </span>

            <span className="nav-item active">
              Register Center
            </span>

          </div>

          <div className="topbar-right">

            <button
              className="icon-btn"
              onClick={() => navigate("/admin/dashboard")}
            >
              <FaHome />
            </button>

            <button
              className="icon-btn"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <FaSun color="#f1c40f" />
              ) : (
                <FaMoon />
              )}
            </button>

            <button className="icon-btn">
              <MdLanguage />
            </button>

          </div>
        </div>

        <div className="layout">

          <div className={`sidebar ${open ? "open" : ""}`}>

            <div className="sidebar-content">

              <div
                className="sidebar-item"
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </div>

              <div
                className="sidebar-item"
                onClick={() => navigate("/admin/management")}
              >
                Admin Management
              </div>

              <div className="sidebar-item active">
                Register Center
              </div>

            </div>

            <div
              className="sidebar-logout"
              onClick={() => navigate("/")}
            >
              <IoLogOutOutline style={{ marginRight: "8px" }} />
              Logout
            </div>

          </div>

          <div className="content-wrapper">

            <img
              src="/logo.png"
              alt="logo"
              className="logo"
            />

            <h2 className="title">
              Register New Center
            </h2>

            <div className="management-card">

              {message && (
                <p
                  style={{
                    color: "#76a37b",
                    fontWeight: "bold",
                  }}
                >
                  {message}
                </p>
              )}

              {error && (
                <p
                  style={{
                    color: "#c0392b",
                    fontWeight: "bold",
                  }}
                >
                  {error}
                </p>
              )}

              <input
                type="text"
                placeholder="Center Name"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <div style={{ width: "100%" }}>

                <input
                  type="email"
                  placeholder="Center Email (centername@gmail.com)"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {email &&
                  !email.endsWith("@gmail.com") && (
                    <p
                      style={{
                        color: "#c0392b",
                        fontSize: "12px",
                        marginTop: "-10px",
                        textAlign: "left",
                      }}
                    >
                      * Email must end with @gmail.com
                    </p>
                  )}

              </div>

              <div style={{ width: "100%" }}>

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                {phone && !isPhoneValid && (
                  <p
                    style={{
                      color: "#c0392b",
                      fontSize: "12px",
                      marginTop: "-10px",
                      textAlign: "left",
                    }}
                  >
                    * Phone must be 8 digits and start with 9 or 7
                  </p>
                )}

              </div>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                }}
              >

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#76a37b",
                  }}
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </span>

              </div>

              {password && !isPasswordValid && (
                <div
                  style={{
                    textAlign: "left",
                    fontSize: "11px",
                    color: "#c0392b",
                    marginTop: "-5px",
                    marginBottom: "10px",
                  }}
                >
                  <p style={{ margin: "2px 0" }}>
                    Missing requirements:
                  </p>

                  <ul
                    style={{
                      margin: "0",
                      paddingLeft: "15px",
                    }}
                  >
                    {!passChecks.length && (
                      <li>At least 8 characters</li>
                    )}

                    {!passChecks.uppercase && (
                      <li>
                        One uppercase letter A-Z
                      </li>
                    )}

                    {!passChecks.number && (
                      <li>One number 0-9</li>
                    )}

                    {!passChecks.special && (
                      <li>
                        One special character
                        @#$%^&*
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <div
                style={{
                  position: "relative",
                  width: "100%",
                }}
              >

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm Password"
                  className="input"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

                <span
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#76a37b",
                  }}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </span>

              </div>

              {confirmPassword &&
                password !== confirmPassword && (
                  <p
                    style={{
                      color: "#c0392b",
                      fontSize: "12px",
                      marginTop: "-10px",
                      textAlign: "left",
                    }}
                  >
                    * Passwords do not match
                  </p>
                )}

              <button
                className="remove-btn"
                style={{
                  backgroundColor:
                    isPasswordValid &&
                    isPhoneValid
                      ? "#76a37b"
                      : "#95a5a6",
                }}
                onClick={handleRegister}
              >
                <FaPlus
                  style={{ marginRight: "8px" }}
                />

                Register Center
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}