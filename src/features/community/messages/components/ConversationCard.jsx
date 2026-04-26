import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ConversationCard = ({ conversation, isActive }) => {
    const navigate = useNavigate();
    
    return (
        <motion.div 
            whileHover={{ scale: 1.02 }}
            whileActive={{ scale: 0.98 }}
            onClick={() => navigate(`/messages/${conversation.userId}`)}
            className={`flex items-center gap-6 p-6 rounded-2xl cursor-pointer transition-all relative overflow-hidden group/card
                ${isActive 
                    ? 'bg-[var(--theme-primary)] text-[var(--theme-text-inverse)] shadow-2xl border-2 border-white/10' 
                    : 'bg-[var(--theme-bg-alt)]/50 hover:bg-[var(--theme-card)] border-2 border-[var(--theme-border)]'
                }`}
        >
            <div className="relative">
                <div className={`w-14 h-14 rounded-2xl overflow-hidden border-2 shadow-inner group-hover/card:scale-110 transition-transform duration-500 ${isActive ? 'border-white/20' : 'border-[var(--theme-border)] bg-[var(--theme-bg-alt)]'}`}>
                    {conversation.avatar ? (
                        <img src={conversation.avatar} alt={conversation.username} className="w-full h-full object-cover" />
                    ) : (
                        <div className={`w-full h-full flex items-center justify-center font-black text-lg italic ${isActive ? 'text-white/40' : 'text-[var(--theme-text-muted)] opacity-20'}`}>
                            {conversation.username?.[0] || 'G'}
                        </div>
                    )}
                </div>
                {conversation.isOnline && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--status-success)] border-2 border-[var(--theme-card)] rounded-full shadow-[0_0_10px_rgba(var(--status-success-rgb),0.4)] animate-pulse" />
                )}
            </div>
            
            <div className="flex-1 min-w-0 space-y-1">
                <div className="flex justify-between items-center">
                    <span className={`text-sm font-black uppercase tracking-widest italic truncate ${isActive ? 'text-white' : 'text-[var(--theme-text)]'}`}>
                        {conversation.username}
                    </span>
                    <span className={`text-xs font-black uppercase tracking-tight italic tabular-nums ${isActive ? 'text-white/60' : 'text-[var(--theme-text-muted)] opacity-30'}`}>
                        {conversation.lastMessageTime}
                    </span>
                </div>
                <p className={`text-xs font-medium truncate italic leading-none ${isActive ? 'text-white/80' : 'text-[var(--theme-text-muted)]'}`}>
                    {conversation.lastMessage}
                </p>
            </div>
            
            {conversation.unreadCount > 0 && !isActive && (
                <div className="w-6 h-6 bg-[var(--theme-primary)] text-white rounded-xl flex items-center justify-center text-xs font-black shadow-2xl animate-bounce">
                    {conversation.unreadCount}
                </div>
            )}

            {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
            )}
        </motion.div>
    );
};

export default ConversationCard;








