// import React from "react";
// import AdminService from "../services/AdminService";

// export default function CustomerCard({ c, onView, onEdit, onRefresh }) {
//   const toggleStatus = () => {
//     AdminService.updateCustomerStatus(c.customerId, !c.status).then(() =>
//       onRefresh()
//     );
//   };

//   return (
//     <div className="customer-card">

//       <div className="left-info">
//         <div className="avatar"></div>

//         <div>
//           <h3>{c.fullName}</h3>
//           <p className="email">{c.email}</p>
//           <small>
//             Joined: {c.joinDate || "01/01/2024"} • Orders: {c.totalOrders} • Spent: ₹{c.totalSpent}
//           </small>
//         </div>
//       </div>

//       <div className="right-info">

//         <span className={`status-pill ${c.status ? "active" : "inactive"}`}>
//           {c.status ? "Active" : "Inactive"}
//         </span>

//         <button className="view-btn" onClick={onView}>View Details</button>
//         <button className="edit-btn" onClick={onEdit}>Edit</button>

//         <button
//           className={c.status ? "deactivate-btn" : "activate-btn"}
//           onClick={toggleStatus}
//         >
//           {c.status ? "Deactivate" : "Activate"}
//         </button>

//       </div>

//     </div>
//   );
// }
import React from "react";
import AdminService from "../services/AdminService";

export default function CustomerCard({ c, onView, onEdit, onRefresh }) {
  const toggleStatus = () => {
    AdminService.updateCustomerStatus(c.customerId, !c.status).then(() =>
      onRefresh()
    );
  };

  return (
    <div className="customer-card">

      <div className="left-info">
        <div className="avatar"></div>

        <div>
          <h3>{c.fullName}</h3>
          <p className="email">{c.email}</p>
          <small>
            Joined: {c.joinDate || "01/01/2024"} • Orders: {c.totalOrders} • Spent: ₹{c.totalSpent}
          </small>
        </div>
      </div>

      <div className="right-info">
        <span className={`status-pill ${c.status ? "active" : "inactive"}`}>
          {c.status ? "Active" : "Inactive"}
        </span>

        <button className="view-btn" onClick={onView}>View Details</button>
        <button className="edit-btn" onClick={onEdit}>Edit</button>

        <button
          className={c.status ? "deactivate-btn" : "activate-btn"}
          onClick={toggleStatus}
        >
          {c.status ? "Deactivate" : "Activate"}
        </button>
      </div>

    </div>
  );
}