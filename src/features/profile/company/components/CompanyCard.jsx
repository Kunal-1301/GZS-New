import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiExternalLink } from 'react-icons/fi';

const CompanyCard = ({ company }) => {
    const navigate = useNavigate();
    
    return (
        <div 
            onClick={() => navigate(`/company/${company.slug}`)}
            className="group bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 hover:shadow-2xl hover:shadow-[var(--theme-primary)]/10 transition-all cursor-pointer"
        >
            <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-[var(--theme-bg-alt)] rounded-2xl flex items-center justify-center p-3 border border-[var(--theme-border)] group-hover:scale-110 transition-transform">
                    {company.logo ? (
                        <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                    ) : (
                        <span className="text-xl font-black text-[var(--theme-text-muted)]">{company.name?.[0]}</span>
                    )}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--theme-bg-alt)] rounded-full text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)]">
                    <FiUsers size={12} /> {company.memberCount || 0} Members
                </div>
            </div>
            
            <h3 className="text-lg font-black uppercase tracking-tight text-[var(--theme-text)] mb-2 group-hover:text-[var(--theme-primary)] transition-colors">
                {company.name}
            </h3>
            <p className="text-xs text-[var(--theme-text-muted)] line-clamp-2 mb-6 font-medium leading-relaxed">
                {company.tagline || company.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
                {company.specialties?.slice(0, 3).map(s => (
                    <span key={s} className="px-3 py-1 bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] text-xs font-black uppercase tracking-widest rounded-lg">
                        {s}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default CompanyCard;







