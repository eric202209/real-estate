import Link from 'next/link';
import PropertyCard from './PropertyCard';
import { Property } from '@/types/property';

interface SimilarPropertiesProps {
  properties: Property[];
}

export default function SimilarProperties({ properties }: SimilarPropertiesProps) {
  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Similar Properties</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Link key={property.id} href={`/property/${property.id}`} className="block">
            <PropertyCard property={property} />
          </Link>
        ))}
      </div>
    </section>
  );
}
