import React, { useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import MetricCard from "../pages/MetricCard";
import "../styles/dashboard.css";

import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export default function Dashboard({ setPage }) {
  const [data, setData] = useState({});

  useEffect(() => {
    AdminService.getDashboard().then(res => setData(res.data));
  }, []);

  const platformGrowth = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Customers",
        backgroundColor: "#3b82f6",
        data: [60, 80, 110, 150]
      },
      {
        label: "Vendors",
        backgroundColor: "#22c55e",
        data: [10, 15, 20, 25]
      }
    ]
  };

  const revenueTrend = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Revenue ($)",
        borderColor: "#8b5cf6",
        backgroundColor: "#8b5cf6",
        data: [12000, 18000, 26000, 37000],
        tension: 0.4
      }
    ]
  };

  return (
    <div className="dashboard">

      <h1>Admin Dashboard</h1>
      <p className="subtitle">Platform overview and management center</p>

      {/* ===== METRIC CARDS ROW ===== */}
      <div className="metric-row">
        <MetricCard title="Total Customers" value={data.totalCustomers} sub="+12% this month" color="blue" />
        <MetricCard title="Total Vendors" value={data.totalVendors} sub="5 pending" color="green" />
        <MetricCard title="Total Revenue" value={`$${data.totalRevenue}`} sub="+8% this month" color="purple" />
        <MetricCard title="Total Products" value={data.totalProducts} sub="Across all vendors" color="orange" />
      </div>

      {/* ===== CHARTS ROW ===== */}
      <div className="chart-row">
        <div className="chart-card">
          <h3>Platform Growth</h3>
          <p className="chart-sub">Monthly user and vendor growth</p>
          <Bar data={platformGrowth} />
        </div>

        <div className="chart-card">
          <h3>Revenue Trend</h3>
          <p className="chart-sub">Monthly revenue in USD</p>
          <Line data={revenueTrend} />
        </div>
      </div>

      {/* ===== MANAGEMENT ===== */}
      <div className="management-row">

  <div className="manage-card">
    <h4>Customer Management</h4>
    <p>View, edit, and manage customer accounts</p>
    <button className="btn-blue" onClick={() => setPage("customers")}>
      Manage Customers
    </button>
  </div>

  <div className="manage-card">
    <h4>Vendor Management</h4>
    <p>Approve, manage, and view vendor reports</p>
    <button className="btn-green" onClick={() => setPage("vendors")}>
      Manage Vendors
    </button>
  </div>

</div>

      {/* ===== PLATFORM HEALTH ===== */}
      <div className="health-row">
        <div>
          <span>Uptime</span>
          <h3>{data.uptime}</h3>
        </div>
        <div>
          <span>Response Time</span>
          <h3>{data.responseTime}</h3>
        </div>
        <div>
          <span>Active Users</span>
          <h3>{data.activeUsers}</h3>
        </div>
      </div>

    </div>
  );
}
