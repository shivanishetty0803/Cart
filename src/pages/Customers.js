// import React, { useEffect, useState } from "react";
// import AdminService from "../services/AdminService";
// import CustomerCard from "../components/CustomerCard";
// import CustomerModal from "../components/CustomerModal";
// import EditCustomerModal from "../components/EditCustomerModal";
// import "../styles/customers.css";

// export default function Customers({ setPage }) {
//   const [customers, setCustomers] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   useEffect(() => {
//     loadCustomers();
//   }, []);

//   const loadCustomers = () => {
//     AdminService.getCustomers().then((res) => setCustomers(res.data));
//   };

//   const openViewModal = (customer) =>
//     setSelectedCustomer({ ...customer, editMode: false });

//   const openEditModal = (customer) =>
//     setSelectedCustomer({ ...customer, editMode: true });

//   const closeModal = () => setSelectedCustomer(null);

//   const filteredCustomers = customers.filter((c) => {
//     const matchesName = c.fullName
//       .toLowerCase()
//       .includes(searchText.toLowerCase());

//     const matchesStatus =
//       statusFilter === "" ||
//       (statusFilter === "active" && c.status === true) ||
//       (statusFilter === "inactive" && c.status === false);

//     return matchesName && matchesStatus;
//   });

//   return (
//     <div className="customer-page">
//       <div className="customer-content">

//         {/* Page Header */}
//         <div className="customer-header">
//           <div>
//             <h1>Customer Management</h1>
//             <p className="subtitle">{customers.length} customers found</p>
//           </div>

//           <button
//             className="back-btn"
//             onClick={() => setPage("dashboard")}
//           >
//             ← Back to Dashboard
//           </button>
//         </div>

//         {/* Search + Filter */}
//         <div className="search-row">
//           <input
//             type="text"
//             placeholder="Search customers..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />

//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="">All Status</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>

//         {/* Customer List */}
//         <div className="customer-list">
//           {filteredCustomers.map((c) => (
//             <CustomerCard
//               key={c.customerId}
//               c={c}
//               onView={() => openViewModal(c)}
//               onEdit={() => openEditModal(c)}
//               onRefresh={loadCustomers}
//             />
//           ))}
//         </div>

//         {/* View Modal */}
//         {selectedCustomer && !selectedCustomer.editMode && (
//           <CustomerModal
//             customer={selectedCustomer}
//             onClose={closeModal}
//           />
//         )}

//         {/* Edit Modal */}
//        {selectedCustomer && selectedCustomer.editMode && (
//   <EditCustomerModal
//     customer={selectedCustomer}
//     onClose={closeModal}
//     onSave={async () => {
//   await loadCustomers();   // wait until new list is loaded correctly

//   // Find updated customer from refreshed list
//   setTimeout(() => {
//     const updatedCustomer = customers.find(
//       (x) => x.customerId === selectedCustomer.customerId
//     );

//     // Update modal with new data
//     if (updatedCustomer) {
//       setSelectedCustomer({ ...updatedCustomer, editMode: false });
//     }
//   }, 100);

// }}
//   />
// )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import CustomerCard from "../components/CustomerCard";
import CustomerModal from "../components/CustomerModal";
import EditCustomerModal from "../components/EditCustomerModal";
import "../styles/customers.css";

export default function Customers({ setPage }) {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const res = await AdminService.getCustomers();
    setCustomers(res.data);
  };

  const openViewModal = (c) =>
    setSelectedCustomer({ ...c, editMode: false });

  const openEditModal = (c) =>
    setSelectedCustomer({ ...c, editMode: true });

  const closeModal = () => setSelectedCustomer(null);

  const filtered = customers.filter((c) => {
    const matchName = c.fullName.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "" ||
      (statusFilter === "active" && c.status === true) ||
      (statusFilter === "inactive" && c.status === false);

    return matchName && matchStatus;
  });

  // ⭐ FIX: Update modal after DB update
 useEffect(() => {
  if (selectedCustomer && !selectedCustomer.editMode) {
    const updated = customers.find(
      (cu) => cu.customerId === selectedCustomer.customerId
    );

    if (updated) {
      setSelectedCustomer({ ...updated, editMode: false });
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [customers]);

  return (
    <div className="customer-page">
      <div className="customer-content">

        <div className="customer-header">
          <div>
            <h1>Customer Management</h1>
            <p className="subtitle">{customers.length} customers found</p>
          </div>

          <button className="back-btn" onClick={() => setPage("dashboard")}>
            ← Back to Dashboard
          </button>
        </div>

        {/* Search & Status Filter */}
        <div className="search-row">
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Customer List */}
        <div className="customer-list">
          {filtered.map((c) => (
            <CustomerCard
              key={c.customerId}
              c={c}
              onView={() => openViewModal(c)}
              onEdit={() => openEditModal(c)}
              onRefresh={loadCustomers}
            />
          ))}
        </div>

        {/* View Modal */}
        {selectedCustomer && selectedCustomer.editMode === false && (
          <CustomerModal customer={selectedCustomer} onClose={closeModal} />
        )}

        {/* Edit Modal */}
        {selectedCustomer && selectedCustomer.editMode === true && (
          <EditCustomerModal
            customer={selectedCustomer}
            onClose={closeModal}
            onSave={async () => {
              await loadCustomers();
            }}
          />
        )}

      </div>
    </div>
  );
}