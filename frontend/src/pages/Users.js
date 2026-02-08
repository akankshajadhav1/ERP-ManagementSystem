import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
    const [users, setUsers] = useState([]);
    const role = localStorage.getItem("role");

    const API = "http://localhost:5001/api/auth/users";
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        if (role === "admin") {
            fetchUsers();
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(API, config);
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`${API}/${id}`, config);
            fetchUsers();
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    if (role !== "admin") {
        return (
            <div className="bg-red-50 p-6 rounded-lg text-center text-red-600 font-bold">
                Access Denied: Only Admins can view this page.
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-purple">User Management</h2>

            <div className="space-y-3">
                {users.length === 0 ? (
                    <p className="text-gray-500 italic">No users found.</p>
                ) : (
                    users.map(u => (
                        <div key={u._id} className="border-b border-gray-100 p-3 hover:bg-gray-50 transition flex justify-between items-center last:border-0">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-gray-700">
                                <span className="font-semibold text-purple">{u.name}</span>
                                <span className="text-gray-600">{u.email}</span>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === "admin" ? "bg-purple-100 text-purple-700" :
                                        u.role === "sales" ? "bg-green-100 text-green-700" :
                                            "bg-blue-100 text-blue-700"
                                    }`}>{u.role}</span>
                            </div>
                            <button
                                className="text-red-500 hover:text-red-700 font-medium text-sm border border-red-200 hover:border-red-400 px-3 py-1 rounded transition"
                                onClick={() => deleteUser(u._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
