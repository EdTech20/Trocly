import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { addToCart,  addToWishlist, getWishlistStatus } from "./utils/shopping";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  useEffect(() => {
    setIsWishlisted(getWishlistStatus(product.id));
    
    const handleWishlistUpdate = () => {
      setIsWishlisted(getWishlistStatus(product.id));
    };
    
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () => window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
  }, [product.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow w-full max-w-[95%] mx-auto">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative pb-[100%]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <button
              onClick={handleAddToWishlist}
              className="bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-100 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "text-trocly-red fill-current" : "text-gray-600"}`} />
            </button>
          </div>
          {/* ... keep existing code (NEW and SALE badges) */}
        </div>
      </Link>
      
      <div className="p-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-sm mb-1 hover:text-trocly-red transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* ... keep existing code (rating display) */}
        
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-sm">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button 
            size="sm"
            className="bg-trocly-red hover:bg-red-700 text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;