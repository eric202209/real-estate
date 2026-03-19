interface Property {
  id: number;
  image: string;
  price: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-6xl">
        {property.image}
      </div>
      <div className="p-4">
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {property.price}
        </div>
        <div className="text-gray-700 mb-4">
          {property.address}
        </div>
        <div className="flex justify-between text-gray-600">
          <span className="flex items-center">
            🛏️ {property.beds} Bed
          </span>
          <span className="flex items-center">
            🚿 {property.baths} Bath
          </span>
          <span className="flex items-center">
            📐 {property.sqft.toLocaleString()} sqft
          </span>
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          Schedule Viewing
        </button>
      </div>
    </div>
  );
}
