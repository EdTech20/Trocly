import React from "react";
import { clothingProducts } from "@/components/data/clothing_data";  // Import the data

const ClothingPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Clothing</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {clothingProducts.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="mt-1 text-trocly-red font-medium">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClothingPage;
