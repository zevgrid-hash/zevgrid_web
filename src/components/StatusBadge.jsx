
import { cn } from "../lib/utils";
import {
  ACTIVE_EMERALD,
  WARNING_AMBER,
  CRITICAL_RED,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  ELECTRIC_CYAN,
  CLEAN_WHITE
} from "../app/assets/constants/zevgrid-colors";

const getStatusStyle = (status) => {
  const s = status?.toLowerCase();

  switch (s) {
    // Success / Active
    case "available":
    case "approved":
    case "live":
    case "converted":
      return { 
        backgroundColor: `${ACTIVE_EMERALD}1A`, 
        color: ACTIVE_EMERALD, 
        borderColor: `${ACTIVE_EMERALD}4D` 
      };

    // Warning / Pending
    case "pending":
    case "reserved":
    case "quoted":
    case "negotiation":
      return { 
        backgroundColor: `${WARNING_AMBER}1A`, 
        color: WARNING_AMBER, 
        borderColor: `${WARNING_AMBER}4D` 
      };

    // Critical / Error
    case "rejected":
    case "lost":
    case "suspended":
    case "unavailable":
      return { 
        backgroundColor: `${CRITICAL_RED}1A`, 
        color: CRITICAL_RED, 
        borderColor: `${CRITICAL_RED}4D` 
      };

    // Solid State
    case "rented":
      return { 
        backgroundColor: INFRASTRUCTURE_NAVY, 
        color: CLEAN_WHITE, 
        borderColor: INFRASTRUCTURE_NAVY 
      };

    // Info / Lead Gen
    case "new":
    case "contacted":
    case "qualified":
      return { 
        backgroundColor: `${ELECTRIC_CYAN}1A`, 
        color: INFRASTRUCTURE_NAVY, 
        borderColor: `${ELECTRIC_CYAN}80` 
      };

    // Default / Inactive
    case "draft":
    case "inactive":
    default:
      return { 
        backgroundColor: `${ENTERPRISE_CHARCOAL}1A`, 
        color: ENTERPRISE_CHARCOAL, 
        borderColor: `${ENTERPRISE_CHARCOAL}4D` 
      };
  }
};

export const StatusBadge = ({ status, className }) => {
  const style = getStatusStyle(status);

  return (
    <span
      data-testid={`status-badge-${status}`}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em]",
        className
      )}
      style={style}
    >
      {status}
    </span>
  );
};

export default StatusBadge;