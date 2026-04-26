export default function SectionHeading({ children, light = false, className = '' }) {
  return (
    <h2
      className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${light ? 'text-white' : 'text-[#0F172A]'} ${className}`}
    >
      {children}
    </h2>
  );
}





