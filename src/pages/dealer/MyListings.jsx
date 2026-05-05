// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { PlusCircle, Search as SearchIcon, MoreVertical } from "lucide-react";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
// import StatusBadge from "../../components/StatusBadge";
// import { VEHICLES } from "../../data/mockData";
// import { toast } from "sonner";

// export default function MyListings() {
//   const [q, setQ] = useState("");
//   const [tab, setTab] = useState("all");
//   const [items, setItems] = useState(VEHICLES.filter((v) => v.dealerId === "d-101"));

//   const filtered = items.filter((v) => {
//     const matchesQ = `${v.brand} ${v.model}`.toLowerCase().includes(q.toLowerCase());
//     const matchesTab = tab === "all" || v.status === tab || v.availability === tab;
//     return matchesQ && matchesTab;
//   });

//   const changeAvailability = (id, value) => {
//     setItems((prev) => prev.map((v) => (v.id === id ? { ...v, availability: value } : v)));
//     toast.success(`Marked as ${value}`);
//   };

//   return (
//     <div data-testid="my-listings-page" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div>
//           <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">Inventory</p>
//           <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">My listings</h1>
//         </div>
//         <Link to="/dealer/add-vehicle">
//           <Button data-testid="add-listing-btn" className="bg-emerald-700 text-white hover:bg-emerald-800">
//             <PlusCircle className="mr-2 h-4 w-4" /> Add vehicle
//           </Button>
//         </Link>
//       </div>

//       <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <div className="relative w-full sm:max-w-sm">
//           <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//           <Input
//             data-testid="listings-search"
//             value={q}
//             onChange={(e) => setQ(e.target.value)}
//             placeholder="Search by brand or model..."
//             className="h-11 pl-9"
//           />
//         </div>
//         <Tabs value={tab} onValueChange={setTab}>
//           <TabsList data-testid="listings-tabs">
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="live">Live</TabsTrigger>
//             <TabsTrigger value="pending">Pending</TabsTrigger>
//             <TabsTrigger value="reserved">Reserved</TabsTrigger>
//           </TabsList>
//         </Tabs>
//       </div>

//       <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
//         <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_60px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 md:grid">
//           <div>Vehicle</div><div>Rent</div><div>Status</div><div>Availability</div><div></div>
//         </div>
//         {filtered.map((v) => (
//           <div
//             key={v.id}
//             data-testid={`listing-row-${v.id}`}
//             className="flex flex-col gap-3 border-b border-slate-100 p-4 md:grid md:grid-cols-[1.5fr_1fr_1fr_1fr_60px] md:items-center md:gap-4 md:px-5"
//           >
//             <div className="flex items-center gap-3">
//               <img src={v.image} alt="" className="h-12 w-12 rounded object-cover" />
//               <div className="min-w-0">
//                 <p className="truncate text-sm font-bold">{v.brand} {v.model}</p>
//                 <p className="text-xs text-slate-500">{v.type} · {v.quantity} units · {v.condition}</p>
//               </div>
//             </div>
//             <p className="text-sm font-bold text-emerald-700">₹{v.monthlyRent.toLocaleString("en-IN")}<span className="text-xs font-medium text-slate-500">/mo</span></p>
//             <div><StatusBadge status={v.status} /></div>
//             <div><StatusBadge status={v.availability} /></div>
//             <div className="flex justify-end">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" size="icon" data-testid={`listing-menu-${v.id}`}>
//                     <MoreVertical className="h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem onClick={() => changeAvailability(v.id, "available")}>Mark available</DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => changeAvailability(v.id, "reserved")}>Mark reserved</DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => changeAvailability(v.id, "rented")}>Mark rented</DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => changeAvailability(v.id, "unavailable")}>Mark unavailable</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//         ))}
//         {filtered.length === 0 && (
//           <div className="p-10 text-center text-sm text-slate-500">No listings match your filters.</div>
//         )}
//       </div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import { useState } from "react";
import { PlusCircle, Search as SearchIcon, MoreVertical } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import StatusBadge from "../../components/StatusBadge";
import { VEHICLES } from "../../data/mockData";
import { toast } from "sonner";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
} from "../../app/assets/constants/zevgrid-colors";

