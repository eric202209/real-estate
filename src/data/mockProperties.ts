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
      'https://images.unsplash.com/photo-1600596542815-2a429feb0125?w=800',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    ],
    agent: {
      name: 'Sarah Johnson',
      phone: '(555) 123-4567',
      email: 'sarah@realty.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
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
    images: [
      'https://images.unsplash.com/photo-1570129947423-1c5c6f5f7e4e?w=800',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?w=800',
    ],
    agent: {
      name: 'Michael Chen',
      phone: '(555) 987-6543',
      email: 'michael@realty.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
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
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600596542815-2a429feb0125?w=800',
    ],
    agent: {
      name: 'Jennifer Williams',
      phone: '(555) 456-7890',
      email: 'jennifer@realty.com',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
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
