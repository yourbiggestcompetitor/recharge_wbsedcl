import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CaptchaVerify from "./pages/CaptchaVerify";
import FinalPay from "./pages/FinalPay";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminOtpVerify from "./pages/admin/AdminOtpVerify";
import AdminCustomerLookup from "./pages/admin/AdminCustomerLookup";
import AdminRechargeForm from "./pages/admin/AdminRechargeForm";
import AdminBill from "./pages/admin/AdminBill";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<CaptchaVerify />} />
        <Route path="/pay" element={<FinalPay />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/otp" element={<AdminOtpVerify />} />
        <Route path="/admin/customer" element={<AdminCustomerLookup />} />
        <Route path="/admin/recharge" element={<AdminRechargeForm />} />
        <Route path="/admin/bill" element={<AdminBill />} />
      </Routes>
    </Router>
  );
}
