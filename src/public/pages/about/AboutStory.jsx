import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import { usePageTheme } from '../../context/ThemeContext';
import { images } from '../../data/images';

/* ── Story section data ──────────────────────────────────── */
const STORY_SECTIONS = [
    {
        id: 'fragmented-age',
        title: 'THE FRAGMENTED AGE',
        subtitle: 'If the modern gaming world is anything, it is this.',
        layout: 'video-left',
        body: `There was once a time when gaming had one simple purpose: play and be entertained.\n\nBut something happened along the way. The gaming world expanded rapidly — new platforms, new genres, new communities, new careers. And with that growth came fragmentation.\n\nGamers found themselves scattered across dozens of platforms. Progress felt invisible. Communities became noise.\n\nThe gaming experience, despite being global, started feeling deeply alone.`,
        emphasis: 'But gaming was never meant to be lonely.',
    },
    {
        id: 'idea-of-unity',
        title: 'THE IDEA OF UNITY',
        subtitle: 'What if every gamer had a single, unified presence?',
        layout: 'two-col-text',
        bodyLeft: `Somewhere between these scattered experiences, an idea formed. What if there was one place — a single ecosystem — where a gamer's identity, journey, and contributions were recognized and unified?\n\nNot just another platform. Not another leaderboard. Not another social feed.`,
        bodyRight: `But a space that actually understood how gamers think, grow, and connect with each other. A space where gaming culture could be taken seriously.\n\nWhere effort translated into something real. Where community wasn't just noise, but a living, breathing network of people who shared the same passion.\n\nThat idea became the foundation of GzoneSphere.`,
        bold: `GzoneSphere knows that every current conclusion reaches this — that this is the time to build something different.`,
    },
    {
        id: 'living-ecosystem',
        title: 'A LIVING ECOSYSTEM',
        subtitle: 'GzoneSphere is not a product. It is a system.',
        layout: 'text-gallery',
        body: `Think about this: the most powerful ecosystems in the world don't just connect people on the surface — they create infrastructure. They give every participant a reason to stay, to grow, and to contribute.\n\nGzoneSphere is designed around that same principle. It is being built to become the infrastructure that gaming culture has always needed but never had.\n\nThe ecosystem grows with its users. Each phase introduces new dimensions — not because we planned it all upfront, but because we are listening to what the community actually needs.`,
    },
    {
        id: 'built-in-layers',
        title: 'BUILT IN LAYERS',
        subtitle: 'The infrastructure that holds it all together.',
        layout: 'zigzag',
        blocks: [
            {
                side: 'right',
                body: `GzoneSphere is being constructed in layers — each layer building upon the last, creating a structure that is both stable and flexible.\n\nThe first layer is identity. Before anything else, every gamer needs a space that recognizes who they are and what they bring to the table.\n\nThe second layer is community. Real community — not just followers and likes, but connections that are meaningful, structured, and purposeful.`,
                image: images.esportsHero,
            },
            {
                side: 'left',
                body: `There is a certain kind of loneliness that only gamers understand. The gap between passion and recognition. The frustration of effort going unseen.\n\nFrom gaming rooms, Discord servers, livestreams — from here, we build the third layer: opportunity. Career pathways, competitive stages, creative showcases — a place where gaming becomes more than just play.\n\nFrom gaming rooms. Discord servers. Cam stream — from here.`,
                image: images.aboutHero,
            },
        ],
    },
    {
        id: 'new-gaming-era',
        title: 'A NEW GAMING ERA',
        subtitle: 'GzoneSphere is here for the next 10 years of gaming.',
        layout: 'centered',
        body: `We are not building GzoneSphere for today's gaming industry. We are building it for the gaming culture of tomorrow — where millions of people will look back and remember this as the moment the infrastructure caught up to the passion.`,
        contact: {
            label: 'Get in touch',
            items: [
                { type: 'Email', value: 'gzonesphere@gmail.com' },
                { type: 'Instagram', value: '@gzonesphere' },
                { type: 'Discord', value: 'discord.gg/gzonesphere' },
            ],
        },
    },
];

