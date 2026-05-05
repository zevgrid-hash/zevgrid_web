// import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
// import { LayoutGrid, UserCheck, CarFront, ListChecks, Users, Zap, LogOut } from "lucide-react";
// import { Button } from "../components/ui/button";

// const items = [
//   { to: "/admin/dashboard", label: "Overview", icon: LayoutGrid, testid: "admin-nav-overview" },
//   { to: "/admin/dealer-approvals", label: "Dealers", icon: UserCheck, testid: "admin-nav-dealers" },
//   { to: "/admin/vehicle-approvals", label: "Vehicles", icon: CarFront, testid: "admin-nav-vehicles" },
//   { to: "/admin/listings", label: "Listings", icon: ListChecks, testid: "admin-nav-listings" },
//   { to: "/admin/leads", label: "Leads", icon: Users, testid: "admin-nav-leads" },
// ];

// export default function AdminLayout() {
//   const navigate = useNavigate();
//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       {/* Sidebar (desktop) */}
//       <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-slate-900 text-white md:block">
//         <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-6">
//           <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500 text-slate-900">
//             <Zap className="h-4 w-4" strokeWidth={2.5} />
//           </span>
//           <div className="leading-tight">
//             <p className="font-display text-base font-bold">ZevGrid</p>
//             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">Admin</p>
//           </div>
//         </div>
//         <nav className="mt-4 space-y-1 px-3">
//           {items.map((i) => (
//             <NavLink
//               key={i.to}
//               to={i.to}
//               data-testid={i.testid}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   isActive
//                     ? "bg-emerald-500 text-slate-900"
//                     : "text-slate-300 hover:bg-slate-800 hover:text-white"
//                 }`
//               }
//             >
//               <i.icon className="h-4 w-4" />
//               {i.label}
//             </NavLink>
//           ))}
//         </nav>
//         <div className="absolute bottom-4 w-64 px-6">
//           <button
//             onClick={() => navigate("/admin/login")}
//             data-testid="admin-logout-btn"
//             className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-white"
//           >
//             <LogOut className="h-3.5 w-3.5" /> Logout
//           </button>
//         </div>
//       </aside>

//       <div className="flex min-h-screen flex-1 flex-col pb-16 md:pb-0">
//         {/* Mobile top bar */}
//         <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-slate-900 px-4 text-white md:hidden">
//           <Link to="/admin/dashboard" className="flex items-center gap-2" data-testid="admin-mobile-logo">
//             <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-slate-900">
//               <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
//             </span>
//             <p className="font-display text-sm font-bold">ZevGrid<span className="text-emerald-400">.</span> Admin</p>
//           </Link>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => navigate("/admin/login")}
//             data-testid="admin-mobile-logout"
//             className="text-white hover:bg-slate-800 hover:text-white"
//           >
//             <LogOut className="h-4 w-4" />
//           </Button>
//         </header>

//         <main className="flex-1">
//           <Outlet />
//         </main>

//         {/* Mobile bottom nav */}
//         <nav
//           data-testid="admin-bottom-nav"
//           className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white md:hidden"
//         >
//           <div className="grid grid-cols-5">
//             {items.map((i) => (
//               <NavLink
//                 key={i.to}
//                 to={i.to}
//                 data-testid={`${i.testid}-mobile`}
//                 className={({ isActive }) =>
//                   `flex flex-col items-center justify-center gap-1 py-2.5 text-[9px] font-bold uppercase tracking-wider ${
//                     isActive ? "text-emerald-700" : "text-slate-500"
//                   }`
//                 }
//               >
//                 <i.icon className="h-5 w-5" />
//                 {i.label}
//               </NavLink>
//             ))}
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { LayoutGrid, UserCheck, CarFront, ListChecks, Users, Zap, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../app/assets/constants/zevgrid-colors";


// ─── Style tokens ─────────────────────────────────────────────────────────────

const s = {
  sidebar: {
    width: "256px",
    flexShrink: 0,
    backgroundColor: INFRASTRUCTURE_NAVY,
    borderRight: `1px solid ${ELECTRIC_CYAN}18`,
    color: CLEAN_WHITE,
  },
  sidebarHeader: {
    height: "64px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "0 24px",
    borderBottom: `1px solid ${ELECTRIC_CYAN}20`,
  },
  logoMark: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "32px",
    width: "32px",
    borderRadius: "8px",
    backgroundColor: ELECTRIC_CYAN,
    color: INFRASTRUCTURE_NAVY,
    flexShrink: 0,
  },
  logoTitle: {
    fontSize: "0.9375rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: CLEAN_WHITE,
    lineHeight: 1.2,
  },
  logoSub: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: ELECTRIC_CYAN,
  },
  navItem: {
    base: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      borderRadius: "8px",
      padding: "10px 12px",
      fontSize: "0.8125rem",
      fontWeight: 600,
      textDecoration: "none",
      transition: "background-color 150ms ease, color 150ms ease",
      color: `${CLEAN_WHITE}80`,
      border: "1px solid transparent",
    },
    active: {
      backgroundColor: `${ELECTRIC_CYAN}18`,
      color: ELECTRIC_CYAN,
      borderColor: `${ELECTRIC_CYAN}33`,
    },
    hover: {
      backgroundColor: `${CLEAN_WHITE}08`,
      color: CLEAN_WHITE,
    },
  },
  logoutBtn: {
    base: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: `${CLEAN_WHITE}50`,
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "0",
      transition: "color 150ms ease",
    },
    hover: { color: ELECTRIC_CYAN },
  },
  mobileHeader: {
    position: "sticky",
    top: 0,
    zIndex: 40,
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    backgroundColor: INFRASTRUCTURE_NAVY,
    borderBottom: `1px solid ${ELECTRIC_CYAN}20`,
    color: CLEAN_WHITE,
  },
  mobileLogoMark: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "28px",
    width: "28px",
    borderRadius: "6px",
    backgroundColor: ELECTRIC_CYAN,
    color: INFRASTRUCTURE_NAVY,
    flexShrink: 0,
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    backgroundColor: CLEAN_WHITE,
    borderTop: `1px solid ${LIGHT_CANVAS_GREY}`,
  },
  bottomNavItem: {
    base: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "3px",
      paddingTop: "10px",
      paddingBottom: "10px",
      fontSize: "9px",
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      textDecoration: "none",
      color: `${ENTERPRISE_CHARCOAL}55`,
      transition: "color 150ms ease",
    },
    active: {
      color: ELECTRIC_CYAN,
    },
  },
};

