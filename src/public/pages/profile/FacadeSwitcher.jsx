import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiCheck, FiArrowRight, FiShield, FiEdit3,
    FiCode, FiPlayCircle, FiMessageCircle, FiHeadphones, FiBookOpen
} from 'react-icons/fi';
import ProfileSkillLayout from './ProfileSkillLayout';
import { SUB_PROFILES } from '@data/profileSkillData';

const FACADE_ICONS = {
    'esports': FiShield,
    'art-visual': FiEdit3,
    'game-creation': FiCode,
    'content-media': FiPlayCircle,
    'business-strategy': FiMessageCircle,
    'music-audio': FiHeadphones,
    'writing-narrative': FiBookOpen
};

export default function FacadeSwitcher() {
    const [selected, setSelected] = useState('art-visual');
    const navigate = useNavigate();

    return (
        <ProfileSkillLayout
            title="SELECT YOUR INITIAL FACADE"
            subtitle="Choose a specialized surface for your Master Identity. You can activate others later."
            footer="Your reputation is anchored to your Master Identity, while your skills are showcased per Facade."
            noPadding
        >
            <div className="max-w-6xl mx-auto px-6 py-12 font-body">

                {/* ── SELECTION GRID ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {SUB_PROFILES.map((sp) => {
                        const isSelected = selected === sp.id;
                        const Icon = FACADE_ICONS[sp.id] || FiCheck;

                        return (
                            <div
                                key={sp.id}
                                onClick={() => setSelected(sp.id)}
                                className={`relative flex flex-col p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer group hover:scale-[1.02] ${isSelected
                                        ? 'bg-purple-600 border-purple-500 shadow-2xl shadow-purple-200'
                                        : 'bg-white border-gray-50 hover:border-purple-200 shadow-sm'
                                    }`}
                            >
                                {/* Icon & Number */}
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isSelected ? 'bg-white/20 text-white' : 'bg-purple-50 text-purple-600'
                                        }`}>
                                        <Icon size={24} />
                                    </div>
                                    {isSelected && (
                                        <div className="bg-white text-purple-600 rounded-full p-1.5 shadow-lg">
                                            <FiCheck size={14} />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <h3 className={`text-lg font-black uppercase tracking-tight mb-3 ${isSelected ? 'text-white' : 'text-gray-950'
                                    }`}>
                                    {sp.title}
                                </h3>
                                <p className={`text-[11px] font-bold leading-relaxed mb-6 ${isSelected ? 'text-purple-100' : 'text-gray-400'
                                    }`}>
                                    {sp.description}
                                </p>

                                {/* Footer Info */}
                                <div className={`mt-auto pt-6 border-t ${isSelected ? 'border-white/10' : 'border-gray-50'
                                    }`}>
                                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isSelected ? 'text-white/60' : 'text-purple-500'
                                        }`}>
                                        {sp.role || 'Professional Tier'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── ACTION FOOTER ── */}
                <div className="flex flex-col items-center justify-center gap-6 border-t border-gray-100 pt-16 pb-20">
                    <div className="text-center mb-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                            Selected Identity Path: <span className="text-purple-600">{selected?.replace('-', ' ')}</span>
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/profile/master')}
                        disabled={!selected}
                        className="bg-gray-950 text-white px-16 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-[0.2em] hover:bg-purple-600 hover:scale-[1.05] transition-all flex items-center gap-4 shadow-xl disabled:opacity-50"
                    >
                        INITIALIZE FACADE <FiArrowRight />
                    </button>

                    <p className="text-[10px] font-bold text-gray-400 uppercase italic">
                        * You can switch or manage facades from your Master Identity Hub at any time.
                    </p>
                </div>
            </div>
        </ProfileSkillLayout>
    );
}
