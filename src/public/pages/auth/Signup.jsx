import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Signup() {
    const navigate = useNavigate();
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (agreed) {
            // Route flow for demo purposes 
            navigate('/verify-email');
        }
    };

    return (
        <AuthLayout
            title="JOIN GZONESPHERE ECOSYSTEM"
            subtitle="One account. All privileges. Connect with like-minded gamers and compete."
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                    <label className="au-label">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        placeholder="gaming@example.com"
                        className="au-input"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                    <label className="au-label">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="au-input"
                    />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
                    <label className="au-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="au-input"
                    />
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-3 mt-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        required
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded-sm border-au-input-border bg-au-input-bg text-white focus:ring-0 cursor-pointer"
                    />
                    <span className="text-xs text-white/80 leading-relaxed group-hover:text-white transition-colors">
                        I agree with User agreement and privacy. Also allow promotional emails regarding GzoneSphere.
                    </span>
                </label>

                {/* Actions */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        type="submit"
                        className="au-btn-primary"
                    >
                        OTP
                    </button>

                    <Link
                        to="/login"
                        className="au-link"
                    >
                        Login →
                    </Link>
                </div>

            </form>
        </AuthLayout>
    );
}
