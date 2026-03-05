import { useState } from 'react';
import { FiSearch, FiFilter, FiCheckCircle, FiStar, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const TALENT_MATCHES = [
    {
        id: 1,
        name: 'Khali',
        subProfile: 'Art, Visual & Character Design',
        skills: ['Character Anatomy', 'Stylized Rendering'],
        truthLevel: 'L2 Truth',
        repScore: 98,
        availability: 'Open to Gigs',
        image: null
    },
    {
        id: 2,
        name: 'Sarah Drasner',
        subProfile: 'Game Creation & Development',
        skills: ['Network Architecture', 'C++ / UE5'],
        truthLevel: 'L3 Truth',
        repScore: 120,
        availability: 'Full Time Only',
        image: null
    },
    {
        id: 3,
        name: 'Marcus Bell',
        subProfile: 'Music, Audio & Sound Design',
        skills: ['Orchestral Composition', 'Wwise Implementation'],
        truthLevel: 'L1 Truth',
        repScore: 45,
        availability: 'Open to Gigs',
        image: null
    }
];

export default function CompanyTalentDiscovery() {
    const [query, setQuery] = useState('');

    return (
        <div className="flex flex-col h-full bg-[var(--theme-bg)] theme-community overflow-y-auto font-body">
            {/* ── Header ── */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[var(--theme-border)] px-8 py-6 shadow-sm">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="gzs-h1 !text-2xl uppercase tracking-tight font-black">Talent Discovery Engine</h1>
                        <p className="gzs-body-sm !text-xs mt-1">Filtering the noise with Atomic Skills & Truth Weights.</p>
                    </div>
                    <div className="relative flex-1 max-w-md">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by verified skills (e.g. C++, Rigging...)"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[var(--theme-primary)] transition-all font-medium"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="p-8 max-w-6xl mx-auto w-full">
                {/* ── Active Filters ── */}
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mr-2">Filters:</span>
                    <button className="px-3 py-1.5 bg-purple-50 text-[var(--theme-primary)] rounded-full text-[10px] font-black border border-purple-100 flex items-center gap-2">
                        TRUTH LEVEL {'>'} L1 <FiFilter className="w-3 h-3" />
                    </button>
                    <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full text-[10px] font-black border border-gray-100 flex items-center gap-2">
                        AVAILABILITY <FiFilter className="w-3 h-3" />
                    </button>
                </div>

                {/* ── Results ── */}
                <div className="space-y-4">
                    {TALENT_MATCHES.map((talent) => (
                        <div key={talent.id} className="bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col md:flex-row md:items-center justify-between hover:shadow-xl transition-all group">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-[10px] font-black text-gray-300">AVATAR</div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl font-black">{talent.name}</h3>
                                        <span className="text-[9px] font-black bg-purple-100 text-[var(--theme-primary)] px-2 py-1 rounded border border-purple-200 uppercase">{talent.truthLevel}</span>
                                    </div>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">{talent.subProfile}</p>

                                    <div className="flex gap-2 mt-4">
                                        {talent.skills.map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold text-gray-600">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 md:mt-0 flex flex-col items-end gap-3">
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Reputation</p>
                                    <p className="text-2xl font-black text-teal-600 flex items-center gap-2">
                                        <FiStar className="w-5 h-5 fill-current" /> {talent.repScore}
                                    </p>
                                </div>
                                <button className="gzs-btn-primary !px-8 !py-3 !text-[10px] !rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                    INQUIRE TO SUB-PROFILE
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Empty State Metaphor ── */}
                <div className="mt-12 p-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-center">
                    <FiCheckCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Only Verified Skills Appear Here</p>
                    <p className="text-xs text-gray-400 mt-2">GzoneSphere Discovery filters out unverified atomic claims to ensure hiring accuracy.</p>
                </div>
            </div>
        </div>
    );
}
