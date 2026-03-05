import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Login() {
    const navigate = useNavigate();
    const [keepSignedIn, setKeepSignedIn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/profile');
    };

    return (
        <AuthLayout
            title="WELCOME BACK TO GZONESPHERE"
            subtitle="Log in to manage your profile, skills, and verification."
            sideLink={{ prefix: "Don't have an account?", href: '/signup', label: 'Sign up' }}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                    <label className="au-label">Enter your email</label>
                    <input
                        type="email"
                        required
                        placeholder="gzonesphere@gmail.com"
                        className="au-input"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                    <label className="au-label">Enter password</label>
                    <input
                        type="password"
                        required
                        placeholder="password"
                        className="au-input"
                    />
                </div>

                {/* Forgot Password */}
                <p className="text-[12px] text-white/70">
                    Forgot password?{' '}
                    <span className="font-bold text-white cursor-pointer hover:underline underline-offset-2 transition-colors">
                        Reset Password
                    </span>
                </p>

                {/* Keep Signed In */}
                <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={keepSignedIn}
                        onChange={(e) => setKeepSignedIn(e.target.checked)}
                        className="w-4 h-4 rounded-sm border border-white/40 bg-white/10 cursor-pointer accent-white"
                    />
                    <span className="text-[12px] text-white/80 group-hover:text-white transition-colors">
                        Keep me signed in
                    </span>
                </label>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-3">
                    <button type="submit" className="au-btn-white">
                        LOGIN
                    </button>
                    <Link to="/" className="au-btn-outline no-underline">
                        CANCEL
                    </Link>
                </div>

            </form>
        </AuthLayout>
    );
}
