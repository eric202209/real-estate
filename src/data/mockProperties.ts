import { Property } from '@/types/property';

// Mock data for demonstration
export const mockProperties: Property[] = [
  {
    id: '1',
    address: '123 Maple Street',
    city: 'Toronto',
    price: 1250000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    description: 'Beautiful modern home in prime location with stunning views and premium finishes throughout.',
    images: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
    ],
    agent: {
      name: 'Sarah Johnson',
      phone: '(555) 123-4567',
      email: 'sarah@realty.com',
      image: '/api/placeholder/150/150',
    },
    features: ['Hardwood Floors', 'Granite Countertops', 'Stainless Steel Appliances', 'Central AC', 'Fireplace'],
    yearBuilt: 2018,
    propertyType: 'Single Family',
  },
  {
    id: '2',
    address: '456 Oak Avenue',
    city: 'Toronto',
    price: 980000,
    beds: 3,
    baths: 2,
    sqft: 2200,
    description: 'Charming family home with renovated kitchen and spacious backyard perfect for entertaining.',
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
    agent: {
      name: 'Michael Chen',
      phone: '(555) 987-6543',
      email: 'michael@realty.com',
      image: '/api/placeholder/150/150',
    },
    features: ['Renovated Kitchen', 'Large Backyard', 'Two-Car Garage', 'Finished Basement'],
    yearBuilt: 2015,
    propertyType: 'Single Family',
  },
  {
    id: '3',
    address: '789 Pine Road',
    city: 'Toronto',
    price: 1580000,
    beds: 5,
    baths: 4,
    sqft: 3500,
    description: 'Luxury estate with premium upgrades, home theater, and resort-style backyard.',
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
    agent: {
      name: 'Jennifer Williams',
      phone: '(555) 456-7890',
      email: 'jennifer@realty.com',
      image: '/api/placeholder/150/150',
    },
    features: ['Home Theater', 'Wine Cellar', 'Pool', 'Smart Home System', 'Guest House'],
    yearBuilt: 2020,
    propertyType: 'Single Family',
  },
];

export function getPropertyById(id: string): Property | undefined {
  return mockProperties.find(property => property.id === id);
}

export function getSimilarProperties(currentPropertyId: string, limit: number = 3): Property[] {
  const currentProperty = mockProperties.find(p => p.id === currentPropertyId);
  if (!currentProperty) return [];

  return mockProperties
    .filter(p => p.id !== currentPropertyId && p.price === currentProperty.price)
    .slice(0, limit);
}
