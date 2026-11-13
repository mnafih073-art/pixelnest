import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import {
  PortfolioCategory,
  ServiceGroup,
  SERVICES_LIST,
} from '../data/studioData';

interface ServicesPageProps {
  onEnquireService: (serviceTitle: string) => void;
  onViewCategoryWork: (category: PortfolioCategory) => void;
}

const SERVICE_GROUPS: ServiceGroup[] = ['All', 'Design & Web', 'Video & Reels', 'Photo & Ads'];

export function ServicesPage({
  onEnquireService,
  onViewCategoryWork,
}: ServicesPageProps) {
  const [activeGroup, setActiveGroup] = useState<ServiceGroup>('All');

  const filteredServices =
    activeGroup === 'All'
      ? SERVICES_LIST
      : SERVICES_LIST.filter((s) => s.group === activeGroup);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-20 lg:pt-14 lg:pb-24">
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#0D1E54]/12">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-[#1438B8]">
            Studio Services
          </p>
          <h1
            className="mt-2 font-display font-bold tracking-tight text-[#0D1E54] leading-[1.08] text-balance"
            style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.35rem)' }}
          >
            Ten creative disciplines crafted for modern brands & creators.
          </h1>
          <p className="mt-4 text-base text-[#0D1E54]/75 leading-relaxed">
            Every project has unique goals, deliverables, and timelines. Rather than rigid packages, we provide clear, fair custom quotes tailored to what you actually need.
          </p>
        </div>

        {/* Discipline Filter Tabs */}
        <div
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EFE6D5] rounded-xl border border-[#0D1E54]/10 self-start lg:self-end"
          role="tablist"
          aria-label="Filter services by discipline"
        >
          {SERVICE_GROUPS.map((group) => {
            const selected = activeGroup === group;
            return (
              <button
                key={group}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveGroup(group)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selected
                    ? 'bg-[#1438B8] text-[#FAF6EE]'
                    : 'text-[#0D1E54]/75 hover:text-[#0D1E54]'
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Card Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((service, index) => (
          <motion.article
            key={service.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-[#0D1E54]/10 hover:border-[#1438B8]/45 transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              {/* Quiet metadata header — zero pills */}
              <div className="flex items-center justify-between gap-4 text-xs font-medium text-[#1438B8]">
                <span className="font-display font-bold tabular-nums">
                  {service.number}
                </span>
                <span className="text-[#0D1E54]/60">
                  {service.group}
                </span>
              </div>

              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#0D1E54] group-hover:text-[#1438B8] transition-colors">
                {service.title}
              </h2>

              <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#0D1E54]/78">
                {service.summary}
              </p>

              <ul className="mt-5 space-y-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-[#0D1E54]/85"
                  >
                    <Check className="w-4 h-4 text-[#1438B8] shrink-0" strokeWidth={2.2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-[#0D1E54]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#1438B8]">
                  {service.pricingNote}
                </p>
                <button
                  type="button"
                  onClick={() => onViewCategoryWork(service.portfolioCategory)}
                  className="mt-1 text-xs text-[#0D1E54]/65 hover:text-[#1438B8] hover:underline underline-offset-4 transition-colors"
                >
                  View related work →
                </button>
              </div>

              <button
                type="button"
                onClick={() => onEnquireService(service.title)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-[#FAF6EE] bg-[#1438B8] hover:bg-[#091B5C] rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1438B8]"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Custom Bundle Banner */}
      <div className="mt-14 bg-[#091B5C] text-[#FAF6EE] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Need a combined creative package?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#DBEAFE]/85 leading-relaxed">
            Launch campaigns often pair branding, photography, reels, and web design together. Let&apos;s discuss your project and build a fair custom bundle.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onEnquireService('Custom Creative Package')}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#091B5C] bg-[#FAF6EE] hover:bg-[#DBEAFE] rounded-xl transition-colors whitespace-nowrap shrink-0"
        >
          <span>Let&apos;s Discuss Your Project</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
