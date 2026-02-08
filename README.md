# ERP Management System

A comprehensive, full-stack ERP web application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) to streamline business operations including Sales, Purchases, Inventory (GRN), and User Management.

## 🚀 Features

### Core Modules
- **📊 Admin Dashboard**: Real-time insights into total products, customers, and orders with graphical data visualization.
- **🛍️ Product Management**: CRUD operations for inventory items (Add, Edit, Delete, View).
- **👥 Customer & Supplier Management**: Maintain directories for business partners and clients.
- **🛒 Sales & Purchase Orders**: 
  - Create and manage Sales Orders for customers.
  - Raise Purchase Orders (PO) to suppliers.
  - Track order status (Pending, Completed, Received).
- **📦 Goods Received Note (GRN)**: 
  - Process incoming shipments against Purchase Orders.
  - Maintain a history of received goods.
- **🧾 Invoice Generation**: 
  - Automatically generate professional PDF invoices for completed sales.
  - Downloadable receipts tailored for customers.
- **🔐 User Management (Admin)**: 
  - Role-based access control (Admin, Sales, User).
  - Admins can manage system users and permissions.

### Technical Features
- **Authentication**: Secure JWT-based login and registration system.
- **Role-Based Access Control (RBAC)**: Protects sensitive routes (e.g., User Management is Admin-only).
- **Smart Notifications**: Integrated `react-toastify` for real-time success/error feedback.
- **Responsive UI**: Built with **Tailwind CSS** for a modern, mobile-friendly design.
- **Data Visualization**: Charts and graphs powered by `chart.js` / `react-chartjs-2`.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router v6, Axios, Recharts, React-Toastify, jsPDF
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: JSON Web Tokens (JWT), Bcrypt for password hashing

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/erp-system.git
   cd erp-system
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file with PORT and MONGO_URI
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the App**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.
   - Default Admin Login: (Register a new user, then manually set role to 'admin' in database or use the registration code if implemented).

## 📂 Project Structure

```
erp-system/
├── backend/          # Node.js + Express API
│   ├── models/       # Mongoose Schemas (User, Product, Sales, PO, GRN, etc.)
│   ├── routes/       # API Routes
│   ├── controllers/  # Business Logic
│   └── server.js     # Entry point
└── frontend/         # React Application
    ├── src/
    │   ├── components/ # Reusable UI (Navbar, Sidebar)
    │   ├── pages/      # Dashboard, Sales, Products, Invoices, etc.
    │   └── App.js      # Routing & Layouts
```

## 📝 API Endpoints

- **Auth**: `/api/auth/login`, `/api/auth/register`
- **Products**: `/api/products`
- **Customers / Suppliers**: `/api/customers`, `/api/suppliers`
- **Orders**: `/api/sales`, `/api/purchase-orders`
- **Inventory**: `/api/grn`
- **Invoices**: `/api/invoices`

---
<img width="1470" height="956" alt="Screenshot 2026-02-08 at 3 05 44 PM" src="https://github.com/user-attachments/assets/73213556-7acb-4f3c-8bc7-f036e1bab0e3" />

<img width="1470" height="956" alt="Screenshot 2026-02-08 at 3 05 59 PM" src="https://github.com/user-attachments/assets/bac9d85e-1e18-4ff7-884a-13998e34c44e" />
<img width="1470" height="956" alt="Screenshot 2026-02-08 at 3 06 05 PM" src="https://github.com/user-attachments/assets/99e0391e-bf70-4083-953b-70050105e086" />
<img width="1470" height="956" alt="Screenshot 2026-02-08 at 3 06 12 PM" src="https://github.com/user-attachments/assets/f2e575e7-d483-4f4c-a939-5be12c0d091a" />
<img width="1470" height="956" alt="Screenshot 2026-02-08 at 3 06 36 PM" src="https://github.com/user-attachments/assets/a2fced9b-c590-4217-b4bc-29b5e6db3f58" />
<img width="1470" height="956" alt="Screenshot 2026-02-08 at 3 06 47 PM" src="https://github.com/user-attachments/assets/8a45c48f-4cf0-475f-a64a-4b32e0fad236" />
<img width="1470" height="956" alt="Screenshot 2026-02-08 at 3 06 57 PM" src="https://github.com/user-attachments/assets/67cc6dd7-3c37-4c04-bcfd-dd30ac319084" />

