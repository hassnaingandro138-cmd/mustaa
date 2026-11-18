import { useState, useRef } from 'react';
import { ArrowRight, ShieldCheck, Truck, Award, MessageCircle } from 'lucide-react';
import { Car, PageRoute } from '../types';
import {
  HERO_IMAGE,
  INTERIOR_SHOWROOM_IMAGE,
  getWhatsAppUrl,
} from '../data/cars';
import { ShowroomImage } from './ShowroomImage';
import { CarCard } from './CarCard';

interface HomePageProps {
  cars: Car[];
  wishlistIds: string[];
  onToggleWishlist: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  onBuyNow: (car: Car) => void;
  onNavigate: (page: PageRoute) => void;
}

type FeaturedTab = 'all' | 'supercar' | 'gt' | 'used';

export function HomePage({
  cars,
  wishlistIds,
  onToggleWishlist,
  onSelectCar,
  onBuyNow,
  onNavigate,
}: HomePageProps) {
  const [activeTab, setActiveTab] = useState<FeaturedTab>('all');
  const featuredSectionRef = useRef<HTMLElement>(null);

  const scrollToFeatured = () => {
    featuredSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredFeatured = cars
    .filter((car) => {
      if (activeTab === 'supercar') return car.category === 'Supercar' || car.category === 'Track Coupe';
      if (activeTab === 'gt') return car.category === 'Grand Tourer';
      if (activeTab === 'used') return car.condition === 'Certified Pre-Owned';
      return car.featured;
    })
    .slice(0, 6);

  return (
    <div>
      {/* 1. Hero Showroom Banner */}
      <section className="relative overflow-hidden bg-[#0b0f19] text-white">
        <div className="relative mx-auto max-w-[1440px]">
          <div className="relative flex min-h-[460px] items-center sm:min-h-[540px] lg:min-h-[640px]">
            <div className="absolute inset-0">
              <ShowroomImage
                src={HERO_IMAGE}
                alt="Flagship crimson and obsidian supercar inside MUSTAFA'S CARS showroom"
                fallbackTitle="MUSTAFA'S CARS"
                priority
                className="h-full w-full object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/95 via-[#0b0f19]/80 to-[#0b0f19]/50 lg:bg-gradient-to-r lg:from-[#0b0f19]/95 lg:via-[#0b0f19]/75 lg:to-[#0b0f19]/25"
                aria-hidden="true"
              />
            </div>

            <div className="relative z-10 w-full px-4 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-20">
              <div className="max-w-2xl">
                <p className="text-[11px] font-medium tracking-[0.14em] text-[#ff8da1] uppercase sm:text-xs">
                  Beverly Hills Flagship Showroom
                </p>
                <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-white text-balance sm:mt-4">
                  Find Your Dream Car Today
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-lg">
                  Curated supercars, hand-built grand tourers, and certified pre-owned performance machines—each backed by documented provenance and concierge delivery.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('collection')}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#b90538] px-7 text-sm font-semibold text-white shadow-[0_12px_30px_-8px_rgba(185,5,56,0.55)] transition-all duration-150 hover:bg-[#dc2c4f] hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f19]"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={scrollToFeatured}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#0b0f19] whitespace-nowrap shrink-0 cursor-pointer sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>Explore Cars</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Proof Strip below Hero */}
        <div className="border-t border-white/10 bg-[#131b2e]">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 bg-[#131b2e] px-4 py-4 sm:px-6 lg:px-8">
              <ShieldCheck className="h-5 w-5 text-[#dc2c4f] shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">150-Point Certified</p>
                <p className="text-xs text-white/60">Paint-depth &amp; mechanical audit</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#131b2e] px-4 py-4 sm:px-6 lg:px-8">
              <Truck className="h-5 w-5 text-[#dc2c4f] shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">Enclosed Delivery</p>
                <p className="text-xs text-white/60">Climate-controlled nationwide</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#131b2e] px-4 py-4 sm:px-6 lg:px-8">
              <Award className="h-5 w-5 text-[#dc2c4f] shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">Verified Provenance</p>
                <p className="text-xs text-white/60">Clean title &amp; full service history</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#131b2e] px-4 py-4 sm:px-6 lg:px-8">
              <MessageCircle className="h-5 w-5 text-[#dc2c4f] shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">Direct Concierge</p>
                <p className="text-xs text-white/60">Instant specialist WhatsApp support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured & Latest Cars */}
      <section
        ref={featuredSectionRef}
        className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
      >
        <div className="flex flex-col gap-5 border-b border-[#131b2e]/10 pb-6 sm:pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-[#b90538] uppercase">
              Curated Showroom Floor
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0b0f19] sm:text-4xl text-balance">
              Featured &amp; Latest Arrivals
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            {/* Functional Filter Segmented Control */}
            <div
              className="flex w-full overflow-x-auto no-scrollbar items-center gap-1 rounded-lg bg-[#f2f3ff] p-1 sm:inline-flex sm:w-auto"
              role="tablist"
              aria-label="Filter featured vehicles"
            >
              {(
                [
                  { id: 'all', label: 'All Featured' },
                  { id: 'supercar', label: 'Supercars' },
                  { id: 'gt', label: 'Grand Tourers' },
                  { id: 'used', label: 'Certified Used' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[38px] rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-[#0b0f19] shadow-sm'
                      : 'text-[#131b2e]/65 hover:text-[#0b0f19]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('collection')}
              className="inline-flex min-h-[40px] items-center gap-1.5 self-start text-sm font-semibold text-[#b90538] transition-colors hover:text-[#0b0f19] whitespace-nowrap shrink-0 cursor-pointer sm:self-auto"
            >
              <span>View All {cars.length} Cars</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredFeatured.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isWishlisted={wishlistIds.includes(car.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectCar={onSelectCar}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      </section>

      {/* 3. Dealership Craftsmanship & Collector Proof Split */}
      <section className="border-t border-[#131b2e]/8 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Architectural Image */}
            <div className="overflow-hidden rounded-lg border border-[#131b2e]/10 bg-[#f2f3ff] lg:col-span-6">
              <ShowroomImage
                src={INTERIOR_SHOWROOM_IMAGE}
                alt="Hand-stitched black Alcantara and crimson-trimmed supercar cockpit"
                fallbackTitle="Bespoke Showroom Inspection"
                className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-full lg:min-h-[340px]"
              />
            </div>

            {/* Right Story & Proof */}
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#b90538] uppercase">
                  The Mustafa&apos;s Standard
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0b0f19] sm:text-4xl text-balance">
                  Precision Sourced. Collector Verified.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#131b2e]/75 sm:text-base">
                  Every luxury sports car and pre-owned flagship entering MUSTAFA&apos;S CARS undergoes micrometer paint-depth verification, full ECU telemetry diagnostics, and factory service validation before touching our showroom floor.
                </p>

                {/* Quantitative Proof Adjacent to Claim */}
                <div className="mt-7 grid grid-cols-3 gap-3 border-y border-[#131b2e]/10 py-5 sm:mt-8 sm:gap-6 sm:py-6">
                  <div className="min-w-0">
                    <p className="font-mono text-xl font-bold text-[#0b0f19] tabular-nums sm:text-3xl">
                      150+
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-[#131b2e]/65 sm:text-xs">
                      Inspection checkpoints
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xl font-bold text-[#b90538] tabular-nums sm:text-3xl">
                      98.4%
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-[#131b2e]/65 sm:text-xs">
                      Repeat client retention
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xl font-bold text-[#0b0f19] tabular-nums sm:text-3xl">
                      48 hrs
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-[#131b2e]/65 sm:text-xs">
                      Enclosed dispatch
                    </p>
                  </div>
                </div>

                {/* Attributable Client Testimonial */}
                <blockquote className="mt-6 sm:mt-7">
                  <p className="text-sm leading-relaxed text-[#131b2e]/85 italic">
                    &ldquo;Mustafa&apos;s team sourced my 911 GT3 with complete telemetry logs and had it delivered to my garage in 36 hours. Every detail matched the inspection dossier to the millimeter.&rdquo;
                  </p>
                  <footer className="mt-3 text-xs font-semibold text-[#0b0f19]">
                    Tariq Al-Mansoor <span className="font-normal text-[#131b2e]/60">· Managing Partner, Crestline Capital</span>
                  </footer>
                </blockquote>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#131b2e]/20 bg-white px-5 text-sm font-semibold text-[#0b0f19] transition-colors hover:border-[#b90538] hover:text-[#b90538] cursor-pointer sm:w-auto"
                >
                  <span>About Our Dealership</span>
                </button>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#0b0f19] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#b90538] sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Speak With Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
