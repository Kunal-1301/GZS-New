import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function VerifyEmail() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        // Focus next input
        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp.join('').length === 6) {
            navigate('/profile-setup');
        }
    };

    return (
        <AuthLayout
            title="VERIFY YOUR EMAIL"
            subtitle="We have sent a 6-digit verification code to your email address. Check your inbox."
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* OTP Inputs */}
                <div className="flex gap-2 justify-between">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            name="otp"
                            maxLength="1"
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onFocus={e => e.target.select()}
                            className="w-10 h-12 md:w-12 md:h-14 bg-[var(--theme-input)] border border-[var(--theme-border)] text-[var(--theme-text)] text-center text-lg md:text-xl rounded-[4px] focus:border-white focus:outline-none transition-colors"
                        />
                    ))}
                </div>

                {/* Resend & Timer */}
                <div className="flex items-center gap-4 text-xs">
                    <button type="button" className="text-[var(--theme-primary)] font-bold uppercase tracking-wider hover:text-[var(--theme-text)] transition-colors cursor-pointer bg-transparent border-none">
                        Resend Code
                    </button>
                    <span className="text-[var(--theme-text-muted)]">02:00</span>
                </div>

                {/* Actions spacer */}
                <div className="h-2" />

                {/* Action Button */}
                <div>
                    <button
                        type="submit"
                        className="gzs-btn-primary"
                    >
                        VERIFY
                    </button>
                </div>

            </form>
        </AuthLayout>
    );
}
