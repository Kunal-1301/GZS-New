import { Link } from 'react-router-dom';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import Breadcrumb from '@components/Breadcrumb';
import { usePageTheme } from '@context/ThemeContext';

function NotFound() {
    usePageTheme('blog');
    return (
        <div className="theme-blog min-h-screen flex flex-col bg-[var(--theme-bg)] font-inter">
            <Navbar />
            <Breadcrumb />

            <main className="flex-1 flex items-center justify-center px-6 py-24">
                <div className="text-center max-w-lg">
                    {/* Large 404 */}
                    <p className="text-[10rem] font-black leading-none text-[var(--theme-border)] select-none opacity-50">
                        404
                    </p>

                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide text-[var(--theme-text)] mb-4 -mt-6">
                        Page Not Found
                    </h1>

                    <p className="text-[var(--theme-text-muted)] mb-10 leading-relaxed">
                        The page you're looking for doesn't exist or may have been moved.
                        Head back to a place you know.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="gzs-btn-primary"
                        >
                            Go Home
                        </Link>
                        <Link
                            to="/blog"
                            className="gzs-btn-outline"
                        >
                            Read the Blog
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default NotFound;
