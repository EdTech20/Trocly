
import { X, Search as SearchIcon, Heart, ShoppingCart, Star } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { products } from "./data/product";
import { useNavigate } from "react-router-dom";
import { addToCart, addToWishlist, getWishlistStatus  } from "./utils/shopping";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      setTimeout(() => inputRef.current?.focus(), 140);
      const onEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onEsc);
      return () => window.removeEventListener("keydown", onEsc);
    } else {
      setTimeout(() => setIsMounted(false), 200);
    }
  }, [open, onClose]);

  const filteredProducts = products.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
  );

  if (!open && !isMounted) return null;

  return (
    <>
      {/* Overlay (backdrop) */}
      <div
        className={`fixed inset-0 z-[1001] bg-black/60 transition-opacity duration-200
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
        onClick={onClose}
        style={{ backdropFilter: "blur(2px)" }}
      />
      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center px-2 md:px-4 z-[1002] transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          pointerEvents: open ? "auto" : "none"
        }}
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
      >
        {/* Panel */}
        <div
          className="relative bg-white w-full max-w-xl mx-auto rounded-2xl shadow-2xl p-0 md:p-6 transition-all duration-200 animate-in fade-in-0 slide-in-from-top-4 z-[1003]"
        >
          {/* Header w/ close */}
          <div className="flex items-center border-b">
            <SearchIcon className="w-5 h-5 ml-4 text-gray-400" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-4 text-lg bg-transparent outline-none"
              placeholder="Search product name, category, etc..."
              autoFocus
              aria-label="Search products"
            />
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-2">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          {/* Results */}
          <div className="p-4 bg-gray-50 min-h-[180px] rounded-b-2xl">
            {query.length === 0 && (
              <div className="text-center text-gray-500 py-12">Type to search for products.</div>
            )}
            {query.length > 0 && (
              <div>
                {filteredProducts.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredProducts.map((product) => {
                      const isWishlisted = getWishlistStatus(product.id);
                      const discountPercentage = product.originalPrice
                        ? Math.round(
                            ((product.originalPrice - product.price) / product.originalPrice) * 100
                          )
                        : 0;
                      return (
                        <div
                          key={product.id}
                          className="relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
                        >
                          <div
                            className="relative pb-[55%]"
                            onClick={() => {
                              onClose();
                              navigate(`/products/${product.id}`);
                            }}
                            tabIndex={0}
                            style={{ outline: "none" }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 flex flex-col space-y-2 z-10">
                              <button
                                tabIndex={0}
                                onClick={e => {
                                  e.stopPropagation();
                                  addToWishlist(product);
                                }}
                                className="bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-100 transition-colors"
                                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                              >
                                <Heart className={`w-4 h-4 ${isWishlisted ? "text-trocly-red fill-current" : "text-gray-600"}`} />
                              </button>
                            </div>
                            {product.isNew && (
                              <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs z-10">
                                NEW
                              </span>
                            )}
                            {product.isSale && (
                              <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs mt-8 z-10">
                                {discountPercentage}% OFF
                              </span>
                            )}
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                            <div className="flex items-center mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
                            </div>
                            <div className="flex items-center justify-between gap-2 mt-auto">
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
                              <button
                                tabIndex={0}
                                className="bg-trocly-red hover:bg-red-700 text-white rounded-md px-3 py-1.5 text-sm font-semibold flex items-center gap-1"
                                onClick={e => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  addToCart(product);
                                }}
                              >
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Add to Cart
                              </button>
                            </div>
                            {product.description && (
                              <div className="mt-1">
                                <span className="block text-xs text-gray-500 line-clamp-2">{product.description}</span>
                              </div>
                            )}
                            {/* 'View Details' link for clarity on mobile */}
                            <button
                              tabIndex={0}
                              className="mt-3 underline text-trocly-red text-xs hover:text-red-700 text-left"
                              onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClose();
                                navigate(`/products/${product.id}`);
                              }}
                            >
                              View Product Details &rarr;
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    No products found matching your search.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;