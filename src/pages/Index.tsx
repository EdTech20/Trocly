
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import PromoSection from "@/components/PromoSection";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import TrendingBrands from "@/components/TrendingBrands";
import InstagramFeed from "@/components/InstagramFeed";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <CategorySection />
        <PromoSection />
        <TrendingBrands />
        <Testimonials />
        <InstagramFeed />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
