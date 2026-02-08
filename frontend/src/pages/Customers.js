import { useEffect, useState } from "react";
import axios from "axios";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const API = "http://localhost:5001/api/customers";
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const fetchCustomers = async () => {
        try {
            const res = await axios.get(API, config);
            setCustomers(res.data);
        } catch (err) {
            console.error("Error fetching customers:", err);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const addCustomer = async () => {
        try {
            await axios.post(API, { name, email, phone }, config);
            fetchCustomers();
            setName("");
            setEmail("");
            setPhone("");
        } catch (err) {
            console.error("Error adding customer:", err);
        }
    };

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`${API}/${id}`, config);
            fetchCustomers();
        } catch (err) {
            console.error("Error deleting customer:", err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-purple">Customer Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
                <input
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-skyBlue"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-skyBlue"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-skyBlue"
                    placeholder="Phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <button
                    className="bg-skyBlue text-white font-semibold p-2 rounded hover:bg-purple transition duration-300 shadow-sm"
                    onClick={addCustomer}
                >
                    Add Customer
                </button>
            </div>

            <div className="space-y-3">
                {customers.length === 0 ? (
                    <p className="text-gray-500 italic">No customers found.</p>
                ) : (
                    customers.map(c => (
                        <div key={c._id} className="border-b border-gray-100 p-3 hover:bg-gray-50 transition flex justify-between items-center last:border-0">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-gray-700">
                                <span className="font-semibold text-purple">{c.name}</span>
                                <span>{c.email}</span>
                                <span>{c.phone}</span>
                            </div>
                            <button
                                className="text-red-500 hover:text-red-700 font-medium text-sm border border-red-200 hover:border-red-400 px-3 py-1 rounded transition"
                                onClick={() => deleteCustomer(c._id)}
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
