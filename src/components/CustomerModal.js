// import React from "react";
// import "../styles/modal.css";

// export default function CustomerModal({ customer, onClose }) {
//   return (
//     <div className="modal-overlay">
//       <div className="modal">

//         <div className="modal-header">
//           <h2>Customer Details</h2>
//           <button className="close-btn" onClick={onClose}>✕</button>
//         </div>

//         <p className="modal-email">{customer.email}</p>

//         <div className="modal-row">
//           <div className="modal-field">
//             <label>Full Name</label>
//             <p>{customer.fullName}</p>
//           </div>

//           <div className="modal-field">
//             <label>Email</label>
//             <p>{customer.email}</p>
//           </div>
//         </div>

//         <div className="modal-row">
//           <div className="modal-field">
//             <label>Phone</label>
//             <p>{customer.phone || "N/A"}</p>
//           </div>

//           <div className="modal-field">
//             <label>Status</label>
//             <p className={`status-pill ${customer.status ? "active" : "inactive"}`}>
//               {customer.status ? "Active" : "Inactive"}
//             </p>
//           </div>
//         </div>

//         <div className="modal-field">
//           <label>Address</label>
//           <p>{customer.address || "Not Provided"}</p>
//         </div>

//         <h3 className="purchase-title">Purchase History</h3>

//         <div className="purchase-row">
//           <div className="purchase-box">
//             <p>Total Orders</p>
//             <h3>{customer.totalOrders}</h3>
//           </div>

//           <div className="purchase-box">
//             <p>Total Spent</p>
//             <h3>₹{customer.totalSpent}</h3>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
import React from "react";
import "../styles/modal.css";

export default function CustomerModal({ customer, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h2>Customer Details</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <p className="modal-email">{customer.email}</p>

        <div className="modal-row">
          <div className="modal-field">
            <label>Full Name</label>
            <p>{customer.fullName}</p>
          </div>

          <div className="modal-field">
            <label>Email</label>
            <p>{customer.email}</p>
          </div>
        </div>

        <div className="modal-row">
          <div className="modal-field">
            <label>Phone</label>
            <p>{customer.phone || "N/A"}</p>
          </div>

          <div className="modal-field">
            <label>Status</label>
            <p className={`status-pill ${customer.status ? "active" : "inactive"}`}>
              {customer.status ? "Active" : "Inactive"}
            </p>
          </div>
        </div>

        <div className="modal-field">
          <label>Address</label>
          <p>{customer.address || "Not Provided"}</p>
        </div>

        <h3 className="purchase-title">Purchase History</h3>

        <div className="purchase-row">
          <div className="purchase-box">
            <p>Total Orders</p>
            <h3>{customer.totalOrders}</h3>
          </div>

          <div className="purchase-box">
            <p>Total Spent</p>
            <h3>₹{customer.totalSpent}</h3>
          </div>
        </div>

      </div>
    </div>
  );
}