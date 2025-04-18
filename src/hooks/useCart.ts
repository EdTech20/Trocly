import { useEffect, useState } from "react";

export const useCart = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCart(); // on mount
    window.addEventListener("cartUpdated", updateCart);
    
    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  return { cartCount };
};
