import { FiUser, FiLock, FiBell, FiGlobe, FiShield, FiSave } from "react-icons/fi";

const TABS = [
    { label: "Profile", Icon: FiUser },
    { label: "Security", Icon: FiLock },
    { label: "Notifications", Icon: FiBell },
    { label: "Site Settings", Icon: FiGlobe },
    { label: "Permissions", Icon: FiShield },
];

export default function Settings() {
    return (
        <div>
            <h1 className="admin-page-title">Settings</h1>

            <div className="grid grid-cols-[200px_1fr] gap-6">

                {/* Nav */}
                <div className="admin-card p-4 h-fit">
                    {TABS.map(({ label, Icon }, i) => (
                        <button
                            key={label}
                            className={`admin-nav-link flex items-center gap-2.5 w-full text-left
                ${i === 0 ? "!bg-admin-accent !text-admin-accent-text" : ""}`}
                        >
                            <Icon size={13} /> {label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div>
                    <div className="admin-card">
                        <div className="admin-section-title">Profile Information</div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="admin-field"><label className="admin-label">First Name</label><input className="admin-input" defaultValue="Admin" /></div>
                            <div className="admin-field"><label className="admin-label">Last Name</label><input className="admin-input" defaultValue="Name" /></div>
                            <div className="admin-field"><label className="admin-label">Email Address</label><input className="admin-input" type="email" defaultValue="admin@gzonesphere.com" /></div>
                            <div className="admin-field"><label className="admin-label">Role</label><input className="admin-input opacity-60" defaultValue="Super Admin" disabled /></div>
                        </div>
                        <button className="admin-btn-primary"><FiSave size={13} /> Save Changes</button>
                    </div>

                    <div className="admin-card">
                        <div className="admin-section-title">Site Settings</div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="admin-field"><label className="admin-label">Site Name</label><input className="admin-input" defaultValue="GzoneSphere" /></div>
                            <div className="admin-field"><label className="admin-label">Site Tagline</label><input className="admin-input" defaultValue="Your Gaming Universe" /></div>
                            <div className="admin-field">
                                <label className="admin-label">Default Language</label>
                                <select className="admin-select"><option>English</option><option>Hindi</option></select>
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Default Theme</label>
                                <select className="admin-select"><option>Dark</option><option>Light</option></select>
                            </div>
                        </div>
                        <button className="admin-btn-primary"><FiSave size={13} /> Save Settings</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
