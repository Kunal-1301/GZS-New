import React from 'react';
import { FiActivity } from 'react-icons/fi';
import { useCommunity } from '@/services/mutators/useCommunity';

const LiveActivityPulse = () => {
    const { useLiveStats } = useCommunity();
    const { data: stats } = useLiveStats();

    return (
        <div className="w-full bg-[var(--theme-primary)]/5 border-b border-[var(--theme-border)] py-2.5 px-6 lg:px-20 flex items-center justify-between overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
                <span className="w-2.5 h-2.5 bg-[var(--status-success)] rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--status-success-rgb),1)]" />
                <span className="text-xs font-black uppercase tracking-tight italic opacity-60">
                    <span className="text-[var(--theme-text)]">{(stats?.total_online || 0).toLocaleString()}</span> members online across all branches
                </span>
            </div>
            
            <div className="flex-1 max-w-2xl overflow-hidden px-8 relative">
                <div className="ticker-track">
                    <span className="text-xs font-black uppercase tracking-widest italic opacity-40 whitespace-nowrap inline-block animate-ticker">
                        {stats?.recent_activity?.join(' — ') || 'Synchronizing with the GzoneSphere network nexus...'}
                    </span>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-4 shrink-0">
                <FiActivity size={12} className="text-[var(--theme-primary)] animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wide italic opacity-30 leading-none">NETWORK_NOMINAL</span>
            </div>

            <style jsx>{`
                .ticker-track {
                    display: flex;
                    overflow: hidden;
                }
                .animate-ticker {
                    animation: ticker 40s linear infinite;
                    padding-left: 100%;
                }
                @keyframes ticker {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-100%, 0, 0); }
                }
            `}</style>
        </div>
    );
};

export default LiveActivityPulse;








