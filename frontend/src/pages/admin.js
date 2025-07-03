import { useEffect, useState } from "react";

export default function CounterSummary() {
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/counter-summary")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched counter summary:", data);
        setCounters(data);
      })
      .catch((error) => {
        console.error("Error fetching counter summary:", error);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex", // Flexbox
        justifyContent: "center", // Horizontal center
        alignItems: "center", // Vertical center
        height: "100vh", // Full height
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "600px",
          color: "black",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Counter Collection Summary
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                Counter
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                Total Collected (₹)
              </th>
            </tr>
          </thead>
          <tbody>
            {counters.length === 0 ? (
              <tr>
                <td
                  colSpan="2"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  No data available.
                </td>
              </tr>
            ) : (
              counters.map((c, index) => (
                <tr key={c._id || index}>
                  <td style={{ padding: "10px" }}>
                    {c._id || `Unnamed Counter ${index + 1}`}
                  </td>
                  <td style={{ padding: "10px" }}>₹{c.totalAmount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
