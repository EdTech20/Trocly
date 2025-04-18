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
  }
];

export function getProductsByCategory(categoryId: string): Product[] {
  const categoryName = categories.find(c => c.id === categoryId)?.name || "";
  return products.filter(product => product.category === categoryName);
}