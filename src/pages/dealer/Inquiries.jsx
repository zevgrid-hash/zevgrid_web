// import { useState } from "react";
// import { Phone, Mail, MessageSquare } from "lucide-react";
// import { Button } from "../../components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
// import StatusBadge from "../../components/StatusBadge";
// import { LEADS, LEAD_STAGES } from "../../data/mockData";
// import { toast } from "sonner";

// export default function Inquiries() {
//   const [leads, setLeads] = useState(LEADS);
//   const [filter, setFilter] = useState("all");

//   const visible = filter === "all" ? leads : leads.filter((l) => l.stage === filter);

//   const updateStage = (id, stage) => {
//     setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage } : l)));
//     toast.success(`Stage updated to ${stage}`);
//   };

//   return (
//     <div data-testid="dealer-inquiries-page" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//       <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">Inquiries</p>
//       <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Business interest & leads</h1>
//       <p className="mt-2 text-sm text-slate-600">Admin-qualified requirements routed to your inventory.</p>

//       <div className="mt-6 flex items-center justify-between">
//         <p className="text-sm font-semibold text-slate-600">{visible.length} leads</p>
//         <Select value={filter} onValueChange={setFilter}>
//           <SelectTrigger className="w-[180px]" data-testid="inquiries-filter"><SelectValue /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All stages</SelectItem>
//             {LEAD_STAGES.map((s) => (
//               <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="mt-5 space-y-3">
//         {visible.map((l) => (
//           <div key={l.id} data-testid={`inquiry-${l.id}`} className="rounded-xl border border-slate-200 bg-white p-5">
//             <div className="flex flex-wrap items-start justify-between gap-3">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h3 className="font-display text-lg font-bold">{l.company}</h3>
//                   <StatusBadge status={l.stage} />
//                 </div>
//                 <p className="mt-1 text-xs text-slate-500">{l.contact} · {l.type} · Created {l.createdOn}</p>
//               </div>
//               <Select value={l.stage} onValueChange={(v) => updateStage(l.id, v)}>
//                 <SelectTrigger className="w-[160px]" data-testid={`inquiry-stage-${l.id}`}><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   {LEAD_STAGES.map((s) => (
//                     <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
//               <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
//                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Vehicles</p>
//                 <p className="mt-1 text-sm font-bold">{l.vehiclesNeeded} × {l.preferredType}</p>
//               </div>
//               <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
//                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Budget</p>
//                 <p className="mt-1 text-sm font-bold">{l.budget}</p>
//               </div>
//               <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
//                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Interested in</p>
//                 <p className="mt-1 text-sm font-bold">{l.interestedIn}</p>
//               </div>
//             </div>

//             <p className="mt-3 text-sm text-slate-600">{l.notes}</p>

//             <div className="mt-4 flex flex-wrap gap-2">
//               <Button size="sm" variant="outline" data-testid={`inquiry-call-${l.id}`} className="border-slate-300">
//                 <Phone className="mr-2 h-3.5 w-3.5" /> Call
//               </Button>
//               <Button size="sm" variant="outline" data-testid={`inquiry-email-${l.id}`} className="border-slate-300">
//                 <Mail className="mr-2 h-3.5 w-3.5" /> Email
//               </Button>
//               <Button size="sm" data-testid={`inquiry-quote-${l.id}`} className="bg-emerald-700 text-white hover:bg-emerald-800">
//                 <MessageSquare className="mr-2 h-3.5 w-3.5" /> Send quote
//               </Button>
//             </div>
//           </div>
//         ))}
//         {visible.length === 0 && (
//           <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
//             No inquiries in this stage.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import StatusBadge from "../../components/StatusBadge";
import { LEADS, LEAD_STAGES } from "../../data/mockData";
import { toast } from "sonner";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
} from "../../app/assets/constants/zevgrid-colors";

export default function Inquiries() {
  const [leads, setLeads] = useState(LEADS);
  const [filter, setFilter] = useState("all");

  const visible = filter === "all" ? leads : leads.filter((l) => l.stage === filter);

  const updateStage = (id, stage) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage } : l)));
    toast.success(`Stage updated to ${stage}`);
  };

  const selectTriggerStyle = {
    border: `1px solid ${ELECTRIC_CYAN}33`,
    backgroundColor: CLEAN_WHITE,
    color: ENTERPRISE_CHARCOAL,
    borderRadius: "0.5rem",
    fontWeight: 500,
    fontSize: "0.8125rem",
  };

  const outlineButtonStyle = {
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
  };

  return (
    <div
      data-testid="dealer-inquiries-page"
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
        Inquiries
      </p>
      <h1 style={{ marginTop: "0.25rem", fontSize: "1.75rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
        Business interest &amp; leads
      </h1>
      <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#64748B" }}>
        Admin-qualified requirements routed to your inventory.
      </p>

      {/* Filter bar */}
      <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#64748B" }}>{visible.length} leads</p>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger
            style={{ ...selectTriggerStyle, width: "11.25rem", height: "2.5rem" }}
            data-testid="inquiries-filter"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            {LEAD_STAGES.map((s) => (
              <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lead cards */}
      <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {visible.map((l) => (
          <div
            key={l.id}
            data-testid={`inquiry-${l.id}`}
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
                <p style={{ marginTop: "0.25rem", fontSize: "0.75rem", color: "#64748B" }}>
                  {l.contact} · {l.type} · Created {l.createdOn}
                </p>
              </div>
              <Select value={l.stage} onValueChange={(v) => updateStage(l.id, v)}>
                <SelectTrigger
                  style={{ ...selectTriggerStyle, width: "10rem", height: "2.25rem" }}
                  data-testid={`inquiry-stage-${l.id}`}
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
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {[
                { label: "Vehicles",     value: `${l.vehiclesNeeded} × ${l.preferredType}` },
                { label: "Budget",       value: l.budget },
                { label: "Interested in", value: l.interestedIn },
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
                  <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Notes */}
            <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "#475569" }}>{l.notes}</p>

            {/* Actions */}
            <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {[
                { icon: Phone,        label: "Call",  testId: `inquiry-call-${l.id}` },
                { icon: Mail,         label: "Email", testId: `inquiry-email-${l.id}` },
              ].map(({ icon: Icon, label, testId }) => (
                <Button
                  key={label}
                  size="sm"
                  variant="outline"
                  data-testid={testId}
                  style={outlineButtonStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
                >
                  <Icon style={{ height: "0.875rem", width: "0.875rem" }} /> {label}
                </Button>
              ))}

              <Button
                size="sm"
                data-testid={`inquiry-quote-${l.id}`}
                style={{
                  backgroundColor: ACTIVE_EMERALD,
                  color: CLEAN_WHITE,
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                  borderRadius: "0.5rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <MessageSquare style={{ height: "0.875rem", width: "0.875rem" }} /> Send quote
              </Button>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {visible.length === 0 && (
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
            No inquiries in this stage.
          </div>
        )}
      </div>
    </div>
  );
}