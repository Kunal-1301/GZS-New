import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
    FiUsers, FiUser, FiChevronRight, FiChevronLeft, FiCheck, 
    FiShield, FiTarget, FiZap, FiCpu, FiAward, FiHash, FiTerminal, FiGlobe, FiActivity,
    FiPlusCircle, FiMinusCircle, FiSearch, FiLock, FiAlertCircle, FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/shared/components/Toast';
import { useTournament, useRegisterTournament } from '@/services/mutators/useTournaments';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { Helmet } from 'react-helmet-async';
import { adaptTournamentRecord } from '@/shared/adapters/contentAdapters';

const STEPS = ['TOURNAMENT_TYPE', 'IDENTITY_SYNC', 'PROTOCOL_LAWS', 'SYNC_SUCCESS'];

export default function TournamentRegister() {
    usePageTheme('tournaments-page');
    const { slug } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    
    const { data: rawTournament } = useTournament(slug);
    const registerMutation = useRegisterTournament();
    const tournament = rawTournament ? adaptTournamentRecord(rawTournament) : null;

    const [currentStep, setCurrentStep] = useState(0);
    const [regType, setRegType] = useState('SOLO');
    
    // Core Registration State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        inGameId: '',
        rank: '',
        teamName: '',
        members: [''], // Dynamics list
        logo: null,
        skillLevel: 'Beginner',
        history: '',
        matchAcknowledge: false,
        paymentMethod: 'GZS Coins',
        rulesAgreed: false,
        infoAccurate: false,
        dataConsent: false,
        customFields: {}
    });

    const isTeamFormat = (tournament?.team_size || 1) > 1 || tournament?.format?.toLowerCase().includes('team');
    const teamSize = tournament?.team_size || 5;
    const canSubmit = formData.rulesAgreed && formData.infoAccurate && formData.dataConsent;

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleFinalize = () => {
        if (!canSubmit) return;
        registerMutation.mutate({ 
            id: tournament?.id || slug, 
            data: { ...formData, type: regType } 
        }, {
            onSuccess: () => {
                nextStep(); 
                showToast('Nexus link established: Tournament registered!', 'success');
            },
            onError: (err) => {
                showToast(err?.message || 'Protocol sync failed.', 'error');
            }
        });
    };

    const addMember = () => {
        if (formData.members.length < teamSize) {
            setFormData(prev => ({ ...prev, members: [...prev.members, ''] }));
        }
    };

    const removeMember = (index) => {
        const newMembers = [...formData.members];
        newMembers.splice(index, 1);
        setFormData(prev => ({ ...prev, members: newMembers }));
    };

    const handleCustomField = (label, val) => {
        setFormData(prev => ({
            ...prev,
            customFields: { ...prev.customFields, [label]: val }
        }));
    };

    return (
        <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-body selection:bg-[var(--theme-primary)]/30 pb-32">
            <Helmet><title>Engagement Protocol | GzoneSphere</title></Helmet>

            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[65%] h-[60%] bg-[var(--theme-primary)]/5 blur-3xl rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[65%] h-[60%] bg-[var(--theme-primary)]/5 blur-3xl rounded-full" />
            </div>

            {/* Tournament Hero */}
            <section className="relative overflow-hidden" style={{ minHeight: '280px' }}>
                {tournament?.banner_url && (
                    <img src={tournament.banner_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #052005 0%, #1A3D1A 100%)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end page-container pb-10 pt-28">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-primary)] mb-2 opacity-80">Tournament Registration</p>
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none line-clamp-2">
                        {tournament?.name || 'Loading Tournament...'}
                    </h1>
                    {tournament && (
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                            {tournament.prize && (
                                <span className="text-xs font-black text-[var(--theme-primary)] uppercase tracking-wider">
                                    Prize Pool: {tournament.prize}
                                </span>
                            )}
                            {tournament.prize && tournament.date && (
                                <span className="w-1 h-1 rounded-full bg-white/30" />
                            )}
                            {tournament.date && (
                                <span className="text-xs font-black text-white/50 uppercase tracking-wider">{tournament.date}</span>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <main className="relative z-10 page-container pt-12 space-y-20">
                <header className="space-y-12 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <button 
                            onClick={() => currentStep === 0 ? navigate(-1) : prevStep()}
                            className="w-14 h-14 bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-2xl flex items-center justify-center hover:text-[var(--theme-primary)] hover:border-[var(--theme-primary)]/40 transition-all shadow-xl backdrop-blur-md group"
                        >
                            <FiChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div className="flex-1">
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                               <div className="w-1.5 h-4 bg-[var(--theme-primary)] rounded-full animate-pulse" />
                               <span className="text-xs font-black uppercase tracking-widest text-[var(--theme-primary)] italic leading-none">Register_Engagement v1.08</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-[var(--theme-text)] leading-none text-center md:text-left">Initialize <span className="text-[var(--theme-text-muted)] opacity-20">ENCOUNTER</span></h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {STEPS.map((step, i) => (
                            <div key={step} className="space-y-4">
                                <div className="h-2 rounded-full overflow-hidden bg-[var(--theme-bg-alt)] border border-[var(--theme-border)] shadow-inner">
                                    <motion.div initial={{ width: 0 }} animate={{ width: i <= currentStep ? '100%' : '0%' }} className={`h-full transition-all duration-1000 ${i <= currentStep ? 'bg-[var(--theme-primary)] shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.5)]' : ''}`} />
                                </div>
                                <span className={`text-xs font-black uppercase tracking-wider block italic transition-all duration-500 leading-none ${i <= currentStep ? 'text-[var(--theme-primary)]' : 'text-[var(--theme-text-muted)] opacity-20'}`}>
                                    {step}
                                </span>
                            </div>
                        ))}
                    </div>
                </header>

                <div className="min-h-[600px] relative">
                    <AnimatePresence mode="wait">
                        {currentStep === 0 && (
                            <motion.div key="step0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="grid md:grid-cols-2 gap-10">
                                <SelectCard active={regType === 'SOLO'} onClick={() => setRegType('SOLO')} icon={<FiUser />} title="Protocol Solo" desc="Register as an individual operator. You will be matched against other sovereign entrants." />
                                <SelectCard active={regType === 'TEAM'} onClick={() => { if(isTeamFormat) setRegType('TEAM'); else showToast('This tournament only supports SOLO engagement.', 'info'); }} icon={<FiUsers />} title="Protocol Squad" desc={isTeamFormat ? "Register as a tactical unit. Requires identity sync for all squad members." : "NOT_AVAILABLE_FOR_THIS_SHARD"} disabled={!isTeamFormat} />
                                <div className="md:col-span-2 pt-12 flex justify-end">
                                    <button onClick={nextStep} className="px-12 py-8 bg-[var(--theme-text)] text-[var(--theme-bg)] rounded-3xl text-sm font-black uppercase tracking-widest shadow-2xl hover:bg-[var(--theme-primary)] hover:text-white transition-all flex items-center gap-6 italic group">
                                        INITIALIZE_DATA <FiChevronRight size={22} className="group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-16">
                                <div className="grid lg:grid-cols-2 gap-16">
                                    {/* Column 1: Core Identity */}
                                    <div className="space-y-12">
                                        <div className="section-label group"><FiHash className="text-[var(--theme-primary)]" /> <span>Identity Header</span></div>
                                        <div className="space-y-10">
                                            <InputField label="DOMAIN_ALIAS" placeholder="Your master identifier" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                            <InputField label="TRANS_HUB" type="email" placeholder="nexus_link@gzonesphere.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                            <InputField label="IN_GAME_ID" placeholder="e.g. GhostOperator#1337" value={formData.inGameId} onChange={e => setFormData({ ...formData, inGameId: e.target.value })} />
                                            <InputField label="SYNC_LEVEL" placeholder="Your current rank protocol" value={formData.rank} onChange={e => setFormData({ ...formData, rank: e.target.value })} />
                                        </div>

                                        {/* Skill & Competition Declaration */}
                                        <div className="pt-10 space-y-8">
                                            <div className="section-label"><FiActivity className="text-[var(--theme-primary)]" /> <span>Competitive Level</span></div>
                                            <div className="grid grid-cols-2 gap-4">
                                                {['Beginner', 'Intermediate', 'Advanced', 'Professional'].map(l => (
                                                    <button key={l} onClick={() => setFormData({...formData, skillLevel: l})} className={`p-4 rounded-2xl border-2 text-xs font-black uppercase transition-all ${formData.skillLevel === l ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] text-white' : 'bg-[var(--theme-card)] border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:border-[var(--theme-primary)]/40'}`}>
                                                        {l}
                                                    </button>
                                                ))}
                                            </div>
                                            <TextArea label="Past Tournament History (Optional)" placeholder="LIST_PREVIOUS_ENGAGEMENTS..." value={formData.history} onChange={e => setFormData({...formData, history: e.target.value})} />
                                            <Checkbox label="I acknowledge skill-based matching may be applied." checked={formData.matchAcknowledge} onChange={() => setFormData({...formData, matchAcknowledge: !formData.matchAcknowledge})} />
                                        </div>
                                    </div>

                                    {/* Column 2: Squad & Dynamic Fields */}
                                    <div className="space-y-12">
                                        {regType === 'TEAM' && (
                                            <div className="space-y-10">
                                                <div className="section-label"><FiTerminal className="text-[var(--theme-primary)]" /> <span>Squad Manifest</span></div>
                                                <div className="relative group/field">
                                                    <label className="text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] ml-8 italic leading-none opacity-50 flex justify-between">
                                                        <span>SQUAD_CALLSIGN</span>
                                                        <span className={formData.teamName.length >= 30 ? 'text-red-500' : ''}>{formData.teamName.length}/30</span>
                                                    </label>
                                                    <input 
                                                        maxLength={30}
                                                        placeholder="ALPHA_STRIKE_FORCE"
                                                        className="w-full mt-4 px-10 py-6 bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-3xl tracking-widest font-black italic uppercase text-sm outline-none focus:border-[var(--theme-primary)]"
                                                        value={formData.teamName} 
                                                        onChange={e => setFormData({ ...formData, teamName: e.target.value })} 
                                                    />
                                                </div>
                                                
                                                <div className="bg-[var(--theme-bg-alt)] p-6 rounded-3xl border-2 border-dashed border-[var(--theme-border)] text-center text-xs font-black uppercase tracking-widest opacity-60">
                                                    Logo Upload (Optional - 200x200px recommended)
                                                </div>

                                                <div className="space-y-6">
                                                    <p className="text-xs font-black uppercase tracking-wider opacity-40 italic ml-8">Operator_Registry ({formData.members.length}/{teamSize})</p>
                                                    {formData.members.map((m, i) => (
                                                        <div key={i} className="flex gap-4 items-end">
                                                            <div className="flex-1">
                                                                <InputField label={`NODE_#${i+1}_ID`} placeholder="SEARCH_BY_USERNAME..." value={m} onChange={e => {
                                                                    const newMembers = [...formData.members];
                                                                    newMembers[i] = e.target.value;
                                                                    setFormData({ ...formData, members: newMembers });
                                                                }} />
                                                            </div>
                                                            <button onClick={() => removeMember(i)} className="w-16 h-16 bg-red-500/10 text-red-500 border-2 border-red-500/20 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all mb-1">
                                                                <FiMinusCircle size={24} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {formData.members.length < teamSize && (
                                                        <button onClick={addMember} className="w-full py-6 border-2 border-dashed border-[var(--theme-border)] rounded-2xl flex items-center justify-center gap-4 text-xs font-black uppercase tracking-widest opacity-60 hover:opacity-100 hover:border-[var(--theme-primary)] transition-all italic">
                                                            <FiPlusCircle size={20} /> ADD_TACTICAL_NODE
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Dynamic Game-Specific Fields */}
                                        {tournament?.custom_fields?.length > 0 && (
                                            <div className="space-y-10 pt-8">
                                                <div className="section-label"><FiTarget className="text-[var(--theme-primary)]" /> <span>Domain Requirements</span></div>
                                                <div className="space-y-10">
                                                    {tournament.custom_fields.map((field, idx) => (
                                                        <DynamicField key={idx} field={field} value={formData.customFields[field.label] || ''} onChange={val => handleCustomField(field.label, val)} />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-12 flex justify-between items-center">
                                    <button onClick={prevStep} className="text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors italic">REVERT_STEP</button>
                                    <button onClick={nextStep} className="px-12 py-8 bg-[var(--theme-primary)] text-white rounded-3xl text-sm font-black uppercase tracking-widest shadow-2xl shadow-[var(--theme-primary)]/30 transition-all flex items-center gap-6 italic group">
                                        VERIFY_PAYLOAD <FiChevronRight size={22} strokeWidth={3} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-16">
                                {/* Payment Section */}
                                {tournament?.entry_fee_type !== "free" && (
                                    <div className="bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-[4rem] p-12 space-y-10 overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[40px] rounded-full" />
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                            <div className="space-y-3">
                                                <div className="section-label !border-0 !p-0"><FiAward className="text-amber-500" /> <span>Bounty_Clearance</span></div>
                                                <h3 className="text-4xl font-black uppercase tracking-tighter italic text-[var(--theme-text)]">ENTRY_BOND: <span className="text-amber-500">{tournament?.entry_fee || '₹500'}</span></h3>
                                            </div>
                                            <div className="flex gap-4">
                                                {['GZS Coins', 'Pay Online (Razorpay)'].map(m => (
                                                    <button key={m} onClick={() => setFormData({...formData, paymentMethod: m})} className={`px-8 py-5 rounded-2xl border-2 text-xs font-black uppercase transition-all ${formData.paymentMethod === m ? 'bg-[var(--theme-text)] border-[var(--theme-text)] text-[var(--theme-bg)] shadow-2xl' : 'bg-[var(--theme-bg-alt)] border-[var(--theme-border)] text-gray-400 hover:border-gray-300'}`}>
                                                        {m}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-xs font-black text-amber-500/60 uppercase tracking-widest italic border-t border-[var(--theme-border)] pt-8">
                                            * REFUND POLICY: WITHDRAWALS PERMITTED UP TO 24H BEFORE TOURNAMENT START CYCLES. 10% ADMIN SHARD FEE APPLIES.
                                        </p>
                                    </div>
                                )}

                                {/* Rules Accordion & Consent */}
                                <div className="space-y-10">
                                    <div className="section-label"><FiShield className="text-[var(--theme-primary)]" /> <span>Protocol Laws</span></div>
                                    <Accordion title="FULL_ENGAGEMENT_GUIDELINES" content={tournament?.rules_summary || "NO_EXTERNAL_SCRIPTING. ACTIVE_ANTI_CHEAT_SYNC. ALL_RESULTS_ARE_FORENSICALLY_FINAL."} />
                                    
                                    <div className="space-y-6 bg-[var(--theme-card)]/40 p-10 rounded-[4rem] border-2 border-[var(--theme-border)]">
                                        <Checkbox label="I AGREE TO THE TOURNAMENT RULES" checked={formData.rulesAgreed} onChange={() => setFormData({...formData, rulesAgreed: !formData.rulesAgreed})} />
                                        <Checkbox label="I CONFIRM MY INFORMATION IS ACCURATE" checked={formData.infoAccurate} onChange={() => setFormData({...formData, infoAccurate: !formData.infoAccurate})} />
                                        <Checkbox label="I CONSENT TO MY GZS PROFILE DATA BEING USED FOR REGISTRATION" checked={formData.dataConsent} onChange={() => setFormData({...formData, dataConsent: !formData.dataConsent})} />
                                    </div>

                                    <button
                                        disabled={!canSubmit}
                                        onClick={handleFinalize}
                                        className={`w-full py-8 rounded-3xl text-sm font-black uppercase tracking-widest transition-all italic flex items-center justify-center gap-8 group ${canSubmit ? 'bg-[var(--theme-text)] text-[var(--theme-bg)] shadow-2xl hover:bg-[var(--theme-primary)] hover:text-white cursor-pointer active:scale-95' : 'bg-gray-100 border-2 border-gray-200 text-gray-300 cursor-not-allowed opacity-50'}`}
                                    >
                                        {canSubmit ? 'ESTABLISH_NEXUS_LINK' : 'PROTOCOL_CONSENT_REQUIRED'} <FiZap className={canSubmit ? 'group-hover:rotate-12 transition-transform' : ''} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center space-y-16 py-20 text-center">
                                <div className="w-48 h-48 bg-[var(--status-success)]/10 border-2 border-[var(--status-success)]/40 rounded-full flex items-center justify-center text-[var(--status-success)] text-7xl shadow-2xl shadow-[var(--status-success)]/20 animate-bounce"><FiCheck strokeWidth={4} /></div>
                                <div className="space-y-6">
                                    <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-[var(--theme-text)] leading-none">PROTOCOL_ESTABLISHED</h3>
                                    <p className="text-sm font-black text-[var(--theme-text-muted)] uppercase tracking-widest italic opacity-50">YOUR IDENTITY HAS BEEN SYNCHRONIZED WITH THE CENTRAL REGISTRY.</p>
                                </div>
                                <div className="flex flex-wrap gap-8 w-full max-w-2xl justify-center">
                                    <Link to={`/tournaments/${slug}`} className="px-12 py-6 bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] rounded-3xl text-xs font-black uppercase tracking-wider text-[var(--theme-text)] italic hover:bg-[var(--theme-card)] shadow-sm">VIEW_DOMAINS</Link>
                                    <Link to="/tournaments" className="px-12 py-6 bg-[var(--theme-text)] text-[var(--theme-bg)] rounded-3xl text-xs font-black uppercase tracking-wider italic hover:bg-[var(--theme-primary)] hover:text-white shadow-2xl">TOURNAMENT_LIST</Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

function SelectCard({ active, onClick, icon, title, desc, disabled }) {
    return (
        <button onClick={onClick} disabled={disabled} className={`p-12 rounded-[4rem] text-left transition-all group relative overflow-hidden border-2 flex flex-col gap-8 ${disabled ? 'opacity-30 grayscale cursor-not-allowed' : active ? 'bg-[var(--theme-text)] text-[var(--theme-bg)] border-transparent shadow-2xl scale-[1.03] z-10' : 'bg-[var(--theme-card)] text-[var(--theme-text)] border-[var(--theme-border)] hover:border-[var(--theme-primary)]/40 hover:bg-[var(--theme-bg-alt)]'}`}>
            <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center text-4xl shadow-inner transition-all duration-700 ${active ? 'bg-[var(--theme-primary)] text-white' : 'bg-[var(--theme-bg-alt)] opacity-60'}`}>{React.cloneElement(icon, { strokeWidth: 2.5 })}</div>
            <div className="space-y-4"><h4 className="text-3xl font-black uppercase tracking-tighter italic leading-none">{title}</h4><p className={`text-sm italic font-bold leading-relaxed uppercase tracking-wider opacity-60`}>{desc}</p></div>
            {active && <div className="absolute top-10 right-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/20"><FiCheck strokeWidth={4} size={20} /></div>}
        </button>
    );
}

function InputField({ label, placeholder, type = 'text', value, onChange, icon }) {
    return (
        <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] ml-8 italic leading-none opacity-50">{label}</label>
            <div className="relative group/field">
                <input type={type} placeholder={placeholder} className="w-full px-10 py-6 bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-3xl text-base font-black text-[var(--theme-text)] placeholder-[var(--theme-text-muted)]/20 outline-none focus:border-[var(--theme-primary)]/40 hover:border-[var(--theme-primary)]/20 transition-all italic tracking-widest shadow-inner group-hover/field:shadow-md" value={value} onChange={onChange} />
                {icon && <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] opacity-20">{icon}</div>}
            </div>
        </div>
    );
}

function TextArea({ label, placeholder, value, onChange }) {
    return (
        <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] ml-8 italic leading-none opacity-50">{label}</label>
            <textarea placeholder={placeholder} className="w-full px-10 py-6 bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-3xl text-base font-black text-[var(--theme-text)] placeholder-[var(--theme-text-muted)]/20 outline-none focus:border-[var(--theme-primary)]/40 min-h-[120px] transition-all italic tracking-widest shadow-inner" value={value} onChange={onChange} />
        </div>
    );
}

function Checkbox({ label, checked, onChange }) {
    return (
        <button onClick={onChange} className="flex items-center gap-6 group cursor-pointer w-full p-6 hover:bg-[var(--theme-bg-alt)] rounded-3xl transition-all border-2 border-transparent hover:border-[var(--theme-border)]">
            <div className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 ${checked ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] shadow-2xl rotate-12' : 'border-[var(--theme-border)] bg-[var(--theme-card)]'}`}>{checked && <FiCheck strokeWidth={5} size={18} className="text-white" />}</div>
            <span className="text-sm font-black uppercase tracking-wide text-[var(--theme-text-muted)] group-hover:text-[var(--theme-text)] italic text-left">{label}</span>
        </button>
    );
}

function DynamicField({ field, value, onChange }) {
    const { label, type, placeholder, required } = field;
    const labelText = `${label}${required ? ' *' : ''}`;
    if (type === 'checkbox') return <Checkbox label={labelText} checked={value} onChange={() => onChange(!value)} />;
    return <InputField label={labelText} placeholder={placeholder} type={type === 'number' ? 'number' : 'text'} value={value} onChange={e => onChange(e.target.value)} />;
}

function Accordion({ title, content }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-2 border-[var(--theme-border)] rounded-3xl overflow-hidden bg-[var(--theme-card)] shadow-sm">
            <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-8 text-sm font-black uppercase tracking-wider italic text-[var(--theme-text)] hover:bg-[var(--theme-bg-alt)] transition-all">
                {title} {open ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="p-10 bg-[var(--theme-bg-alt)]/50 border-t-2 border-dashed border-[var(--theme-border)] text-xs font-black uppercase tracking-tight italic text-[var(--theme-text-muted)] leading-relaxed">
                            {content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}








