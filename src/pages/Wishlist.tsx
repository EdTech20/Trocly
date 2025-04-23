
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Minimal Product type definition for build/type safety
type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  stock?: number;
};

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const loadWishlist = () => {
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(savedWishlist);
    };

    loadWishlist();
    window.addEventListener("wishlistUpdated", loadWishlist);
    return () => window.removeEventListener("wishlistUpdated", loadWishlist);
  }, []);

  const removeFromWishlist = (productId: number) => {
    const newWishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setWishlist(newWishlist);
    toast.success("Item removed from wishlist");
  };

  const addToCart = (product: Product) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!currentCart.some((item: Product) => item.id === product.id)) {
      const newCart = [...currentCart, product];
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Added to cart successfully!");
    } else {
      toast.error("Item already in cart!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <br />
      <main className="flex-grow pt-20 pb-8 bg-gray-50">
        <div className="max-w-2xl w-full mx-auto px-3 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Wishlist</h1>
            <div className="flex items-center text-sm text-gray-500 flex-wrap">
              <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span>Wishlist</span>
            </div>
          </div>

          {wishlist.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12 text-center flex flex-col items-center">
              <div className="inline-flex items-center justify-center p-6 sm:p-8 bg-gray-50 rounded-full mb-4">
                <Heart className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
              </div>
              <h2 className="text-lg sm:text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
              <p className="text-gray-600 mb-6 max-w-xs mx-auto text-sm sm:text-base">
                Start adding your favorite items to create your perfect wishlist!
              </p>
              <Link to="/shop">
                <Button className="bg-red-500 hover:bg-red-600 w-full sm:w-auto text-base">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="divide-y">
                {wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                  >
                    {/* Mobile: vertical, Desktop: horizontal */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-6">
                      <div className="relative group w-full max-w-[88px] h-24 sm:w-24 sm:h-24 flex-shrink-0 mx-auto sm:mx-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <Link
                          to={`/products/${product.id}`}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg"
                        >
                          <Eye className="w-5 h-5 text-white" />
                        </Link>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <Link
                          to={`/products/${product.id}`}
                          className="text-base sm:text-lg font-medium hover:text-red-500 transition-colors line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <div className="mt-1 space-y-1">
                          <div className="flex flex-wrap justify-center sm:justify-start items-baseline gap-2">
                            <span className="text-lg sm:text-xl font-bold text-red-500">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs sm:text-sm text-gray-500 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {typeof product.stock !== "undefined" && (
                            <p className="text-xs sm:text-sm text-gray-600">
                              Stock: {product.stock > 0 ? `${product.stock} units` : 'Out of stock'}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center gap-1 sm:gap-3 mt-2 sm:mt-0">
                        <Button
                          onClick={() => addToCart(product)}
                          className="bg-red-500 hover:bg-red-600 w-9 h-9 sm:w-auto sm:h-auto px-0 sm:px-4 text-sm justify-center"
                          aria-label="Add to Cart"
                        >
                          <span className="hidden sm:inline-flex items-center"><ShoppingCart className="w-4 h-4 mr-2" />Add to Cart</span>
                          <ShoppingCart className="sm:hidden w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => removeFromWishlist(product.id)}
                          className="text-gray-500 hover:text-red-600 w-9 h-9 sm:w-auto sm:h-auto px-0 sm:px-3 justify-center"
                          aria-label="Remove from Wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
