import React, { useState } from 'react';
import { FiPaperclip, FiSmile, FiSend, FiPlusCircle, FiCpu, FiHash } from 'react-icons/fi';

export default function MessageInput({ onSend }) {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            onSend(content);
            setContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-6 relative group">
            <button 
                type="button" 
                className="w-14 h-14 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl flex items-center justify-center text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] hover:border-[var(--theme-primary)]/30 transition-all shadow-sm group/btn"
            >
                <FiPlusCircle size={22} className="group-hover/btn:rotate-90 transition-transform duration-500" />
            </button>
            
            <div className="flex-1 relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--theme-primary)] opacity-40 group-focus-within:opacity-100 transition-opacity">
                    <FiHash size={16} />
                </div>
                <input 
                    type="text" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="ENTER MESSAGE..." 
                    className="w-full bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] rounded-2xl pl-16 pr-32 py-5 text-xs font-black uppercase tracking-tight focus:ring-8 focus:ring-[var(--theme-primary)]/5 focus:border-[var(--theme-primary)]/30 outline-none transition-all placeholder:text-[var(--theme-text-muted)] placeholder:opacity-40 italic shadow-inner"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-5 text-[var(--theme-text-muted)] opacity-50 group-focus-within:opacity-100 transition-opacity">
                    <button type="button" className="hover:text-[var(--theme-primary)] transition-colors hover:scale-110">
                        <FiSmile size={18} />
                    </button>
                    <button type="button" className="hover:text-[var(--theme-primary)] transition-colors hover:scale-110">
                        <FiPaperclip size={18} />
                    </button>
                </div>
            </div>

            <button 
                disabled={!content.trim()}
                type="submit" 
                className={`
                    w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-all shadow-2xl relative overflow-hidden group/submit
                    ${!content.trim() 
                        ? 'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] opacity-20' 
                        : 'bg-[var(--theme-text)] text-[var(--theme-bg)] hover:bg-[var(--theme-primary)] hover:text-white hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.3)]'
                    }
                `}
            >
                <FiSend size={22} className={`transition-transform duration-500 ${content.trim() ? 'group-hover/submit:translate-x-1 group-hover/submit:-translate-y-1' : ''}`} />
                {content.trim() && (
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/submit:opacity-100 transition-opacity" />
                )}
            </button>
        </form>
    );
}








