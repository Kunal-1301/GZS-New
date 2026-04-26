import React from 'react';
import { FiUser, FiZap, FiAward } from 'react-icons/fi';

const CompanyMembersList = ({ members }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-tight text-[var(--theme-text-muted)] mb-6 flex items-center gap-3">
                <FiUser size={12} /> Team Members — {members.length}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((member) => (
                    <div key={member.userId} className="p-5 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl hover:shadow-xl hover:shadow-[var(--theme-primary)]/10 transition-all group flex items-center gap-4">
                        <div className="w-12 h-12 bg-[var(--theme-bg-alt)] rounded-2xl flex items-center justify-center font-black text-[var(--theme-text-muted)] group-hover:bg-[var(--theme-primary)] group-hover:text-[var(--theme-text-inverse)] transition-colors">
                            {member.avatar ? (
                                <img src={member.avatar} alt={member.username} className="w-full h-full object-cover rounded-2xl" />
                            ) : (
                                member.username[0]
                            )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-black uppercase tracking-tight text-[var(--theme-text)] group-hover:text-[var(--theme-primary)] transition-colors truncate">
                                {member.username}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-black uppercase px-2 py-0.5 bg-[var(--theme-bg-alt)] rounded text-[var(--theme-text-muted)]">
                                    {member.role || 'Member'}
                                </span>
                                {member.isVerified && <FiAward className="text-amber-500" size={10} />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyMembersList;








