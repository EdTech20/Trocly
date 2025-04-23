
import type { Product, Category } from "@/types/product";

export const categories: Category[] = [
  { 
    id: "1",
    name: "Fashion",
    description: "Latest fashion trends and styles",
    image: "/placeholder.svg"
  },
  { 
    id: "2",
    name: "Electronics",
    description: "Modern electronic devices",
    image: "/placeholder.svg"
  },
  { 
    id: "3",
    name: "Home & Garden",
    description: "Everything for your home",
    image: "/placeholder.svg"
  },
  { 
    id: "4",
    name: "Jewelry",
    description: "Elegant jewelry pieces",
    image: "/placeholder.svg"
  },
  { 
    id: "5",
    name: "Vehicles",
    description: "Cars and vehicles",
    image: "/placeholder.svg"
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: "Premium White T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    category: "Fashion",
    image: "/placeholder.svg",
    isNew: true,
    description: "High-quality cotton t-shirt with a comfortable fit.",
    brand: "FashionBrand",
    sku: "TS001",
    stock: 100,
    specifications: {
      material: "100% Cotton",
      fit: "Regular",
      care: "Machine washable"
    },
    features: [
      "Premium cotton material",
      "Comfortable fit",
      "Durable stitching"
    ]
  },
  {
    id: 2,
    name: "Wireless Bluetooth Earbuds",
    price: 99.99,
    rating: 4.8,
    category: "Electronics",
    image: "/placeholder.svg",
    isSale: true,
    description: "True wireless earbuds with noise cancellation.",
    brand: "TechAudio",
    sku: "WE002",
    stock: 50,
    specifications: {
      battery: "24 hours",
      connection: "Bluetooth 5.0",
      range: "10m"
    }
  },
  {
    id: 3,
    name: "Modern Coffee Table",
    price: 249.99,
    rating: 4.3,
    category: "Home & Garden",
    image: "/placeholder.svg",
    description: "Sleek design coffee table with tempered glass top.",
    brand: "HomeStyle",
    sku: "CT003",
    stock: 20,
    specifications: {
      material: "Glass and Metal",
      dimensions: "120x60x45cm",
      weight: "15kg"
    }
  },
  // NEW PRODUCTS BELOW
  {
    id: 4,
    name: "Elegant Gold Necklace",
    price: 399.99,
    rating: 4.9,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80",
    description: "24K gold necklace perfect for special occasions.",
    brand: "Golden Touch",
    sku: "GN004",
    stock: 12,
    specifications: {
      material: "24K Gold",
      length: "45cm",
      weight: "10g"
    },
    features: ["Elegant design", "Pure gold", "Gift box included"]
  },
  {
    id: 5,
    name: "Luxury SUV",
    price: 45999.0,
    rating: 4.7,
    category: "Vehicles",
    image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80",
    description: "Spacious luxury SUV with advanced safety features.",
    brand: "DriveLux",
    sku: "SUV005",
    stock: 5,
    specifications: {
      engine: "V6",
      seats: "7",
      color: "Metallic Silver"
    }
  },
  {
    id: 6,
    name: "Smartwatch Series 7",
    price: 299.99,
    rating: 4.2,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    description: "Modern smartwatch with health tracking and GPS.",
    brand: "TechTime",
    sku: "SW007",
    stock: 40,
    specifications: {
      battery: "18 hours",
      display: "AMOLED",
      waterResistance: "50m"
    }
  },
  {
    id: 7,
    name: "Orange Cat Plush",
    price: 24.99,
    rating: 4.8,
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80",
    description: "Cuddly plush cat for home or office.",
    brand: "CuddleHome",
    sku: "PL007",
    stock: 44,
    specifications: {
      material: "Polyester",
      dimensions: "30x16x14cm"
    }
  },
  {
    id: 8,
    name: "Vintage Matrix Poster",
    price: 19.99,
    rating: 4.7,
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    description: "Iconic Matrix movie poster for your wall.",
    brand: "ArtHouse",
    sku: "PO123",
    stock: 87,
    specifications: {
      size: "60x90cm",
      type: "Poster"
    }
  },
  {
    id: 9,
    name: "Floral Orange Vase",
    price: 49.99,
    rating: 4.4,
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80",
    description: "Beautiful orange floral vase for any decor.",
    brand: "DecoFlora",
    sku: "VO009",
    stock: 30,
    specifications: {
      material: "Ceramic",
      height: "30cm"
    }
  },
  {
    id: 10,
    name: "Work-from-Home Laptop",
    price: 899.99,
    originalPrice: 1099.99,
    rating: 4.6,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80",
    isNew: true,
    description: "Lightweight laptop perfect for remote work.",
    brand: "ComputePro",
    sku: "LP010",
    stock: 28,
    specifications: {
      processor: "Intel i5",
      ram: "16GB",
      storage: "512GB SSD"
    }
  }
];

export function getProductsByCategory(categoryId: string): Product[] {
  const categoryName = categories.find(c => c.id === categoryId)?.name || "";
  return products.filter(product => product.category === categoryName);
}