// ─── Nav items ────────────────────────────────────────────────────────────────

const items = [
  { to: "/admin/dashboard",        label: "Overview",  icon: LayoutGrid, testid: "admin-nav-overview"  },
  { to: "/admin/dealer-approvals", label: "Dealers",   icon: UserCheck,  testid: "admin-nav-dealers"   },
  { to: "/admin/vehicle-approvals",label: "Vehicles",  icon: CarFront,   testid: "admin-nav-vehicles"  },
  { to: "/admin/listings",         label: "Listings",  icon: ListChecks, testid: "admin-nav-listings"  },
  { to: "/admin/leads",            label: "Leads",     icon: Users,      testid: "admin-nav-leads"     },
];

// ─── Sidebar NavLink ──────────────────────────────────────────────────────────

const SideNavItem = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <NavLink
      to={item.to}
      data-testid={item.testid}
      style={({ isActive }) => ({
        ...s.navItem.base,
        ...(isActive ? s.navItem.active : hovered ? s.navItem.hover : {}),
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <item.icon style={{ width: "16px", height: "16px", flexShrink: 0 }} />
      {item.label}
    </NavLink>
  );
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function AdminLayout() {
  const navigate = useNavigate();
  const [logoutHovered, setLogoutHovered] = useState(false);

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", backgroundColor: LIGHT_CANVAS_GREY }}
    >
      {/* ── Desktop Sidebar ── */}
      <aside style={s.sidebar} className="hidden md:block">

        {/* Logo */}
        <div style={s.sidebarHeader}>
          <span style={s.logoMark}>
            <Zap style={{ width: "16px", height: "16px" }} strokeWidth={2.5} />
          </span>
          <div>
            <p style={s.logoTitle}>ZevGrid</p>
            <p style={s.logoSub}>Admin</p>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ marginTop: "12px", padding: "0 12px", display: "flex", flexDirection: "column", gap: "2px" }}>
          {items.map((i) => <SideNavItem key={i.to} item={i} />)}
        </nav>

        {/* Logout */}
        <div style={{ position: "absolute", bottom: "16px", width: "256px", padding: "0 24px" }}>
          <button
            onClick={() => navigate("/admin/login")}
            data-testid="admin-logout-btn"
            style={{
              ...s.logoutBtn.base,
              ...(logoutHovered ? s.logoutBtn.hover : {}),
            }}
            onMouseEnter={() => setLogoutHovered(true)}
            onMouseLeave={() => setLogoutHovered(false)}
          >
            <LogOut style={{ width: "14px", height: "14px" }} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div style={{ display: "flex", minHeight: "100vh", flex: 1, flexDirection: "column", paddingBottom: "0" }}
           className="pb-16 md:pb-0"
      >
        {/* Mobile top bar */}
        <header style={s.mobileHeader} className="md:hidden">
          <Link
            to="/admin/dashboard"
            data-testid="admin-mobile-logo"
            style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
          >
            <span style={s.mobileLogoMark}>
              <Zap style={{ width: "14px", height: "14px" }} strokeWidth={2.5} />
            </span>
            <p style={{ fontSize: "0.875rem", fontWeight: 700, color: CLEAN_WHITE, letterSpacing: "-0.01em" }}>
              Zev<span style={{ color: ELECTRIC_CYAN }}>Grid</span>
              <span style={{ color: `${CLEAN_WHITE}60`, fontWeight: 400 }}> · Admin</span>
            </p>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/login")}
            data-testid="admin-mobile-logout"
            style={{ color: `${CLEAN_WHITE}80` }}
          >
            <LogOut style={{ width: "16px", height: "16px" }} />
          </Button>
        </header>

        <main style={{ flex: 1 }}>
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav data-testid="admin-bottom-nav" style={s.bottomNav} className="md:hidden">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
            {items.map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                data-testid={`${i.testid}-mobile`}
                style={({ isActive }) => ({
                  ...s.bottomNavItem.base,
                  ...(isActive ? s.bottomNavItem.active : {}),
                })}
              >
                <i.icon style={{ width: "20px", height: "20px" }} />
                {i.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}