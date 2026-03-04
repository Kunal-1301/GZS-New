import { useState } from 'react';
import { FiHash, FiPlay, FiSettings, FiCheck } from 'react-icons/fi';

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

    return (
        <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[var(--theme-border)] bg-[var(--theme-bg-alt)] flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <FiSettings className="text-[var(--theme-primary)]" /> Bracket Configuration
                </h3>
            </div>

            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="admin-field">
                        <label className="admin-label">Bracket / Tournament Name</label>
                        <input
                            className="admin-input"
                            placeholder="e.g. Valorant Pro Series Quarters"
                            value={bracketName}
                            onChange={e => setBracketName(e.target.value)}
                        />
                    </div>
                    <div className="admin-field">
                        <label className="admin-label">Number of Teams</label>
                        <select
                            className="admin-select"
                            value={teamSize}
                            onChange={e => setTeamSize(parseInt(e.target.value))}
                        >
                            <option value={4}>4 Teams (Semis)</option>
                            <option value={8}>8 Teams (Quarters)</option>
                            <option value={16}>16 Teams (Round of 16)</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="admin-label flex items-center gap-2">
                        <FiHash size={12} /> Team Seedings (Round 1)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {teams.slice(0, teamSize).map((team, idx) => (
                            <div key={idx} className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">
                                    {idx + 1}
                                </span>
                                <input
                                    className="admin-input !pl-8 !py-2 !text-[11px]"
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

                <div className="pt-4">
                    <button
                        onClick={handleGenerate}
                        className="w-full py-3 bg-[var(--theme-primary)] text-[var(--theme-text-inverse)] text-xs font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                        <FiPlay size={12} /> GENERATE BRACKET STRUCTURE
                    </button>
                </div>
            </div>
        </div>
    );
}
