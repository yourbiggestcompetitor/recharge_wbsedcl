import { useState } from "react";
import AdminLogin from "./pages/Adminlogin";
import AdminOTP from "./pages/Adminverify";
import AdminDashboard from "./pages/Admindashboard";
import AdminRecharge from "./pages/Adminrechargeform";
import AdminBill from "./pages/Adminbill";
import Admin from "./pages/admin";

function App() {
  const [view, setView] = useState("home");
  const [employeeId, setEmployeeId] = useState("");

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url("/images/over.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        filter: "brightness(1) saturate(1)",
        fontFamily: "'Orbitron', sans-serif",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(143, 98, 51, 0.5)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "30px",
          display: "flex",
          gap: "25px",
          fontSize: "16px",
          fontWeight: "500",
          textShadow: "0px 0px 5px rgba(0,0,0,0.5)",
          zIndex: 2,
        }}
      >
        {["Dashboard", "Recharge", "Consumers", "Reports", "Logout"].map(
          (item, index) => (
            <span
              key={index}
              style={navItem}
              onMouseEnter={(e) => (e.target.style.opacity = 1)}
              onMouseLeave={(e) => (e.target.style.opacity = 0.9)}
            >
              {item}
            </span>
          )
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          height: "100%",
          paddingLeft: "100px",
          paddingTop: "80px",
          textAlign: "left",
          position: "relative",
          zIndex: 2,
        }}
      >
        {view === "home" && (
          <>
            <h1
              style={headingStyle}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.textShadow =
                  "0 0 8px rgb(14, 14, 14), 0 0 16px rgb(0, 0, 0), 0 0 24px #00ffff";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.textShadow =
                  "0 0 10px rgba(255, 191, 0, 0.7), 0 0 20px rgba(255, 140, 0, 0.6)";
              }}
            >
              QUICK RECHARGE
            </h1>

            <p
              style={{
                fontSize: "20px",
                marginBottom: "30px",
                fontFamily: "Poppins, sans-serif",
                textShadow: "0px 0px 8px rgba(0,0,0,0.6)",
              }}
            >
              Simplifying Recharges. Securing Operations.
            </p>

            <div style={{ display: "flex", gap: "20px" }}>
              <button
                style={buttonStyle}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.boxShadow = "0 0 14px #ffffff88";
                  e.target.style.border = "1px solid #ffffffaa";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0 0 8px #ffffff22";
                  e.target.style.border = "1px solid #ffffff55";
                }}
                onClick={() => setView("login")}
              >
                Employee Login
              </button>

              <button
                style={buttonStyleAlt}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.boxShadow = "0 0 14px #ffffff88";
                  e.target.style.border = "1px solid #ffffffaa";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0 0 8px #ffffff22";
                  e.target.style.border = "1px solid #ffffff55";
                }}
                onClick={() => setView("admin")}
              >
                Admin Access
              </button>
            </div>
          </>
        )}

        {view === "login" && (
          <AdminLogin
            onSuccess={(id) => {
              setEmployeeId(id);
              setView("otp");
            }}
          />
        )}
        {view === "otp" && (
          <AdminOTP
            employeeId={employeeId}
            onSuccess={() => setView("dashboard")}
            onFail={() => setView("login")}
          />
        )}
        {view === "dashboard" && (
          <AdminDashboard onProceed={() => setView("recharge")} />
        )}
        {view === "recharge" && (
          <AdminRecharge onSuccess={() => setView("bill")} />
        )}
        {view === "bill" && <AdminBill />}
        {view === "admin" && <Admin />}
      </div>
    </div>
  );
}

export default App;

const buttonStyle = {
  padding: "12px 24px",
  backgroundColor: "#111",
  color: "#ffffff",
  border: "1px solid #ffffff55",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
  fontFamily: "Poppins, sans-serif",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 0 8px #ffffff22",
};

const buttonStyleAlt = {
  ...buttonStyle,
  backgroundColor: "black",
};

const navItem = {
  cursor: "pointer",
  opacity: 0.9,
  transition: "opacity 0.3s",
  textDecoration: "none",
  padding: "5px 10px",
  borderRadius: "4px",
};

const headingStyle = {
  fontSize: "60px",
  marginBottom: "10px",
  letterSpacing: "2px",
  textAlign: "left",
  transition: "all 0.3s ease-in-out",
  color: "#ffffff",
  textShadow:
    "0 0 10px rgba(255, 191, 0, 0.7), 0 0 20px rgba(255, 140, 0, 0.6)",
};
