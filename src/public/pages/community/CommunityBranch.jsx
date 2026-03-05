import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useCommunityPermissions } from '@context/CommunityPermissionsContext';
import { FiCheckCircle, FiEye, FiLock, FiMessageCircle } from 'react-icons/fi';
import CompanyCard from '@components/community/CompanyCard';
const COMMUNITY_DATA = {
    dev: {
        title: 'Game Dev Community',
        purpose: 'Skill growth + hiring readiness',
        tabs: ['Home', 'Rooms', 'LFG', 'Events'],
    },
    esports: {
        title: 'Esports Community',
        purpose: 'Performance, trust, competition',
        tabs: ['Home', 'Rooms', 'Tryouts', 'Tournaments'],
    },
    strategy: {
        title: 'Business & Strategy',
        purpose: 'Decisions, not chatter',
        tabs: ['Home', 'Strategy Rooms', 'AMAs', 'Hiring'],
    },
    art: {
        title: 'Game Art Community',
        purpose: 'Craft, critique, commissions',
        tabs: ['Home', 'Critique', 'Commissions', 'Challenges'],
    },
    writing: {
        title: 'Writing & Narrative',
        purpose: 'Story, clarity, thinking',
        tabs: ['Home', 'Genres', 'Editorial', 'Collaboration'],
    },
    audio: {
        title: 'Music & Audio',
        purpose: 'Audio quality + licensing clarity',
        tabs: ['Home', 'Style Rooms', 'Licensing', 'Commissions'],
    }
};

