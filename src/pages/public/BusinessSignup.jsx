// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Zap } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { toast } from "sonner";

// export default function BusinessSignup() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     company: "", contact: "", mobile: "", email: "",
//     city: "Pune", businessType: "logistics", count: "", gst: "",
//   });
//   const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

//   const submit = (e) => {
//     e.preventDefault();
//     if (!form.company || !form.mobile || !form.email) {
//       toast.error("Company, mobile and email are required.");
//       return;
//     }
//     toast.success("Account created", { description: "You can now request quotes and unlock dealer contact." });
//     navigate("/search");
//   };

//   return (
//     <div data-testid="business-signup-page" className="mx-auto max-w-xl px-4 py-10 sm:px-6">
//       <div className="flex items-center gap-2">
//         <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700 text-white">
//           <Zap className="h-4 w-4" strokeWidth={2.5} />
//         </span>
//         <p className="font-display text-lg font-bold">Business signup</p>
//       </div>
//       <h1 className="mt-4 font-display text-3xl font-bold">Create your business account</h1>
//       <p className="mt-2 text-sm text-slate-600">
//         Required only to request quotes, unlock dealer contact or shortlist vehicles.
//       </p>

//       <form onSubmit={submit} className="mt-8 space-y-5 rounded-xl border border-slate-200 bg-white p-6">
//         <div>
//           <Label htmlFor="company">Company name *</Label>
//           <Input id="company" data-testid="biz-signup-company" value={form.company} onChange={(e) => update("company", e.target.value)} className="mt-1.5 h-11" />
//         </div>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div>
//             <Label htmlFor="contact">Contact person</Label>
//             <Input id="contact" data-testid="biz-signup-contact" value={form.contact} onChange={(e) => update("contact", e.target.value)} className="mt-1.5 h-11" />
//           </div>
//           <div>
//             <Label htmlFor="mobile">Mobile *</Label>
//             <Input id="mobile" data-testid="biz-signup-mobile" type="tel" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} className="mt-1.5 h-11" />
//           </div>
//         </div>
//         <div>
//           <Label htmlFor="email">Work email *</Label>
//           <Input id="email" data-testid="biz-signup-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1.5 h-11" />
//         </div>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div>
//             <Label>City</Label>
//             <Select value={form.city} onValueChange={(v) => update("city", v)}>
//               <SelectTrigger className="mt-1.5 h-11" data-testid="biz-signup-city"><SelectValue /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Pune">Pune</SelectItem>
//                 <SelectItem value="other">Other (coming soon)</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div>
//             <Label>Business type</Label>
//             <Select value={form.businessType} onValueChange={(v) => update("businessType", v)}>
//               <SelectTrigger className="mt-1.5 h-11" data-testid="biz-signup-type"><SelectValue /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="logistics">Logistics / last-mile</SelectItem>
//                 <SelectItem value="food">Food delivery</SelectItem>
//                 <SelectItem value="quick-commerce">Quick commerce</SelectItem>
//                 <SelectItem value="passenger">Passenger transport</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div>
//             <Label htmlFor="count">Fleet size needed</Label>
//             <Input id="count" data-testid="biz-signup-count" type="number" value={form.count} onChange={(e) => update("count", e.target.value)} className="mt-1.5 h-11" />
//           </div>
//           <div>
//             <Label htmlFor="gst">GST no. (optional)</Label>
//             <Input id="gst" data-testid="biz-signup-gst" value={form.gst} onChange={(e) => update("gst", e.target.value)} placeholder="Required before booking" className="mt-1.5 h-11" />
//           </div>
//         </div>

//         <Button type="submit" data-testid="biz-signup-submit" className="h-12 w-full rounded-md bg-emerald-700 text-sm font-bold text-white hover:bg-emerald-800">
//           Create account
//         </Button>
//         <p className="text-center text-sm text-slate-600">
//           Already have an account?{" "}
//           <Link to="/business/login" data-testid="biz-signup-login-link" className="font-bold text-emerald-700 hover:underline">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../../app/assets/constants/zevgrid-colors";
import brandLogo from "../../app/assets/logo.png"; 