export default function MyListings() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("all");
  const [items, setItems] = useState(VEHICLES.filter((v) => v.dealerId === "d-101"));

  const filtered = items.filter((v) => {
    const matchesQ = `${v.brand} ${v.model}`.toLowerCase().includes(q.toLowerCase());
    const matchesTab = tab === "all" || v.status === tab || v.availability === tab;
    return matchesQ && matchesTab;
  });

  const changeAvailability = (id, value) => {
    setItems((prev) => prev.map((v) => (v.id === id ? { ...v, availability: value } : v)));
    toast.success(`Marked as ${value}`);
  };

  const tabItems = ["all", "live", "pending", "reserved"];

  return (
    <div
      data-testid="my-listings-page"
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
            Inventory
          </p>
          <h1 style={{ marginTop: "0.25rem", fontSize: "1.75rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
            My listings
          </h1>
        </div>
        <Link to="/dealer/add-vehicle">
          <Button
            data-testid="add-listing-btn"
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

      {/* Search + Tabs */}
      <div
        style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", flexWrap: "wrap" }}
        className="sm:flex-row sm:items-center sm:justify-between"
      >
        <div style={{ position: "relative", width: "100%", maxWidth: "24rem" }}>
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
            data-testid="listings-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by brand or model..."
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

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList
            data-testid="listings-tabs"
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

      {/* Table */}
      <div
        style={{
          marginTop: "1.5rem",
          overflow: "hidden",
          borderRadius: "0.75rem",
          border: "1px solid #E2E8F0",
          backgroundColor: CLEAN_WHITE,
        }}
      >
        {/* Table header */}
        <div
          className="md:grid"
          style={{
            display: "none",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr 60px",
            gap: "1rem",
            borderBottom: `1px solid ${ELECTRIC_CYAN}1A`,
            backgroundColor: LIGHT_CANVAS_GREY,
            padding: "0.75rem 1.25rem",
          }}
        >
          {["Vehicle", "Rent", "Status", "Availability", ""].map((col, i) => (
            <div
              key={i}
              style={{
                fontSize: "0.625rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#94A3B8",
              }}
            >
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {filtered.map((v) => (
          <div
            key={v.id}
            data-testid={`listing-row-${v.id}`}
            className="md:grid md:items-center"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              borderBottom: "1px solid #F1F5F9",
              padding: "1rem 1.25rem",
            }}
          >
            {/* Vehicle */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <img
                src={v.image}
                alt=""
                style={{ height: "3rem", width: "3rem", borderRadius: "0.375rem", objectFit: "cover", flexShrink: 0 }}
              />
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {v.brand} {v.model}
                </p>
                <p style={{ fontSize: "0.75rem", color: "#64748B" }}>
                  {v.type} · {v.quantity} units · {v.condition}
                </p>
              </div>
            </div>

            {/* Rent */}
            <p style={{ fontSize: "0.875rem", fontWeight: 700, color: ACTIVE_EMERALD }}>
              ₹{v.monthlyRent.toLocaleString("en-IN")}
              <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#94A3B8" }}>/mo</span>
            </p>

            {/* Status */}
            <div><StatusBadge status={v.status} /></div>

            {/* Availability */}
            <div><StatusBadge status={v.availability} /></div>

            {/* Menu */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    data-testid={`listing-menu-${v.id}`}
                    style={{
                      background: "transparent",
                      border: "none",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                      color: "#64748B",
                      padding: "0.25rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${ELECTRIC_CYAN}14`;
                      e.currentTarget.style.color = ELECTRIC_CYAN;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#64748B";
                    }}
                  >
                    <MoreVertical style={{ height: "1rem", width: "1rem" }} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => changeAvailability(v.id, "available")}>Mark available</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeAvailability(v.id, "reserved")}>Mark reserved</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeAvailability(v.id, "rented")}>Mark rented</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeAvailability(v.id, "unavailable")}>Mark unavailable</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{ padding: "2.5rem", textAlign: "center", fontSize: "0.875rem", color: "#94A3B8" }}>
            No listings match your filters.
          </div>
        )}
      </div>
    </div>
  );
}