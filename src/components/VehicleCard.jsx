// import { Link } from "react-router-dom";
// import { Battery, MapPin, Zap, Calendar } from "lucide-react";
// import StatusBadge from "../components/StatusBadge";

// export const VehicleCard = ({ vehicle }) => {
//   return (
//     <Link
//       to={`/vehicle/${vehicle.id}`}
//       data-testid={`vehicle-card-${vehicle.id}`}
//       className="group block overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
//     >
//       <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
//         <img
//           src={vehicle.image}
//           alt={`${vehicle.brand} ${vehicle.model}`}
//           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//         <div className="absolute left-3 top-3">
//           <StatusBadge status={vehicle.availability} />
//         </div>
//         <div className="absolute right-3 top-3 rounded-md bg-slate-900/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
//           {vehicle.type}
//         </div>
//       </div>
//       <div className="p-4">
//         <div className="flex items-start justify-between gap-2">
//           <div>
//             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
//               {vehicle.brand}
//             </p>
//             <h3 className="font-display text-lg font-bold leading-tight text-slate-900">
//               {vehicle.model}
//             </h3>
//           </div>
//           <div className="text-right">
//             <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
//               starting
//             </p>
//             <p className="font-display text-xl font-bold text-emerald-700">
//               ₹{vehicle.monthlyRent.toLocaleString("en-IN")}
//             </p>
//             <p className="text-[10px] font-semibold text-slate-400">/month</p>
//           </div>
//         </div>

//         <div className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
//           <div className="flex items-center gap-1.5 text-xs text-slate-600">
//             <Zap className="h-3.5 w-3.5 text-emerald-700" />
//             <span className="font-semibold">{vehicle.claimedRange}km</span>
//           </div>
//           <div className="flex items-center gap-1.5 text-xs text-slate-600">
//             <Battery className="h-3.5 w-3.5 text-emerald-700" />
//             <span className="font-semibold">{vehicle.batteryCapacity}</span>
//           </div>
//           <div className="flex items-center gap-1.5 text-xs text-slate-600">
//             <Calendar className="h-3.5 w-3.5 text-emerald-700" />
//             <span className="font-semibold">{vehicle.minTenure}mo</span>
//           </div>
//         </div>

//         <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
//           <MapPin className="h-3.5 w-3.5" />
//           <span>{vehicle.city}</span>
//           <span className="mx-1">·</span>
//           <span className="capitalize">{vehicle.condition}</span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default VehicleCard;
import { useState } from "react";
import { Link } from "react-router-dom";
import { Battery, MapPin, Zap, Calendar } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../app/assets/constants/zevgrid-colors";


// ─── Style tokens ─────────────────────────────────────────────────────────────

const cardStyles = {
  card: {
    base: {
      display: "block",
      overflow: "hidden",
      borderRadius: "12px",
      border: `1px solid ${LIGHT_CANVAS_GREY}`,
      backgroundColor: CLEAN_WHITE,
      textDecoration: "none",
      transition: "transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
    },
    hover: {
      transform: "translateY(-4px)",
      borderColor: `${ELECTRIC_CYAN}55`,
      boxShadow: `0 8px 24px ${INFRASTRUCTURE_NAVY}18, 0 2px 6px ${INFRASTRUCTURE_NAVY}0f`,
    },
  },
  imageWrapper: {
    position: "relative",
    aspectRatio: "4/3",
    overflow: "hidden",
    backgroundColor: LIGHT_CANVAS_GREY,
  },
  typeBadge: {
    backgroundColor: `${INFRASTRUCTURE_NAVY}e6`,
    color: ELECTRIC_CYAN,
    borderRadius: "6px",
    padding: "3px 8px",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    backdropFilter: "blur(6px)",
  },
  brandLabel: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: `${ENTERPRISE_CHARCOAL}66`,
  },
  modelName: {
    fontSize: "1.0625rem",
    fontWeight: 700,
    lineHeight: 1.2,
    color: INFRASTRUCTURE_NAVY,
    letterSpacing: "-0.01em",
  },
  priceLabel: {
    fontSize: "10px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: `${ENTERPRISE_CHARCOAL}66`,
  },
  priceAmount: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: ELECTRIC_CYAN,
    letterSpacing: "-0.02em",
  },
  priceUnit: {
    fontSize: "10px",
    fontWeight: 600,
    color: `${ENTERPRISE_CHARCOAL}55`,
  },
  statsDivider: {
    borderTop: `1px solid ${LIGHT_CANVAS_GREY}`,
    marginTop: "12px",
    paddingTop: "12px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
    fontWeight: 600,
    color: ENTERPRISE_CHARCOAL,
  },
  statIcon: {
    color: ELECTRIC_CYAN,
    width: "14px",
    height: "14px",
    flexShrink: 0,
  },
  locationRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    color: `${ENTERPRISE_CHARCOAL}80`,
    marginTop: "8px",
  },
  dot: {
    margin: "0 3px",
    color: `${ENTERPRISE_CHARCOAL}40`,
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export const VehicleCard = ({ vehicle }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/vehicle/${vehicle.id}`}
      data-testid={`vehicle-card-${vehicle.id}`}
      style={{
        ...cardStyles.card.base,
        ...(hovered ? cardStyles.card.hover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={cardStyles.imageWrapper}>
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="h-full w-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
        {/* Status badge — top left */}
        <div style={{ position: "absolute", top: "12px", left: "12px" }}>
          <StatusBadge status={vehicle.availability} />
        </div>
        {/* Type badge — top right */}
        <div style={{ position: "absolute", top: "12px", right: "12px" }}>
          <span style={cardStyles.typeBadge}>{vehicle.type}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px" }}>

        {/* Brand / model + price */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
          <div>
            <p style={cardStyles.brandLabel}>{vehicle.brand}</p>
            <h3 style={cardStyles.modelName}>{vehicle.model}</h3>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={cardStyles.priceLabel}>starting</p>
            <p style={cardStyles.priceAmount}>
              ₹{vehicle.monthlyRent.toLocaleString("en-IN")}
            </p>
            <p style={cardStyles.priceUnit}>/month</p>
          </div>
        </div>

        {/* Stats row */}
        <div style={cardStyles.statsDivider}>
          <div style={cardStyles.statItem}>
            <Zap style={cardStyles.statIcon} />
            <span>{vehicle.claimedRange}km</span>
          </div>
          <div style={cardStyles.statItem}>
            <Battery style={cardStyles.statIcon} />
            <span>{vehicle.batteryCapacity}</span>
          </div>
          <div style={cardStyles.statItem}>
            <Calendar style={cardStyles.statIcon} />
            <span>{vehicle.minTenure}mo</span>
          </div>
        </div>

        {/* Location */}
        <div style={cardStyles.locationRow}>
          <MapPin style={{ width: "13px", height: "13px", flexShrink: 0 }} />
          <span>{vehicle.city}</span>
          <span style={cardStyles.dot}>·</span>
          <span style={{ textTransform: "capitalize" }}>{vehicle.condition}</span>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;