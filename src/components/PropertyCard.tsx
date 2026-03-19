'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Some of the mock image URLs intermittently 404; if so, try the next one.
  const [imgIndex, setImgIndex] = useState(0);
  const imgSrc = property.images[imgIndex] || '/window.svg';

  return (
    <Link href={`/property/${property.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-[3/2] min-h-[220px] overflow-hidden bg-gray-100">
          {/* Use native <img> for more predictable remote image rendering on static export */}
          <img
            src={imgSrc}
            alt={property.address}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
            onError={() => {
              setImgIndex((i) => {
                if (i < property.images.length - 1) return i + 1;
                return i;
              });
            }}
          />
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            ${property.price.toLocaleString()}
          </div>
          <div className="text-gray-700 mb-4 line-clamp-2">
            {property.address}, {property.city}
          </div>
          <div className="flex justify-between text-gray-600 text-sm">
            <span className="flex items-center">
              🛏️ {property.beds} bed{property.beds !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center">
              🚿 {property.baths} bath{property.baths !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center">
              📐 {property.sqft.toLocaleString()} sqft
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
