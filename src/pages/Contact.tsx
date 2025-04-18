
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Send, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon!",
        duration: 5000
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-trocly-red" />,
      title: "Our Location",
      details: ["123 Commerce Street", "San Francisco, CA 94103", "United States"],
    },
    {
      icon: <Mail className="h-6 w-6 text-trocly-red" />,
      title: "Email Us",
      details: ["support@trocly.com", "careers@trocly.com", "press@trocly.com"],
    },
    {
      icon: <Phone className="h-6 w-6 text-trocly-red" />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Mon-Fri 9am-6pm PST"],
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions, feedback, or need assistance? We're here to help! 
              Reach out to our friendly team using any of the methods below.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-center"
                >
                  <div className="inline-flex items-center justify-center p-4 bg-trocly-red/10 rounded-full mb-6">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{info.title}</h3>
                  <ul className="space-y-2">
                    {info.details.map((detail, i) => (
                      <li key={i} className="text-gray-600">{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Form */}
              <div className="lg:w-1/2">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-4">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-gray-600 mb-6">
                        Thanks for reaching out. We'll get back to you as soon as possible.
                      </p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="btn-primary"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                          </label>
                          <input 
                            type="text" 
                            id="name" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trocly-red focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Email
                          </label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trocly-red focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <select 
                          id="subject" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trocly-red focus:border-transparent"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Customer Support</option>
                          <option value="returns">Returns & Refunds</option>
                          <option value="orders">Order Status</option>
                          <option value="feedback">Feedback</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea 
                          id="message" 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trocly-red focus:border-transparent"
                        ></textarea>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="btn-primary flex items-center justify-center w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Send className="h-5 w-5 mr-2" />
                            Send Message
                          </span>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
              
              {/* Map */}
              <div className="lg:w-1/2">
                <div className="h-full rounded-lg overflow-hidden shadow-md">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.95897586487!2d-122.43149684086496!3d37.76819273309972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, minHeight: "450px" }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Trocly Store Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find quick answers to common questions about our services, shipping, returns, and more.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {[
                  {
                    question: "How can I track my order?",
                    answer: "Once your order ships, you'll receive a tracking number via email. You can also view order status by logging into your account and visiting the order history section."
                  },
                  {
                    question: "What is your return policy?",
                    answer: "We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some exclusions apply for hygiene reasons."
                  },
                  {
                    question: "Do you ship internationally?",
                    answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location."
                  },
                  {
                    question: "How can I change or cancel my order?",
                    answer: "You can request changes or cancellations within 1 hour of placing your order by contacting our customer service team. Once an order begins processing, it cannot be modified."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <p className="text-gray-600 mb-4">
                  Still have questions? Our customer support team is ready to assist you.
                </p>
                <Link to="/shop" className="btn-primary">
                  Browse Our Products
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
