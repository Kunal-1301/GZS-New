import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';

function Career() {
  return (
    <div className="theme-blog min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-body">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-global text-center">
          <Breadcrumb items={[
            { label: 'Home', to: '/' },
            { label: 'Careers' },
          ]} className="mb-4 justify-center" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--theme-text)] uppercase tracking-wider mb-4 font-heading">
            CAREERS AT GZONESPHERE
          </h1>
          <p className="text-[var(--theme-text-muted)] text-sm md:text-base max-w-2xl mx-auto">
            Join our team and help build the future of gaming. We're looking for passionate individuals who want to make an impact.
          </p>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="section-padding bg-[var(--theme-card)]">
        <div className="container-global">
          <h2 className="text-2xl font-black uppercase tracking-wide text-[var(--theme-text)] mb-8 text-center font-heading">
            OPEN POSITIONS
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-[var(--theme-text-muted)] text-center">
              No open positions at the moment. Check back soon!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Career;
