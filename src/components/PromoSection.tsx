
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Percent, Truck } from "lucide-react";

const PromoSection = () => {
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [countDown, setCountDown] = useState({
    days: 2,
    hours: 15,
    minutes: 30,
    seconds: 45
  });

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
      
      // Check if section is visible
      const element = document.getElementById('promo-section');
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

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Truck className="h-10 w-10 text-trocly-red" />,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: <Percent className="h-10 w-10 text-trocly-red" />,
      title: "Special Discounts",
      description: "Save up to 50% on selected items",
    },
    {
      icon: <Clock className="h-10 w-10 text-trocly-red" />,
      title: "24/7 Support",
      description: "Get help anytime",
    }
  ];

  return (
    <section id="promo-section" className="py-16 overflow-hidden">
      {/* Main Promo Banner */}
      <div className="container mx-auto px-4 mb-16">
        <div 
          className={`relative bg-gradient-to-r from-trocly-accent to-trocly-light rounded-3xl overflow-hidden ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: `perspective(1000px) rotateX(${offset * 0.01}deg)`,
            transformOrigin: 'center center'
          }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="p-8 md:p-12 md:w-1/2 z-10">
              <span className="inline-block bg-white text-trocly-red px-4 py-1 rounded-full text-sm font-bold mb-4 animate-pulse">
                Limited Time Offer
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-trocly-dark">
                Summer Sale <br />
                <span className="text-trocly-red">Up to 70% Off</span>
              </h2>
              <p className="text-gray-700 mb-8">
                Discover amazing deals on our summer collection. Hurry up before the offers end!
              </p>
              
              {/* Countdown Timer */}
              <div className="flex space-x-4 mb-8">
                {Object.entries(countDown).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="bg-white p-2 rounded-lg shadow-md min-w-[60px]">
                      <span className="block text-2xl font-bold text-trocly-red">{value}</span>
                    </div>
                    <span className="text-xs mt-1 block capitalize">{key}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/deals" 
                className="inline-flex items-center bg-trocly-red text-white px-6 py-3 rounded-full font-medium hover:bg-trocly-dark transition-colors transform hover:scale-105 duration-300"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            
            <div className="md:w-1/2 p-4 md:p-0">
              <img 
                src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Summer Sale" 
                className="rounded-3xl hover-scale shadow-xl transform -rotate-2 md:translate-x-6 transition-transform duration-500"
                style={{ transform: `translateY(${offset * 0.05}px) rotate(-2deg)` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform ${
                isVisible ? `animate-fade-in opacity-100` : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
