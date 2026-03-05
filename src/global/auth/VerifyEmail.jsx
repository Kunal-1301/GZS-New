import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function VerifyEmail() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);

    const handleChange = (value, index) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        // Auto-focus next
        if (value && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
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

                {/* OTP Boxes */}
                <div className="flex gap-2.5 justify-between">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputs.current[index] = el)}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onFocus={(e) => e.target.select()}
                            className="w-11 h-13 md:w-12 md:h-14 bg-white/15 border-2 border-white/30 text-white text-center text-xl font-bold rounded-md focus:border-white focus:bg-white/25 focus:outline-none transition-all"
                            style={{ height: '3.25rem' }}
                        />
                    ))}
                </div>

                {/* Resend & Timer */}
                <div className="flex items-center gap-4 text-[11px]">
                    <button
                        type="button"
                        className="text-white/80 font-bold uppercase tracking-wider hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                    >
                        Resend Code
                    </button>
                    <span className="text-white/50 font-mono">02:00</span>
                </div>

                {/* Submit */}
                <div>
                    <button type="submit" className="au-btn-verify">
                        VERIFY
                    </button>
                </div>

            </form>
        </AuthLayout>
    );
}
