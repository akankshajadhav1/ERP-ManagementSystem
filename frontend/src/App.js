import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Suppliers from "./pages/Suppliers";
import PurchaseOrders from "./pages/PurchaseOrders";
import GRNForm from "./pages/GRNForm";
import Invoices from "./pages/Invoices";
import Sales from "./pages/Sales";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateLayout = () => {
  const token = localStorage.getItem("token");
  return token ? (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 transition-all duration-200 ease-in-out">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

const PublicLayout = () => (
  <div className="flex flex-col h-screen bg-gray-100">
    <Navbar />
    <div className="flex-1 flex items-center justify-center">
      <Outlet />
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/grn" element={<GRNForm />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
