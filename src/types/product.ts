
export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    category: string;
    isNew?: boolean;
    isSale?: boolean;
    specifications?: {
      [key: string]: string;
    };
    stock?: number;
    sku?: string;
    brand?: string;
    features?: string[];
    availableSizes?: string[];
    availableColors?: { name: string; hex: string; }[];
  }
  
  export interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
  }
  