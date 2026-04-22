import React from "react";

export default function PendingVendorCard({ vendor, onApprove, onReject, onView }) {
  return (
    <div className="pending-card">

      <div className="pending-info">
        <h3 className="vendor-name">{vendor.vendorName}</h3>
        <p className="owner">
          Owner: {vendor.ownerName || "Unknown"} <br />
          {vendor.email}
        </p>
        <p className="applied">Applied: {vendor.createdAt?.split("T")[0]}</p>
      </div>

      <span className="badge pending">pending</span>

      <div className="pending-actions">
        <button className="view-btn" onClick={onView}>View Details</button>
        <button className="reject-btn" onClick={onReject}>Reject</button>
        <button className="approve-btn" onClick={onApprove}>Approve</button>
      </div>

    </div>
  );
}