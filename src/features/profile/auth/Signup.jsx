import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '@/app/layouts/AuthLayout';
import { useAuth } from '@/app/providers/AuthProvider';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Signup() {
    usePageTheme('auth');

    const navigate = useNavigate();
    const { dummyLogin } = useAuth();

    const [username, setUsername]         = useState('');
    const [email, setEmail]               = useState('');
    const [password, setPassword]         = useState('');
    const [confirmPw, setConfirmPw]       = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm]   = useState(false);
    const [agreed, setAgreed]             = useState(false);
    const [loading, setLoading]           = useState(false);
    const [error, setError]               = useState('');

    const pwMismatch = confirmPw.length > 0 && confirmPw !== password;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pwMismatch || !agreed) return;
        setError('');
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));

        dummyLogin({
            id: `U-NEW-${Date.now()}`,
            username: username || email.split('@')[0],
            email,
            role: 'user',
            trust_level: 1.0,
            gts: 0,
            rank: 'Fledgling',
        });

        setLoading(false);
        navigate('/verify-email', { state: { email } });
    };

    return (
        <AuthLayout>
            <div className="space-y-1 mb-8">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Create your account</h1>
                <p className="text-sm text-gray-500">Join the GzoneSphere gaming network.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
                {error && (
                    <p className="text-red-500 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-lg">{error}</p>
                )}

                {/* Username */}
                <div>
                    <label className="auth-label">Choose a username</label>
                    <input
                        type="text"
                        required
                        maxLength={12}
                        value={username}
                        onChange={e => setUsername(e.target.value.replace(/\s/g, ''))}
                        placeholder="gamertag_xyz"
                        className="auth-input"
                        autoComplete="username"
                    />
                    <p className="text-xs text-gray-400 mt-1.5">
                        12 characters max. No spaces. This is your public handle.
                    </p>
                </div>

                {/* Email */}
                <div>
                    <label className="auth-label">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="auth-input"
                        autoComplete="email"
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
                            autoComplete="new-password"
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
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="auth-label">Confirm password</label>
                    <div className="relative">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            required
                            value={confirmPw}
                            onChange={e => setConfirmPw(e.target.value)}
                            placeholder="••••••••"
                            className={`auth-input pr-11 ${pwMismatch ? 'border-red-400' : ''}`}
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            tabIndex={-1}
                        >
                            {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                    </div>
                    {pwMismatch && (
                        <p className="text-red-500 text-sm mt-1">Passwords must match</p>
                    )}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        required
                        checked={agreed}
                        onChange={e => setAgreed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border border-gray-300 cursor-pointer accent-[#1E6F9F] shrink-0"
                    />
                    <span className="text-xs text-gray-600 leading-relaxed">
                        I agree to the{' '}
                        <Link to="/terms" className="text-[#1E6F9F] hover:underline underline-offset-2">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-[#1E6F9F] hover:underline underline-offset-2">Privacy Policy</Link>
                    </span>
                </label>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading || pwMismatch || !agreed}
                    className="auth-btn-primary mt-1"
                >
                    {loading ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating account...
                        </>
                    ) : 'Create Account →'}
                </button>

                {/* Switch to Login */}
                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#1E6F9F] font-semibold hover:underline underline-offset-2">
                        Log In →
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
