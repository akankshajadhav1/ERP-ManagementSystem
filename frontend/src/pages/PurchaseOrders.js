import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function PurchaseOrders() {
    const [orders, setOrders] = useState([]);
    const [supplierName, setSupplierName] = useState("");
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("Ordered");

    const API = "http://localhost:5001/api/purchase-orders";
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(API, config);
            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching purchase orders:", err);
        }
    };

    const addOrder = async () => {
        try {
            await axios.post(API, { supplierName, productName, quantity, price, status }, config);
            fetchOrders();
            setSupplierName("");
            setProductName("");
            setQuantity("");
            setPrice("");
            setStatus("Ordered");
            toast.success("Purchase Order Added");
        } catch (err) {
            toast.error("Error adding purchase order");
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(`${API}/${id}/status`, { status: newStatus }, config);
            fetchOrders();
            toast.success("Status Updated");
        } catch (err) {
            toast.error("Error updating status");
        }
    };

    const deleteOrder = async (id) => {
        if (!window.confirm("Delete this order?")) return;
        try {
            await axios.delete(`${API}/${id}`, config);
            fetchOrders();
            toast.success("Order Deleted");
        } catch (err) {
            toast.error("Error deleting order");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-purple">Purchase Orders</h2>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
                <input
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-skyBlue"
                    placeholder="Supplier Name"
                    value={supplierName}
                    onChange={e => setSupplierName(e.target.value)}
                />
                <input
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-skyBlue"
                    placeholder="Product Name"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                />
                <input
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-skyBlue"
                    placeholder="Quantity"
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
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
                    <option value="Ordered">Ordered</option>
                    <option value="Received">Received</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <button
                    className="bg-skyBlue text-white font-semibold p-2 rounded hover:bg-purple transition duration-300 shadow-sm"
                    onClick={addOrder}
                >
                    Add PO
                </button>
            </div>

            <div className="space-y-3">
                {orders.length === 0 ? (
                    <p className="text-gray-500 italic">No purchase orders found.</p>
                ) : (
                    orders.map(o => (
                        <div key={o._id} className="border-b border-gray-100 p-3 hover:bg-gray-50 transition flex justify-between items-center last:border-0">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-gray-700 items-center">
                                <span className="font-semibold text-purple">{o.supplierName}</span>
                                <span className="text-gray-600">{o.productName}</span>
                                <span className="text-gray-500">Qty: {o.quantity}</span>
                                <span className="text-gray-500">Price: {o.price}</span>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${o.status === "Received" ? "bg-green-100 text-green-700" :
                                    o.status === "Cancelled" ? "bg-red-100 text-red-700" :
                                        "bg-blue-100 text-blue-700"
                                    }`}>{o.status}</span>
                            </div>
                            <div className="flex gap-2">
                                {o.status === "Ordered" && (
                                    <button onClick={() => updateStatus(o._id, "Received")} className="text-green-600 hover:text-green-800 text-sm underline">
                                        Mark Received
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
