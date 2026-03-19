import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchBar from './SearchBar';
import { Property } from '@/types/property';

// Mock property data
const mockProperties: Property[] = [
  {
    id: '1',
    address: '123 Main St',
    city: 'San Francisco',
    price: 800000,
    beds: 3,
    baths: 2,
    sqft: 1500,
    description: 'Beautiful house',
    images: ['/property1.jpg'],
    agent: {
      name: 'John Doe',
      phone: '555-1234',
      email: 'john@example.com',
      image: '/agent1.jpg',
    },
    features: ['garage', 'garden'],
    yearBuilt: 2010,
    propertyType: 'house',
  },
  {
    id: '2',
    address: '456 Oak Ave',
    city: 'Los Angeles',
    price: 1200000,
    beds: 4,
    baths: 3,
    sqft: 2500,
    description: 'Luxury home',
    images: ['/property2.jpg'],
    agent: {
      name: 'Jane Smith',
      phone: '555-5678',
      email: 'jane@example.com',
      image: '/agent2.jpg',
    },
    features: ['pool', 'garage'],
    yearBuilt: 2015,
    propertyType: 'house',
  },
  {
    id: '3',
    address: '789 Pine Rd',
    city: 'San Francisco',
    price: 600000,
    beds: 2,
    baths: 1,
    sqft: 1000,
    description: 'Cozy condo',
    images: ['/property3.jpg'],
    agent: {
      name: 'Bob Wilson',
      phone: '555-9012',
      email: 'bob@example.com',
      image: '/agent3.jpg',
    },
    features: ['gym'],
    yearBuilt: 2005,
    propertyType: 'condo',
  },
];

describe('SearchBar', () => {
  const onResultsChangeMock = vi.fn();

  beforeEach(() => {
    onResultsChangeMock.mockClear();
  });

  it('should display all input fields correctly', () => {
    render(
      <SearchBar 
        properties={mockProperties} 
        onResultsChange={onResultsChangeMock} 
      />
    );
    
    expect(screen.getByPlaceholderText(/search by location/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/min price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/max price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/min beds/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should filter properties by search term', () => {
    render(
      <SearchBar 
        properties={mockProperties} 
        onResultsChange={onResultsChangeMock} 
      />
    );
    
    const searchInput = screen.getByPlaceholderText(/search by location/i);
    fireEvent.change(searchInput, { target: { value: 'San Francisco' } });
    
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    expect(onResultsChangeMock).toHaveBeenCalledTimes(1);
    const calledWith = onResultsChangeMock.mock.calls[0][0];
    expect(calledWith).toHaveLength(2); // Should match 2 properties in San Francisco
    expect(calledWith[0].city).toBe('San Francisco');
    expect(calledWith[1].city).toBe('San Francisco');
  });

  it('should filter properties by price range and property type', () => {
    render(
      <SearchBar 
        properties={mockProperties} 
        onResultsChange={onResultsChangeMock} 
      />
    );
    
    // Set min price to 500000 (so condo at 600000 will pass)
    const minPriceInput = screen.getByPlaceholderText(/min price/i);
    fireEvent.change(minPriceInput, { target: { value: '500000' } });
    
    // Set max price to 1000000
    const maxPriceInput = screen.getByPlaceholderText(/max price/i);
    fireEvent.change(maxPriceInput, { target: { value: '1000000' } });
    
    // Set property type to condo
    const typeSelect = screen.getByRole('combobox');
    fireEvent.change(typeSelect, { target: { value: 'condo' } });
    
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    expect(onResultsChangeMock).toHaveBeenCalledTimes(1);
    const calledWith = onResultsChangeMock.mock.calls[0][0];
    expect(calledWith).toHaveLength(1); // Should match only 1 condo between 500k and 1M
    expect(calledWith[0].propertyType).toBe('condo');
    expect(calledWith[0].price).toBe(600000);
  });
});