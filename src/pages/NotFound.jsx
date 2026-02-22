import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-50">
            <Navbar />

            <main className="flex-1 flex items-center justify-center px-6 py-24">
                <div className="text-center max-w-lg">
                    {/* Large 404 */}
                    <p className="text-[10rem] font-black leading-none text-neutral-200 select-none">
                        404
                    </p>

                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide text-neutral-900 mb-4 -mt-6">
                        Page Not Found
                    </h1>

                    <p className="text-neutral-600 mb-10 leading-relaxed">
                        The page you're looking for doesn't exist or may have been moved.
                        Head back to a place you know.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/"
                            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold uppercase tracking-wider text-sm rounded-sm transition-colors"
                        >
                            Go Home
                        </Link>
                        <Link
                            to="/blog"
                            className="px-6 py-3 border-2 border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white font-semibold uppercase tracking-wider text-sm rounded-sm transition-colors"
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
