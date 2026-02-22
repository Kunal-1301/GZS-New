import { useState } from 'react';

// Reusable Input Component
const PrInput = ({ label, placeholder, type = 'text' }) => (
    <div className="flex flex-col gap-1.5 mb-4">
        <label className="text-[10px] font-bold uppercase tracking-widest text-pr-text-muted">
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className="bg-white border border-pr-border text-sm text-pr-text rounded-[4px] px-3.5 py-2.5 focus:border-pr-primary focus:outline-none focus:ring-1 focus:ring-pr-primary transition-colors"
        />
    </div>
);

// Reusable Modal Component
const PrModal = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-pr-card border border-pr-border w-full max-w-lg rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-pr-border">
                    <h2 className="text-[13px] font-black uppercase tracking-widest text-[#a6d8e8]">
                        {title}
                    </h2>
                    <button onClick={onClose} className="text-pr-text-muted hover:text-pr-primary transition-colors">
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};


export default function ProfileEsports() {
    const [subTab, setSubTab] = useState('TEAMS & EVENTS');

    // Modals state
    const [showEventModal, setShowEventModal] = useState(false);
    const [showTeamModal, setShowTeamModal] = useState(false);

    return (
        <div className="flex flex-col gap-6">

            {/* Sub Tabs */}
            <div className="flex gap-4">
                {['TEAMS & EVENTS', 'PENDING APPROVALS'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSubTab(tab)}
                        className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors
              ${subTab === tab
                                ? 'bg-pr-surface text-pr-primary'
                                : 'bg-transparent text-pr-text-muted hover:bg-white hover:text-pr-text border border-transparent hover:border-pr-border'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {subTab === 'TEAMS & EVENTS' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                    {/* Action Card: Register Event */}
                    <div className="bg-pr-card border border-pr-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-pr-text mb-2">
                                Register For BGMI Event
                            </h3>
                            <p className="text-sm text-pr-text-muted leading-relaxed mb-6">
                                Join our upcoming weekly clash. Form your squad or register solo and prove your skills in the arena. Limited slots available.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowEventModal(true)}
                            className="bg-pr-surface text-pr-primary hover:bg-pr-primary hover:text-white border border-pr-border-focus text-[11px] font-bold uppercase tracking-widest py-2.5 rounded-md transition-colors self-start px-6"
                        >
                            REGISTER
                        </button>
                    </div>

                    {/* Action Card: Create Team */}
                    <div className="bg-pr-card border border-pr-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-pr-text mb-2">
                                Create A New Team
                            </h3>
                            <p className="text-sm text-pr-text-muted leading-relaxed mb-6">
                                Build your professional roster. Manage your players, track your tournament standings, and easily enroll in team-based events.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowTeamModal(true)}
                            className="bg-pr-surface text-pr-primary hover:bg-pr-primary hover:text-white border border-pr-border-focus text-[11px] font-bold uppercase tracking-widest py-2.5 rounded-md transition-colors self-start px-6"
                        >
                            CREATE TEAM
                        </button>
                    </div>

                    {/* Existing Team Example Card */}
                    <div className="md:col-span-2 bg-pr-card border border-pr-border rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[13px] font-black uppercase tracking-widest text-[#a6d8e8]">
                                TEAM GZONESPHERE
                            </h3>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] uppercase font-bold tracking-widest rounded-full">
                                Active
                            </span>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                            {[1, 2, 3, 4, 5].map((player) => (
                                <div key={player} className="bg-pr-surface rounded-lg p-4 text-center border border-pr-border">
                                    <div className="w-10 h-10 bg-pr-primary/20 text-pr-primary rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-black">
                                        P{player}
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-pr-text mb-1">Player {player}</p>
                                    <p className="text-[9px] uppercase tracking-wider text-pr-text-muted">Assault / Support</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            )}

            {subTab === 'PENDING APPROVALS' && (
                <div className="bg-pr-card border border-pr-border rounded-xl p-8 text-center text-pr-text-muted text-sm">
                    You have no pending tournament registration approvals.
                </div>
            )}

            {/* MODALS */}
            <PrModal title="REGISTER FOR BGMI EVENT" isOpen={showEventModal} onClose={() => setShowEventModal(false)}>
                <form className="flex flex-col">
                    <PrInput label="In-Game ID" placeholder="Ex. 543290123" />
                    <PrInput label="In-Game Name (IGN)" placeholder="Ex. GzoneSlayer" />
                    <PrInput label="Role Preference" placeholder="Assault / Sniper" />
                    <PrInput label="Contact Number" placeholder="+91 XXXXX XXXXX" />

                    <label className="flex items-start gap-3 my-4 cursor-pointer group">
                        <input type="checkbox" required className="mt-1 w-4 h-4 rounded-sm border-pr-border text-pr-primary focus:ring-pr-primary" />
                        <span className="text-xs text-pr-text-muted leading-relaxed group-hover:text-pr-text transition-colors">
                            I accept the tournament rules, code of conduct, and prize distribution guidelines.
                        </span>
                    </label>

                    <button type="submit" className="mt-2 w-full bg-pr-btn hover:bg-pr-btn-hover text-white text-xs font-bold uppercase tracking-widest py-3 rounded-md transition-colors">
                        SUBMIT REGISTRATION
                    </button>
                </form>
            </PrModal>

            <PrModal title="CREATE A NEW TEAM" isOpen={showTeamModal} onClose={() => setShowTeamModal(false)}>
                <form className="flex flex-col">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#a6d8e8] mb-4">Team Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <PrInput label="Team Name" placeholder="Ex. Team Liquid" />
                        <PrInput label="Team Tag" placeholder="Ex. TL" />
                    </div>

                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#a6d8e8] mb-4 mt-2">Captain Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <PrInput label="Captain Name" placeholder="Player One" />
                        <PrInput label="Email Address" placeholder="hello@example.com" type="email" />
                    </div>

                    <PrInput label="Captain In-Game ID" placeholder="Ex. 543290123" />

                    <button type="submit" className="mt-6 w-full bg-pr-btn hover:bg-pr-btn-hover text-white text-xs font-bold uppercase tracking-widest py-3 rounded-md transition-colors">
                        CREATE TEAM
                    </button>
                </form>
            </PrModal>

        </div>
    );
}
