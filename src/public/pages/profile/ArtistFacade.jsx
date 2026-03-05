import { useNavigate } from 'react-router-dom';
import {
    FiPlus, FiTool, FiActivity, FiStar, FiImage,
    FiLayers, FiEye, FiCheckCircle, FiChevronRight,
    FiAward
} from 'react-icons/fi';
import ProfileSkillLayout from './ProfileSkillLayout';
import { SUB_PROFILES } from '@data/profileSkillData';

export default function ArtistFacade() {
    const navigate = useNavigate();
    const profile = SUB_PROFILES.find(p => p.id === 'art-visual');

    return (
        <ProfileSkillLayout
            title={profile.title}
            subtitle={profile.description}
            badge="ART & VISUAL"
            footer={`Managing localized identity for ${profile.title}. Activity here contributes to Master Reputation.`}
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 font-body pb-20">

                {/* ── LEFT: Career Pillar (1 Col) ── */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm text-center">
                        <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-inner">
                            <FiImage size={32} />
                        </div>
                        <h3 className="text-xl font-black text-gray-950 uppercase leading-none mb-2">CONCEPT ARTIST</h3>
                        <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-8">MID-LEVEL PROFESSIONAL</p>

                        <div className="space-y-4 pt-8 border-t border-gray-50">
                            {[
                                { label: 'SKILL SCORE', val: '94/100', icon: FiAward, color: 'text-purple-500' },
                                { label: 'VERIFIED WORK', icon: FiCheckCircle, val: '8 PROOFS', color: 'text-teal-500' }
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <stat.icon className={stat.color} size={14} />
                                    <div className="text-right">
                                        <p className="text-[8px] font-black text-gray-400 uppercase">{stat.label}</p>
                                        <p className="text-[11px] font-black text-gray-950 uppercase">{stat.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <FiStar size={40} />
                        </div>
                        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">AVAILABILITY</h4>
                        <p className="text-xs font-bold leading-relaxed mb-6">Currently accepting high-fidelity character commissions and key art requests.</p>
                        <button className="w-full bg-teal-400 text-gray-950 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors">
                            COMMISSIONS OPEN
                        </button>
                    </div>
                </div>

                {/* ── RIGHT: Deep Dive (3 Cols) ── */}
                <div className="lg:col-span-3 space-y-8">

                    {/* Visual Style Domain */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">SPECIALIZED VISUAL DOMAINS</h2>
                        <div className="flex flex-wrap gap-3">
                            {['Stylized / Low-Poly', 'Cyberpunk Neon', 'Hand-Painted Textures', 'Hyper-Realism'].map(tag => (
                                <span key={tag} className="bg-gray-50 text-gray-950 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:border-teal-400 transition-colors cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Skill Matrix */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">CAPABILITY MATRIX</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Verified proofs of visual crafting</p>
                            </div>
                            <button className="bg-gray-950 text-white flex items-center gap-3 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest">
                                <FiPlus /> ADD ART SKILL
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {['Character Anatomy', 'Stylized Rendering', 'Texture Painting'].map(skill => (
                                <div key={skill} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:bg-white transition-all hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm">
                                            <FiLayers />
                                        </div>
                                        <p className="text-xs font-black text-gray-950 uppercase">{skill}</p>
                                    </div>
                                    <span className="text-[9px] font-black bg-teal-100 text-teal-600 px-3 py-1 rounded-full">VERIFIED</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Portfolio Deep Dive */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">PORTFOLIO SPOTLIGHT</h3>
                            <button className="text-[10px] font-black text-teal-600 uppercase tracking-widest hover:underline">VIEW ALL ASSETS</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group rounded-[2rem] overflow-hidden border border-gray-100 hover:border-teal-400 transition-all">
                                <div className="aspect-video bg-gray-100 overflow-hidden relative">
                                    <img src="https://picsum.photos/800/600?random=102" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Portfolio asset" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <FiEye className="text-white" size={32} />
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h4 className="text-sm font-black text-gray-950 uppercase mb-2">Project: Neon Strife Cast</h4>
                                    <p className="text-[10px] font-medium text-gray-500 mb-6 leading-relaxed">Full character conceptualization for an indie cyberpunk roguelike. Silhouette design and read-ability analysis.</p>
                                    <div className="flex gap-2">
                                        <span className="text-[8px] font-black px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg">#2DART</span>
                                        <span className="text-[8px] font-black px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg">#CONCEPT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tools Ecosystem */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 p-8 opacity-5">
                            <FiTool size={120} />
                        </div>
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8">TOOLS & PIPELINE</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
                            {['Photoshop', 'Blender', 'Substance Painter', 'ZBrush'].map(tool => (
                                <div key={tool} className="flex flex-col items-center p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:border-purple-200 transition-all">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                        <FiTool className="text-gray-400 group-hover:text-purple-600" />
                                    </div>
                                    <p className="text-[10px] font-black text-gray-950 uppercase">{tool}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </ProfileSkillLayout>
    );
}
