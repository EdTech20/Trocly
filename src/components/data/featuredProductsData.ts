import Product  from "@/types/product";

// Sample products data with online images
export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    image: "https://source.unsplash.com/random/500x500?headphones",
    isNew: true,
    isSale: false,
    rating: 4
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch",
    price: 149.99,
    image: "https://source.unsplash.com/random/500x500?smartwatch",
    isNew: false,
    isSale: true,
    rating: 5
  },
  {
    id: 3,
    name: "Professional Camera",
    description: "Capture stunning photos with this professional DSLR camera",
    price: 899.99,
    image: "https://source.unsplash.com/random/500x500?camera",
    isNew: true,
    isSale: false,
    rating: 5
  },
  {
    id: 4,
    name: "Gaming Laptop",
    description: "High-performance gaming laptop with RTX graphics",
    price: 1299.99,
    image: "https://source.unsplash.com/random/500x500?laptop",
    isNew: false,
    isSale: true,
    rating: 4
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    description: "True wireless earbuds with premium sound quality",
    price: 129.99,
    image: "https://source.unsplash.com/random/500x500?earbuds",
    isNew: false,
    isSale: false,
    rating: 4
  },
];

// Function to filter products based on the tab
export const filterProducts = (tab: 'trending' | 'new' | 'sale'): Product[] => {
  switch (tab) {
    case 'new':
      return products.filter(product => product.isNew);
    case 'sale':
      return products.filter(product => product.isSale);
    default:
      return products;
  }
};
