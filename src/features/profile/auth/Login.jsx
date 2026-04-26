import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '@/app/layouts/AuthLayout';
import { useAuth } from '@/app/providers/AuthProvider';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const DUMMY_MODE = true; // matches AuthProvider.jsx

export default function Login() {
    usePageTheme('auth');

    const navigate  = useNavigate();
    const location  = useLocation();
    const { dummyLogin } = useAuth();

    const [email, setEmail]               = useState('');
    const [password, setPassword]         = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading]           = useState(false);
    const [error, setError]               = useState('');

    const from = location.state?.from?.pathname || '/profile';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        setLoading(true);
        await new Promise(r => setTimeout(r, 800));

        if (DUMMY_MODE) {
            const username = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '') || 'Player';
            let persona = 'player';
            if (email.includes('dev'))   persona = 'dev';
            if (email.includes('admin')) persona = 'admin';
            dummyLogin({ persona, username, email, id: `U-${Date.now()}` });
            setLoading(false);
            navigate(from, { replace: true });
        } else {
            try {
                // Production path:
                // const { token } = await authService.login({ email, password });
                // login(token);
                // navigate(from, { replace: true });
            } catch (err) {
                setError(err?.response?.data?.error?.message || 'Login failed. Please try again.');
                setLoading(false);
            }
        }
    };

    const handleDevLogin = async () => {
        setLoading(true);
        await new Promise(r => setTimeout(r, 400));
        dummyLogin({ persona: 'admin' });
        setLoading(false);
        navigate(from, { replace: true });
    };

    return (
        <AuthLayout>
            <div className="space-y-1 mb-8">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Welcome back</h1>
                <p className="text-sm text-gray-500">Sign in to your GzoneSphere account.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
                {error && (
                    <p className="text-red-500 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-lg">{error}</p>
                )}

                {/* Email or Username */}
                <div>
                    <label className="auth-label">Email or Username</label>
                    <input
                        type="text"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="auth-input"
                        autoComplete="username"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="auth-label">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="auth-input pr-11"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                    </div>
                    <div className="flex justify-end mt-1.5">
                        <Link to="/forgot-password" className="text-xs text-[#1E6F9F] hover:underline underline-offset-2">
                            Forgot password?
                        </Link>
                    </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading} className="auth-btn-primary mt-1">
                    {loading ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Signing in...
                        </>
                    ) : 'Log In →'}
                </button>

                {/* Switch to Signup */}
                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-[#1E6F9F] font-semibold hover:underline underline-offset-2">
                        Sign Up →
                    </Link>
                </p>
            </form>

            {/* Dev login shortcut — subtle, dev-only */}
            {DUMMY_MODE && (
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <button
                        type="button"
                        onClick={handleDevLogin}
                        disabled={loading}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40"
                    >
                        Dev login (Admin)
                    </button>
                </div>
            )}
        </AuthLayout>
    );
}
