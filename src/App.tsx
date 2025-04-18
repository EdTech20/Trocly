
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import SignUpForm from "./pages/Signup";
// import ClothingPage from "./pages/ClothingPage";
// import ShoesPage from "./pages/ShoesPage"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Shop />} />
          <Route path="/categories/:id" element={<Shop />} />
          <Route path="/categories/electronics" element={<Shop />} />
          <Route path="/categories/fashion" element={<Shop />} />
          <Route path="/categories/vehicles" element={<Shop />} />
          <Route path="/categories/jewelry" element={<Shop />} />
          <Route path="/categories/home" element={<Shop />} />
          <Route path="/deals" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/clothCategory" element={<ClothingPage />} /> */}
          {/* <Route path="shoesCategory" element={<ShoesPage />} /> */}


        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
