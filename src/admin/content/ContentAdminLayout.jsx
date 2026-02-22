import { Outlet } from "react-router-dom";
import ContentAdminNavbar from "./ContentAdminNavbar";
import ContentAdminSidebar from "./ContentAdminSidebar";

const ContentAdminLayout = () => {
    return (
        <div className="admin-layout">
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
