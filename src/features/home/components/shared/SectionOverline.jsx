export default function SectionOverline({ children, color = 'var(--theme-primary)' }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color }}>
      {children}
    </p>
  );
}





