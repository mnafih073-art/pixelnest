import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioProject } from '../data/studioData';
import { ResilientImage } from './ResilientImage';

interface ProjectLightboxProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onEnquire: (serviceTitle: string) => void;
  hasMultiple: boolean;
}

export function ProjectLightbox({
  project,
  onClose,
  onPrev,
  onNext,
  onEnquire,
  hasMultiple,
}: ProjectLightboxProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasMultiple) onPrev();
      if (e.key === 'ArrowRight' && hasMultiple) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose, onPrev, onNext, hasMultiple]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#091B5C]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl max-h-[90vh] bg-[#FAF6EE] text-[#0D1E54] rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project preview"
              className="absolute top-4 right-4 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#FAF6EE]/95 text-[#0D1E54] border border-[#0D1E54]/15 hover:bg-[#1438B8] hover:text-[#FAF6EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1438B8]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Column */}
            <div className="lg:col-span-7 bg-[#091B5C] relative flex items-center justify-center min-h-[260px] sm:min-h-[380px] lg:min-h-[540px] max-h-[55vh] lg:max-h-[85vh] overflow-hidden">
              <ResilientImage
                src={project.image}
                alt={project.title}
                title={project.title}
                loading="eager"
                className="w-full h-full object-contain max-h-[55vh] lg:max-h-[85vh]"
              />

              {hasMultiple && (
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <button
                    type="button"
                    onClick={onPrev}
                    aria-label="Previous project"
                    className="pointer-events-auto inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#FAF6EE]/95 text-[#0D1E54] hover:bg-[#1438B8] hover:text-[#FAF6EE] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6EE]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Next project"
                    className="pointer-events-auto inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#FAF6EE]/95 text-[#0D1E54] hover:bg-[#1438B8] hover:text-[#FAF6EE] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6EE]"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Editorial Details Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto max-h-[45vh] lg:max-h-[85vh]">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#1438B8] pr-12">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{project.year}</span>
                </div>

                <h2
                  id="lightbox-title"
                  className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0D1E54] text-balance"
                >
                  {project.title}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-[#0D1E54]/70">
                  <span>{project.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.format}</span>
                </div>

                <div className="my-6 h-px bg-[#0D1E54]/10" />

                <p className="text-[15px] leading-relaxed text-[#0D1E54]/85">
                  {project.description}
                </p>

                <div className="mt-6">
                  <h3 className="text-xs font-semibold tracking-wide text-[#0D1E54]/60">
                    Deliverables Included
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {project.deliverables.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-[#0D1E54] flex items-center gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1438B8] shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-[#0D1E54]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs text-[#0D1E54]/65">
                  Service: <strong className="font-medium text-[#0D1E54]">{project.serviceMatch}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => onEnquire(project.serviceMatch)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#FAF6EE] bg-[#1438B8] hover:bg-[#091B5C] rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1438B8]"
                >
                  <span>Enquire About Similar Work</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
