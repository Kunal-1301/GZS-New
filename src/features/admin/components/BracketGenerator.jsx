import { useState } from 'react';
import { FiSettings, FiHash, FiPlay, FiCpu, FiLayers } from 'react-icons/fi';
import { motion } from 'framer-motion';

/**
 * A simple Single Elimination Bracket Generator for the Admin Panel.
 * Supports 4, 8, or 16 teams.
 */
export default function BracketGenerator({ onGenerate }) {
    const [teamSize, setTeamSize] = useState(8);
    const [bracketName, setBracketName] = useState("");
    const [teams, setTeams] = useState(Array(16).fill("").map((_, i) => `Team ${i + 1}`));

    const handleGenerate = () => {
        if (!bracketName) {
            alert("Please enter a bracket name.");
            return;
        }

        const activeTeams = teams.slice(0, teamSize);
        // Basic match pairing logic for Round 1
        const matches = [];
        for (let i = 0; i < activeTeams.length; i += 2) {
            matches.push({
                id: `M1-${Math.floor(i / 2) + 1}`,
                team1: activeTeams[i],
                team2: activeTeams[i + 1] || "BYE",
                score1: 0,
                score2: 0,
                winner: null
            });
        }

        onGenerate({
            name: bracketName,
            type: 'Single Elimination',
            size: `${teamSize} Teams`,
            status: 'Active',
            round1: matches
        });
    };

    const inputClass = "w-full bg-[var(--theme-bg-alt)]/50 border-2 border-[var(--theme-border)] rounded-2xl px-6 py-4 text-sm font-black italic text-[var(--theme-text)] outline-none focus:border-[var(--theme-primary)] focus:ring-4 focus:ring-[var(--theme-primary)]/10 transition-all placeholder:text-[var(--theme-text-muted)] placeholder:opacity-20 uppercase tracking-widest";
    const labelClass = "block text-xs  uppercase tracking-widest text-[var(--theme-text-muted)] mb-2.5 italic opacity-40 leading-none";

    return (
        <div className="bg-[var(--theme-card)]/80 backdrop-blur-3xl border-2 border-[var(--theme-border)] rounded-3xl overflow-hidden shadow-2xl group/config">
            <div className="px-10 py-8 border-b-2 border-dashed border-[var(--theme-border)] bg-[var(--theme-bg-alt)]/30 flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-4 text-[var(--theme-text)] italic leading-none">
                    <FiSettings className="text-[var(--theme-primary)] animate-spin-slow" /> BRACKET_CONFIGURATION_v4
                </h3>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--theme-primary)] animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-[var(--theme-border)]" />
                </div>
            </div>

            <div className="p-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className={labelClass}>ARENA_SIGNATURE_NAME</label>
                        <input
                            className={inputClass}
                            placeholder="E.G. VALORANT_PRO_QUARTERS..."
                            value={bracketName}
                            onChange={e => setBracketName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-4">
                        <label className={labelClass}>TOTAL_NODE_COUNT</label>
                        <select
                            className={inputClass}
                            value={teamSize}
                            onChange={e => setTeamSize(parseInt(e.target.value))}
                        >
                            <option value={4} className="bg-[var(--theme-card)]">04_TEAMS_SEMIS</option>
                            <option value={8} className="bg-[var(--theme-card)]">08_TEAMS_QUARTERS</option>
                            <option value={16} className="bg-[var(--theme-card)]">16_TEAMS_ROUND_16</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-6">
                    <label className={labelClass + " flex items-center gap-4"}>
                        <FiHash size={14} className="text-[var(--theme-primary)]" /> TEAM_SEEDING_PROTOCOLS (ROUND_1)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {teams.slice(0, teamSize).map((team, idx) => (
                            <div key={idx} className="relative group/seed">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xs font-black text-[var(--theme-primary)] italic opacity-30 group-focus-within/seed:opacity-100 transition-opacity">
                                    #{String(idx + 1).padStart(2, '0')}
                                </span>
                                <input
                                    className={inputClass + " !pl-12 !py-3 !text-xs"}
                                    value={team}
                                    onChange={e => {
                                        const newTeams = [...teams];
                                        newTeams[idx] = e.target.value;
                                        setTeams(newTeams);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--theme-primary)]/5 to-transparent blur-xl pointer-events-none" />
                    <button
                        onClick={handleGenerate}
                        className="w-full py-6 bg-[var(--theme-text)] text-[var(--theme-bg)] text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-[var(--theme-primary)] hover:text-white hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-6 italic shadow-6xl border-4 border-white/5 relative z-10 group/btn"
                    >
                        <FiPlay size={18} strokeWidth={3} className="group-hover/btn:translate-x-2 transition-transform" /> GENERATE_BRACKET_STRUCTURE
                    </button>
                    
                    <div className="mt-8 grid grid-cols-3 gap-4 opacity-20 group-hover/config:opacity-40 transition-opacity">
                         <div className="h-1 bg-[var(--theme-border)] rounded-full" />
                         <div className="h-1 bg-[var(--theme-primary)] rounded-full" />
                         <div className="h-1 bg-[var(--theme-border)] rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}








