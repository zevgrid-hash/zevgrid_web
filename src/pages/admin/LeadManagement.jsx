
// import { useEffect, useState } from "react";
// import { ChevronDown, Phone, Mail, Download, Search as SearchIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import StatusBadge from "../../components/StatusBadge";
// import { LEAD_STAGES, VEHICLES } from "../../data/mockData";
// import { API_BASE_URL, getLeadById, getLeads, getLeadStages, updateLeadStage } from "../../lib/api";
// import { toast } from "sonner";
// import {
//   ELECTRIC_CYAN,
//   ENTERPRISE_CHARCOAL,
//   CLEAN_WHITE,
//   LIGHT_CANVAS_GREY,
//   ACTIVE_EMERALD,
// } from "../../app/assets/constants/zevgrid-colors";

// export default function LeadManagement() {
//   const [leads, setLeads] = useState([]);
//   const [tab, setTab] = useState("all");
//   const [q, setQ] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadError, setLoadError] = useState("");
//   const [updatingId, setUpdatingId] = useState("");
//   const [selectedId, setSelectedId] = useState("");
//   const [leadDetails, setLeadDetails] = useState({});
//   const [detailsLoadingId, setDetailsLoadingId] = useState("");
//   const [detailsError, setDetailsError] = useState("");
//   const [stageOptions, setStageOptions] = useState(LEAD_STAGES);

//   useEffect(() => {
//     let ignore = false;

//     async function loadStages() {
//       try {
//         const result = await getLeadStages();
//         if (!ignore && result.data.length > 0) setStageOptions(result.data);
//       } catch {
//         if (!ignore) setStageOptions(LEAD_STAGES);
//       }
//     }

//     loadStages();
//     return () => {
//       ignore = true;
//     };
//   }, []);

//   useEffect(() => {
//     let ignore = false;

//     async function loadLeads() {
//       setIsLoading(true);
//       setLoadError("");
//       try {
//         const result = await getLeads({
//           stage: tab === "all" ? undefined : tab,
//           q,
//         });
//         if (!ignore) setLeads(result.data);
//       } catch (error) {
//         if (!ignore) {
//           setLeads([]);
//           setLoadError(error.message || "Leads could not be loaded.");
//         }
//       } finally {
//         if (!ignore) setIsLoading(false);
//       }
//     }

//     loadLeads();
//     return () => {
//       ignore = true;
//     };
//   }, [tab, q]);

//   const filtered = leads.filter((l) => {
//     const matchesTab = tab === "all" || l.stage === tab;
//     const text = `${l.company} ${l.contact}`.toLowerCase();
//     return matchesTab && text.includes(q.toLowerCase());
//   });

//   const setStage = async (id, stage) => {
//     setUpdatingId(id);
//     try {
//       const result = await updateLeadStage(id, stage);
//       setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...result.data } : l)));
//       toast.success(result.message || `Moved to ${stage}`);
//     } catch (error) {
//       toast.error("Lead update failed", {
//         description: error.message || "Please try again.",
//       });
//     } finally {
//       setUpdatingId("");
//     }
//   };

//   const toggleDetails = async (id) => {
//     if (selectedId === id) {
//       setSelectedId("");
//       return;
//     }

//     setSelectedId(id);
//     setDetailsError("");

//     if (leadDetails[id]) return;

//     setDetailsLoadingId(id);
//     try {
//       const result = await getLeadById(id);
//       setLeadDetails((current) => ({ ...current, [id]: result.data }));
//     } catch (error) {
//       setDetailsError(error.message || "Lead details could not be loaded.");
//     } finally {
//       setDetailsLoadingId("");
//     }
//   };

