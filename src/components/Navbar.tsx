import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { PageId, STUDIO_INFO } from '../data/studioData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'works', label: 'Our Works' },
  { id: 'contact', label: 'Contact Us' },
];

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (page: PageId) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#0D1E54]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 md:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1438B8] rounded-lg py-1"
        >
          <BrandMark variant="blue" className="w-7 h-7 shrink-0" />
          <span className="font-display text-lg font-bold tracking-tight text-[#0D1E54] whitespace-nowrap shrink-0">
            {STUDIO_INFO.name}
          </span>
        </button>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1438B8] rounded ${
                  isActive
                    ? 'text-[#1438B8]'
                    : 'text-[#0D1E54]/75 hover:text-[#1438B8]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 bottom-0.5 h-0.5 bg-[#1438B8] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action (+ Mobile Menu Toggle on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('contact')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#FAF6EE] bg-[#1438B8] hover:bg-[#091B5C] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1438B8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF6EE]"
          >
            Start a Project
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[#0D1E54]/15 text-[#0D1E54] hover:bg-[#EFE6D5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1438B8]"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FAF6EE] border-t border-[#0D1E54]/10 px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-4 min-h-[44px] rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1438B8] text-[#FAF6EE]'
                    : 'text-[#0D1E54] hover:bg-[#EFE6D5]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleSelect('contact')}
              className="w-full min-h-[44px] px-4 py-3 text-sm font-medium text-[#FAF6EE] bg-[#091B5C] hover:bg-[#1438B8] rounded-xl transition-colors"
            >
              Start a Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
