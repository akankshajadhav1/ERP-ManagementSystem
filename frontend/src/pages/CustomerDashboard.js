import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerDashboard() {
    const [products, setProducts] = useState([]);
    const API_PRODUCTS = "http://localhost:5001/api/products";
    const API_SALES = "http://localhost:5001/api/sales";
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    // Add auth header
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(API_PRODUCTS, config);
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products", err);
        }
    };

    const handlePurchase = async (product) => {
        if (!window.confirm(`Are you sure you want to purchase ${product.name} for ₹${product.price}?`)) return;

        try {
            await axios.post(API_SALES, {
                customerName: username,
                productName: product.name,
                price: product.price,
                status: "Pending"
            }, config);
            alert("Purchase successful! Pending admin approval.");
        } catch (err) {
            console.error("Error purchasing product", err);
            alert("Purchase failed. Please try again.");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-purple">Available Products</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                    <p className="text-gray-500 italic">No products available at the moment.</p>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition bg-gray-50 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-1">Price: <span className="font-bold text-purple">₹{product.price}</span></p>
                                <p className="text-gray-500 text-sm mb-4">Stock: {product.stock}</p>
                            </div>
                            <button
                                onClick={() => handlePurchase(product)}
                                className="w-full bg-skyBlue text-white font-bold py-2 rounded hover:bg-purple transition duration-300"
                            >
                                Buy Now
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
