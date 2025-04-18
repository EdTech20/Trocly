
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-trocly-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/9d4f0afe-a973-43e5-8f6e-eb98c448566d.png" 
                alt="Trocly" 
                className="h-12 w-12 mr-2"
              />
              <span className="text-xl font-heading font-bold">Trocly</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for trendy fashion items at affordable prices. Quality guaranteed.
            </p>
            <div className="flex space-x-3 mt-2">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-trocly-red transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-trocly-red transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-trocly-red transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-trocly-red transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/deals" className="text-gray-400 hover:text-white transition-colors">Deals</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-gray-400 hover:text-white transition-colors">My Account</Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-400 hover:text-white transition-colors">Track Order</Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-trocly-red mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Fashion Street, Styleville, New York, 10001
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-trocly-red mr-2 flex-shrink-0" />
                <a href="mailto:info@trocly.com" className="text-gray-400 hover:text-white transition-colors">
                  info@trocly.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-trocly-red mr-2 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Trocly. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
