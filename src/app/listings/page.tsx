'use client';

import { useState, useCallback } from 'react';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types/property';
import { mockProperties } from '@/data/mockProperties';

export default function ListingsPage() {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);

  const handleResultsChange = useCallback((filtered: Property[]) => {
    setFilteredProperties(filtered);
  }, []);

  return (
    <>
      <section className="hero">
        <h1>Our Latest Properties</h1>
        <p>Browse our extensive collection of premium properties</p>
      </section>

      <section className="properties-section">
        <div style={{ marginBottom: '30px' }}>
          <SearchBar 
            properties={mockProperties}
            onResultsChange={handleResultsChange}
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
              Showing {filteredProperties.length} of {mockProperties.length} properties
            </span>
          </div>
        )}
      </section>
    </>
  );
}
