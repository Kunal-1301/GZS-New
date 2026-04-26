import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiBell, FiBriefcase, FiUsers, FiTrendingUp, FiShield, FiArrowRight, FiActivity } from 'react-icons/fi';

const NOTIFICATION_TYPE_ICONS = {
    verification: FiCheckCircle,
    hire: FiBriefcase,
    community: FiUsers,
    career: FiTrendingUp,
    trust: FiShield,
};

const MOCK_NOTIFICATIONS = [
    { id: 1, type: 'verification', title: 'Identity Shard Verified', body: 'Your portfolio proof for Environment Art has been successfully synchronized and verified.', time: '2M AGO', read: false, to: '/settings/trust' },
    { id: 2, type: 'hire', title: 'Nexus Invite Received', body: 'NeonStudios has requested an interface bridge for the UI Systems Architect position.', time: '1H AGO', read: false, to: '/company' },
    { id: 3, type: 'community', title: 'Broadcast Transmission', body: 'SoundForgeX replied in the Audio Design channel: "Great point on adaptive layering..."', time: '3H AGO', read: true, to: '/community/audio/channels/audio-design' },
    { id: 4, type: 'trust', title: 'Protocol Proof Pending', body: 'Your Game Development proof is currently undergoing Truth Protocol validation.', time: '5H AGO', read: true, to: '/settings/trust' },
    { id: 5, type: 'career', title: 'System Optimization', body: 'Integrating UE5 C++ Optimization to your profile would strengthen your Game Dev facade.', time: '1D AGO', read: true, to: '/profile/dev' },
    { id: 6, type: 'community', title: 'Branch Operation Start', body: 'A community operation in the Esports branch initializes in 120 minutes.', time: '2D AGO', read: true, to: '/community/esports/events' },
];

export default function NotificationInbox() {
    const navigate = useNavigate();
    const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

    return (
        <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-body selection:bg-[var(--theme-primary)]/30 pb-32">
            <main className="max-w-4xl mx-auto px-6 pt-32 space-y-16">
                
                {/* ── HEADER ── */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-[var(--theme-border)] pb-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-[var(--theme-primary)] rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]" />
                            <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] opacity-40 italic">Notification Hub</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.85]">Incoming <br/><span className="text-[var(--theme-text-muted)] opacity-20">Broadcasts</span></h1>
                    </div>

                    <div className="flex items-center gap-6">
                        {unreadCount > 0 && (
                            <div className="px-6 py-3 bg-[var(--theme-primary)] text-white text-xs font-black uppercase tracking-widest rounded-full shadow-2xl shadow-[var(--theme-primary)]/20 italic">
                                {unreadCount} ACTIVE NOTIFICATIONS
                            </div>
                        )}
                        <button
                            onClick={() => navigate('/settings/notifications')}
                            className="w-12 h-12 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-all shadow-sm"
                        >
                            <FiActivity size={20} />
                        </button>
                    </div>
                </header>

                {/* ── BROADCAST FEED ── */}
                <div className="space-y-6">
                    {MOCK_NOTIFICATIONS.length === 0 ? (
                        <div className="py-40 text-center bg-[var(--theme-card)] rounded-[4rem] border border-[var(--theme-border)] opacity-30 grayscale flex flex-col items-center justify-center space-y-8">
                            <FiBell size={64} className="text-[var(--theme-text-muted)]" />
                            <div className="space-y-2">
                                <p className="text-2xl font-black uppercase italic tracking-tighter">Silence in the Sphere</p>
                                <p className="text-xs font-black uppercase tracking-widest">Awaiting first frequency match.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {MOCK_NOTIFICATIONS.map(notif => {
                                const Icon = NOTIFICATION_TYPE_ICONS[notif.type] || FiBell;
                                return (
                                    <button
                                        key={notif.id}
                                        onClick={() => navigate(notif.to)}
                                        className={`w-full flex items-start gap-8 p-8 rounded-3xl border text-left transition-all relative group overflow-hidden ${
                                            !notif.read
                                                ? 'bg-[var(--theme-primary)]/5 border-[var(--theme-primary)]/20 hover:bg-[var(--theme-primary)]/10'
                                                : 'bg-[var(--theme-card)] border-[var(--theme-border)] hover:bg-[var(--theme-bg-alt)] hover:border-[var(--theme-primary)]/20'
                                        }`}
                                    >
                                        {!notif.read && (
                                            <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-[var(--theme-primary)] rounded-full shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.8)]" />
                                        )}
                                        
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                                            !notif.read 
                                                ? 'bg-[var(--theme-primary)] text-white shadow-xl shadow-[var(--theme-primary)]/20' 
                                                : 'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] border border-[var(--theme-border)]'
                                        }`}>
                                            <Icon size={22} strokeWidth={2.5} />
                                        </div>

                                        <div className="flex-1 min-w-0 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h3 className={`text-xl font-black uppercase tracking-tighter italic ${!notif.read ? 'text-[var(--theme-text)]' : 'text-[var(--theme-text-muted)]'}`}>
                                                    {notif.title}
                                                </h3>
                                                <span className="text-xs font-black text-[var(--theme-text-muted)] opacity-40 uppercase tracking-wider italic flex items-center gap-2">
                                                    <FiClock size={10} /> {notif.time}
                                                </span>
                                            </div>
                                            <p className={`text-sm leading-relaxed italic ${!notif.read ? 'text-[var(--theme-text)] font-semibold' : 'text-[var(--theme-text-muted)] font-medium opacity-60'}`}>
                                                {notif.body}
                                            </p>
                                            <div className="pt-2 flex items-center gap-4">
                                                <span className="text-xs font-black uppercase tracking-widest text-[var(--theme-primary)] opacity-0 group-hover:opacity-100 transition-opacity italic flex items-center gap-2">
                                                    ACCESS PROTOCOL <FiArrowRight />
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Background Artifact for Unread */}
                                        {!notif.read && (
                                            <div className="absolute bottom-[-20%] right-[-5%] w-32 h-32 bg-[var(--theme-primary)] opacity-5 blur-[40px] rounded-full pointer-events-none" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

        </div>
    );
}








