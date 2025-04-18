import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Category {
  id: number;
  name: string;
  image: string;
  itemCount: number;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Clothing",
    image:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    itemCount: 0,
  },
  {
    id: 2,
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1412&q=80",
    itemCount: 0,
  },
  {
    id: 3,
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    itemCount: 64,
  },
  {
    id: 4,
    name: "Bags",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1557&q=80",
    itemCount: 0,
  },
];

const CategorySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getRoute = (name: string) => {
    if (name === "Shoes") return "/shoesCategory";
    if (name === "Clothing") return "/clothCategory";
    return null;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-600">
              Explore our wide range of products by category
            </p>
          </div>
          <Link
            to="/categories"
            className="mt-4 md:mt-0 flex items-center text-trocly-red font-medium group"
          >
            View All Categories
            <ChevronRight className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const route = getRoute(category.name);

            const content = (
              <div
                className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredIndex === index ? "scale-110" : "scale-100"
                    }`}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-85" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3
                    className={`text-xl sm:text-2xl font-bold transform transition-transform duration-300 ${
                      hoveredIndex === index ? "translate-y-0" : "translate-y-2"
                    }`}
                  >
                    {category.name}
                  </h3>
                  <p
                    className={`text-sm opacity-90 mt-1 transform transition-all duration-300 ${
                      hoveredIndex === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                  >
                    {category.itemCount} products
                  </p>
                  <div
                    className={`mt-3 transform transition-all duration-300 ${
                      hoveredIndex === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    <span className="inline-flex items-center text-sm font-medium">
                      Shop Now
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );

            return (
              <div key={category.id}>
                {route ? <Link to={route}>{content}</Link> : content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
