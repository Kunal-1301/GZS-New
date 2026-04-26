import React from 'react';
import { useParams } from 'react-router-dom';
import { 
    FiBriefcase, FiMapPin, FiGlobe, FiUsers, FiAward, 
    FiCheckCircle, FiActivity, FiSearch, FiTarget 
} from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import { useCompany } from '@/services/mutators/useCompany';

// Sub-components
const CompanyHeader = ({ company }) => (
    <div className="bg-[var(--theme-card)] rounded-full overflow-hidden shadow-2xl border border-[var(--theme-border)] group relative">
        <div className="h-64 bg-gradient-to-br from-[#1a1a2e] to-[#7C3AED] relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('/assets/grid-pattern.svg')] bg-repeat" />
        </div>
        <div className="px-12 pb-12 -mt-16 relative z-10">
            <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
                <div className="flex flex-col lg:flex-row items-end gap-8">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-[var(--theme-card)] p-2 shadow-2xl border-4 border-[var(--theme-card)]">
                        <div className="w-full h-full rounded-2xl bg-neutral-900 flex items-center justify-center text-white text-5xl font-black italic">
                            {company?.name?.[0] || 'G'}
                        </div>
                    </div>
                    <div className="pb-2">
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[var(--theme-text)] italic leading-none">{company?.name || 'Company_Core'}</h1>
                            {company?.is_verified && <FiCheckCircle className="text-[var(--theme-primary)]" size={24} />}
                        </div>
                        <div className="flex flex-wrap items-center gap-6 text-xs font-black uppercase tracking-tight text-[var(--theme-text-muted)] italic">
                            <span className="flex items-center gap-2"><FiBriefcase size={14} className="text-[var(--theme-primary)]" /> {company?.type || 'AAA_STUDIO'}</span>
                            <span className="flex items-center gap-2"><FiMapPin size={14} className="text-[var(--theme-secondary)]" /> {company?.location || 'GLOBAL_HQ'}</span>
                            <span className="flex items-center gap-2"><FiUsers size={14} /> {company?.size_range || '10-50'} ENTITIES</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 pb-2">
                    <a href={company?.website} target="_blank" rel="noreferrer" className="gzs-btn-primary !px-10 !py-4 flex items-center gap-3 italic">
                        <FiGlobe /> VISIT_CORE
                    </a>
                </div>
            </div>
        </div>
    </div>
);

const SectionAbout = ({ company }) => (
    <section className="bg-[var(--theme-card)]/50 backdrop-blur-2xl rounded-3xl border-2 border-[var(--theme-border)] p-12 space-y-12">
        <div className="flex items-center gap-4 border-b-2 border-dashed border-[var(--theme-border)] pb-8 opacity-30">
            <h3 className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic leading-none">Entity_Manifest</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
                <div>
                   <label className="text-xs font-black uppercase tracking-widest text-[var(--theme-primary)] mb-4 block italic">Core_Objective</label>
                   <p className="text-xl font-black italic tracking-tighter text-[var(--theme-text)] opacity-80 leading-relaxed">
                      "{company?.description || 'Synchronizing with the GzoneSphere ecosystem to define the future of high-performance digital environments.'}"
                   </p>
                </div>
                <div>
                   <label className="text-xs font-black uppercase tracking-widest text-[var(--theme-primary)] mb-4 block italic">Our_Mission</label>
                   <p className="text-sm font-black italic text-[var(--theme-text-muted)] leading-relaxed">
                      {company?.mission || 'Democratizing AAA execution through verifiable skill telemetry.'}
                   </p>
                </div>
            </div>
            <div className="bg-[var(--theme-bg-alt)]/60 rounded-3xl p-10 border-2 border-[var(--theme-border)] shadow-inner">
                <label className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] mb-8 block italic opacity-40">Deployed_Assets (Shipped Titles)</label>
                <div className="grid grid-cols-2 gap-6">
                    {(company?.shipped_titles || ['GENESIS_PRIME', 'VOID_RUNNER']).map((title, i) => (
                        <div key={i} className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-[var(--theme-card)] border-2 border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-primary)] shadow-sm group-hover:scale-110 transition-all">
                                <FiTarget size={18} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-[var(--theme-text)] italic group-hover:text-[var(--theme-primary)] transition-colors">{title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const RoleCard = ({ role }) => (
    <div className="bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-3xl p-8 hover:border-[var(--theme-primary)]/40 transition-all group cursor-pointer shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
            <div>
                <span className="text-xs font-black uppercase tracking-wide text-[var(--theme-primary)] italic">{role.level || 'EXPERT'}</span>
                <h4 className="text-xl font-black uppercase tracking-tighter text-[var(--theme-text)] italic mt-1 group-hover:text-[var(--theme-primary)] transition-colors">{role.title}</h4>
            </div>
            <div className="px-3 py-1 bg-[var(--theme-bg-alt)] rounded-lg text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)]">
                {role.location === 'Remote' ? 'OFF_SITE' : 'ON_SITE'}
            </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
            {role.skills?.map((s, i) => (
                <span key={i} className="px-2 py-1 bg-[var(--theme-bg-alt)] rounded-lg text-xs font-bold text-[var(--theme-text-muted)] uppercase tracking-widest opacity-60">{s}</span>
            ))}
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-dashed border-[var(--theme-border)]">
             <span className="text-xs font-black uppercase text-[var(--theme-primary)] tracking-widest italic">{role.salary || 'CONFIDENTIAL_RATE'}</span>
             <button className="text-xs font-black uppercase tracking-wider text-[var(--theme-text)] group-hover:text-[var(--theme-primary)] transition-colors italic">INITIALIZE_APPLY →</button>
        </div>
    </div>
);

