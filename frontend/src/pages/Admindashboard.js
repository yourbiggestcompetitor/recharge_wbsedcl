import { useState } from "react";
import PaymentHistory from "../pages/paymenthist";

export default function AdminCustomerLookup({ onProceed }) {
  const [customerId, setCustomerId] = useState("");
  const [data, setData] = useState(null);

  const fetchCustomer = async () => {
    const res = await fetch(
      `http://localhost:5000/admin/consumer/${customerId}`
    );
    const json = await res.json();
    if (res.ok) {
      setData(json);
      localStorage.setItem("consumerId", customerId);
    } else {
      alert("Not found");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)", // subtle transparency
        backdropFilter: "blur(12px)", // subtle glass effect
        borderRadius: "10px",
        padding: "30px",
        width: "600px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        color: "white", // text on dark bg
      }}
    >
      <h2 style={{ textAlign: "center", margin: 0 }}>Enter Customer ID</h2>
      <input
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        placeholder="Enter ID"
        style={{
          padding: "10px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
        }}
      />
      <button
        onClick={fetchCustomer}
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
        Fetch
      </button>

      {data && (
        <div style={{ marginTop: "15px", fontSize: "16px" }}>
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Balance:</strong> ₹{data.balance}
          </p>

          <div style={{ marginTop: "20px" }}>
            <PaymentHistory consumerId={customerId} />
          </div>
          <button
            onClick={onProceed}
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#212121",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Proceed
          </button>
        </div>
      )}
    </div>
  );
}
