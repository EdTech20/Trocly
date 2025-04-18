
import { CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PaymentTab = () => {
  const { toast } = useToast();

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Payment Methods</h3>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-medium">Saved Payment Methods</h4>
          <button 
            className="text-trocly-red hover:underline text-sm"
            onClick={() => {
              toast({
                title: "Add Payment Method",
                description: "This would open a payment method form in a real implementation.",
                duration: 3000
              });
            }}
          >
            Add New
          </button>
        </div>
        
        <div className="border rounded-lg p-4 mb-4 relative">
          <span className="absolute top-4 right-4 bg-trocly-red text-white text-xs px-2 py-1 rounded-full">
            Default
          </span>
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-lg mr-4">
              <CreditCard className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <h5 className="font-medium">Visa ending in 4242</h5>
              <p className="text-sm text-gray-500">Expires 12/2026</p>
            </div>
          </div>
          <div className="flex mt-4 space-x-4">
            <button className="text-trocly-red hover:underline text-sm">
              Edit
            </button>
            <button className="text-gray-500 hover:text-trocly-red text-sm">
              Remove
            </button>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 relative">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-lg mr-4">
              <CreditCard className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <h5 className="font-medium">Mastercard ending in 5678</h5>
              <p className="text-sm text-gray-500">Expires 09/2025</p>
            </div>
          </div>
          <div className="flex mt-4 space-x-4">
            <button className="text-trocly-red hover:underline text-sm">
              Edit
            </button>
            <button className="text-gray-500 hover:text-trocly-red text-sm">
              Remove
            </button>
            <button className="text-gray-500 hover:text-trocly-red text-sm">
              Set as Default
            </button>
          </div>
        </div>
      </div>
      
      {/* Payment Security Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="font-medium mb-4">Secure Payments</h4>
        <p className="text-gray-600 mb-4">
          Your payment information is stored securely and encrypted. We use industry-standard security 
          measures to protect your sensitive data.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>We accept:</span>
          <div className="flex space-x-2">
            <div className="w-10 h-6 bg-gray-100 rounded"></div>
            <div className="w-10 h-6 bg-gray-100 rounded"></div>
            <div className="w-10 h-6 bg-gray-100 rounded"></div>
            <div className="w-10 h-6 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTab;
