
const CompanyCard = ({ companyName, logoText, trustStatus, engagementType, title, requirements, deadline, trustColor = 'green' }) => {
    const colorMap = {
        green: 'text-green-600 bg-green-500',
        blue: 'text-blue-600 bg-blue-500',
        purple: 'text-purple-600 bg-purple-500'
    };

    const textClr = colorMap[trustColor]?.split(' ')[0] || 'text-green-600';
    const bgClr = colorMap[trustColor]?.split(' ')[1] || 'bg-green-500';

    return (
        <div className="bg-white border border-neutral-200 rounded-xl p-5 hover:border-purple-300 transition-colors group cursor-pointer shadow-sm relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-100 rounded-md flex items-center justify-center font-black text-neutral-800 border border-neutral-200">
                        {logoText}
                    </div>
                    <div>
                        <h4 className="text-neutral-900 font-bold flex items-center gap-1">
                            {companyName}
                            <span className="text-[#e53935] text-sm" title="Verified Company">✓</span>
                        </h4>
                        <div className={`text-xs font-semibold flex items-center gap-1 ${textClr}`}>
                            <span className={`w-2 h-2 rounded-full ${bgClr}`}></span>
                            {trustStatus}
                        </div>
                    </div>
                </div>

                {/* Engagement Type Badge */}
                <div className={`px-2 py-1 rounded text-[10px] font-black tracking-widest uppercase
          ${engagementType === 'Hiring' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        engagementType === 'Playtest' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                            engagementType === 'Event' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                'bg-neutral-100 text-neutral-600 border border-neutral-200'}`}>
                    {engagementType}
                </div>
            </div>

            {/* Body */}
            <div className="relative z-10">
                <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-[#7C3AED] transition-colors">
                    {title}
                </h3>

                {/* Requirements Matrix */}
                <div className="bg-neutral-50 rounded-lg p-3 mb-4 space-y-2 border border-neutral-100">
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Requirements Matrix</p>
                    <div className="flex flex-wrap gap-2">
                        {requirements.map((req, idx) => (
                            <span key={idx} className="bg-white text-neutral-700 text-xs px-2 py-1 rounded border border-neutral-200 shadow-sm">
                                {req}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 relative z-10 pt-4 border-t border-neutral-100">
                <span className="text-xs text-neutral-500 font-medium">Closes: {deadline}</span>
                <button className="bg-neutral-900 text-white px-4 py-1.5 rounded-md text-sm font-bold hover:bg-[#e53935] transition-colors">
                    {engagementType === 'Hiring' ? 'Apply Now' : engagementType === 'Playtest' ? 'Register' : 'RSVP'}
                </button>
            </div>
        </div>
    );
};

export default CompanyCard;
