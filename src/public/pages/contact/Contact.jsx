import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { usePageTheme } from '../../context/ThemeContext';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [submitted, setSubmitted] = useState(false);
    usePageTheme('contact');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="theme-contact min-h-screen bg-[var(--theme-card)] font-inter text-[var(--theme-text)]">

            {/* ── Navbar ─────────────────────────────────────────── */}
            <Navbar />

            {/* ── HERO — dark teal + glow art ─────────────────────── */}
            <section
                className="relative min-h-[50vh] flex flex-col items-center justify-center text-center overflow-hidden py-20"
                style={{
                    backgroundImage: "linear-gradient(rgba(4,34,50,0.78),rgba(2,20,36,0.88)), url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="relative z-10 px-6 md:px-16 max-w-3xl">
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight mb-5 font-heading"
                    >
                        GET IN TOUCH WITH GZONESPHERE
                    </h1>
                    <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                        Have a question, partnership idea, or feedback? Our team is here to help you connect with the GzoneSphere universe.
                    </p>
                </div>
            </section>

            {/* ── CONTACT BODY ─────────────────────────────────────── */}
            <section className="section-padding md:py-20 bg-[var(--theme-bg)]">
                <div className="container-global">
                    <div className="grid md:grid-cols-2 gap-10 items-start">

                        {/* ── Left: Contact info + video ─────────────────── */}
                        <div className="space-y-6">
                            {/* Info card */}
                            <div className="bg-[var(--theme-card)] rounded-2xl border border-[var(--theme-border)] shadow-sm p-8">
                                <h2 className="text-xl font-black uppercase tracking-wide text-[var(--theme-text)] mb-5">Contact</h2>
                                <div className="space-y-3 text-sm text-[var(--theme-text-muted)]">
                                    <p><span className="font-semibold text-[var(--theme-text)]">E-mail:</span> gzonesphere@gmail.com</p>
                                    <p><span className="font-semibold text-[var(--theme-text)]">Instagram:</span> gzonesphere</p>
                                    <p><span className="font-semibold text-[var(--theme-text)]">Discord:</span> gzonesphere</p>
                                </div>
                            </div>

                            {/* Video embed placeholder */}
                            <div className="w-full aspect-video bg-black rounded-2xl border border-[var(--theme-border)] flex items-center justify-center cursor-pointer group">
                                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors">
                                    <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-white ml-1" />
                                </div>
                            </div>
                        </div>

                        {/* ── Right: Contact form ─────────────────────────── */}
                        <div className="bg-[var(--theme-card)] rounded-2xl border border-[var(--theme-border)] shadow-sm p-8">
                            {submitted ? (
                                <div className="py-10 text-center">
                                    <p className="text-[var(--theme-primary)] font-bold text-lg mb-2">Message sent!</p>
                                    <p className="text-[var(--theme-text-muted)] text-sm">We'll get back to you soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label htmlFor="ct-name" className="block text-sm font-medium text-[var(--theme-text)] mb-2">
                                            Enter your Name
                                        </label>
                                        <input
                                            id="ct-name"
                                            name="name"
                                            type="text"
                                            placeholder="Full name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-input)] text-[var(--theme-text)] text-sm placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-primary)] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="ct-email" className="block text-sm font-medium text-[var(--theme-text)] mb-2">
                                            Enter your E-mail
                                        </label>
                                        <input
                                            id="ct-email"
                                            name="email"
                                            type="email"
                                            placeholder="Email Address"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-input)] text-[var(--theme-text)] text-sm placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-primary)] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="ct-phone" className="block text-sm font-medium text-[var(--theme-text)] mb-2">
                                            Enter your Phone Number
                                        </label>
                                        <input
                                            id="ct-phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={form.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-input)] text-[var(--theme-text)] text-sm placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-primary)] transition-colors"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="gzs-btn-primary"
                                    >
                                        SUBMIT <FiArrowUpRight className="w-4 h-4" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Footer — sky-blue variant ──────────────────────── */}
            <Footer />
        </div>
    );
}
