
import { useState, useEffect } from "react";
import { Instagram } from "lucide-react";

interface InstaPost {
  id: number;
  image: string;
  likes: number;
  username: string;
}

const instaPosts: InstaPost[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    likes: 234,
    username: "fashion_lover"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    likes: 187,
    username: "style_queen"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    likes: 345,
    username: "trendy_outfits"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1538329972958-465d6d2144ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    likes: 276,
    username: "fashion_addict"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    likes: 198,
    username: "glamour_style"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1566208541749-eb4e1bb7fd21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    likes: 289,
    username: "fashion_forward"
  }
];

const InstagramFeed = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('instagram-section');
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

  return (
    <section id="instagram-section" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Instagram className="h-6 w-6 text-trocly-red mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold">Instagram</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow us <span className="text-trocly-red font-medium">@trocly</span> on Instagram and tag your photos with #TroclyStyle to be featured
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {instaPosts.map((post, index) => (
            <a 
              key={post.id} 
              href="#"
              className={`relative overflow-hidden aspect-square rounded-lg group ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img 
                src={post.image} 
                alt={`Instagram post by ${post.username}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              {/* Overlay on hover */}
              <div className={`absolute inset-0 bg-trocly-dark/70 flex flex-col items-center justify-center text-white transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}>
                <p className="font-medium mb-1">@{post.username}</p>
                <div className="flex items-center">
                  <span className="mr-1">❤️</span>
                  <span>{post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a 
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-trocly-red font-medium hover:text-trocly-dark transition-colors"
          >
            <Instagram className="h-5 w-5 mr-2" />
            Follow us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
