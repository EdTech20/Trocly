
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Product } from "@/types/product";

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
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-trocly-red transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span>Wishlist</span>
            </div>
          </div>

          {wishlist.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="inline-flex items-center justify-center p-8 bg-gray-50 rounded-full mb-6">
                <Heart className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start adding your favorite items to create your perfect wishlist!
              </p>
              <Link to="/shop">
                <Button className="bg-trocly-red hover:bg-red-700">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 divide-y">
                {wishlist.map((product) => (
                  <div key={product.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="relative group w-24 h-24 flex-shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <Link 
                          to={`/product/${product.id}`}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg"
                        >
                          <Eye className="w-5 h-5 text-white" />
                        </Link>
                      </div>
                      
                      <div className="flex-grow">
                        <Link 
                          to={`/product/${product.id}`}
                          className="text-lg font-medium hover:text-trocly-red transition-colors"
                        >
                          {product.name}
                        </Link>
                        <div className="mt-1 space-y-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-trocly-red">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {product.stock && (
                            <p className="text-sm text-gray-600">
                              Stock: {product.stock > 0 ? `${product.stock} units` : 'Out of stock'}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => addToCart(product)}
                          className="bg-trocly-red hover:bg-red-700"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => removeFromWishlist(product.id)}
                          className="text-gray-500 hover:text-red-600"
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