//   const tabItems = ["all", ...stageOptions.map((s) => s.key)];
// const handleExport = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/export/leads.csv`, {
//       method: "GET",
//       headers: { accept: "*/*" },
//     });
//     if (!response.ok) throw new Error("Export failed");
//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "leads.csv";
//     a.click();
//     window.URL.revokeObjectURL(url);
//     toast.success("Leads exported successfully");
//   } catch (error) {
//     toast.error("Export failed", { description: error.message || "Please try again." });
//   }
// };
//   return (
//     <div
//       data-testid="lead-management-page"
//       style={{
//         margin: "0 auto",
//         width: "100%",
//         maxWidth: "80rem",
//         padding: "1.5rem 2rem",
//         backgroundColor: LIGHT_CANVAS_GREY,
//         minHeight: "100vh",
//       }}
//     >
//       {/* Header */}
//       <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
//         <div>
//           <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: ELECTRIC_CYAN }}>
//             Pipeline
//           </p>
//           <h1 style={{ marginTop: "0.25rem", fontSize: "1.75rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
//             Lead management
//           </h1>
//         </div>
//         <Button
//           data-testid="leads-export"
//           variant="outline"
//           style={{
//             border: "1px solid #E2E8F0",
//             color: "#64748B",
//             backgroundColor: "transparent",
//             fontWeight: 600,
//             borderRadius: "0.5rem",
//             display: "inline-flex",
//             alignItems: "center",
//             gap: "0.5rem",
//             cursor: "pointer",
//           }}
//           onClick={handleExport} 
//           onMouseEnter={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
//           onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
//         >
//           <Download style={{ height: "1rem", width: "1rem" }} /> Export
//         </Button>
//       </div>

//       {/* Tabs */}
//       <div style={{ marginTop: "1.25rem" }}>
//         <Tabs value={tab} onValueChange={setTab}>
//           <TabsList
//             data-testid="leads-tabs"
//             style={{
//               backgroundColor: `${ENTERPRISE_CHARCOAL}14`,
//               borderRadius: "0.5rem",
//               padding: "0.25rem",
//               display: "flex",
//               flexWrap: "wrap",
//               gap: "0.25rem",
//               justifyContent: "flex-start",
//               height: "auto",
//             }}
//           >
//             {tabItems.map((key) => {
//               const label = key === "all" ? "All" : (stageOptions.find((s) => s.key === key)?.label ?? key);
//               return (
//                 <TabsTrigger
//                   key={key}
//                   value={key}
//                   style={{
//                     borderRadius: "0.375rem",
//                     fontSize: "0.8125rem",
//                     fontWeight: 600,
//                     padding: "0.375rem 0.875rem",
//                     transition: "all 0.15s ease",
//                     ...(tab === key
//                       ? { backgroundColor: ELECTRIC_CYAN, color: ENTERPRISE_CHARCOAL, boxShadow: `0 2px 8px ${ELECTRIC_CYAN}44` }
//                       : { backgroundColor: "transparent", color: "#64748B" }),
//                   }}
//                 >
//                   {label}
//                 </TabsTrigger>
//               );
//             })}
//           </TabsList>
//         </Tabs>
//       </div>

//       {/* Search */}
//       <div style={{ marginTop: "1rem", position: "relative", maxWidth: "28rem" }}>
//         <SearchIcon
//           style={{
//             position: "absolute",
//             left: "0.75rem",
//             top: "50%",
//             transform: "translateY(-50%)",
//             height: "1rem",
//             width: "1rem",
//             color: "#94A3B8",
//           }}
//         />
//         <Input
//           data-testid="leads-search"
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//           placeholder="Search company or contact..."
//           style={{
//             height: "2.75rem",
//             paddingLeft: "2.25rem",
//             border: `1px solid ${ELECTRIC_CYAN}33`,
//             backgroundColor: CLEAN_WHITE,
//             color: ENTERPRISE_CHARCOAL,
//             borderRadius: "0.5rem",
//           }}
//           onFocus={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
//           onBlur={(e) => (e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}33`)}
//         />
//       </div>

