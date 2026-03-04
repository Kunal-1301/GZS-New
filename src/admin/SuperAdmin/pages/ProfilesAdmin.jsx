import { useState } from 'react';
import { FiEye, FiCheckCircle, FiXCircle, FiTrash2, FiUser, FiAward, FiActivity, FiX, FiExternalLink, FiSend } from 'react-icons/fi';

/* ── Dummy Data ──────────────────────────────────────────── */
const USERS = [
    { id: 'U1', user: 'khali_gaming', type: 'Game Creation', created: '2026-03-01', status: 'Active' },
    { id: 'U2', user: 'art_wizard', type: 'Art & Design', created: '2026-03-02', status: 'Active' },
    { id: 'U3', user: 'dev_pro', type: 'Programming', created: '2026-03-04', status: 'Pending' },
    { id: 'U4', user: 'music_man', type: 'Music & Audio', created: '2026-02-28', status: 'Suspended' },
];

const PROOFS = [
    { id: 'P1', user: 'khali_gaming', subType: 'Game Creation', group: 'Unity', skill: 'C# Scripting', proofType: 'GitHub Link', submitted: '1 Hr Ago', status: 'Pending Review' },
    { id: 'P2', user: 'art_wizard', subType: 'Art & Design', group: '2D Art', skill: 'Character Sprites', proofType: 'Asset File', submitted: '3 Hrs Ago', status: 'Pending Review' },
    { id: 'P3', user: 'khali_gaming', subType: 'Game Creation', group: 'Level Design', skill: 'Greyboxing', proofType: 'Portfolio Link', submitted: '2 Days Ago', status: 'Approved' },
];

const ACTIVITY = [
    { id: 'A1', user: 'khali_gaming', content: 'Added a new skill: Character Design', profile: 'Art & Design', date: '2 Hrs Ago', status: 'Active' },
    { id: 'A2', user: 'gamer_1', content: 'Verified skill: Unity Engine', profile: 'Game Creation', date: '1 Day Ago', status: 'Deleted' },
];

/* ── Sub-components ──────────────────────────────────────── */
function StatusBadge({ status }) {
    const MAP = {
        Active: 'bg-green-100 text-green-800',
        Approved: 'bg-green-100 text-green-800',
        'Pending Review': 'bg-yellow-100 text-yellow-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Suspended: 'bg-red-50 text-red-600',
        Rejected: 'bg-red-50 text-red-600',
        Deleted: 'bg-neutral-100 text-neutral-500',
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
            <div className="fixed inset-0 bg-black/50 z-[200]" onClick={onClose} />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-2xl p-6 z-[210] shadow-2xl animate-[scaleIn_0.2s_ease]">
                <h3 className="text-sm font-black uppercase tracking-widest text-red-600 mb-2">Rejection Reason</h3>
                <p className="text-[10px] text-gray-500 mb-4">Explain to the user why their skill proof was rejected. This will be shown on their dashboard.</p>
                <textarea
                    className="w-full h-24 p-3 bg-gray-50 border rounded-xl text-xs outline-none focus:border-red-400 mb-6 resize-none"
                    placeholder="e.g. Please provide a link that isn't private. / Resolution is too low."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
                <div className="flex gap-3">
                    <button className="flex-1 py-2 text-xs font-bold border rounded-lg" onClick={onClose}>CANCEL</button>
                    <button
                        className="flex-1 py-2 text-xs font-bold bg-red-600 text-white rounded-lg disabled:opacity-50"
                        disabled={!reason.trim()}
                        onClick={() => { onConfirm(reason); onClose(); }}
                    >
                        CONFIRM REJECT
                    </button>
                </div>
            </div>
        </>
    )
}

