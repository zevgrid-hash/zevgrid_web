// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Zap } from "lucide-react";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import { toast } from "sonner";

// export default function BusinessLogin() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submit = (e) => {
//     e.preventDefault();
//     if (!email || !password) return toast.error("Email and password required.");
//     toast.success("Welcome back");
//     navigate("/search");
//   };

//   return (
//     <div data-testid="business-login-page" className="mx-auto max-w-md px-4 py-14 sm:px-6">
//       <div className="flex items-center gap-2">
//         <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700 text-white">
//           <Zap className="h-4 w-4" strokeWidth={2.5} />
//         </span>
//         <p className="font-display text-lg font-bold">Business login</p>
//       </div>
//       <h1 className="mt-4 font-display text-3xl font-bold">Welcome back</h1>
//       <p className="mt-2 text-sm text-slate-600">Access your saved shortlists, quotes and requirements.</p>

//       <form onSubmit={submit} className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
//         <div>
//           <Label htmlFor="email">Work email</Label>
//           <Input id="email" data-testid="biz-login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 h-11" />
//         </div>
//         <div>
//           <Label htmlFor="password">Password</Label>
//           <Input id="password" data-testid="biz-login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 h-11" />
//         </div>
//         <Button type="submit" data-testid="biz-login-submit" className="h-12 w-full rounded-md bg-emerald-700 text-sm font-bold text-white hover:bg-emerald-800">
//           Login
//         </Button>
//         <p className="text-center text-sm text-slate-600">
//           New here?{" "}
//           <Link to="/business/signup" data-testid="biz-login-signup-link" className="font-bold text-emerald-700 hover:underline">
//             Create account
//           </Link>
//         </p>
//       </form>

//       <div className="mt-6 rounded-lg border border-dashed border-slate-300 p-4 text-xs text-slate-600">
//         <p className="font-bold uppercase tracking-widest text-slate-500">Demo</p>
//         <p className="mt-1">Use any email/password. This is a hardcoded template.</p>
//       </div>
//     </div>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// Removed Zap import
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";

import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../../app/assets/constants/zevgrid-colors";

// Import your local image here! Adjust the path as needed.
import brandLogo from "../../app/assets/logo.png"; 

export default function BusinessLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Email and password required.");
    toast.success("Welcome back");
    navigate("/search");
  };

  const themeStyles = {
    "--cyan": ELECTRIC_CYAN,
    "--charcoal": ENTERPRISE_CHARCOAL,
    "--charcoal-light": `${ENTERPRISE_CHARCOAL}33`,
    "--charcoal-muted": `${ENTERPRISE_CHARCOAL}99`,
    "--navy": INFRASTRUCTURE_NAVY,
    "--white": CLEAN_WHITE,
    "--grey": LIGHT_CANVAS_GREY,
  };

  return (
    <div data-testid="business-login-page" style={themeStyles} className="mx-auto max-w-md px-4 py-14 sm:px-6 text-[var(--charcoal)]">
      <div className="flex items-center gap-2">
        {/* Replaced Zap icon with your image */}
        <img 
          src={brandLogo} 
          alt="ZevGrid Logo" 
          className="h-8 w-auto object-contain rounded-md" 
        />
        <p className="font-display text-lg font-bold">Business login</p>
      </div>
      <h1 className="mt-4 font-display text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 text-sm text-[var(--charcoal-muted)]">Access your saved shortlists, quotes and requirements.</p>

      <form onSubmit={submit} className="mt-8 space-y-4 rounded-xl border border-[var(--charcoal-light)] bg-[var(--white)] p-6">
        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" data-testid="biz-login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" data-testid="biz-login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
        </div>
        <Button type="submit" data-testid="biz-login-submit" className="h-12 w-full rounded-md bg-[var(--cyan)] text-[var(--navy)] text-sm font-bold hover:opacity-90 transition-opacity">
          Login
        </Button>
        <p className="text-center text-sm text-[var(--charcoal-muted)]">
          New here?{" "}
          <Link to="/business/signup" data-testid="biz-login-signup-link" className="font-bold text-[var(--cyan)] hover:underline">
            Create account
          </Link>
        </p>
      </form>

      <div className="mt-6 rounded-lg border border-dashed border-[var(--charcoal-light)] bg-[var(--grey)] p-4 text-xs text-[var(--charcoal-muted)]">
        <p className="font-bold uppercase tracking-widest text-[var(--charcoal-muted)] opacity-80">Demo</p>
        <p className="mt-1">Use any email/password. This is a hardcoded template.</p>
      </div>
    </div>
  );
}