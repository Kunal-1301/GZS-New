import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Route flow for demo purposes 
        navigate('/profile');
    };

    return (
        <AuthLayout
            title="WELCOME BACK TO GZONESPHERE"
            subtitle="Dive into esports events, blogs, and game info"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#a6d8e8]">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        placeholder="gaming@example.com"
                        className="bg-au-input-bg border border-au-input-border text-white text-sm rounded-[4px] px-3.5 py-2.5 focus:border-white focus:outline-none placeholder-white/40 transition-colors"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#a6d8e8]">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="bg-au-input-bg border border-au-input-border text-white text-sm rounded-[4px] px-3.5 py-2.5 focus:border-white focus:outline-none placeholder-white/40 transition-colors"
                    />
                </div>

                {/* Actions spacer */}
                <div className="h-6" />

                {/* Actions */}
                <div className="flex items-center justify-between mt-2">
                    <button
                        type="submit"
                        className="bg-white text-au-card px-8 py-2.5 text-xs font-black uppercase tracking-wider rounded-sm transition-opacity hover:opacity-90"
                    >
                        NEXT
                    </button>

                    <Link
                        to="/signup"
                        className="text-au-link text-xs font-bold uppercase tracking-wider hover:text-white transition-colors"
                    >
                        Register →
                    </Link>
                </div>

            </form>
        </AuthLayout>
    );
}
