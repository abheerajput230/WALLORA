import React from 'react';

export interface RealisticFrameProps {
  imageSrc: string;
  alt?: string;
  frameColor?: 'black' | 'wood' | 'white' | 'gold' | string;
  aspectRatio?: string; // e.g. "aspect-[3/4]"
  withMat?: boolean;    // White inner matting / passe-partout
  sizeLabel?: string;   // 'A4' | 'A3' | '12 × 18' | '18 × 24'
  className?: string;
  showGlassReflection?: boolean;
  showWallShadow?: boolean;
}

export const FRAME_STYLES = {
  black: {
    name: 'Classic Gallery Black',
    outerBg: 'linear-gradient(135deg, #2a2a2a 0%, #161616 50%, #0d0d0d 100%)',
    outerBorder: '#141414',
    innerBevel: 'inset 1px 1px 2px rgba(255, 255, 255, 0.2), inset -1px -1px 3px rgba(0, 0, 0, 0.8)',
    shadow: '20px 28px 50px -10px rgba(0, 0, 0, 0.38), 8px 12px 20px -5px rgba(0, 0, 0, 0.22)',
  },
  wood: {
    name: 'Natural Warm Oak',
    outerBg: 'linear-gradient(135deg, #a37549 0%, #875c34 50%, #684321 100%)',
    outerBorder: '#63401f',
    innerBevel: 'inset 1px 1px 2px rgba(255, 255, 255, 0.35), inset -1px -1px 3px rgba(0, 0, 0, 0.6)',
    shadow: '20px 28px 50px -10px rgba(90, 50, 20, 0.32), 8px 12px 20px -5px rgba(0, 0, 0, 0.2)',
  },
  white: {
    name: 'Studio White',
    outerBg: 'linear-gradient(135deg, #ffffff 0%, #f4f2ee 50%, #e8e4dc 100%)',
    outerBorder: '#dfdad0',
    innerBevel: 'inset 1px 1px 2px rgba(255, 255, 255, 0.9), inset -1px -1px 3px rgba(0, 0, 0, 0.15)',
    shadow: '20px 28px 45px -10px rgba(0, 0, 0, 0.25), 6px 10px 16px -4px rgba(0, 0, 0, 0.12)',
  },
  gold: {
    name: 'Champagne Gold',
    outerBg: 'linear-gradient(135deg, #e4be78 0%, #c4994d 50%, #9e752e 100%)',
    outerBorder: '#966e27',
    innerBevel: 'inset 1px 1px 2px rgba(255, 255, 255, 0.6), inset -1px -1px 3px rgba(0, 0, 0, 0.5)',
    shadow: '20px 28px 50px -10px rgba(160, 115, 35, 0.32), 8px 12px 20px -5px rgba(0, 0, 0, 0.2)',
  },
};

export const RealisticFrame: React.FC<RealisticFrameProps> = ({
  imageSrc,
  alt = 'Framed Poster',
  frameColor = 'black',
  aspectRatio = 'aspect-[3/4]',
  withMat = false,
  sizeLabel,
  className = '',
  showGlassReflection = true,
  showWallShadow = true,
}) => {
  const currentStyle =
    FRAME_STYLES[frameColor as keyof typeof FRAME_STYLES] || FRAME_STYLES.black;

  return (
    <div className={`relative inline-block ${className}`}>
      {/* 3D Realistic Outer Wooden Moulding */}
      <div
        className="relative rounded-[2px] transition-all duration-300 group"
        style={{
          background: currentStyle.outerBg,
          boxShadow: showWallShadow
            ? `${currentStyle.shadow}, ${currentStyle.innerBevel}`
            : currentStyle.innerBevel,
          padding: '14px', // Moulding thickness
          border: `1px solid ${currentStyle.outerBorder}`,
        }}
      >
        {/* Inner Bevel Groove / Lip */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            boxShadow: 'inset 2px 2px 5px rgba(0, 0, 0, 0.55), inset -1px -1px 3px rgba(0, 0, 0, 0.4)',
            backgroundColor: withMat ? '#FAF7F2' : '#000000',
            padding: withMat ? '16px' : '0px',
          }}
        >
          {/* Inner Matte Cutout with bevel */}
          <div
            className={`relative w-full ${aspectRatio} overflow-hidden bg-neutral-900`}
            style={{
              boxShadow: withMat
                ? 'inset 1px 1px 3px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0,0,0,0.1)'
                : 'none',
            }}
          >
            {/* The Actual Poster Artwork */}
            <img
              src={imageSrc}
              alt={alt}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
              loading="lazy"
            />

            {/* Subtle Realistic Acrylic Glass Sheen Overlay */}
            {showGlassReflection && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(125deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 28%, rgba(255,255,255,0.0) 50%, rgba(255,255,255,0.04) 75%, transparent 100%)',
                }}
              />
            )}
          </div>
        </div>

        {/* Optional Size Badge on bottom right corner */}
        {sizeLabel && (
          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-neutral-900/90 text-amber-300 text-[10px] font-bold rounded shadow-md border border-neutral-700/60 uppercase tracking-wider">
            {sizeLabel}
          </div>
        )}
      </div>
    </div>
  );
};

export default RealisticFrame;

