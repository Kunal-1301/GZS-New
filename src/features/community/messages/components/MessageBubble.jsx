import React from 'react';
import { motion } from 'framer-motion';

export default function MessageBubble({ message, isMe }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-6 group`}
        >
            <div className={`
                max-w-[80%] md:max-w-[70%] lg:max-w-[55%] p-6 rounded-2xl text-sm relative transition-all duration-300
                ${isMe ? 
                    'bg-[var(--theme-text)] text-[var(--theme-bg)] rounded-br-none shadow-3xl shadow-black/10 translate-x-0' : 
                    'bg-[var(--theme-card)] border border-[var(--theme-border)] text-[var(--theme-text)] rounded-bl-none shadow-sm'
                }
            `}>
                <p className="font-bold tracking-tight italic leading-relaxed uppercase tracking-widest text-sm">{message.content}</p>
                
                {/* Meta Overlay on Hover */}
                <div className={`
                    absolute top-1/2 -translate-y-1/2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500
                    ${isMe ? 'right-full mr-6' : 'left-full ml-6'}
                `}>
                    <span className="text-xs font-black uppercase text-[var(--theme-text-muted)] opacity-40 italic tracking-wide whitespace-nowrap">
                        SYNC_TIME: {message.timestamp}
                    </span>
                </div>
            </div>
            
            <div className={`flex items-center gap-2 mt-3 mx-4 opacity-30 group-hover:opacity-100 transition-opacity`}>
                <span className="text-xs font-black uppercase text-[var(--theme-text-muted)] tracking-wider italic">
                    {isMe ? 'TRANSMITTED_OK' : 'RECEIVED_OK'}
                </span>
                <div className={`w-1 h-1 rounded-full ${isMe ? 'bg-[var(--theme-primary)]' : 'bg-[var(--status-success)]'}`} />
            </div>
        </motion.div>
    );
}








