
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Users, Award, Clock, Smile } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
    };
    
    window.addEventListener("scroll", handleScroll);
    window.scrollTo(0, 0);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { icon: <Users className="h-8 w-8 text-trocly-red" />, value: "2M+", label: "Happy Customers" },
    { icon: <Award className="h-8 w-8 text-trocly-red" />, value: "10+", label: "Years of Excellence" },
    { icon: <Clock className="h-8 w-8 text-trocly-red" />, value: "24/7", label: "Customer Support" },
    { icon: <Smile className="h-8 w-8 text-trocly-red" />, value: "100%", label: "Satisfaction Guarantee" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80"
    },
    {
      name: "Michael Chen",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80"
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-trocly-dark">
                  About <span className="text-trocly-red">Trocly</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  We're on a mission to make shopping easier, faster, and more enjoyable for everyone. 
                  With a curated selection of top-quality products, we bring the best of fashion, electronics, 
                  and home goods right to your doorstep.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/shop" 
                    className="btn-primary"
                  >
                    Explore Our Products
                  </Link>
                  <Link 
                    to="/contact" 
                    className="btn-secondary"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                    alt="Our Team" 
                    className="rounded-lg shadow-lg w-full h-auto object-cover"
                  />
                  <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-trocly-red rounded-lg -z-10"></div>
                  <div className="absolute -top-6 -right-6 w-40 h-40 bg-trocly-accent rounded-lg -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600">
                Trocly was founded in 2015 with a simple idea: make online shopping better. 
                We started as a small team passionate about curating quality products and 
                delivering exceptional customer experiences. Today, we've grown into a 
                loved brand serving millions across the globe.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Our journey" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="bg-trocly-red/10 p-3 rounded-full mr-4">
                      <Award className="h-6 w-6 text-trocly-red" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Quality First</h4>
                      <p className="text-gray-600">We curate only the best products that meet our strict quality standards.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-trocly-red/10 p-3 rounded-full mr-4">
                      <Users className="h-6 w-6 text-trocly-red" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Customer Obsessed</h4>
                      <p className="text-gray-600">Every decision we make starts with our customers' needs in mind.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-trocly-red/10 p-3 rounded-full mr-4">
                      <Smile className="h-6 w-6 text-trocly-red" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Make Shopping Fun</h4>
                      <p className="text-gray-600">We believe shopping should be enjoyable, not a chore.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-trocly-dark mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The talented individuals behind Trocly's success. Our diverse team brings together expertise from
                various industries to create the best shopping experience for you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-trocly-red">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/contact" className="btn-primary">
                Join Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
