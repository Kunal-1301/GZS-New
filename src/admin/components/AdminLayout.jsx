import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Navbar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;