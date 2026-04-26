import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX, FiCpu } from 'react-icons/fi';

/**
 * Toast — Command Nexus Protocol
 */

const ToastContext = createContext(undefined);

const ICONS = {
    success: FiCheckCircle,
    error: FiAlertCircle,
    info: FiInfo,
};

const COLORS = {
    success: {
        bg: 'bg-[var(--theme-card)] border-[var(--status-success)]/40 shadow-[var(--status-success)]/10',
        icon: 'text-[var(--status-success)]',
        text: 'text-[var(--theme-text)]',
        progress: 'bg-[var(--status-success)]',
    },
    error: {
        bg: 'bg-[var(--theme-card)] border-[var(--status-error)]/40 shadow-[var(--status-error)]/10',
        icon: 'text-[var(--status-error)]',
        text: 'text-[var(--theme-text)]',
        progress: 'bg-[var(--status-error)]',
    },
    info: {
        bg: 'bg-[var(--theme-card)] border-[var(--theme-primary)]/40 shadow-[var(--theme-primary)]/10',
        icon: 'text-[var(--theme-primary)]',
        text: 'text-[var(--theme-text)]',
        progress: 'bg-[var(--theme-primary)]',
    },
};

function ToastItem({ id, message, type = 'info', onDismiss, duration = 4000 }) {
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(100);
    const colors = COLORS[type] || COLORS.info;
    const Icon = ICONS[type] || ICONS.info;

    const handleDismiss = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => onDismiss(id), 300);
    }, [id, onDismiss]);

    useEffect(() => {
        const start = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
            setProgress(remaining);
            if (remaining <= 0) {
                clearInterval(interval);
                handleDismiss();
            }
        }, 50);

        return () => clearInterval(interval);
    }, [duration, handleDismiss]);

    return (
        <div
            className={`
                flex items-start gap-5 px-8 py-6 rounded-3xl border-2 shadow-4xl backdrop-blur-3xl relative overflow-hidden group
                ${colors.bg}
                transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
                ${isExiting
                    ? 'opacity-0 translate-x-12 scale-90'
                    : 'opacity-100 translate-x-0 scale-100 animate-[slideInTactical_0.5s_cubic-bezier(0.16,1,0.3,1)]'
                }
            `}
            role="alert"
        >
            <div className={`shrink-0 p-3 rounded-2xl bg-[var(--theme-bg-alt)] border border-[var(--theme-border)] shadow-inner transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`}>
                 <Icon className={`w-6 h-6 ${colors.icon}`} strokeWidth={3} />
            </div>
            
            <div className="flex-1 space-y-2">
                <p className={`text-xs font-black uppercase tracking-[0.4em] italic flex items-center gap-3 ${colors.icon} leading-none`}>
                    {type === 'success' ? 'Nexus Synced' : type === 'error' ? 'Fatal Error' : 'System Notice'}
                </p>
                <p className={`text-sm font-black italic leading-tight uppercase tracking-widest ${colors.text} opacity-80`}>{message}</p>
            </div>

            <button
                onClick={handleDismiss}
                className={`shrink-0 text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] hover:rotate-90 transition-all p-1`}
                aria-label="Dismiss"
            >
                <FiX className="w-5 h-5" strokeWidth={3} />
            </button>

            {/* Tactical Progress Trace */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[var(--theme-bg-alt)]/50 overflow-hidden">
                <div
                    className={`h-full ${colors.progress} transition-[width] duration-100 ease-linear shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.6)] relative`}
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute right-0 top-0 h-full w-4 bg-white/40 blur-[4px] animate-[pulse_1s_infinite]" />
                </div>
            </div>
            
            {/* Background Data Artifact */}
            <FiCpu className="absolute top-[-20px] right-[-20px] w-20 h-20 text-[var(--theme-text-muted)] opacity-[0.05] rotate-45 pointer-events-none group-hover:rotate-0 transition-transform duration-[3s]" />
        </div>
    );
}

let toastIdCounter = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = ++toastIdCounter;
        setToasts(prev => [...prev, { id, message, type, duration }]);
    }, []);

    const dismissToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Toast container */}
            <div className="fixed top-32 right-12 z-[99999] flex flex-col gap-6 max-w-[420px] w-full pointer-events-none px-6 md:px-0">
                {toasts.map(toast => (
                    <div key={toast.id} className="pointer-events-auto relative">
                        <ToastItem
                            {...toast}
                            onDismiss={dismissToast}
                        />
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes slideInTactical {
                    from { 
                        opacity: 0; 
                        transform: translateX(100px) skewX(-10deg); 
                        filter: blur(10px);
                    }
                    to { 
                        opacity: 1; 
                        transform: translateX(0) skewX(0); 
                        filter: blur(0);
                    }
                }
            `}</style>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}







