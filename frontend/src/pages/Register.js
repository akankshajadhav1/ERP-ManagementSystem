import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/auth/register", { name, email, password, role });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.user.name);
            localStorage.setItem("role", res.data.user.role);
            toast.success("Registration successful!");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple">Register</h2>
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <input
                    className="border p-2 rounded"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    className="border p-2 rounded"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="border p-2 rounded"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <select
                    className="border p-2 rounded bg-white"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="sales">Sales</option>
                </select>
                <button className="bg-skyBlue text-white p-2 rounded font-bold hover:bg-purple transition">Register</button>
            </form>
            <p className="mt-4 text-center text-sm">
                Already have an account? <Link to="/login" className="text-purple underline">Login</Link>
            </p>
        </div>
    );
}
