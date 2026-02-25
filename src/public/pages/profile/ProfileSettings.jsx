export default function ProfileSettings() {
    return (
        <div className="flex flex-col gap-10 font-inter">
            {/* Profile Information Section */}
            <section>
                <h3 className="pr-section-title">
                    Profile Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">First Name</label>
                        <input
                            type="text"
                            defaultValue="John"
                            className="pr-input"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">Last Name</label>
                        <input
                            type="text"
                            defaultValue="Doe"
                            className="pr-input"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">Nickname</label>
                        <input
                            type="text"
                            defaultValue="Khali"
                            className="pr-input"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">Email address</label>
                        <input
                            type="email"
                            defaultValue="khali@gzone.com"
                            className="pr-input"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">Date of birth</label>
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
                        <label className="pr-label">Country/Region</label>
                        <select className="pr-input">
                            <option>United States</option>
                            <option selected>India</option>
                            <option>United Kingdom</option>
                        </select>
                    </div>
                </div>
                <div className="mt-8">
                    <button className="pr-btn-primary">
                        Save Changes
                    </button>
                </div>
            </section>

            {/* Address Information Section */}
            <section>
                <h3 className="pr-section-title">
                    Address Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="pr-label">Address Line 1</label>
                        <input
                            type="text"
                            placeholder="Enter Street Address"
                            className="pr-input"
                        />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="pr-label">Address Line 2 (Optional)</label>
                        <input
                            type="text"
                            placeholder="Apt, Suite, Unit, etc."
                            className="pr-input"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">City</label>
                        <input
                            type="text"
                            placeholder="Enter City"
                            className="pr-input"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">State/Province</label>
                        <input
                            type="text"
                            placeholder="Enter State"
                            className="pr-input"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">Zip/Postal Code</label>
                        <input
                            type="text"
                            placeholder="Enter ZIP Code"
                            className="pr-input"
                        />
                    </div>
                </div>
                <div className="mt-8">
                    <button className="pr-btn-primary">
                        Save Changes
                    </button>
                </div>
            </section>
        </div>
    );
}
