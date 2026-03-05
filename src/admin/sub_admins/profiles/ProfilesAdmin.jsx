import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiEye, FiCheckCircle, FiXCircle, FiTrash2, FiUser, FiAward, FiActivity, FiX, FiExternalLink, FiSend } from 'react-icons/fi';
import { mockApiService } from '@services/mockApiService';

/* ── Sub-components ──────────────────────────────────────── */
function StatusBadge({ status }) {
    const MAP = {
        Active: 'bg-green-100/50 text-green-700 border-green-100',
        Approved: 'bg-green-100/50 text-green-700 border-green-100',
        'Pending Review': 'bg-yellow-100/50 text-yellow-700 border-yellow-100',
        Pending: 'bg-yellow-100/50 text-yellow-700 border-yellow-100',
        Suspended: 'bg-red-50 text-red-600 border-red-100',
        Rejected: 'bg-red-50 text-red-600 border-red-100',
        Deleted: 'bg-neutral-100 text-neutral-500 border-neutral-200',
    };
    return (
        <span className={`admin-badge ${MAP[status] ?? 'bg-neutral-100 text-neutral-500'}`}>
            {status}
        </span>
    );
}

/* ── Rejection Modal ─────────────────────────────────────── */
function RejectionModal({ onConfirm, onClose }) {
    const [reason, setReason] = useState("");
    return (
        <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[250] animate-[fadeIn_0.2s_ease-out]" onClick={onClose} />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white rounded-[2.5rem] p-10 z-[260] shadow-2xl animate-[scaleIn_0.3s_ease-out]">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                    <FiXCircle className="text-red-500" size={24} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-red-600 mb-2">Rejection Payload</h3>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-6 leading-relaxed">Broadcast a valid justification to the user regarding the invalidity of their submission.</p>
                <textarea
                    className="w-full h-32 p-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-xs font-medium outline-none focus:border-red-400 mb-8 resize-none transition-colors"
                    placeholder="e.g. Please provide a link that isn't private. / Resolution is too low."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
                <div className="flex gap-4">
                    <button className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest border border-neutral-200 rounded-2xl hover:bg-neutral-50 transition-all" onClick={onClose}>CANCEL</button>
                    <button
                        className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest bg-red-600 text-white rounded-2xl shadow-xl shadow-red-600/20 disabled:opacity-50 transition-all hover:-translate-y-1"
                        disabled={!reason.trim()}
                        onClick={() => { onConfirm(reason); onClose(); }}
                    >
                        CONFIRM REJECTION
                    </button>
                </div>
            </div>
        </>
    )
}

