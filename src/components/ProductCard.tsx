
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Check } from "lucide-react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { addToCart,  addToWishlist, getWishlistStatus } from "./utils/shopping";

interface ProductCardProps {
  product: Product;
}

const CART_KEY = "cart";

function getCartFromStorage(): Product[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(cart: Product[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  // Check if product is in cart on mount or when product changes
  useEffect(() => {
    setIsWishlisted(getWishlistStatus(product.id));
    const cart = getCartFromStorage();
    setIsInCart(cart.some((item) => item.id === product.id));

    const handleWishlistUpdate = () => setIsWishlisted(getWishlistStatus(product.id));
    const handleCartUpdate = () => {
      const cart = getCartFromStorage();
      setIsInCart(cart.some((item) => item.id === product.id));
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [product.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add to cart in localStorage
    let cart = getCartFromStorage();
    if (!cart.some((item) => item.id === product.id)) {
      cart.push(product);
      saveCartToStorage(cart);
    }
    setIsInCart(true);

    addToCart(product); // Optional: call original util
    const event = new CustomEvent("cartUpdated");
    window.dispatchEvent(event);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist(product);
    const event = new Event("wishlistUpdated");
    window.dispatchEvent(event);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      <Link to={`/products/${product.id}`} className="block">
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
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
              NEW
            </span>
          )}
          {product.isSale && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs mt-8">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"}`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              className={`text-white transition-all ${
                isInCart
                  ? "bg-green-500 hover:bg-green-600 pointer-events-none"
                  : "bg-trocly-red hover:bg-red-700"
              }`}
              onClick={!isInCart ? handleAddToCart : undefined}
              aria-disabled={isInCart}
            >
              {isInCart ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
