export type PageRoute = 'home' | 'collection' | 'details' | 'about' | 'contact';

export type FuelType = 'Petrol' | 'Hybrid' | 'Mild Hybrid';

export type CarCategory = 'Supercar' | 'Grand Tourer' | 'Track Coupe';

export type ConditionType = 'New Arrival' | 'Certified Pre-Owned';

export interface CarSpecifications {
  engine: string;
  horsepower: string;
  torque: string;
  zeroToSixty: string;
  topSpeed: string;
  drivetrain: string;
  transmission: string;
  exteriorColor: string;
  interiorTrim: string;
  fuelType: FuelType;
  mileage: number;
  stockNumber: string;
  vin: string;
}

export interface Car {
  id: string;
  slug: string;
  brand: string;
  name: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  fuelType: FuelType;
  category: CarCategory;
  condition: ConditionType;
  featured: boolean;
  isLatest: boolean;
  image: string;
  gallery: string[];
  headlineSpec: string;
  description: string;
  features: string[];
  specs: CarSpecifications;
}

export interface FilterState {
  search: string;
  brand: string;
  priceRange: 'all' | 'under-250k' | '250k-400k' | 'over-400k';
  year: string;
  fuelType: string;
  condition: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'year-desc';
  wishlistOnly: boolean;
}

export interface CheckoutItem {
  id: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  image?: string;
  stockNumber?: string;
  subtitle?: string;
}

export interface WhatsAppOrderPayload {
  customerName: string;
  customerWhatsApp: string;
  deliveryAddress: string;
  city: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  instructions: string;
}