//       {/* Lead rows */}
//       <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
//         {isLoading && (
//           <div
//             style={{
//               borderRadius: "0.75rem",
//               border: `1px dashed ${ELECTRIC_CYAN}44`,
//               backgroundColor: CLEAN_WHITE,
//               padding: "2.5rem",
//               textAlign: "center",
//               fontSize: "0.875rem",
//               color: "#94A3B8",
//             }}
//           >
//             Loading leads...
//           </div>
//         )}

//         {!isLoading && loadError && (
//           <div
//             style={{
//               borderRadius: "0.75rem",
//               border: `1px dashed ${ELECTRIC_CYAN}44`,
//               backgroundColor: CLEAN_WHITE,
//               padding: "2.5rem",
//               textAlign: "center",
//               fontSize: "0.875rem",
//               color: "#94A3B8",
//             }}
//           >
//             {loadError}
//           </div>
//         )}

//         {!isLoading && !loadError && filtered.map((l) => {
//           const v = VEHICLES.find((x) => x.id === l.interestedIn);
//           return (
//             <div
//               key={l.id}
//               data-testid={`lead-row-${l.id}`}
//               style={{
//                 borderRadius: "0.75rem",
//                 border: "1px solid #E2E8F0",
//                 backgroundColor: CLEAN_WHITE,
//                 padding: "1.25rem",
//               }}
//             >
//               {/* Top row */}
//               <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
//                 <div>
//                   <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                     <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>{l.company}</h3>
//                     <StatusBadge status={l.stage} />
//                   </div>
//                   <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#475569" }}>
//                     {l.contact} · {l.mobile} · {l.email}
//                   </p>
//                   <p style={{ marginTop: "0.125rem", fontSize: "0.75rem", color: "#64748B" }}>
//                     {l.type} · {l.city} · Created {l.createdOn}
//                   </p>
//                 </div>

