export default function ProfileCardStack() {
  return (
    <div className="relative w-full max-w-[380px] h-[480px] mx-auto">

      {/* Back card — Dev sub-profile */}
      <div
        className="gzs-card-dark absolute inset-0 rounded-2xl p-6"
        style={{ transform: 'rotate(-3deg) translateY(24px)', opacity: 0.7, zIndex: 1 }}
      >
        <span className="inline-block text-white text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ background: '#4F46E5' }}>Dev · Engineer</span>
        <p className="font-bold text-white">devkumar_gzs</p>
        <p className="text-sm text-white/60 mt-1">Unity · Unreal Engine · C#</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {['Unity ✓', 'Unreal ✓', 'C# ✓'].map(s => (
            <span key={s} className="text-xs px-2 py-1 rounded-lg text-white/60" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Middle card — Tournament profile */}
      <div
        className="gzs-card-dark absolute inset-0 rounded-2xl p-6"
        style={{ transform: 'rotate(2deg) translateY(12px)', opacity: 0.85, zIndex: 2 }}
      >
        <span className="inline-block text-white text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ background: '#16A34A' }}>Tournament · Bracket</span>
        <p className="font-bold text-white">viper_pro</p>
        <p className="text-sm text-white/60 mt-1">Valorant Winter Showdown 2026</p>
        <div className="mt-3 rounded-lg p-3" style={{ background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.3)' }}>
          <p className="text-xs font-semibold text-green-400">₹50,000 Prize Pool · 48 spots left</p>
        </div>
      </div>

      {/* Front card — Esports sub-profile — floats */}
      <div
        className="gzs-card-dark absolute inset-0 rounded-2xl p-6"
        style={{
          zIndex: 3,
          animation: 'gzs-float 4s ease-in-out infinite',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Esports Profile</div>
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg text-green-400"
            style={{ background: 'rgba(22,163,74,0.2)' }}
          >
            V
          </div>
          <div>
            <p className="font-bold text-white">viper_pro</p>
            <p className="text-xs text-white/50">Trust Score: 9.1</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['Valorant · Radiant', 'AP Server', '12 tournaments', '#1 Team Rankings'].map(s => (
            <span
              key={s}
              className="text-xs rounded-lg px-2 py-1.5 font-medium text-white/70"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
