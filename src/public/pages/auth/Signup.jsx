import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Signup() {
    const navigate = useNavigate();
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (agreed) {
            navigate('/verify-email');
        }
    };

    return (
        <AuthLayout
            title="JOIN GZONESPHERE ECOSYSTEM"
            subtitle="One account. All privileges. Connect with like-minded gamers and compete."
            sideLink={{ prefix: 'Already have an account?', href: '/login', label: 'Login' }}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                    <label className="au-label">Email Address</label>
                    <input
                        type="email"
                        required
                        placeholder="gaming@example.com"
                        className="au-input"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                    <label className="au-label">Password</label>
                    <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="au-input"
                    />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
                    <label className="au-label">Confirm Password</label>
                    <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="au-input"
                    />
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 mt-1 cursor-pointer group">
                    <input
                        type="checkbox"
                        required
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded-sm bg-white/10 border border-white/40 cursor-pointer accent-white"
                    />
                    <span className="text-[11px] text-white/75 leading-relaxed group-hover:text-white/90 transition-colors">
                        I agree with User agreement and privacy. Also allow promotional emails regarding GzoneSphere.
                    </span>
                </label>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4">
                    <button type="submit" className="au-btn-white">
                        OTP
                    </button>
                </div>

            </form>
        </AuthLayout>
    );
}
