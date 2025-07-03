import { useEffect, useState } from "react";

export default function FinalPay({ consumerId }) {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("Cash");
  const [unpaidBills, setUnpaidBills] = useState([]);
  const [selectedBills, setSelectedBills] = useState([]);
  const [counter, setCounter] = useState("Counter 1");

  useEffect(() => {
    fetch(`http://localhost:5000/api/consumer/${consumerId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.bills) {
          const unpaid = data.bills.filter((b) => b.status === "unpaid");
          setUnpaidBills(unpaid);
        }
      });
  }, [consumerId]);

  const toggleBillSelection = (billId) => {
    setSelectedBills((prev) =>
      prev.includes(billId)
        ? prev.filter((id) => id !== billId)
        : [...prev, billId]
    );
  };

  const handleRecharge = async () => {
    const res = await fetch("http://localhost:5000/admin/recharge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        consumerId,
        amount,
        paymentMode: mode,
        bills: selectedBills,
        counterId: counter,
      }),
    });

    const result = await res.json();
    if (result.message === "Recharge successful") {
      alert("Recharge successful");
      window.open(
        `http://localhost:5000/admin/generate-bill/${result.id}`,
        "_blank"
      );
    } else {
      alert("Recharge failed");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(3px)",
        padding: "30px",
        borderRadius: "10px",
        fontFamily: "Poppins, sans-serif",
        width: "500px",
        color: "white",
        marginLeft: "50px",
        marginTop: "50px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Recharge Details</h2>

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "10px",
          width: "100%",
          borderRadius: "6px",
          border: "none",
        }}
      />

      <select
        value={counter}
        onChange={(e) => setCounter(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "10px",
          width: "100%",
          borderRadius: "6px",
          border: "none",
        }}
      >
        <option value="Counter 1">Counter 1</option>
        <option value="Counter 2">Counter 2</option>
        <option value="Counter 3">Counter 3</option>
      </select>

      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "10px",
          width: "100%",
          borderRadius: "6px",
          border: "none",
        }}
      >
        <option value="Cash">Cash</option>
        <option value="Cheque">Cheque</option>
      </select>

      {unpaidBills.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h4>Select Unpaid Bills</h4>
          {unpaidBills.map((bill) => (
            <label key={bill._id} style={{ display: "block", margin: "5px 0" }}>
              <input
                type="checkbox"
                checked={selectedBills.includes(bill._id)}
                onChange={() => toggleBillSelection(bill._id)}
                style={{ marginRight: "10px" }}
              />
              {bill.description || "Bill"} — ₹{bill.amount}
            </label>
          ))}
        </div>
      )}

      <button
        onClick={handleRecharge}
        style={{
          padding: "12px",
          width: "100%",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Generate Bill
      </button>
    </div>
  );
}
