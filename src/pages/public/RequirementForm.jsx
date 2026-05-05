// import { useState } from "react";
// import { CheckCircle2 } from "lucide-react";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import { Textarea } from "../../components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
// import { toast } from "sonner";

// export default function RequirementForm() {
//   const [done, setDone] = useState(false);
//   const [form, setForm] = useState({
//     company: "",
//     contact: "",
//     mobile: "",
//     email: "",
//     city: "Pune",
//     type: "2W",
//     count: "",
//     tenure: "12",
//     budget: "",
//     useCase: "",
//     notes: "",
//   });

//   const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

//   const submit = (e) => {
//     e.preventDefault();
//     if (!form.company || !form.mobile || !form.count) {
//       toast.error("Please fill company, mobile and vehicle count.");
//       return;
//     }
//     setDone(true);
//     toast.success("Requirement received", { description: "Our ops team will reach out in 24 hours." });
//   };

//   if (done) {
//     return (
//       <div data-testid="requirement-success" className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
//         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
//           <CheckCircle2 className="h-8 w-8 text-emerald-700" />
//         </div>
//         <h1 className="mt-6 font-display text-3xl font-bold">Requirement submitted</h1>
//         <p className="mt-3 text-sm text-slate-600">
//           Thanks {form.contact || form.company}. Our Pune ops team will reach out on {form.mobile} within 24 hours with matching inventory.
//         </p>
//         <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
//           <Button
//             onClick={() => setDone(false)}
//             variant="outline"
//             data-testid="post-another-btn"
//             className="border-slate-300"
//           >
//             Post another
//           </Button>
//           <Button
//             onClick={() => (window.location.href = "/search")}
//             data-testid="browse-while-wait-btn"
//             className="bg-emerald-700 text-white hover:bg-emerald-800"
//           >
//             Browse EVs
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div data-testid="requirement-page" className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
//       <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">Fleet requirement</p>
//       <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Tell us what you need</h1>
//       <p className="mt-2 text-sm text-slate-600">
//         No signup required. Submit your fleet requirement and our ops team will match you with approved dealer inventory in Pune.
//       </p>

//       <form onSubmit={submit} className="mt-8 space-y-6 rounded-xl border border-slate-200 bg-white p-6">
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div>
//             <Label htmlFor="company">Company name *</Label>
//             <Input id="company" data-testid="req-company" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Swift Logistics Pvt Ltd" className="mt-1.5 h-11" />
//           </div>
//           <div>
//             <Label htmlFor="contact">Contact person</Label>
//             <Input id="contact" data-testid="req-contact" value={form.contact} onChange={(e) => update("contact", e.target.value)} placeholder="Full name" className="mt-1.5 h-11" />
//           </div>
//           <div>
//             <Label htmlFor="mobile">Mobile *</Label>
//             <Input id="mobile" data-testid="req-mobile" type="tel" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="+91 98xxx xxxxx" className="mt-1.5 h-11" />
//           </div>
//           <div>
//             <Label htmlFor="email">Work email</Label>
//             <Input id="email" data-testid="req-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.in" className="mt-1.5 h-11" />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//           <div>
//             <Label>Vehicle type</Label>
//             <Select value={form.type} onValueChange={(v) => update("type", v)}>
//               <SelectTrigger className="mt-1.5 h-11" data-testid="req-type"><SelectValue /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="2W">Electric 2W</SelectItem>
//                 <SelectItem value="3W">Electric 3W</SelectItem>
//                 <SelectItem value="both">Both</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div>
//             <Label htmlFor="count">No. of vehicles *</Label>
//             <Input id="count" data-testid="req-count" type="number" value={form.count} onChange={(e) => update("count", e.target.value)} placeholder="10" className="mt-1.5 h-11" />
//           </div>
//           <div>
//             <Label>Tenure (months)</Label>
//             <Select value={form.tenure} onValueChange={(v) => update("tenure", v)}>
//               <SelectTrigger className="mt-1.5 h-11" data-testid="req-tenure"><SelectValue /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="3">3 months</SelectItem>
//                 <SelectItem value="6">6 months</SelectItem>
//                 <SelectItem value="12">12 months</SelectItem>
//                 <SelectItem value="24">24 months</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div>
//             <Label htmlFor="budget">Budget (monthly / vehicle)</Label>
//             <Input id="budget" data-testid="req-budget" value={form.budget} onChange={(e) => update("budget", e.target.value)} placeholder="₹4,000" className="mt-1.5 h-11" />
//           </div>
//           <div>
//             <Label htmlFor="useCase">Use case</Label>
//             <Input id="useCase" data-testid="req-usecase" value={form.useCase} onChange={(e) => update("useCase", e.target.value)} placeholder="Last-mile delivery, food, cargo..." className="mt-1.5 h-11" />
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="notes">Additional notes</Label>
//           <Textarea id="notes" data-testid="req-notes" value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Operating hours, charging support, brand preferences..." className="mt-1.5 min-h-[100px]" />
//         </div>