/* ── Tab Components ──────────────────────────────────────── */
function UsersTab() {
    return (
        <div className="admin-list-card">
            <div className="admin-list-header">
                <span className="admin-list-title">USER PROFILES</span>
                <div className="flex gap-2">
                    <button className="admin-filter-btn">Filter: All</button>
                    <button className="admin-filter-btn">Sort: Newest</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="admin-table">
                    <thead>
                        <tr><th>ID</th><th>User</th><th>Main Sub-Profile</th><th>Created</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {USERS.map(row => (
                            <tr key={row.id}>
                                <td className="text-xs text-[var(--theme-text-muted)]">{row.id}</td>
                                <td className="font-bold text-[var(--theme-text)]">{row.user}</td>
                                <td className="text-xs uppercase tracking-wider font-black text-indigo-500">{row.type}</td>
                                <td className="text-xs text-[var(--theme-text-muted)]">{row.created}</td>
                                <td><StatusBadge status={row.status} /></td>
                                <td>
                                    <div className="flex gap-1">
                                        <button className="admin-action-btn"><FiEye size={13} /></button>
                                        <button className="admin-action-btn delete"><FiTrash2 size={13} /></button>
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

function SkillProofsTab({ onReview, proofList, handleAction }) {
    return (
        <div className="admin-list-card">
            <div className="admin-list-header">
                <span className="admin-list-title">SKILL PROOF APPROVALS</span>
                <div className="flex gap-2">
                    <button className="admin-btn-primary py-1 px-4 text-[10px]">BULK APPROVE</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="admin-table">
                    <thead>
                        <tr><th>User</th><th>Skill</th><th>Type</th><th>Proof</th><th>Submitted</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {proofList.map(row => (
                            <tr key={row.id}>
                                <td className="font-semibold">{row.user}</td>
                                <td>
                                    <div className="text-xs font-bold">{row.skill}</div>
                                    <div className="text-[10px] text-[var(--theme-text-muted)]">{row.group}</div>
                                </td>
                                <td className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{row.subType}</td>
                                <td className="text-xs text-indigo-600 font-bold">{row.proofType}</td>
                                <td className="text-[10px] text-[var(--theme-text-muted)]">{row.submitted}</td>
                                <td><StatusBadge status={row.status} /></td>
                                <td>
                                    <div className="flex gap-1">
                                        <button className="admin-action-btn" title="View Proof" onClick={() => onReview(row)}><FiEye size={13} /></button>
                                        {row.status === 'Pending Review' && (
                                            <>
                                                <button className="admin-action-btn !text-green-600 hover:!bg-green-50" onClick={() => handleAction(row.id, 'Approved')}><FiCheckCircle size={13} /></button>
                                                <button className="admin-action-btn delete" onClick={() => onReview({ ...row, actionType: 'reject' })}><FiXCircle size={13} /></button>
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
            <div className="fixed inset-0 bg-black/30 z-[100]" onClick={onClose} />
            <div className="fixed right-0 top-0 h-full w-96 bg-white z-[110] shadow-2xl border-l border-[var(--theme-border)] flex flex-col">
                <div className="px-6 py-5 border-b flex items-center justify-between bg-indigo-600 text-white">
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest">Review Skill Proof</h3>
                        <p className="text-[10px] text-white/70">Sub-Profile: {proof.subType}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><FiX size={18} /></button>
                </div>
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">User</label>
                        <p className="text-xs font-bold text-gray-900 flex items-center gap-1.5"><FiUser size={12} /> {proof.user}</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Skill</label>
                        <p className="text-xs font-bold text-gray-900">{proof.skill} ({proof.group})</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Proof Link / Evidence</label>
                        <div className="p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <a href="#" className="text-xs font-bold text-indigo-600 flex items-center gap-2 hover:underline">
                                <FiAward size={14} /> View Submitted Work <FiExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Description</label>
                        <p className="text-xs text-gray-600 leading-relaxed italic">
                            "The user has provided a link to their GitHub repository showing the C# scripts used in this character controller project. This proof demonstrates advanced knowledge of physics and delegate systems."
                        </p>
                    </div>
                </div>
                {proof.status === 'Pending Review' && (
                    <div className="p-6 border-t bg-gray-50 flex gap-4">
                        <button className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg transition-transform hover:scale-[1.02]" onClick={() => { onApprove(proof.id); onClose(); }}>APPROVE</button>
                        <button className="flex-1 py-3 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-black uppercase tracking-widest rounded-xl transition-transform hover:scale-[1.02]" onClick={() => onReject(proof)}>REJECT</button>
                    </div>
                )}
            </div>
        </>
    );
}

/* ── Main Component ──────────────────────────────────────── */
export default function ProfilesAdmin({ defaultTab = 'users' }) {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [reviewProof, setReviewProof] = useState(null);
    const [rejectProof, setRejectProof] = useState(null);
    const [proofList, setProofList] = useState(PROOFS);

    const handleAction = (id, status) => {
        setProofList(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="admin-page-title mb-0">PROFILES MANAGEMENT</h1>
            </div>

            {/* Tab Bar */}
            <div className="flex gap-4 mb-8">
                <button onClick={() => setActiveTab('users')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black transition-all ${activeTab === 'users' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-50'}`}><FiUser size={14} /> USERS</button>
                <button onClick={() => setActiveTab('proofs')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black transition-all ${activeTab === 'proofs' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-50'}`}><FiAward size={14} /> SKILL PROOFS</button>
                <button onClick={() => setActiveTab('activity')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black transition-all ${activeTab === 'activity' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-50'}`}><FiActivity size={14} /> ACTIVITY</button>
            </div>

            {activeTab === 'users' && <UsersTab />}
            {activeTab === 'proofs' && <SkillProofsTab onReview={(p) => p.actionType === 'reject' ? setRejectProof(p) : setReviewProof(p)} proofList={proofList} handleAction={handleAction} />}
            {activeTab === 'activity' && (
                <div className="admin-list-card">
                    <div className="admin-list-header text-[var(--theme-text)]"><FiActivity size={16} /> ACTIVITY MODERATION</div>
                    <div className="overflow-x-auto">
                        <table className="admin-table">
                            <thead><tr><th>User</th><th>Content</th><th>Profile</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                            <tbody>
                                {ACTIVITY.map(row => (
                                    <tr key={row.id}>
                                        <td className="font-bold">{row.user}</td>
                                        <td className="text-xs italic">"{row.content}"</td>
                                        <td className="text-[10px] font-black text-indigo-500">{row.profile}</td>
                                        <td className="text-[10px]">{row.date}</td>
                                        <td><StatusBadge status={row.status} /></td>
                                        <td><button className="admin-action-btn delete"><FiTrash2 size={13} /></button></td>
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
                onApprove={handleAction}
                onReject={(p) => { setReviewProof(null); setRejectProof(p); }}
            />

            {rejectProof && (
                <RejectionModal
                    onConfirm={(reason) => handleAction(rejectProof.id, 'Rejected')}
                    onClose={() => setRejectProof(null)}
                />
            )}
        </div>
    );
}
