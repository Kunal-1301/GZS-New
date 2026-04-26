import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessages } from '@/services/mutators/useMessages';
import { motion } from 'framer-motion';

const MOCK_CONVOS = [
    { id: '1', name: 'CYBER_WOLF', msg: 'The tournament sync is live.', time: '2M', unread: 2, online: true, tech: 'SOLO' },
    { id: '2', name: 'NEON_GHOST', msg: 'Assets transmitted. Verify.', time: '1H', unread: 0, online: false, tech: 'SQUAD' },
    { id: 'admin', name: 'GZONE_SYSTEM', msg: 'Welcome to the platform sync.', time: '1D', unread: 0, online: true, tech: 'CORE' },
    { id: '4', name: 'PHANTOM_OPER', msg: 'LFG for Tactical Cup?', time: '3H', unread: 1, online: true, tech: 'SOLO' },
];

export default function ConversationsList({ activeId }) {
    const navigate = useNavigate();
    const { useGetConversations } = useMessages();
    const { data: conversations, isLoading } = useGetConversations();

    const displayList = (conversations?.length > 0 ? conversations : MOCK_CONVOS);

    return (
        <div className="flex flex-col">
            {isLoading ? (
                <div className="p-10 flex flex-col gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-[var(--theme-bg-alt)] rounded-3xl animate-pulse" />)}
                </div>
            ) : (
                displayList.map((conv, i) => {
                    const id = conv.id || conv.userId;
                    const isActive = activeId === id;
                    
                    return (
                        <motion.button
                            key={id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => navigate(`/messages/${id}`)}
                            className={`
                                px-10 py-8 flex items-center gap-6 text-left border-b border-[var(--theme-border)] transition-all group relative
                                ${isActive ? 'bg-[var(--theme-primary)]/5' : 'hover:bg-[var(--theme-bg-alt)]/50'}
                            `}
                        >
                            {/* Active Indicator Bar */}
                            {isActive && (
                                <motion.div 
                                    layoutId="active-bar"
                                    className="absolute left-0 top-6 bottom-6 w-1 bg-[var(--theme-primary)] rounded-full shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.5)]" 
                                />
                            )}

                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <div className={`
                                    w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-xl font-black italic shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3
                                    ${isActive ? 'bg-[var(--theme-primary)] text-white shadow-[var(--theme-primary)]/20' : 'bg-[var(--theme-text)] text-[var(--theme-bg)] border border-[var(--theme-border)]'}
                                `}>
                                    {conv.name?.[0] || conv.username?.[0]}
                                </div>
                                {conv.online && (
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[var(--theme-card)] rounded-full flex items-center justify-center shadow-lg">
                                        <div className="w-3.5 h-3.5 bg-[var(--status-success)] rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--status-success-rgb),0.5)]" />
                                    </div>
                                )}
                            </div>

                            {/* Text Cluster */}
                            <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs font-black uppercase tracking-wide italic ${isActive ? 'text-[var(--theme-primary)]' : 'text-[var(--theme-text-muted)] opacity-30'}`}>{conv.tech} CLUSTER</span>
                                    <span className="text-xs font-black text-[var(--theme-text-muted)] opacity-30 italic">{conv.time || conv.lastMessageTime}</span>
                                </div>
                                <h3 className={`text-lg font-black uppercase tracking-tighter truncate leading-none italic ${isActive ? 'text-[var(--theme-primary)]' : 'text-[var(--theme-text)]'}`}>
                                    {conv.name || conv.username}
                                </h3>
                                <p className={`text-xs font-bold truncate italic transition-opacity ${isActive ? 'text-[var(--theme-text)] opacity-60' : 'text-[var(--theme-text-muted)] opacity-40 group-hover:opacity-80'}`}>
                                    {conv.msg || conv.lastMessage}
                                </p>
                            </div>

                            {/* Unread Indicator */}
                            {(conv.unread > 0 || conv.unreadCount > 0) && (
                                <div className="w-7 h-7 bg-[var(--theme-primary)] rounded-xl flex items-center justify-center text-xs font-black italic text-white shadow-3xl shadow-[var(--theme-primary)]/30 group-hover:scale-110 transition-transform">
                                    {conv.unread || conv.unreadCount}
                                </div>
                            )}
                        </motion.button>
                    );
                })
            )}
        </div>
    );
}








