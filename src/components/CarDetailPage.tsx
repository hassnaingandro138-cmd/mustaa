import { useState, useEffect, FormEvent } from 'react';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Phone,
  Check,
  Calendar,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { Car } from '../types';
import {
  SHOWROOM_INFO,
  formatMileage,
  formatPrice,
  getWhatsAppUrl,
} from '../data/cars';
import { ShowroomImage } from './ShowroomImage';
import { CarCard } from './CarCard';

interface CarDetailPageProps {
  car: Car;
  allCars: Car[];
  wishlistIds: string[];
  isWishlisted: boolean;
  onToggleWishlist: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  onBuyNow: (car: Car) => void;
  onBackToCollection: () => void;
}

export function CarDetailPage({
  car,
  allCars,
  wishlistIds,
  isWishlisted,
  onToggleWishlist,
  onSelectCar,
  onBuyNow,
  onBackToCollection,
}: CarDetailPageProps) {
  const [activeImage, setActiveImage] = useState(car.image);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    setActiveImage(car.image);
    setShowBookingForm(false);
    setBookingConfirmed(false);
    setBookingError('');
  }, [car]);

  const relatedCars = allCars
    .filter((item) => item.id !== car.id)
    .slice(0, 3);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim() || !bookingEmail.includes('@')) {
      setBookingError('Please provide your name, valid email address, and phone number.');
      return;
    }
    setBookingError('');
    setBookingConfirmed(true);
  };

  const specRows = [
    { label: 'Engine', value: car.specs.engine },
    { label: 'Horsepower', value: car.specs.horsepower },
    { label: 'Torque', value: car.specs.torque },
    { label: '0–60 mph', value: car.specs.zeroToSixty },
    { label: 'Top Speed', value: car.specs.topSpeed },
    { label: 'Drivetrain', value: car.specs.drivetrain },
    { label: 'Transmission', value: car.specs.transmission },
    { label: 'Fuel Type', value: car.specs.fuelType },
    { label: 'Mileage', value: formatMileage(car.specs.mileage) },
    { label: 'Exterior Color', value: car.specs.exteriorColor },
    { label: 'Interior Trim', value: car.specs.interiorTrim },
    { label: 'Stock Number', value: `#${car.specs.stockNumber}` },
    { label: 'VIN', value: car.specs.vin },
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      {/* Breadcrumb Back Action */}
      <button
        type="button"
        onClick={onBackToCollection}
        className="inline-flex min-h-[40px] items-center gap-2 text-sm font-semibold text-[#131b2e]/70 transition-colors hover:text-[#b90538] cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Cars Collection</span>
      </button>

      {/* Mobile Summary Header (visible immediately above image on phones/tablets) */}
      <div className="mt-4 flex flex-col gap-1 lg:hidden">
        <div className="flex items-center justify-between gap-2 text-xs text-[#131b2e]/60">
          <span className="font-semibold text-[#b90538]">
            {car.brand} · {car.condition}
          </span>
          <span className="font-mono tabular-nums">#{car.specs.stockNumber}</span>
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-[#0b0f19] sm:text-3xl text-balance">
          {car.year} {car.name}
        </h1>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm text-[#131b2e]/70">{car.model}</p>
          <p className="font-mono text-xl font-bold text-[#0b0f19] tabular-nums">
            {formatPrice(car.price)}
          </p>
        </div>
      </div>

      {/* Main Contiguous Purchase & Gallery Layout */}
      <div className="mt-5 grid grid-cols-1 gap-8 lg:mt-8 lg:grid-cols-12 lg:items-start lg:gap-10">
        {/* Left Sticky Image Gallery */}
        <div className="min-w-0 lg:col-span-7 lg:sticky lg:top-24">
          <div className="relative overflow-hidden rounded-lg border border-[#131b2e]/10 bg-[#f2f3ff]">
            <ShowroomImage
              src={activeImage}
              alt={`${car.year} ${car.name} gallery view`}
              fallbackTitle={`${car.year} ${car.name}`}
              priority
              className="aspect-[4/3] w-full object-cover"
            />
            <button
              type="button"
              onClick={() => onToggleWishlist(car.id)}
              aria-label={isWishlisted ? 'Remove from saved' : 'Save vehicle'}
              aria-pressed={isWishlisted}
              className={`absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-colors cursor-pointer ${
                isWishlisted
                  ? 'border-[#b90538] bg-[#b90538] text-white'
                  : 'border-white/50 bg-white/85 text-[#131b2e] hover:border-[#b90538] hover:text-[#b90538]'
              }`}
            >
              <Heart className="h-5 w-5" fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Thumbnail Selector */}
          {car.gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {car.gallery.map((imgUrl, idx) => (
                <button
                  key={`${car.id}-thumb-${idx}`}
                  type="button"
                  onClick={() => setActiveImage(imgUrl)}
                  aria-label={`View photo ${idx + 1} of ${car.name}`}
                  className={`overflow-hidden rounded-md border transition-all cursor-pointer ${
                    activeImage === imgUrl
                      ? 'border-[#b90538] ring-2 ring-[#b90538]/25'
                      : 'border-[#131b2e]/10 opacity-75 hover:opacity-100'
                  }`}
                >
                  <ShowroomImage
                    src={imgUrl}
                    alt={`${car.name} angle ${idx + 1}`}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Sticky Purchase / Inquiry Module */}
        <div className="min-w-0 lg:col-span-5 lg:sticky lg:top-24">
          <div className="rounded-lg border border-[#131b2e]/10 bg-white p-5 sm:p-8">
            <div className="hidden lg:block">
              <div className="flex items-center justify-between gap-2 text-xs text-[#131b2e]/60">
                <span className="font-semibold text-[#b90538]">
                  {car.brand} · {car.condition}
                </span>
                <span className="font-mono tabular-nums">
                  Stock #{car.specs.stockNumber}
                </span>
              </div>

              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0b0f19] text-balance">
                {car.year} {car.name}
              </h1>
              <p className="mt-1 text-base text-[#131b2e]/70">{car.model}</p>

              <div className="mt-6 border-y border-[#131b2e]/10 py-5">
                <span className="block text-xs text-[#131b2e]/55">
                  Showroom Asking Price
                </span>
                <span className="mt-1 block font-mono text-3xl font-bold text-[#0b0f19] tabular-nums">
                  {formatPrice(car.price)}
                </span>
              </div>
            </div>

            {/* Key Quick Specs */}
            <div className="grid grid-cols-2 gap-3 text-sm sm:gap-4 lg:mt-6">
              <div className="min-w-0 rounded-md bg-[#faf8ff] p-3 border border-[#131b2e]/6 sm:p-3.5">
                <span className="block text-xs text-[#131b2e]/55">Power Output</span>
                <span className="mt-1 block truncate font-mono font-semibold text-[#0b0f19] tabular-nums">
                  {car.specs.horsepower.split('@')[0].trim()}
                </span>
              </div>
              <div className="min-w-0 rounded-md bg-[#faf8ff] p-3 border border-[#131b2e]/6 sm:p-3.5">
                <span className="block text-xs text-[#131b2e]/55">0–60 mph</span>
                <span className="mt-1 block truncate font-mono font-semibold text-[#b90538] tabular-nums">
                  {car.specs.zeroToSixty}
                </span>
              </div>
              <div className="min-w-0 rounded-md bg-[#faf8ff] p-3 border border-[#131b2e]/6 sm:p-3.5">
                <span className="block text-xs text-[#131b2e]/55">Mileage</span>
                <span className="mt-1 block truncate font-mono font-semibold text-[#0b0f19] tabular-nums">
                  {formatMileage(car.mileage)}
                </span>
              </div>
              <div className="min-w-0 rounded-md bg-[#faf8ff] p-3 border border-[#131b2e]/6 sm:p-3.5">
                <span className="block text-xs text-[#131b2e]/55">Transmission</span>
                <span className="mt-1 block truncate font-semibold text-[#0b0f19]">
                  {car.transmission}
                </span>
              </div>
            </div>

            {/* Primary Seller CTAs */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => onBuyNow(car)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#b90538] px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#9e042f] hover:shadow-[0_6px_20px_rgba(185,5,56,0.28)] cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Buy Now — WhatsApp Checkout</span>
              </button>

              <a
                href={getWhatsAppUrl(car)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#b90538]/30 bg-[#fdf2f8] px-5 text-sm font-semibold text-[#b90538] transition-colors hover:bg-[#b90538] hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Quick Inquiry on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setShowBookingForm((prev) => !prev)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0b0f19] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1e293b] cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>
                  {showBookingForm ? 'Hide Viewing Form' : 'Schedule Private Viewing'}
                </span>
              </button>

              <a
                href={`tel:${SHOWROOM_INFO.phoneRaw}`}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#131b2e]/15 bg-white px-5 text-sm font-semibold text-[#0b0f19] transition-colors hover:border-[#b90538] hover:text-[#b90538]"
              >
                <Phone className="h-4 w-4" />
                <span className="font-mono tabular-nums">{SHOWROOM_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Inline Private Viewing Request Form */}
            {showBookingForm && (
              <div className="mt-6 border-t border-[#131b2e]/10 pt-6">
                {bookingConfirmed ? (
                  <div className="rounded-lg border border-[#b90538]/20 bg-[#fdf2f8] p-4 text-sm">
                    <p className="font-semibold text-[#0b0f19]">
                      Viewing Request Confirmed
                    </p>
                    <p className="mt-1 text-[#131b2e]/75">
                      Our senior specialist will contact {bookingName} at {bookingPhone} regarding the {car.year} {car.name}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3" noValidate>
                    <p className="text-xs font-semibold tracking-wide text-[#0b0f19] uppercase">
                      Request Private Viewing
                    </p>
                    {bookingError && (
                      <p className="text-xs font-medium text-[#b90538]" role="alert">
                        {bookingError}
                      </p>
                    )}
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      required
                      className="h-11 w-full rounded-md border border-[#131b2e]/15 px-3 text-base sm:h-10 sm:text-sm focus:border-[#b90538] focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      required
                      className="h-11 w-full rounded-md border border-[#131b2e]/15 px-3 text-base sm:h-10 sm:text-sm focus:border-[#b90538] focus:outline-none"
                    />
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        required
                        className="h-11 w-full rounded-md border border-[#131b2e]/15 px-3 text-base sm:h-10 sm:text-sm focus:border-[#b90538] focus:outline-none"
                      />
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="h-11 w-full rounded-md border border-[#131b2e]/15 px-3 text-base sm:h-10 sm:text-sm focus:border-[#b90538] focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-11 w-full rounded-md bg-[#b90538] text-sm font-semibold text-white transition-colors hover:bg-[#9e042f] cursor-pointer sm:h-10 sm:text-xs"
                    >
                      Confirm Appointment Request
                    </button>
                  </form>
                )}
              </div>
            )}

            <div className="mt-6 flex items-center gap-2.5 border-t border-[#131b2e]/8 pt-5 text-xs text-[#131b2e]/65">
              <ShieldCheck className="h-4 w-4 text-[#b90538] shrink-0" />
              <span>Includes 150-point inspection dossier &amp; clean title guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview, Features & Complete Specification Sheet */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-7 space-y-10">
          <section className="rounded-lg border border-[#131b2e]/10 bg-white p-5 sm:p-8">
            <h2 className="font-display text-xl font-bold text-[#0b0f19] sm:text-2xl">
              Vehicle Overview
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#131b2e]/80 sm:text-base">
              {car.description}
            </p>

            <h3 className="mt-7 font-display text-lg font-semibold text-[#0b0f19] sm:mt-8">
              Selected Factory Options &amp; Features
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {car.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-[#131b2e]/80"
                >
                  <Check className="mt-0.5 h-4 w-4 text-[#b90538] shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <section className="rounded-lg border border-[#131b2e]/10 bg-white p-5 sm:p-8">
            <h2 className="font-display text-xl font-bold text-[#0b0f19] sm:text-2xl">
              Technical Specifications
            </h2>
            <dl className="mt-5 divide-y divide-[#131b2e]/8 text-sm">
              {specRows.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <dt className="text-xs text-[#131b2e]/60 sm:text-sm shrink-0">
                    {row.label}
                  </dt>
                  <dd className="min-w-0 break-all font-mono font-medium text-[#0b0f19] tabular-nums sm:break-normal sm:text-right">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      {/* Related Showroom Vehicles */}
      <section className="mt-16 border-t border-[#131b2e]/10 pt-14">
        <h2 className="font-display text-2xl font-bold text-[#0b0f19] sm:text-3xl">
          More From Our Showroom
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {relatedCars.map((related) => (
            <CarCard
              key={related.id}
              car={related}
              isWishlisted={wishlistIds.includes(related.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectCar={onSelectCar}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
