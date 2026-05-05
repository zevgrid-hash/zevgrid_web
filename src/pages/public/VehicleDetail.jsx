// import { useParams, Link, useNavigate } from "react-router-dom";
// import { ArrowLeft, Battery, Zap, Calendar, MapPin, Shield, Lock, FileCheck, Package, Check } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import StatusBadge from "../../components/StatusBadge";
// import { VEHICLES } from "../../data/mockData";
// import { toast } from "sonner";

// export default function VehicleDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const vehicle = VEHICLES.find((v) => v.id === id) || VEHICLES[0];

//   const handleGated = (action) => {
//     toast.info(`Sign up to ${action}`, {
//       description: "Business signup required to unlock this.",
//       action: {
//         label: "Sign up",
//         onClick: () => navigate("/business/signup"),
//       },
//     });
//   };

//   return (
//     <div data-testid="vehicle-detail-page" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//       <button
//         onClick={() => navigate(-1)}
//         data-testid="vehicle-detail-back"
//         className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
//       >
//         <ArrowLeft className="h-4 w-4" /> Back to listings
//       </button>

//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
//         {/* Image + gallery */}
//         <div>
//           <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
//             <img src={vehicle.image} alt={vehicle.model} className="h-full w-full object-cover" />
//             <div className="absolute left-4 top-4 flex gap-2">
//               <StatusBadge status={vehicle.availability} />
//               <span className="rounded-md bg-slate-900/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
//                 {vehicle.type}
//               </span>
//             </div>
//           </div>
//           <div className="mt-3 grid grid-cols-4 gap-2">
//             {[0, 1, 2, 3].map((i) => (
//               <div key={i} className="aspect-square overflow-hidden rounded-md border border-slate-200 bg-slate-100">
//                 <img src={vehicle.image} alt="" className="h-full w-full object-cover opacity-90" />
//               </div>
//             ))}
//           </div>
//           <p className="mt-2 text-xs text-slate-500">{vehicle.photos} photos available</p>
//         </div>

//         {/* Details */}
//         <div>
//           <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">{vehicle.brand}</p>
//           <h1 className="mt-1 font-display text-3xl font-bold leading-tight sm:text-4xl">
//             {vehicle.model}
//           </h1>
//           <p className="mt-1 text-sm text-slate-600">{vehicle.variant} · {vehicle.year} · {vehicle.condition}</p>

//           <div className="mt-4 flex items-center gap-1 text-sm text-slate-600">
//             <MapPin className="h-4 w-4" /> {vehicle.city}
//           </div>

//           <div className="mt-6 flex items-baseline gap-3 border-y border-slate-200 py-5">
//             <p className="font-display text-4xl font-bold text-emerald-700">
//               ₹{vehicle.monthlyRent.toLocaleString("en-IN")}
//             </p>
//             <p className="text-sm font-semibold text-slate-500">/month · min {vehicle.minTenure} months</p>
//           </div>

//           <div className="mt-5 grid grid-cols-2 gap-3">
//             <div className="rounded-lg border border-slate-200 bg-white p-3">
//               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
//                 <Zap className="h-3.5 w-3.5 text-emerald-700" /> Range
//               </div>
//               <p className="mt-1 font-display text-xl font-bold">{vehicle.claimedRange} km</p>
//             </div>
//             <div className="rounded-lg border border-slate-200 bg-white p-3">
//               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
//                 <Battery className="h-3.5 w-3.5 text-emerald-700" /> Battery
//               </div>
//               <p className="mt-1 font-display text-xl font-bold">{vehicle.batteryCapacity}</p>
//             </div>
//             <div className="rounded-lg border border-slate-200 bg-white p-3">
//               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
//                 <Calendar className="h-3.5 w-3.5 text-emerald-700" /> Tenure
//               </div>
//               <p className="mt-1 font-display text-xl font-bold">{vehicle.minTenure} months</p>
//             </div>
//             <div className="rounded-lg border border-slate-200 bg-white p-3">
//               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
//                 <Package className="h-3.5 w-3.5 text-emerald-700" /> Payload
//               </div>
//               <p className="mt-1 font-display text-base font-bold">{vehicle.payload}</p>
//             </div>
//           </div>

//           <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-sm">
//             <div className="flex items-center justify-between">
//               <span className="text-slate-600">Security deposit</span>
//               <span className="font-bold">₹{vehicle.securityDeposit.toLocaleString("en-IN")}</span>
//             </div>
//             <div className="mt-2 flex items-center justify-between">
//               <span className="text-slate-600">Quantity available</span>
//               <span className="font-bold">{vehicle.quantity} units</span>
//             </div>
//             <div className="mt-2 flex items-center justify-between">
//               <span className="text-slate-600">Insurance</span>
//               <span className="font-bold">{vehicle.insurance}</span>
//             </div>
//           </div>

