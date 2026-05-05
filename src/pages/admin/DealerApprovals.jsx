// import { useState } from "react";
// import { CheckCircle2, XCircle, FileText } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import StatusBadge from "../../components/StatusBadge";
// import { DEALERS } from "../../data/mockData";
// import { toast } from "sonner";

// export default function DealerApprovals() {
//   const [list, setList] = useState(DEALERS);
//   const [tab, setTab] = useState("pending");

//   const filtered = tab === "all" ? list : list.filter((d) => d.status === tab);

//   const act = (id, status) => {
//     setList((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
//     toast.success(`Dealer ${status}`);
//   };

//   return (
//     <div data-testid="dealer-approvals-page" className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
//       <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">Verification queue</p>
//       <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Dealer approvals</h1>

//       <Tabs value={tab} onValueChange={setTab} className="mt-5">
//         <TabsList data-testid="dealer-approvals-tabs">
//           <TabsTrigger value="pending">Pending</TabsTrigger>
//           <TabsTrigger value="approved">Approved</TabsTrigger>
//           <TabsTrigger value="rejected">Rejected</TabsTrigger>
//           <TabsTrigger value="all">All</TabsTrigger>
//         </TabsList>
//       </Tabs>

//       <div className="mt-5 space-y-3">
//         {filtered.map((d) => (
//           <div key={d.id} data-testid={`dealer-row-${d.id}`} className="rounded-xl border border-slate-200 bg-white p-5">
//             <div className="flex flex-wrap items-start justify-between gap-3">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h3 className="font-display text-lg font-bold">{d.dealership}</h3>
//                   <StatusBadge status={d.status} />
//                 </div>
//                 <p className="mt-1 text-sm text-slate-600">{d.contact} · {d.mobile} · {d.email}</p>
//                 <p className="mt-0.5 text-xs text-slate-500">{d.address}</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Joined</p>
//                 <p className="text-sm font-semibold">{d.joinedOn}</p>
//               </div>
//             </div>

//             <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
//               <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
//                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">GST</p>
//                 <p className="mt-1 font-mono text-xs font-semibold">{d.gst}</p>
//               </div>
//               <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
//                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">PAN</p>
//                 <p className="mt-1 font-mono text-xs font-semibold">{d.pan}</p>
//               </div>
//               <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
//                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">City</p>
//                 <p className="mt-1 text-sm font-semibold">{d.city}</p>
//               </div>
//             </div>

//             <div className="mt-4">
//               <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Documents uploaded ({d.docs.length})</p>
//               <div className="mt-2 flex flex-wrap gap-2">
//                 {d.docs.map((doc) => (
//                   <span key={doc} className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold">
//                     <FileText className="h-3 w-3 text-slate-500" /> {doc}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {d.status === "pending" && (
//               <div className="mt-5 flex flex-wrap gap-2">
//                 <Button
//                   data-testid={`dealer-approve-${d.id}`}
//                   onClick={() => act(d.id, "approved")}
//                   className="bg-emerald-700 text-white hover:bg-emerald-800"
//                 >
//                   <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
//                 </Button>
//                 <Button
//                   data-testid={`dealer-reject-${d.id}`}
//                   onClick={() => act(d.id, "rejected")}
//                   variant="outline"
//                   className="border-rose-300 text-rose-700 hover:bg-rose-50"
//                 >
//                   <XCircle className="mr-2 h-4 w-4" /> Reject
//                 </Button>
//               </div>
//             )}

//             {d.status === "approved" && (
//               <div className="mt-5">
//                 <Button
//                   data-testid={`dealer-suspend-${d.id}`}
//                   onClick={() => act(d.id, "suspended")}
//                   variant="outline"
//                   className="border-slate-300"
//                 >
//                   Suspend
//                 </Button>
//               </div>
//             )}
//           </div>
//         ))}
//         {filtered.length === 0 && (
//           <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
//             No dealers in this tab.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { CheckCircle2, XCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "../../components/StatusBadge";
import { DEALERS } from "../../data/mockData";
import { toast } from "sonner";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
  CRITICAL_RED,
} from "../../app/assets/constants/zevgrid-colors";

