export default function AdminBill() {
  const txnId = localStorage.getItem("txnId");

  const handleDownload = () => {
    window.open(`http://localhost:5000/admin/generate-bill/${txnId}`, "_blank");
  };

  return (
    <div
      style={{
        backgroundImage: "url('images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          padding: "30px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Bill Ready</h2>
        <p>Click below to download your PDF bill.</p>
        <button
          onClick={handleDownload}
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
          Download Bill
        </button>
      </div>
    </div>
  );
}
