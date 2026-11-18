import { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Car, CheckoutItem, FilterState, PageRoute } from './types';
import { CARS } from './data/cars';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CollectionPage } from './components/CollectionPage';
import { CarDetailPage } from './components/CarDetailPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { WishlistDrawer } from './components/WishlistDrawer';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal';
import { Footer } from './components/Footer';

const WISHLIST_STORAGE_KEY = 'mustafas_cars_wishlist_v1';

const DEFAULT_FILTERS: FilterState = {
  search: '',
  brand: 'all',
  priceRange: 'all',
  year: 'all',
  fuelType: 'all',
  condition: 'all',
  sortBy: 'featured',
  wishlistOnly: false,
};

function parseRouteFromHash(): { page: PageRoute; carSlug: string | null } {
  if (typeof window === 'undefined') return { page: 'home', carSlug: null };
  const hash = window.location.hash.replace(/^#/, '');
  if (hash.startsWith('car/')) {
    const slug = hash.slice(4);
    const found = CARS.find((c) => c.slug === slug || c.id === slug);
    if (found) return { page: 'details', carSlug: found.slug };
  }
  if (hash === 'collection') return { page: 'collection', carSlug: null };
  if (hash === 'about') return { page: 'about', carSlug: null };
  if (hash === 'contact') return { page: 'contact', carSlug: null };
  return { page: 'home', carSlug: null };
}

export default function App() {
  const initialRoute = useMemo(() => parseRouteFromHash(), []);
  const [currentPage, setCurrentPage] = useState<PageRoute>(initialRoute.page);
  const [selectedCarSlug, setSelectedCarSlug] = useState<string | null>(
    initialRoute.carSlug
  );
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItem | null>(null);

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage read issues
    }
    return ['porsche-911-gt3-2025'];
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage write issues
    }
  }, [wishlistIds]);

  useEffect(() => {
    const handleHashChange = () => {
      const next = parseRouteFromHash();
      setCurrentPage(next.page);
      setSelectedCarSlug(next.carSlug);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = useCallback((page: PageRoute) => {
    setCurrentPage(page);
    if (page !== 'details') {
      setSelectedCarSlug(null);
      window.history.replaceState(null, '', page === 'home' ? '#home' : `#${page}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const selectCar = useCallback((car: Car) => {
    setSelectedCarSlug(car.slug);
    setCurrentPage('details');
    window.history.replaceState(null, '', `#car/${car.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleWishlist = useCallback((carId: string) => {
    setWishlistIds((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  }, []);

  const handleFilterChange = useCallback((next: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...next }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const selectedCar = useMemo(() => {
    if (!selectedCarSlug) return CARS[0];
    return (
      CARS.find((c) => c.slug === selectedCarSlug || c.id === selectedCarSlug) ??
      CARS[0]
    );
  }, [selectedCarSlug]);

  const savedCars = useMemo(
    () => CARS.filter((car) => wishlistIds.includes(car.id)),
    [wishlistIds]
  );

  const handleBuyNowCar = useCallback((car: Car) => {
    setCheckoutItem({
      id: car.id,
      productName: `${car.year} ${car.name} — ${car.model}`,
      unitPrice: car.price,
      quantity: 1,
      image: car.image,
      stockNumber: car.specs.stockNumber,
    });
  }, []);

  const handleCheckoutShortlist = useCallback(() => {
    if (savedCars.length === 0) return;
    if (savedCars.length === 1) {
      handleBuyNowCar(savedCars[0]);
      return;
    }
    const combinedNames = savedCars
      .map((car) => `${car.year} ${car.name}`)
      .join(', ');
    const combinedPrice = savedCars.reduce((sum, car) => sum + car.price, 0);
    setCheckoutItem({
      id: 'shortlist-bundle',
      productName: `${savedCars.length} Vehicles (${combinedNames})`,
      unitPrice: combinedPrice,
      quantity: 1,
      image: savedCars[0].image,
      stockNumber: savedCars.map((c) => c.specs.stockNumber).join(' / '),
    });
  }, [savedCars, handleBuyNowCar]);

  const pageKey =
    currentPage === 'details' ? `details-${selectedCar.id}` : currentPage;

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-clip bg-[#faf8ff] text-[#131b2e]">
      <Navbar
        currentPage={currentPage}
        wishlistCount={wishlistIds.length}
        onNavigate={navigateTo}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <main className="w-full min-w-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageKey}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-w-0"
          >
            {currentPage === 'home' && (
              <HomePage
                cars={CARS}
                wishlistIds={wishlistIds}
                onToggleWishlist={toggleWishlist}
                onSelectCar={selectCar}
                onBuyNow={handleBuyNowCar}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'collection' && (
              <CollectionPage
                cars={CARS}
                filters={filters}
                wishlistIds={wishlistIds}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                onToggleWishlist={toggleWishlist}
                onSelectCar={selectCar}
                onBuyNow={handleBuyNowCar}
              />
            )}

            {currentPage === 'details' && (
              <CarDetailPage
                car={selectedCar}
                allCars={CARS}
                wishlistIds={wishlistIds}
                isWishlisted={wishlistIds.includes(selectedCar.id)}
                onToggleWishlist={toggleWishlist}
                onSelectCar={selectCar}
                onBuyNow={handleBuyNowCar}
                onBackToCollection={() => navigateTo('collection')}
              />
            )}

            {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}

            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={navigateTo} />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        savedCars={savedCars}
        onClose={() => setIsWishlistOpen(false)}
        onRemoveCar={toggleWishlist}
        onSelectCar={selectCar}
        onBuyNow={handleBuyNowCar}
        onCheckoutShortlist={handleCheckoutShortlist}
        onBrowseCollection={() => navigateTo('collection')}
      />

      <WhatsAppCheckoutModal
        isOpen={checkoutItem !== null}
        item={checkoutItem}
        onClose={() => setCheckoutItem(null)}
      />
    </div>
  );
}
