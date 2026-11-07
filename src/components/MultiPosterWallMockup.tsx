import React from 'react';

export type MockupLayout =
  | 'hero-pack'
  | 'split-3'
  | 'split-4'
  | 'split-5'
  | 'split-8'
  | 'mosaic'
  | 'hero'
  | 'showcase'
  | 'trio-xl'
  | 'single-grid';

interface MultiPosterWallMockupProps {
  layoutType?: MockupLayout;
  centerImage: string;
  centerImages?: string[];
  surroundingImages: string[];
  wallColor?: string;
  deskType?: 'desk' | 'shelf' | 'none';
  aspectRatio?: string;
  compact?: boolean;
}

export const MultiPosterWallMockup: React.FC<MultiPosterWallMockupProps> = ({
  layoutType = 'hero-pack',
  centerImage,
  centerImages,
  surroundingImages = [],
  wallColor = '#EDE5D8',
  deskType = 'desk',
  aspectRatio = 'aspect-[4/3]',
  compact = false,
}) => {
  // Ensure we have fallback images from surrounding array
  const s0 = surroundingImages[0] || centerImage;
  const s1 = surroundingImages[1] || centerImage;
  const s2 = surroundingImages[2] || centerImage;
  const s3 = surroundingImages[3] || centerImage;
  const s4 = surroundingImages[4] || centerImage;
  const s5 = surroundingImages[5] || centerImage;
  const s6 = surroundingImages[6] || centerImage;
  const s7 = surroundingImages[7] || centerImage;
  const s8 = surroundingImages[8] || centerImage;
  const s9 = surroundingImages[9] || centerImage;
  const s10 = surroundingImages[10] || centerImage;
  const s11 = surroundingImages[11] || centerImage;

  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden select-none flex flex-col justify-between`}
      style={{
        backgroundColor: wallColor,
        background: `radial-gradient(circle at 50% 35%, #FAF7F2 0%, ${wallColor} 85%)`,
      }}
    >
      {/* 1. Subtle wall plaster texture & lighting vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 via-transparent to-neutral-950/5 pointer-events-none z-10" />

      {/* 2. Top-Center Wall Posters Arrangement */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-2.5 sm:p-4">
        {/* =========================================================================
            A. HERO PACK (Matching User Reference: Centerpiece + Symmetrical Flanks)
            ========================================================================= */}
        {layoutType === 'hero-pack' && (
          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 max-w-full">
            {/* Left Column Flank (2 vertical posters) */}
            <div className="flex flex-col gap-1 sm:gap-1.5">
              <div className="w-8 sm:w-11 aspect-[3/4] bg-white p-0.5 shadow-sm rounded-[1px] overflow-hidden">
                <img src={s0} alt="Poster" className="w-full h-full object-cover" />
              </div>
              <div className="w-8 sm:w-11 aspect-[3/4] bg-white p-0.5 shadow-sm rounded-[1px] overflow-hidden">
                <img src={s1} alt="Poster" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Inner-Left Column Flank */}
            <div className="flex flex-col gap-1 sm:gap-1.5 hidden xs:flex">
              <div className="w-7 sm:w-9 aspect-[3/4] bg-white p-0.5 shadow-sm rounded-[1px] overflow-hidden">
                <img src={s2} alt="Poster" className="w-full h-full object-cover" />
              </div>
              <div className="w-7 sm:w-9 aspect-[3/4] bg-white p-0.5 shadow-sm rounded-[1px] overflow-hidden">
                <img src={s3} alt="Poster" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* MAIN HERO CENTERPIECE (Large prominent poster) */}
            <div className="relative z-20 mx-0.5 sm:mx-1 flex flex-col items-center">
              <div
                className="w-24 sm:w-36 md:w-44 aspect-[3/4] bg-white p-0.5 sm:p-1 rounded-[2px] overflow-hidden"
                style={{
                  boxShadow: '0 8px 20px -2px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.15)',
                }}
              >
                <img src={centerImage} alt="Center Hero Poster" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Inner-Right Column Flank */}
            <div className="flex flex-col gap-1 sm:gap-1.5 hidden xs:flex">
              <div className="w-7 sm:w-9 aspect-[3/4] bg-white p-0.5 shadow-sm rounded-[1px] overflow-hidden">
                <img src={s4} alt="Poster" className="w-full h-full object-cover" />
              </div>
              <div className="w-7 sm:w-9 aspect-[3/4] bg-white p-0.5 shadow-sm rounded-[1px] overflow-hidden">
                <img src={s5} alt="Poster" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right Column Flank (2 vertical posters) */}
            <div className="flex flex-col gap-1 sm:gap-1.5">
              <div className="w-8 sm:w-11 aspect-[3/4] bg-white p-0.5 shadow-sm rounded-[1px] overflow-hidden">
                <img src={s6} alt="Poster" className="w-full h-full object-cover" />
              </div>
              <div className="w-8 sm:w-11 aspect-[3/4] bg-white p-0.5 shadow-sm rounded-[1px] overflow-hidden">
                <img src={s7} alt="Poster" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            B. 3-PIECE SPLIT (Continuous center image split into 3 vertical panels)
            ========================================================================= */}
        {layoutType === 'split-3' && (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center gap-1">
              {/* Flank Left */}
              <div className="w-8 sm:w-10 aspect-[3/4] bg-white p-0.5 shadow-sm rounded-[1px] overflow-hidden hidden sm:block">
                <img src={s0} alt="Poster" className="w-full h-full object-cover" />
              </div>

              {/* 3 Panels of Center Poster */}
              <div className="flex items-center gap-0.5 p-1 bg-white/70 backdrop-blur-sm rounded-[2px] shadow-md">
                <div className="w-12 sm:w-16 md:w-20 aspect-[1/2] overflow-hidden rounded-[1px] bg-neutral-900 border border-neutral-300">
                  <img src={centerImage} alt="Split 1" className="w-[300%] h-full max-w-none object-cover" style={{ transform: 'translateX(0%)' }} />
                </div>
                <div className="w-12 sm:w-16 md:w-20 aspect-[1/2] overflow-hidden rounded-[1px] bg-neutral-900 border border-neutral-300">
                  <img src={centerImage} alt="Split 2" className="w-[300%] h-full max-w-none object-cover" style={{ transform: 'translateX(-33.33%)' }} />
                </div>
                <div className="w-12 sm:w-16 md:w-20 aspect-[1/2] overflow-hidden rounded-[1px] bg-neutral-900 border border-neutral-300">
                  <img src={centerImage} alt="Split 3" className="w-[300%] h-full max-w-none object-cover" style={{ transform: 'translateX(-66.66%)' }} />
                </div>
              </div>

              {/* Flank Right */}
              <div className="w-8 sm:w-10 aspect-[3/4] bg-white p-0.5 shadow-sm rounded-[1px] overflow-hidden hidden sm:block">
                <img src={s1} alt="Poster" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Bottom Companion Row */}
            <div className="flex items-center gap-1">
              {[s2, s3, s4, s5, s6].map((img, idx) => (
                <div key={idx} className="w-6 sm:w-8 aspect-[3/4] bg-white p-0.5 shadow-xs rounded-[1px] overflow-hidden">
                  <img src={img} alt="Mini" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            C. 4-PIECE SPLIT (2x2 Quad Grid)
            ========================================================================= */}
        {layoutType === 'split-4' && (
          <div className="flex items-center justify-center gap-2">
            <div className="flex flex-col gap-1 hidden xs:flex">
              <div className="w-7 sm:w-9 aspect-[3/4] bg-white p-0.5 shadow-xs rounded-[1px] overflow-hidden">
                <img src={s0} alt="Poster" className="w-full h-full object-cover" />
              </div>
              <div className="w-7 sm:w-9 aspect-[3/4] bg-white p-0.5 shadow-xs rounded-[1px] overflow-hidden">
                <img src={s1} alt="Poster" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* 2x2 Center Quad Split */}
            <div className="grid grid-cols-2 gap-0.5 p-1 bg-white rounded-[2px] shadow-lg">
              <div className="w-16 sm:w-22 aspect-square overflow-hidden bg-neutral-900">
                <img src={centerImage} alt="Quad 1" className="w-[200%] h-[200%] max-w-none object-cover" style={{ transform: 'translate(0%, 0%)' }} />
              </div>
              <div className="w-16 sm:w-22 aspect-square overflow-hidden bg-neutral-900">
                <img src={centerImage} alt="Quad 2" className="w-[200%] h-[200%] max-w-none object-cover" style={{ transform: 'translate(-50%, 0%)' }} />
              </div>
              <div className="w-16 sm:w-22 aspect-square overflow-hidden bg-neutral-900">
                <img src={centerImage} alt="Quad 3" className="w-[200%] h-[200%] max-w-none object-cover" style={{ transform: 'translate(0%, -50%)' }} />
              </div>
              <div className="w-16 sm:w-22 aspect-square overflow-hidden bg-neutral-900">
                <img src={centerImage} alt="Quad 4" className="w-[200%] h-[200%] max-w-none object-cover" style={{ transform: 'translate(-50%, -50%)' }} />
              </div>
            </div>

            <div className="flex flex-col gap-1 hidden xs:flex">
              <div className="w-7 sm:w-9 aspect-[3/4] bg-white p-0.5 shadow-xs rounded-[1px] overflow-hidden">
                <img src={s2} alt="Poster" className="w-full h-full object-cover" />
              </div>
              <div className="w-7 sm:w-9 aspect-[3/4] bg-white p-0.5 shadow-xs rounded-[1px] overflow-hidden">
                <img src={s3} alt="Poster" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            D. 5-PIECE SPLIT (5 Horizontal Panels)
            ========================================================================= */}
        {layoutType === 'split-5' && (
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-0.5 p-1 bg-white/80 rounded-[2px] shadow-md">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-8 sm:w-12 aspect-[1/3] overflow-hidden bg-neutral-900 border border-neutral-300">
                  <img
                    src={centerImage}
                    alt={`Split ${i + 1}`}
                    className="w-[500%] h-full max-w-none object-cover"
                    style={{ transform: `translateX(-${i * 20}%)` }}
                  />
                </div>
              ))}
            </div>
            {/* Bottom companion row */}
            <div className="flex gap-1">
              {[s0, s1, s2, s3, s4, s5].map((img, i) => (
                <div key={i} className="w-6 sm:w-7 aspect-[3/4] bg-white p-0.5 shadow-2xs rounded-[1px] overflow-hidden">
                  <img src={img} alt="Mini" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            E. 8-PIECE SPLIT (4x2 Mega Split)
            ========================================================================= */}
        {layoutType === 'split-8' && (
          <div className="grid grid-cols-4 gap-0.5 p-1 bg-white rounded-[2px] shadow-lg max-w-xs sm:max-w-md">
            {Array.from({ length: 8 }).map((_, i) => {
              const col = i % 4;
              const row = Math.floor(i / 4);
              return (
                <div key={i} className="w-10 sm:w-14 aspect-square overflow-hidden bg-neutral-900 border border-neutral-300">
                  <img
                    src={centerImage}
                    alt={`Split 8 - ${i + 1}`}
                    className="w-[400%] h-[200%] max-w-none object-cover"
                    style={{
                      transform: `translate(-${col * 25}%, -${row * 50}%)`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            F. MOSAIC WALL (19 Posters Architecture)
            ========================================================================= */}
        {layoutType === 'mosaic' && (
          <div className="flex flex-col items-center gap-1">
            {/* Top row */}
            <div className="flex gap-1">
              {[s0, s1, s2, s3, s4, s5].map((img, i) => (
                <div key={i} className="w-6 sm:w-8 aspect-[3/4] bg-white p-0.5 shadow-xs rounded-[1px] overflow-hidden">
                  <img src={img} alt="M" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            {/* Center: 3 posters */}
            <div className="flex items-center gap-1">
              <div className="flex flex-col gap-1">
                <div className="w-6 sm:w-8 aspect-[3/4] bg-white p-0.5 shadow-xs rounded-[1px] overflow-hidden">
                  <img src={s6} alt="M" className="w-full h-full object-cover" />
                </div>
                <div className="w-6 sm:w-8 aspect-[3/4] bg-white p-0.5 shadow-xs rounded-[1px] overflow-hidden">
                  <img src={s7} alt="M" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* 3 centerpiece posters */}
              <div className="flex gap-1 p-1 bg-white/80 rounded shadow">
                <div className="w-11 sm:w-15 aspect-[3/4] bg-neutral-900 rounded-[1px] overflow-hidden">
                  <img src={centerImage} alt="Hero 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-11 sm:w-15 aspect-[3/4] bg-neutral-900 rounded-[1px] overflow-hidden">
                  <img src={s8} alt="Hero 2" className="w-full h-full object-cover" />
                </div>
                <div className="w-11 sm:w-15 aspect-[3/4] bg-neutral-900 rounded-[1px] overflow-hidden">
                  <img src={s9} alt="Hero 3" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-6 sm:w-8 aspect-[3/4] bg-white p-0.5 shadow-xs rounded-[1px] overflow-hidden">
                  <img src={s10} alt="M" className="w-full h-full object-cover" />
                </div>
                <div className="w-6 sm:w-8 aspect-[3/4] bg-white p-0.5 shadow-xs rounded-[1px] overflow-hidden">
                  <img src={s11} alt="M" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            {/* Bottom row */}
            <div className="flex gap-1">
              {[s0, s1, s2, s3, s4].map((img, i) => (
                <div key={i} className="w-6 sm:w-8 aspect-[3/4] bg-white p-0.5 shadow-xs rounded-[1px] overflow-hidden">
                  <img src={img} alt="M" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            G. HERO WALL (1 Giant Center + 19 Surrounding)
            ========================================================================= */}
        {layoutType === 'hero' && (
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {/* Left flank: 2 cols x 3 rows */}
            <div className="grid grid-cols-2 gap-1">
              {[s0, s1, s2, s3, s4, s5].map((img, i) => (
                <div key={i} className="w-6 sm:w-8 aspect-[3/4] bg-white p-0.5 shadow-xs rounded-[1px] overflow-hidden">
                  <img src={img} alt="Flank" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Giant Center Hero */}
            <div className="w-24 sm:w-36 aspect-[3/4] bg-white p-1 rounded-[2px] shadow-xl overflow-hidden border-2 border-neutral-300">
              <img src={centerImage} alt="Hero" className="w-full h-full object-cover" />
            </div>

            {/* Right flank: 2 cols x 3 rows */}
            <div className="grid grid-cols-2 gap-1">
              {[s6, s7, s8, s9, s10, s11].map((img, i) => (
                <div key={i} className="w-6 sm:w-8 aspect-[3/4] bg-white p-0.5 shadow-xs rounded-[1px] overflow-hidden">
                  <img src={img} alt="Flank" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            H. TRIO XL WALL (3 Large XL Posters + Surrounding Mini Prints)
            ========================================================================= */}
        {layoutType === 'trio-xl' && (
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-14 sm:w-20 aspect-[3/5] bg-white p-0.5 rounded shadow-md overflow-hidden">
                <img src={centerImage} alt="XL 1" className="w-full h-full object-cover" />
              </div>
              <div className="w-14 sm:w-20 aspect-[3/5] bg-white p-0.5 rounded shadow-md overflow-hidden">
                <img src={s0} alt="XL 2" className="w-full h-full object-cover" />
              </div>
              <div className="w-14 sm:w-20 aspect-[3/5] bg-white p-0.5 rounded shadow-md overflow-hidden">
                <img src={s1} alt="XL 3" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Surrounding row */}
            <div className="flex gap-1">
              {[s2, s3, s4, s5, s6, s7, s8].map((img, i) => (
                <div key={i} className="w-5 sm:w-7 aspect-[3/4] bg-white p-0.5 shadow-xs rounded-[1px] overflow-hidden">
                  <img src={img} alt="Mini" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            I. SINGLE GRID (Clean grid of single prints)
            ========================================================================= */}
        {layoutType === 'single-grid' && (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 max-w-sm sm:max-w-md">
            {[centerImage, s0, s1, s2, s3, s4, s5, s6, s7, s8].map((img, i) => (
              <div key={i} className="aspect-[3/4] bg-white p-0.5 shadow-sm rounded-[1px] overflow-hidden">
                <img src={img} alt="Single" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Bottom Room Elements (Matching user's reference photos with desk/laptop/shelf) */}
      {deskType === 'desk' && (
        <div className="relative z-20 w-full select-none pointer-events-none">
          {/* Desk Surface */}
          <div
            className="w-full h-6 sm:h-9 rounded-t-sm shadow-xl flex items-center justify-between px-4 sm:px-8 border-t border-neutral-300"
            style={{
              background: 'linear-gradient(180deg, #EFECE6 0%, #D8D2C6 100%)',
              boxShadow: '0 -4px 15px rgba(0,0,0,0.18)',
            }}
          >
            {/* Mini Laptop Silhouette on Desk */}
            <div className="w-10 sm:w-14 h-2.5 sm:h-3.5 bg-neutral-800 rounded-t-xs mx-auto opacity-75 shadow-sm" />
          </div>
        </div>
      )}

      {deskType === 'shelf' && (
        <div className="relative z-20 w-full select-none pointer-events-none">
          {/* Floating Wooden Shelf */}
          <div
            className="w-11/12 mx-auto h-3 sm:h-4.5 rounded-xs shadow-xl border-t-2 border-neutral-900"
            style={{
              background: 'linear-gradient(180deg, #1C1917 0%, #0C0A09 100%)',
              boxShadow: '0 6px 14px rgba(0,0,0,0.35)',
            }}
          />
          <div className="h-4" />
        </div>
      )}
    </div>
  );
};

export default MultiPosterWallMockup;

