import { useEffect, useState } from "react";
import axios from "axios";

export default function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const API = "http://localhost:5001/api/suppliers";
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const res = await axios.get(API, config);
            setSuppliers(res.data);
        } catch (err) {
            console.error("Error fetching suppliers:", err);
        }
    };

    const addSupplier = async () => {
        try {
            await axios.post(API, { name, email, phone, address }, config);
            fetchSuppliers();
            setName("");
            setEmail("");
            setPhone("");
            setAddress("");
        } catch (err) {
            console.error("Error adding supplier:", err);
        }
    };

    const deleteSupplier = async (id) => {
        if (!window.confirm("Delete this supplier?")) return;
        try {
            await axios.delete(`${API}/${id}`, config);
            fetchSuppliers();
        } catch (err) {
            console.error("Error deleting supplier:", err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-purple">Supplier Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
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
                <input
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-skyBlue"
                    placeholder="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <button
                    className="bg-skyBlue text-white font-semibold p-2 rounded hover:bg-purple transition duration-300 shadow-sm"
                    onClick={addSupplier}
                >
                    Add Supplier
                </button>
            </div>

            <div className="space-y-3">
                {suppliers.length === 0 ? (
                    <p className="text-gray-500 italic">No suppliers found.</p>
                ) : (
                    suppliers.map(s => (
                        <div key={s._id} className="border-b border-gray-100 p-3 hover:bg-gray-50 transition flex justify-between items-center last:border-0">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-gray-700 items-center">
                                <span className="font-semibold text-purple">{s.name}</span>
                                <span className="text-gray-600">{s.email}</span>
                                <span className="text-gray-500">{s.phone}</span>
                                <span className="text-gray-400 text-sm">{s.address}</span>
                            </div>
                            <button
                                className="text-red-500 hover:text-red-700 font-medium text-sm border border-red-200 hover:border-red-400 px-3 py-1 rounded transition"
                                onClick={() => deleteSupplier(s._id)}
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
