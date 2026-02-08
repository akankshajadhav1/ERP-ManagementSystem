import { useEffect, useState } from "react";
import axios from "axios";

export default function GRNForm() {
    const [pos, setPos] = useState([]);
    const [grns, setGrns] = useState([]);

    const API_PO = "http://localhost:5001/api/purchase-orders";
    const API_GRN = "http://localhost:5001/api/grn";
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [poRes, grnRes] = await Promise.all([
                axios.get(API_PO, config),
                axios.get(API_GRN, config)
            ]);
            // Filter only 'Ordered' POs for the form
            setPos(poRes.data.filter(po => po.status === "Ordered"));
            setGrns(grnRes.data);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    const createGRN = async (po) => {
        if (!window.confirm("Confirm receipt of goods? This will mark PO as Received.")) return;

        try {
            // 1. Create GRN
            await axios.post(API_GRN, {
                purchaseOrderId: po._id,
                supplierName: po.supplierName,
                productName: po.productName,
                quantity: po.quantity
            }, config);

            // 2. Update PO status to Received
            await axios.put(`${API_PO}/${po._id}/status`, { status: "Received" }, config);

            alert("GRN Created Successfully!");
            fetchData();
        } catch (err) {
            console.error("Error creating GRN:", err);
            alert("Failed to create GRN");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-purple">Goods Received Note (GRN)</h2>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Pending Orders (Awaiting Receipt)</h3>
                <div className="space-y-3">
                    {pos.length === 0 ? (
                        <p className="text-gray-500 italic">No pending orders.</p>
                    ) : (
                        pos.map(po => (
                            <div key={po._id} className="border border-l-4 border-l-yellow-400 bg-yellow-50 p-4 rounded flex justify-between items-center shadow-sm">
                                <div>
                                    <p className="font-bold text-gray-800">{po.productName}</p>
                                    <p className="text-sm text-gray-600">Supplier: {po.supplierName} | Qty: {po.quantity}</p>
                                </div>
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition shadow font-medium"
                                    onClick={() => createGRN(po)}
                                >
                                    Create GRN
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-4 text-gray-700">GRN History</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6">Date</th>
                            <th className="py-3 px-6">Product</th>
                            <th className="py-3 px-6">Supplier</th>
                            <th className="py-3 px-6">Qty</th>
                            <th className="py-3 px-6">PO Reference</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {grns.map(grn => (
                            <tr key={grn._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6">{new Date(grn.date).toLocaleDateString()}</td>
                                <td className="py-3 px-6 font-medium">{grn.productName}</td>
                                <td className="py-3 px-6">{grn.supplierName}</td>
                                <td className="py-3 px-6">{grn.quantity}</td>
                                <td className="py-3 px-6 text-xs font-mono text-gray-400">{grn.purchaseOrderId?._id || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {grns.length === 0 && <p className="text-center p-4 text-gray-500 italic">No history found.</p>}
            </div>
        </div>
    );
}
