import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    const API = "http://localhost:5001/api/products";
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const fetchProducts = async () => {
        try {
            const res = await axios.get(API, config);
            setProducts(res.data);
        }
        catch (err) {
            console.error("Error fetching products:", err);
        }
    }
    useEffect(() => {
        fetchProducts();
    }
        , []);

    const addProduct = async () => {
        try {
            await axios.post(API, { name, price, stock }, config);
            fetchProducts();
            setName("");
            setPrice("");
            setStock("");
        } catch (err) {
            console.error("Error adding product:", err);
        }
    }
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API}/${id}`, config);
            fetchProducts();
        }
        catch (err) {
            console.error("Error deleting product:", err);
        }
    }



    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-purple">Product Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
                <input
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-skyBlue"
                    placeholder="Product Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-skyBlue"
                    placeholder="Price"
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <input
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-skyBlue"
                    placeholder="Stock Quantity"
                    type="number"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                />
                <button
                    className="bg-skyBlue text-white font-semibold p-2 rounded hover:bg-purple transition duration-300 shadow-sm"
                    onClick={addProduct}
                >
                    Add Product
                </button>
            </div>
            

            <div className="space-y-3">
                {products.length === 0 ? (
                    <p className="text-gray-500 italic">No products available.</p>
                ) : (
                    products.map(p => (
                        <div key={p._id} className="border-b border-gray-100 p-3 hover:bg-gray-50 transition flex justify-between items-center last:border-0">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-gray-700">
                                <span className="font-semibold text-purple">{p.name}</span>
                                <span>Price: <span className="font-medium">₹{p.price}</span></span>
                                <span>Stock: <span className="font-medium">{p.stock}</span></span>
                            </div>
                            <button
                                className="text-red-500 hover:text-red-700 font-medium text-sm border border-red-200 hover:border-red-400 px-3 py-1 rounded transition"
                                onClick={() => deleteProduct(p._id)}
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
