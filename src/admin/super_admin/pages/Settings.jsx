import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    FiUser, FiLock, FiBell, FiGlobe, FiShield, FiSave,
    FiSettings, FiActivity, FiKey, FiMail, FiMonitor
} from "react-icons/fi";
import { mockApiService } from "@services/mockApiService";

const TABS = [
    { id: "profile", label: "Identity", Icon: FiUser, sub: "Personal Details" },
    { id: "security", label: "Encryption", Icon: FiLock, sub: "Access & Security" },
    { id: "notifications", label: "Directives", Icon: FiBell, sub: "System Alerts" },
    { id: "site", label: "Platform", Icon: FiGlobe, sub: "Global Variables" },
    { id: "permissions", label: "Authority", Icon: FiShield, sub: "Access Control" },
];

export default function Settings() {
    const [activeTab, setActiveTab] = useState("profile");
    const queryClient = useQueryClient();

    const { data: profile = {}, isLoading } = useQuery({
        queryKey: ['admin', 'profile'],
        queryFn: async () => {
            return {
                firstName: "Admin",
                lastName: "User",
                email: "admin@gzonesphere.com",
                role: "Super Admin",
                siteName: "GzoneSphere",
                tagline: "The Ultimate Gaming Oracle",
                language: "English",
                theme: "Dark"
            };
        }
    });

    const updateMutation = useMutation({
        mutationFn: async (data) => {
            console.log("Updating settings", data);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'profile']);
            alert("System configuration updated successfully.");
        }
    });

    if (isLoading) return <div className="p-20 text-center animate-pulse text-xs font-black uppercase tracking-widest text-neutral-400">ACCESSING CONFIGURATION CORE...</div>;

    return (
        <div className="animate-[fadeIn_0.5s_ease-out] pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-black/20"><FiSettings size={22} /></div>
                    <div>
                        <h1 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">System Parameters</h1>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Configuration & Global Logic Controls</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">
                {/* Navigation Sidebar */}
                <div className="space-y-2">
                    {TABS.map(({ id, label, Icon, sub }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`flex items-center gap-4 w-full p-6 rounded-[2.5rem] transition-all group
                                ${activeTab === id
                                    ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20 translate-x-2"
                                    : "bg-white text-neutral-400 hover:bg-neutral-50 border border-neutral-100 hover:border-neutral-200"}`}
                        >
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors
                                ${activeTab === id ? "bg-white/20 text-white" : "bg-neutral-50 text-neutral-400 group-hover:bg-white"}`}>
                                <Icon size={18} />
                            </div>
                            <div className="text-left">
                                <span className="text-[10px] font-black uppercase tracking-widest block">{label}</span>
                                <span className={`text-[8px] font-bold uppercase tracking-widest opacity-40 block mt-0.5
                                    ${activeTab === id ? "text-white/60" : "text-neutral-400"}`}>{sub}</span>
                            </div>
                        </button>
                    ))}

                    <div className="mt-10 p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-50 mb-4 font-black text-xs italic">GZ</div>
                        <p className="text-[9px] font-black text-indigo-900/40 leading-relaxed uppercase tracking-wider">
                            Kernel Version: 4.2.0-STABLE<br />Last Build: Mar 05, 2026
                        </p>
                    </div>
                </div>

                {/* Content Area */}
                <div className="space-y-8 animate-[slideInUp_0.4s_ease-out]">
                    {activeTab === "profile" && (
                        <div className="bg-white rounded-[3rem] border border-neutral-100 p-12 shadow-sm">
                            <div className="flex items-center gap-3 mb-10">
                                <FiActivity size={16} className="text-indigo-600" />
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">Security Identification</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest ml-1">Assigned Forename</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300" />
                                        <input className="admin-input !pl-14 !rounded-2xl" defaultValue={profile.firstName} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest ml-1">Surname Registry</label>
                                    <input className="admin-input !rounded-2xl" defaultValue={profile.lastName} />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest ml-1">Verified Email Directive</label>
                                    <div className="relative">
                                        <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300" />
                                        <input className="admin-input !pl-14 !rounded-2xl" type="email" defaultValue={profile.email} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest ml-1">Access Tier</label>
                                    <div className="relative">
                                        <FiKey className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300" />
                                        <input className="admin-input !pl-14 !rounded-2xl bg-neutral-50 text-neutral-400 font-black italic cursor-not-allowed" defaultValue={profile.role} disabled />
                                    </div>
                                </div>
                            </div>
                            <button className="bg-indigo-600 text-white rounded-2xl px-8 py-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-indigo-600/20 hover:-translate-y-1 transition-all">
                                <FiSave size={14} /> COMMUTE CHANGES
                            </button>
                        </div>
                    )}

                    {activeTab === "site" && (
                        <div className="bg-white rounded-[3rem] border border-neutral-100 p-12 shadow-sm">
                            <div className="flex items-center gap-3 mb-10">
                                <FiGlobe size={16} className="text-indigo-600" />
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">Frontend Environment</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest ml-1">Platform Brand Name</label>
                                    <input className="admin-input !rounded-2xl" defaultValue={profile.siteName} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest ml-1">Market Segment Tagline</label>
                                    <input className="admin-input !rounded-2xl" defaultValue={profile.tagline} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest ml-1">Default Linguistic Core</label>
                                    <div className="relative">
                                        <FiGlobe className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300" />
                                        <select className="admin-select !pl-14 !rounded-2xl appearance-none">
                                            <option>English (Global)</option>
                                            <option>Japanese (JP)</option>
                                            <option>Hindi (IN)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest ml-1">UI Neutral Vector</label>
                                    <div className="relative">
                                        <FiMonitor className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300" />
                                        <select className="admin-select !pl-14 !rounded-2xl appearance-none">
                                            <option>Deep Space (Dark)</option>
                                            <option>Solar Flare (Light)</option>
                                            <option>System Default</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button className="bg-neutral-900 text-white rounded-2xl px-8 py-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-black/10 hover:-translate-y-1 transition-all">
                                <FiSave size={14} /> AUTHORIZE SYSTEM UPDATE
                            </button>
                        </div>
                    )}

                    {["security", "notifications", "permissions"].includes(activeTab) && (
                        <div className="bg-white rounded-[3rem] border-2 border-dashed border-neutral-100 p-20 text-center opacity-40">
                            <FiLock size={40} className="mx-auto mb-6 text-neutral-200" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900 mb-2">Encrypted Section</h3>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest max-w-xs mx-auto leading-relaxed italic">
                                This module is currently protected by secondary biometric verification.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

