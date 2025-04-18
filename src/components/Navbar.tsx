import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Heart, Search, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase"; // adjust the path if needed

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Mock data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleCartUpdate = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length); // or however your `addToCart` saves it
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    handleCartUpdate(); // Run it initially

    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/9d4f0afe-a973-43e5-8f6e-eb98c448566d.png" 
              alt="Trocly" 
              className="h-20 w-20 mr-2 transition-transform hover:scale-105"
            />
            <span className="text-xl font-heading font-bold text-trocly-dark">Trocly</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`animated-link font-medium ${isActive('/') ? 'text-trocly-red after:scale-x-100' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`animated-link font-medium ${isActive('/shop') ? 'text-trocly-red after:scale-x-100' : ''}`}
            >
              Shop
            </Link>
            <Link 
              to="/categories" 
              className={`animated-link font-medium ${isActive('/categories') ? 'text-trocly-red after:scale-x-100' : ''}`}
            >
              Categories
            </Link>
            <Link 
              to="/deals" 
              className={`animated-link font-medium ${isActive('/deals') ? 'text-trocly-red after:scale-x-100' : ''}`}
            >
              Deals
            </Link>
            <Link 
              to="/about" 
              className={`animated-link font-medium ${isActive('/about') ? 'text-trocly-red after:scale-x-100' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`animated-link font-medium ${isActive('/contact') ? 'text-trocly-red after:scale-x-100' : ''}`}
            >
              Contact
            </Link>
          </nav>

          {/* Icons + Sign Up Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search className="h-5 w-5 text-gray-700" />
            </button>
            <Link 
              to="/wishlist" 
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                isActive('/wishlist') ? 'text-trocly-red bg-gray-100' : ''
              }`}
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link 
              to="/account" 
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                isActive('/account') ? 'text-trocly-red bg-gray-100' : ''
              }`}
            >
              <User className="h-5 w-5" />
            </Link>
            <Link 
              to="/cart" 
              className={`p-2 rounded-full hover:bg-gray-100 relative transition-colors ${
                isActive('/cart') ? 'text-trocly-red bg-gray-100' : ''
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-trocly-red text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full animate-pulse">
                  {cartCount}
                </Badge>
              )}
            </Link>
            {!isLoggedIn && (
              <Link 
                to="/signup" 
                className="ml-2 px-4 py-2 bg-trocly-red text-white rounded-full text-sm font-semibold hover:bg-trocly-red/90 transition-colors"
              >
                Sign Up
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-3">
            <Link 
              to="/cart" 
              className={`p-2 rounded-full hover:bg-gray-100 relative ${
                isActive('/cart') ? 'text-trocly-red bg-gray-100' : ''
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-trocly-red text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full">
                  {cartCount}
                </Badge>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t mt-1 animate-slide-in-right">
          <div className="container mx-auto py-4 px-4 space-y-4">
            <Link 
              to="/" 
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/') ? 'bg-trocly-red/10 text-trocly-red' : 'hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/shop') ? 'bg-trocly-red/10 text-trocly-red' : 'hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/categories" 
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/categories') ? 'bg-trocly-red/10 text-trocly-red' : 'hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/deals" 
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/deals') ? 'bg-trocly-red/10 text-trocly-red' : 'hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Deals
            </Link>
            <Link 
              to="/about" 
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/about') ? 'bg-trocly-red/10 text-trocly-red' : 'hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/contact') ? 'bg-trocly-red/10 text-trocly-red' : 'hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {!isLoggedIn && (
              <Link 
                to="/signup" 
                className="block w-full text-center py-2 px-4 bg-trocly-red text-white font-semibold rounded-lg hover:bg-trocly-red/90 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            )}
            <div className="pt-2 flex items-center space-x-4 border-t">
              <Link 
                to="/account" 
                className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                  isActive('/account') ? 'bg-trocly-red/10 text-trocly-red' : 'hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Account
              </Link>
              <Link 
                to="/wishlist" 
                className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                  isActive('/wishlist') ? 'bg-trocly-red/10 text-trocly-red' : 'hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
