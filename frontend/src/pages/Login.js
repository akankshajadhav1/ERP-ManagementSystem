import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.user.name);
            localStorage.setItem("role", res.data.user.role);
            toast.success("Login Successful!");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                <button className="bg-skyBlue text-white p-2 rounded font-bold hover:bg-purple transition">Login</button>
            </form>
            <p className="mt-4 text-center text-sm">
                Don't have an account? <Link to="/register" className="text-purple underline">Register</Link>
            </p>
        </div>
    );
}
