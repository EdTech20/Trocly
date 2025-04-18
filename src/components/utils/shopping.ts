
import { Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";

// Custom event for cart/wishlist updates
const createCustomEvent = (name: string) => new Event(name);

export const addToCart = (product: Product) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingProduct = cart.find((item: Product) => item.id === product.id);
  
  if (existingProduct) {
    toast({
      title: "Already in Cart",
      description: "This item is already in your cart",
      variant: "default",
    });
    return;
  }
  
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(createCustomEvent("cartUpdated"));
  
  toast({
    title: "Added to Cart",
    description: `${product.name} has been added to your cart`,
    variant: "default",
  });
};

export const addToWishlist = (product: Product) => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const existingProduct = wishlist.find((item: Product) => item.id === product.id);
  
  if (existingProduct) {
    const newWishlist = wishlist.filter((item: Product) => item.id !== product.id);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    window.dispatchEvent(createCustomEvent("wishlistUpdated"));
    
    toast({
      title: "Removed from Wishlist",
      description: `${product.name} has been removed from your wishlist`,
      variant: "default",
    });
    return;
  }
  
  wishlist.push(product);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  window.dispatchEvent(createCustomEvent("wishlistUpdated"));
  
  toast({
    title: "Added to Wishlist",
    description: `${product.name} has been added to your wishlist`,
    variant: "default",
  });
};

export const getWishlistStatus = (productId: number): boolean => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  return wishlist.some((item: Product) => item.id === productId);
};

