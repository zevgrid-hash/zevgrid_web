// import { useState } from "react";
// import { CheckCircle2, XCircle, EyeOff } from "lucide-react";
// import { Button } from "../../components/ui/button";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import StatusBadge from "../../components/StatusBadge";
// import { VEHICLES } from "../../data/mockData";
// import { toast } from "sonner";

// export default function VehicleApprovals() {
//   const [list, setList] = useState(VEHICLES);
//   const [tab, setTab] = useState("pending");

//   const filtered = tab === "all" ? list : list.filter((v) => v.status === tab);

//   const act = (id, status) => {
//     setList((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
//     toast.success(`Listing ${status}`);
//   };

//   return (
//     <div data-testid="vehicle-approvals-page" className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
//       <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">Listing moderation</p>
//       <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Vehicle approvals</h1>

//       <Tabs value={tab} onValueChange={setTab} className="mt-5">
//         <TabsList data-testid="vehicle-approvals-tabs">
//           <TabsTrigger value="pending">Pending</TabsTrigger>
//           <TabsTrigger value="live">Live</TabsTrigger>
//           <TabsTrigger value="draft">Draft</TabsTrigger>
//           <TabsTrigger value="all">All</TabsTrigger>
//         </TabsList>
//       </Tabs>

//       <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
//         {filtered.map((v) => (
//           <div key={v.id} data-testid={`approval-${v.id}`} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
//             <div className="flex">
//               <img src={v.image} alt="" className="h-32 w-32 object-cover" />
//               <div className="flex-1 p-4">
//                 <div className="flex items-start justify-between gap-2">
//                   <div>
//                     <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{v.brand}</p>
//                     <h3 className="font-display text-base font-bold">{v.model}</h3>
//                   </div>
//                   <StatusBadge status={v.status} />
//                 </div>
//                 <p className="mt-1 text-xs text-slate-500">{v.type} · {v.quantity} units · {v.photos} photos</p>
//                 <p className="mt-2 font-display text-lg font-bold text-emerald-700">₹{v.monthlyRent.toLocaleString("en-IN")}<span className="text-xs font-medium text-slate-500">/mo</span></p>
//               </div>
//             </div>
//             <div className="border-t border-slate-100 px-4 py-3 text-xs text-slate-600">
//               <p><span className="font-semibold">Battery:</span> {v.batteryCapacity} · <span className="font-semibold">Range:</span> {v.claimedRange}km · <span className="font-semibold">Reg:</span> {v.registration}</p>
//               <p className="mt-1 line-clamp-2">{v.notes}</p>
//             </div>
//             {v.status === "pending" && (
//               <div className="flex gap-2 border-t border-slate-100 p-3">
//                 <Button data-testid={`approve-${v.id}`} onClick={() => act(v.id, "live")} size="sm" className="flex-1 bg-emerald-700 text-white hover:bg-emerald-800">
//                   <CheckCircle2 className="mr-1 h-4 w-4" /> Publish
//                 </Button>
//                 <Button data-testid={`reject-${v.id}`} onClick={() => act(v.id, "inactive")} size="sm" variant="outline" className="flex-1 border-rose-300 text-rose-700 hover:bg-rose-50">
//                   <XCircle className="mr-1 h-4 w-4" /> Reject
//                 </Button>
//               </div>
//             )}
//             {v.status === "live" && (
//               <div className="flex gap-2 border-t border-slate-100 p-3">
//                 <Button data-testid={`hide-${v.id}`} onClick={() => act(v.id, "inactive")} size="sm" variant="outline" className="flex-1 border-slate-300">
//                   <EyeOff className="mr-1 h-4 w-4" /> Hide listing
//                 </Button>
//               </div>
//             )}
//           </div>
//         ))}
//         {filtered.length === 0 && (
//           <div className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
//             No listings in this tab.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { CheckCircle2, XCircle, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "../../components/StatusBadge";
import { VEHICLES } from "../../data/mockData";
import { toast } from "sonner";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
  CRITICAL_RED,
} from "../../app/assets/constants/zevgrid-colors";