const CommunityBranch = () => {
    const { branchId } = useParams();
    const [activeTab, setActiveTab] = useState('Home');
    const { persona, can } = useCommunityPermissions();

    if (!COMMUNITY_DATA[branchId]) {
        return <Navigate to="/community" replace />;
    }

    const data = COMMUNITY_DATA[branchId];

    return (
        <div className="flex flex-col h-full bg-[var(--theme-bg)] theme-community overflow-y-auto font-body">
            {/* Sticky Header */}
            <div className="sticky top-0 z-40 bg-[var(--theme-card)]/95 backdrop-blur-md border-b border-[var(--theme-border)] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                <div>
                    <h1 className="gzs-h1 !text-3xl">
                        {data.title}
                    </h1>
                    <p className="gzs-body-sm !font-medium mt-1">{data.purpose}</p>
                </div>

                {/* User Status / Trust Score Panel */}
                <div className="flex items-center gap-4 bg-[var(--theme-bg-alt)] rounded-lg px-4 py-2 border border-[var(--theme-border)] shadow-sm">
                    {persona.type === 'company' ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-blue-600 uppercase">
                            <FiCheckCircle className="w-4 h-4 text-blue-500" /> Authorized Company
                        </div>
                    ) : persona.type === 'master' ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-neutral-500 uppercase">
                            Global Master
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-2 border-r border-[var(--theme-border)] pr-4">
                                <span className={`text-sm font-black tracking-widest uppercase ${persona.isMatchingBranch ? 'text-[var(--theme-primary)]' : 'text-[var(--theme-text-muted)]'}`}>
                                    {persona.isMatchingBranch ? 'NATIVE' : 'TOURIST'}
                                </span>
                                <span className="text-[var(--theme-text)] font-bold text-sm tracking-widest uppercase">{persona.level}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#e53935] uppercase">
                                <FiCheckCircle className="w-4 h-4 text-[#e53935]" /> Good Trust
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Tourist / Read Only Banner */}
            {!can('chat') && (
                <div className="bg-blue-50 border-b border-blue-100 px-6 py-2 flex items-center justify-center gap-2 text-xs font-bold text-blue-600 tracking-wide">
                    <FiEye className="w-4 h-4" /> You are in Read-Only Mode. {persona.type === 'company' ? "Companies cannot post socially." : "You do not have the active sub-profile for this native branch."}
                </div>
            )}

            {/* Tabs */}
            <div className="px-6 border-b border-[var(--theme-border)] bg-[var(--theme-card)]">
                <ul className="flex space-x-6 overflow-x-auto">
                    {data.tabs.map(tab => (
                        <li key={tab}>
                            <button
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 font-bold tracking-wide transition-colors whitespace-nowrap text-sm border-b-2 ${activeTab === tab
                                    ? 'text-[var(--theme-primary)] border-[var(--theme-primary)]'
                                    : 'text-[var(--theme-text-muted)] border-transparent hover:text-[var(--theme-text)]'
                                    }`}
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="p-6 md:p-8 max-w-7xl w-full mx-auto space-y-12">

                {/* Section 1: Pinned Rooms */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="gzs-h2 !text-xl">System Rooms (Pinned)</h2>
                        <span className="gzs-label !text-[10px] border border-[var(--theme-border)] px-2 py-0.5 rounded bg-[var(--theme-card)]">Global Master Only</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-[var(--theme-card)] border text-left border-[var(--theme-border)] border-t-4 border-t-[var(--theme-primary)] p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                <span className="text-xl mb-3 block text-[var(--theme-primary)] font-black tracking-widest">📌 PINNED</span>
                                <h3 className="text-neutral-900 font-bold mb-1 tracking-wide">Help &amp; Learning {i}</h3>
                                <p className="text-xs text-neutral-500 font-medium">Read-only for Beginners. Topic strictly moderated.</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 2: Active / Trending Rooms */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-black text-neutral-900 tracking-tight">Trending Active Rooms</h2>
                        {can('create_room') ? (
                            <button className="text-[#e53935] font-bold hover:underline text-sm tracking-wide">+ Create Room</button>
                        ) : (
                            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest flex items-center gap-1 border border-neutral-200 px-2 py-1 rounded bg-neutral-50">
                                <FiLock className="w-3 h-3" /> Expert Required
                            </span>
                        )}
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white border border-neutral-200 shadow-sm p-4 rounded-xl flex items-center justify-between hover:border-[#7C3AED]/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-600 border border-neutral-200">
                                        <FiMessageCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-neutral-900 font-bold text-lg hover:text-[#7C3AED] cursor-pointer transition-colors tracking-tight">Gameplay Systems Breakdown • Discussion</h3>
                                        <p className="text-neutral-500 text-xs font-semibold tracking-wide flex items-center gap-2 mt-0.5">
                                            <span>Host: <span className="text-[#7C3AED]">Master Dev</span></span>
                                            <span>•</span>
                                            <span className="text-blue-600">124 participants</span>
                                        </p>
                                    </div>
                                </div>
                                <Link to={`/community/${branchId}/room/room-123`} className="gzs-btn-primary !px-5 !py-2">
                                    JOIN
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: LFG / Core Opportunities (Company Cards) */}
                <section>
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <h2 className="text-xl font-black text-neutral-900 tracking-tight">Active Opportunities & LFG</h2>
                        <button className="text-neutral-500 hover:text-neutral-900 font-bold tracking-wide text-sm transition-colors cursor-pointer">View All Directory &rarr;</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CompanyCard
                            companyName="Riot Games"
                            logoText="RG"
                            trustStatus="Excellent Standing"
                            trustColor="green"
                            engagementType="Hiring"
                            title="Senior Game Designer (Unreal Engine)"
                            requirements={['Expert Level Required', 'UE5 Verified', '5+ Gameplay Systems']}
                            deadline="Nov 30"
                        />
                        <CompanyCard
                            companyName="IndieHaus Studios"
                            logoText="IH"
                            trustStatus="Good Trust"
                            trustColor="blue"
                            engagementType="Playtest"
                            title="Closed Beta: Action Roguelite"
                            requirements={['Action RPG Verified', 'Requires Voice Comm', 'Requires Hustler+ Level']}
                            deadline="Nov 15"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CommunityBranch;
