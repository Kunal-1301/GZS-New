const TICKER_ITEMS = [
  'Riya verified her Concept Art skill',
  'valorant_pro registered for Winter Showdown 2026',
  'New game added: Hollow Knight: Silksong',
  'devkumar posted in Dev branch',
  'Art contest winner announced in Art branch',
  'GzoneSphere · 280 members online now',
  'Tournament bracket published: BGMI Open 2026',
  'writing_gzs published a new blog post',
  'kunal_gzs completed 3 skill verifications',
  'New company profile: NexGen Studios is hiring',
];

export default function LiveTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="gzs-ticker">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
