import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Filter, 
  ChevronDown, 
  Grid, 
  List, 
  SlidersHorizontal,
  Shirt,
  Smartphone,
  Home,
  Gem,
  Car
} from "lucide-react";
import { products, categories, getProductsByCategory } from "@/components/data/product";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ui/product-skeleton";

const Shop = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 60000]);
  const [onlyNewItems, setOnlyNewItems] = useState(false);
  const [onlySaleItems, setOnlySaleItems] = useState(false);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const categoryPath = location.pathname.split("/").pop();
    
    if (category) {
      setSelectedCategory(category);
    } else if (categoryPath && categories.some(c => c.id === categoryPath)) {
      setSelectedCategory(categoryPath);
    } else if (location.pathname.includes("/categories/")) {
      const pathCategory = location.pathname.split("/categories/")[1];
      if (pathCategory && categories.some(c => c.id === pathCategory)) {
        setSelectedCategory(pathCategory);
      }
    }
  }, [location]);
  
  useEffect(() => {
    let currentProducts = [...products];
    
    if (selectedCategory) {
      currentProducts = getProductsByCategory(selectedCategory);
    }
    
    currentProducts = currentProducts.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    if (onlyNewItems) {
      currentProducts = currentProducts.filter(product => product.isNew);
    }
    
    if (onlySaleItems) {
      currentProducts = currentProducts.filter(product => product.isSale);
    }
    
    switch (sortBy) {
      case "price-low-high":
        currentProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        currentProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        currentProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setFilteredProducts(currentProducts);
  }, [sortBy, priceRange, onlyNewItems, onlySaleItems, selectedCategory]);
  
  const handleResetFilters = () => {
    setPriceRange([0, 60000]);
    setOnlyNewItems(false);
    setOnlySaleItems(false);
    setSortBy("featured");
    setSelectedCategory(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPageTitle = () => {
    if (selectedCategory) {
      const category = categories.find(c => c.id === selectedCategory);
      return category ? `Shop ${category.name}` : 'Shop All Products';
    }
    return 'Shop All Products';
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Reduced loading time from 5000 to 1000ms for better UX
  }, [selectedCategory]);

  // Add a style for the button
  const buttonStyle = "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-trocly-red text-white hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-trocly-red focus:ring-offset-2";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{getPageTitle()}</h1>
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-trocly-red transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/categories" className="hover:text-trocly-red transition-colors">Categories</Link>
              {selectedCategory && (
                <>
                  <span className="mx-2">/</span>
                  <span>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</span>
                </>
              )}
            </div>
          </div>
          
          {!selectedCategory && (
            <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {categories.map(category => (
                <Link 
                  key={category.id}
                  to={`/categories/${category.id}`}
                  className="bg-white shadow-sm rounded-lg p-4 text-center hover:shadow-md transition-shadow group"
                >
                  <div className="mb-3 flex justify-center">
                    {category.id === "fashion" && <Shirt className="w-8 h-8 text-gray-600 group-hover:text-trocly-red transition-colors" />}
                    {category.id === "electronics" && <Smartphone className="w-8 h-8 text-gray-600 group-hover:text-trocly-red transition-colors" />}
                    {category.id === "home" && <Home className="w-8 h-8 text-gray-600 group-hover:text-trocly-red transition-colors" />}
                    {category.id === "jewelry" && <Gem className="w-8 h-8 text-gray-600 group-hover:text-trocly-red transition-colors" />}
                    {category.id === "vehicles" && <Car className="w-8 h-8 text-gray-600 group-hover:text-trocly-red transition-colors" />}
                  </div>
                  <h3 className="font-medium text-gray-800 group-hover:text-trocly-red transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {products.filter(p => p.category === category.name).length} products
                  </p>
                </Link>
              ))}
            </div>
          )}
          
          {/* Changed to grid for better spacing between sidebar and products on all screen sizes */}
          <div className="grid md:grid-cols-[280px_1fr] gap-6 relative">
            {/* Sidebar with improved positioning */}
            <aside 
              className={`
                ${showFilters ? 'block' : 'hidden md:block'}
                w-full bg-white rounded-lg shadow-lg p-6
                md:sticky md:top-24 md:h-auto md:max-h-[calc(100vh-6rem)] md:overflow-y-auto
                transition-all duration-300 ease-in-out z-30
                backdrop-blur-xl bg-white/90 border border-gray-100
                scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
              `}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center text-lg">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                </h3>
                <button 
                  className="text-sm text-trocly-red hover:underline focus:outline-none"
                  onClick={handleResetFilters}
                >
                  Reset
                </button>
              </div>
              
              <div className="mb-8">
                <h4 className="font-medium mb-4 text-gray-700">Categories</h4>
                <div className="space-y-3">
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center group cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(
                          selectedCategory === category.id ? null : category.id
                        )}
                        className="rounded text-trocly-red focus:ring-trocly-red h-4 w-4 transition-colors"
                      />
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        {category.name} 
                        <span className="text-gray-400 text-xs ml-1">
                          ({products.filter(p => p.category === category.name).length})
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="font-medium mb-4 text-gray-700">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">${priceRange[0]}</span>
                    <span className="text-sm font-medium text-gray-600">${priceRange[1]}</span>
                  </div>
                  <input 
                    type="range" 
                    min={0}
                    max={60000}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                      hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-trocly-red/20"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-4 text-gray-700">Product Status</h4>
                <div className="space-y-3">
                  <label className="flex items-center group cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={onlyNewItems}
                      onChange={() => setOnlyNewItems(!onlyNewItems)}
                      className="rounded text-trocly-red focus:ring-trocly-red h-4 w-4 transition-colors"
                    />
                    <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      New Arrivals
                    </span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={onlySaleItems}
                      onChange={() => setOnlySaleItems(!onlySaleItems)}
                      className="rounded text-trocly-red focus:ring-trocly-red h-4 w-4 transition-colors"
                    />
                    <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      On Sale
                    </span>
                  </label>
                </div>
              </div>
              
              {/* Mobile display only - Close filters button */}
              <div className="md:hidden mt-4">
                <button 
                  className={buttonStyle + " w-full"}
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </button>
              </div>
            </aside>
            
            {/* Products content area with control panel */}
            <div>
              {/* Filter controls - Mobile toggle + Sort controls */}
              <div className="flex flex-wrap justify-between items-center bg-white p-3 rounded-lg shadow-sm mb-6 gap-2">
                <button
                  className="md:hidden flex items-center space-x-1 bg-white border border-gray-200 rounded px-3 py-2 text-sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>
                
                <div className="flex items-center space-x-3 ml-auto">
                  <div className="flex items-center space-x-1 md:hidden">
                    <button
                      className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-trocly-red focus:border-trocly-red"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              {/* Product grid with reduced card size */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search criteria.
                  </p>
                  <button 
                    className={buttonStyle}
                    onClick={handleResetFilters}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className={`grid ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5' 
                    : 'grid-cols-1 gap-4'
                }`}>
                  {isLoading ? (
                    [...Array(6)].map((_, index) => (
                      <div key={index} className="animate-fade-in">
                        <ProductSkeleton />
                      </div>
                    ))
                  ) : (
                    filteredProducts.map((product) => (
                      <div key={product.id} className="animate-fade-in">
                        <ProductCard product={product} />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
