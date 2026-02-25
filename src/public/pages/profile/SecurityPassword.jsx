import { useState } from 'react';

export default function SecurityPassword() {
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    return (
        <div className="flex flex-col gap-10 font-inter">
            {/* Change Password Section */}
            <section>
                <h3 className="pr-section-title">
                    Change Password
                </h3>
                <div className="flex flex-col gap-6 max-w-md">
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">Current Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="pr-input"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">New Password</label>
                        <input
                            type="password"
                            placeholder="New password"
                            className="pr-input"
                        />
                        <p className="text-[10px] text-pr-text-muted mt-1">Must be at least 8 characters</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="pr-label">Confirm New Password</label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className="pr-input"
                        />
                    </div>
                    <div className="mt-4">
                        <button className="pr-btn-primary">
                            Update Password
                        </button>
                    </div>
                </div>
            </section>

            {/* Two-Factor Authentication Section */}
            <section>
                <h3 className="pr-section-title">
                    Two-Factor Authentication
                </h3>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 border border-pr-border rounded-xl bg-pr-surface">
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-pr-text mb-1">
                            Authenticator App
                        </h4>
                        <p className="text-xs text-pr-text-muted leading-relaxed max-w-lg">
                            Protect your account from unauthorized access by requiring a second authentication method in addition to your password.
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                            className={`px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-lg transition-colors shadow-sm border ${is2FAEnabled
                                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                                    : 'bg-pr-primary text-white border-transparent hover:bg-pr-primary-dark'
                                }`}
                        >
                            {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
