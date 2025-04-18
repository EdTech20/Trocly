
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Brand {
  id: number;
  name: string;
  logo: string;
  products: number;
  category: string;
}

const brands: Brand[] = [
  {
    id: 1,
    name: "Samsung",
    logo: "https://1000logos.net/wp-content/uploads/2017/06/Samsung-Logo-1993.png",
    products: 156,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Apple",
    logo: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
    products: 203,
    category: "Electronics"
  },
  {
    id: 3,
    name: "Tesla",
    logo: "https://1000logos.net/wp-content/uploads/2018/02/Tesla-logo.png",
    products: 89,
    category: "Vehicles"
  },
  {
    id: 4,
    name: "IKEA",
    logo: "https://1000logos.net/wp-content/uploads/2017/02/IKEA-Logo-2019.png",
    products: 218,
    category: "Home"
  },
  {
    id: 5,
    name: "Tiffany & Co",
    logo: "https://1000logos.net/wp-content/uploads/2017/05/Tiffany-Logo-1950.jpg",
    products: 112,
    category: "Jewelry"
  },
  {
    id: 6,
    name: "Adidas",
    logo: "https://1000logos.net/wp-content/uploads/2019/06/Adidas-Logo-1991.jpg",
    products: 176,
    category: "Fashion"
  }
];

const TrendingBrands = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('brands-section');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filteredBrands = filter 
    ? brands.filter(brand => brand.category === filter)
    : brands;

  return (
    <section id="brands-section" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Shop by Brand</h2>
            <p className="text-gray-600">
              Discover your favorite brands across multiple categories
            </p>
          </div>
          <Link 
            to="/shop?filter=brands" 
            className="mt-4 md:mt-0 flex items-center text-trocly-red font-medium group"
          >
            View All Brands
            <ChevronRight className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Category filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button 
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === null 
                ? 'bg-trocly-red text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter(null)}
          >
            All
          </button>
          {Array.from(new Set(brands.map(b => b.category))).map(category => (
            <button 
              key={category}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === category 
                  ? 'bg-trocly-red text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {filteredBrands.map((brand, index) => (
            <Link 
              key={brand.id} 
              to={`/shop?brand=${brand.id}`}
              className={`bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-md transition-all duration-300 group ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-16 flex items-center justify-center mb-4">
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <h3 className="text-center font-medium">{brand.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{brand.products} products</p>
              <div className="text-xs bg-gray-200 px-2 py-0.5 rounded mt-2 text-gray-700">{brand.category}</div>
            </Link>
          ))}
        </div>
        
        {/* Brand Highlight Banner */}
        <div 
          className={`mt-12 rounded-2xl overflow-hidden relative ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.6s' }}
        >
          <div className="bg-gradient-to-r from-trocly-dark to-trocly-red p-8 md:p-12">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Shop Across Categories
              </h3>
              <p className="text-white/90 mb-6">
                From electronics to fashion, vehicles to home goods - find everything you need
                with our exclusive brand partnerships and competitive prices.
              </p>
              <Link 
                to="/shop?collection=multi-category" 
                className="inline-block bg-white text-trocly-red px-6 py-3 rounded-full font-medium hover:bg-trocly-accent transition-colors"
              >
                Explore All Categories
              </Link>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-trocly-red/80" />
            <img 
              src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Multi-category shopping"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingBrands;
