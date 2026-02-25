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

                {/* Actions spacer */}
                <div className="h-6" />

                {/* Actions */}
                <div className="flex items-center justify-between mt-2">
                    <button
                        type="submit"
                        className="au-btn-primary"
                    >
                        NEXT
                    </button>

                    <Link
                        to="/signup"
                        className="au-link"
                    >
                        Register →
                    </Link>
                </div>

            </form>
        </AuthLayout>
    );
}
