import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Vendors from "./pages/Vendors";
//import Reports from "./pages/Reports";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app-container">

      {page === "dashboard" && <Dashboard setPage={setPage} />}
      {page === "customers" && <Customers setPage={setPage} />}
      {page === "vendors" && <Vendors setPage={setPage} />}
    {/* {page === "reports" && <Reports setPage={setPage} />} */}

    </div>
  );
}