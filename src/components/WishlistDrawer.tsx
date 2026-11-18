import { X, Trash2, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { Car } from '../types';
import { formatMileage, formatPrice } from '../data/cars';
import { ShowroomImage } from './ShowroomImage';

interface WishlistDrawerProps {
  isOpen: boolean;
  savedCars: Car[];
  onClose: () => void;
  onRemoveCar: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  onBuyNow: (car: Car) => void;
  onCheckoutShortlist: () => void;
  onBrowseCollection: () => void;
}

export function WishlistDrawer({
  isOpen,
  savedCars,
  onClose,
  onRemoveCar,
  onSelectCar,
  onBuyNow,
  onCheckoutShortlist,
  onBrowseCollection,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  const totalSavedValue = savedCars.reduce((sum, car) => sum + car.price, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Saved vehicles wishlist"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0b0f19]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#131b2e]/10 px-4 py-4 sm:px-6 sm:py-5">
          <div>
            <h2 className="font-display text-lg font-bold text-[#0b0f19] sm:text-xl">
              Saved Collection
            </h2>
            <p className="mt-0.5 text-xs text-[#131b2e]/60 tabular-nums">
              {savedCars.length} {savedCars.length === 1 ? 'vehicle' : 'vehicles'} shortlisted
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close saved collection"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#131b2e]/10 text-[#131b2e] transition-colors hover:bg-[#fdf2f8] hover:text-[#b90538] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b90538]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          {savedCars.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fdf2f8] text-[#b90538]">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-[#0b0f19]">
                No Saved Vehicles Yet
              </h3>
              <p className="mt-2 max-w-xs text-sm text-[#131b2e]/65">
                Tap the heart icon on any vehicle in the showroom to save it to your private shortlist.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBrowseCollection();
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#b90538] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#9e042f] cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {savedCars.map((car) => (
                <li
                  key={car.id}
                  className="flex flex-col gap-3 rounded-lg border border-[#131b2e]/10 bg-white p-4 transition-colors hover:border-[#b90538]/25"
                >
                  <div className="flex gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectCar(car);
                      }}
                      className="w-24 shrink-0 overflow-hidden rounded-md bg-[#f2f3ff] cursor-pointer sm:w-28"
                    >
                      <ShowroomImage
                        src={car.image}
                        alt={`${car.year} ${car.name}`}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs text-[#131b2e]/55">
                        {car.brand} · {formatMileage(car.mileage)}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectCar(car);
                        }}
                        className="mt-0.5 block w-full truncate text-left font-display text-sm font-semibold text-[#0b0f19] hover:text-[#b90538] cursor-pointer sm:text-base"
                      >
                        {car.year} {car.name}
                      </button>
                      <p className="mt-1 font-mono text-sm font-semibold text-[#b90538] tabular-nums">
                        {formatPrice(car.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveCar(car.id)}
                      aria-label={`Remove ${car.name} from wishlist`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-[#131b2e]/45 transition-colors hover:bg-[#fdf2f8] hover:text-[#b90538] cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 border-t border-[#131b2e]/8 pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectCar(car);
                      }}
                      className="min-h-[40px] flex-1 rounded-md border border-[#131b2e]/12 bg-white px-3 py-2 text-xs font-semibold text-[#131b2e] transition-colors hover:border-[#131b2e]/30 cursor-pointer"
                    >
                      Inspect Specs
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onBuyNow(car);
                      }}
                      className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-md bg-[#b90538] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#9e042f] cursor-pointer"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Checkout</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {savedCars.length > 0 && (
          <div className="border-t border-[#131b2e]/10 bg-[#faf8ff] px-6 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#131b2e]/70">Shortlist Total</span>
              <span className="font-mono font-bold text-[#0b0f19] tabular-nums">
                {formatPrice(totalSavedValue)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onCheckoutShortlist();
              }}
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#b90538] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#9e042f] cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>
                {savedCars.length === 1
                  ? 'Checkout Vehicle'
                  : `Checkout All (${savedCars.length})`}
              </span>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
