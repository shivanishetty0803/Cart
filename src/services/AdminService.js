// import axios from "axios";

// const API = "http://localhost:8080/admin";

// const AdminService = {

//   // Dashboard
//   getDashboard: () => axios.get(`${API}/dashboard`),

//   // Customers
//   getCustomers: () => axios.get(`${API}/customers`),
//   updateCustomerStatus: (id, status) =>
//     axios.patch(`${API}/customers/${id}/status`, null, { params: { status } }),

//   // FIXED — this is the MISSING function causing your error
//   updateCustomer: (id, data) =>
//     axios.put(`${API}/customers/${id}`, data),

//   // Vendors
//   getVendors: () => axios.get(`${API}/vendors`),
//   getPendingVendors: () => axios.get(`${API}/vendors/pending`),
//   approveVendor: (id, remarks) =>
//     axios.post(`${API}/vendors/${id}/approve`, null, { params: { remarks } }),
//   rejectVendor: (id, remarks) =>
//     axios.post(`${API}/vendors/${id}/reject`, null, { params: { remarks } }),

//   // Reports
//   getVendorReports: () => axios.get(`${API}/reports/vendors`),
//   getSummary: () => axios.get(`${API}/reports/summary`)
// };

// export default AdminService;
import axios from "axios";

const API = "http://localhost:8080/admin";

const AdminService = {
  getDashboard: () => axios.get(`${API}/dashboard`),

  // Customers
  getCustomers: () => axios.get(`${API}/customers`),
  getCustomerById: (id) => axios.get(`${API}/customers/${id}`),

  updateCustomerStatus: (id, status) =>
    axios.patch(`${API}/customers/${id}/status`, null, {
      params: { status },
    }),

  updateCustomer: (id, data) =>
    axios.put(`${API}/customers/${id}`, data),

  // Vendors
  getVendors: () => axios.get(`${API}/vendors`),
  getPendingVendors: () => axios.get(`${API}/vendors/pending`),

  approveVendor: (id, remarks) =>
    axios.post(`${API}/vendors/${id}/approve`, null, { params: { remarks } }),

  rejectVendor: (id, remarks) =>
    axios.post(`${API}/vendors/${id}/reject`, null, { params: { remarks } }),

  // Reports
  getVendorReports: () => axios.get(`${API}/reports/vendors`),
  getSummary: () => axios.get(`${API}/reports/summary`),
};

export default AdminService;