
import { useEffect, useState } from "react";
import { MapPin, Home, Edit, Trash2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "@/lib/useAuth";

const AddressesTab = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeAddressId, setActiveAddressId] = useState<string | null>(null);
  const user = useAuth();

  // Load from Firestore and restore persisted active address
  useEffect(() => {
    if (!user?.uid) return;
    const q = query(collection(db, "users", user.uid, "address"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAddresses(results);

      // Restore or update active address as needed
      const storedActiveId = localStorage.getItem("activeAddressId");
      if (results.length === 0) {
        setActiveAddressId(null);
      } else if (
        !results.some((a: any) => a.id === activeAddressId)
      ) {
        // If active has been deleted or on first load
        if (
          storedActiveId &&
          results.some((a: any) => a.id === storedActiveId)
        ) {
          setActiveAddressId(storedActiveId);
        } else {
          setActiveAddressId(results[0].id);
        }
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  // Persist active address to localStorage
  useEffect(() => {
    if (activeAddressId) {
      localStorage.setItem("activeAddressId", activeAddressId);
    }
  }, [activeAddressId]);

  // Open modal in add or edit mode
  const handleOpenModal = (address?: any) => {
    if (address) {
      setEditingId(address.id);
      setFormData({
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        zip: address.zipcode || "",
        country: address.country || "",
      });
    } else {
      setEditingId(null);
      setFormData({ street: "", city: "", state: "", zip: "", country: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ street: "", city: "", state: "", zip: "", country: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Add or edit address logic and toast
  const handleAddOrEditAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.uid) return;

    try {
      if (editingId) {
        // EDIT
        const ref = doc(db, "users", user.uid, "address", editingId);
        await updateDoc(ref, {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zip,
          country: formData.country,
          updatedAt: new Date(),
        });
        toast({
          title: "Address Updated",
          description: "Address information updated.",
          duration: 3000,
        });
      } else {
        // ADD
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
      }
      handleCloseModal();
    } catch (err) {
      toast({
        title: "Error",
        description: editingId
          ? "Failed to update address."
          : "Failed to add address.",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  // Delete address logic and toast
  const handleDeleteAddress = async (id: string) => {
    if (!user?.uid) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (!confirmDelete) return;
    try {
      const ref = doc(db, "users", user.uid, "address", id);
      await deleteDoc(ref);
      toast({
        title: "Address Deleted",
        description: "The address has been deleted.",
        duration: 3000,
      });
      // If deleting active address, switch to another
      if (activeAddressId === id) {
        const next = addresses.filter((a) => a.id !== id);
        setActiveAddressId(next.length > 0 ? next[0].id : null);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete address.",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  // Responsive address tile grid and modal form
  return (
    <div className="px-1 sm:px-3 max-w-2xl mx-auto w-full">
      <h3 className="text-xl sm:text-2xl font-semibold mb-5 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-trocly-red" /> My Addresses
      </h3>

      {/* LIST OF ADDRESSES - click to set active */}
      {addresses.length > 0 && (
        <div className="grid gap-3 mb-5 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 w-full">
          {addresses.map((address: any) => (
            <div
              key={address.id}
              className={`relative bg-white p-3 xs:p-4 rounded-xl shadow flex flex-col border border-gray-200 
                transition hover:shadow-lg cursor-pointer text-left
                ${address.id === activeAddressId ? "ring-2 ring-trocly-red border-trocly-red" : ""}
              `}
              tabIndex={0}
              aria-label={
                address.id === activeAddressId
                  ? "Active address"
                  : "Click to make active"
              }
              onClick={() => setActiveAddressId(address.id)}
            >
              <div className="flex items-center mb-2 gap-2">
                <Home className="w-5 h-5 text-trocly-red flex-shrink-0" />
                <h4 className="text-base sm:text-lg font-medium truncate flex-1">
                  {address.street}, {address.city}
                </h4>
                {address.id === activeAddressId && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-trocly-red text-white text-xs rounded-md ml-2">
                    <Check className="w-4 h-4" />
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 break-all">
                {address.state}, {address.zipcode}, {address.country}
              </p>
              {/* Action icons */}
              <div className="flex mt-auto gap-2">
                <button
                  type="button"
                  className="group flex items-center justify-center rounded p-2 hover:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-trocly-red"
                  tabIndex={0}
                  aria-label="Edit address"
                  title="Edit address"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(address);
                  }}
                >
                  <Edit className="w-4 h-4 text-gray-400 group-hover:text-trocly-red" />
                </button>
                <button
                  type="button"
                  className="group flex items-center justify-center rounded p-2 hover:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  tabIndex={0}
                  aria-label="Delete address"
                  title="Delete address"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAddress(address.id);
                  }}
                >
                  <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Address CTA */}
      <div className="bg-white p-4 xs:p-6 rounded-xl shadow-sm border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center min-h-[200px] sm:min-h-[220px] mt-1 mb-2">
        <MapPin className="h-8 w-8 text-gray-300 mb-2" />
        <h4 className="font-medium mb-2">Add New Address</h4>
        <p className="text-sm text-gray-500 mb-4">
          Add a new shipping or billing address
        </p>
        <button
          className="w-full sm:w-auto px-4 py-2 bg-trocly-red text-white rounded-lg hover:bg-red-700 transition-colors focus:ring-2 focus:ring-trocly-red text-base"
          onClick={() => handleOpenModal()}
        >
          Add Address
        </button>
      </div>

      {/* Modal for ADD & EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-1 sm:px-0">
          <div className="bg-white p-3 xs:p-5 sm:p-6 rounded-xl shadow-lg w-full max-w-[98vw] max-w-md mx-auto relative animate-fade-in overflow-y-auto max-h-[98vh]">
            <button
              aria-label="Close"
              onClick={handleCloseModal}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-700 focus:ring-2 focus:ring-trocly-red rounded-full p-1"
            >
              <Trash2 className="w-4 h-4 invisible" />
              <span className="text-xl font-bold">&times;</span>
            </button>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-trocly-red" />
              {editingId ? "Edit Address" : "Add New Address"}
            </h4>

            <form onSubmit={handleAddOrEditAddress} className="space-y-3">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    id="street"
                    required
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-trocly-red text-base"
                    placeholder="Enter street address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-trocly-red text-base"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-trocly-red text-base"
                    placeholder="Enter state"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    required
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-trocly-red text-base"
                    placeholder="Enter zip code"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-trocly-red text-base"
                    placeholder="Enter country"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end sm:space-x-4 mt-4 gap-2 sm:gap-0">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-trocly-red text-white rounded-lg hover:bg-red-700 transition-colors text-base"
                >
                  {editingId ? "Update Address" : "Add Address"}
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
