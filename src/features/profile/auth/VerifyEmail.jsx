import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '@/app/layouts/AuthLayout';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { FiMail } from 'react-icons/fi';

export default function VerifyEmail() {
    usePageTheme('auth');

    const navigate  = useNavigate();
    const location  = useLocation();
    const email     = location.state?.email || '';

    const [resending, setResending] = useState(false);
    const [resent, setResent]       = useState(false);

    // Mock: auto-redirect to profile setup after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => navigate('/profile/master-setup'), 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    const handleResend = async () => {
        setResending(true);
        await new Promise(r => setTimeout(r, 1500));
        setResending(false);
        setResent(true);
    };

    return (
        <AuthLayout>
            <div className="text-center space-y-6">

                {/* Mail icon */}
                <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#1E6F9F]/10 border-2 border-[#1E6F9F]/20 flex items-center justify-center">
                        <FiMail size={28} className="text-[#1E6F9F]" />
                    </div>
                </div>

                {/* Heading + body */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Verify your email</h2>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        We sent a verification link to{' '}
                        {email
                            ? <span className="font-semibold text-gray-700">{email}</span>
                            : 'your email address'
                        }
                        . Check your inbox and click the link to continue.
                    </p>
                </div>

                {/* Redirect notice */}
                <p className="text-xs text-gray-400 italic">
                    Redirecting you automatically in a moment…
                </p>

                {/* Resend */}
                <div className="pt-1">
                    {resent ? (
                        <p className="text-sm text-green-600 font-semibold">Email resent successfully!</p>
                    ) : (
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resending}
                            className="text-sm text-[#1E6F9F] hover:underline underline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 mx-auto transition-opacity"
                        >
                            {resending && (
                                <span className="w-3.5 h-3.5 border-2 border-[#1E6F9F] border-t-transparent rounded-full animate-spin" />
                            )}
                            {resending ? 'Sending…' : 'Resend email'}
                        </button>
                    )}
                </div>

                {/* Back to login */}
                <div className="pt-4 border-t border-gray-100">
                    <Link to="/login" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                        ← Back to login
                    </Link>
                </div>

            </div>
        </AuthLayout>
    );
}
