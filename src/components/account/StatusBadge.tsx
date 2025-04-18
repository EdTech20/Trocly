
import { OrderType } from "@/types/account";

interface StatusBadgeProps {
  status: OrderType['status'];
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let bgColor = "";
  let textColor = "";
  
  switch (status) {
    case "processing":
      bgColor = "bg-blue-100";
      textColor = "text-blue-700";
      break;
    case "shipped":
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-700";
      break;
    case "delivered":
      bgColor = "bg-green-100";
      textColor = "text-green-700";
      break;
    case "cancelled":
      bgColor = "bg-red-100";
      textColor = "text-red-700";
      break;
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
