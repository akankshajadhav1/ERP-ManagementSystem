import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="bg-skyBlue text-white p-4 font-bold text-xl shadow-md flex justify-between items-center">
      <span>{token ? `ERP Dashboard - ${username}` : "ERP System"}</span>

      {!token && (
        <div className="flex gap-4 text-base font-normal">
          <Link to="/login" className="hover:text-purple transition">Login</Link>
          <Link to="/register" className="hover:text-purple transition">Register</Link>
        </div>
      )}
    </div>
  );
}
