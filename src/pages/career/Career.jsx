import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function Career() {
  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      {/* Navbar */}
      <Navbar logoVariant="yellow" loginVariant="yellow" isDark={false} />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 uppercase tracking-wider mb-4">
            CAREERS AT GZONESPHERE
          </h1>
          <p className="text-neutral-600 text-sm md:text-base max-w-2xl mx-auto">
            Join our team and help build the future of gaming. We're looking for passionate individuals who want to make an impact.
          </p>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-16">
          <h2 className="text-2xl font-black uppercase tracking-wide text-neutral-900 mb-8 text-center">
            OPEN POSITIONS
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-neutral-600 text-center">
              No open positions at the moment. Check back soon!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer variant="light" accent="yellow" />
    </div>
  );
}

export default Career;
