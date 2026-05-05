// import { Link, NavLink } from "react-router-dom";
// import { Menu, X, Zap } from "lucide-react";
// import { useState } from "react";
// import { Button } from "../components/ui/button";
// import logo from "../app/assets/logo.png"

// export const PublicHeader = () => {
//   const [open, setOpen] = useState(false);

//   const links = [
//     { to: "/", label: "Home" },
//     { to: "/search", label: "Browse EVs" },
//     { to: "/requirement", label: "Post Requirement" },
//     { to: "/dealer/signup", label: "For Dealers" },
//   ];

//   return (
//     <header
//       data-testid="public-header"
//       className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl"
//     >
//       <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//         <Link
//           to="/"
//           data-testid="header-logo"
//           className="flex items-center gap-2"
//         >
//           <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700 text-white">
//              <img
//             src={logo}
//             alt="ZevGrid"
//             className="h-8 w-auto"
//           />
//           </span>
//           <span className="font-display text-lg font-bold tracking-tight">
//             ZevGrid<span className="text-emerald-700"></span>
//           </span>
//         </Link>

//         <nav className="hidden items-center gap-8 md:flex">
//           {links.map((l) => (
//             <NavLink
//               key={l.to}
//               to={l.to}
//               end={l.to === "/"}
//               className={({ isActive }) =>
//                 `text-sm font-semibold transition-colors ${
//                   isActive ? "text-emerald-700" : "text-slate-600 hover:text-slate-900"
//                 }`
//               }
//               data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
//             >
//               {l.label}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="hidden items-center gap-2 md:flex">
//           <Link to="/business/login">
//             <Button
//               variant="ghost"
//               className="text-sm font-semibold"
//               data-testid="header-login-btn"
//             >
//               Login
//             </Button>
//           </Link>
//           <Link to="/business/signup">
//             <Button
//               className="rounded-md bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800"
//               data-testid="header-signup-btn"
//             >
//               Get Started
//             </Button>
//           </Link>
//         </div>

//         <button
//           onClick={() => setOpen((v) => !v)}
//           className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 md:hidden"
//           data-testid="mobile-menu-toggle"
//           aria-label="Toggle menu"
//         >
//           {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//         </button>
//       </div>

//       {open && (
//         <div
//           data-testid="mobile-menu-panel"
//           className="border-t border-slate-200 bg-white md:hidden"
//         >
//           <div className="space-y-1 px-4 py-4">
//             {links.map((l) => (
//               <NavLink
//                 key={l.to}
//                 to={l.to}
//                 end={l.to === "/"}
//                 onClick={() => setOpen(false)}
//                 className={({ isActive }) =>
//                   `block rounded-md px-3 py-3 text-sm font-semibold ${
//                     isActive
//                       ? "bg-emerald-50 text-emerald-700"
//                       : "text-slate-700 hover:bg-slate-50"
//                   }`
//                 }
//                 data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
//               >
//                 {l.label}
//               </NavLink>
//             ))}
//             <div className="grid grid-cols-2 gap-2 pt-3">
//               <Link to="/business/login" onClick={() => setOpen(false)}>
//                 <Button
//                   variant="outline"
//                   className="w-full border-slate-300"
//                   data-testid="mobile-login-btn"
//                 >
//                   Login
//                 </Button>
//               </Link>
//               <Link to="/business/signup" onClick={() => setOpen(false)}>
//                 <Button
//                   className="w-full bg-emerald-700 text-white hover:bg-emerald-800"
//                   data-testid="mobile-signup-btn"
//                 >
//                   Get Started
//                 </Button>
//               </Link>
//             </div>
//             <div className="mt-3 border-t border-slate-200 pt-3">
//               <Link
//                 to="/admin/login"
//                 onClick={() => setOpen(false)}
//                 className="block px-3 py-2 text-xs font-semibold uppercase tracking-widest text-slate-500"
//                 data-testid="mobile-admin-link"
//               >
//                 Admin Portal →
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default PublicHeader;
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import logo from "../app/assets/logo.png"

import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../app/assets/constants/zevgrid-colors";

export const PublicHeader = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/search", label: "Browse EVs" },
    { to: "/requirement", label: "Post Requirement" },
    { to: "/dealer/signup", label: "For Dealers" },
  ];

  // Map constants to CSS variables for clean Tailwind integration
  const themeStyles = {
    "--cyan": ELECTRIC_CYAN,
    "--cyan-light": `${ELECTRIC_CYAN}1A`,       // ~10% opacity for active link bg
    "--charcoal": ENTERPRISE_CHARCOAL,
    "--charcoal-light": `${ENTERPRISE_CHARCOAL}33`, // ~20% opacity for borders
    "--charcoal-muted": `${ENTERPRISE_CHARCOAL}99`, // ~60% opacity for subtext
    "--navy": INFRASTRUCTURE_NAVY,
    "--white": CLEAN_WHITE,
    "--white-translucent": `${CLEAN_WHITE}E6`,  // 90% opacity for backdrop blur
    "--grey": LIGHT_CANVAS_GREY,
  };

  return (
    <header
      data-testid="public-header"
      style={{ ...themeStyles, backgroundColor: "var(--white-translucent)" }}
      className="sticky top-0 z-50 w-full border-b border-[var(--charcoal-light)] backdrop-blur-xl text-[var(--charcoal)]"
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          data-testid="header-logo"
          className="flex items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--cyan)]">
             <img
              src={logo}
              alt="ZevGrid"
              className="h-8 w-auto object-contain rounded-md"
            />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-[var(--navy)]">
            ZevGrid
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive 
                    ? "text-[var(--cyan)]" 
                    : "text-[var(--charcoal-muted)] hover:text-[var(--charcoal)]"
                }`
              }
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/business/login">
            <Button
              variant="ghost"
              className="text-sm font-semibold text-[var(--charcoal)] hover:bg-[var(--grey)]"
              data-testid="header-login-btn"
            >
              Login
            </Button>
          </Link>
          <Link to="/business/signup">
            <Button
              className="rounded-md bg-[var(--cyan)] text-sm font-semibold text-[var(--navy)] hover:opacity-90 transition-opacity"
              data-testid="header-signup-btn"
            >
              Get Started
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--charcoal-light)] text-[var(--charcoal)] md:hidden hover:bg-[var(--grey)]"
          data-testid="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          data-testid="mobile-menu-panel"
          className="border-t border-[var(--charcoal-light)] bg-[var(--white)] md:hidden"
        >
          <div className="space-y-1 px-4 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[var(--cyan-light)] text-[var(--navy)]"
                      : "text-[var(--charcoal)] hover:bg-[var(--grey)]"
                  }`
                }
                data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {l.label}
              </NavLink>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-3">
              <Link to="/business/login" onClick={() => setOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-[var(--charcoal-light)] text-[var(--charcoal)] hover:bg-[var(--grey)]"
                  data-testid="mobile-login-btn"
                >
                  Login
                </Button>
              </Link>
              <Link to="/business/signup" onClick={() => setOpen(false)}>
                <Button
                  className="w-full bg-[var(--cyan)] text-[var(--navy)] hover:opacity-90 transition-opacity"
                  data-testid="mobile-signup-btn"
                >
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="mt-3 border-t border-[var(--charcoal-light)] pt-3">
              <Link
                to="/admin/login"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-xs font-semibold uppercase tracking-widest text-[var(--charcoal-muted)] hover:text-[var(--charcoal)] transition-colors"
                data-testid="mobile-admin-link"
              >
                Admin Portal →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;