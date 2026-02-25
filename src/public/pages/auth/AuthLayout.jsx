import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="min-h-screen flex flex-col bg-white font-inter">
            <Navbar logoVariant="blue" loginVariant="blue" accent="blue" />

            <main className="flex-1 relative flex flex-col items-center justify-center py-20 min-h-[600px]">
                {/* Horizontal colored strip */}
                <div className="absolute top-1/2 left-0 w-full h-[320px] bg-au-bg-strip -translate-y-1/2 pointer-events-none" />

                <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left Text Segment */}
                    <div className="flex-1 text-white py-12">
                        <h1
                            className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-wider mb-4 leading-[1.1]"
                            style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
                        >
                            {title}
                        </h1>
                        <p className="text-white/90 text-sm md:text-base max-w-md leading-relaxed">
                            {subtitle}
                        </p>
                    </div>

                    {/* Right Card Segment */}
                    <div className="w-full max-w-[420px] bg-au-card rounded-md shadow-2xl p-8 lg:p-10 shrink-0">
                        {children}
                    </div>

                </div>
            </main>

            <Footer variant="light" accent="blue" />
        </div>
    );
}
