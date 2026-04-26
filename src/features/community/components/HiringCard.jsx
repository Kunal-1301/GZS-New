
const HiringCard = ({ companyName, logoText, trustStatus, engagementType, title, requirements, deadline, trustColor = 'green' }) => {
    const colorMap = {
        green: 'text-green-600 bg-green-500',
        blue: 'text-blue-600 bg-blue-500',
        purple: 'text-purple-600 bg-purple-500'
    };

    const textClr = colorMap[trustColor]?.split(' ')[0] || 'text-green-600';
    const bgClr = colorMap[trustColor]?.split(' ')[1] || 'bg-green-500';

    return (
        <div className="card-standard p-5 relative group cursor-pointer">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--theme-bg-alt)] rounded-lg flex items-center justify-center font-black text-[var(--theme-text)] border border-[var(--theme-border)]">
                        {logoText}
                    </div>
                    <div>
                        <h4 className="text-[var(--theme-text)] font-black uppercase tracking-wide flex items-center gap-1">
                            {companyName}
                            <span className="text-[var(--gp-red)] text-sm" title="Verified Company">✓</span>
                        </h4>
                        <div className={`gzs-label flex items-center gap-1 !text-xs ${textClr}`}>
                            <span className={`w-2 h-2 rounded-full ${bgClr}`}></span>
                            {trustStatus}
                        </div>
                    </div>
                </div>

                {/* Engagement Type Badge */}
                <div className={`px-2 py-1 rounded text-xs font-black tracking-widest uppercase
          ${engagementType === 'Hiring' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        engagementType === 'Playtest' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                            engagementType === 'Event' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] border-[var(--theme-border)]'}`}>
                    {engagementType}
                </div>
            </div>

            {/* Body */}
            <div className="relative z-10">
                <h3 className="gzs-h3 !text-lg mb-3 group-hover:text-[var(--theme-primary)] transition-colors">
                    {title}
                </h3>

                {/* Requirements Matrix */}
                <div className="bg-[var(--theme-bg-alt)] rounded-lg p-3 mb-4 space-y-2 border border-[var(--theme-border)]">
                    <p className="gzs-label mb-1">Requirements Matrix</p>
                    <div className="flex flex-wrap gap-2">
                        {requirements.map((req, idx) => (
                            <span key={idx} className="bg-[var(--theme-card)] text-[var(--theme-text)] text-xs font-bold uppercase tracking-widest px-2 py-1 rounded border border-[var(--theme-border)] shadow-sm">
                                {req}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 relative z-10 pt-4 border-t border-[var(--theme-border)]">
                <span className="gzs-body-sm !text-xs uppercase font-bold">Closes: {deadline}</span>
                <button className="gzs-btn-primary !px-4 !py-1.5 !text-xs">
                    {engagementType === 'Hiring' ? 'Apply Now' : engagementType === 'Playtest' ? 'Register' : 'RSVP'}
                </button>
            </div>
        </div>
    );
};

export default HiringCard;







