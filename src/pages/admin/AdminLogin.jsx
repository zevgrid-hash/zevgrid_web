// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Shield, Zap } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import logo from "../../app/assets/logo.png"


// export default function AdminLogin() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("admin@zevgrid.in");
//   const [password, setPassword] = useState("admin123");

//   const submit = (e) => {
//     e.preventDefault();
//     if (!email || !password) return toast.error("Enter credentials.");
//     toast.success("Admin access granted");
//     navigate("/admin/dashboard");
//   };

//   return (
//     <div data-testid="admin-login-page" className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
//       <div className="w-full max-w-md">
//         <div className="flex items-center gap-2 text-white">
//           <span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500 text-slate-900">
//             {/* <Zap className="h-5 w-5" strokeWidth={2.5} /> */}
//              <img
//             src={logo}
//             alt="ZevGrid"
//             className="h-8 w-auto"
//           />
//           </span>
//           <div>
//             <p className="font-display text-lg font-bold">ZevGrid<span className="text-emerald-400">.</span></p>
//             <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">Admin Console</p>
//           </div>
//         </div>

//         <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-6">
//           <div className="flex items-center gap-2 text-emerald-400">
//             <Shield className="h-4 w-4" />
//             <p className="text-xs font-bold uppercase tracking-[0.25em]">Restricted access</p>
//           </div>
//           <h1 className="mt-3 font-display text-2xl font-bold text-white">Ops & moderation</h1>
//           <p className="mt-1 text-sm text-slate-400">Authorized ZevGrid operators only.</p>

//           <form onSubmit={submit} className="mt-6 space-y-4">
//             <div>
//               <Label className="text-slate-300">Email</Label>
//               <Input data-testid="admin-email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 h-11 border-slate-700 bg-slate-900 text-white placeholder:text-slate-500" />
//             </div>
//             <div>
//               <Label className="text-slate-300">Password</Label>
//               <Input data-testid="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 h-11 border-slate-700 bg-slate-900 text-white placeholder:text-slate-500" />
//             </div>
//             <Button type="submit" data-testid="admin-login-submit" className="h-12 w-full rounded-md bg-emerald-500 text-sm font-bold text-slate-900 hover:bg-emerald-400">
//               Enter console
//             </Button>
//           </form>
//           <p className="mt-4 text-center text-xs text-slate-500">Demo: any credentials work</p>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logo from "../../app/assets/logo.png";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
} from "../../app/assets/constants/zevgrid-colors";


export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@zevgrid.in");
  const [password, setPassword] = useState("admin123");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Enter credentials.");
    toast.success("Admin access granted");
    navigate("/admin/dashboard");
  };

  return (
    <div
      data-testid="admin-login-page"
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: INFRASTRUCTURE_NAVY,
        padding: "0 1rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "28rem" }}>

        {/* Logo + Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <span
            style={{
              display: "flex",
              height: "2.25rem",
              width: "2.25rem",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.375rem",
              backgroundColor: ELECTRIC_CYAN,
            }}
          >
            <img src={logo} alt="ZevGrid" style={{ height: "2rem", width: "auto" }} />
          </span>
          <div>
            <p style={{ fontSize: "1.125rem", fontWeight: 700, color: CLEAN_WHITE }}>
              ZevGrid<span style={{ color: ELECTRIC_CYAN }}>.</span>
            </p>
            <p
              style={{
                fontSize: "0.625rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: ELECTRIC_CYAN,
              }}
            >
              Admin Console
            </p>
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            marginTop: "2rem",
            borderRadius: "0.75rem",
            border: `1px solid ${ELECTRIC_CYAN}22`,
            backgroundColor: `${ENTERPRISE_CHARCOAL}CC`,
            padding: "1.5rem",
          }}
        >
          {/* Restricted badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: ELECTRIC_CYAN }}>
            <Shield style={{ height: "1rem", width: "1rem" }} />
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Restricted access
            </p>
          </div>

          <h1 style={{ marginTop: "0.75rem", fontSize: "1.5rem", fontWeight: 700, color: CLEAN_WHITE }}>
            Ops &amp; moderation
          </h1>
          <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#94A3B8" }}>
            Authorized ZevGrid operators only.
          </p>

          {/* Form */}
          <form onSubmit={submit} style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <Label style={{ color: "#CBD5E1" }}>Email</Label>
              <Input
                data-testid="admin-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  marginTop: "0.375rem",
                  height: "2.75rem",
                  border: `1px solid ${ELECTRIC_CYAN}33`,
                  backgroundColor: INFRASTRUCTURE_NAVY,
                  color: CLEAN_WHITE,
                  borderRadius: "0.5rem",
                  outline: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
                onBlur={(e) => (e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}33`)}
              />
            </div>
            <div>
              <Label style={{ color: "#CBD5E1" }}>Password</Label>
              <Input
                data-testid="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  marginTop: "0.375rem",
                  height: "2.75rem",
                  border: `1px solid ${ELECTRIC_CYAN}33`,
                  backgroundColor: INFRASTRUCTURE_NAVY,
                  color: CLEAN_WHITE,
                  borderRadius: "0.5rem",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
                onBlur={(e) => (e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}33`)}
              />
            </div>

            <Button
              type="submit"
              data-testid="admin-login-submit"
              style={{
                height: "3rem",
                width: "100%",
                borderRadius: "0.5rem",
                backgroundColor: ELECTRIC_CYAN,
                color: ENTERPRISE_CHARCOAL,
                fontSize: "0.875rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                transition: "opacity 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Enter console
            </Button>
          </form>

          <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.75rem", color: "#64748B" }}>
            Demo: any credentials work
          </p>
        </div>
      </div>
    </div>
  );
}