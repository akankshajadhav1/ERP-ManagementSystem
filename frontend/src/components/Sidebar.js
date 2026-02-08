import { Link } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");
  return (
    <div className="w-64 h-screen bg-white shadow-lg p-5 flex flex-col gap-4">
      <h3 className="text-xl font-bold text-skyBlue mb-4">Menu</h3>

      <Link to="/dashboard" className="text-purple hover:bg-skyBlue hover:text-white p-2 rounded transition font-medium">Dashboard</Link>

      {role !== "user" && (
        <>
          <Link to="/products" className="text-purple hover:bg-skyBlue hover:text-white p-2 rounded transition font-medium">Products</Link>
          <Link to="/customers" className="text-purple hover:bg-skyBlue hover:text-white p-2 rounded transition font-medium">Customers</Link>
          <Link to="/suppliers" className="text-purple hover:bg-skyBlue hover:text-white p-2 rounded transition font-medium">Suppliers</Link>
          <Link to="/purchase-orders" className="text-purple hover:bg-skyBlue hover:text-white p-2 rounded transition font-medium">Purchase Orders</Link>
          <Link to="/grn" className="text-purple hover:bg-skyBlue hover:text-white p-2 rounded transition font-medium">GRN</Link>
          <Link to="/sales" className="text-purple hover:bg-skyBlue hover:text-white p-2 rounded transition font-medium">Sales</Link>
          <Link to="/invoices" className="text-purple hover:bg-skyBlue hover:text-white p-2 rounded transition font-medium">Invoices</Link>
        </>
      )}

      {role === "admin" && (
        <Link to="/users" className="text-purple hover:bg-skyBlue hover:text-white p-2 rounded transition font-medium">Users</Link>
      )}

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("role");
          window.location.href = "/login";
        }}
        className="mt-auto bg-red-500 text-white p-2 rounded hover:bg-red-600 transition font-medium mb-4"
      >
        Logout
      </button>
    </div>
  );
}
