'use client';

interface Property {
  id: number;
  emoji: string;
  price: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
}

const properties: Property[] = [
  {
    id: 1,
    emoji: '🏡',
    price: '$850,000',
    address: '123 Maple Street, San Francisco, CA',
    beds: 3,
    baths: 2,
    sqft: 2100,
  },
  {
    id: 2,
    emoji: '🏢',
    price: '$650,000',
    address: '456 Oak Avenue, Oakland, CA',
    beds: 2,
    baths: 2,
    sqft: 1400,
  },
  {
    id: 3,
    emoji: '🏘️',
    price: '$1,200,000',
    address: '789 Pine Road, Berkeley, CA',
    beds: 4,
    baths: 3,
    sqft: 2800,
  },
  {
    id: 4,
    emoji: '🏰',
    price: '$2,500,000',
    address: '321 Sunset Boulevard, Malibu, CA',
    beds: 5,
    baths: 4,
    sqft: 4200,
  },
  {
    id: 5,
    emoji: '🏠',
    price: '$950,000',
    address: '567 Valley View, San Jose, CA',
    beds: 3,
    baths: 3,
    sqft: 2500,
  },
  {
    id: 6,
    emoji: '🏢',
    price: '$750,000',
    address: '890 Market Street, San Francisco, CA',
    beds: 2,
    baths: 2,
    sqft: 1600,
  },
];

export default function ListingsPage() {
  return (
    <>
      <section className="hero">
        <h1>Our Latest Properties</h1>
        <p>Browse our extensive collection of premium properties</p>
      </section>

      <section className="properties-section">
        <div className="properties-grid">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </>
  );
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="property-card">
      <div className="property-image">{property.emoji}</div>
      <div className="property-details">
        <div className="property-price">{property.price}</div>
        <div className="property-address">{property.address}</div>
        <div className="property-features">
          <span className="feature">
            🛏️ {property.beds} Bed
          </span>
          <span className="feature">
            🚿 {property.baths} Bath
          </span>
          <span className="feature">
            📐 {property.sqft.toLocaleString()} sqft
          </span>
        </div>
        <button className="contact-btn">Schedule Viewing</button>
      </div>
    </div>
  );
}
