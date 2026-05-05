// import { Link } from "react-router-dom";
// import { Package, Clock, Inbox, TrendingUp, ArrowRight, PlusCircle } from "lucide-react";
// import { Button } from "../../components/ui/button";
// import StatusBadge from "../../components/StatusBadge";
// import { VEHICLES, LEADS, STATS } from "../../data/mockData";

// const Stat = ({ icon: Icon, label, value, tone = "emerald" }) => (
//   <div className="rounded-xl border border-slate-200 bg-white p-4">
//     <div className="flex items-center gap-2">
//       <span className={`flex h-8 w-8 items-center justify-center rounded-md bg-${tone}-50 text-${tone}-700`}>
//         <Icon className="h-4 w-4" />
//       </span>
//       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
//     </div>
//     <p className="mt-3 font-display text-3xl font-bold">{value}</p>
//   </div>
// );

// export default function DealerDashboard() {
//   const myVehicles = VEHICLES.filter((v) => v.dealerId === "d-101");
//   const myLeads = LEADS.slice(0, 3);

//   return (
//     <div data-testid="dealer-dashboard" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div>
//           <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">Dealer dashboard</p>
//           <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Welcome back, GreenDrive</h1>
//         </div>
//         <Link to="/dealer/add-vehicle">
//           <Button data-testid="dealer-add-cta" className="bg-emerald-700 text-white hover:bg-emerald-800">
//             <PlusCircle className="mr-2 h-4 w-4" /> Add vehicle
//           </Button>
//         </Link>
//       </div>

//       <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
//         <Stat icon={Package} label="Live listings" value={STATS.dealer.liveListings} />
//         <Stat icon={Clock} label="Pending review" value={STATS.dealer.pendingListings} tone="amber" />
//         <Stat icon={Inbox} label="New inquiries" value={STATS.dealer.newInquiries} tone="blue" />
//         <Stat icon={TrendingUp} label="Converted" value={STATS.dealer.converted} />
//       </div>

//       <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
//         <section className="rounded-xl border border-slate-200 bg-white p-5">
//           <div className="flex items-center justify-between">
//             <h2 className="font-display text-lg font-bold">Your recent listings</h2>
//             <Link to="/dealer/listings" className="text-xs font-bold text-emerald-700 hover:underline" data-testid="dealer-see-listings">
//               See all →
//             </Link>
//           </div>
//           <div className="mt-4 space-y-3">
//             {myVehicles.slice(0, 4).map((v) => (
//               <div key={v.id} data-testid={`dealer-listing-${v.id}`} className="flex items-center gap-3 rounded-md border border-slate-100 p-3">
//                 <img src={v.image} alt="" className="h-14 w-14 rounded object-cover" />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-sm font-semibold">{v.brand} {v.model}</p>
//                   <p className="text-xs text-slate-500">₹{v.monthlyRent.toLocaleString("en-IN")}/mo · {v.quantity} units</p>
//                 </div>
//                 <StatusBadge status={v.status} />
//               </div>
//             ))}
//             {myVehicles.length === 0 && (
//               <p className="rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
//                 No listings yet. Add your first vehicle.
//               </p>
//             )}
//           </div>
//         </section>

//         <section className="rounded-xl border border-slate-200 bg-white p-5">
//           <div className="flex items-center justify-between">
//             <h2 className="font-display text-lg font-bold">Recent inquiries</h2>
//             <Link to="/dealer/inquiries" className="text-xs font-bold text-emerald-700 hover:underline" data-testid="dealer-see-inquiries">
//               See all →
//             </Link>
//           </div>
//           <div className="mt-4 space-y-3">
//             {myLeads.map((l) => (
//               <div key={l.id} data-testid={`dealer-lead-${l.id}`} className="rounded-md border border-slate-100 p-3">
//                 <div className="flex items-start justify-between gap-2">
//                   <div>
//                     <p className="text-sm font-semibold">{l.company}</p>
//                     <p className="text-xs text-slate-500">{l.contact} · {l.vehiclesNeeded} × {l.preferredType} · {l.budget}</p>
//                   </div>
//                   <StatusBadge status={l.stage} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>

//       <section className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
//         <div className="flex items-center justify-between gap-4">
//           <div>
//             <h3 className="font-display text-lg font-bold">Grow your fleet visibility</h3>
//             <p className="mt-1 text-sm text-slate-700">Listings with 5+ photos get 3× more inquiries.</p>
//           </div>
//           <Link to="/dealer/add-vehicle">
//             <Button data-testid="dealer-grow-cta" className="bg-emerald-700 text-white hover:bg-emerald-800">
//               Add listing <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import { Package, Clock, Inbox, TrendingUp, ArrowRight, PlusCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import StatusBadge from "../../components/StatusBadge";
import { VEHICLES, LEADS, STATS } from "../../data/mockData";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
  WARNING_AMBER,
} from "../../app/assets/constants/zevgrid-colors";

const TONE_MAP = {
  cyan:   { bg: `${ELECTRIC_CYAN}1A`,  icon: ELECTRIC_CYAN },
  amber:  { bg: `${WARNING_AMBER}1A`,  icon: WARNING_AMBER },
  blue:   { bg: "#3B82F61A",           icon: "#3B82F6" },
  emerald:{ bg: `${ACTIVE_EMERALD}1A`, icon: ACTIVE_EMERALD },
};

