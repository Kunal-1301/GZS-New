import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import { usePageTheme } from '../../context/ThemeContext';
import { useToast } from '../../components/Toast';
import { FiArrowUpRight } from 'react-icons/fi';

/* ── Tournament Config ───────────────────────────────────── */
const TOURNAMENT_CONFIG = {
    solo: {
        title: 'FIFA 26 SOLO KNOCKOUT CUP',
        prizePool: '15K INR',
        slots: '11 PLAYERS',
        startOn: '15 MARCH, 2026',
        entryFee: '399',
        subtitle: 'COMPLETE THE FORM BELOW TO SECURE YOUR SPOT IN THE TOURNAMENT.',
    },
    team: {
        title: 'VALORANT WINTER SHOWDOWN 2026',
        prizePool: '100K INR',
        slots: '50 TEAMS',
        startOn: '25 FEB, 2026',
        entryFee: '2000',
        subtitle: 'COMPLETE THE FORM BELOW TO SECURE YOUR SPOT IN THE TOURNAMENT.',
    },
};

/* ── Field Components ────────────────────────────────────── */
function FormInput({ label, placeholder, type = 'text', readOnly = false, value, onChange }) {
    return (
        <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--theme-text-muted)] mb-1.5">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                readOnly={readOnly}
                value={value}
                onChange={onChange}
                className={`w-full bg-[var(--theme-input)] border border-[var(--theme-border)] text-[var(--theme-text)] text-sm rounded-sm px-3.5 py-2.5 focus:outline-none focus:border-[var(--theme-primary)] transition-colors ${readOnly ? 'opacity-80 cursor-default' : ''}`}
            />
        </div>
    );
}

function FormSelect({ label, children }) {
    return (
        <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--theme-text-muted)] mb-1.5">
                {label}
            </label>
            <select className="w-full bg-[var(--theme-input)] border border-[var(--theme-border)] text-[var(--theme-text-muted)] text-sm rounded-sm px-3.5 py-2.5 focus:outline-none focus:border-[var(--theme-primary)] transition-colors appearance-none cursor-pointer">
                {children}
            </select>
        </div>
    );
}

function SectionTitle({ children }) {
    return (
        <h4 className="text-[13px] font-black uppercase tracking-widest text-[var(--theme-text)] mb-5 pb-2 border-b-2 border-[var(--theme-primary)] inline-block pr-4">
            {children}
        </h4>
    );
}

function ConsentCheckbox({ label }) {
    return (
        <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                <input
                    type="checkbox"
                    required
                    className="peer appearance-none w-4 h-4 border border-[var(--theme-text-muted)] rounded-sm bg-transparent checked:bg-[var(--theme-primary)] checked:border-[var(--theme-primary)] transition-colors cursor-pointer"
                />
                <svg className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] group-hover:text-[var(--theme-text)] transition-colors leading-relaxed">
                {label}
            </span>
        </label>
    );
}

