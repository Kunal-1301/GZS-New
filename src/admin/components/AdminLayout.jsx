import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { AdminGamePostProvider } from "../context/AdminGamePostContext";

const AdminLayout = () => {
  return (
    <AdminGamePostProvider>
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Navbar />
          <div className="admin-content">
            <Outlet />
          </div>
        </div>
      </div>
    </AdminGamePostProvider>
  );
};

export default AdminLayout;