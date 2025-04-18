
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  role: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emma Johnson",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    role: "Verified Buyer",
    text: "I've been shopping with Trocly for years and have never been disappointed. Their customer service is exceptional and the products are always high quality. Highly recommend!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    role: "Verified Buyer",
    text: "Trocly offers a great selection of fashion items at reasonable prices. The shipping is fast and the return process is hassle-free. Will definitely shop here again!",
    rating: 4
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    role: "Verified Buyer",
    text: "The quality of the clothes I ordered exceeded my expectations. The fit was perfect and the fabric is so comfortable. I'm very satisfied with my purchase!",
    rating: 5
  },
  {
    id: 4,
    name: "Lucas Martin",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    role: "Verified Buyer",
    text: "Great experience shopping at Trocly. The website is easy to navigate, checkout process is smooth, and I received my order earlier than expected.",
    rating: 4
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Handle pagination
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const handlePaginationClick = (index: number) => {
    setActiveIndex(index);
  };
  
  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, activeIndex]);
  
  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <section 
      className="py-16 bg-gradient-to-b from-gray-50 to-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it – hear from our satisfied customers about their shopping experience with Trocly.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Slider */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full px-4"
                >
                  <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                    {/* Rating */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <p className="text-gray-700 italic mb-8 text-lg">"{testimonial.text}"</p>
                    
                    {/* Customer Info */}
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="rounded-full w-12 h-12 object-cover"
                      />
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white rounded-full p-2 shadow-md hover:bg-trocly-accent transition-colors z-10"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          
          <button 
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white rounded-full p-2 shadow-md hover:bg-trocly-accent transition-colors z-10"
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                activeIndex === index ? 'bg-trocly-red' : 'bg-gray-300 hover:bg-trocly-accent'
              }`}
              onClick={() => handlePaginationClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
