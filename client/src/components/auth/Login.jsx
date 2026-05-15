import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { LoginValidation } from "../validations/LoginValidation";
import LoginValidation from "../../validations/LoginValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./Auth.css";

const Login = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginValidation) });

const handleSubmit = async (data) => {
  try {
    const res = await fetch("http://localhost:3002/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    setMessage(result.message);

    if (result.message === "success") {
      localStorage.setItem("user", JSON.stringify(result.user));

      if (result.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (result.user.role === "center") {
        navigate("/center/dashboard");
      } else {
        navigate("/home");
      }
    }
  } catch (error) {
    setMessage("Server Error");
  }
};

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-box">
          <img src="/logo.png" alt="HCS" className="login-logo" />

          <h2 className="login-heading">Login</h2>

          <h5 style={{ color: "red" }}>{message}</h5>

          <div className="login-input-wrap">
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              {...register("email")}
            />
            <p style={{ color: "red" }}>{errors.email?.message}</p>
          </div>

          <div className="login-input-wrap">
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              {...register("password")}
            />
            <p style={{ color: "red" }}>{errors.password?.message}</p>
          </div>

          <div className="forgot-wrap">
            <Link to="/forget-password" className="forgot-link">
              Forget Password ?
            </Link>
          </div>

          <button className="login-button" onClick={submitForm(handleSubmit)}>
            LOGIN
          </button>

          <p className="register-line">
            Do not have an account ? <Link to="/register">Register here</Link>
          </p>
        </div>

        <div className="bottom-message">
          <h3>Join us today and experience the healing power of traditional medicine !</h3>
          <p>With Holistic Centers</p>
        </div>
      </div>
    </div>
  );
};

export default Login;