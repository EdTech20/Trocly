import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
} from "lucide-react";
import { TabType } from "@/pages/Account";
import { ProfileType } from "@/types/account";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase"; // make sure this points to your initialized auth
import { useState } from "react";

interface AccountSidebarProps {
  profile: ProfileType;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onLogout: () => void;
}

const AccountSidebar = ({
  profile,
  activeTab,
  setActiveTab,
  onLogout,
}: AccountSidebarProps) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <aside className="md:w-64 shrink-0 relative">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center">
            <div className="bg-trocly-red/10 p-3 rounded-full mr-3">
              <User className="h-6 w-6 text-trocly-red" />
            </div>
            <div>
              <h3 className="font-medium">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>
        </div>

        <nav className="p-2">
          {[ 
            { key: "dashboard", label: "Dashboard", icon: <User className="h-5 w-5 mr-3" /> },
            { key: "orders", label: "Orders", icon: <Package className="h-5 w-5 mr-3" /> },
            { key: "addresses", label: "Addresses", icon: <MapPin className="h-5 w-5 mr-3" /> },
            { key: "payment", label: "Payment Methods", icon: <CreditCard className="h-5 w-5 mr-3" /> },
            { key: "settings", label: "Notification Settings", icon: <Bell className="h-5 w-5 mr-3" /> },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.key
                  ? "bg-trocly-red/10 text-trocly-red"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(tab.key as TabType)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          <button
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === "wishlist"
                ? "bg-trocly-red/10 text-trocly-red"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("wishlist")}
          >
            <Heart className="h-5 w-5 mr-3" />
            Wishlist
          </button>

          <button
            className="w-full flex items-center px-4 py-2 mt-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-md w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default AccountSidebar;
