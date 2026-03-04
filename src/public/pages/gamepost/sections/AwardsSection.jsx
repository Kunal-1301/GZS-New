export default function AwardsSection({ awards }) {
    return (
        <section className="max-w-[1200px] mx-auto px-6 section-padding">
            <h2 className="text-3xl font-black text-[var(--gp-text-heading)] uppercase mb-10">
                Awards
            </h2>

            <ul className="list-disc pl-6">
                {awards.map((a) => (
                    <li key={a.aa_pt}>{a.aa_pt}</li>
                ))}
            </ul>
        </section>
    );
}
