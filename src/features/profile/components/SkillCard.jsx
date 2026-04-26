import React from 'react';
import { FiCheckCircle, FiLock, FiClock, FiFileText, FiActivity, FiZap, FiPlusCircle } from 'react-icons/fi';

const LEVEL_COLORS = {
    Expert: 'bg-[var(--theme-text)] text-[var(--theme-bg)]',
    Advanced: 'bg-[var(--theme-primary)] text-white shadow-xl shadow-[var(--theme-primary)]/20',
    Competent: 'bg-[var(--theme-bg-alt)] text-[var(--theme-text)] border-2 border-[var(--theme-border)] shadow-inner',
    Basic: 'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] border-2 border-[var(--theme-border)] opacity-60',
    Learning: 'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] border-2 border-[var(--theme-border)] opacity-40',
};

const STATUS_CONFIG = {
    verified: { label: 'Verified', icon: FiCheckCircle, classes: 'bg-[var(--status-success)]/10 text-[var(--status-success)] border border-[var(--status-success)]/20 shadow-[0_0_10px_rgba(var(--status-success-rgb),0.1)]' },
    proof_submitted: { label: 'In_Review', icon: FiClock, classes: 'bg-[var(--status-warning)]/10 text-[var(--status-warning)] border border-[var(--status-warning)]/20 shadow-[0_0_10px_rgba(var(--status-warning-rgb),0.1)]' },
    under_review: { label: 'In_Review', icon: FiClock, classes: 'bg-[var(--status-warning)]/10 text-[var(--status-warning)] border border-[var(--status-warning)]/20 shadow-[0_0_10px_rgba(var(--status-warning-rgb),0.1)]' },
    unverified: { label: 'Self_Declared', icon: FiLock, classes: 'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] border border-[var(--theme-border)] italic opacity-50' },
    rejected: { label: 'Terminated', icon: FiLock, classes: 'bg-[var(--status-error)]/10 text-[var(--status-error)] border border-[var(--status-error)]/20 shadowed-[0_0_10px_rgba(var(--status-error-rgb),0.1)]' },
};

export default function SkillCard({ skill, onAddProof }) {
    const levelKey = skill.skillLevel || skill.skill_level || 'Basic';
    const levelNum = skill.skill_level_num || 3;
    const statusKey = skill.verification_status || (skill.verified ? 'verified' : 'unverified');
    const status = STATUS_CONFIG[statusKey] || STATUS_CONFIG.unverified;
    const StatusIcon = status.icon;
    const proofCount = skill.proof_urls?.length || skill.proofCount || 0;

    return (
        <div className="text-left p-10 lg:p-12 rounded-full border-2 transition-all group hover:shadow-2xl bg-[var(--theme-card)] border-[var(--theme-border)] hover:border-[var(--theme-primary)]/40 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between mb-10 relative z-10">
                <div className={`flex items-center gap-3 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wide italic leading-none transition-all group-hover:scale-105 ${status.classes}`}>
                    <StatusIcon size={12} strokeWidth={4} className={statusKey === 'verified' ? 'animate-pulse' : ''} />
                    {status.label}
                </div>
                {proofCount > 0 && (
                    <div className="flex items-center gap-3 text-xs text-[var(--theme-text-muted)] font-black uppercase tracking-wider italic opacity-40 group-hover:opacity-100 transition-opacity">
                        <FiFileText size={14} strokeWidth={2.5} />
                        <span>{proofCount}_SHARDS</span>
                    </div>
                )}
            </div>

            {/* Category & Name */}
            <div className="space-y-3 relative z-10">
                <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-primary)] italic leading-none group-hover:translate-x-1 transition-transform">{skill.category || 'PROTOCOL_ALPHA'}</p>
                <h3 className="text-2xl lg:text-3xl font-black text-[var(--theme-text)] leading-[0.9] italic group-hover:text-[var(--theme-primary)] transition-colors uppercase tracking-tighter">
                    {skill.name}
                </h3>
            </div>

            {/* Level Context */}
            <div className="mt-10 flex items-center justify-between relative z-10">
                <span className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider italic transition-all group-hover:rotate-[-2deg] ${LEVEL_COLORS[levelKey] || LEVEL_COLORS.Basic}`}>
                    {levelKey}
                </span>
                {onAddProof && statusKey === 'unverified' && (
                    <button
                        onClick={() => onAddProof(skill)}
                        className="flex items-center gap-3 text-xs font-black text-[var(--theme-primary)] hover:text-[var(--theme-text)] uppercase tracking-wider italic transition-all group/btn"
                    >
                        ENCODE_PROOF <FiPlusCircle size={14} className="group-hover/btn:rotate-90 transition-transform" strokeWidth={3} />
                    </button>
                )}
            </div>

            {/* Performance Metric Bar */}
            <div className="mt-10 space-y-3 relative z-10">
                <div className="flex justify-between items-end">
                    <p className="text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] opacity-30 italic">SYNC_STRENGTH</p>
                    <p className="text-xs font-black text-[var(--theme-text)] italic leading-none">{Math.round((levelNum / 5) * 100)}%</p>
                </div>
                <div className="h-3 bg-[var(--theme-bg-alt)] rounded-full overflow-hidden border border-[var(--theme-border)] shadow-inner">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(100, (levelNum / 5) * 100)}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-[var(--theme-primary)] rounded-full relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </motion.div>
                </div>
            </div>
            
            <FiActivity size={150} className="absolute bottom-[-40px] right-[-40px] opacity-[0.02] text-[var(--theme-text)] group-hover:rotate-12 transition-transform duration-1000 pointer-events-none" />
        </div>
    );
}








