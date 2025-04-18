import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useAuth } from "@/lib/useAuth";

const AddressesTab = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const user = useAuth();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ street: "", city: "", state: "", zip: "", country: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.uid) return;

    try {
      const ref = collection(db, "users", user.uid, "address");
      await addDoc(ref, {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zip,
        country: formData.country,
        createdAt: new Date(),
      });

      toast({
        title: "Address Added",
        description: "Your address has been saved.",
        duration: 3000,
      });

      handleCloseModal();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add address.",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(collection(db, "users", user.uid, "address"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAddresses(results);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">My Addresses</h3>

      {/* Only show saved addresses if at least one exists */}
      {addresses.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {addresses.map((address: any) => (
            <div
              key={address.id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <h4 className="text-lg font-medium mb-2">
                {address.street}, {address.city}
              </h4>
              <p className="text-sm text-gray-600">
                {address.state}, {address.zipcode}, {address.country}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Add Address Box — Always visible */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center min-h-[220px]">
        <MapPin className="h-8 w-8 text-gray-300 mb-2" />
        <h4 className="font-medium mb-2">Add New Address</h4>
        <p className="text-sm text-gray-500 mb-4">
          Add a new shipping or billing address
        </p>
        <button
          className="px-4 py-2 bg-trocly-red text-white rounded-lg hover:bg-trocly-dark transition-colors"
          onClick={handleOpenModal}
        >
          Add Address
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
            <h4 className="text-xl font-semibold mb-4">Add New Address</h4>

            <form onSubmit={handleAddAddress} className="space-y-4">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  id="street"
                  required
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-300"
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md border-gray-300"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md border-gray-300"
                    placeholder="Enter state"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip"
                  required
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-300"
                  placeholder="Enter zip code"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-300"
                  placeholder="Enter country"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-trocly-red text-white rounded-lg hover:bg-trocly-dark transition-colors"
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressesTab;
