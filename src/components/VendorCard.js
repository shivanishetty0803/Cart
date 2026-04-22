import React from "react";

export default function VendorCard({ vendor, onView }) {
  return (
    <div className="vendor-card">

      {/* LEFT SIDE */}
      <div className="vendor-left">
        <h3 className="vendor-name">{vendor.vendorName}</h3>

        <p className="owner">
          Owner: {vendor.ownerName || "N/A"} <br />
          {vendor.email}
        </p>

        <div className="vendor-stats">
          <div>
            <p className="label">Products</p>
            <h4>{vendor.totalProducts}</h4>
          </div>

          <div>
            <p className="label">Revenue</p>
            <h4 className="green-text">₹{vendor.totalRevenue}</h4>
          </div>

          <div>
            <p className="label">Member Since</p>
            <h4>{vendor.createdAt?.split("T")[0]}</h4>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="vendor-right">
        
        {/* STATUS BADGE */}
        <span className={`badge ${vendor.status.toLowerCase()}`}>
          {vendor.status}
        </span>

        <button className="view-details-btn" onClick={onView}>
          View Details
        </button>

      </div>

    </div>
  );
}