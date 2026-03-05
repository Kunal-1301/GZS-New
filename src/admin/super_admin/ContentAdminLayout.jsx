import { Outlet } from "react-router-dom";
import ContentAdminNavbar from "./ContentAdminNavbar";
import ContentAdminSidebar from "./ContentAdminSidebar";

const ContentAdminLayout = () => {
    return (
        <div className="theme-admin admin-layout min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)]">
            <ContentAdminSidebar />

            <div className="admin-main">
                <ContentAdminNavbar />

                <div className="admin-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ContentAdminLayout;
