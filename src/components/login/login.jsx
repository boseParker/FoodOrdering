import React, { useState } from 'react';
import './login.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Login = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = currentState === "login" ? "login" : "register";
    const dataToSend = currentState === "login"
      ? { email: formData.email, password: formData.password }
      : { username: formData.username, email: formData.email, password: formData.password };

    try {
      const res = await fetch(`https://brutus-food-backend.onrender.com/api/${endpoint}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (res.ok) {
        if (currentState === "login") {
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
         
          alert("Logged in successfully!");
          navigate("/");
          setShowLogin(false);
          // Change this to your actual route
        } else {
          alert("Account created successfully!");
          setCurrentState("login");
        }
      } else {
        const errorMsg = data.error || JSON.stringify(data);
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Login/Register Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <div className='login-popup-title d-flex justify-content-between align-items-center text-dark'>
          <h2>{currentState === "login" ? "Login" : "Sign Up"}</h2>
          <img
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}
            style={{ cursor: "pointer" }}
            alt="Close"
          />
        </div>

        <div className="login-popup-inputs d-flex flex-column gap-3">
          {currentState === "signup" && (
            <input
              type="text"
              placeholder="Your Name"
              required
              name="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            required
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button type="submit">
          {currentState === "signup" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition d-flex align-items-start gap-2">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currentState === 'login' ? (
          <p>
            Create new Account?{" "}
            <span onClick={() => setCurrentState("signup")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
