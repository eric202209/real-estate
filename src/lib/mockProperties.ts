export interface Property {
  id: number;
  image: string;
  price: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
}

export const mockProperties: Property[] = [
  {
    id: 1,
    image: '🏡',
    price: '$850,000',
    address: '123 Maple Street, San Francisco, CA',
    beds: 3,
    baths: 2,
    sqft: 2100,
  },
  {
    id: 2,
    image: '🏢',
    price: '$650,000',
    address: '456 Oak Avenue, Oakland, CA',
    beds: 2,
    baths: 2,
    sqft: 1400,
  },
  {
    id: 3,
    image: '🏘️',
    price: '$1,200,000',
    address: '789 Pine Road, Berkeley, CA',
    beds: 4,
    baths: 3,
    sqft: 2800,
  },
  {
    id: 4,
    image: '🏰',
    price: '$2,500,000',
    address: '321 Sunset Boulevard, Malibu, CA',
    beds: 5,
    baths: 4,
    sqft: 4200,
  },
  {
    id: 5,
    image: '🏠',
    price: '$950,000',
    address: '567 Valley View, San Jose, CA',
    beds: 3,
    baths: 3,
    sqft: 2500,
  },
  {
    id: 6,
    image: '🏢',
    price: '$750,000',
    address: '890 Market Street, San Francisco, CA',
    beds: 2,
    baths: 2,
    sqft: 1600,
  },
];
