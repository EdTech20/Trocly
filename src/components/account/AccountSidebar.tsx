import { Link } from "react-router-dom";
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
  return (
    <aside className="md:w-64 shrink-0">
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
            className="w-full flex items-center px-4 py-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
            onClick={() => setActiveTab("wishlist")}
          >
            <Heart className="h-5 w-5 mr-3" />
            Wishlist
          </button>

          <button
            className="w-full flex items-center px-4 py-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 mt-4"
            onClick={onLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default AccountSidebar;
