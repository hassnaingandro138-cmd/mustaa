import { ArrowRight, MessageCircle } from 'lucide-react';
import { PageRoute } from '../types';
import {
  HERO_IMAGE,
  INTERIOR_SHOWROOM_IMAGE,
  getWhatsAppUrl,
} from '../data/cars';
import { ShowroomImage } from './ShowroomImage';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const pillars = [
    {
      number: '01.',
      title: '150-Point Provenance & Paint Audit',
      detail:
        'Every automobile is measured with ultrasonic paint-depth gauges, borescope cylinder inspections, and authorized factory ECU telemetry verification prior to acquisition.',
    },
    {
      number: '02.',
      title: 'Curated Low-Mileage Inventory',
      detail:
        'We acquire fewer than 8% of the luxury and sports vehicles we evaluate, prioritizing rare factory specifications, documented single-owner provenance, and collector-grade condition.',
    },
    {
      number: '03.',
      title: 'Transparent Market Valuation',
      detail:
        'Each showroom vehicle is accompanied by full service records, clean title certification, and straightforward acquisition terms without hidden dealership markups.',
    },
    {
      number: '04.',
      title: 'White-Glove Enclosed Logistics',
      detail:
        'From Beverly Hills private viewings to climate-controlled enclosed transport across North America, our concierge handles registration, financing, and door-to-door handover.',
    },
  ];

  return (
    <div>
      {/* Dark Architectural Header */}
      <section className="bg-[#0b0f19] text-white">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#ff8da1] uppercase">
                About MUSTAFA&apos;S CARS
              </p>
              <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl text-balance">
                A Private Gallery Built for Discerning Drivers
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-base">
                Founded on a lifelong obsession with mechanical precision and coachbuilt design, MUSTAFA&apos;S CARS pairs the rigor of an engineering atelier with the hospitality of a private Beverly Hills showroom.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('collection')}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#b90538] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#dc2c4f] cursor-pointer sm:w-auto"
                >
                  <span>Browse Collection</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0b0f19] cursor-pointer sm:w-auto"
                >
                  <span>Visit Showroom</span>
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-white/10 lg:col-span-6">
              <ShowroomImage
                src={HERO_IMAGE}
                alt="MUSTAFA'S CARS architectural showroom floor"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Pillars */}
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.12em] text-[#b90538] uppercase">
            Why Choose Us
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0b0f19] sm:text-4xl text-balance">
            Four Standards That Define Every Delivery
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="rounded-lg border border-[#131b2e]/10 bg-white p-5 transition-colors hover:border-[#b90538]/30 sm:p-7"
            >
              <span className="font-mono text-sm font-semibold text-[#b90538]">
                {pillar.number}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold text-[#0b0f19] sm:text-xl">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#131b2e]/75">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interior Craftsmanship & Client Proof */}
      <section className="border-t border-[#131b2e]/8 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="overflow-hidden rounded-lg border border-[#131b2e]/10 lg:col-span-5">
              <ShowroomImage
                src={INTERIOR_SHOWROOM_IMAGE}
                alt="Luxury Alcantara and carbon fiber supercar cockpit"
                className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-full lg:min-h-[280px]"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.12em] text-[#b90538] uppercase">
                Client Perspectives
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#0b0f19] sm:text-3xl">
                Trusted by Collectors &amp; First-Time Supercar Owners
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                <blockquote className="rounded-lg border border-[#131b2e]/10 bg-[#faf8ff] p-5">
                  <p className="text-sm leading-relaxed text-[#131b2e]/80">
                    &ldquo;Selling my Huracan and stepping into a 750S took one afternoon. Mustafa&apos;s valuation was transparent and wire settlement was immediate.&rdquo;
                  </p>
                  <footer className="mt-4 text-xs font-semibold text-[#0b0f19]">
                    Daniela Vance <span className="font-normal text-[#131b2e]/60">· Architectural Principal, Studio Vance</span>
                  </footer>
                </blockquote>

                <blockquote className="rounded-lg border border-[#131b2e]/10 bg-[#faf8ff] p-5">
                  <p className="text-sm leading-relaxed text-[#131b2e]/80">
                    &ldquo;Their pre-purchase paint meter report and full service binder gave me total confidence buying a Certified Pre-Owned AMG GT remotely.&rdquo;
                  </p>
                  <footer className="mt-4 text-xs font-semibold text-[#0b0f19]">
                    Rohan Mehta <span className="font-normal text-[#131b2e]/60">· Founder, Apex Microelectronics</span>
                  </footer>
                </blockquote>
              </div>

              <div className="mt-7 sm:mt-8">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#0b0f19] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#b90538] sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Connect With Our Specialists</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
