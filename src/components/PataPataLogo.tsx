import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'stacked' | 'badge';
  className?: string;
  showSubtitle?: boolean;
  color?: string; // e.g. "currentColor" | "#ffffff" | "#f59e0b"
}

/**
 * Authentic Original Pata Pata Logo
 * Faithfully vectorized from the original 286 Fox Street Maboneng logo identity:
 * - Geometric solid 'P'
 * - Triangular 'A' with diamond center cutout
 * - Bold architectural 'T'
 * - Dual parallel horizontal dividing lines
 * - Stacked "PATA PATA" rhythm
 */
export const AuthenticLogoSvg: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'w-full h-auto', color = 'currentColor' }) => {
  // Glyph parameters (viewBox: 0 0 420 238)
  const renderRow = (yOffset: number) => (
    <g transform={`translate(0, ${yOffset})`}>
      {/* P (width: 94, x: 0) */}
      <path
        d="M 0 0 L 52 0 C 78 0 94 14 94 32 C 94 50 78 64 52 64 L 34 64 L 34 100 L 0 100 Z"
        fill={color}
      />

      {/* A (width: 102, x: 104) with diamond punch hole */}
      <path
        fillRule="evenodd"
        d="M 155 0 L 206 100 L 104 100 Z M 155 48 L 165 58 L 155 68 L 145 58 Z"
        fill={color}
      />

      {/* T (width: 88, x: 218) */}
      <path
        d="M 218 0 L 306 0 L 306 24 L 278 24 L 278 100 L 246 100 L 246 24 L 218 24 Z"
        fill={color}
      />

      {/* A (width: 102, x: 318) with diamond punch hole */}
      <path
        fillRule="evenodd"
        d="M 369 0 L 420 100 L 318 100 Z M 369 48 L 379 58 L 369 68 L 359 58 Z"
        fill={color}
      />
    </g>
  );

  return (
    <svg
      viewBox="0 0 420 238"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Pata Pata Original Logo"
      style={{ display: 'block' }}
    >
      {/* Top Row: P A T A */}
      {renderRow(0)}

      {/* Dual Horizontal Divider Bars */}
      <rect x="0" y="108" width="420" height="7.5" rx="0.5" fill={color} />
      <rect x="0" y="123" width="420" height="7.5" rx="0.5" fill={color} />

      {/* Bottom Row: P A T A */}
      {renderRow(138)}
    </svg>
  );
};

export const PataPataLogo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  showSubtitle = true,
  color = '#FFFFFF',
}) => {
  // Pure stacked SVG logo
  if (variant === 'stacked') {
    return (
      <div className={`inline-block ${className}`}>
        <AuthenticLogoSvg color={color} className="w-full h-auto" />
      </div>
    );
  }

  // Compact variant for Navbar & Header
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        {/* Crisp original stacked logo */}
        <div className="w-12 sm:w-14 shrink-0 transition-transform duration-200 group-hover:scale-105">
          <AuthenticLogoSvg color={color} />
        </div>

        {/* Brand identity labels */}
        <div className="flex flex-col">
          <span className="font-display font-black text-sm tracking-[0.18em] uppercase text-[#faf5ee] leading-tight">
            Pata Pata
          </span>
          {showSubtitle && (
            <span className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#e67329] font-semibold leading-tight mt-0.5">
              286 Fox Street · Maboneng
            </span>
          )}
        </div>
      </div>
    );
  }

  // Badge variant: framed on authentic black backdrop with clean border
  if (variant === 'badge') {
    return (
      <div
        className={`bg-black border border-[#2b2118] p-4 rounded-2xl flex flex-col items-center text-center shadow-xl ${className}`}
      >
        <div className="w-36 max-w-full">
          <AuthenticLogoSvg color={color} />
        </div>
        {showSubtitle && (
          <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-[#e67329] font-semibold">
            African Restaurant · Maboneng
          </p>
        )}
      </div>
    );
  }

  // Full Presentation: Hero & Main branding showcases
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Authentic Original Logo Vector with subtle ambient warm glow */}
      <div className="relative mb-5 group">
        <div className="w-48 sm:w-60 md:w-72 max-w-full drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-[1.02]">
          <AuthenticLogoSvg color={color} />
        </div>
        {/* Soft amber radial aura behind the logo */}
        <div className="absolute inset-0 bg-[#e67329]/15 blur-2xl -z-10 rounded-full scale-125 pointer-events-none" />
      </div>

      {/* Authentic heritage metadata text */}
      {showSubtitle && (
        <div className="flex flex-col items-center">
          <p className="text-xs sm:text-sm font-sans tracking-[0.28em] text-[#e67329] uppercase font-bold">
            African Restaurant & Live Jazz
          </p>
          <div className="mt-1.5 flex items-center gap-2.5 text-[11px] sm:text-xs font-sans tracking-widest text-[#b8a996] uppercase">
            <span>286 Fox Street</span>
            <span className="text-[#e67329]">·</span>
            <span>Maboneng Precinct</span>
            <span className="text-[#e67329]">·</span>
            <span>Johannesburg</span>
          </div>
        </div>
      )}
    </div>
  );
};
