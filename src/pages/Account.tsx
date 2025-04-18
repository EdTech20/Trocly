import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useToast } from "@/components/ui/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccountSidebar from "@/components/account/AccountSidebar";
import DashboardTab from "@/components/account/DashboardTab";
import OrdersTab from "@/components/account/OrdersTab";
import AddressesTab from "@/components/account/AddressesTab";
import PaymentTab from "@/components/account/PaymentTab";
import SettingsTab from "@/components/account/SettingsTab";

import { OrderType, AddressType, ProfileType } from "@/types/account";

export type TabType = "dashboard" | "orders" | "wishlist" | "addresses" | "payment" | "settings";

const Account = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data() as ProfileType);
          } else {
            toast({
              title: "Error",
              description: "User data not found.",
              variant: "destructive",
            });
            localStorage.removeItem("token");
            navigate("/auth/signup");
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load user profile.",
            variant: "destructive",
          });
          console.error(error);
        }
      } else {
        navigate("/auth/signin");
      }
    });

    return () => unsubscribe();
  }, [navigate, toast]);

  const orders: OrderType[] = [
    { id: "ORD-12345", date: "2023-06-15", total: 189.97, status: "delivered", items: 3 },
    { id: "ORD-12346", date: "2023-07-22", total: 89.99, status: "shipped", items: 1 },
    { id: "ORD-12347", date: "2023-08-10", total: 129.99, status: "processing", items: 2 },
  ];

  const [addresses, setAddresses] = useState<AddressType[]>([
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newArrivals: false,
    priceDrops: true,
  });

  const toggleDefault = (id: number) => {
    setAddresses((prev) =>
      prev.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
    toast({ title: "Default Address Updated", description: "Your default address has been updated." });
  };

  const handleToggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast({ title: "Logged Out", description: "You have been logged out." });
    navigate("/auth/signin");
  };

  useEffect(() => {
    if (activeTab === "wishlist") {
      navigate("/wishlist");
    }
  }, [activeTab, navigate]);

  const renderTabContent = () => {
    if (!profile) return <div>Loading...</div>;
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardTab
            profile={profile}
            setProfile={setProfile}
            orders={orders}
            addresses={addresses}
            setActiveTab={setActiveTab}
          />
        );
      case "orders":
        return <OrdersTab orders={orders} />;
      case "addresses":
        return <AddressesTab addresses={addresses} toggleDefault={toggleDefault} />;
      case "payment":
        return <PaymentTab />;
      case "settings":
        return (
          <SettingsTab
            notificationSettings={notificationSettings}
            handleToggleNotification={handleToggleNotification}
          />
        );
      case "wishlist":
        return null; // Navigation is handled in useEffect
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">My Account</h1>
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-trocly-red transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Account</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {profile && (
              <AccountSidebar
                profile={profile}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
              />
            )}

            <div className="flex-grow">{renderTabContent()}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
