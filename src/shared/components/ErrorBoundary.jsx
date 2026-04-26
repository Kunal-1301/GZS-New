import { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * ErrorBoundary — Catches JavaScript errors in the component tree,
 * logs the error, and displays a fallback UI instead of crashing the page.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <SomeComponent />
 *   </ErrorBoundary>
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('[ErrorBoundary] Caught an error:', error, info);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-[var(--theme-bg)] px-6 py-24">
                    <div className="text-center max-w-md">
                        <p className="text-6xl font-black text-[var(--theme-primary)] mb-4">⚠️</p>
                        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-[var(--theme-text)] mb-4">
                            Something went wrong
                        </h1>
                        <p className="text-[var(--theme-text-muted)] mb-8 leading-relaxed">
                            An unexpected error occurred. Please try reloading the page, or go
                            back home.
                        </p>
                        {import.meta.env.DEV && this.state.error && (
                            <pre className="text-left bg-[var(--theme-bg-alt)] border-2 border-[var(--status-error)]/20 text-[var(--status-error)] text-xs font-black p-8 rounded-2xl overflow-auto mb-10 max-h-60 shadow-inner italic uppercase tracking-widest scrollbar-thin">
                                {this.state.error.toString()}
                            </pre>
                        )}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-[var(--theme-text-inverse)] font-semibold uppercase tracking-wider text-sm rounded-sm transition-colors"
                            >
                                Reload Page
                            </button>
                            <Link
                                to="/"
                                onClick={this.handleReset}
                                className="px-6 py-3 border-2 border-[var(--theme-text)] text-[var(--theme-text)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-text-inverse)] font-semibold uppercase tracking-wider text-sm rounded-sm transition-colors"
                            >
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;







