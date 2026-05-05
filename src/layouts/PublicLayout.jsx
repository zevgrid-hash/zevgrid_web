// import { Outlet, Link } from "react-router-dom";
// import PublicHeader from "../components/PublicHeader";
// import { Zap } from "lucide-react";
// import logo from "../app/assets/logo.png"

// export default function PublicLayout() {
//   return (
//     <div className="flex min-h-screen flex-col bg-slate-50">
//       <PublicHeader />
//       <main className="flex-1">
//         <Outlet />
//       </main>
//       <footer
//         data-testid="public-footer"
//         className="border-t border-slate-200 bg-white"
//       >
//         <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 md:grid-cols-4 lg:px-8">
//           <div className="sm:col-span-2">
//             <div className="flex items-center gap-2">
//               <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700 text-white">
//                 {/* <Zap className="h-4 w-4" strokeWidth={2.5} /> */}
//                 <img
//             src={logo}
//             alt="ZevGrid"
//             className="h-8 w-auto"
//           />
//               </span>
//               <span className="font-display text-lg font-bold">
//                 ZevGrid<span className="text-emerald-700">.</span>
//               </span>
//             </div>
//             <p className="mt-3 max-w-sm text-sm text-slate-600">
//               India's managed EV leasing marketplace for businesses. Currently
//               live in Pune, serving 2W and 3W commercial fleets.
//             </p>
//           </div>
//           <div>
//             <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
//               For Businesses
//             </p>
//             <ul className="mt-3 space-y-2 text-sm text-slate-700">
//               <li><Link to="/search">Browse EVs</Link></li>
//               <li><Link to="/requirement">Post Requirement</Link></li>
//               <li><Link to="/business/signup">Sign up</Link></li>
//             </ul>
//           </div>
//           <div>
//             <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
//               For Dealers
//             </p>
//             <ul className="mt-3 space-y-2 text-sm text-slate-700">
//               <li><Link to="/dealer/signup">Join as Dealer</Link></li>
//               <li><Link to="/dealer/dashboard">Dealer Portal</Link></li>
//               <li><Link to="/admin/login">Admin Portal</Link></li>
//             </ul>
//           </div>
//         </div>
//         <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
//           © 2026 ZevGrid 
//         </div>
//       </footer>
//     </div>
//   );
// }
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import PublicHeader from "../components/PublicHeader";
import logo from "../app/assets/logo.png";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../app/assets/constants/zevgrid-colors";


// ─── Style tokens ─────────────────────────────────────────────────────────────

const s = {
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    backgroundColor: LIGHT_CANVAS_GREY,
  },
  footer: {
    backgroundColor: CLEAN_WHITE,
    borderTop: `1px solid ${LIGHT_CANVAS_GREY}`,
  },
  logoMark: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "32px",
    width: "32px",
    borderRadius: "8px",
    backgroundColor: INFRASTRUCTURE_NAVY,
    overflow: "hidden",
    flexShrink: 0,
  },
  logoText: {
    fontSize: "1.0625rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: INFRASTRUCTURE_NAVY,
  },
  tagline: {
    marginTop: "12px",
    maxWidth: "320px",
    fontSize: "0.875rem",
    lineHeight: 1.6,
    color: `${ENTERPRISE_CHARCOAL}99`,
  },
  colHeading: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: `${ENTERPRISE_CHARCOAL}66`,
  },
  footerLink: {
    display: "block",
    fontSize: "0.875rem",
    color: ENTERPRISE_CHARCOAL,
    textDecoration: "none",
    transition: "color 150ms ease",
  },
  footerLinkHover: {
    color: ELECTRIC_CYAN,
  },
  divider: {
    borderTop: `1px solid ${LIGHT_CANVAS_GREY}`,
    padding: "16px 0",
    textAlign: "center",
    fontSize: "11px",
    color: `${ENTERPRISE_CHARCOAL}55`,
  },
};

// ─── Hoverable footer link ────────────────────────────────────────────────────

const FooterLink = ({ to, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      style={{ ...s.footerLink, ...(hovered ? s.footerLinkHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function PublicLayout() {
  return (
    <div style={s.root}>
      <PublicHeader />

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer data-testid="public-footer" style={s.footer}>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 md:grid-cols-4 lg:px-8">

          {/* Brand blurb */}
          <div className="sm:col-span-2">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={s.logoMark}>
                <img src={logo} alt="ZevGrid" className="h-8 w-auto" />
              </span>
              <span style={s.logoText}>
                Zev<span style={{ color: ELECTRIC_CYAN }}>Grid</span>
              </span>
            </div>
            <p style={s.tagline}>
              India's managed EV leasing marketplace for businesses. Currently
              live in Pune, serving 2W and 3W commercial fleets.
            </p>
          </div>

          {/* For Businesses */}
          <div>
            <p style={s.colHeading}>For Businesses</p>
            <ul style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px", listStyle: "none", padding: 0 }}>
              <li><FooterLink to="/search">Browse EVs</FooterLink></li>
              <li><FooterLink to="/requirement">Post Requirement</FooterLink></li>
              <li><FooterLink to="/business/signup">Sign up</FooterLink></li>
            </ul>
          </div>

          {/* For Dealers */}
          <div>
            <p style={s.colHeading}>For Dealers</p>
            <ul style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px", listStyle: "none", padding: 0 }}>
              <li><FooterLink to="/dealer/signup">Join as Dealer</FooterLink></li>
              <li><FooterLink to="/dealer/dashboard">Dealer Portal</FooterLink></li>
              <li><FooterLink to="/admin/login">Admin Portal</FooterLink></li>
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div style={s.divider}>
          © 2026 ZevGrid · Fleet Leasing &amp; Telematics
        </div>
      </footer>
    </div>
  );
}