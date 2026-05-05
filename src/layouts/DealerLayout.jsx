// import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
// import { LayoutGrid, Package, PlusCircle, Inbox, Zap, LogOut } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const items = [
//   { to: "/dealer/dashboard", label: "Dashboard", icon: LayoutGrid, testid: "dealer-nav-dashboard" },
//   { to: "/dealer/listings", label: "My Listings", icon: Package, testid: "dealer-nav-listings" },
//   { to: "/dealer/add-vehicle", label: "Add Vehicle", icon: PlusCircle, testid: "dealer-nav-add" },
//   { to: "/dealer/inquiries", label: "Inquiries", icon: Inbox, testid: "dealer-nav-inquiries" },
// ];

// export default function DealerLayout() {
//   const navigate = useNavigate();
//   return (
//     <div className="flex min-h-screen flex-col bg-slate-50 pb-20 md:pb-0">
//       {/* Top bar */}
//       <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
//         <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//           <Link to="/dealer/dashboard" className="flex items-center gap-2" data-testid="dealer-logo">
//             <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white">
//               <Zap className="h-4 w-4" strokeWidth={2.5} />
//             </span>
//             <div className="leading-tight">
//               <p className="font-display text-base font-bold">ZevGrid.</p>
//               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">Dealer</p>
//             </div>
//           </Link>

//           <nav className="hidden items-center gap-6 md:flex">
//             {items.map((i) => (
//               <NavLink
//                 key={i.to}
//                 to={i.to}
//                 data-testid={i.testid}
//                 className={({ isActive }) =>
//                   `text-sm font-semibold transition-colors ${
//                     isActive ? "text-emerald-700" : "text-slate-600 hover:text-slate-900"
//                   }`
//                 }
//               >
//                 {i.label}
//               </NavLink>
//             ))}
//           </nav>

//           <div className="flex items-center gap-2">
//             <div className="hidden text-right sm:block">
//               <p className="text-sm font-semibold text-slate-900">GreenDrive EV</p>
//               <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Approved</p>
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => navigate("/")}
//               data-testid="dealer-logout-btn"
//               aria-label="Logout"
//             >
//               <LogOut className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="flex-1">
//         <Outlet />
//       </main>

//       {/* Mobile bottom nav */}
//       <nav
//         data-testid="dealer-bottom-nav"
//         className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white md:hidden"
//       >
//         <div className="grid grid-cols-4">
//           {items.map((i) => (
//             <NavLink
//               key={i.to}
//               to={i.to}
//               data-testid={`${i.testid}-mobile`}
//               className={({ isActive }) =>
//                 `flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-bold uppercase tracking-wider ${
//                   isActive ? "text-emerald-700" : "text-slate-500"
//                 }`
//               }
//             >
//               <i.icon className="h-5 w-5" />
//               {i.label}
//             </NavLink>
//           ))}
//         </div>
//       </nav>
//     </div>
//   );
// }
import { useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { LayoutGrid, Package, PlusCircle, Inbox, Zap, LogOut } from "lucide-react";
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
  header: {
    position: "sticky",
    top: 0,
    zIndex: 40,
    backgroundColor: CLEAN_WHITE,
    borderBottom: `1px solid ${LIGHT_CANVAS_GREY}`,
  },
  logoMark: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "32px",
    width: "32px",
    borderRadius: "8px",
    backgroundColor: INFRASTRUCTURE_NAVY,
    color: ELECTRIC_CYAN,
    flexShrink: 0,
  },
  logoTitle: {
    fontSize: "0.9375rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: INFRASTRUCTURE_NAVY,
    lineHeight: 1.2,
  },
  logoSub: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: ELECTRIC_CYAN,
  },
  navLink: {
    base: {
      fontSize: "0.875rem",
      fontWeight: 600,
      textDecoration: "none",
      color: `${ENTERPRISE_CHARCOAL}80`,
      transition: "color 150ms ease",
    },
    active: {
      color: ELECTRIC_CYAN,
    },
    hover: {
      color: ENTERPRISE_CHARCOAL,
    },
  },
  dealerName: {
    fontSize: "0.875rem",
    fontWeight: 700,
    color: INFRASTRUCTURE_NAVY,
    lineHeight: 1.2,
  },
  dealerStatus: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: ELECTRIC_CYAN,
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
      borderTop: "2px solid transparent",
    },
    active: {
      color: ELECTRIC_CYAN,
      borderTopColor: ELECTRIC_CYAN,
    },
  },
};

// ─── Nav items ────────────────────────────────────────────────────────────────

const items = [
  { to: "/dealer/dashboard",   label: "Dashboard",   icon: LayoutGrid, testid: "dealer-nav-dashboard" },
  { to: "/dealer/listings",    label: "My Listings", icon: Package,    testid: "dealer-nav-listings"  },
  { to: "/dealer/add-vehicle", label: "Add Vehicle", icon: PlusCircle, testid: "dealer-nav-add"       },
  { to: "/dealer/inquiries",   label: "Inquiries",   icon: Inbox,      testid: "dealer-nav-inquiries" },
];

// ─── Desktop NavLink wrapper ──────────────────────────────────────────────────

const DesktopNavItem = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <NavLink
      to={item.to}
      data-testid={item.testid}
      style={({ isActive }) => ({
        ...s.navLink.base,
        ...(isActive ? s.navLink.active : hovered ? s.navLink.hover : {}),
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {item.label}
    </NavLink>
  );
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function DealerLayout() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        backgroundColor: LIGHT_CANVAS_GREY,
        paddingBottom: 0,
      }}
      className="pb-20 md:pb-0"
    >
      {/* ── Top bar ── */}
      <header style={s.header}>
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            to="/dealer/dashboard"
            data-testid="dealer-logo"
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          >
            <span style={s.logoMark}>
              <Zap style={{ width: "16px", height: "16px" }} strokeWidth={2.5} />
            </span>
            <div style={{ lineHeight: 1 }}>
              <p style={s.logoTitle}>
                Zev<span style={{ color: ELECTRIC_CYAN }}>Grid</span>
              </p>
              <p style={s.logoSub}>Dealer</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {items.map((i) => <DesktopNavItem key={i.to} item={i} />)}
          </nav>

          {/* Right — dealer info + logout */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className="hidden text-right sm:block">
              <p style={s.dealerName}>GreenDrive EV</p>
              <p style={s.dealerStatus}>Approved</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              data-testid="dealer-logout-btn"
              aria-label="Logout"
            >
              <LogOut style={{ width: "16px", height: "16px" }} />
            </Button>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav
        data-testid="dealer-bottom-nav"
        style={s.bottomNav}
        className="md:hidden"
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
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
  );
}