//         <Button
//           type="submit"
//           data-testid="req-submit-btn"
//           className="h-12 w-full rounded-md bg-emerald-700 text-sm font-bold text-white hover:bg-emerald-800 sm:w-auto sm:px-10"
//         >
//           Submit requirement
//         </Button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { toast } from "sonner";

import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
} from "../../app/assets/constants/zevgrid-colors";

export default function RequirementForm() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    company: "",
    contact: "",
    mobile: "",
    email: "",
    city: "Pune",
    type: "2W",
    count: "",
    tenure: "12",
    budget: "",
    useCase: "",
    notes: "",
  });

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.company || !form.mobile || !form.count) {
      toast.error("Please fill company, mobile and vehicle count.");
      return;
    }
    setDone(true);
    toast.success("Requirement received", { description: "Our ops team will reach out in 24 hours." });
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
    "--emerald": ACTIVE_EMERALD,
    "--emerald-light": `${ACTIVE_EMERALD}1A`,       // ~10% opacity for success bg
  };

  if (done) {
    return (
      <div 
        data-testid="requirement-success" 
        style={themeStyles} 
        className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 text-[var(--charcoal)]"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--emerald-light)]">
          <CheckCircle2 className="h-8 w-8 text-[var(--emerald)]" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Requirement submitted</h1>
        <p className="mt-3 text-sm text-[var(--charcoal-muted)]">
          Thanks {form.contact || form.company}. Our Pune ops team will reach out on {form.mobile} within 24 hours with matching inventory.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            onClick={() => setDone(false)}
            variant="outline"
            data-testid="post-another-btn"
            className="border-[var(--charcoal-light)] text-[var(--charcoal)] hover:bg-[var(--grey)]"
          >
            Post another
          </Button>
          <Button
            onClick={() => (window.location.href = "/search")}
            data-testid="browse-while-wait-btn"
            className="bg-[var(--cyan)] text-[var(--navy)] hover:opacity-90 font-bold"
          >
            Browse EVs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      data-testid="requirement-page" 
      style={themeStyles} 
      className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 text-[var(--charcoal)]"
    >
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--cyan)]">Fleet requirement</p>
      <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Tell us what you need</h1>
      <p className="mt-2 text-sm text-[var(--charcoal-muted)]">
        No signup required. Submit your fleet requirement and our ops team will match you with approved dealer inventory in Pune.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-6 rounded-xl border border-[var(--charcoal-light)] bg-[var(--white)] p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="company">Company name *</Label>
            <Input id="company" data-testid="req-company" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Swift Logistics Pvt Ltd" className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
          </div>
          <div>
            <Label htmlFor="contact">Contact person</Label>
            <Input id="contact" data-testid="req-contact" value={form.contact} onChange={(e) => update("contact", e.target.value)} placeholder="Full name" className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
          </div>
          <div>
            <Label htmlFor="mobile">Mobile *</Label>
            <Input id="mobile" data-testid="req-mobile" type="tel" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="+91 98xxx xxxxx" className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
          </div>
          <div>
            <Label htmlFor="email">Work email</Label>
            <Input id="email" data-testid="req-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.in" className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label>Vehicle type</Label>
            <Select value={form.type} onValueChange={(v) => update("type", v)}>
              <SelectTrigger className="mt-1.5 h-11 border-[var(--charcoal-light)] focus:ring-[var(--cyan)]" data-testid="req-type"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2W">Electric 2W</SelectItem>
                <SelectItem value="3W">Electric 3W</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="count">No. of vehicles *</Label>
            <Input id="count" data-testid="req-count" type="number" value={form.count} onChange={(e) => update("count", e.target.value)} placeholder="10" className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
          </div>
          <div>
            <Label>Tenure (months)</Label>
            <Select value={form.tenure} onValueChange={(v) => update("tenure", v)}>
              <SelectTrigger className="mt-1.5 h-11 border-[var(--charcoal-light)] focus:ring-[var(--cyan)]" data-testid="req-tenure"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 months</SelectItem>
                <SelectItem value="6">6 months</SelectItem>
                <SelectItem value="12">12 months</SelectItem>
                <SelectItem value="24">24 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="budget">Budget (monthly / vehicle)</Label>
            <Input id="budget" data-testid="req-budget" value={form.budget} onChange={(e) => update("budget", e.target.value)} placeholder="₹4,000" className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
          </div>
          <div>
            <Label htmlFor="useCase">Use case</Label>
            <Input id="useCase" data-testid="req-usecase" value={form.useCase} onChange={(e) => update("useCase", e.target.value)} placeholder="Last-mile delivery, food, cargo..." className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
          </div>
        </div>

        <div>
          <Label htmlFor="notes">Additional notes</Label>
          <Textarea id="notes" data-testid="req-notes" value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Operating hours, charging support, brand preferences..." className="mt-1.5 min-h-[100px] border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
        </div>

        <Button
          type="submit"
          data-testid="req-submit-btn"
          className="h-12 w-full rounded-md bg-[var(--cyan)] text-[var(--navy)] text-sm font-bold hover:opacity-90 transition-opacity sm:w-auto sm:px-10"
        >
          Submit requirement
        </Button>
      </form>
    </div>
  );
}