//                 <Select value={l.stage} onValueChange={(val) => setStage(l.id, val)} disabled={updatingId === l.id}>
//                   <SelectTrigger
//                     style={{
//                       width: "10rem",
//                       border: `1px solid ${ELECTRIC_CYAN}33`,
//                       borderRadius: "0.5rem",
//                       backgroundColor: CLEAN_WHITE,
//                       color: ENTERPRISE_CHARCOAL,
//                       fontWeight: 600,
//                       fontSize: "0.8125rem",
//                     }}
//                     data-testid={`lead-stage-${l.id}`}
//                   >
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {stageOptions.map((s) => (
//                       <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Info tiles */}
//               <div
//                 style={{
//                   marginTop: "1rem",
//                   display: "grid",
//                   gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
//                   gap: "0.75rem",
//                 }}
//               >
//                 {[
//                   { label: "Need", value: `${l.vehiclesNeeded} × ${l.preferredType}`, span: 1 },
//                   { label: "Budget", value: l.budget, span: 1 },
//                   { label: "Matched to", value: v ? `${v.brand} ${v.model}` : "—", span: 2 },
//                 ].map(({ label, value }) => (
//                   <div
//                     key={label}
//                     style={{
//                       borderRadius: "0.375rem",
//                       border: `1px solid ${ELECTRIC_CYAN}1A`,
//                       backgroundColor: LIGHT_CANVAS_GREY,
//                       padding: "0.75rem",
//                     }}
//                   >
//                     <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94A3B8" }}>
//                       {label}
//                     </p>
//                     <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>{value}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Notes */}
//               <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "#475569" }}>{l.notes}</p>

//               {/* Actions */}
//               <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
//                 {[
//                   { icon: Phone, label: "Call business", testId: `lead-call-${l.id}` },
//                   { icon: Mail, label: "Email", testId: `lead-email-${l.id}` },
//                 ].map(({ icon: Icon, label, testId }) => (
//                   <Button
//                     key={label}
//                     size="sm"
//                     variant="outline"
//                     data-testid={testId}
//                     style={{
//                       border: "1px solid #E2E8F0",
//                       color: "#475569",
//                       backgroundColor: "transparent",
//                       fontWeight: 600,
//                       fontSize: "0.8125rem",
//                       borderRadius: "0.5rem",
//                       display: "inline-flex",
//                       alignItems: "center",
//                       gap: "0.375rem",
//                       cursor: "pointer",
//                     }}
//                     onMouseEnter={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
//                     onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
//                   >
//                     <Icon style={{ height: "0.875rem", width: "0.875rem" }} /> {label}
//                   </Button>
//                 ))}

//                 <Button
//                   size="sm"
//                   data-testid={`lead-assign-${l.id}`}
//                   style={{
//                     backgroundColor: ACTIVE_EMERALD,
//                     color: CLEAN_WHITE,
//                     border: "none",
//                     fontWeight: 700,
//                     fontSize: "0.8125rem",
//                     borderRadius: "0.5rem",
//                     cursor: "pointer",
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
//                   onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//                 >
//                   Match to dealer
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   data-testid={`lead-details-${l.id}`}
//                   onClick={() => toggleDetails(l.id)}
//                   style={{
//                     border: `1px solid ${ELECTRIC_CYAN}33`,
//                     color: ENTERPRISE_CHARCOAL,
//                     backgroundColor: "transparent",
//                     fontWeight: 600,
//                     fontSize: "0.8125rem",
//                     borderRadius: "0.5rem",
//                     display: "inline-flex",
//                     alignItems: "center",
//                     gap: "0.375rem",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {selectedId === l.id ? "Hide" : "View"} details
//                   <ChevronDown style={{ height: "0.875rem", width: "0.875rem", transform: selectedId === l.id ? "rotate(180deg)" : "none" }} />
//                 </Button>
//               </div>

//               {selectedId === l.id && (
//                 <div
//                   style={{
//                     marginTop: "1rem",
//                     borderTop: "1px solid #F1F5F9",
//                     paddingTop: "1rem",
//                     display: "grid",
//                     gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//                     gap: "0.75rem",
//                   }}
//                 >
//                   {detailsLoadingId === l.id && (
//                     <p style={{ gridColumn: "1 / -1", fontSize: "0.875rem", color: "#64748B" }}>Loading details...</p>
//                   )}
//                   {detailsError && detailsLoadingId !== l.id && (
//                     <p style={{ gridColumn: "1 / -1", fontSize: "0.875rem", color: "#64748B" }}>{detailsError}</p>
//                   )}
//                   {leadDetails[l.id] && [
//                     ["Company", leadDetails[l.id].company],
//                     ["Contact", leadDetails[l.id].contact],
//                     ["Mobile", leadDetails[l.id].mobile],
//                     ["Email", leadDetails[l.id].email],
//                     ["City", leadDetails[l.id].city],
//                     ["Type", leadDetails[l.id].type],
//                     ["Count", leadDetails[l.id].count],
//                     ["Tenure", leadDetails[l.id].tenure],
//                     ["Budget", leadDetails[l.id].budget],
//                     ["Use case", leadDetails[l.id].useCase],
//                     ["Dealer", leadDetails[l.id].dealerId || "-"],
//                     ["Stage", leadDetails[l.id].stage],
//                   ].map(([label, value]) => (
//                     <div key={label} style={{ borderRadius: "0.5rem", border: `1px solid ${ELECTRIC_CYAN}1A`, backgroundColor: LIGHT_CANVAS_GREY, padding: "0.75rem" }}>
//                       <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94A3B8" }}>{label}</p>
//                       <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", fontWeight: 600, color: ENTERPRISE_CHARCOAL, overflowWrap: "anywhere" }}>{value}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         {/* Empty state */}
//         {!isLoading && !loadError && filtered.length === 0 && (
//           <div
//             style={{
//               borderRadius: "0.75rem",
//               border: `1px dashed ${ELECTRIC_CYAN}44`,
//               backgroundColor: CLEAN_WHITE,
//               padding: "2.5rem",
//               textAlign: "center",
//               fontSize: "0.875rem",
//               color: "#94A3B8",
//             }}
//           >
//             No leads in this stage.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { ChevronDown, Phone, Mail, Download, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "../../components/StatusBadge";
import { LEAD_STAGES, VEHICLES } from "../../data/mockData";
import { API_BASE_URL, getLeadById, getLeads, getLeadStages, updateLeadStage } from "../../lib/api";
import { toast } from "sonner";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
} from "../../app/assets/constants/zevgrid-colors";

export default function LeadManagement() {
  const [leads, setLeads] = useState([]);
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [leadDetails, setLeadDetails] = useState({});
  const [detailsLoadingId, setDetailsLoadingId] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [stageOptions, setStageOptions] = useState(LEAD_STAGES);

  useEffect(() => {
    let ignore = false;

    async function loadStages() {
      try {
        const result = await getLeadStages();
        if (!ignore && result.data.length > 0) setStageOptions(result.data);
      } catch {
        if (!ignore) setStageOptions(LEAD_STAGES);
      }
    }

    loadStages();
    return () => { ignore = true; };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadLeads() {
      setIsLoading(true);
      setLoadError("");
      try {
        const result = await getLeads({
          stage: tab === "all" ? undefined : tab,
          q,
        });
        if (!ignore) setLeads(result.data);
      } catch (error) {
        if (!ignore) {
          setLeads([]);
          setLoadError(error.message || "Leads could not be loaded.");
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadLeads();
    return () => { ignore = true; };
  }, [tab, q]);

  const filtered = leads.filter((l) => {
    const matchesTab = tab === "all" || l.stage === tab;
    const text = `${l.company} ${l.contact}`.toLowerCase();
    return matchesTab && text.includes(q.toLowerCase());
  });

  const setStage = async (id, stage) => {
    setUpdatingId(id);
    try {
      const result = await updateLeadStage(id, stage);
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...result.data } : l)));
      toast.success(result.message || `Moved to ${stage}`);
    } catch (error) {
      toast.error("Lead update failed", {
        description: error.message || "Please try again.",
      });
    } finally {
      setUpdatingId("");
    }
  };

  const toggleDetails = async (id) => {
    if (selectedId === id) {
      setSelectedId("");
      return;
    }

    setSelectedId(id);
    setDetailsError("");

    if (leadDetails[id]) return;

    setDetailsLoadingId(id);
    try {
      const result = await getLeadById(id);
      setLeadDetails((current) => ({ ...current, [id]: result.data }));
    } catch (error) {
      setDetailsError(error.message || "Lead details could not be loaded.");
    } finally {
      setDetailsLoadingId("");
    }
  };

  // ── Copy phone number to clipboard ──────────────────────────────────────────
  const handleCall = async (mobile, company) => {
    if (!mobile) {
      toast.error("No phone number available");
      return;
    }
    try {
      await navigator.clipboard.writeText(mobile);
      toast.success(`Number copied`, {
        description: `${mobile} — ${company}`,
      });
    } catch {
      // Fallback for browsers that block clipboard without interaction
      const el = document.createElement("input");
      el.value = mobile;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      toast.success(`Number copied`, {
        description: `${mobile} — ${company}`,
      });
    }
  };

  // ── Open default mail client ─────────────────────────────────────────────────
  const handleEmail = (email, company) => {
    if (!email) {
      toast.error("No email address available");
      return;
    }
    window.location.href = `mailto:${email}`;
  };

  const tabItems = ["all", ...stageOptions.map((s) => s.key)];

  const handleExport = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/export/leads.csv`, {
        method: "GET",
        headers: { accept: "*/*" },
      });
      if (!response.ok) throw new Error("Export failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "leads.csv";
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Leads exported successfully");
    } catch (error) {
      toast.error("Export failed", { description: error.message || "Please try again." });
    }
  };

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
          onClick={handleExport}
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
              const label = key === "all" ? "All" : (stageOptions.find((s) => s.key === key)?.label ?? key);
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
        {isLoading && (
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
            Loading leads...
          </div>
        )}

        {!isLoading && loadError && (
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
            {loadError}
          </div>
        )}

        {!isLoading && !loadError && filtered.map((l) => {
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

                <Select value={l.stage} onValueChange={(val) => setStage(l.id, val)} disabled={updatingId === l.id}>
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
                    {stageOptions.map((s) => (
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
                  { label: "Need",       value: `${l.vehiclesNeeded} × ${l.preferredType}` },
                  { label: "Budget",     value: l.budget },
                  { label: "Matched to", value: v ? `${v.brand} ${v.model}` : "—" },
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
                {/* Call — copies number to clipboard */}
                <Button
                  size="sm"
                  variant="outline"
                  data-testid={`lead-call-${l.id}`}
                  onClick={() => handleCall(l.mobile, l.company)}
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
                  <Phone style={{ height: "0.875rem", width: "0.875rem" }} /> Call business
                </Button>

                {/* Email — opens mailto */}
                <Button
                  size="sm"
                  variant="outline"
                  data-testid={`lead-email-${l.id}`}
                  onClick={() => handleEmail(l.email, l.company)}
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
                  <Mail style={{ height: "0.875rem", width: "0.875rem" }} /> Email
                </Button>

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

                <Button
                  size="sm"
                  variant="outline"
                  data-testid={`lead-details-${l.id}`}
                  onClick={() => toggleDetails(l.id)}
                  style={{
                    border: `1px solid ${ELECTRIC_CYAN}33`,
                    color: ENTERPRISE_CHARCOAL,
                    backgroundColor: "transparent",
                    fontWeight: 600,
                    fontSize: "0.8125rem",
                    borderRadius: "0.5rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    cursor: "pointer",
                  }}
                >
                  {selectedId === l.id ? "Hide" : "View"} details
                  <ChevronDown style={{ height: "0.875rem", width: "0.875rem", transform: selectedId === l.id ? "rotate(180deg)" : "none" }} />
                </Button>
              </div>

              {/* Expanded details */}
              {selectedId === l.id && (
                <div
                  style={{
                    marginTop: "1rem",
                    borderTop: "1px solid #F1F5F9",
                    paddingTop: "1rem",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "0.75rem",
                  }}
                >
                  {detailsLoadingId === l.id && (
                    <p style={{ gridColumn: "1 / -1", fontSize: "0.875rem", color: "#64748B" }}>Loading details...</p>
                  )}
                  {detailsError && detailsLoadingId !== l.id && (
                    <p style={{ gridColumn: "1 / -1", fontSize: "0.875rem", color: "#64748B" }}>{detailsError}</p>
                  )}
                  {leadDetails[l.id] && [
                    ["Company",  leadDetails[l.id].company],
                    ["Contact",  leadDetails[l.id].contact],
                    ["Mobile",   leadDetails[l.id].mobile],
                    ["Email",    leadDetails[l.id].email],
                    ["City",     leadDetails[l.id].city],
                    ["Type",     leadDetails[l.id].type],
                    ["Count",    leadDetails[l.id].count],
                    ["Tenure",   leadDetails[l.id].tenure],
                    ["Budget",   leadDetails[l.id].budget],
                    ["Use case", leadDetails[l.id].useCase],
                    ["Dealer",   leadDetails[l.id].dealerId || "-"],
                    ["Stage",    leadDetails[l.id].stage],
                  ].map(([label, value]) => (
                    <div key={label} style={{ borderRadius: "0.5rem", border: `1px solid ${ELECTRIC_CYAN}1A`, backgroundColor: LIGHT_CANVAS_GREY, padding: "0.75rem" }}>
                      <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94A3B8" }}>{label}</p>
                      <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", fontWeight: 600, color: ENTERPRISE_CHARCOAL, overflowWrap: "anywhere" }}>{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Empty state */}
        {!isLoading && !loadError && filtered.length === 0 && (
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