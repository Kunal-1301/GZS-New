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
                <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6 py-24">
                    <div className="text-center max-w-md">
                        <p className="text-6xl font-black text-red-400 mb-4">⚠️</p>
                        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-neutral-900 mb-4">
                            Something went wrong
                        </h1>
                        <p className="text-neutral-600 mb-8 leading-relaxed">
                            An unexpected error occurred. Please try reloading the page, or go
                            back home.
                        </p>
                        {import.meta.env.DEV && this.state.error && (
                            <pre className="text-left bg-neutral-100 text-red-700 text-xs p-4 rounded-sm overflow-auto mb-6 max-h-40">
                                {this.state.error.toString()}
                            </pre>
                        )}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold uppercase tracking-wider text-sm rounded-sm transition-colors"
                            >
                                Reload Page
                            </button>
                            <Link
                                to="/"
                                onClick={this.handleReset}
                                className="px-6 py-3 border-2 border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white font-semibold uppercase tracking-wider text-sm rounded-sm transition-colors"
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
