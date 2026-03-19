import Link from 'next/link';
import { mockProperties, getSimilarProperties } from '@/data/mockProperties';
import PropertyGallery from '@/components/PropertyGallery';
import AgentContact from '@/components/AgentContact';
import MortgageCalculator from '@/components/MortgageCalculator';
import SimilarProperties from '@/components/SimilarProperties';

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return Promise.resolve(params).then(async (resolvedParams) => {
    const propertyId = resolvedParams.id;
    
    const property = mockProperties.find(p => p.id === propertyId);

    if (!property) {
      return (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Property Not Found</h1>
            <p className="mt-2 text-gray-600">The property you are looking for does not exist or has been removed.</p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Back to Home
            </Link>
          </div>
        </div>
      );
    }

    const similarProperties = getSimilarProperties(property.id, 3);

    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{property.city}</li>
            <li>/</li>
            <li className="font-medium text-gray-900">{property.address}</li>
          </ol>
        </nav>

        {/* Gallery */}
        <PropertyGallery images={property.images} />

        {/* Property Header */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">${property.price.toLocaleString()}</h1>
            <p className="mt-1 text-lg text-gray-600">{property.address}, {property.city}</p>
            <p className="mt-2 text-base text-gray-700">
              {property.beds} bed
              {' '}
              {property.beds !== 1 ? (
                <span>
                  s {'•'} {property.baths} bath
                  {' '}
                  {property.baths !== 1 ? <span>s</span> : ''}
                </span>
              ) : (
                <span>{'•'} {property.baths} bath {' '}{property.baths !== 1 ? 's' : ''}</span>
              )}
              {' '}
              {'•'} {property.sqft.toLocaleString()} sqft
            </p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              📷 Save
            </button>
            <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              📧 Share
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </section>

            {/* Property Details */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Property Details</h2>
              <div className="grid grid-cols-2 gap-4 rounded-lg border border-gray-200 bg-white p-4">
                <div>
                  <span className="text-sm text-gray-600">Property Type</span>
                  <p className="font-medium text-gray-900">{property.propertyType}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Year Built</span>
                  <p className="font-medium text-gray-900">{property.yearBuilt}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Square Footage</span>
                  <p className="font-medium text-gray-900">{property.sqft.toLocaleString()} sqft</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Price per Sqft</span>
                  <p className="font-medium text-gray-900">${Math.round(property.price / property.sqft)}</p>
                </div>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Features & Amenities</h2>
              <div className="grid grid-cols-2 gap-3 rounded-lg border border-gray-200 bg-white p-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Similar Properties */}
            <SimilarProperties properties={similarProperties} />
          </div>

          {/* Right Column - Agent & Calculator */}
          <div className="space-y-8">
            <AgentContact agent={property.agent} />
            <MortgageCalculator
              price={property.price}
              interestRate={6.5}
              downPaymentPercent={20}
              loanTermYears={30}
            />
          </div>
        </div>
      </main>
    );
  });
}

export async function generateStaticParams() {
  const properties = mockProperties;
  return properties.map((property) => ({
    id: property.id,
  }));
}
