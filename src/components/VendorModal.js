import React from "react";
import "../styles/vendorModal.css";

export default function VendorModal({ vendor, onClose, onApprove, onReject }) {
  const isPending = vendor.status === "PENDING";

  return (
    <div className="modal-overlay">
      <div className="vendor-modal">

        {/* Header */}
        <div className="modal-header">
          <h2>Vendor Details</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Email */}
        <p className="vendor-email">{vendor.email}</p>

        {/* Row 1 */}
        <div className="modal-row">
          <div className="field">
            <label>Vendor Name</label>
            <p>{vendor.vendorName}</p>
          </div>

          <div className="field">
            <label>Owner Name</label>
            <p>{vendor.ownerName || "N/A"}</p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="modal-row">
          <div className="field">
            <label>Status</label>
            <p className={`badge ${vendor.status.toLowerCase()}`}>{vendor.status}</p>
          </div>

          <div className="field">
            <label>Member Since</label>
            <p>{vendor.createdAt?.split("T")[0]}</p>
          </div>
        </div>

        {/* Stats Section */}
        <h3 className="stat-title">Vendor Statistics</h3>

        <div className="stats-grid">
          <div className="stat-box">
            <p>Products</p>
            <h3>{vendor.totalProducts}</h3>
          </div>

          <div className="stat-box">
            <p>Total Orders</p>
            <h3>{vendor.totalOrders}</h3>
          </div>

          <div className="stat-box">
            <p>Total Revenue</p>
            <h3>₹{vendor.totalRevenue}</h3>
          </div>
        </div>

        {/* Buttons for pending vendors */}
        {isPending && (
          <div className="action-row">
            <button className="reject-btn" onClick={onReject}>Reject</button>
            <button className="approve-btn" onClick={onApprove}>Approve</button>
          </div>
        )}

      </div>
    </div>
  );
}