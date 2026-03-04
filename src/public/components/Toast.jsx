import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

/**
 * Toast notification system
 * ─────────────────────────
 * Provides a context-based toast system that replaces native alert() calls.
 *
 * Usage:
 *   const { showToast } = useToast();
 *   showToast('Registration submitted!', 'success');
 *   showToast('Something went wrong.', 'error');
 *   showToast('Please check your input.', 'info');
 */

const ToastContext = createContext(undefined);

const ICONS = {
    success: FiCheckCircle,
    error: FiAlertCircle,
    info: FiInfo,
};

const COLORS = {
    success: {
        bg: 'bg-emerald-50 border-emerald-200',
        icon: 'text-emerald-500',
        text: 'text-emerald-800',
        progress: 'bg-emerald-400',
    },
    error: {
        bg: 'bg-red-50 border-red-200',
        icon: 'text-red-500',
        text: 'text-red-800',
        progress: 'bg-red-400',
    },
    info: {
        bg: 'bg-blue-50 border-blue-200',
        icon: 'text-blue-500',
        text: 'text-blue-800',
        progress: 'bg-blue-400',
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
        flex items-start gap-3 px-4 py-3.5 rounded-xl border shadow-lg backdrop-blur-sm
        ${colors.bg}
        transition-all duration-300 ease-out
        ${isExiting
                    ? 'opacity-0 translate-x-8 scale-95'
                    : 'opacity-100 translate-x-0 scale-100 animate-[slideIn_0.3s_ease-out]'
                }
      `}
            role="alert"
        >
            <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${colors.icon}`} />
            <p className={`text-sm font-medium flex-1 ${colors.text}`}>{message}</p>
            <button
                onClick={handleDismiss}
                className={`shrink-0 mt-0.5 ${colors.icon} hover:opacity-70 transition-opacity`}
                aria-label="Dismiss"
            >
                <FiX className="w-4 h-4" />
            </button>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl overflow-hidden">
                <div
                    className={`h-full ${colors.progress} transition-[width] duration-100 ease-linear`}
                    style={{ width: `${progress}%` }}
                />
            </div>
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
            <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
                {toasts.map(toast => (
                    <div key={toast.id} className="pointer-events-auto relative">
                        <ToastItem
                            {...toast}
                            onDismiss={dismissToast}
                        />
                    </div>
                ))}
            </div>
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

export default ToastContext;
