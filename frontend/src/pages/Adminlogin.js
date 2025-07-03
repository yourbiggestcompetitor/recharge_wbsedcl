import { useState } from "react";

export default function AdminLogin({ onSuccess }) {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("OTP sent to email");
      onSuccess(employeeId);
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: "30px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "600px",
      }}
    >
      <h2 style={{ textAlign: "center", margin: 0 }}>Admin Login</h2>
      <input
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <button
        onClick={handleLogin}
        style={{
          padding: "10px",
          backgroundColor: "#212121",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Send OTP
      </button>
    </div>
  );
}
