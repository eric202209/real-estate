'use client';

import { useState, useMemo } from 'react';
import { Property } from '@/types/property';

interface SearchBarProps {
  properties: Property[];
  onResultsChange: (filtered: Property[]) => void;
}

export default function SearchBar({ properties, onResultsChange }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [minBeds, setMinBeds] = useState<number | ''>('');
  const [propertyType, setPropertyType] = useState<string>('all');

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search term filter (address + city)
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        property.address.toLowerCase().includes(searchLower) ||
        property.city.toLowerCase().includes(searchLower);

      // Price filters
      const matchesMinPrice = minPrice === '' || property.price >= Number(minPrice);
      const matchesMaxPrice = maxPrice === '' || property.price <= Number(maxPrice);

      // Beds filter
      const matchesBeds = minBeds === '' || property.beds >= Number(minBeds);

      // Property type filter
      const matchesType = propertyType === 'all' || 
        property.propertyType.toLowerCase().includes(propertyType.toLowerCase());

      return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesBeds && matchesType;
    });
  }, [searchTerm, minPrice, maxPrice, minBeds, propertyType, properties]);

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="🔍 Search by location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <select 
        value={propertyType} 
        onChange={(e) => setPropertyType(e.target.value)}
        className="search-select"
      >
        <option value="all">All Types</option>
        <option value="house">Houses</option>
        <option value="condo">Condos</option>
        <option value="luxury">Luxury</option>
      </select>

      <input
        type="number"
        placeholder="Min Price ($)"
        value={minPrice === '' ? '' : Number(minPrice)}
        onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
        className="search-input"
        min="0"
      />

      <input
        type="number"
        placeholder="Max Price ($)"
        value={maxPrice === '' ? '' : Number(maxPrice)}
        onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
        className="search-input"
        min="0"
      />

      <input
        type="number"
        placeholder="Min Beds"
        value={minBeds === '' ? '' : Number(minBeds)}
        onChange={(e) => setMinBeds(e.target.value === '' ? '' : Number(e.target.value))}
        className="search-input"
        min="0"
      />

      <button 
        className="search-button"
        onClick={() => onResultsChange(filteredProperties)}
      >
        Search
      </button>
    </div>
  );
}
