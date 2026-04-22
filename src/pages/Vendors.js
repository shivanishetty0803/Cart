import React, { useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import PendingVendorCard from "../components/PendingVendorCard";
import VendorCard from "../components/VendorCard";
import VendorModal from "../components/VendorModal";
import "../styles/vendors.css";

export default function Vendors({ setPage }) {
  const [pendingVendors, setPendingVendors] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    loadPending();
    loadVendors();
  }, []);

  const loadPending = () => {
    AdminService.getPendingVendors().then((res) =>
      setPendingVendors(res.data)
    );
  };

  const loadVendors = () => {
    AdminService.getVendors().then((res) => setVendors(res.data));
  };

  const approve = (id) => {
    AdminService.approveVendor(id, "Approved").then(() => {
      loadPending();
      loadVendors();
    });
  };

  const reject = (id) => {
    AdminService.rejectVendor(id, "Rejected").then(() => {
      loadPending();
      loadVendors();
    });
  };

  return (
    <div className="vendor-page">

      <div className="vendor-content">

        {/* Header */}
        <div className="vendor-header">
          <div>
            <h1>Vendor Management</h1>
            <p className="subtext">{vendors.length} approved, {pendingVendors.length} pending</p>
          </div>

          <button className="back-btn" onClick={() => setPage("dashboard")}>
            ← Back to Dashboard
          </button>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button className="tab active">Management</button>
          <button className="tab">Reports</button>
        </div>

        {/* Pending */}
        <h2 className="section-title">Pending Approvals</h2>

        {pendingVendors.length === 0 ? (
          <p className="no-pending">No pending vendor requests</p>
        ) : (
          pendingVendors.map((v) => (
            <PendingVendorCard
              key={v.vendorId}
              vendor={v}
              onApprove={() => approve(v.vendorId)}
              onReject={() => reject(v.vendorId)}
              onView={() => setSelectedVendor(v)}
            />
          ))
        )}

        {/* All Vendors */}
        <h2 className="section-title">All Vendors</h2>

        {vendors.map((v) => (
          <VendorCard
            key={v.vendorId}
            vendor={v}
            onView={() => setSelectedVendor(v)}
          />
        ))}

        {selectedVendor && (
          <VendorModal
            vendor={selectedVendor}
            onClose={() => setSelectedVendor(null)}
            onApprove={() => approve(selectedVendor.vendorId)}
            onReject={() => reject(selectedVendor.vendorId)}
          />
        )}

      </div>

    </div>
  );
}