//           {/* Gated section */}
//           <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
//             <div className="flex items-center gap-2">
//               <Lock className="h-4 w-4 text-slate-500" />
//               <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Locked until signup</p>
//             </div>
//             <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
//               <li className="flex items-center gap-2"><FileCheck className="h-3.5 w-3.5" /> Dealer identity & direct contact</li>
//               <li className="flex items-center gap-2"><FileCheck className="h-3.5 w-3.5" /> Full RC & compliance documents</li>
//               <li className="flex items-center gap-2"><FileCheck className="h-3.5 w-3.5" /> Custom commercial terms</li>
//               <li className="flex items-center gap-2"><FileCheck className="h-3.5 w-3.5" /> Precise vehicle location</li>
//             </ul>
//           </div>

//           <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <Button
//               onClick={() => handleGated("get a quote")}
//               data-testid="vehicle-get-quote-btn"
//               className="h-12 rounded-md bg-emerald-700 text-sm font-bold text-white hover:bg-emerald-800"
//             >
//               Get Quote
//             </Button>
//             <Button
//               onClick={() => handleGated("unlock dealer contact")}
//               variant="outline"
//               data-testid="vehicle-unlock-dealer-btn"
//               className="h-12 rounded-md border-2 border-slate-900 text-sm font-bold text-slate-900 hover:bg-slate-50"
//             >
//               Unlock Dealer
//             </Button>
//           </div>
//         </div>
//       </div>

//       <Tabs defaultValue="specs" className="mt-10">
//         <TabsList className="w-full justify-start rounded-none border-b border-slate-200 bg-transparent p-0">
//           <TabsTrigger value="specs" data-testid="tab-specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-700 data-[state=active]:bg-transparent data-[state=active]:text-emerald-700">Specifications</TabsTrigger>
//           <TabsTrigger value="notes" data-testid="tab-notes" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-700 data-[state=active]:bg-transparent data-[state=active]:text-emerald-700">Condition</TabsTrigger>
//           <TabsTrigger value="terms" data-testid="tab-terms" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-700 data-[state=active]:bg-transparent data-[state=active]:text-emerald-700">Terms</TabsTrigger>
//         </TabsList>
//         <TabsContent value="specs" className="py-6">
//           <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
//             {[
//               ["Brand", vehicle.brand],
//               ["Model", vehicle.model],
//               ["Variant", vehicle.variant],
//               ["Year", vehicle.year],
//               ["Battery", vehicle.batteryCapacity],
//               ["Claimed Range", `${vehicle.claimedRange} km`],
//               ["Payload", vehicle.payload],
//               ["Condition", vehicle.condition],
//               ["Registration", vehicle.registration],
//             ].map(([k, v]) => (
//               <div key={k} className="rounded-md border border-slate-200 bg-white p-3">
//                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{k}</p>
//                 <p className="mt-1 text-sm font-semibold text-slate-900">{v}</p>
//               </div>
//             ))}
//           </dl>
//         </TabsContent>
//         <TabsContent value="notes" className="py-6">
//           <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-700">
//             <div className="flex items-center gap-2">
//               <Shield className="h-4 w-4 text-emerald-700" />
//               <p className="font-bold">Dealer-disclosed condition</p>
//             </div>
//             <p className="mt-3">{vehicle.notes}</p>
//           </div>
//         </TabsContent>
//         <TabsContent value="terms" className="py-6">
//           <ul className="space-y-2 text-sm text-slate-700">
//             {[
//               `Minimum tenure: ${vehicle.minTenure} months`,
//               `Security deposit: ₹${vehicle.securityDeposit.toLocaleString("en-IN")} refundable`,
//               "Insurance included in monthly rent",
//               "Charger & installation support available",
//               "Early termination: as per lease contract",
//             ].map((t) => (
//               <li key={t} className="flex items-start gap-2">
//                 <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
//                 {t}
//               </li>
//             ))}
//           </ul>
//         </TabsContent>
//       </Tabs>

//       {/* Sticky mobile bottom CTA */}
//       <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white p-3 sm:hidden">
//         <div className="grid grid-cols-2 gap-2">
//           <Button
//             onClick={() => handleGated("unlock dealer contact")}
//             variant="outline"
//             data-testid="sticky-unlock-btn"
//             className="h-11 border-slate-900 text-sm font-bold"
//           >
//             Unlock
//           </Button>
//           <Button
//             onClick={() => handleGated("get a quote")}
//             data-testid="sticky-quote-btn"
//             className="h-11 bg-emerald-700 text-sm font-bold text-white hover:bg-emerald-800"
//           >
//             Get Quote
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Battery, Zap, Calendar, MapPin, Shield, Lock, FileCheck, Package, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StatusBadge from "../../components/StatusBadge";
import { VEHICLES } from "../../data/mockData";
import { toast } from "sonner";

