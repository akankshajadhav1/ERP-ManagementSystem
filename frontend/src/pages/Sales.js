import { useEffect, useState } from "react";
import axios from "axios";

export default function Sales() {
    const [orders, setOrders] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("Pending");

    const API = "http://localhost:5001/api/sales";
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const fetchOrders = async () => {
        try {
            const res = await axios.get(API, config);
            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const addOrder = async () => {
        try {
            await axios.post(API, { customerName, productName, price, status }, config);
            fetchOrders();
            setCustomerName("");
            setProductName("");
            setPrice("");
            setStatus("Pending");
        } catch (err) {
            console.error("Error adding order:", err);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(`${API}/${id}/status`, { status: newStatus }, config);
            fetchOrders();
        } catch (err) {
            console.error("Error updating status", err);
        }
    }

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`${API}/${id}`, config);
            fetchOrders();
        } catch (err) {
            console.error("Error deleting order:", err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-purple">Sales Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
                <input
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-skyBlue"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                />
                <input
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-skyBlue"
                    placeholder="Product Name"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                />
                <input
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-skyBlue"
                    placeholder="Price"
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <select
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-skyBlue"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <button
                    className="bg-skyBlue text-white font-semibold p-2 rounded hover:bg-purple transition duration-300 shadow-sm"
                    onClick={addOrder}
                >
                    Add Order
                </button>
            </div>

            <div className="space-y-3">
                {orders.length === 0 ? (
                    <p className="text-gray-500 italic">No orders found.</p>
                ) : (
                    orders.map(o => (
                        <div key={o._id} className="border-b border-gray-100 p-3 hover:bg-gray-50 transition flex justify-between items-center last:border-0">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-gray-700 items-center">
                                <span className="font-semibold text-purple">{o.customerName}</span>
                                <span className="text-gray-600">{o.productName || "N/A"}</span>
                                <span className="font-medium">₹{o.price || o.total}</span>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${o.status === "Completed" ? "bg-green-100 text-green-700" :
                                    o.status === "Cancelled" ? "bg-red-100 text-red-700" :
                                        "bg-yellow-100 text-yellow-700"
                                    }`}>{o.status}</span>
                            </div>

                            <div className="flex gap-2">
                                {o.status !== "Completed" && (
                                    <button onClick={() => updateStatus(o._id, "Completed")} className="text-green-600 hover:text-green-800 text-sm underline">
                                        Mark Done
                                    </button>
                                )}
                                <button
                                    className="text-red-500 hover:text-red-700 font-medium text-sm border border-red-200 hover:border-red-400 px-3 py-1 rounded transition"
                                    onClick={() => deleteOrder(o._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
