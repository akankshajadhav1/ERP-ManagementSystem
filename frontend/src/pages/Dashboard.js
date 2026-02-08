import { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import CustomerDashboard from "./CustomerDashboard";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const role = localStorage.getItem("role");
  const [stats, setStats] = useState({ products: 0, customers: 0, orders: 0 });

  const API_DASHBOARD = "http://localhost:5001/api/dashboard";
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (role !== "user") {
      fetchStats();
    }
  }, [role]);

  const fetchStats = async () => {
    try {
      const res = await axios.get(API_DASHBOARD, config);
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  };

  if (role === "user") {
    return <CustomerDashboard />;
  }

  const data = {
    labels: ["Products", "Customers", "Orders"],
    datasets: [{
      label: "ERP Stats",
      data: [stats.products, stats.customers, stats.orders],
      backgroundColor: ["#87CEEB", "#800080", "#E0FFFF"],
      borderColor: ["#87CEEB", "#800080", "#E0FFFF"],
      borderWidth: 1,
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#374151' // Gray-700
        }
      },
      title: {
        display: true,
        text: 'System Overview',
        color: '#800080', // Purple
        font: {
          size: 18
        }
      },
    },
    scales: {
      x: {
        ticks: { color: '#374151' },
        grid: { color: '#e5e7eb' }
      },
      y: {
        ticks: { color: '#374151', beginAtZero: true },
        grid: { color: '#e5e7eb' }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-purple">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-sky-50 p-4 rounded-lg border-l-4 border-skyBlue shadow-sm">
          <h3 className="text-gray-600 font-medium">Total Products</h3>
          <p className="text-2xl font-bold text-skyBlue">{stats.products}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple shadow-sm">
          <h3 className="text-gray-600 font-medium">Total Customers</h3>
          <p className="text-2xl font-bold text-purple">{stats.customers}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400 shadow-sm">
          <h3 className="text-gray-600 font-medium">Active Orders</h3>
          <p className="text-2xl font-bold text-gray-600">{stats.orders}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm w-full md:w-2/3 mx-auto">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
