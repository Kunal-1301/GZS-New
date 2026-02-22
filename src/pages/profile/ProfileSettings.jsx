export default function ProfileSettings() {
    return (
        <div className="flex flex-col gap-10 font-inter">
            {/* Profile Information Section */}
            <section>
                <h3 className="text-base font-black uppercase tracking-widest text-pr-text mb-6 border-b border-pr-border pb-3">
                    Profile Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase text-pr-text-muted tracking-widest">First Name</label>
                        <input
                            type="text"
                            defaultValue="John"
                            className="px-4 py-2.5 bg-pr-surface border border-pr-border rounded-lg text-sm font-medium text-pr-text focus:outline-none focus:border-pr-primary transition-colors w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase text-pr-text-muted tracking-widest">Last Name</label>
                        <input
                            type="text"
                            defaultValue="Doe"
                            className="px-4 py-2.5 bg-pr-surface border border-pr-border rounded-lg text-sm font-medium text-pr-text focus:outline-none focus:border-pr-primary transition-colors w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase text-pr-text-muted tracking-widest">Nickname</label>
                        <input
                            type="text"
                            defaultValue="Khali"
                            className="px-4 py-2.5 bg-pr-surface border border-pr-border rounded-lg text-sm font-medium text-pr-text focus:outline-none focus:border-pr-primary transition-colors w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase text-pr-text-muted tracking-widest">Email address</label>
                        <input
                            type="email"
                            defaultValue="khali@gzone.com"
                            className="px-4 py-2.5 bg-pr-surface border border-pr-border rounded-lg text-sm font-medium text-pr-text focus:outline-none focus:border-pr-primary transition-colors w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase text-pr-text-muted tracking-widest">Date of birth</label>
                        <div className="grid grid-cols-3 gap-2">
                            <select className="px-3 py-2.5 bg-pr-surface border border-pr-border rounded-lg text-sm font-medium text-pr-text focus:outline-none focus:border-pr-primary w-full">
                                <option>DD</option>
                                <option selected>15</option>
                            </select>
                            <select className="px-3 py-2.5 bg-pr-surface border border-pr-border rounded-lg text-sm font-medium text-pr-text focus:outline-none focus:border-pr-primary w-full">
                                <option>MMM</option>
                                <option selected>Aug</option>
                            </select>
                            <select className="px-3 py-2.5 bg-pr-surface border border-pr-border rounded-lg text-sm font-medium text-pr-text focus:outline-none focus:border-pr-primary w-full">
                                <option>YYYY</option>
                                <option selected>1995</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase text-pr-text-muted tracking-widest">Country/Region</label>
                        <select className="px-4 py-2.5 bg-pr-surface border border-pr-border rounded-lg text-sm font-medium text-pr-text focus:outline-none focus:border-pr-primary transition-colors w-full">
                            <option>United States</option>
                            <option selected>India</option>
                            <option>United Kingdom</option>
                        </select>
                    </div>
                </div>
                <div className="mt-8">
                    <button className="px-8 py-3 bg-pr-primary hover:bg-pr-primary-dark text-white text-xs font-black uppercase tracking-widest rounded-lg transition-colors shadow-sm">
                        Save Changes
                    </button>
                </div>
            </section>

            {/* Address Information Section */}
            <section>
                <h3 className="text-base font-black uppercase tracking-widest text-pr-text mb-6 border-b border-pr-border pb-3">
                    Address Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-[10px] font-bold uppercase text-pr-text-muted tracking-widest">Address Line 1</label>
                        <input
                            type="text"
                            placeholder="Enter Street Address"
                            className="px-4 py-2.5 bg-pr-surface border border-pr-border rounded-lg text-sm font-medium text-pr-text focus:outline-none focus:border-pr-primary transition-colors w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-[10px] font-bold uppercase text-pr-text-muted tracking-widest">Address Line 2 (Optional)</label>
                        <input
                            type="text"
                            placeholder="Apt, Suite, Unit, etc."
                            className="px-4 py-2.5 bg-pr-surface border border-pr-border rounded-lg text-sm font-medium text-pr-text focus:outline-none focus:border-pr-primary transition-colors w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase text-pr-text-muted tracking-widest">City</label>
                        <input
                            type="text"
                            placeholder="Enter City"
                            className="px-4 py-2.5 bg-pr-surface border border-pr-border rounded-lg text-sm font-medium text-pr-text focus:outline-none focus:border-pr-primary transition-colors w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase text-pr-text-muted tracking-widest">State/Province</label>
                        <input
                            type="text"
                            placeholder="Enter State"
                            className="px-4 py-2.5 bg-pr-surface border border-pr-border rounded-lg text-sm font-medium text-pr-text focus:outline-none focus:border-pr-primary transition-colors w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase text-pr-text-muted tracking-widest">Zip/Postal Code</label>
                        <input
                            type="text"
                            placeholder="Enter ZIP Code"
                            className="px-4 py-2.5 bg-pr-surface border border-pr-border rounded-lg text-sm font-medium text-pr-text focus:outline-none focus:border-pr-primary transition-colors w-full"
                        />
                    </div>
                </div>
                <div className="mt-8">
                    <button className="px-8 py-3 bg-pr-primary hover:bg-pr-primary-dark text-white text-xs font-black uppercase tracking-widest rounded-lg transition-colors shadow-sm">
                        Save Changes
                    </button>
                </div>
            </section>
        </div>
    );
}
