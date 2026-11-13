import { ArrowUpRight, Expand, ImagePlus } from 'lucide-react';
import { motion } from 'motion/react';
import {
  PORTFOLIO_CATEGORIES,
  PortfolioFilter,
  PortfolioProject,
} from '../data/studioData';
import { ResilientImage } from '../components/ResilientImage';

interface OurWorksPageProps {
  projects: PortfolioProject[];
  activeCategory: PortfolioFilter;
  onSelectCategory: (category: PortfolioFilter) => void;
  onOpenProject: (project: PortfolioProject) => void;
  onStartProject: () => void;
  onOpenMediaManager: () => void;
}

export function OurWorksPage({
  projects,
  activeCategory,
  onSelectCategory,
  onOpenProject,
  onStartProject,
  onOpenMediaManager,
}: OurWorksPageProps) {
  const filteredProjects =
    activeCategory === 'All Works'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-20 lg:pt-14 lg:pb-24">
      {/* Editorial Portfolio Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-wide text-[#1438B8]">
            Our Works
          </p>
          <h1
            className="mt-2 font-display font-bold tracking-tight text-[#0D1E54] leading-[1.08] text-balance"
            style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.35rem)' }}
          >
            Crafted visuals across design, film, photography, and campaigns.
          </h1>
          <p className="mt-4 text-base text-[#0D1E54]/75 leading-relaxed">
            Explore our curated studio archive by category. Select any piece to inspect the full-resolution preview, deliverables, and creative brief.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenMediaManager}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#1438B8] bg-[#F4EDE0] hover:bg-[#1438B8] hover:text-[#FAF6EE] border border-[#0D1E54]/12 rounded-xl transition-colors whitespace-nowrap shrink-0 self-start lg:self-end"
        >
          <ImagePlus className="w-4 h-4" />
          <span>Upload Your Images</span>
        </button>
      </div>

      {/* Category Filter Bar — 9 Categories + All Works */}
      <div className="mt-8 pb-6 border-b border-[#0D1E54]/12">
        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Filter portfolio by category"
        >
          {PORTFOLIO_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const count =
              category === 'All Works'
                ? projects.length
                : projects.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectCategory(category)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1438B8] ${
                  isActive
                    ? 'bg-[#1438B8] text-[#FAF6EE]'
                    : 'bg-[#F4EDE0] text-[#0D1E54]/80 hover:bg-[#EAE0CD] hover:text-[#0D1E54]'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[11px] tabular-nums ${
                    isActive ? 'text-[#DBEAFE]' : 'text-[#0D1E54]/50'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Masonry / Bento Visual Showcase */}
      <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
            className="break-inside-avoid group"
          >
            <button
              type="button"
              onClick={() => onOpenProject(project)}
              className="w-full text-left block rounded-2xl overflow-hidden bg-white border border-[#0D1E54]/10 hover:border-[#1438B8]/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1438B8]"
            >
              <div className={`relative overflow-hidden bg-[#091B5C] ${project.aspectClass}`}>
                <ResilientImage
                  src={project.image}
                  alt={project.title}
                  title={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[#091B5C]/0 group-hover:bg-[#091B5C]/25 transition-colors duration-200" />
                <div className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-[#FAF6EE]/95 text-[#0D1E54] flex items-center justify-center opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 shadow-sm">
                  <Expand className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-xs font-medium text-[#1438B8]">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#0D1E54]/55">{project.format}</span>
                </div>
                <h2 className="mt-1.5 font-display text-lg font-bold tracking-tight text-[#0D1E54] group-hover:text-[#1438B8] transition-colors">
                  {project.title}
                </h2>
                <p className="mt-1 text-xs text-[#0D1E54]/65">
                  {project.client} · <span className="tabular-nums">{project.year}</span>
                </p>
              </div>
            </button>
          </motion.article>
        ))}
      </div>

      {/* Bottom Portfolio CTA */}
      <div className="mt-16 pt-10 border-t border-[#0D1E54]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0D1E54]">
            Want something crafted in your brand&apos;s voice?
          </h2>
          <p className="mt-1 text-sm text-[#0D1E54]/70">
            Tell us which style caught your eye and we will tailor a production plan for you.
          </p>
        </div>
        <button
          type="button"
          onClick={onStartProject}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#FAF6EE] bg-[#1438B8] hover:bg-[#091B5C] rounded-xl transition-colors whitespace-nowrap shrink-0"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