/* ── Component ───────────────────────────────────────────── */
export default function AboutStory() {
    usePageTheme('about');
    return (
        <div className="theme-about min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-inter">

            <Navbar />

            {/* ── HERO — dark starfield ──────────────────────────── */}
            <section
                className="relative min-h-[56vh] flex flex-col items-center justify-center text-center overflow-hidden"
                style={{
                    backgroundImage: `linear-gradient(rgba(10,20,45,0.82), rgba(2,10,30,0.94)), url(${images.aboutStory})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="relative z-10 px-6 md:px-16 max-w-3xl">
                    <span className="inline-block mb-5 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] border border-[var(--theme-primary)]/30">
                        The Origin
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight mb-5 font-heading">
                        THE GZONESPHERE
                    </h1>
                    <p className="text-white/70 text-sm sm:text-base font-bold uppercase tracking-widest">
                        YOU PLAYED. YOU CONNECTED. YOU BELONGED.
                    </p>
                </div>
            </section>

            {/* ── BREADCRUMB + INTRO ────────────────────────────── */}
            <div className="container-global pt-8 pb-2">
                <Breadcrumb items={[
                    { label: 'Home', to: '/' },
                    { label: 'About', to: '/about' },
                    { label: 'Our Story' },
                ]} />
            </div>

            {/* Intro block — text left + dark image right */}
            <section className="section-padding bg-[var(--theme-bg)]">
                <div className="container-global grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-4 text-[var(--theme-text)] text-sm sm:text-base leading-relaxed">
                        <p>
                            There is a certain kind of loneliness that only gamers understand. The gap between passion and recognition. The frustration of effort going unseen.
                        </p>
                        <p>
                            Gamers faced a landscape that needed them, used them, and yet never truly saw them. The platforms grew but the players felt smaller.
                        </p>
                        <p>
                            Communities fractured. Progress fragmented. Identities scattered.
                        </p>
                        <p>
                            Downloading something. Closing it. Moving on. The cycle repeated.
                        </p>
                        <p className="font-bold text-[var(--theme-text)]">
                            From gaming rooms. Discord servers. Cam stream — from here.
                        </p>
                    </div>
                    <div className="h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl relative bg-[var(--theme-bg-section)]">
                        <img
                            src={images.aboutStory}
                            alt="The gaming experience"
                            className="w-full h-full object-cover opacity-60"
                        />
                    </div>
                </div>
            </section>

            {/* ── STORY SECTIONS ────────────────────────────────── */}
            {STORY_SECTIONS.map((section, idx) => (
                <section
                    key={section.id}
                    className={`py-16 md:py-24 ${idx % 2 === 0 ? 'bg-[var(--theme-bg-section)]' : 'bg-[var(--theme-bg)]'}`}
                >
                    <div className="container-global">

                        {/* Section heading */}
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-[var(--theme-text)] mb-3 font-heading">
                                {section.title}
                            </h2>
                            <p className="text-[var(--theme-text-muted)] text-sm sm:text-base max-w-xl mx-auto">
                                {section.subtitle}
                            </p>
                        </div>

                        {/* ─ video-left: image left, text right ─── */}
                        {section.layout === 'video-left' && (
                            <div className="grid lg:grid-cols-2 gap-14 items-start">
                                <div className="h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl relative bg-[var(--theme-bg)]">
                                    <img
                                        src={images.valorant}
                                        alt={section.title}
                                        className="w-full h-full object-cover opacity-60"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[var(--theme-text)] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                        {section.body}
                                    </p>
                                    {section.emphasis && (
                                        <p className="font-bold italic text-[var(--theme-primary-dark)] text-sm">
                                            {section.emphasis}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ─ two-col-text: text left + text right ─ */}
                        {section.layout === 'two-col-text' && (
                            <div className="space-y-6">
                                <div className="grid lg:grid-cols-2 gap-10">
                                    <p className="text-[var(--theme-text)] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                        {section.bodyLeft}
                                    </p>
                                    <p className="text-[var(--theme-text)] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                        {section.bodyRight}
                                    </p>
                                </div>
                                {section.bold && (
                                    <p className="font-bold text-[var(--theme-text)] text-sm sm:text-base mt-6 border-l-4 border-[var(--theme-primary)] pl-4 py-1">
                                        {section.bold}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* ─ text-gallery: body + 5 horizontal tiles ─ */}
                        {section.layout === 'text-gallery' && (
                            <div className="space-y-10">
                                <p className="max-w-3xl mx-auto text-[var(--theme-text)] text-sm sm:text-base leading-relaxed whitespace-pre-line text-center">
                                    {section.body}
                                </p>
                                {/* 5 placeholder tiles */}
                                <div className="grid grid-cols-5 gap-3">
                                    {[images.valorant, images.fifa, images.pc, images.playstation, images.esportsHero].map((src, i) => (
                                        <div key={i} className="h-36 rounded-xl overflow-hidden bg-[var(--theme-bg)] shadow-sm">
                                            <img
                                                src={src}
                                                alt={`ecosystem aspect ${i + 1}`}
                                                className="w-full h-full object-cover opacity-50 hover:opacity-75 transition-opacity"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ─ zigzag: alternating image/text rows ── */}
                        {section.layout === 'zigzag' && section.blocks && (
                            <div className="space-y-14">
                                {section.blocks.map((block, bi) => (
                                    <div key={bi} className={`grid lg:grid-cols-2 gap-14 items-start ${block.side === 'left' ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>
                                        <p className="text-[var(--theme-text)] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                            {block.body}
                                        </p>
                                        <div className="h-64 md:h-72 rounded-2xl overflow-hidden shadow-xl">
                                            <img
                                                src={block.image}
                                                alt={`layer ${bi + 1}`}
                                                className="w-full h-full object-cover opacity-60"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ─ centered: center text + inline contact ─ */}
                        {section.layout === 'centered' && (
                            <div className="max-w-2xl mx-auto text-center space-y-8">
                                <p className="text-[var(--theme-text)] text-sm sm:text-base leading-relaxed">
                                    {section.body}
                                </p>
                                {section.contact && (
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text-muted)] mb-4">
                                            {section.contact.label}
                                        </p>
                                        <div className="flex flex-wrap gap-3 justify-center">
                                            {section.contact.items.map((item) => (
                                                <span
                                                    key={item.type}
                                                    className="px-4 py-2 rounded-lg text-sm bg-[var(--theme-card)] border border-[var(--theme-border)] text-[var(--theme-text-muted)]"
                                                >
                                                    <span className="font-bold text-[var(--theme-text)]">{item.type}:</span> {item.value}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </section>
            ))}

            <Footer />
        </div>
    );
}
