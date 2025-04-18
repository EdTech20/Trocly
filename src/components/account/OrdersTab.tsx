import { Link } from "react-router-dom";
import { Package, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const OrdersTab = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Order History</h3>

      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <div className="inline-flex items-center justify-center p-6 bg-gray-100 rounded-full mb-6">
          <Package className="h-12 w-12 text-gray-400" />
        </div>
        <h4 className="text-xl font-semibold mb-2">No Order History</h4>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          You don't have any order history at the moment. Start shopping and make your first purchase today!
        </p>
        <Link to="/shop" className="btn-primary">
          Start Shopping
        </Link>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
        <h4 className="font-medium mb-4">Need Assistance?</h4>
        <p className="text-gray-600 mb-4">
          If you have any questions or need help, feel free to contact our customer support team.
        </p>
        <Link 
          to="/contact" 
          className="text-trocly-red hover:underline inline-flex items-center"
        >
          Contact Support
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default OrdersTab;