const SectionOpenRoles = ({ slug }) => {
    const { useOpenRoles } = useCompany();
    const { data: roles = [], isLoading } = useOpenRoles(slug);

    return (
        <section className="space-y-10">
            <div className="flex items-center gap-4">
                <div className="w-1.5 h-6 bg-[var(--theme-secondary)] rounded-full" />
                <h3 className="text-2xl font-black uppercase tracking-tighter text-[var(--theme-text)] italic">Operational_Openings.sys</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {roles.length > 0 ? (
                    roles.map((role, i) => <RoleCard key={i} role={role} />)
                ) : (
                    <div className="col-span-full py-20 text-center bg-[var(--theme-card)]/50 rounded-3xl border-2 border-dashed border-[var(--theme-border)]">
                        <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic opacity-30">Zero active recruitment uplinks detected</p>
                    </div>
                )}
            </div>
        </section>
    );
};

const SectionTeam = ({ slug }) => {
    const { useCompanyTeam } = useCompany();
    const { data: team = [], isLoading } = useCompanyTeam(slug);

    return (
        <section className="space-y-10">
            <div className="flex items-center gap-4">
                <div className="w-1.5 h-6 bg-[var(--theme-primary)] rounded-full" />
                <h3 className="text-2xl font-black uppercase tracking-tighter text-[var(--theme-text)] italic">Entity_Roster.manifest</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(team.length > 0 ? team : [1, 2, 3, 4]).map((member, i) => (
                    <div key={i} className="bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-3xl p-8 flex flex-col items-center text-center group hover:border-[var(--theme-primary)]/40 transition-all cursor-pointer shadow-sm">
                        <div className="w-20 h-20 rounded-[1.8rem] bg-[var(--theme-bg-alt)] mb-4 p-1 border-2 border-[var(--theme-border)] group-hover:scale-105 transition-all">
                             <div className="w-full h-full rounded-[1.4rem] bg-[var(--theme-text)] text-white flex items-center justify-center font-black italic text-2xl">
                                {typeof member === 'object' ? member.username[0] : 'E'}
                             </div>
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-tighter text-[var(--theme-text)] italic group-hover:text-[var(--theme-primary)] transition-colors">
                            {typeof member === 'object' ? member.username : `OPERATOR_${i+1}`}
                        </h4>
                        <span className="text-xs font-black uppercase tracking-tight text-[var(--theme-text-muted)] mt-1 opacity-60">
                            {typeof member === 'object' ? member.role : 'CORE_MEMBER'}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

const CompanyProfile = () => {
    const { slug } = useParams();
    const { useCompanyDetail } = useCompany();
    const { data: company, isLoading } = useCompanyDetail(slug);

    if (isLoading) return <div className="min-h-screen bg-[var(--theme-bg)] flex items-center justify-center"><FiActivity size={48} className="animate-spin text-[var(--theme-primary)]" /></div>;

    return (
        <div className="min-h-screen bg-[var(--theme-bg)] theme-community font-body flex flex-col selection:bg-[var(--theme-primary)]/30">
            <Helmet>
                <title>{company?.name || 'Company'} | GzoneSphere</title>
            </Helmet>

            <main className="flex-1 max-w-[1500px] mx-auto w-full space-y-24 pb-48 px-6 lg:px-12 pt-32">
                {/* custom container: max-w-[1500px] — intentionally wider than 1280px page-container standard */}
                <CompanyHeader company={company} />
                <SectionAbout company={company} />
                <SectionOpenRoles slug={slug} />
                <SectionTeam slug={slug} />

                {/* Section 5: Activity Feed */}
                <section className="space-y-10">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-6 bg-[var(--theme-text)] rounded-full" />
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-[var(--theme-text)] italic">Communication_Logs.ch</h3>
                    </div>
                    <div className="py-32 text-center bg-[var(--theme-card)]/30 rounded-3xl border-4 border-dashed border-[var(--theme-border)]">
                        <FiActivity size={48} className="mx-auto text-[var(--theme-text-muted)] opacity-20 mb-6" />
                        <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic opacity-30">Zero broadcast activity currently synchronized</p>
                    </div>
                </section>
            </main>

        </div>
    );
};

export default CompanyProfile;








