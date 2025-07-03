import React, { useState, useEffect } from "react";
import { getConsumer } from "../services/api"; // ✅ Adjust path if needed
import PaymentForm from "./payment"; // ✅ Make sure payment.js exists in the same folder
import "./consumerform.css"; // ✅ Optional, for styling

export default function ConsumerForm() {
  const [consumerId, setConsumerId] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [consumer, setConsumer] = useState(null);
  const [error, setError] = useState("");

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  };

  useEffect(() => {
    setGeneratedCaptcha(generateCaptcha());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userCaptcha !== generatedCaptcha) {
      setError("Captcha does not match");
      setGeneratedCaptcha(generateCaptcha());
      setUserCaptcha("");
      return;
    }

    try {
      const res = await getConsumer(consumerId);
      setConsumer(res.data);
      setError("");
    } catch (err) {
      setError("Consumer not found");
      setGeneratedCaptcha(generateCaptcha());
      setUserCaptcha("");
    }
  };

  const pageStyle = {
    backgroundImage: "url('images/background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };

  return (
    <div className="page-container" style={pageStyle}>
      <div className="form-wrapper">
        {!consumer ? (
          <form onSubmit={handleSubmit} className="consumer-form">
            <label>Consumer ID:</label>
            <input
              value={consumerId}
              onChange={(e) => setConsumerId(e.target.value)}
              required
            />

            <div className="captcha-box">Captcha: {generatedCaptcha}</div>

            <label>Enter Captcha:</label>
            <input
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              required
            />
            <div className="button-container">
              <button type="submit">Proceed</button>
            </div>

            {error && <p>{error}</p>}
          </form>
        ) : (
          <PaymentForm consumer={consumer} />
        )}
      </div>
    </div>
  );
}
