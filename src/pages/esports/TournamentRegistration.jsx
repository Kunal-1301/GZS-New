import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function TournamentRegistration() {
    const { id } = useParams();
    // Simple toggle to show different form based on ID (e.g., FIFA=6)
    const isSolo = id === '6';

    const [teamName, setTeamName] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Registration Submitted!');
    };

    return (
        <div className="min-h-screen bg-es-bg text-es-text font-inter flex flex-col">
            <Navbar logoVariant="esports" loginVariant="esports" accent="esports" />

            {/* ── HERO ──────────────────────────────────────────── */}
            <section className="relative pt-32 pb-16 flex flex-col items-center justify-center text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "linear-gradient(rgba(5,40,15,0.8),rgba(10,45,20,0.9)), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920')",
                    }}
                    aria-hidden="true"
                />
                <div className="absolute top-0 left-0 w-full h-1 bg-es-primary" aria-hidden="true" />

                <div className="relative z-10 px-6 md:px-16 w-full max-w-4xl mx-auto">
                    <h1
                        className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-none mb-4"
                        style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
                    >
                        TOURNAMENT REGISTRATION
                    </h1>
                    <p className="text-es-primary-light text-sm md:text-base tracking-widest uppercase mb-4 font-bold">
                        {isSolo ? 'SECURE YOUR SPOT. CLAIM YOUR VICTORY.' : 'SECURE YOUR SPOT. ASSEMBLE YOUR TEAM.'}
                    </p>
                </div>
            </section>

            {/* ── FORM ──────────────────────────────────────────── */}
            <section className="flex-1 py-12 md:py-20 bg-es-bg">
                <div className="max-w-4xl mx-auto px-6 md:px-12">

                    <div className="bg-es-card rounded-xl border border-es-border shadow-md overflow-hidden">
                        {/* Header info */}
                        <div className="bg-es-bg-section px-8 py-6 border-b border-es-border flex justify-between items-center flex-wrap gap-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-es-primary block mb-1">SELECTED TOURNAMENT</span>
                                <h3 className="text-xl font-black uppercase tracking-wider text-es-text">
                                    {isSolo ? 'FIFA 26 SOLO KNOCKOUT CUP' : 'VALORANT WINTER SHOWDOWN II 2026'}
                                </h3>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-es-text-muted block mb-1">ENTRY FEE</span>
                                <span className="text-sm font-bold text-green-600 block">FREE</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-10">

                            {!isSolo && (
                                <div className="space-y-6">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-es-text border-b border-es-border pb-2">TEAM INFORMATION</h4>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-es-text-muted mb-2">Team Name *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Sentinels"
                                                className="bg-es-bg-section border border-es-border text-es-text text-sm rounded-md px-4 py-3 w-full focus:outline-none focus:border-es-primary"
                                                value={teamName}
                                                onChange={(e) => setTeamName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-es-text-muted mb-2">Team Logo URL (Optional)</label>
                                            <input
                                                type="url"
                                                placeholder="https://..."
                                                className="bg-es-bg-section border border-es-border text-es-text text-sm rounded-md px-4 py-3 w-full focus:outline-none focus:border-es-primary"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Roster Section */}
                            <div className="space-y-6">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-es-text border-b border-es-border pb-2">
                                    {isSolo ? 'PLAYER INFORMATION' : 'MAIN ROSTER'}
                                </h4>

                                {isSolo ? (
                                    <div className="bg-es-bg-section p-6 rounded-lg border border-es-border space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase text-es-text-muted mb-1">Full Name</label>
                                                <input type="text" required placeholder="John Doe" className="bg-white border border-es-border text-es-text text-sm rounded px-3 py-2 w-full focus:outline-none focus:border-es-primary" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase text-es-text-muted mb-1">PSN ID / Xbox Gamertag</label>
                                                <input type="text" required placeholder="johndoe_99" className="bg-white border border-es-border text-es-text text-sm rounded px-3 py-2 w-full focus:outline-none focus:border-es-primary" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-bold uppercase text-es-text-muted mb-1">Discord ID (For Match Comm)</label>
                                                <input type="text" required placeholder="johndoe#1234" className="bg-white border border-es-border text-es-text text-sm rounded px-3 py-2 w-full focus:outline-none focus:border-es-primary" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4, 5].map((playerNum) => (
                                            <div key={playerNum} className="bg-es-bg-section p-5 rounded-lg border border-es-border grid md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-[10px] font-bold uppercase text-es-text-muted mb-1">
                                                        {playerNum === 1 ? 'Player 1 (Captain) IGN' : `Player ${playerNum} IGN`} *
                                                    </label>
                                                    <input type="text" required placeholder={`IGN`} className="bg-white border border-es-border text-es-text text-sm rounded px-3 py-2 w-full focus:outline-none focus:border-es-primary" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold uppercase text-es-text-muted mb-1">Riot ID (Name#TAG) *</label>
                                                    <input type="text" required placeholder={`Name#TAG`} className="bg-white border border-es-border text-es-text text-sm rounded px-3 py-2 w-full focus:outline-none focus:border-es-primary" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold uppercase text-es-text-muted mb-1">Discord ID</label>
                                                    <input type="text" required={playerNum === 1} placeholder={playerNum === 1 ? "Required for Capt" : "Optional"} className="bg-white border border-es-border text-es-text text-sm rounded px-3 py-2 w-full focus:outline-none focus:border-es-primary" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* T&C */}
                            <div className="pt-4 border-t border-es-border">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center mt-0.5">
                                        <input
                                            type="checkbox"
                                            className="peer appearance-none w-5 h-5 border-2 border-es-border rounded-sm bg-white checked:bg-es-primary checked:border-es-primary transition-colors cursor-pointer"
                                            checked={agreeTerms}
                                            onChange={(e) => setAgreeTerms(e.target.checked)}
                                            required
                                        />
                                        <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-xs text-es-text-muted leading-relaxed group-hover:text-es-text transition-colors">
                                        I confirm that all provided information is accurate. I have read and agree to the
                                        <a href="#" className="font-bold text-es-primary ml-1 hover:underline">Tournament Rules & Regulations</a>,
                                        <a href="#" className="font-bold text-es-primary ml-1 hover:underline">Terms of Service</a>, and
                                        <a href="#" className="font-bold text-es-primary ml-1 hover:underline">Privacy Policy</a>.
                                    </span>
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-4 pt-4">
                                <Link
                                    to={`/esports/tournament/${id || '1'}`}
                                    className="px-6 py-3 border border-es-border text-es-text text-sm font-bold uppercase tracking-wider rounded-md hover:bg-es-bg-section transition-colors"
                                >
                                    CANCEL
                                </Link>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-es-primary hover:bg-es-primary-dark text-white text-sm font-black uppercase tracking-wider rounded-md transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    SUBMIT REGISTRATION
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>

            <Footer variant="light" accent="esports" />
        </div>
    );
}
