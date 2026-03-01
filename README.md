🛒 MERN Stack eCommerce Web Application

A full-stack eCommerce Web Application built using the MERN Stack (MongoDB, Express, React, Node.js).
This project provides a complete online shopping experience with secure authentication, product browsing, cart management, and order placement.

This project was developed to gain real-world full-stack development experience and understand backend architecture, authentication, and database management.

🚀 Features
🔐 Authentication System

User Signup & Login

Secure Authentication using JWT

Password Hashing using bcrypt

Protected Routes

Logout Functionality

🛍 Product Features

View Products

Product Search

Product Details Page

🛒 Cart System

Add to Cart

Remove from Cart

Update Quantity

Cart Total Calculation

📦 Order System

Place Order

Order Summary

Save Order Details

📍 Address Management

Add Multiple Addresses

Select Delivery Address

Update Address

🧰 Tech Stack
Frontend

React.js

Vite

Tailwind CSS

Axios

Backend

Node.js

Express.js

Database

MongoDB

Mongoose

Authentication

JWT (JSON Web Token)

bcrypt

📂 Project Structure
MERN-Ecommerce/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
└── README.md
⚙ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
2️⃣ Setup Backend
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

Run backend:

npm run dev
3️⃣ Setup Frontend
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173

Backend runs on:

http://localhost:5000
🔐 Authentication Flow

User Signup

Password hashed using bcrypt

User Login

JWT Token Generated

Token Stored in Browser

Protected Routes Verified Using JWT Middleware

📸 Screenshots

Add screenshots here:

Home Page
Login Page
Cart Page
Checkout Page

Example:

![Home](screenshots/home.png)
🔮 Future Improvements

💳 Online Payment Integration (Razorpay / Stripe)

👨‍💼 Admin Dashboard

📦 Order Tracking

⭐ Product Reviews

🔍 Advanced Filters

📱 Mobile Optimization

🎯 Learning Outcomes

This project helped me learn:

Full Stack Development

REST API Development

Authentication Systems

Database Design

State Management

Real-world Project Structure

👨‍💻 Author

Aditya Jadhav

LinkedIn:
https://www.linkedin.com/posts/aditya-jadhav-582556272_mern-webdevelopment-reactjs-activity-7433935138549547009-O-CZ?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEKlHLIBSAvyyq_F_L3gUUo-TNYQchzvnKA
