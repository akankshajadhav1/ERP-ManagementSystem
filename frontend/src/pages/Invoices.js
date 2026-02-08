import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { toast } from "react-toastify";

export default function Invoices() {
    const [sales, setSales] = useState([]);

    // Using Sales API to get completed orders
    const API_SALES = "http://localhost:5001/api/sales";
    const API_INVOICES = "http://localhost:5001/api/invoices";
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const res = await axios.get(API_SALES, config);
            // Show only completed sales for invoicing
            const completedSales = res.data.filter(s => s.status === "Completed");
            setSales(completedSales);
        } catch (err) {
            console.error("Error fetching sales:", err);
        }
    };

    const generateInvoice = async (sale) => {
        try {
            // 1. Record Invoice in Backend (optional, for history)
            await axios.post(API_INVOICES, {
                salesOrderId: sale._id,
                customerName: sale.customerName,
                amount: sale.price || sale.total, // fallback for old data
                date: new Date()
            }, config);

            // 2. Generate PDF
            const doc = new jsPDF();
            doc.setFontSize(22);
            doc.text("INVOICE", 105, 20, null, null, "center");

            doc.setFontSize(12);
            doc.text(`Invoice No: INV-${Date.now().toString().slice(-6)}`, 20, 40);
            doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);

            doc.text("Bill To:", 20, 70);
            doc.setFont("helvetica", "bold");
            doc.text(sale.customerName, 20, 80);
            doc.setFont("helvetica", "normal");

            doc.line(20, 90, 190, 90); // horizontal line

            doc.text("Description", 20, 100);
            doc.text("Price", 160, 100);

            doc.line(20, 105, 190, 105);

            doc.text(sale.productName || "Product", 20, 115);
            doc.text(`₹${sale.price || sale.total}`, 160, 115);

            doc.line(20, 125, 190, 125);

            doc.setFont("helvetica", "bold");
            doc.text(`Total: ₹${sale.price || sale.total}`, 140, 140);

            doc.save(`Invoice_${sale.customerName}.pdf`);

            toast.success("Invoice generated and downloaded!");

        } catch (err) {
            console.error("Error generating invoice:", err);
            toast.error("Failed to generate invoice");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-purple">Invoice Generation</h2>

            <p className="mb-4 text-gray-600">Select a completed sale to generate an invoice.</p>

            <div className="space-y-3">
                {sales.length === 0 ? (
                    <p className="text-gray-500 italic">No completed sales available for invoicing.</p>
                ) : (
                    sales.map(sale => (
                        <div key={sale._id} className="border border-gray-200 p-4 rounded-lg flex justify-between items-center hover:bg-gray-50 transition">
                            <div>
                                <p className="font-bold text-gray-800">{sale.customerName}</p>
                                <p className="text-sm text-gray-600">Product: {sale.productName} | Amount: ₹{sale.price || sale.total}</p>
                                <p className="text-xs text-gray-400">Date: {new Date(sale.date || Date.now()).toLocaleDateString()}</p>
                            </div>
                            <button
                                onClick={() => generateInvoice(sale)}
                                className="bg-purple text-white px-4 py-2 rounded hover:bg-purple-700 transition shadow-sm font-medium"
                            >
                                Generate Invoice
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
