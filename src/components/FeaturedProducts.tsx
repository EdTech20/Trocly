
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import ProductCard, {product} from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { products, filterProducts } from "./data/featuredProductsData";

const FeaturedProducts = () => {
  const [currentTab, setCurrentTab] = useState<'trending' | 'new' | 'sale'>('trending');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    setFilteredProducts(filterProducts(currentTab));
  }, [currentTab]);

  const handleAddToWishlist = (product: Product) => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (!savedWishlist.some((item: Product) => item.id === product.id)) {
      savedWishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(savedWishlist));
      window.dispatchEvent(new Event("wishlistUpdated"));
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the most popular and trending products that our customers love.
          </p>

          {/* Tabs */}
          <div className="flex justify-center items-center mt-8 border-b border-gray-200">
            {['trending', 'new', 'sale'].map(tab => (
              <button
                key={tab}
                className={`px-6 py-3 text-sm font-medium relative ${
                  currentTab === tab ? 'text-trocly-red' : 'text-gray-600 hover:text-trocly-red'
                }`}
                onClick={() => setCurrentTab(tab as 'trending' | 'new' | 'sale')}
              >
                {tab === 'trending' ? 'Trending' : tab === 'new' ? 'New Arrivals' : 'On Sale'}
                {currentTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-trocly-red"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Carousel */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {filteredProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <ProductCard product={product} />
                  <button 
                    onClick={() => handleAddToWishlist(product)} 
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                  >
                    <Heart className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end items-center mt-8 gap-2">
            <CarouselPrevious className="relative -left-0 text-trocly-red border-trocly-red hover:bg-trocly-red/10" />
            <CarouselNext className="relative -right-0 text-trocly-red border-trocly-red hover:bg-trocly-red/10" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedProducts;
