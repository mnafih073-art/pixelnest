import { ArrowUpRight, Instagram, Mail, Phone } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { PageId, STUDIO_INFO } from '../data/studioData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenMediaManager: () => void;
}

export function Footer({ onNavigate, onOpenMediaManager }: FooterProps) {
  return (
    <footer className="bg-[#091B5C] text-[#FAF6EE] border-t border-[#FAF6EE]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Studio Identity */}
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93C5FD] rounded-lg"
            >
              <BrandMark variant="cream" className="w-9 h-9 shrink-0" />
              <span className="font-display text-xl font-bold tracking-tight text-[#FAF6EE]">
                {STUDIO_INFO.name}
              </span>
            </button>
            <p className="mt-4 text-lg font-display font-medium text-[#DBEAFE]">
              {STUDIO_INFO.motto}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#FAF6EE]/75 max-w-sm">
              A creative digital design and media production studio delivering thoughtful graphic design, UI/UX, photography, cinematic reels, and digital ads at honest, accessible pricing.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold tracking-wider text-[#93C5FD]">
              Studio Pages
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {(
                [
                  { id: 'home', label: 'Home' },
                  { id: 'services', label: 'Services' },
                  { id: 'works', label: 'Our Works' },
                  { id: 'contact', label: 'Contact Us' },
                ] as { id: PageId; label: string }[]
              ).map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="text-[#FAF6EE]/80 hover:text-[#FAF6EE] hover:underline underline-offset-4 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold tracking-wider text-[#93C5FD]">
              Direct Channels
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  className="inline-flex items-center gap-2.5 text-[#FAF6EE]/85 hover:text-[#FAF6EE] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#93C5FD] shrink-0" />
                  <span>{STUDIO_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={STUDIO_INFO.phoneHref}
                  className="inline-flex items-center gap-2.5 text-[#FAF6EE]/85 hover:text-[#FAF6EE] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#93C5FD] shrink-0" />
                  <span>{STUDIO_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[#FAF6EE]/85 hover:text-[#FAF6EE] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#93C5FD] shrink-0" />
                  <span>{STUDIO_INFO.instagramHandle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#FAF6EE]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#FAF6EE]/60">
          <span>
            © {new Date().getFullYear()} {STUDIO_INFO.name}. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <span>Design · Film · Photography · Digital Campaigns</span>
            <button
              type="button"
              onClick={onOpenMediaManager}
              className="text-[#93C5FD] hover:text-[#FAF6EE] underline underline-offset-4 transition-colors"
            >
              Manage Studio Images
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