export default function BusinessSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company: "", contact: "", mobile: "", email: "",
    city: "Pune", businessType: "logistics", count: "", gst: "",
  });
  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.company || !form.mobile || !form.email) {
      toast.error("Company, mobile and email are required.");
      return;
    }
    toast.success("Account created", { description: "You can now request quotes and unlock dealer contact." });
    navigate("/search");
  };

  // Map constants to CSS variables for clean Tailwind integration
  const themeStyles = {
    "--cyan": ELECTRIC_CYAN,
    "--charcoal": ENTERPRISE_CHARCOAL,
    "--charcoal-light": `${ENTERPRISE_CHARCOAL}33`, // ~20% opacity for borders
    "--charcoal-muted": `${ENTERPRISE_CHARCOAL}99`, // ~60% opacity for subtext
    "--navy": INFRASTRUCTURE_NAVY,
    "--white": CLEAN_WHITE,
    "--grey": LIGHT_CANVAS_GREY,
  };

  return (
    <div data-testid="business-signup-page" style={themeStyles} className="mx-auto max-w-xl px-4 py-10 sm:px-6 text-[var(--charcoal)]">
      <div className="flex items-center gap-2">
      <img 
          src={brandLogo} 
          alt="ZevGrid Logo" 
          className="h-8 w-auto object-contain rounded-md" 
        />
        <p className="font-display text-lg font-bold">Business signup</p>
      </div>
      <h1 className="mt-4 font-display text-3xl font-bold">Create your business account</h1>
      <p className="mt-2 text-sm text-[var(--charcoal-muted)]">
        Required only to request quotes, unlock dealer contact or shortlist vehicles.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5 rounded-xl border border-[var(--charcoal-light)] bg-[var(--white)] p-6">
        <div>
          <Label htmlFor="company">Company name *</Label>
          <Input id="company" data-testid="biz-signup-company" value={form.company} onChange={(e) => update("company", e.target.value)} className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="contact">Contact person</Label>
            <Input id="contact" data-testid="biz-signup-contact" value={form.contact} onChange={(e) => update("contact", e.target.value)} className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
          </div>
          <div>
            <Label htmlFor="mobile">Mobile *</Label>
            <Input id="mobile" data-testid="biz-signup-mobile" type="tel" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Work email *</Label>
          <Input id="email" data-testid="biz-signup-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>City</Label>
            <Select value={form.city} onValueChange={(v) => update("city", v)}>
              <SelectTrigger className="mt-1.5 h-11 border-[var(--charcoal-light)] focus:ring-[var(--cyan)]" data-testid="biz-signup-city"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Pune">Pune</SelectItem>
                <SelectItem value="other">Other (coming soon)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Business type</Label>
            <Select value={form.businessType} onValueChange={(v) => update("businessType", v)}>
              <SelectTrigger className="mt-1.5 h-11 border-[var(--charcoal-light)] focus:ring-[var(--cyan)]" data-testid="biz-signup-type"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="logistics">Logistics / last-mile</SelectItem>
                <SelectItem value="food">Food delivery</SelectItem>
                <SelectItem value="quick-commerce">Quick commerce</SelectItem>
                <SelectItem value="passenger">Passenger transport</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="count">Fleet size needed</Label>
            <Input id="count" data-testid="biz-signup-count" type="number" value={form.count} onChange={(e) => update("count", e.target.value)} className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
          </div>
          <div>
            <Label htmlFor="gst">GST no. (optional)</Label>
            <Input id="gst" data-testid="biz-signup-gst" value={form.gst} onChange={(e) => update("gst", e.target.value)} placeholder="Required before booking" className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
          </div>
        </div>

        <Button type="submit" data-testid="biz-signup-submit" className="h-12 w-full rounded-md bg-[var(--cyan)] text-[var(--navy)] text-sm font-bold hover:opacity-90 transition-opacity">
          Create account
        </Button>
        <p className="text-center text-sm text-[var(--charcoal-muted)]">
          Already have an account?{" "}
          <Link to="/business/login" data-testid="biz-signup-login-link" className="font-bold text-[var(--cyan)] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}