import { useState } from "react";
import { postPayment } from "../services/api";
import PaymentPage from "./finalpay";
import "./payment.css";

export default function PaymentForm({ consumer }) {
  const [proceed, setProceed] = useState(false);

  if (proceed) {
    return <PaymentPage consumer={consumer} />;
  }

  return (
    <div className="payment-container">
      <h3>Consumer Info</h3>
      <p>
        <strong>Consumer ID:</strong> {consumer.consumerId}
      </p>
      <p>
        <strong>Name:</strong> {consumer.name}
      </p>
      <p>
        <strong>Email:</strong> {consumer.email}
      </p>
      <p>
        <strong>Phone:</strong> {consumer.phone}
      </p>
      <div className="button-right">
        <button onClick={() => setProceed(true)}>Proceed</button>
      </div>
    </div>
  );
}
