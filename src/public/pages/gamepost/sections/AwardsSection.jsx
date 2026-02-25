export default function AwardsSection({ awards }) {
    return (
        <section className="max-w-[1200px] mx-auto px-6 section-padding">
            <h2 className="text-3xl font-black text-red-600 uppercase mb-10">
                Awards
            </h2>

            <ul className="list-disc pl-6">
                {awards.map((a, i) => (
                    <li key={i}>{a.aa_pt}</li>
                ))}
            </ul>
        </section>
    );
}