/* ── Main Component ──────────────────────────────────────── */
export default function TournamentRegistration() {
    const { id } = useParams();
    const { showToast } = useToast();
    const isSolo = id === '6';
    usePageTheme('esports');

    const config = isSolo ? TOURNAMENT_CONFIG.solo : TOURNAMENT_CONFIG.team;

    const handleSubmit = (e) => {
        e.preventDefault();
        showToast('Registration Submitted Successfully!', 'success');
    };

    return (
        <div className="theme-esports min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-inter flex flex-col">
            <Navbar />

            {/* ── HERO ──────────────────────────────────────── */}
            <section className="relative pt-28 pb-16 flex flex-col items-center justify-center text-center overflow-hidden min-h-[340px]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "linear-gradient(rgba(5,35,10,0.82),rgba(8,40,15,0.92)), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920')",
                    }}
                    aria-hidden="true"
                />
                <div className="absolute top-0 left-0 w-full h-1 bg-[var(--theme-primary)]" aria-hidden="true" />

                <div className="relative z-10 px-6 w-full">
                    {/* Stats Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                        {[
                            { label: `PRIZE POOL: ${config.prizePool}` },
                            { label: `SLOTS: ${config.slots}` },
                            { label: `START ON: ${config.startOn}` },
                        ].map((badge) => (
                            <span
                                key={badge.label}
                                className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm bg-[var(--theme-primary)]/15 text-white border border-[var(--theme-primary)]/30 backdrop-blur-sm"
                            >
                                {badge.label}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-none mb-4 font-heading">
                        TOURNAMENT REGISTRATION
                    </h1>
                    <p className="text-[var(--theme-primary-light)] text-xs md:text-sm tracking-widest uppercase font-bold">
                        {config.subtitle}
                    </p>
                </div>
            </section>

            {/* ── FORM ──────────────────────────────────────── */}
            <section className="flex-1 py-12 md:py-16 bg-[var(--theme-bg)]">
                <div className="max-w-4xl mx-auto px-6 md:px-10">
                    <Breadcrumb items={[
                        { label: 'Home', to: '/' },
                        { label: 'Esports', to: '/esports' },
                        { label: 'Tournaments', to: '/esports/tournaments' },
                        { label: 'Register' },
                    ]} />

                    {/* Form Title */}
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-[var(--theme-text)] mb-10">
                        {config.title}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-10">

                        {isSolo ? (
                            /* ─── SOLO (FIFA 26) FORM ─── */
                            <>
                                {/* Player Information */}
                                <div className="space-y-4">
                                    <SectionTitle>Player Information</SectionTitle>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <FormInput label="Player Name" placeholder="Enter your name" />
                                        <FormInput label="Player Email" type="email" placeholder="Enter your email" />
                                        <FormInput label="Player Phone (Optional)" type="tel" placeholder="Enter your phone number" />
                                    </div>
                                </div>

                                {/* Game-Specific Details */}
                                <div className="space-y-4">
                                    <SectionTitle>Game-Specific Details</SectionTitle>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <FormInput label="Game ID (EA/Xbox/PS)" placeholder="Enter your game ID" />
                                        <FormSelect label="Platform">
                                            <option value="">Select your platform</option>
                                            <option>EA App (PC)</option>
                                            <option>PlayStation 5</option>
                                            <option>Xbox Series X/S</option>
                                        </FormSelect>
                                        <FormSelect label="Preferred Region">
                                            <option value="">Select your region</option>
                                            <option>South Asia</option>
                                            <option>Southeast Asia</option>
                                            <option>Europe</option>
                                            <option>North America</option>
                                        </FormSelect>
                                    </div>
                                </div>

                                {/* Skill & Verification */}
                                <div className="space-y-4">
                                    <SectionTitle>Skill &amp; Verification</SectionTitle>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <FormSelect label="In Game Rank">
                                            <option value="">Select your rank</option>
                                            <option>Bronze</option>
                                            <option>Silver</option>
                                            <option>Gold</option>
                                            <option>Elite</option>
                                            <option>Ultimate</option>
                                        </FormSelect>
                                    </div>
                                </div>

                                {/* Payment */}
                                <div className="space-y-4">
                                    <SectionTitle>Payment</SectionTitle>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <FormInput label="Entry Fee Amount" value="399" readOnly />
                                        <FormSelect label="Payment Method">
                                            <option value="">Select your payment method</option>
                                            <option>UPI</option>
                                            <option>Net Banking</option>
                                            <option>Debit/Credit Card</option>
                                        </FormSelect>
                                        <FormSelect label="Upload Screenshot">
                                            <option value="">Upload screenshot of payment</option>
                                        </FormSelect>
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* ─── TEAM (VALORANT) FORM ─── */
                            <>
                                {/* Team Information */}
                                <div className="space-y-4">
                                    <SectionTitle>Team Information</SectionTitle>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <FormInput label="Team Name" placeholder="Enter your official team name" />
                                        <FormInput label="Captain Name" placeholder="Enter your team captain name" />
                                        <FormInput label="Captain Email" type="email" placeholder="Enter your team captain email" />
                                    </div>
                                </div>

                                {/* Game-Specific Details — 5 player rows */}
                                <div className="space-y-4">
                                    <SectionTitle>Game-Specific Details</SectionTitle>
                                    <div className="space-y-3">
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <div key={n} className="grid grid-cols-2 gap-4">
                                                <FormInput
                                                    label="Riot ID"
                                                    placeholder="Enter your official Riot ID"
                                                />
                                                <FormSelect label="Rank">
                                                    <option value="">Select your rank</option>
                                                    <option>Iron</option>
                                                    <option>Bronze</option>
                                                    <option>Silver</option>
                                                    <option>Gold</option>
                                                    <option>Platinum</option>
                                                    <option>Diamond</option>
                                                    <option>Ascendant</option>
                                                    <option>Immortal</option>
                                                    <option>Radiant</option>
                                                </FormSelect>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment */}
                                <div className="space-y-4">
                                    <SectionTitle>Payment</SectionTitle>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <FormInput label="Entry Fee Amount" value="2000" readOnly />
                                        <FormSelect label="Payment Method">
                                            <option value="">Select your payment method</option>
                                            <option>UPI</option>
                                            <option>Net Banking</option>
                                            <option>Debit/Credit Card</option>
                                        </FormSelect>
                                        <FormSelect label="Upload Screenshot">
                                            <option value="">Upload screenshot of payment</option>
                                        </FormSelect>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── Rules & Consent ──────────────────────────── */}
                        <div className="space-y-4 pt-2">
                            <SectionTitle>Rules &amp; Consent Section</SectionTitle>

                            <div className="space-y-3">
                                <ConsentCheckbox label="I confirm that all provided information is accurate." />
                                <ConsentCheckbox label="I agree to follow tournament rules and fair-play guidelines." />
                                <ConsentCheckbox label="I understand that admin decisions are final." />
                            </div>

                            {/* Team-only: inline rules */}
                            {!isSolo && (
                                <ol className="mt-4 space-y-1 list-none pl-0">
                                    {[
                                        'Registrations may require admin approval',
                                        'Duplicate or incorrect entries may be rejected.',
                                        'Registration does not guarantee participation until approved.',
                                        'Approved teams will appear on the tournament page',
                                    ].map((rule, i) => (
                                        <li key={i} className="text-[11px] italic text-[var(--theme-text-muted)] tracking-wide">
                                            {i + 1}. {rule}
                                        </li>
                                    ))}
                                </ol>
                            )}

                            <button
                                type="button"
                                className="text-[11px] font-bold uppercase tracking-widest text-[var(--theme-primary)] hover:underline underline-offset-4 mt-1"
                            >
                                View Full Tournament Rules
                            </button>
                        </div>

                        {/* ── Action Buttons ─────────────────────────── */}
                        <div className="flex items-center gap-4 pt-2 pb-4">
                            <Link
                                to={`/esports/tournament/${id || '1'}`}
                                className="gzs-btn-outline no-underline"
                            >
                                Cancel
                            </Link>
                            <button type="submit" className="gzs-btn-secondary shadow-md">
                                SUBMIT REGISTRATION <FiArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>

                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
}
