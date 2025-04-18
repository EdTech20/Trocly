
import { useState, useEffect } from "react";
import { ArrowDown, ShoppingBag, Truck, CreditCard, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const [offset, setOffset] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  
  const slides = [{
    title: "Discover Everything You Need in One Place",
    subtitle: "From Electronics to Fashion, Home Goods to Jewelry",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    cta: "/shop",
    ctaText: "Shop All Categories"
  }, {
    title: "Latest Tech & Electronics",
    subtitle: "Upgrade Your Digital Life with Our Premium Selection",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    cta: "/categories/electronics",
    ctaText: "Explore Electronics"
  }, {
    title: "Luxury Cars & Vehicles",
    subtitle: "Premium Vehicles for Every Lifestyle and Budget",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    cta: "/categories/vehicles",
    ctaText: "View Vehicles"
  }];

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <br /><br /><br /><br /><br /><br />
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(${isMobile ? '180deg' : '90deg'}, 
              hsla(348, 100%, 94%, 0.95) 0%, 
              hsla(348, 100%, 98%, ${isMobile ? '0.95' : '0.85'}) 100%), 
              url('${slide.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: isMobile ? 'none' : `translateY(${offset * 0.5}px)`
          }}
        />
      ))}
      
      <div className="relative container mx-auto px-4 min-h-[100dvh] flex flex-col justify-between pb-28 sm:pb-32 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16 pt-20 sm:pt-0">
          <div 
            style={{ transform: isMobile ? 'none' : `translateY(-${offset * 0.2}px)` }}
            className="w-full lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left"
          >
            {slides.map((slide, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 ease-in-out ${
                  currentSlide === index 
                    ? 'opacity-100 transform-none relative' 
                    : 'opacity-0 -translate-x-10 absolute inset-0'
                }`}
              >
                <span className="inline-block bg-trocly-accent text-trocly-red px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  Summer Collection 2025
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-trocly-dark leading-tight mb-4 sm:mb-6">
                  {slide.title}
                </h1>
                <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Link 
                    to={slide.cta}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-trocly-red text-white rounded-full font-medium hover:bg-opacity-90 transition-colors text-base sm:text-lg"
                  >
                    {slide.ctaText}
                  </Link>
                  <Link 
                    to="/deals"
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-trocly-red text-trocly-red rounded-full font-medium hover:bg-trocly-red hover:text-white transition-colors text-base sm:text-lg"
                  >
                    Today's Deals
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {!isMobile && (
            <div className="w-full lg:w-1/2 relative h-[40vh] sm:h-[50vh] lg:h-[60vh]">
              {slides.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{
                    transform: `translateY(${offset * 0.1}px)`
                  }}
                >
                  <img 
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Hide carousel indicators on mobile */}
        {!isMobile && (
          <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-12 bg-trocly-red' : 'w-3 bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <div className="container mx-auto">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-trocly-accent p-2 sm:p-3 rounded-full shrink-0">
                    <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-trocly-red" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold">Free Shipping</p>
                    <p className="text-xs text-gray-500">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-trocly-accent p-2 sm:p-3 rounded-full shrink-0">
                    <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-trocly-red" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold">Secure Payment</p>
                    <p className="text-xs text-gray-500">100% secure</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-trocly-accent p-2 sm:p-3 rounded-full shrink-0">
                    <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-trocly-red" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold">Huge Selection</p>
                    <p className="text-xs text-gray-500">All categories</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-trocly-accent p-2 sm:p-3 rounded-full shrink-0">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-trocly-red" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold">24/7 Support</p>
                    <p className="text-xs text-gray-500">Always here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
