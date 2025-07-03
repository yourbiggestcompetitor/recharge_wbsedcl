import "./payment.css";
import { useState } from "react";

export default function PaymentPage({ consumer }) {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("Cash");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [counter, setCounter] = useState("Counter 1");

  const handlePayment = (e) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError("Enter a valid payment amount.");
      return;
    }

    if (numericAmount > consumer.balance) {
      setError("Payment amount cannot exceed balance.");
      return;
    }

    setError("");
    setSuccess(`₹${amount} paid successfully via ${mode}.`);
    // You can integrate your API payment call here
  };
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      padding: "30px",
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
    },
    infoBox: {
      marginBottom: "20px",
      padding: "15px",
      backgroundColor: "#eef2f5",
      borderRadius: "6px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
  };

  return (
    <div className="payment-container" style={styles.container}>
      <h2>Make a Payment</h2>

      <div className="payment-info" style={styles.infoBox}>
        <p>
          <strong>Consumer ID:</strong> {consumer.id}
        </p>
        <p>
          <strong>Name:</strong> {consumer.name}
        </p>
        <p>
          <strong>Balance Left:</strong> ₹{consumer.balance}
        </p>
      </div>
      <select
        value={counter}
        onChange={(e) => setCounter(e.target.value)}
        style={{ padding: "10px", marginTop: "10px", width: "100%" }}
      >
        <option value="Counter 1">Counter 1</option>
        <option value="Counter 2">Counter 2</option>
        <option value="Counter 3">Counter 3</option>
      </select>

      <form onSubmit={handlePayment} style={styles.form}>
        <label>Amount to Pay:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />

        <label>Payment Mode:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="Cash">Cash</option>
          <option value="Cheque">Cheque</option>
        </select>

        <button type="submit">Pay Now</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
