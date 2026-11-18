import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { PageRoute } from '../types';
import { SHOWROOM_INFO, getWhatsAppUrl } from '../data/cars';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[#131b2e]/10 bg-[#0b0f19] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 sm:py-14 lg:px-12">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand Column */}
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-display text-xl font-bold tracking-tight text-white cursor-pointer"
            >
              MUSTAFA&apos;S <span className="text-[#dc2c4f]">CARS</span>
            </button>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Curated luxury supercars, grand tourers, and certified pre-owned performance automobiles inspected to collector standards.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-md border border-white/15 px-3 text-xs font-medium text-white/80 transition-colors hover:border-[#dc2c4f] hover:text-white"
              >
                Instagram
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-md border border-white/15 px-3 text-xs font-medium text-white/80 transition-colors hover:border-[#dc2c4f] hover:text-white"
              >
                YouTube
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-1.5 rounded-md border border-[#dc2c4f]/50 bg-[#b90538]/20 px-3 text-xs font-medium text-white transition-colors hover:bg-[#b90538]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="min-w-0">
            <h3 className="font-display text-sm font-semibold tracking-wide text-white">
              Showroom
            </h3>
            <ul className="mt-4 space-y-1.5 text-sm text-white/70">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="inline-flex min-h-[36px] items-center transition-colors hover:text-white cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('collection')}
                  className="inline-flex min-h-[36px] items-center transition-colors hover:text-white cursor-pointer"
                >
                  Cars Collection
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex min-h-[36px] items-center transition-colors hover:text-white cursor-pointer"
                >
                  About Mustafa&apos;s Cars
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex min-h-[36px] items-center transition-colors hover:text-white cursor-pointer"
                >
                  Contact &amp; Private Viewing
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="min-w-0">
            <h3 className="font-display text-sm font-semibold tracking-wide text-white">
              Direct Concierge
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <a
                  href={`tel:${SHOWROOM_INFO.phoneRaw}`}
                  className="inline-flex min-h-[36px] items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-[#dc2c4f] shrink-0" />
                  <span className="font-mono tabular-nums">{SHOWROOM_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SHOWROOM_INFO.email}`}
                  className="inline-flex min-h-[36px] items-center gap-2 break-all sm:break-normal transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-[#dc2c4f] shrink-0" />
                  <span>{SHOWROOM_INFO.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-[#dc2c4f] shrink-0" />
                <span>{SHOWROOM_INFO.address}</span>
              </li>
            </ul>
          </div>

          {/* Hours & Location CTA */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wide text-white">
              Showroom Hours
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Monday – Saturday: 9:30 AM – 7:30 PM
              <br />
              Sunday: By Private Appointment
            </p>
            <a
              href={SHOWROOM_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff8da1] transition-colors hover:text-white"
            >
              <span>Directions on Google Maps</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/55 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} MUSTAFA&apos;S CARS. All rights reserved.</p>
          <p>Beverly Hills Flagship Showroom · Certified Luxury &amp; Sports Vehicles</p>
        </div>
      </div>
    </footer>
  );
}
