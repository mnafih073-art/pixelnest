import { ArrowRight, ArrowUpRight, Play, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import {
  PageId,
  PortfolioProject,
  SERVICES_LIST,
  STUDIO_INFO,
} from '../data/studioData';
import { BrandMark } from '../components/BrandMark';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  heroImage: string;
  projects: PortfolioProject[];
  onNavigate: (page: PageId) => void;
  onOpenProject: (project: PortfolioProject) => void;
  onEnquireService: (serviceTitle: string) => void;
}

const STUDIO_HIGHLIGHTS = [
  { metric: '10', label: 'Creative Disciplines', detail: 'Design, Web, Video & Photo' },
  { metric: '9', label: 'Portfolio Galleries', detail: 'Commercial to Wedding Cinema' },
  { metric: '48h', label: 'Concept Response', detail: 'Fast initial creative direction' },
  { metric: '100%', label: 'Custom Quotes', detail: 'Fair pricing tailored to scope' },
];

export function HomePage({
  heroImage,
  projects,
  onNavigate,
  onOpenProject,
  onEnquireService,
}: HomePageProps) {
  const featuredProjects = projects.filter((p) => p.featuredOnHome);
  const highlightedServices = SERVICES_LIST.slice(0, 6);

  return (
    <div>
      {/* 1. Hero Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-12 lg:pt-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Typographic Column */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between py-2"
          >
            <div>
              <div className="inline-flex items-center gap-3">
                <BrandMark variant="blue" className="w-8 h-8 shrink-0" />
                <span className="text-sm font-medium text-[#1438B8]">
                  {STUDIO_INFO.name}
                  <span className="mx-2 text-[#0D1E54]/30" aria-hidden="true">·</span>
                  <span className="text-[#0D1E54]/75">{STUDIO_INFO.motto}</span>
                </span>
              </div>

              <h1
                className="mt-6 font-display font-bold tracking-tight text-[#0D1E54] leading-[1.05] text-balance"
                style={{ fontSize: 'clamp(2.35rem, 4.1vw, 3.85rem)' }}
              >
                Visual craft that turns ideas into unmistakable brands.
              </h1>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#0D1E54]/78 max-w-xl">
                We are a creative digital design and media production studio crafting graphic design, UI/UX, cinematic reels, photography, and digital ads—built for businesses, creators, and individuals at fair, honest pricing.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#0D1E54]/10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('works')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-medium text-[#FAF6EE] bg-[#1438B8] hover:bg-[#091B5C] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1438B8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF6EE]"
              >
                <span>Explore Our Works</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-[#0D1E54] border border-[#0D1E54]/20 hover:border-[#1438B8] hover:text-[#1438B8] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1438B8]"
              >
                <span>View Services</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right Dominant Visual Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#091B5C] min-h-[300px] sm:min-h-[380px] lg:h-full border border-[#0D1E54]/10">
              <ResilientImage
                src={heroImage}
                alt="Pixel Nest Studio production floor with cinema camera, calibrated display, and architectural daylight"
                title={STUDIO_INFO.name}
                loading="eager"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-[#091B5C]/90 via-[#091B5C]/45 to-transparent text-[#FAF6EE]">
                <p className="text-xs font-medium text-[#DBEAFE]">
                  Design · Film · Photography · Digital Campaigns
                </p>
                <p className="mt-1 font-display text-base sm:text-lg font-semibold">
                  End-to-end creative production under one roof
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width Studio Strip below Hero Split */}
        <div className="mt-10 pt-8 border-t border-[#0D1E54]/12 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STUDIO_HIGHLIGHTS.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#1438B8] tabular-nums">
                {item.metric}
              </div>
              <div className="text-sm font-semibold text-[#0D1E54]">
                {item.label}
              </div>
              <div className="text-xs text-[#0D1E54]/65">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subtle Editorial Marquee Divider */}
      <div className="border-y border-[#0D1E54]/10 bg-[#F4EDE0] py-3.5 overflow-hidden" aria-hidden="true">
        <div className="animate-marquee text-xs font-medium tracking-wide text-[#1438B8]">
          {Array.from({ length: 4 }).map((_, idx) => (
            <span key={idx} className="flex items-center gap-6 pr-6 whitespace-nowrap">
              <span>graphic design & posters</span>
              <span>·</span>
              <span>ui/ux & web design</span>
              <span>·</span>
              <span>youtube thumbnails</span>
              <span>·</span>
              <span>social media reels</span>
              <span>·</span>
              <span>wedding cinema</span>
              <span>·</span>
              <span>automobile reels</span>
              <span>·</span>
              <span>ai video creation</span>
              <span>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. Featured Creative Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-22">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#1438B8]">
              Featured Projects
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0D1E54] text-balance">
              Selected studio works across print, web, and cinema.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('works')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1438B8] hover:text-[#091B5C] transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <span>Browse all 9 categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Asymmetric Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {featuredProjects.map((project, index) => {
            const spanClass =
              index === 0
                ? 'md:col-span-5'
                : index === 1
                ? 'md:col-span-7'
                : index === 2
                ? 'md:col-span-7'
                : 'md:col-span-5';

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.38, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`${spanClass} group`}
              >
                <button
                  type="button"
                  onClick={() => onOpenProject(project)}
                  className="w-full text-left block rounded-2xl overflow-hidden bg-white border border-[#0D1E54]/10 hover:border-[#1438B8]/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1438B8]"
                >
                  <div className="relative h-64 sm:h-80 lg:h-[420px] overflow-hidden bg-[#091B5C]">
                    <ResilientImage
                      src={project.image}
                      alt={project.title}
                      title={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091B5C]/75 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FAF6EE]/95 text-[#0D1E54] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                      {project.category.includes('Reel') ||
                      project.category.includes('Wedding') ||
                      project.category.includes('Automobile') ? (
                        <Play className="w-4 h-4 fill-current" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 text-[#FAF6EE]">
                      <div className="flex items-center gap-2 text-xs text-[#DBEAFE]">
                        <span>{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.format}</span>
                      </div>
                      <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold tracking-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* 3. Main Services Highlight */}
      <section className="bg-[#F4EDE0] border-y border-[#0D1E54]/10 py-16 lg:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Anchor Card in Deep Royal Blue */}
            <div className="lg:col-span-5 bg-[#091B5C] text-[#FAF6EE] rounded-2xl p-8 sm:p-10">
              <p className="text-xs font-semibold tracking-wide text-[#93C5FD]">
                Studio Capabilities
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
                Creative direction built for real growth.
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#FAF6EE]/80">
                Whether you need a single YouTube thumbnail pack, a full brand website, wedding highlight cinema, or high-impact automotive reels, every project is scoped transparently around your goals.
              </p>

              <div className="mt-8 pt-6 border-t border-[#FAF6EE]/15 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#091B5C] bg-[#FAF6EE] hover:bg-[#DBEAFE] rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Explore All 10 Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Clean Numbered Service Rows */}
            <div className="lg:col-span-7 divide-y divide-[#0D1E54]/12 border-y border-[#0D1E54]/12">
              {highlightedServices.map((service) => (
                <div
                  key={service.id}
                  className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="max-w-lg">
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-sm font-bold text-[#1438B8] tabular-nums">
                        {service.number}
                      </span>
                      <h3 className="font-display text-xl font-bold text-[#0D1E54] group-hover:text-[#1438B8] transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm text-[#0D1E54]/75 leading-relaxed pl-8">
                      {service.summary}
                    </p>
                  </div>

                  <div className="pl-8 sm:pl-0 shrink-0">
                    <button
                      type="button"
                      onClick={() => onEnquireService(service.title)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#1438B8] bg-white border border-[#0D1E54]/15 hover:bg-[#1438B8] hover:text-[#FAF6EE] hover:border-[#1438B8] rounded-xl transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Discuss Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strong "Let's Create Something Amazing" Call-to-Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-22">
        <div className="bg-[#1438B8] text-[#FAF6EE] rounded-2xl px-6 py-12 sm:px-12 sm:py-16 lg:px-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#DBEAFE]">
              <Sparkles className="w-4 h-4" />
              <span>{STUDIO_INFO.motto}</span>
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Let&apos;s Create Something Amazing
            </h2>
            <p className="mt-4 text-base text-[#DBEAFE]/90 leading-relaxed max-w-xl">
              Share your idea, timeline, or campaign vision. We will craft a fair, custom project proposal tailored to your goals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold text-[#091B5C] bg-[#FAF6EE] hover:bg-[#DBEAFE] rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6EE]"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