export default function VehicleApprovals() {
  const [list, setList] = useState(VEHICLES);
  const [tab, setTab] = useState("pending");

  const filtered = tab === "all" ? list : list.filter((v) => v.status === tab);

  const act = (id, status) => {
    setList((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
    toast.success(`Listing ${status}`);
  };

  const tabItems = ["pending", "live", "draft", "all"];

  return (
    <div
      data-testid="vehicle-approvals-page"
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
      <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: ELECTRIC_CYAN }}>
        Listing moderation
      </p>
      <h1 style={{ marginTop: "0.25rem", fontSize: "1.75rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
        Vehicle approvals
      </h1>

      {/* Tabs */}
      <div style={{ marginTop: "1.25rem" }}>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList
            data-testid="vehicle-approvals-tabs"
            style={{
              backgroundColor: `${ENTERPRISE_CHARCOAL}14`,
              borderRadius: "0.5rem",
              padding: "0.25rem",
              display: "inline-flex",
              gap: "0.25rem",
            }}
          >
            {tabItems.map((t) => (
              <TabsTrigger
                key={t}
                value={t}
                style={{
                  borderRadius: "0.375rem",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  padding: "0.375rem 0.875rem",
                  transition: "all 0.15s ease",
                  ...(tab === t
                    ? { backgroundColor: ELECTRIC_CYAN, color: ENTERPRISE_CHARCOAL, boxShadow: `0 2px 8px ${ELECTRIC_CYAN}44` }
                    : { backgroundColor: "transparent", color: "#64748B" }),
                }}
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Cards grid */}
      <div
        style={{
          marginTop: "1.25rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "1rem",
        }}
      >
        {filtered.map((v) => (
          <div
            key={v.id}
            data-testid={`approval-${v.id}`}
            style={{
              overflow: "hidden",
              borderRadius: "0.75rem",
              border: "1px solid #E2E8F0",
              backgroundColor: CLEAN_WHITE,
            }}
          >
            {/* Image + info row */}
            <div style={{ display: "flex" }}>
              <img src={v.image} alt="" style={{ height: "8rem", width: "8rem", objectFit: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1, padding: "1rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                  <div>
                    <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94A3B8" }}>
                      {v.brand}
                    </p>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>{v.model}</h3>
                  </div>
                  <StatusBadge status={v.status} />
                </div>
                <p style={{ marginTop: "0.25rem", fontSize: "0.75rem", color: "#64748B" }}>
                  {v.type} · {v.quantity} units · {v.photos} photos
                </p>
                <p style={{ marginTop: "0.5rem", fontSize: "1.125rem", fontWeight: 700, color: ACTIVE_EMERALD }}>
                  ₹{v.monthlyRent.toLocaleString("en-IN")}
                  <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#94A3B8" }}>/mo</span>
                </p>
              </div>
            </div>

            {/* Details strip */}
            <div
              style={{
                borderTop: `1px solid ${ELECTRIC_CYAN}1A`,
                padding: "0.75rem 1rem",
                fontSize: "0.75rem",
                color: "#475569",
                backgroundColor: LIGHT_CANVAS_GREY,
              }}
            >
              <p>
                <span style={{ fontWeight: 600 }}>Battery:</span> {v.batteryCapacity} ·{" "}
                <span style={{ fontWeight: 600 }}>Range:</span> {v.claimedRange}km ·{" "}
                <span style={{ fontWeight: 600 }}>Reg:</span> {v.registration}
              </p>
              <p style={{ marginTop: "0.25rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                {v.notes}
              </p>
            </div>

            {/* Pending actions */}
            {v.status === "pending" && (
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  borderTop: "1px solid #F1F5F9",
                  padding: "0.75rem",
                }}
              >
                <Button
                  data-testid={`approve-${v.id}`}
                  onClick={() => act(v.id, "live")}
                  size="sm"
                  style={{
                    flex: 1,
                    backgroundColor: ACTIVE_EMERALD,
                    color: CLEAN_WHITE,
                    border: "none",
                    fontWeight: 700,
                    borderRadius: "0.5rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.25rem",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <CheckCircle2 style={{ height: "1rem", width: "1rem" }} /> Publish
                </Button>
                <Button
                  data-testid={`reject-${v.id}`}
                  onClick={() => act(v.id, "inactive")}
                  size="sm"
                  variant="outline"
                  style={{
                    flex: 1,
                    border: `1px solid ${CRITICAL_RED}55`,
                    color: CRITICAL_RED,
                    backgroundColor: "transparent",
                    fontWeight: 700,
                    borderRadius: "0.5rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.25rem",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${CRITICAL_RED}0D`)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <XCircle style={{ height: "1rem", width: "1rem" }} /> Reject
                </Button>
              </div>
            )}

            {/* Live actions */}
            {v.status === "live" && (
              <div style={{ display: "flex", gap: "0.5rem", borderTop: "1px solid #F1F5F9", padding: "0.75rem" }}>
                <Button
                  data-testid={`hide-${v.id}`}
                  onClick={() => act(v.id, "inactive")}
                  size="sm"
                  variant="outline"
                  style={{
                    flex: 1,
                    border: "1px solid #E2E8F0",
                    color: "#64748B",
                    backgroundColor: "transparent",
                    fontWeight: 600,
                    borderRadius: "0.5rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.25rem",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = ENTERPRISE_CHARCOAL)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
                >
                  <EyeOff style={{ height: "1rem", width: "1rem" }} /> Hide listing
                </Button>
              </div>
            )}
          </div>
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            style={{
              gridColumn: "1 / -1",
              borderRadius: "0.75rem",
              border: `1px dashed ${ELECTRIC_CYAN}44`,
              backgroundColor: CLEAN_WHITE,
              padding: "2.5rem",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#94A3B8",
            }}
          >
            No listings in this tab.
          </div>
        )}
      </div>
    </div>
  );
}