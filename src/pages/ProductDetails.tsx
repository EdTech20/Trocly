import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Truck, ArrowLeft, ArrowRight, Check, ShoppingCart, Heart, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/components/data/product";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "1");
  const product = products.find(p => p.id === productId);
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "features" | "specifications">("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Related products (exclude current product)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== productId)
    .slice(0, 3);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Link to="/shop" className="text-trocly-red hover:underline">
              Return to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-trocly-red transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/shop" className="hover:text-trocly-red transition-colors">Shop</Link>
              <span className="mx-2">/</span>
              <span>{product.name}</span>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative aspect-square">
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded text-sm">
                    NEW
                  </span>
                )}
                {product.isSale && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm">
                    {discountPercentage}% OFF
                  </span>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({product.rating})</span>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-bold text-trocly-red">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-2 text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-6">{product.description}</p>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center">
                    <button 
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="p-2 border rounded-l"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 border-t border-b p-2 text-center"
                    />
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 border rounded-r"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex-1 bg-trocly-red text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3 border rounded-lg ${
                      isWishlisted ? "bg-red-50 border-trocly-red" : ""
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "text-trocly-red fill-current" : ""}`} />
                  </button>
                </div>

                {/* Product Meta */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="w-5 h-5 mr-2" />
                    Free shipping on orders over $100
                  </div>
                  {product.sku && (
                    <p className="text-sm text-gray-600 mt-2">SKU: {product.sku}</p>
                  )}
                  {product.brand && (
                    <p className="text-sm text-gray-600 mt-1">Brand: {product.brand}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="flex border-b">
              {["description", "features", "specifications"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-trocly-red text-trocly-red"
                      : "text-gray-600"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="p-6">
              {activeTab === "description" && (
                <p className="text-gray-600">{product.description}</p>
              )}
              {activeTab === "features" && product.features && (
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              )}
              {activeTab === "specifications" && product.specifications && (
                <dl className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt className="font-medium text-gray-900">{key}</dt>
                      <dd className="mt-1 text-gray-600">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