import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../../app/assets/constants/zevgrid-colors";

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = VEHICLES.find((v) => v.id === id) || VEHICLES[0];

  const handleGated = (action) => {
    toast.info(`Sign up to ${action}`, {
      description: "Business signup required to unlock this.",
      action: {
        label: "Sign up",
        onClick: () => navigate("/business/signup"),
      },
    });
  };

  // Map constants to CSS variables for clean Tailwind integration
  const themeStyles = {
    "--cyan": ELECTRIC_CYAN,
    "--charcoal": ENTERPRISE_CHARCOAL,
    "--charcoal-light": `${ENTERPRISE_CHARCOAL}33`, // ~20% opacity for borders
    "--charcoal-muted": `${ENTERPRISE_CHARCOAL}99`, // ~60% opacity for subtext
    "--navy": INFRASTRUCTURE_NAVY,
    "--navy-muted": `${INFRASTRUCTURE_NAVY}E6`,     // ~90% opacity for badges
    "--white": CLEAN_WHITE,
    "--grey": LIGHT_CANVAS_GREY,
  };

  return (
    <div data-testid="vehicle-detail-page" style={themeStyles} className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-[var(--charcoal)]">
      <button
        onClick={() => navigate(-1)}
        data-testid="vehicle-detail-back"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--charcoal-muted)] hover:text-[var(--charcoal)] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to listings
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* Image + gallery */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--charcoal-light)] bg-[var(--grey)]">
            <img src={vehicle.image} alt={vehicle.model} className="h-full w-full object-cover" />
            <div className="absolute left-4 top-4 flex gap-2">
              <StatusBadge status={vehicle.availability} />
              <span className="rounded-md bg-[var(--navy-muted)] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--white)] backdrop-blur">
                {vehicle.type}
              </span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-md border border-[var(--charcoal-light)] bg-[var(--grey)]">
                <img src={vehicle.image} alt="" className="h-full w-full object-cover opacity-90" />
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-[var(--charcoal-muted)]">{vehicle.photos} photos available</p>
        </div>

        {/* Details */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--charcoal-muted)]">{vehicle.brand}</p>
          <h1 className="mt-1 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {vehicle.model}
          </h1>
          <p className="mt-1 text-sm text-[var(--charcoal-muted)]">{vehicle.variant} · {vehicle.year} · {vehicle.condition}</p>

          <div className="mt-4 flex items-center gap-1 text-sm text-[var(--charcoal-muted)]">
            <MapPin className="h-4 w-4 text-[var(--cyan)]" /> {vehicle.city}
          </div>

          <div className="mt-6 flex items-baseline gap-3 border-y border-[var(--charcoal-light)] py-5">
            <p className="font-display text-4xl font-bold text-[var(--cyan)]">
              ₹{vehicle.monthlyRent.toLocaleString("en-IN")}
            </p>
            <p className="text-sm font-semibold text-[var(--charcoal-muted)]">/month · min {vehicle.minTenure} months</p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-[var(--charcoal-light)] bg-[var(--white)] p-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--charcoal-muted)]">
                <Zap className="h-3.5 w-3.5 text-[var(--cyan)]" /> Range
              </div>
              <p className="mt-1 font-display text-xl font-bold">{vehicle.claimedRange} km</p>
            </div>
            <div className="rounded-lg border border-[var(--charcoal-light)] bg-[var(--white)] p-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--charcoal-muted)]">
                <Battery className="h-3.5 w-3.5 text-[var(--cyan)]" /> Battery
              </div>
              <p className="mt-1 font-display text-xl font-bold">{vehicle.batteryCapacity}</p>
            </div>
            <div className="rounded-lg border border-[var(--charcoal-light)] bg-[var(--white)] p-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--charcoal-muted)]">
                <Calendar className="h-3.5 w-3.5 text-[var(--cyan)]" /> Tenure
              </div>
              <p className="mt-1 font-display text-xl font-bold">{vehicle.minTenure} months</p>
            </div>
            <div className="rounded-lg border border-[var(--charcoal-light)] bg-[var(--white)] p-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--charcoal-muted)]">
                <Package className="h-3.5 w-3.5 text-[var(--cyan)]" /> Payload
              </div>
              <p className="mt-1 font-display text-base font-bold">{vehicle.payload}</p>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-[var(--charcoal-light)] bg-[var(--white)] p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[var(--charcoal-muted)]">Security deposit</span>
              <span className="font-bold">₹{vehicle.securityDeposit.toLocaleString("en-IN")}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[var(--charcoal-muted)]">Quantity available</span>
              <span className="font-bold">{vehicle.quantity} units</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[var(--charcoal-muted)]">Insurance</span>
              <span className="font-bold">{vehicle.insurance}</span>
            </div>
          </div>

          {/* Gated section */}
          <div className="mt-5 rounded-lg border border-dashed border-[var(--charcoal-muted)] bg-[var(--grey)] p-4">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[var(--charcoal-muted)]" />
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--charcoal-muted)]">Locked until signup</p>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-[var(--charcoal-muted)]">
              <li className="flex items-center gap-2"><FileCheck className="h-3.5 w-3.5" /> Dealer identity & direct contact</li>
              <li className="flex items-center gap-2"><FileCheck className="h-3.5 w-3.5" /> Full RC & compliance documents</li>
              <li className="flex items-center gap-2"><FileCheck className="h-3.5 w-3.5" /> Custom commercial terms</li>
              <li className="flex items-center gap-2"><FileCheck className="h-3.5 w-3.5" /> Precise vehicle location</li>
            </ul>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              onClick={() => handleGated("get a quote")}
              data-testid="vehicle-get-quote-btn"
              className="h-12 rounded-md bg-[var(--cyan)] text-[var(--navy)] text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Get Quote
            </Button>
            <Button
              onClick={() => handleGated("unlock dealer contact")}
              variant="outline"
              data-testid="vehicle-unlock-dealer-btn"
              className="h-12 rounded-md border-2 border-[var(--charcoal)] text-[var(--charcoal)] text-sm font-bold hover:bg-[var(--grey)]"
            >
              Unlock Dealer
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="specs" className="mt-10">
        <TabsList className="w-full justify-start rounded-none border-b border-[var(--charcoal-light)] bg-transparent p-0">
          <TabsTrigger value="specs" data-testid="tab-specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--cyan)] data-[state=active]:bg-transparent data-[state=active]:text-[var(--cyan)]">Specifications</TabsTrigger>
          <TabsTrigger value="notes" data-testid="tab-notes" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--cyan)] data-[state=active]:bg-transparent data-[state=active]:text-[var(--cyan)]">Condition</TabsTrigger>
          <TabsTrigger value="terms" data-testid="tab-terms" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--cyan)] data-[state=active]:bg-transparent data-[state=active]:text-[var(--cyan)]">Terms</TabsTrigger>
        </TabsList>
        <TabsContent value="specs" className="py-6">
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              ["Brand", vehicle.brand],
              ["Model", vehicle.model],
              ["Variant", vehicle.variant],
              ["Year", vehicle.year],
              ["Battery", vehicle.batteryCapacity],
              ["Claimed Range", `${vehicle.claimedRange} km`],
              ["Payload", vehicle.payload],
              ["Condition", vehicle.condition],
              ["Registration", vehicle.registration],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md border border-[var(--charcoal-light)] bg-[var(--white)] p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--charcoal-muted)]">{k}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--charcoal)]">{v}</p>
              </div>
            ))}
          </dl>
        </TabsContent>
        <TabsContent value="notes" className="py-6">
          <div className="rounded-md border border-[var(--charcoal-light)] bg-[var(--white)] p-5 text-sm text-[var(--charcoal)]">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[var(--cyan)]" />
              <p className="font-bold">Dealer-disclosed condition</p>
            </div>
            <p className="mt-3">{vehicle.notes}</p>
          </div>
        </TabsContent>
        <TabsContent value="terms" className="py-6">
          <ul className="space-y-2 text-sm text-[var(--charcoal-muted)]">
            {[
              `Minimum tenure: ${vehicle.minTenure} months`,
              `Security deposit: ₹${vehicle.securityDeposit.toLocaleString("en-IN")} refundable`,
              "Insurance included in monthly rent",
              "Charger & installation support available",
              "Early termination: as per lease contract",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cyan)]" />
                {t}
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>

      {/* Sticky mobile bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--charcoal-light)] bg-[var(--white)] p-3 sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => handleGated("unlock dealer contact")}
            variant="outline"
            data-testid="sticky-unlock-btn"
            className="h-11 border-[var(--charcoal)] text-[var(--charcoal)] text-sm font-bold hover:bg-[var(--grey)]"
          >
            Unlock
          </Button>
          <Button
            onClick={() => handleGated("get a quote")}
            data-testid="sticky-quote-btn"
            className="h-11 bg-[var(--cyan)] text-[var(--navy)] text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Get Quote
          </Button>
        </div>
      </div>
    </div>
  );
}