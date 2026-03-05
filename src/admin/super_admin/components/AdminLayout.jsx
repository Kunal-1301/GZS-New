import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { AdminGamePostProvider } from '@context/AdminGamePostContext';

const AdminLayout = () => {
  return (
    <AdminGamePostProvider>
      <div className="theme-admin admin-layout min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)]">
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
