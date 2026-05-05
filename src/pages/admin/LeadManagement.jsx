// import { useState } from "react";
// import { Phone, Mail, Download, Search as SearchIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import StatusBadge from "../../components/StatusBadge";
// import { LEADS, LEAD_STAGES, VEHICLES } from "../../data/mockData";
// import { toast } from "sonner";

// export default function LeadManagement() {
//   const [leads, setLeads] = useState(LEADS);
//   const [tab, setTab] = useState("all");
//   const [q, setQ] = useState("");

//   const filtered = leads.filter((l) => {
//     const matchesTab = tab === "all" || l.stage === tab;
//     const text = `${l.company} ${l.contact}`.toLowerCase();
//     return matchesTab && text.includes(q.toLowerCase());
//   });

//   const setStage = (id, stage) => {
//     setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage } : l)));
//     toast.success(`Moved to ${stage}`);
//   };

//   return (
//     <div data-testid="lead-management-page" className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div>
//           <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">Pipeline</p>
//           <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Lead management</h1>
//         </div>
//         <Button data-testid="leads-export" variant="outline" className="border-slate-300">
//           <Download className="mr-2 h-4 w-4" /> Export
//         </Button>
//       </div>

//       <Tabs value={tab} onValueChange={setTab} className="mt-5">
//         <TabsList data-testid="leads-tabs" className="flex-wrap justify-start">
//           <TabsTrigger value="all">All</TabsTrigger>
//           {LEAD_STAGES.map((s) => (
//             <TabsTrigger key={s.key} value={s.key}>{s.label}</TabsTrigger>
//           ))}
//         </TabsList>
//       </Tabs>

//       <div className="mt-4 relative max-w-md">
//         <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//         <Input data-testid="leads-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search company or contact..." className="h-11 pl-9" />
//       </div>

//       <div className="mt-5 space-y-3">
//         {filtered.map((l) => {
//           const v = VEHICLES.find((x) => x.id === l.interestedIn);
//           return (
//             <div key={l.id} data-testid={`lead-row-${l.id}`} className="rounded-xl border border-slate-200 bg-white p-5">
//               <div className="flex flex-wrap items-start justify-between gap-3">
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <h3 className="font-display text-lg font-bold">{l.company}</h3>
//                     <StatusBadge status={l.stage} />
//                   </div>
//                   <p className="mt-1 text-sm text-slate-600">{l.contact} · {l.mobile} · {l.email}</p>
//                   <p className="mt-0.5 text-xs text-slate-500">{l.type} · {l.city} · Created {l.createdOn}</p>
//                 </div>
//                 <Select value={l.stage} onValueChange={(val) => setStage(l.id, val)}>
//                   <SelectTrigger className="w-[160px]" data-testid={`lead-stage-${l.id}`}><SelectValue /></SelectTrigger>
//                   <SelectContent>
//                     {LEAD_STAGES.map((s) => (
//                       <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
//                 <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
//                   <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Need</p>
//                   <p className="mt-1 text-sm font-bold">{l.vehiclesNeeded} × {l.preferredType}</p>
//                 </div>
//                 <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
//                   <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Budget</p>
//                   <p className="mt-1 text-sm font-bold">{l.budget}</p>
//                 </div>
//                 <div className="rounded-md border border-slate-100 bg-slate-50 p-3 sm:col-span-2">
//                   <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Matched to</p>
//                   <p className="mt-1 text-sm font-bold">{v ? `${v.brand} ${v.model}` : "—"}</p>
//                 </div>
//               </div>

//               <p className="mt-3 text-sm text-slate-600">{l.notes}</p>

//               <div className="mt-4 flex flex-wrap gap-2">
//                 <Button size="sm" variant="outline" data-testid={`lead-call-${l.id}`} className="border-slate-300">
//                   <Phone className="mr-2 h-3.5 w-3.5" /> Call business
//                 </Button>
//                 <Button size="sm" variant="outline" data-testid={`lead-email-${l.id}`} className="border-slate-300">
//                   <Mail className="mr-2 h-3.5 w-3.5" /> Email
//                 </Button>
//                 <Button size="sm" data-testid={`lead-assign-${l.id}`} className="bg-emerald-700 text-white hover:bg-emerald-800">
//                   Match to dealer
//                 </Button>
//               </div>
//             </div>
//           );
//         })}
//         {filtered.length === 0 && (
//           <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
//             No leads in this stage.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Phone, Mail, Download, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "../../components/StatusBadge";
import { LEADS, LEAD_STAGES, VEHICLES } from "../../data/mockData";
import { toast } from "sonner";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
} from "../../app/assets/constants/zevgrid-colors";

