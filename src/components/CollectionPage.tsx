import { useMemo } from 'react';
import { Search, RotateCcw, Heart, SlidersHorizontal } from 'lucide-react';
import { Car, FilterState } from '../types';
import { CarCard } from './CarCard';

interface CollectionPageProps {
  cars: Car[];
  filters: FilterState;
  wishlistIds: string[];
  onFilterChange: (next: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onToggleWishlist: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  onBuyNow: (car: Car) => void;
}

export function CollectionPage({
  cars,
  filters,
  wishlistIds,
  onFilterChange,
  onResetFilters,
  onToggleWishlist,
  onSelectCar,
  onBuyNow,
}: CollectionPageProps) {
  const brands = useMemo(() => {
    const unique = Array.from(new Set(cars.map((c) => c.brand)));
    return unique.sort();
  }, [cars]);

  const years = useMemo(() => {
    const unique = Array.from(new Set(cars.map((c) => c.year)));
    return unique.sort((a, b) => b - a);
  }, [cars]);

  const fuelTypes = useMemo(() => {
    return Array.from(new Set(cars.map((c) => c.fuelType)));
  }, [cars]);

  const filteredCars = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    const list = cars.filter((car) => {
      if (filters.wishlistOnly && !wishlistIds.includes(car.id)) {
        return false;
      }

      if (query) {
        const hay = `${car.name} ${car.brand} ${car.model} ${car.year} ${car.specs.stockNumber}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }

      if (filters.brand !== 'all' && car.brand !== filters.brand) {
        return false;
      }

      if (filters.year !== 'all' && String(car.year) !== filters.year) {
        return false;
      }

      if (filters.fuelType !== 'all' && car.fuelType !== filters.fuelType) {
        return false;
      }

      if (filters.condition !== 'all' && car.condition !== filters.condition) {
        return false;
      }

      if (filters.priceRange === 'under-250k' && car.price >= 250000) {
        return false;
      }
      if (
        filters.priceRange === '250k-400k' &&
        (car.price < 250000 || car.price > 400000)
      ) {
        return false;
      }
      if (filters.priceRange === 'over-400k' && car.price <= 400000) {
        return false;
      }

      return true;
    });

    const sorted = [...list];
    if (filters.sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'year-desc') {
      sorted.sort((a, b) => b.year - a.year || b.price - a.price);
    } else {
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year);
    }

    return sorted;
  }, [cars, filters, wishlistIds]);

  const hasActiveFilters =
    filters.search !== '' ||
    filters.brand !== 'all' ||
    filters.priceRange !== 'all' ||
    filters.year !== 'all' ||
    filters.fuelType !== 'all' ||
    filters.condition !== 'all' ||
    filters.wishlistOnly;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
      {/* Page Header */}
      <div className="flex flex-col gap-3 border-b border-[#131b2e]/10 pb-6 sm:pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.12em] text-[#b90538] uppercase">
            Showroom Inventory
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0b0f19] sm:text-4xl text-balance">
            Luxury, Sports &amp; Certified Vehicles
          </h1>
        </div>
        <p className="font-mono text-xs text-[#131b2e]/65 tabular-nums sm:text-sm">
          Showing {filteredCars.length} of {cars.length} vehicles
        </p>
      </div>

      {/* Search, Filter & Sort Toolbar */}
      <div className="mt-6 rounded-lg border border-[#131b2e]/10 bg-white p-4 sm:mt-8 sm:p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12">
          {/* Search Input */}
          <div className="relative sm:col-span-2 lg:col-span-4">
            <label htmlFor="car-search" className="sr-only">
              Search cars by name or model
            </label>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#131b2e]/45" />
            <input
              id="car-search"
              type="text"
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              placeholder="Search by brand, name, or model..."
              className="h-11 w-full rounded-lg border border-[#131b2e]/15 bg-white pr-4 pl-10 text-base text-[#0b0f19] placeholder:text-[#131b2e]/45 transition-colors focus:border-[#b90538] focus:ring-2 focus:ring-[#b90538]/15 focus:outline-none sm:text-sm"
            />
          </div>

          {/* Brand Filter */}
          <div className="lg:col-span-2">
            <label htmlFor="filter-brand" className="sr-only">
              Filter by brand
            </label>
            <select
              id="filter-brand"
              value={filters.brand}
              onChange={(e) => onFilterChange({ brand: e.target.value })}
              className="h-11 w-full rounded-lg border border-[#131b2e]/15 bg-white px-3 text-base text-[#0b0f19] focus:border-[#b90538] focus:ring-2 focus:ring-[#b90538]/15 focus:outline-none sm:text-sm"
            >
              <option value="all">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div className="lg:col-span-2">
            <label htmlFor="filter-price" className="sr-only">
              Filter by price
            </label>
            <select
              id="filter-price"
              value={filters.priceRange}
              onChange={(e) =>
                onFilterChange({
                  priceRange: e.target.value as FilterState['priceRange'],
                })
              }
              className="h-11 w-full rounded-lg border border-[#131b2e]/15 bg-white px-3 text-base text-[#0b0f19] focus:border-[#b90538] focus:ring-2 focus:ring-[#b90538]/15 focus:outline-none sm:text-sm"
            >
              <option value="all">All Prices</option>
              <option value="under-250k">Under $250,000</option>
              <option value="250k-400k">$250,000 – $400,000</option>
              <option value="over-400k">Over $400,000</option>
            </select>
          </div>

          {/* Year Filter */}
          <div className="lg:col-span-2">
            <label htmlFor="filter-year" className="sr-only">
              Filter by year
            </label>
            <select
              id="filter-year"
              value={filters.year}
              onChange={(e) => onFilterChange({ year: e.target.value })}
              className="h-11 w-full rounded-lg border border-[#131b2e]/15 bg-white px-3 text-base text-[#0b0f19] focus:border-[#b90538] focus:ring-2 focus:ring-[#b90538]/15 focus:outline-none sm:text-sm"
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel Type Filter */}
          <div className="lg:col-span-2">
            <label htmlFor="filter-fuel" className="sr-only">
              Filter by fuel type
            </label>
            <select
              id="filter-fuel"
              value={filters.fuelType}
              onChange={(e) => onFilterChange({ fuelType: e.target.value })}
              className="h-11 w-full rounded-lg border border-[#131b2e]/15 bg-white px-3 text-base text-[#0b0f19] focus:border-[#b90538] focus:ring-2 focus:ring-[#b90538]/15 focus:outline-none sm:text-sm"
            >
              <option value="all">All Fuel Types</option>
              {fuelTypes.map((fuel) => (
                <option key={fuel} value={fuel}>
                  {fuel}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Second Toolbar Row: Condition Tabs, Wishlist Filter, Price Sort & Reset */}
        <div className="mt-4 flex flex-col gap-3 border-t border-[#131b2e]/8 pt-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex w-full overflow-x-auto no-scrollbar items-center gap-1 rounded-lg bg-[#f2f3ff] p-1 sm:inline-flex sm:w-auto">
              {(
                [
                  { id: 'all', label: 'All Inventory' },
                  { id: 'New Arrival', label: 'New Arrivals' },
                  { id: 'Certified Pre-Owned', label: 'Certified Pre-Owned' },
                ] as const
              ).map((cond) => (
                <button
                  key={cond.id}
                  type="button"
                  onClick={() => onFilterChange({ condition: cond.id })}
                  className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    filters.condition === cond.id
                      ? 'bg-white text-[#0b0f19] shadow-sm'
                      : 'text-[#131b2e]/65 hover:text-[#0b0f19]'
                  }`}
                >
                  {cond.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onFilterChange({ wishlistOnly: !filters.wishlistOnly })}
              aria-pressed={filters.wishlistOnly}
              className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filters.wishlistOnly
                  ? 'border-[#b90538] bg-[#fdf2f8] text-[#b90538]'
                  : 'border-[#131b2e]/15 bg-white text-[#131b2e]/80 hover:border-[#b90538]/40'
              }`}
            >
              <Heart
                className="h-3.5 w-3.5"
                fill={filters.wishlistOnly ? 'currentColor' : 'none'}
              />
              <span>Saved Only ({wishlistIds.length})</span>
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-[#b90538] transition-colors hover:bg-[#fdf2f8] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center justify-between gap-2 sm:justify-start lg:shrink-0">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-[#131b2e]/50 shrink-0" />
              <label htmlFor="sort-cars" className="text-xs font-medium text-[#131b2e]/65 whitespace-nowrap">
                Sort by
              </label>
            </div>
            <select
              id="sort-cars"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })
              }
              className="h-10 min-w-[170px] rounded-lg border border-[#131b2e]/15 bg-white px-3 text-base font-semibold text-[#0b0f19] focus:border-[#b90538] focus:outline-none sm:h-9 sm:text-xs"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid or Empty State */}
      {filteredCars.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-[#131b2e]/10 bg-white px-6 py-16 text-center">
          <h2 className="font-display text-2xl font-bold text-[#0b0f19]">
            No Vehicles Match Your Selection
          </h2>
          <p className="mt-2 max-w-md text-sm text-[#131b2e]/65">
            Adjust your brand, price, year, or fuel filters—or reset all filters to view our complete Beverly Hills showroom inventory.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-[#b90538] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#9e042f] cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
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
      )}
    </div>
  );
}
