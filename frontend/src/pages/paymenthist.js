import { useEffect, useState } from "react";

export default function PaymentHistory({ consumerId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!consumerId) return;

    fetch(`http://localhost:5000/admin/history/${consumerId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched history:", data);
        setHistory(data);
      })
      .catch((err) => {
        console.error("Error fetching history", err);
        setHistory([]);
      });
  }, [consumerId]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Payment History</h3>
      {!Array.isArray(history) || history.length === 0 ? (
        <p>No past payments found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Mode</th>
              <th>Date</th>
              <th>Txn ID</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, index) => (
              <tr key={index}>
                <td>₹{h.amount}</td>
                <td>{h.method}</td>
                <td>{new Date(h.date).toLocaleString()}</td>
                <td>{h.txnId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