export default function DealerApprovals() {
  const [list, setList] = useState(DEALERS);
  const [tab, setTab] = useState("pending");

  const filtered = tab === "all" ? list : list.filter((d) => d.status === tab);

  const act = (id, status) => {
    setList((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
    toast.success(`Dealer ${status}`);
  };

  const tabItems = ["pending", "approved", "rejected", "all"];

  return (
    <div
      data-testid="dealer-approvals-page"
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
      <p
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: ELECTRIC_CYAN,
        }}
      >
        Verification queue
      </p>
      <h1
        style={{
          marginTop: "0.25rem",
          fontSize: "1.75rem",
          fontWeight: 700,
          color: ENTERPRISE_CHARCOAL,
        }}
      >
        Dealer approvals
      </h1>

      {/* Tabs — override shadcn with inline styles via a wrapper */}
      <div style={{ marginTop: "1.25rem" }}>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList
            data-testid="dealer-approvals-tabs"
            style={{
              backgroundColor: `${ENTERPRISE_CHARCOAL}14`,
              borderRadius: "0.5rem",
              padding: "0.25rem",
              gap: "0.25rem",
              display: "inline-flex",
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
                    ? {
                        backgroundColor: ELECTRIC_CYAN,
                        color: ENTERPRISE_CHARCOAL,
                        boxShadow: `0 2px 8px ${ELECTRIC_CYAN}44`,
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "#64748B",
                      }),
                }}
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Dealer list */}
      <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtered.map((d) => (
          <div
            key={d.id}
            data-testid={`dealer-row-${d.id}`}
            style={{
              borderRadius: "0.75rem",
              border: "1px solid #E2E8F0",
              backgroundColor: CLEAN_WHITE,
              padding: "1.25rem",
            }}
          >
            {/* Top row */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>{d.dealership}</h3>
                  <StatusBadge status={d.status} />
                </div>
                <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#475569" }}>
                  {d.contact} · {d.mobile} · {d.email}
                </p>
                <p style={{ marginTop: "0.125rem", fontSize: "0.75rem", color: "#64748B" }}>{d.address}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#94A3B8",
                  }}
                >
                  Joined
                </p>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: ENTERPRISE_CHARCOAL }}>{d.joinedOn}</p>
              </div>
            </div>

            {/* Info tiles */}
            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {[
                { label: "GST", value: d.gst, mono: true },
                { label: "PAN", value: d.pan, mono: true },
                { label: "City", value: d.city, mono: false },
              ].map(({ label, value, mono }) => (
                <div
                  key={label}
                  style={{
                    borderRadius: "0.375rem",
                    border: `1px solid ${ELECTRIC_CYAN}1A`,
                    backgroundColor: LIGHT_CANVAS_GREY,
                    padding: "0.75rem",
                  }}
                >
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
                  <p
                    style={{
                      marginTop: "0.25rem",
                      fontFamily: mono ? "monospace" : "inherit",
                      fontSize: mono ? "0.75rem" : "0.875rem",
                      fontWeight: 600,
                      color: ENTERPRISE_CHARCOAL,
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Documents */}
            <div style={{ marginTop: "1rem" }}>
              <p
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#94A3B8",
                }}
              >
                Documents uploaded ({d.docs.length})
              </p>
              <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {d.docs.map((doc) => (
                  <span
                    key={doc}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      borderRadius: "0.375rem",
                      border: `1px solid ${ELECTRIC_CYAN}22`,
                      backgroundColor: CLEAN_WHITE,
                      padding: "0.25rem 0.5rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: ENTERPRISE_CHARCOAL,
                    }}
                  >
                    <FileText style={{ height: "0.75rem", width: "0.75rem", color: ELECTRIC_CYAN }} />
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* Pending actions */}
            {d.status === "pending" && (
              <div style={{ marginTop: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <Button
                  data-testid={`dealer-approve-${d.id}`}
                  onClick={() => act(d.id, "approved")}
                  style={{
                    backgroundColor: ACTIVE_EMERALD,
                    color: CLEAN_WHITE,
                    border: "none",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderRadius: "0.5rem",
                    padding: "0 1rem",
                    height: "2.25rem",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <CheckCircle2 style={{ height: "1rem", width: "1rem" }} /> Approve
                </Button>
                <Button
                  data-testid={`dealer-reject-${d.id}`}
                  onClick={() => act(d.id, "rejected")}
                  variant="outline"
                  style={{
                    border: `1px solid ${CRITICAL_RED}55`,
                    color: CRITICAL_RED,
                    backgroundColor: "transparent",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderRadius: "0.5rem",
                    padding: "0 1rem",
                    height: "2.25rem",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${CRITICAL_RED}0D`)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <XCircle style={{ height: "1rem", width: "1rem" }} /> Reject
                </Button>
              </div>
            )}

            {/* Approved actions */}
            {d.status === "approved" && (
              <div style={{ marginTop: "1.25rem" }}>
                <Button
                  data-testid={`dealer-suspend-${d.id}`}
                  onClick={() => act(d.id, "suspended")}
                  variant="outline"
                  style={{
                    border: "1px solid #E2E8F0",
                    color: "#64748B",
                    backgroundColor: "transparent",
                    fontWeight: 600,
                    cursor: "pointer",
                    borderRadius: "0.5rem",
                    padding: "0 1rem",
                    height: "2.25rem",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = ENTERPRISE_CHARCOAL)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
                >
                  Suspend
                </Button>
              </div>
            )}
          </div>
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            style={{
              borderRadius: "0.75rem",
              border: `1px dashed ${ELECTRIC_CYAN}44`,
              backgroundColor: CLEAN_WHITE,
              padding: "2.5rem",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#94A3B8",
            }}
          >
            No dealers in this tab.
          </div>
        )}
      </div>
    </div>
  );
}