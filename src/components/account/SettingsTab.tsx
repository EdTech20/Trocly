import { useToast } from "@/components/ui/use-toast";

type NotificationSettings = {
  orderUpdates: boolean;
  promotions: boolean;
  newArrivals: boolean;
  priceDrops: boolean;
};

interface SettingsTabProps {
  notificationSettings: NotificationSettings;
  handleToggleNotification: (setting: keyof NotificationSettings) => void;
}

const SettingsTab = ({ notificationSettings, handleToggleNotification }: SettingsTabProps) => {
  const { toast } = useToast();

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h4 className="font-medium mb-4">Notification Preferences</h4>
        
        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">
                  {key === "orderUpdates" 
                    ? "Order Updates" 
                    : key === "promotions" 
                      ? "Promotions & Offers" 
                      : key === "newArrivals" 
                        ? "New Arrivals" 
                        : "Price Drops"}
                </p>
                <p className="text-sm text-gray-500">
                  {key === "orderUpdates" 
                    ? "Receive updates about your orders" 
                    : key === "promotions" 
                      ? "Get notified about sales and special offers" 
                      : key === "newArrivals" 
                        ? "Be the first to know about new products" 
                        : "Get alerts when items in your wishlist drop in price"}
                </p>
              </div>
              <button 
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  value ? 'bg-trocly-red' : 'bg-gray-200'
                }`}
                onClick={() => handleToggleNotification(key as keyof NotificationSettings)}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Delete Account Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="font-medium text-red-600 mb-4">Account Deletion</h4>
        <p className="text-gray-600 mb-4">
          Deleting your account is permanent and cannot be undone. All your personal data and order history will be removed.
        </p>
        <button 
          className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          onClick={() => {
            toast({
              title: "Account Deletion",
              description: "This would initiate the account deletion process in a real implementation.",
              duration: 3000
            });
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
