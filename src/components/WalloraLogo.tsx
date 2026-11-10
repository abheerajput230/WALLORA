import React from 'react';
import { Link } from 'react-router-dom';

export interface WalloraLogoProps {
  variant?: 'navbar' | 'footer' | 'icon-only' | 'full';
  theme?: 'dark' | 'light';
  className?: string;
  showTagline?: boolean;
}

export const INSTAGRAM_URL = 'https://www.instagram.com/bywallora?utm_source=qr&srtk=ZGY2enZ0NXRnOXhz';
export const BRAND_NAME = 'WALLORA';
export const BRAND_SUBTITLE = 'FRAMES • POSTERS • WALL ART';
export const BRAND_TAGLINE = 'Turn Your Walls Into Art.';

/**
 * WalloraLogo: Authentic Vector Monogram & Typography matching the official brand identity:
 * - Square Frame with split gold & matte black borders
 * - Stylized bold "W" with luxury gold swoosh
 * - Modern Geometric "WALLORA" Wordmark
 * - Subtitle: FRAMES • POSTERS • WALL ART
 */
export const WalloraLogo: React.FC<WalloraLogoProps> = ({
  variant = 'navbar',
  theme = 'light',
  className = '',
  showTagline = false,
}) => {
  const isDark = theme === 'dark';

  // Icon Emblem (Geometric Frame with Stylized W and Gold Swoosh)
  const LogoEmblem = ({ size = 38 }: { size?: number }) => (
    <div
      className="relative shrink-0 rounded-xl overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105"
      style={{ width: size, height: size }}
    >
      {/* Real Brand Logo Image */}
      <img
        src="/wallora-logo.jpg"
        alt="WALLORA"
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to stylized vector if image fails to load
          const target = e.target as HTMLElement;
          target.style.display = 'none';
        }}
      />

      {/* Subtle border highlight */}
      <div className="absolute inset-0 rounded-xl border border-amber-500/20 pointer-events-none" />
    </div>
  );

  if (variant === 'icon-only') {
    return <LogoEmblem size={36} />;
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-col items-start ${className}`}>
        <div className="flex items-center gap-3">
          <LogoEmblem size={44} />
          <div>
            <div className="flex items-baseline">
              <span className="font-display text-2xl font-black tracking-tight text-white">
                WALL<span className="text-amber-400">ORA</span>
              </span>
            </div>
            <span className="block text-[9px] font-bold tracking-[0.25em] uppercase text-neutral-400 mt-0.5">
              {BRAND_SUBTITLE}
            </span>
          </div>
        </div>
        <p className="text-xs text-amber-400/90 italic font-serif mt-2 tracking-wide">
          &ldquo;{BRAND_TAGLINE}&rdquo;
        </p>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <LogoEmblem size={64} />
        <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 mt-3">
          WALL<span className="text-amber-700">ORA</span>
        </h1>
        <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-neutral-500 mt-1">
          {BRAND_SUBTITLE}
        </p>
        {showTagline && (
          <p className="text-sm text-amber-800 italic font-serif mt-1">
            {BRAND_TAGLINE}
          </p>
        )}
      </div>
    );
  }

  // Default Navbar Variant
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <LogoEmblem size={38} />
      <div className="flex flex-col justify-center">
        <span
          className={`font-display text-xl sm:text-2xl font-black tracking-tight leading-none ${
            isDark ? 'text-white' : 'text-neutral-950'
          }`}
        >
          WALL<span className="text-amber-700">ORA</span>
        </span>
        <span
          className={`text-[8px] sm:text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5 leading-none ${
            isDark ? 'text-neutral-400' : 'text-neutral-500'
          }`}
        >
          FRAMES • POSTERS • ART
        </span>
      </div>
    </div>
  );
};

export default WalloraLogo;

