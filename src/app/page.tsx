'use client';

import Link from 'next/link';
import { useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { mockProperties } from '@/data/mockProperties';

interface SearchFilters {
  searchCity: string;
  propertyType: string;
  priceRange: string;
}

export default function Home() {
  const [filters, setFilters] = useState<SearchFilters>({
    searchCity: '',
    propertyType: '',
    priceRange: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger search logic
    console.log('Searching:', filters);
    alert('Search functionality would be implemented here!');
  };

  return (
    <>
      <section className="hero">
        <h1>Find Your Dream Home Today</h1>
        <p>Discover the perfect property that matches your lifestyle and budget</p>

        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter city, zip, or address"
            value={filters.searchCity}
            onChange={(e) => setFilters({ ...filters, searchCity: e.target.value })}
            className="search-input"
          />
          <select
            value={filters.propertyType}
            onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
            className="search-select"
          >
            <option value="">All Property Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
          </select>
          <select
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
            className="search-select"
          >
            <option value="">Price Range</option>
            <option value="under-500k">Under $500K</option>
            <option value="500k-1m">$500K - $1M</option>
            <option value="over-1m">Over $1M</option>
          </select>
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </section>

      <section className="properties-section">
        <h2 className="section-title">Featured Properties</h2>
        <div className="properties-grid">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="view-all">
          <Link href="/listings" className="view-all-link">
            View All Properties →
          </Link>
        </div>
      </section>
    </>
  );
}
