import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const STORY_SECTIONS = [
    {
        id: 'fragmented-age',
        title: 'THE FRAGMENTED AGE',
        subtitle: 'If the modern gaming world is anything, it is this.',
        layout: 'video-left',
        body: `There was once a time when gaming had one simple purpose: play and be entertained.
But something happened along the way. The gaming world expanded rapidly — new platforms, new genres, new communities, new careers. And with that growth came fragmentation.

Gamers found themselves scattered across dozens of platforms. Progress felt invisible. Communities became noise.
The gaming experience, despite being global, started feeling deeply alone.`,
    },
    {
        id: 'idea-of-unity',
        title: 'THE IDEA OF UNITY',
        subtitle: 'What if every gamer had a single, unified presence?',
        layout: 'text-only',
        body: `Somewhere between these scattered experiences, an idea formed. What if there was one place — a single ecosystem — where a gamer's identity, journey, and contributions were recognized and unified?

Not just another platform. Not another leaderboard. Not another social feed.

But a space that actually understood how gamers think, grow, and connect with each other. A space where gaming culture could be taken seriously. Where effort translated into something real. Where community wasn't just noise, but a living, breathing network of people who shared the same passion.

That idea became the foundation of GzoneSphere.`,
        bold: `GzoneSphere knows that every current conclusion reaches, that this is the time to build something different.`,
    },
    {
        id: 'living-ecosystem',
        title: 'A LIVING ECOSYSTEM',
        subtitle: 'GzoneSphere is not a product. It is a system.',
        layout: 'text-gallery',
        body: `Think about this: the most powerful ecosystems in the world don't just connect people on the surface — they create infrastructure. They give every participant a reason to stay, to grow, and to contribute.

GzoneSphere is designed around that same principle. It is being built to become the infrastructure that gaming culture has always needed but never had.

The ecosystem grows with its users. Each phase introduces new dimensions — not because we planned it all upfront, but because we are listening to what the community actually needs.`,
    },
    {
        id: 'built-in-layers',
        title: 'BUILT IN LAYERS',
        subtitle: 'The infrastructure that holds it all together.',
        layout: 'video-right',
        body: `GzoneSphere is being constructed in layers — each layer building upon the last, creating a structure that is both stable and flexible.

The first layer is identity. Before anything else, every gamer needs a space that recognizes who they are and what they bring to the table.

The second layer is community. Real community — not just followers and likes, but connections that are meaningful, structured, and purposeful.

The third layer is opportunity. Career pathways, competitive stages, creative showcases — a place where gaming becomes more than just play.`,
    },
    {
        id: 'new-gaming-era',
        title: 'A NEW GAMING ERA',
        subtitle: 'GzoneSphere is here for the next 10 years of gaming.',
        layout: 'contact-block',
        body: `We are not building GzoneSphere for today's gaming industry. We are building it for the gaming culture of tomorrow — where millions of people will look back and remember this as the moment the infrastructure caught up to the passion.`,
        contact: {
            email: 'gzonesphere@gmail.com',
            instagram: 'gzonesphere',
            discord: 'gzonesphere',
        },
    },
];

export default function AboutStory() {
    return (
        <div className="min-h-screen bg-ab-bg text-ab-text font-inter">

            {/* ── Navbar ─────────────────────────────────────────── */}
            <Navbar logoVariant="blue" loginVariant="blue" isDark={false} accent="blue" />

            {/* ── HERO — dark starfield ─────────────────────────── */}
            <section
                className="relative min-h-[56vh] flex flex-col items-center justify-center text-center overflow-hidden"
                style={{
                    backgroundImage: "linear-gradient(rgba(10,30,50,0.84),rgba(2,15,30,0.92)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="relative z-10 px-6 md:px-16 max-w-3xl">
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight mb-4"
                        style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
                    >
                        THE GZONESPHERE
                    </h1>
                    <p className="text-white/70 text-sm sm:text-base italic">
                        The space, the code, the vision.
                    </p>
                </div>
            </section>

            {/* ── Story Sections ───────────────────────────────── */}
            {STORY_SECTIONS.map((section, idx) => (
                <section key={section.id} className={`py-18 md:py-24 ${idx % 2 === 0 ? 'bg-ab-bg' : 'bg-ab-bg-section'}`}>
                    <div className="container-global">
                        {/* Section heading */}
                        <div className="text-center mb-12">
                            <h2
                                className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-ab-dark mb-3"
                                style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
                            >
                                {section.title}
                            </h2>
                            <p className="text-ab-text-muted text-sm sm:text-base max-w-xl mx-auto">
                                {section.subtitle}
                            </p>
                        </div>

                        {/* Layout variants */}
                        {section.layout === 'video-left' && (
                            <div className="grid lg:grid-cols-2 gap-14 items-start">
                                <div className="h-64 md:h-80 bg-black/70 rounded-2xl flex items-center justify-center text-ab-text-muted text-sm">
                                    Story Video
                                </div>
                                <p className="text-ab-text text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                    {section.body}
                                </p>
                            </div>
                        )}

                        {section.layout === 'text-only' && (
                            <div className="max-w-3xl mx-auto space-y-5 text-ab-text text-sm sm:text-base leading-relaxed">
                                <p className="whitespace-pre-line">{section.body}</p>
                                {section.bold && (
                                    <p className="font-bold text-ab-dark">{section.bold}</p>
                                )}
                            </div>
                        )}

                        {section.layout === 'text-gallery' && (
                            <div className="space-y-10">
                                <p className="max-w-3xl mx-auto text-ab-text text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                    {section.body}
                                </p>
                                {/* 3-col placeholder grid */}
                                <div className="grid grid-cols-3 gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-32 bg-black/40 rounded-xl" />
                                    ))}
                                </div>
                            </div>
                        )}

                        {section.layout === 'video-right' && (
                            <div className="grid lg:grid-cols-2 gap-14 items-start">
                                <p className="text-ab-text text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                    {section.body}
                                </p>
                                <div className="h-64 md:h-80 bg-black/70 rounded-2xl flex items-center justify-center text-ab-text-muted text-sm">
                                    Story Video
                                </div>
                            </div>
                        )}

                        {section.layout === 'contact-block' && (
                            <div className="grid lg:grid-cols-2 gap-14 items-start">
                                <p className="text-ab-text text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                    {section.body}
                                </p>
                                <div className="bg-ab-card rounded-2xl p-8 border border-ab-border shadow-sm space-y-4">
                                    <h4 className="font-black text-sm uppercase tracking-widest text-ab-dark mb-4">Connect With Us</h4>
                                    {Object.entries(section.contact).map(([key, val]) => (
                                        <p key={key} className="text-sm text-ab-text">
                                            <span className="font-semibold capitalize">{key}:</span> {val}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            ))}

            {/* ── Footer ─────────────────────────────────────────── */}
            <Footer variant="light" accent="blue" />
        </div>
    );
}
