# 🔌 Recharge WBSEDCL Portal

A secure and user-friendly full-stack web application developed to streamline electricity bill payments for consumers and field officers under WBSEDCL (West Bengal State Electricity Distribution Company Limited).

Built during a hands-on internship at WBSEDCL, this project integrates modern web technologies with real-world utility billing workflows.

---

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)
![Express](https://img.shields.io/badge/API-Express.js-lightgrey?logo=express)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-blue?logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Completed-success)

---

## ✨ Features

### ⚙️ Consumer Portal
- Consumer ID + Captcha verification
- Fetches user and bill details from MongoDB
- Displays all unpaid bills with checkbox selection
- Accepts custom payment amount
- Generates downloadable PDF receipt upon successful recharge

### 🛠 Admin Dashboard
- Secure login with employee ID, password, and OTP
- Admin-controlled recharge on behalf of any consumer
- Choice of payment mode: Cash / Cheque
- Generates and downloads official PDF bill
- Tracks transaction with unique `txnId`

---

## 🧰 Tech Stack

| Layer      | Technology                     |
|------------|--------------------------------|
| Frontend   | React.js, Tailwind CSS         |
| Backend    | Node.js, Express.js            |
| Database   | MongoDB with Mongoose ORM      |
| Auth       | OTP System, Captcha validation |
| Utility    | PDF Bill Generation, REST APIs |

---



