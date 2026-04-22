// import React, { useState } from "react";
// import AdminService from "../services/AdminService";
// import "../styles/modal.css";

// export default function EditCustomerModal({ customer, onClose, onSave }) {
//   const [form, setForm] = useState({
//     fullName: customer.fullName,
//     email: customer.email,
//     phone: customer.phone || "",
//     status: customer.status ? "active" : "inactive",
//     address: customer.address || ""
//   });

//   const handleSave = () => {
//     const updated = {
//       ...customer,
//       fullName: form.fullName,
//       email: form.email,
//       phone: form.phone,
//       address: form.address,
//       status: form.status === "active"
//     };

//     AdminService.updateCustomer(customer.customerId, updated)
//   .then((res) => {
//     onSave();                  // reload customer list
//     onClose();                 // close modal
//   });
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal edit-modal">

//         <div className="modal-header">
//           <h2>Edit Customer Information</h2>
//           <button className="close-btn" onClick={onClose}>✕</button>
//         </div>

//         <p className="modal-sub">Update customer details</p>

//         <div className="modal-row">
//           <div className="modal-field">
//             <label>Full Name</label>
//             <input
//               value={form.fullName}
//               onChange={(e) => setForm({ ...form, fullName: e.target.value })}
//             />
//           </div>

//           <div className="modal-field">
//             <label>Email</label>
//             <input
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//             />
//           </div>
//         </div>

//         <div className="modal-row">
//           <div className="modal-field">
//             <label>Phone</label>
//             <input
//               value={form.phone}
//               onChange={(e) => setForm({ ...form, phone: e.target.value })}
//             />
//           </div>

//           <div className="modal-field">
//             <label>Status</label>
//             <select
//               value={form.status}
//               onChange={(e) => setForm({ ...form, status: e.target.value })}
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>
//         </div>

//         <div className="modal-field">
//           <label>Address</label>
//           <textarea
//             value={form.address}
//             onChange={(e) => setForm({ ...form, address: e.target.value })}
//           ></textarea>
//         </div>

//         <div className="modal-actions">
//           <button className="cancel-btn" onClick={onClose}>Cancel</button>
//           <button className="save-btn" onClick={handleSave}>Save Changes</button>
//         </div>

//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import AdminService from "../services/AdminService";
import "../styles/modal.css";

export default function EditCustomerModal({ customer, onClose, onSave }) {
  const [form, setForm] = useState({
    fullName: customer.fullName,
    email: customer.email,
    phone: customer.phone || "",
    address: customer.address || "",
    status: customer.status ? "active" : "inactive",
  });

  const handleSave = () => {
    const updated = {
      ...customer,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      status: form.status === "active",
    };

    AdminService.updateCustomer(customer.customerId, updated).then(() => {
      onSave();
      onClose();
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal edit-modal">

        <div className="modal-header">
          <h2>Edit Customer Information</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <p className="modal-sub">Update customer details</p>

        <div className="modal-row">
          <div className="modal-field">
            <label>Full Name</label>
            <input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>

          <div className="modal-field">
            <label>Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        <div className="modal-row">
          <div className="modal-field">
            <label>Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="modal-field">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="modal-field">
          <label>Address</label>
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}