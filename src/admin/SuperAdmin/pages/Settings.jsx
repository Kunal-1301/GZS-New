import { useState, useEffect } from "react";
import { FiUser, FiLock, FiBell, FiGlobe, FiShield, FiSave } from "react-icons/fi";

const TABS = [
    { id: "profile", label: "Profile", Icon: FiUser },
    { id: "security", label: "Security", Icon: FiLock },
    { id: "notifications", label: "Notifications", Icon: FiBell },
    { id: "site", label: "Site Settings", Icon: FiGlobe },
    { id: "permissions", label: "Permissions", Icon: FiShield },
];

export default function Settings() {
    const [activeTab, setActiveTab] = useState("profile");
    const [profile, setProfile] = useState({
        firstName: "Admin",
        lastName: "Name",
        email: "admin@gzonesphere.com",
        role: "Super Admin"
    });

    const [site, setSite] = useState({
        siteName: "GzoneSphere",
        siteTagline: "Your Gaming Universe",
        language: "English",
        theme: "Dark"
    });

    useEffect(() => {
        const savedProfile = localStorage.getItem('gz_admin_profile');
        const savedSite = localStorage.getItem('gz_admin_site_settings');
        if (savedProfile) setProfile(JSON.parse(savedProfile));
        if (savedSite) setSite(JSON.parse(savedSite));
    }, []);

    const saveProfile = () => {
        localStorage.setItem('gz_admin_profile', JSON.stringify(profile));
        alert("Profile saved!");
    };

    const saveSite = () => {
        localStorage.setItem('gz_admin_site_settings', JSON.stringify(site));
        alert("Site settings saved!");
    };

    return (
        <div>
            <h1 className="admin-page-title">Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">

                {/* Nav */}
                <div className="admin-card p-4 h-fit space-y-1">
                    {TABS.map(({ id, label, Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`admin-nav-link flex items-center gap-2.5 w-full text-left p-3 rounded-lg transition-all text-xs font-bold
                ${activeTab === id ? "!bg-[var(--theme-primary)] !text-[var(--theme-text-inverse)] shadow-lg scale-[1.02]" : "hover:bg-[var(--theme-bg-alt)] opacity-60 hover:opacity-100"}`}
                        >
                            <Icon size={13} /> {label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {activeTab === "profile" && (
                        <div className="admin-card animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="admin-section-title">Profile Information</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div className="admin-field">
                                    <label className="admin-label">First Name</label>
                                    <input
                                        className="admin-input"
                                        value={profile.firstName}
                                        onChange={e => setProfile({ ...profile, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Last Name</label>
                                    <input
                                        className="admin-input"
                                        value={profile.lastName}
                                        onChange={e => setProfile({ ...profile, lastName: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Email Address</label>
                                    <input
                                        className="admin-input"
                                        type="email"
                                        value={profile.email}
                                        onChange={e => setProfile({ ...profile, email: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Role</label>
                                    <input className="admin-input opacity-60 bg-gray-50" value={profile.role} disabled />
                                </div>
                            </div>
                            <button onClick={saveProfile} className="admin-btn-primary"><FiSave size={13} /> Save Changes</button>
                        </div>
                    )}

                    {activeTab === "site" && (
                        <div className="admin-card animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="admin-section-title">Site Settings</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div className="admin-field">
                                    <label className="admin-label">Site Name</label>
                                    <input
                                        className="admin-input"
                                        value={site.siteName}
                                        onChange={e => setSite({ ...site, siteName: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Site Tagline</label>
                                    <input
                                        className="admin-input"
                                        value={site.siteTagline}
                                        onChange={e => setSite({ ...site, siteTagline: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Default Language</label>
                                    <select
                                        className="admin-select"
                                        value={site.language}
                                        onChange={e => setSite({ ...site, language: e.target.value })}
                                    >
                                        <option>English</option>
                                        <option>Hindi</option>
                                        <option>Spanish</option>
                                    </select>
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Default Theme</label>
                                    <select
                                        className="admin-select"
                                        value={site.theme}
                                        onChange={e => setSite({ ...site, theme: e.target.value })}
                                    >
                                        <option>Dark</option>
                                        <option>Light</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={saveSite} className="admin-btn-primary"><FiSave size={13} /> Save Settings</button>
                        </div>
                    )}

                    {["security", "notifications", "permissions"].includes(activeTab) && (
                        <div className="admin-card py-20 text-center text-xs font-black tracking-widest text-[var(--theme-text-muted)] opacity-40">
                            <FiShield size={40} className="mx-auto mb-4 opacity-20" />
                            MODULE UNDER DEVELOPMENT
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
