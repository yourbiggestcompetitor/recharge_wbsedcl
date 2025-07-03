import { useState } from "react";

export default function AdminOtpVerify({ employeeId, onSuccess, onFail }) {
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5000/admin/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId, otp }),
    });

    const data = await res.json();
    if (data.success) {
      onSuccess();
    } else {
      alert(data.message);
      onFail();
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
      <h2 style={{ textAlign: "center", margin: 0 }}>Verify OTP</h2>
      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <button
        onClick={verifyOtp}
        style={{
          padding: "10px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Verify
      </button>
    </div>
  );
}
