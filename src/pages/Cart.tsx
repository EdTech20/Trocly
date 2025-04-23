import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Minus, Plus, Trash2, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const cartWithQuantity = savedCart.map((item: Product) => ({
        ...item,
        quantity: (item as CartItem).quantity || 1
      }));
      setCartItems(cartWithQuantity);
    };

    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const removeFromCart = (productId: number) => {
    const newCart = cartItems.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-8 bg-gray-50">
        <div className="max-w-3xl w-full mx-auto px-3 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Shopping Cart</h1>
            <div className="flex items-center text-sm text-gray-500 flex-wrap">
              <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span>Cart</span>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12 text-center flex flex-col items-center">
              <div className="inline-flex items-center justify-center p-6 sm:p-8 bg-gray-50 rounded-full mb-4">
                <ShoppingBag className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
              </div>
              <h2 className="text-lg sm:text-2xl font-bold mb-2">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-6 max-w-xs mx-auto text-sm sm:text-base">
                Add items to your cart and they will appear here.
              </p>
              <Link to="/shop">
                <Button className="bg-red-500 hover:bg-red-600 w-full sm:w-auto text-base">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 w-full">
              {/* Cart items */}
              <div className="flex-1">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                        {/* Mobile: vertical, Desktop: horizontal */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-6">
                          <div className="relative group w-full max-w-[88px] h-24 sm:w-24 sm:h-24 flex-shrink-0 mx-auto sm:mx-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <Link
                              to={`/products/${item.id}`}
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg"
                            >
                              <Eye className="w-5 h-5 text-white" />
                            </Link>
                          </div>
                          <div className="flex-1 text-center sm:text-left flex flex-col justify-center">
                            <Link
                              to={`/products/${item.id}`}
                              className="text-base sm:text-lg font-medium hover:text-red-500 transition-colors line-clamp-1"
                            >
                              {item.name}
                            </Link>
                            <div className="mt-1 space-y-1">
                              <div className="flex flex-wrap justify-center sm:justify-start items-baseline gap-2">
                                <span className="text-lg sm:text-xl font-bold text-red-500">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                                    ${(item.originalPrice * item.quantity).toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row sm:flex-col items-center gap-1 sm:gap-3 mt-2 sm:mt-0">
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 sm:p-3 hover:bg-gray-100 focus:outline-none disabled:opacity-40"
                                aria-label="Decrease quantity"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 sm:w-12 text-center select-none">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 sm:p-3 hover:bg-gray-100 focus:outline-none"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <Button
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-500 hover:text-red-600 w-9 h-9 sm:w-auto sm:h-auto px-0 sm:px-3 justify-center"
                              aria-label="Remove from cart"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Sidebar summary */}
              <div className="w-full lg:w-72 flex-shrink-0">
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold mb-3">Order Summary</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <div className="flex justify-between text-base font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Add ${(100 - subtotal).toFixed(2)} more to get free shipping!
                    </p>
                  )}
                  <Button className="w-full bg-red-500 hover:bg-red-600 mt-4 text-base">
                    Proceed to Checkout
                  </Button>
                  <Link
                    to="/shop"
                    className="block text-center text-xs text-gray-600 hover:text-red-500 mt-2"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
