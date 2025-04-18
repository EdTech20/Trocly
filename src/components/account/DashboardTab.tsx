import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Heart, MapPin, Eye, EyeOff, ChevronRight } from "lucide-react";
import { OrderType, AddressType, ProfileType } from "@/types/account";
import { TabType } from "@/pages/Account";
import { useToast } from "@/components/ui/use-toast";
import StatusBadge from "./StatusBadge";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase"; // make sure this path points to your firebase config

interface DashboardTabProps {
  profile: ProfileType;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType>>;
  orders: OrderType[];
  addresses: AddressType[];
  setActiveTab: (tab: TabType) => void;
}

const DashboardTab = ({ profile, setProfile, orders, addresses, setActiveTab }: DashboardTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password if changing
    if (profile.newPassword) {
      if (profile.newPassword !== profile.confirmPassword) {
        toast({
          title: "Password Error",
          description: "New passwords do not match.",
          variant: "destructive",
          duration: 3000
        });
        return;
      }
      
      if (profile.newPassword.length < 8) {
        toast({
          title: "Password Error",
          description: "Password must be at least 8 characters long.",
          variant: "destructive",
          duration: 3000
        });
        return;
      }
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
        duration: 3000
      });
      
      // Reset password fields
      setProfile(prev => ({
        ...prev,
        password: profile.newPassword ? "••••••••" : prev.password,
        newPassword: "",
        confirmPassword: ""
      }));
    }, 1000);
  };

  return (
    <div className="space-y-12">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center space-x-4">
            <div className="bg-trocly-red/10 p-3 rounded-full">
              <Package className="h-6 w-6 text-trocly-red" />
            </div>
            <div>
              <h4 className="text-lg font-medium">Orders</h4>
              <p className="text-2xl font-semibold mt-1">0</p>  
              <button 
                onClick={() => setActiveTab('orders')}
                className="text-trocly-red text-sm mt-2 hover:underline inline-flex items-center"
              >
                View History
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center space-x-4">
            <div className="bg-trocly-red/10 p-3 rounded-full">
              <Heart className="h-6 w-6 text-trocly-red" />
            </div>
            <div>
              <h4 className="text-lg font-medium">Wishlist</h4>
              <p className="text-2xl font-semibold mt-1">0</p>
              <Link 
                to="/wishlist"
                className="text-trocly-red text-sm mt-2 hover:underline inline-flex items-center"
              >
                View Wishlist
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center space-x-4">
            <div className="bg-trocly-red/10 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-trocly-red" />
            </div>
            <div>
              <h4 className="text-lg font-medium">Addresses</h4>
              <p className="text-2xl font-semibold mt-1">0</p>
              <button 
                onClick={() => setActiveTab('addresses')}
                className="text-trocly-red text-sm mt-2 hover:underline inline-flex items-center"
              >
                Manage
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold">Personal Information</h4>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-trocly-red text-sm hover:underline"
            >
              Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmitProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trocly-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trocly-red focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">
                  Phone
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trocly-red focus:border-transparent"
                />
              </div>
            </div>

            {/* Password Change */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Current Password
                </label>
                <input 
                  type="password"
                  value={profile.password}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trocly-red focus:border-transparent"
                  disabled
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600 mb-1">
                    New Password (optional)
                  </label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      id="newPassword" 
                      name="newPassword"
                      value={profile.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trocly-red focus:border-transparent pr-10"
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">
                    Confirm New Password
                  </label>
                  <input 
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword" 
                    name="confirmPassword"
                    value={profile.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trocly-red focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-2 bg-trocly-red text-white rounded-lg hover:bg-trocly-red/90"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 font-medium">Full Name</p>
              <p className="text-sm text-gray-800">{profile.fullName}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 font-medium">Email</p>
              <p className="text-sm text-gray-800">{profile.email}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 font-medium">Phone</p>
              <p className="text-sm text-gray-800">{profile.phone}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTab;
