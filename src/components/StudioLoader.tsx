import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PixelCell {
  id: number;
  row: number;
  col: number;
  color: string;
  minScale: number;
  maxScale: number;
  minOpacity: number;
}

const PIXEL_GRID: PixelCell[] = [
  // Row 0
  { id: 0, row: 0, col: 0, color: '#0A7BE4', minScale: 0.72, maxScale: 0.96, minOpacity: 0.78 },
  { id: 1, row: 0, col: 1, color: '#0987F5', minScale: 0.78, maxScale: 1.04, minOpacity: 0.85 },
  { id: 2, row: 0, col: 2, color: '#0094FF', minScale: 0.84, maxScale: 1.08, minOpacity: 0.92 },
  // Row 1
  { id: 3, row: 1, col: 0, color: '#0B84F3', minScale: 0.78, maxScale: 1.04, minOpacity: 0.84 },
  { id: 4, row: 1, col: 1, color: '#6AC4E2', minScale: 0.74, maxScale: 1.02, minOpacity: 0.95 },
  { id: 5, row: 1, col: 2, color: '#1466C2', minScale: 0.58, maxScale: 0.88, minOpacity: 0.68 },
  // Row 2
  { id: 6, row: 2, col: 0, color: '#144F98', minScale: 0.52, maxScale: 0.82, minOpacity: 0.62 },
  { id: 7, row: 2, col: 1, color: '#154480', minScale: 0.42, maxScale: 0.74, minOpacity: 0.52 },
  { id: 8, row: 2, col: 2, color: '#133A6C', minScale: 0.34, maxScale: 0.66, minOpacity: 0.45 },
];

export function StudioLoader() {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 1850);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKey);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="studio-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040C1E] text-[#FAF6EE] px-6 cursor-pointer select-none"
          aria-live="polite"
          aria-label="Loading Pixel Nest Studio"
        >
          <div className="flex flex-col items-center">
            {/* 3x3 Animated Pixel Matrix */}
            <div
              className="grid grid-cols-3 gap-2 w-[78px] h-[78px]"
              aria-hidden="true"
            >
              {PIXEL_GRID.map((cell) => {
                const diagonalDelay = (cell.row + cell.col) * 0.09;
                return (
                  <motion.div
                    key={cell.id}
                    initial={{ scale: 0.15, opacity: 0 }}
                    animate={{
                      scale: [cell.minScale, cell.maxScale, cell.minScale, cell.maxScale * 0.94],
                      opacity: [cell.minOpacity, 1, cell.minOpacity, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: diagonalDelay,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{ backgroundColor: cell.color }}
                    className="w-full h-full rounded-[5px]"
                  />
                );
              })}
            </div>

            {/* Spaced Minimal Wordmark */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 font-display text-[11px] sm:text-xs font-medium tracking-[0.42em] text-[#E6EEF9]/90 uppercase pl-[0.42em] text-center"
            >
              PIXEL NEST STUDIO
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
