/**
 * GzsLogo Component
 * ──────────────────
 * Professional GzoneSphere logo: circular G icon + "GZONESPHERE" wordmark
 * 
 * Props:
 *  - variant: 'dark' | 'light' | 'primary' (default: 'light')
 *  - size: number in pixels (default: 32)
 *  - showText: boolean (default: true) — show wordmark text
 *  - textOnly: boolean (default: false) — render only text, no icon
 */

export default function GzsLogo({
  variant = 'light',
  size = 32,
  showText = true,
  textOnly = false,
  className = ''
}) {
  const getColors = () => {
    switch (variant) {
      case 'dark':
        return { icon: '#0F172A', text: '#0F172A' };
      case 'light':
        return { icon: '#FFFFFF', text: '#FFFFFF' };
      case 'primary':
        return { icon: 'var(--theme-primary)', text: 'var(--theme-primary)' };
      default:
        return { icon: '#FFFFFF', text: '#FFFFFF' };
    }
  };

  const colors = getColors();

  if (textOnly) {
    return (
      <span
        className={`font-bold text-lg tracking-tight whitespace-nowrap ${className}`}
        style={{ color: colors.text }}
      >
        GZONESPHERE
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Circular G Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle
          cx="16"
          cy="16"
          r="15"
          fill={colors.icon}
          opacity="0.1"
          stroke={colors.icon}
          strokeWidth="1"
        />

        {/* G letter - modern, geometric style */}
        <g>
          {/* Main vertical stroke */}
          <path
            d="M 11 8 L 11 24"
            stroke={colors.icon}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Top horizontal */}
          <path
            d="M 11 8 L 21 8"
            stroke={colors.icon}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Middle horizontal (partial) */}
          <path
            d="M 11 16 L 18 16"
            stroke={colors.icon}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Bottom horizontal */}
          <path
            d="M 11 24 L 21 24"
            stroke={colors.icon}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right vertical (partial - upper) */}
          <path
            d="M 21 8 L 21 14"
            stroke={colors.icon}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right vertical (partial - lower) */}
          <path
            d="M 21 18 L 21 24"
            stroke={colors.icon}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>

      {/* Wordmark Text */}
      {showText && (
        <span
          className="font-bold text-sm tracking-tight whitespace-nowrap"
          style={{
            color: colors.text,
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          GZONESPHERE
        </span>
      )}
    </div>
  );
}





