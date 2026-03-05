import { FiLock, FiGlobe, FiCpu, FiMessageCircle, FiPlus, FiLink } from 'react-icons/fi';

export default function IdentityCMS() {
    return (
        <div className="theme-profile flex flex-col gap-12 font-body pb-20">
            {/* Identity Profile Section */}
            <section className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <span className="text-[9px] font-black bg-purple-100 text-purple-600 px-3 py-1 rounded-full uppercase tracking-widest">MASTER IDENTITY</span>
                </div>
                <h3 className="pr-section-title flex items-center gap-3">
                    <FiCpu className="text-purple-500" /> Core Identity
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">Identity Name (Username)</label>
                        <input type="text" defaultValue="Khali" className="pr-input" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">Official First Name</label>
                        <input type="text" defaultValue="John" className="pr-input" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">Official Last Name</label>
                        <input type="text" defaultValue="Doe" className="pr-input" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">Primary Email</label>
                        <input type="email" defaultValue="khali@gzone.com" className="pr-input" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">Date of Birth</label>
                        <input type="date" defaultValue="1995-08-15" className="pr-input" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">Nationality</label>
                        <select className="pr-input">
                            <option>India</option>
                            <option>United States</option>
                            <option>United Kingdom</option>
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex gap-4">
                    <button className="gzs-btn-primary !px-10">SAVE IDENTITY</button>
                    <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600">RESET CHANGES</button>
                </div>
            </section>

            {/* Professional & Social Connectivity */}
            <section className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm">
                <h3 className="pr-section-title flex items-center gap-3">
                    <FiLink className="text-blue-500" /> Linked Platforms
                </h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8 leading-relaxed">
                    Connect your professional proof to boost your reputation score across all facades.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                                <FiMessageCircle size={24} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase text-gray-950">Discord Connectivity</h4>
                                <p className="text-[9px] font-bold text-green-600 uppercase">CONNECTED: KHALI#0001</p>
                            </div>
                        </div>
                        <button className="text-[10px] font-black text-red-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">DISCONNECT</button>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 group border-dashed">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                                <FiPlus size={24} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase text-gray-400">Add LinkedIn Profile</h4>
                                <p className="text-[9px] font-bold text-gray-400 uppercase italic">STRENGTHEN WORK HISTORY</p>
                            </div>
                        </div>
                        <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest">CONNECT</button>
                    </div>
                </div>
            </section>

            {/* Privacy & Visibility Control */}
            <section className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm">
                <h3 className="pr-section-title flex items-center gap-3">
                    <FiLock className="text-red-400" /> Privacy Governance
                </h3>
                <div className="space-y-6">
                    {[
                        { label: 'Public Identity Hub', desc: 'Allow anyone to view your Master Hub and activity stats.' },
                        { label: 'Show Sub-Profiles', desc: 'Display all active facades on your primary social view.' },
                        { label: 'Data Tracking', desc: 'Allow GzoneSphere to aggregate your gameplay data for analytics.' }
                    ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl">
                            <div>
                                <h4 className="text-xs font-black uppercase text-gray-950 mb-1">{item.label}</h4>
                                <p className="text-[10px] font-medium text-gray-500 max-w-md">{item.desc}</p>
                            </div>
                            <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Address Information Section */}
            <section className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm opacity-60">
                <h3 className="pr-section-title flex items-center gap-3">
                    <FiGlobe className="text-gray-400" /> Billing & Logistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="pr-label">Address Line 1</label>
                        <input type="text" placeholder="Enter Street Address" className="pr-input" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">City</label>
                        <input type="text" placeholder="Enter City" className="pr-input" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">Zip/Postal Code</label>
                        <input type="text" placeholder="Enter ZIP Code" className="pr-input" />
                    </div>
                </div>
            </section>
        </div>
    );
}
