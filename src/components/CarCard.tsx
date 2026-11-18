import { Heart, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { Car } from '../types';
import { formatMileage, formatPrice } from '../data/cars';
import { ShowroomImage } from './ShowroomImage';

interface CarCardProps {
  car: Car;
  isWishlisted: boolean;
  onToggleWishlist: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  onBuyNow: (car: Car) => void;
}

export function CarCard({
  car,
  isWishlisted,
  onToggleWishlist,
  onSelectCar,
  onBuyNow,
}: CarCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-[#131b2e]/10 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b90538]/30 hover:shadow-[0_20px_40px_-15px_rgba(185,5,56,0.14)]">
      {/* Uniform 4:3 Image Viewport */}
      <div className="relative overflow-hidden bg-[#f2f3ff]">
        <button
          type="button"
          onClick={() => onSelectCar(car)}
          className="block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#b90538]"
          aria-label={`View details for ${car.year} ${car.name}`}
        >
          <ShowroomImage
            src={car.image}
            alt={`${car.year} ${car.name} ${car.model}`}
            fallbackTitle={`${car.year} ${car.name}`}
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </button>

        {/* Wishlist Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(car.id);
          }}
          aria-label={
            isWishlisted
              ? `Remove ${car.name} from saved vehicles`
              : `Save ${car.name} to wishlist`
          }
          aria-pressed={isWishlisted}
          className={`absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b90538] ${
            isWishlisted
              ? 'border-[#b90538] bg-[#b90538] text-white shadow-sm'
              : 'border-white/50 bg-white/85 text-[#131b2e] hover:border-[#b90538] hover:text-[#b90538]'
          }`}
        >
          <Heart
            className="h-4 w-4"
            fill={isWishlisted ? 'currentColor' : 'none'}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Card Body — Identical Field Order & Clean Metadata */}
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {/* 1-Line Clean Unboxed Metadata (Zero Pill Discipline) */}
        <div className="flex items-center justify-between gap-2 text-xs text-[#131b2e]/60">
          <span className="truncate font-medium">
            {car.brand} <span aria-hidden="true">·</span> {car.condition}
          </span>
          <span className="font-mono text-[11px] tabular-nums shrink-0 text-[#131b2e]/50">
            #{car.specs.stockNumber}
          </span>
        </div>

        {/* Title & Model */}
        <button
          type="button"
          onClick={() => onSelectCar(car)}
          className="mt-2 min-w-0 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b90538] rounded-sm"
        >
          <h3 className="font-display text-lg font-semibold tracking-tight text-[#0b0f19] transition-colors group-hover:text-[#b90538] sm:text-xl">
            {car.year} {car.name}
          </h3>
          <p className="mt-0.5 truncate text-sm text-[#131b2e]/65">{car.model}</p>
        </button>

        {/* Specs Row */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-[#131b2e]/8 py-3 text-xs">
          <div className="min-w-0">
            <span className="block text-[#131b2e]/50">Mileage</span>
            <span className="mt-0.5 block truncate font-mono font-medium text-[#131b2e] tabular-nums">
              {formatMileage(car.mileage)}
            </span>
          </div>
          <div className="min-w-0">
            <span className="block text-[#131b2e]/50">Fuel</span>
            <span className="mt-0.5 block truncate font-medium text-[#131b2e]">
              {car.fuelType}
            </span>
          </div>
          <div className="min-w-0">
            <span className="block text-[#131b2e]/50">Gearbox</span>
            <span className="mt-0.5 block truncate font-medium text-[#131b2e]">
              {car.transmission.replace(' Dual-Clutch', '')}
            </span>
          </div>
        </div>

        {/* Price & Actions Footer */}
        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <span className="block text-[11px] text-[#131b2e]/50">Showroom Price</span>
            <span className="font-mono text-lg font-semibold text-[#0b0f19] tabular-nums">
              {formatPrice(car.price)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:shrink-0">
            <button
              type="button"
              onClick={() => onSelectCar(car)}
              className="inline-flex min-h-[44px] sm:h-10 sm:min-h-0 items-center justify-center gap-1 rounded-lg border border-[#131b2e]/15 bg-white px-3 py-2 text-xs font-semibold text-[#0b0f19] transition-colors hover:border-[#0b0f19] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b90538]"
            >
              <span>Details</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onBuyNow(car)}
              className="inline-flex min-h-[44px] sm:h-10 sm:min-h-0 items-center justify-center gap-1.5 rounded-lg bg-[#b90538] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#9e042f] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b90538] focus-visible:ring-offset-2"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
