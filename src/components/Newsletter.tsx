
import { useState } from "react";
import { Send, Check } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setIsError(true);
      return;
    }
    
    // Mock successful submission
    setIsError(false);
    setIsSubmitted(true);
    setEmail("");
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="py-16 bg-trocly-light">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter and be the first to know about new collections, exclusive offers, and fashion tips.
          </p>
          
          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="relative flex-grow">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsError(false);
                }}
                className={`input-field w-full pl-4 pr-10 py-3 ${
                  isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
              />
              <Send className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              
              {/* Error message */}
              {isError && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  Please enter a valid email address
                </p>
              )}
            </div>
            
            <button 
              type="submit" 
              className={`btn-primary min-w-[120px] relative overflow-hidden flex items-center justify-center ${
                isSubmitted ? 'bg-green-500 hover:bg-green-600' : ''
              }`}
            >
              {isSubmitted ? (
                <>
                  <span className="flex items-center">
                    <Check className="h-5 w-5 mr-1" />
                    Subscribed
                  </span>
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
          
          <p className="text-gray-500 text-sm mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive marketing emails.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