/* ── Tab Components ──────────────────────────────────────── */
function UsersTab({ users }) {
    const queryClient = useQueryClient();
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => mockApiService.updateUser(id, data),
        onSuccess: () => queryClient.invalidateQueries(['admin', 'profiles', 'users'])
    });
    const deleteMutation = useMutation({
        mutationFn: mockApiService.deleteUser,
        onSuccess: () => queryClient.invalidateQueries(['admin', 'profiles', 'users'])
    });

    return (
        <div className="admin-list-card">
            <div className="admin-list-header p-8 border-b border-neutral-50">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">IDENTITY REGISTRY</span>
            </div>
            <div className="overflow-x-auto">
                <table className="admin-table">
                    <thead>
                        <tr className="bg-neutral-50/50"><th>#ID</th><th>User Entity</th><th>Specialization</th><th>Initialized</th><th>Status</th><th className="text-right pr-8">Actions</th></tr>
                    </thead>
                    <tbody>
                        {users.map(row => (
                            <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                                <td className="text-[10px] font-mono text-neutral-400 opacity-60 pl-8">#US-{row.id}</td>
                                <td className="font-bold text-xs text-[var(--theme-text)]"><div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-[8px] text-neutral-400 font-black">?</div>{row.user}</div></td>
                                <td className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{row.type}</td>
                                <td className="text-[10px] font-bold text-neutral-400">{row.created}</td>
                                <td><StatusBadge status={row.status} /></td>
                                <td className="pr-8">
                                    <div className="flex gap-2 justify-end">
                                        <button className="admin-action-btn" title="View"><FiEye size={12} /></button>
                                        <button onClick={() => updateMutation.mutate({ id: row.id, data: { status: 'Active' } })} className="admin-action-btn !text-green-600 !border-green-100" title="Activate"><FiCheckCircle size={12} /></button>
                                        <button onClick={() => { if (window.confirm("Delete user?")) deleteMutation.mutate(row.id) }} className="admin-action-btn delete" title="Purge"><FiTrash2 size={12} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function OrganizationsTab({ orgs }) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: mockApiService.deleteOrganization,
        onSuccess: () => queryClient.invalidateQueries(['admin', 'profiles', 'orgs'])
    });

    return (
        <div className="admin-list-card">
            <div className="admin-list-header p-8 border-b border-neutral-50">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">ORGANIZATION MANIFEST</span>
            </div>
            <div className="overflow-x-auto">
                <table className="admin-table">
                    <thead>
                        <tr className="bg-neutral-50/50"><th>#ID</th><th>Corporate Entity</th><th>Industry Sector</th><th>Initialized</th><th>Status</th><th className="text-right pr-8">Actions</th></tr>
                    </thead>
                    <tbody>
                        {orgs.map(row => (
                            <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                                <td className="text-[10px] font-mono text-neutral-400 opacity-60 pl-8">#OR-{row.id}</td>
                                <td className="font-bold text-xs text-[var(--theme-text)]">{row.name}</td>
                                <td className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{row.industry}</td>
                                <td className="text-[10px] font-bold text-neutral-400">{row.created}</td>
                                <td><StatusBadge status={row.status} /></td>
                                <td className="pr-8">
                                    <div className="flex gap-2 justify-end">
                                        <button className="admin-action-btn"><FiEye size={12} /></button>
                                        <button onClick={() => { if (window.confirm("Delete organization?")) deleteMutation.mutate(row.id) }} className="admin-action-btn delete"><FiTrash2 size={12} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function SkillProofsTab({ onReview, proofList }) {
    const queryClient = useQueryClient();
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => mockApiService.updateSkillProof(id, data),
        onSuccess: () => queryClient.invalidateQueries(['admin', 'profiles', 'proofs'])
    });

    return (
        <div className="admin-list-card animate-[fadeIn_0.3s_ease-out]">
            <div className="admin-list-header p-8 border-b border-neutral-50 flex items-center justify-between">
                <div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">VERIFICATION QUEUE</span>
                    <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Pending Validation Checks</p>
                </div>
                <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg shadow-indigo-600/20" onClick={() => alert('Bulk approval would go here')}>AUTO-VALIDATE QUEUE</button>
            </div>
            <div className="overflow-x-auto">
                <table className="admin-table">
                    <thead>
                        <tr className="bg-neutral-50/50"><th>Operator</th><th>Skill Protocol</th><th>Layer</th><th>Evidence Type</th><th>Submitted</th><th>Status</th><th className="text-right pr-8">Actions</th></tr>
                    </thead>
                    <tbody>
                        {proofList.map(row => (
                            <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                                <td className="font-bold text-xs pl-8">{row.user}</td>
                                <td>
                                    <div className="text-xs font-black text-neutral-800">{row.skill}</div>
                                    <div className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">{row.group}</div>
                                </td>
                                <td className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{row.subType}</td>
                                <td className="text-[10px] text-indigo-900 font-black tracking-widest uppercase">{row.proofType}</td>
                                <td className="text-[10px] font-bold text-neutral-400">{row.submitted}</td>
                                <td><StatusBadge status={row.status} /></td>
                                <td className="pr-8">
                                    <div className="flex gap-2 justify-end">
                                        <button className="admin-action-btn" title="Inspect Proof" onClick={() => onReview(row)}><FiEye size={12} /></button>
                                        {row.status === 'Pending Review' && (
                                            <>
                                                <button className="admin-action-btn !text-green-600 !border-green-100 hover:!bg-green-50" onClick={() => updateMutation.mutate({ id: row.id, data: { status: 'Approved' } })}><FiCheckCircle size={12} /></button>
                                                <button className="admin-action-btn delete" onClick={() => onReview({ ...row, actionType: 'reject' })}><FiXCircle size={12} /></button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ProofDrawer({ proof, onClose, onApprove, onReject }) {
    if (!proof) return null;
    return (
        <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] animate-[fadeIn_0.2s_ease-out]" onClick={onClose} />
            <div className="fixed right-0 top-0 h-full w-[450px] bg-white z-[210] shadow-2xl flex flex-col animate-[slideInRight_0.4s_cubic-bezier(0.2,0.8,0.2,1)]">
                <div className="px-10 py-8 border-b flex items-center justify-between bg-neutral-50">
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">Validation Interface</h3>
                        <p className="text-[9px] text-indigo-600 font-black uppercase tracking-widest mt-1">Classification: {proof.subType}</p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-neutral-200 transition-colors flex items-center justify-center"><FiX size={20} /></button>
                </div>
                <div className="flex-1 p-10 space-y-10 overflow-y-auto">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 block">SUBJECT IDENTITY</label>
                        <p className="text-sm font-black text-neutral-900 flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600"><FiUser size={14} /></div> {proof.user}</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 block">SKILL CLASSIFICATION</label>
                        <p className="text-xs font-bold text-neutral-800 bg-neutral-50 px-4 py-3 rounded-2xl border border-neutral-100">{proof.skill} <span className="text-[10px] text-neutral-400 font-black mx-2">—</span> {proof.group}</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 block">EVIDENCE MANIFEST</label>
                        <div className="p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-50 border-dashed">
                            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs font-black text-indigo-600 flex items-center gap-3 hover:translate-x-1 transition-transform group">
                                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center"><FiAward size={18} /></div> Inspect Secure Payload <FiExternalLink size={14} className="opacity-40 group-hover:opacity-100" />
                            </a>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 block">SYSTEM NOTES</label>
                        <p className="text-xs text-neutral-500 leading-[1.8] font-medium italic bg-neutral-50 p-6 rounded-[2rem] border border-neutral-100">
                            "Subject demonstrates multi-dimensional competence in verified domains. Link-layer verification confirms authenticity of digital assets associated with this profile signature."
                        </p>
                    </div>
                </div>
                {proof.status === 'Pending Review' && (
                    <div className="p-10 border-t bg-neutral-50/50 flex gap-4">
                        <button className="flex-1 py-4 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-1" onClick={() => { onApprove(proof.id, 'Approved'); onClose(); }}>VALIDATE ENTRY</button>
                        <button className="flex-1 py-4 border-2 border-red-50 text-red-600 hover:bg-red-50 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all" onClick={() => onReject(proof)}>REJECT PAYLOAD</button>
                    </div>
                )}
            </div>
        </>
    );
}

/* ── Main Component ──────────────────────────────────────── */
export default function ProfilesAdmin({ defaultTab = 'users' }) {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [reviewProof, setReviewProof] = useState(null);
    const [rejectProof, setRejectProof] = useState(null);

    // Queries
    const { data: users = [], isLoading: loadingUsers } = useQuery({ queryKey: ['admin', 'profiles', 'users'], queryFn: mockApiService.getAllUsers, enabled: activeTab === 'users' });
    const { data: orgs = [], isLoading: loadingOrgs } = useQuery({ queryKey: ['admin', 'profiles', 'orgs'], queryFn: mockApiService.getAllOrganizations, enabled: activeTab === 'orgs' });
    const { data: proofs = [], isLoading: loadingProofs } = useQuery({ queryKey: ['admin', 'profiles', 'proofs'], queryFn: mockApiService.getAllSkillProofs, enabled: activeTab === 'proofs' });
    const { data: activities = [], isLoading: loadingActivity } = useQuery({ queryKey: ['admin', 'profiles', 'activities'], queryFn: mockApiService.getAllActivity, enabled: activeTab === 'activity' });

    // Mutations
    const updateProofMutation = useMutation({
        mutationFn: ({ id, data }) => mockApiService.updateSkillProof(id, data),
        onSuccess: () => queryClient.invalidateQueries(['admin', 'profiles', 'proofs'])
    });

    const deleteActivityMutation = useMutation({
        mutationFn: mockApiService.deleteActivity,
        onSuccess: () => queryClient.invalidateQueries(['admin', 'profiles', 'activities'])
    });

    const stats = {
        users: users.length,
        orgs: orgs.length,
        pendingProofs: proofs.filter(p => p.status === 'Pending Review' || p.status === 'Pending').length,
        verifications: proofs.filter(p => p.status === 'Approved').length,
    };

    if (isLoading) return <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest text-xs">SYNCHRONIZING WORLD IDENTITIES...</div>;

    return (
        <div className="animate-[fadeIn_0.5s_ease-out] space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-6">
                <div>
                    <h1 className="text-3xl font-black text-neutral-900 tracking-tighter uppercase italic leading-none mb-1">PROFILES MANAGEMENT</h1>
                    <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full animate-pulse" /> Identity Hub // Authority Registry
                    </p>
                </div>
            </div>

            {/* --- QUICK STATS --- */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Individual Entities", val: stats.users, color: "bg-indigo-50 text-indigo-600" },
                    { label: "Corporate Bodies", val: stats.orgs, color: "bg-purple-50 text-purple-600" },
                    { label: "Skill Validations", val: stats.verifications, color: "bg-green-50 text-green-600" },
                    { label: "Verification Queue", val: stats.pendingProofs, color: "bg-yellow-50 text-yellow-600", urgent: stats.pendingProofs > 0 },
                ].map((s, i) => (
                    <div key={i} className={`bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group ${s.urgent ? 'ring-2 ring-yellow-400/20' : ''}`}>
                        <div className={`text-2xl font-black mb-1 ${s.urgent ? 'text-yellow-600' : 'text-neutral-900'}`}>{s.val}</div>
                        <div className="text-[9px] uppercase font-black tracking-widest text-neutral-400 flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${s.color.split(' ')[0]}`} /> {s.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Tab Bar */}
            <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-none no-scrollbar">
                {[
                    { id: 'users', icon: <FiUser />, label: 'INDIVIDUALS' },
                    { id: 'orgs', icon: <FiSend />, label: 'ORGANIZATIONS' },
                    { id: 'proofs', icon: <FiAward />, label: 'VERIFICATIONS' },
                    { id: 'activity', icon: <FiActivity />, label: 'LOGS' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`whitespace-nowrap flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'}`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'users' && <UsersTab users={users} />}
            {activeTab === 'orgs' && <OrganizationsTab orgs={orgs} />}
            {activeTab === 'proofs' && <SkillProofsTab onReview={(p) => p.actionType === 'reject' ? setRejectProof(p) : setReviewProof(p)} proofList={proofs} />}
            {activeTab === 'activity' && (
                <div className="admin-list-card animate-[fadeIn_0.3s_ease-out]">
                    <div className="admin-list-header p-8 border-b border-neutral-50 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600"><FiActivity size={18} /></div>
                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">ACTIVITY MODERATION</span>
                            <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Real-time Interaction Logs</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="admin-table">
                            <thead><tr className="bg-neutral-50/50"><th className="pl-8">Subject</th><th>Interaction Payload</th><th>Vector</th><th>Timestamp</th><th>Signal</th><th className="text-right pr-8">Actions</th></tr></thead>
                            <tbody>
                                {activities.length === 0 ? (
                                    <tr><td colSpan="6" className="text-center py-32 text-neutral-300 text-[10px] font-black uppercase tracking-[0.2em] italic opacity-40">Zero Activity Streams Detected</td></tr>
                                ) : activities.map(row => (
                                    <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                                        <td className="font-bold text-xs pl-8">{row.user}</td>
                                        <td className="text-xs font-medium text-neutral-500 italic">"{row.content}"</td>
                                        <td className="text-[10px] font-black text-indigo-500 tracking-widest uppercase">{row.profile}</td>
                                        <td className="text-[10px] font-bold text-neutral-400">{row.date}</td>
                                        <td><StatusBadge status={row.status} /></td>
                                        <td className="pr-8 text-right"><button className="admin-action-btn delete" onClick={() => { if (window.confirm("Delete record?")) deleteActivityMutation.mutate(row.id) }}><FiTrash2 size={12} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <ProofDrawer
                proof={reviewProof}
                onClose={() => setReviewProof(null)}
                onApprove={(id, status) => updateProofMutation.mutate({ id, data: { status } })}
                onReject={(p) => { setReviewProof(null); setRejectProof(p); }}
            />

            {rejectProof && (
                <RejectionModal
                    onConfirm={(reason) => updateProofMutation.mutate({ id: rejectProof.id, data: { status: 'Rejected', rejectionReason: reason } })}
                    onClose={() => setRejectProof(null)}
                />
            )}
        </div>
    );
}