const Stat = ({ icon: Icon, label, value, tone = "cyan" }) => {
  const colors = TONE_MAP[tone] ?? TONE_MAP.cyan;
  return (
    <div
      style={{
        borderRadius: "0.75rem",
        border: "1px solid #E2E8F0",
        backgroundColor: CLEAN_WHITE,
        padding: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          style={{
            display: "flex",
            height: "2rem",
            width: "2rem",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0.375rem",
            backgroundColor: colors.bg,
            color: colors.icon,
          }}
        >
          <Icon style={{ height: "1rem", width: "1rem" }} />
        </span>
        <p
          style={{
            fontSize: "0.625rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#94A3B8",
          }}
        >
          {label}
        </p>
      </div>
      <p style={{ marginTop: "0.75rem", fontSize: "1.875rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
        {value}
      </p>
    </div>
  );
};

const seeAllLink = {
  fontSize: "0.75rem",
  fontWeight: 700,
  color: ELECTRIC_CYAN,
  textDecoration: "none",
};

export default function DealerDashboard() {
  const myVehicles = VEHICLES.filter((v) => v.dealerId === "d-101");
  const myLeads = LEADS.slice(0, 3);

  return (
    <div
      data-testid="dealer-dashboard"
      style={{
        margin: "0 auto",
        width: "100%",
        maxWidth: "80rem",
        padding: "1.5rem 2rem",
        backgroundColor: LIGHT_CANVAS_GREY,
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
        <div>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: ELECTRIC_CYAN }}>
            Dealer dashboard
          </p>
          <h1 style={{ marginTop: "0.25rem", fontSize: "1.75rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
            Welcome back, GreenDrive
          </h1>
        </div>
        <Link to="/dealer/add-vehicle">
          <Button
            data-testid="dealer-add-cta"
            style={{
              backgroundColor: ACTIVE_EMERALD,
              color: CLEAN_WHITE,
              border: "none",
              fontWeight: 700,
              borderRadius: "0.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              padding: "0 1rem",
              height: "2.5rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <PlusCircle style={{ height: "1rem", width: "1rem" }} /> Add vehicle
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div
        style={{
          marginTop: "1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0.75rem",
        }}
        className="md:grid-cols-4"
      >
        <Stat icon={Package}   label="Live listings"   value={STATS.dealer.liveListings}   tone="emerald" />
        <Stat icon={Clock}     label="Pending review"  value={STATS.dealer.pendingListings} tone="amber" />
        <Stat icon={Inbox}     label="New inquiries"   value={STATS.dealer.newInquiries}    tone="blue" />
        <Stat icon={TrendingUp} label="Converted"      value={STATS.dealer.converted}       tone="cyan" />
      </div>

      {/* Two-column sections */}
      <div
        style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}
        className="lg:grid-cols-2"
      >
        {/* Recent listings */}
        <section
          style={{ borderRadius: "0.75rem", border: "1px solid #E2E8F0", backgroundColor: CLEAN_WHITE, padding: "1.25rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>Your recent listings</h2>
            <Link
              to="/dealer/listings"
              style={seeAllLink}
              data-testid="dealer-see-listings"
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              See all →
            </Link>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {myVehicles.slice(0, 4).map((v) => (
              <div
                key={v.id}
                data-testid={`dealer-listing-${v.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  borderRadius: "0.375rem",
                  border: `1px solid ${ELECTRIC_CYAN}1A`,
                  padding: "0.75rem",
                }}
              >
                <img src={v.image} alt="" style={{ height: "3.5rem", width: "3.5rem", borderRadius: "0.375rem", objectFit: "cover", flexShrink: 0 }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: ENTERPRISE_CHARCOAL, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {v.brand} {v.model}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#64748B" }}>
                    ₹{v.monthlyRent.toLocaleString("en-IN")}/mo · {v.quantity} units
                  </p>
                </div>
                <StatusBadge status={v.status} />
              </div>
            ))}
            {myVehicles.length === 0 && (
              <p
                style={{
                  borderRadius: "0.375rem",
                  border: `1px dashed ${ELECTRIC_CYAN}44`,
                  padding: "1.5rem",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "#94A3B8",
                }}
              >
                No listings yet. Add your first vehicle.
              </p>
            )}
          </div>
        </section>

        {/* Recent inquiries */}
        <section
          style={{ borderRadius: "0.75rem", border: "1px solid #E2E8F0", backgroundColor: CLEAN_WHITE, padding: "1.25rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>Recent inquiries</h2>
            <Link
              to="/dealer/inquiries"
              style={seeAllLink}
              data-testid="dealer-see-inquiries"
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              See all →
            </Link>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {myLeads.map((l) => (
              <div
                key={l.id}
                data-testid={`dealer-lead-${l.id}`}
                style={{
                  borderRadius: "0.375rem",
                  border: `1px solid ${ELECTRIC_CYAN}1A`,
                  padding: "0.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: ENTERPRISE_CHARCOAL }}>{l.company}</p>
                    <p style={{ fontSize: "0.75rem", color: "#64748B" }}>
                      {l.contact} · {l.vehiclesNeeded} × {l.preferredType} · {l.budget}
                    </p>
                  </div>
                  <StatusBadge status={l.stage} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA banner */}
      <section
        style={{
          marginTop: "2rem",
          borderRadius: "0.75rem",
          border: `1px solid ${ELECTRIC_CYAN}33`,
          background: `linear-gradient(135deg, ${ELECTRIC_CYAN}12 0%, ${ACTIVE_EMERALD}0D 100%)`,
          padding: "1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
            Grow your fleet visibility
          </h3>
          <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#475569" }}>
            Listings with 5+ photos get 3× more inquiries.
          </p>
        </div>
        <Link to="/dealer/add-vehicle">
          <Button
            data-testid="dealer-grow-cta"
            style={{
              backgroundColor: ACTIVE_EMERALD,
              color: CLEAN_WHITE,
              border: "none",
              fontWeight: 700,
              borderRadius: "0.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              padding: "0 1rem",
              height: "2.5rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Add listing <ArrowRight style={{ height: "1rem", width: "1rem" }} />
          </Button>
        </Link>
      </section>
    </div>
  );
}