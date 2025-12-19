import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { loginAdmin } from "@app/core";

/* interface LoginProps {
  type: "admin";
} */

export function Login() {
  const [adminId, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await loginAdmin(adminId, password);
    if (response?.successful) {
      navigate("/admin");
    } else {
      console.log("Login failed");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="AdminId"
        value={adminId}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}