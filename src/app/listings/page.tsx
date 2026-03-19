'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';

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
    emoji: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
    price: '$850,000',
    address: '123 Maple Street, San Francisco, CA',
    beds: 3,
    baths: 2,
    sqft: 2100,
  },
  {
    id: 2,
    emoji: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
    price: '$650,000',
    address: '456 Oak Avenue, Oakland, CA',
    beds: 2,
    baths: 2,
    sqft: 1400,
  },
  {
    id: 3,
    emoji: 'https://images.unsplash.com/photo-1570129947423-1c5c6f5f7e4e?w=800',
    price: '$1,200,000',
    address: '789 Pine Road, Berkeley, CA',
    beds: 4,
    baths: 3,
    sqft: 2800,
  },
  {
    id: 4,
    emoji: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    price: '$2,500,000',
    address: '321 Sunset Boulevard, Malibu, CA',
    beds: 5,
    baths: 4,
    sqft: 4200,
  },
  {
    id: 5,
    emoji: 'https://images.unsplash.com/photo-1600596542815-2a429feb0125?w=800',
    price: '$950,000',
    address: '567 Valley View, San Jose, CA',
    beds: 3,
    baths: 3,
    sqft: 2500,
  },
  {
    id: 6,
    emoji: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?w=800',
    price: '$750,000',
    address: '890 Market Street, San Francisco, CA',
    beds: 2,
    baths: 2,
    sqft: 1600,
  },
];

export default function ListingsPage() {
  const [filteredProperties, setFilteredProperties] = useState(properties);

  return (
    <>
      <section className="hero">
        <h1>Our Latest Properties</h1>
        <p>Browse our extensive collection of premium properties</p>
      </section>

      <section className="properties-section">
        <div style={{ marginBottom: '30px' }}>
          <SearchBar 
            properties={properties} 
            onResultsChange={setFilteredProperties}
          />
        </div>

        <div className="properties-grid">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '40px',
              color: '#666',
              fontSize: '18px'
            }}>
              No properties found matching your criteria.
            </div>
          )}
        </div>

        {filteredProperties.length > 0 && (
          <div className="view-all">
            <span className="view-all-link">
              Showing {filteredProperties.length} of {properties.length} properties
            </span>
          </div>
        )}
      </section>
    </>
  );
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="property-card">
      <div className="property-image">
        <img 
          src={property.emoji} 
          alt={property.address} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
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
