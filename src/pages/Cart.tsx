
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
      // Add quantity if not present
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
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-trocly-red transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span>Cart</span>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="inline-flex items-center justify-center p-8 bg-gray-50 rounded-full mb-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Add items to your cart and they will appear here.
              </p>
              <Link to="/shop">
                <Button className="bg-trocly-red hover:bg-red-700">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-6">
                          <div className="relative group w-24 h-24 flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <Link 
                              to={`/product/${item.id}`}
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg"
                            >
                              <Eye className="w-5 h-5 text-white" />
                            </Link>
                          </div>
                          
                          <div className="flex-grow">
                            <Link 
                              to={`/product/${item.id}`}
                              className="text-lg font-medium hover:text-trocly-red transition-colors"
                            >
                              {item.name}
                            </Link>
                            <div className="mt-1 space-y-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-trocly-red">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    ${(item.originalPrice * item.quantity).toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-lg">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <Button
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
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
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="h-px bg-gray-200 my-4"></div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {shipping > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Add ${(100 - subtotal).toFixed(2)} more to get free shipping!
                    </p>
                  )}
                  
                  <Button className="w-full bg-trocly-red hover:bg-red-700 mt-6">
                    Proceed to Checkout
                  </Button>
                  
                  <Link 
                    to="/shop" 
                    className="block text-center text-sm text-gray-600 hover:text-trocly-red mt-4"
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
