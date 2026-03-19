'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import Image from 'next/image';
import PropertyCard from '@/components/PropertyCard';
import AgentContact from '@/components/AgentContact';
import MortgageCalculator from '@/components/MortgageCalculator';
import { mockProperties } from '@/data/mockProperties';

export default function Home() {
  // Highlight property 8 on the homepage
  const featuredProperty = useMemo(
    () => mockProperties.find((p) => p.id === '8') ?? mockProperties[0],
    []
  );

  return (
    <>
      {/* Hero style B: featured property image (left) + sidebar (right) */}
      <section className="mb-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
          {/* Left: featured image + overlay text/CTAs */}
          <div className="relative overflow-hidden rounded-xl bg-white shadow-md">
            <div className="relative aspect-[16/9] md:aspect-[4/3]">
              <Image
                src={featuredProperty.images[0] || '/api/placeholder/800/600'}
                alt={`${featuredProperty.address}, ${featuredProperty.city}`}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <div className="pointer-events-auto max-w-xl">
                <h1 className="text-3xl font-bold text-white">
                  DreamHome <span className="text-blue-200">Realty</span>
                </h1>
                <p className="mt-2 text-white/90">
                  Featured home: <span className="font-semibold">${featuredProperty.price.toLocaleString()}</span>
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/listings"
                    className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    View All Listings
                  </Link>
                  <Link
                    href={`/property/${featuredProperty.id}`}
                    className="rounded-md border border-white/60 bg-white/10 px-5 py-2 text-sm font-semibold text-white hover:bg-white/20"
                  >
                    Explore Featured Home
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right: sidebar with contact + quick calculator */}
          <div className="space-y-4">
            <AgentContact agent={featuredProperty.agent} />
            <MortgageCalculator price={featuredProperty.price} />
          </div>
        </div>
      </section>

      {/* Featured properties grid (now all with photos) */}
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
