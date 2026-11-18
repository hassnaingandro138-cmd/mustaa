import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PageRoute } from '../types';

interface NavbarProps {
  currentPage: PageRoute;
  wishlistCount: number;
  onNavigate: (page: PageRoute) => void;
  onOpenWishlist: () => void;
}

export function Navbar({
  currentPage,
  wishlistCount,
  onNavigate,
  onOpenWishlist,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPage]);

  const handleLinkClick = (page: PageRoute) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  const navLinkClass = (active: boolean) =>
    `relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b90538] rounded-sm ${
      active
        ? 'text-[#b90538] font-semibold'
        : 'text-[#131b2e]/80 hover:text-[#131b2e]'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-[#131b2e]/8 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 sm:gap-5 sm:px-8 lg:gap-8 lg:px-12">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="font-display text-base font-bold tracking-tight text-[#0b0f19] whitespace-nowrap shrink-0 cursor-pointer sm:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b90538] rounded-sm"
        >
          MUSTAFA&apos;S <span className="text-[#b90538]">CARS</span>
        </button>

        {/* Zone 2: 5 Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center md:gap-4 lg:gap-7" aria-label="Primary navigation">
          <button
            type="button"
            onClick={() => handleLinkClick('home')}
            className={`${navLinkClass(currentPage === 'home')} cursor-pointer`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('collection')}
            className={`${navLinkClass(currentPage === 'collection' || currentPage === 'details')} cursor-pointer`}
          >
            Collection
          </button>
          <button
            type="button"
            onClick={onOpenWishlist}
            className="relative py-1 text-sm font-medium text-[#131b2e]/80 hover:text-[#b90538] transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b90538] rounded-sm"
          >
            Saved ({wishlistCount})
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('about')}
            className={`${navLinkClass(currentPage === 'about')} cursor-pointer`}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className={`${navLinkClass(currentPage === 'contact')} cursor-pointer`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Hamburger Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#b90538] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#9e042f] hover:shadow-[0_4px_20px_rgba(185,5,56,0.28)] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b90538] focus-visible:ring-offset-2"
          >
            Book Viewing
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#131b2e]/12 text-[#131b2e] transition-colors hover:bg-[#fdf2f8] md:hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b90538]"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[#131b2e]/8 bg-white px-4 py-4 shadow-lg sm:px-8 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            <button
              type="button"
              onClick={() => handleLinkClick('home')}
              className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 text-left text-base font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-[#fdf2f8] text-[#b90538] font-semibold'
                  : 'text-[#131b2e] hover:bg-slate-50'
              }`}
            >
              <span>Home</span>
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('collection')}
              className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 text-left text-base font-medium transition-colors ${
                currentPage === 'collection' || currentPage === 'details'
                  ? 'bg-[#fdf2f8] text-[#b90538] font-semibold'
                  : 'text-[#131b2e] hover:bg-slate-50'
              }`}
            >
              <span>Collection</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenWishlist();
              }}
              className="flex min-h-[44px] items-center justify-between rounded-lg px-3 text-left text-base font-medium text-[#131b2e] transition-colors hover:bg-slate-50 tabular-nums"
            >
              <span>Saved Vehicles</span>
              <span className="font-mono text-sm font-semibold text-[#b90538]">
                {wishlistCount}
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('about')}
              className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 text-left text-base font-medium transition-colors ${
                currentPage === 'about'
                  ? 'bg-[#fdf2f8] text-[#b90538] font-semibold'
                  : 'text-[#131b2e] hover:bg-slate-50'
              }`}
            >
              <span>About Us</span>
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 text-left text-base font-medium transition-colors ${
                currentPage === 'contact'
                  ? 'bg-[#fdf2f8] text-[#b90538] font-semibold'
                  : 'text-[#131b2e] hover:bg-slate-50'
              }`}
            >
              <span>Contact</span>
            </button>
            <div className="mt-3 pt-3 border-t border-[#131b2e]/8">
              <button
                type="button"
                onClick={() => handleLinkClick('contact')}
                className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#b90538] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#9e042f]"
              >
                Book Private Viewing
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
