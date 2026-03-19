export interface Property {
  id: string;
  address: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  images: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  features: string[];
  yearBuilt: number;
  propertyType: string;
}
