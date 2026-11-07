import { SPLIT_FORMATS, SplitFormat } from '@/data/wallSetups';

interface SplitFormatBarProps {
  selectedFormat: string;
  onSelectFormat: (formatId: string) => void;
}

export const SplitFormatBar = ({
  selectedFormat,
  onSelectFormat,
}: SplitFormatBarProps) => {
  return (
    <div className="space-y-4">
      {/* 1. Header (Matching Image 3: "2,000+ DESIGNS - Shop all posters") */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-800 block">
            2,000+ DESIGNS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Shop all posters
          </h2>
        </div>
        <p className="text-xs text-neutral-500">
          Choose a poster format to explore tailored layouts & multi-panel room splits
        </p>
      </div>

      {/* 2. Visual Format Cards Row (Directly matching Image 3) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {SPLIT_FORMATS.map(fmt => {
          const isSelected = selectedFormat === fmt.id;

          return (
            <button
              key={fmt.id}
              onClick={() => onSelectFormat(fmt.id)}
              className={`group text-left p-3.5 rounded-2xl border-2 flex flex-col justify-between transition-all duration-200 ${
                isSelected
                  ? 'border-neutral-900 bg-white shadow-lg ring-2 ring-neutral-900/10'
                  : 'border-neutral-200/90 bg-white/80 hover:border-neutral-400 hover:bg-white shadow-sm'
              }`}
            >
              {/* Graphic Mockup Preview (Matching Image 3) */}
              <div className="aspect-[4/3] rounded-xl bg-[#F4EFE6] border border-neutral-300/70 p-2 mb-3 flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-[#ECE4D5] transition-colors">
                {/* Promo Badge at Top (e.g. BUY 5 GET 5 FREE) */}
                {fmt.promoBadge && (
                  <span className="absolute top-1.5 inset-x-1.5 text-center px-1.5 py-0.5 rounded bg-neutral-900 text-amber-300 text-[8px] font-black uppercase tracking-wider shadow-sm">
                    {fmt.promoBadge}
                  </span>
                )}

                {/* Format Mockup Diagrams */}
                {fmt.id === 'single' && (
                  <div className="grid grid-cols-5 gap-0.5 mt-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="w-2.5 h-3.5 bg-white border border-neutral-400/80 rounded-[1px]" />
                    ))}
                  </div>
                )}

                {fmt.id === 'split-3' && (
                  <div className="flex gap-1 mt-2">
                    <div className="w-5 h-7 bg-white border border-neutral-400/80 rounded-[1px] flex items-center justify-center text-[7px] font-bold text-neutral-600">
                      1
                    </div>
                    <div className="w-5 h-7 bg-white border border-neutral-400/80 rounded-[1px] flex items-center justify-center text-[7px] font-bold text-neutral-600">
                      2
                    </div>
                    <div className="w-5 h-7 bg-white border border-neutral-400/80 rounded-[1px] flex items-center justify-center text-[7px] font-bold text-neutral-600">
                      3
                    </div>
                  </div>
                )}

                {fmt.id === 'split-4' && (
                  <div className="grid grid-cols-2 gap-0.5 mt-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-white border border-neutral-400/80 rounded-[1px] flex items-center justify-center text-[7px] font-bold text-neutral-600">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                )}

                {fmt.id === 'split-5' && (
                  <div className="flex gap-0.5 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="w-3.5 h-8 bg-white border border-neutral-400/80 rounded-[1px] flex items-center justify-center text-[6px] font-bold text-neutral-600">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                )}

                {fmt.id === 'split-8' && (
                  <div className="grid grid-cols-4 gap-0.5 mt-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="w-4 h-4.5 bg-white border border-neutral-400/80 rounded-[1px] flex items-center justify-center text-[6px] font-bold text-neutral-600">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Underline (Matching Image 3) */}
              <div>
                <h3 className="font-display font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-amber-800 transition-colors">
                  {fmt.name}
                </h3>
                <div
                  className={`h-0.5 w-6 mt-1 rounded-full transition-all ${
                    isSelected ? 'bg-neutral-900 w-10' : 'bg-transparent'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SplitFormatBar;