export default function LeadManagement() {
  const [leads, setLeads] = useState(LEADS);
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");

  const filtered = leads.filter((l) => {
    const matchesTab = tab === "all" || l.stage === tab;
    const text = `${l.company} ${l.contact}`.toLowerCase();
    return matchesTab && text.includes(q.toLowerCase());
  });

  const setStage = (id, stage) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage } : l)));
    toast.success(`Moved to ${stage}`);
  };

  const tabItems = ["all", ...LEAD_STAGES.map((s) => s.key)];

  return (
    <div
      data-testid="lead-management-page"
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
            Pipeline
          </p>
          <h1 style={{ marginTop: "0.25rem", fontSize: "1.75rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
            Lead management
          </h1>
        </div>
        <Button
          data-testid="leads-export"
          variant="outline"
          style={{
            border: "1px solid #E2E8F0",
            color: "#64748B",
            backgroundColor: "transparent",
            fontWeight: 600,
            borderRadius: "0.5rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
        >
          <Download style={{ height: "1rem", width: "1rem" }} /> Export
        </Button>
      </div>

      {/* Tabs */}
      <div style={{ marginTop: "1.25rem" }}>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList
            data-testid="leads-tabs"
            style={{
              backgroundColor: `${ENTERPRISE_CHARCOAL}14`,
              borderRadius: "0.5rem",
              padding: "0.25rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.25rem",
              justifyContent: "flex-start",
              height: "auto",
            }}
          >
            {tabItems.map((key) => {
              const label = key === "all" ? "All" : (LEAD_STAGES.find((s) => s.key === key)?.label ?? key);
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  style={{
                    borderRadius: "0.375rem",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    padding: "0.375rem 0.875rem",
                    transition: "all 0.15s ease",
                    ...(tab === key
                      ? { backgroundColor: ELECTRIC_CYAN, color: ENTERPRISE_CHARCOAL, boxShadow: `0 2px 8px ${ELECTRIC_CYAN}44` }
                      : { backgroundColor: "transparent", color: "#64748B" }),
                  }}
                >
                  {label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* Search */}
      <div style={{ marginTop: "1rem", position: "relative", maxWidth: "28rem" }}>
        <SearchIcon
          style={{
            position: "absolute",
            left: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            height: "1rem",
            width: "1rem",
            color: "#94A3B8",
          }}
        />
        <Input
          data-testid="leads-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search company or contact..."
          style={{
            height: "2.75rem",
            paddingLeft: "2.25rem",
            border: `1px solid ${ELECTRIC_CYAN}33`,
            backgroundColor: CLEAN_WHITE,
            color: ENTERPRISE_CHARCOAL,
            borderRadius: "0.5rem",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
          onBlur={(e) => (e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}33`)}
        />
      </div>

      {/* Lead rows */}
      <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtered.map((l) => {
          const v = VEHICLES.find((x) => x.id === l.interestedIn);
          return (
            <div
              key={l.id}
              data-testid={`lead-row-${l.id}`}
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
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>{l.company}</h3>
                    <StatusBadge status={l.stage} />
                  </div>
                  <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#475569" }}>
                    {l.contact} · {l.mobile} · {l.email}
                  </p>
                  <p style={{ marginTop: "0.125rem", fontSize: "0.75rem", color: "#64748B" }}>
                    {l.type} · {l.city} · Created {l.createdOn}
                  </p>
                </div>

                <Select value={l.stage} onValueChange={(val) => setStage(l.id, val)}>
                  <SelectTrigger
                    style={{
                      width: "10rem",
                      border: `1px solid ${ELECTRIC_CYAN}33`,
                      borderRadius: "0.5rem",
                      backgroundColor: CLEAN_WHITE,
                      color: ENTERPRISE_CHARCOAL,
                      fontWeight: 600,
                      fontSize: "0.8125rem",
                    }}
                    data-testid={`lead-stage-${l.id}`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LEAD_STAGES.map((s) => (
                      <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Info tiles */}
              <div
                style={{
                  marginTop: "1rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {[
                  { label: "Need", value: `${l.vehiclesNeeded} × ${l.preferredType}`, span: 1 },
                  { label: "Budget", value: l.budget, span: 1 },
                  { label: "Matched to", value: v ? `${v.brand} ${v.model}` : "—", span: 2 },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      borderRadius: "0.375rem",
                      border: `1px solid ${ELECTRIC_CYAN}1A`,
                      backgroundColor: LIGHT_CANVAS_GREY,
                      padding: "0.75rem",
                    }}
                  >
                    <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94A3B8" }}>
                      {label}
                    </p>
                    <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "#475569" }}>{l.notes}</p>

              {/* Actions */}
              <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {[
                  { icon: Phone, label: "Call business", testId: `lead-call-${l.id}` },
                  { icon: Mail, label: "Email", testId: `lead-email-${l.id}` },
                ].map(({ icon: Icon, label, testId }) => (
                  <Button
                    key={label}
                    size="sm"
                    variant="outline"
                    data-testid={testId}
                    style={{
                      border: "1px solid #E2E8F0",
                      color: "#475569",
                      backgroundColor: "transparent",
                      fontWeight: 600,
                      fontSize: "0.8125rem",
                      borderRadius: "0.5rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
                  >
                    <Icon style={{ height: "0.875rem", width: "0.875rem" }} /> {label}
                  </Button>
                ))}

                <Button
                  size="sm"
                  data-testid={`lead-assign-${l.id}`}
                  style={{
                    backgroundColor: ACTIVE_EMERALD,
                    color: CLEAN_WHITE,
                    border: "none",
                    fontWeight: 700,
                    fontSize: "0.8125rem",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Match to dealer
                </Button>
              </div>
            </div>
          );
        })}

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
            No leads in this stage.
          </div>
        )}
      </div>
    </div>
  );
}