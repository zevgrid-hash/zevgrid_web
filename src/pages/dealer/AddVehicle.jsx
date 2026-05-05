// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ImagePlus, ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { toast } from "sonner";

// export default function AddVehicle() {
//   const navigate = useNavigate();
//   const [photos, setPhotos] = useState([]);
//   const [form, setForm] = useState({
//     type: "2W", brand: "", model: "", variant: "",
//     battery: "", range: "", year: "2024", condition: "fresh",
//     registration: "", quantity: "", rent: "", tenure: "6",
//     deposit: "", city: " ", availability: "available",
//     insurance: "", notes: "",
//   });
//   const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

//   const addPhoto = () => setPhotos((p) => [...p, `photo-${Date.now()}.jpg`]);

//   const saveDraft = () => {
//     toast.info("Saved as draft");
//     navigate("/dealer/listings");
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     if (!form.brand || !form.model || !form.rent) return toast.error("Brand, model and rent are required.");
//     if (photos.length < 3) return toast.error("Upload at least 3 photos to publish.");
//     toast.success("Submitted for admin approval", { description: "You'll be notified within 24 hours." });
//     navigate("/dealer/listings");
//   };

//   return (
//     <div data-testid="add-vehicle-page" className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
//       <button onClick={() => navigate(-1)} data-testid="add-vehicle-back" className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900">
//         <ArrowLeft className="h-4 w-4" /> Back
//       </button>
//       <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">New listing</p>
//       <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Add electric vehicle</h1>
//       <p className="mt-2 text-sm text-slate-600">Fill minimum fields + 3 photos to submit for admin approval.</p>

//       <form onSubmit={submit} className="mt-6 space-y-6">
//         <section className="rounded-xl border border-slate-200 bg-white p-5">
//           <h2 className="font-display text-lg font-bold">Basic details</h2>
//           <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div>
//               <Label>Vehicle type *</Label>
//               <Select value={form.type} onValueChange={(v) => update("type", v)}>
//                 <SelectTrigger className="mt-1.5 h-11" data-testid="vehicle-type"><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="2W">Electric 2W</SelectItem>
//                   <SelectItem value="3W">Electric 3W</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div><Label>Brand *</Label><Input data-testid="vehicle-brand" value={form.brand} onChange={(e) => update("brand", e.target.value)} placeholder="Ather, Bajaj, Mahindra..." className="mt-1.5 h-11" /></div>
//             <div><Label>Model *</Label><Input data-testid="vehicle-model" value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="450X Pro" className="mt-1.5 h-11" /></div>
//             <div><Label>Variant</Label><Input data-testid="vehicle-variant" value={form.variant} onChange={(e) => update("variant", e.target.value)} className="mt-1.5 h-11" /></div>
//             <div><Label>Year of manufacture</Label><Input data-testid="vehicle-year" value={form.year} onChange={(e) => update("year", e.target.value)} className="mt-1.5 h-11" /></div>
//             <div>
//               <Label>Condition</Label>
//               <Select value={form.condition} onValueChange={(v) => update("condition", v)}>
//                 <SelectTrigger className="mt-1.5 h-11" data-testid="vehicle-condition"><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="fresh">Fresh</SelectItem>
//                   <SelectItem value="demo">Demo</SelectItem>
//                   <SelectItem value="unsold">Unsold stock</SelectItem>
//                   <SelectItem value="used">Used</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </section>

//         <section className="rounded-xl border border-slate-200 bg-white p-5">
//           <h2 className="font-display text-lg font-bold">Battery & range</h2>
//           <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
//             <div><Label>Battery capacity *</Label><Input data-testid="vehicle-battery" value={form.battery} onChange={(e) => update("battery", e.target.value)} placeholder="3.7 kWh" className="mt-1.5 h-11" /></div>
//             <div><Label>Claimed range (km) *</Label><Input data-testid="vehicle-range" type="number" value={form.range} onChange={(e) => update("range", e.target.value)} placeholder="146" className="mt-1.5 h-11" /></div>
//             <div><Label>Registration status</Label><Input data-testid="vehicle-registration" value={form.registration} onChange={(e) => update("registration", e.target.value)} placeholder="MH-12-XX-0000" className="mt-1.5 h-11" /></div>
//           </div>
//         </section>

//         <section className="rounded-xl border border-slate-200 bg-white p-5">
//           <h2 className="font-display text-lg font-bold">Commercials</h2>
//           <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//             <div><Label>Quantity *</Label><Input data-testid="vehicle-quantity" type="number" value={form.quantity} onChange={(e) => update("quantity", e.target.value)} className="mt-1.5 h-11" /></div>
//             <div><Label>Monthly rent (₹) *</Label><Input data-testid="vehicle-rent" type="number" value={form.rent} onChange={(e) => update("rent", e.target.value)} className="mt-1.5 h-11" /></div>
//             <div>
//               <Label>Min tenure</Label>
//               <Select value={form.tenure} onValueChange={(v) => update("tenure", v)}>
//                 <SelectTrigger className="mt-1.5 h-11" data-testid="vehicle-tenure"><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="3">3 months</SelectItem>
//                   <SelectItem value="6">6 months</SelectItem>
//                   <SelectItem value="12">12 months</SelectItem>
//                   <SelectItem value="24">24 months</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div><Label>Security deposit (₹)</Label><Input data-testid="vehicle-deposit" type="number" value={form.deposit} onChange={(e) => update("deposit", e.target.value)} className="mt-1.5 h-11" /></div>
//           </div>
//           <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div><Label>City</Label><Input data-testid="vehicle-city" value={form.city} onChange={(e) => update("city", e.target.value)} className="mt-1.5 h-11" /></div>
//             <div><Label>Insurance status</Label><Input data-testid="vehicle-insurance" value={form.insurance} onChange={(e) => update("insurance", e.target.value)} placeholder="Valid till 2026" className="mt-1.5 h-11" /></div>
//           </div>
//         </section>

//         <section className="rounded-xl border border-slate-200 bg-white p-5">
//           <h2 className="font-display text-lg font-bold">Photos</h2>
//           <p className="mt-1 text-sm text-slate-600">Minimum 3 photos required to publish.</p>
//           <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
//             {photos.map((p, i) => (
//               <div key={i} className="aspect-square rounded-md border border-slate-200 bg-slate-100">
//                 <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">Photo {i + 1}</div>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addPhoto}
//               data-testid="vehicle-add-photo"
//               className="flex aspect-square flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-slate-300 text-xs font-semibold text-slate-500 hover:border-emerald-400 hover:text-emerald-700"
//             >
//               <ImagePlus className="h-5 w-5" /> Add photo
//             </button>
//           </div>
//           <p className="mt-2 text-xs text-slate-500">{photos.length} / 3 minimum</p>
//         </section>

//         <section className="rounded-xl border border-slate-200 bg-white p-5">
//           <h2 className="font-display text-lg font-bold">Notes</h2>
//           <Textarea data-testid="vehicle-notes" value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Battery health, service history, accessories..." className="mt-3 min-h-[100px]" />
//         </section>

//         <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
//           <Button type="button" variant="outline" onClick={saveDraft} data-testid="vehicle-save-draft" className="border-slate-300">
//             Save as draft
//           </Button>
//           <Button type="submit" data-testid="vehicle-submit" className="bg-emerald-700 text-white hover:bg-emerald-800">
//             Submit for approval
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
} from "../../app/assets/constants/zevgrid-colors";

export default function AddVehicle() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [form, setForm] = useState({
    type: "2W", brand: "", model: "", variant: "",
    battery: "", range: "", year: "2024", condition: "fresh",
    registration: "", quantity: "", rent: "", tenure: "6",
    deposit: "", city: " ", availability: "available",
    insurance: "", notes: "",
  });
  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const addPhoto = () => setPhotos((p) => [...p, `photo-${Date.now()}.jpg`]);

  const saveDraft = () => {
    toast.info("Saved as draft");
    navigate("/dealer/listings");
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.brand || !form.model || !form.rent) return toast.error("Brand, model and rent are required.");
    if (photos.length < 3) return toast.error("Upload at least 3 photos to publish.");
    toast.success("Submitted for admin approval", { description: "You'll be notified within 24 hours." });
    navigate("/dealer/listings");
  };

  // Shared styles
  const inputStyle = {
    marginTop: "0.375rem",
    height: "2.75rem",
    border: `1px solid ${ELECTRIC_CYAN}33`,
    backgroundColor: CLEAN_WHITE,
    color: ENTERPRISE_CHARCOAL,
    borderRadius: "0.5rem",
  };

  const selectTriggerStyle = {
    marginTop: "0.375rem",
    height: "2.75rem",
    border: `1px solid ${ELECTRIC_CYAN}33`,
    backgroundColor: CLEAN_WHITE,
    color: ENTERPRISE_CHARCOAL,
    borderRadius: "0.5rem",
    fontWeight: 500,
  };

  const sectionStyle = {
    borderRadius: "0.75rem",
    border: "1px solid #E2E8F0",
    backgroundColor: CLEAN_WHITE,
    padding: "1.25rem",
  };

  const sectionHeading = {
    fontSize: "1.125rem",
    fontWeight: 700,
    color: ENTERPRISE_CHARCOAL,
  };

  const gridTwo = {
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
  };

  const gridThree = {
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "1rem",
  };

  const gridFour = {
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: "1rem",
  };

  const focusHandlers = {
    onFocus: (e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN),
    onBlur: (e) => (e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}33`),
  };

  return (
    <div
      data-testid="add-vehicle-page"
      style={{
        margin: "0 auto",
        width: "100%",
        maxWidth: "56rem",
        padding: "1.5rem 1.5rem",
        backgroundColor: LIGHT_CANVAS_GREY,
        minHeight: "100vh",
      }}
    >
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        data-testid="add-vehicle-back"
        style={{
          marginBottom: "0.75rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "#64748B",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = ENTERPRISE_CHARCOAL)}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
      >
        <ArrowLeft style={{ height: "1rem", width: "1rem" }} /> Back
      </button>

      {/* Header */}
      <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: ELECTRIC_CYAN }}>
        New listing
      </p>
      <h1 style={{ marginTop: "0.25rem", fontSize: "1.75rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
        Add electric vehicle
      </h1>
      <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#64748B" }}>
        Fill minimum fields + 3 photos to submit for admin approval.
      </p>

      <form onSubmit={submit} style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Basic details */}
        <section style={sectionStyle}>
          <h2 style={sectionHeading}>Basic details</h2>
          <div style={gridTwo}>
            <div>
              <Label style={{ color: "#475569" }}>Vehicle type *</Label>
              <Select value={form.type} onValueChange={(v) => update("type", v)}>
                <SelectTrigger style={selectTriggerStyle} data-testid="vehicle-type"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2W">Electric 2W</SelectItem>
                  <SelectItem value="3W">Electric 3W</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label style={{ color: "#475569" }}>Brand *</Label>
              <Input data-testid="vehicle-brand" value={form.brand} onChange={(e) => update("brand", e.target.value)} placeholder="Ather, Bajaj, Mahindra..." style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <Label style={{ color: "#475569" }}>Model *</Label>
              <Input data-testid="vehicle-model" value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="450X Pro" style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <Label style={{ color: "#475569" }}>Variant</Label>
              <Input data-testid="vehicle-variant" value={form.variant} onChange={(e) => update("variant", e.target.value)} style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <Label style={{ color: "#475569" }}>Year of manufacture</Label>
              <Input data-testid="vehicle-year" value={form.year} onChange={(e) => update("year", e.target.value)} style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <Label style={{ color: "#475569" }}>Condition</Label>
              <Select value={form.condition} onValueChange={(v) => update("condition", v)}>
                <SelectTrigger style={selectTriggerStyle} data-testid="vehicle-condition"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fresh">Fresh</SelectItem>
                  <SelectItem value="demo">Demo</SelectItem>
                  <SelectItem value="unsold">Unsold stock</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Battery & range */}
        <section style={sectionStyle}>
          <h2 style={sectionHeading}>Battery &amp; range</h2>
          <div style={gridThree}>
            <div>
              <Label style={{ color: "#475569" }}>Battery capacity *</Label>
              <Input data-testid="vehicle-battery" value={form.battery} onChange={(e) => update("battery", e.target.value)} placeholder="3.7 kWh" style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <Label style={{ color: "#475569" }}>Claimed range (km) *</Label>
              <Input data-testid="vehicle-range" type="number" value={form.range} onChange={(e) => update("range", e.target.value)} placeholder="146" style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <Label style={{ color: "#475569" }}>Registration status</Label>
              <Input data-testid="vehicle-registration" value={form.registration} onChange={(e) => update("registration", e.target.value)} placeholder="MH-12-XX-0000" style={inputStyle} {...focusHandlers} />
            </div>
          </div>
        </section>

        {/* Commercials */}
        <section style={sectionStyle}>
          <h2 style={sectionHeading}>Commercials</h2>
          <div style={gridFour}>
            <div>
              <Label style={{ color: "#475569" }}>Quantity *</Label>
              <Input data-testid="vehicle-quantity" type="number" value={form.quantity} onChange={(e) => update("quantity", e.target.value)} style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <Label style={{ color: "#475569" }}>Monthly rent (₹) *</Label>
              <Input data-testid="vehicle-rent" type="number" value={form.rent} onChange={(e) => update("rent", e.target.value)} style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <Label style={{ color: "#475569" }}>Min tenure</Label>
              <Select value={form.tenure} onValueChange={(v) => update("tenure", v)}>
                <SelectTrigger style={selectTriggerStyle} data-testid="vehicle-tenure"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 months</SelectItem>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label style={{ color: "#475569" }}>Security deposit (₹)</Label>
              <Input data-testid="vehicle-deposit" type="number" value={form.deposit} onChange={(e) => update("deposit", e.target.value)} style={inputStyle} {...focusHandlers} />
            </div>
          </div>
          <div style={gridTwo}>
            <div>
              <Label style={{ color: "#475569" }}>City</Label>
              <Input data-testid="vehicle-city" value={form.city} onChange={(e) => update("city", e.target.value)} style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <Label style={{ color: "#475569" }}>Insurance status</Label>
              <Input data-testid="vehicle-insurance" value={form.insurance} onChange={(e) => update("insurance", e.target.value)} placeholder="Valid till 2026" style={inputStyle} {...focusHandlers} />
            </div>
          </div>
        </section>

        {/* Photos */}
        <section style={sectionStyle}>
          <h2 style={sectionHeading}>Photos</h2>
          <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#64748B" }}>
            Minimum 3 photos required to publish.
          </p>
          <div
            style={{
              marginTop: "1rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {photos.map((p, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: "1",
                  borderRadius: "0.375rem",
                  border: `1px solid ${ELECTRIC_CYAN}33`,
                  backgroundColor: LIGHT_CANVAS_GREY,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  color: "#94A3B8",
                }}
              >
                Photo {i + 1}
              </div>
            ))}
            <button
              type="button"
              onClick={addPhoto}
              data-testid="vehicle-add-photo"
              style={{
                aspectRatio: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.25rem",
                borderRadius: "0.375rem",
                border: `2px dashed ${ELECTRIC_CYAN}55`,
                backgroundColor: "transparent",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#94A3B8",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ELECTRIC_CYAN;
                e.currentTarget.style.color = ELECTRIC_CYAN;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}55`;
                e.currentTarget.style.color = "#94A3B8";
              }}
            >
              <ImagePlus style={{ height: "1.25rem", width: "1.25rem" }} />
              Add photo
            </button>
          </div>
          <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#94A3B8" }}>
            {photos.length} / 3 minimum
          </p>
        </section>

        {/* Notes */}
        <section style={sectionStyle}>
          <h2 style={sectionHeading}>Notes</h2>
          <Textarea
            data-testid="vehicle-notes"
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Battery health, service history, accessories..."
            style={{
              marginTop: "0.75rem",
              minHeight: "6.25rem",
              border: `1px solid ${ELECTRIC_CYAN}33`,
              backgroundColor: CLEAN_WHITE,
              color: ENTERPRISE_CHARCOAL,
              borderRadius: "0.5rem",
              resize: "vertical",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
            onBlur={(e) => (e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}33`)}
          />
        </section>

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "stretch" }} className="sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={saveDraft}
            data-testid="vehicle-save-draft"
            style={{
              border: "1px solid #E2E8F0",
              color: "#64748B",
              backgroundColor: "transparent",
              fontWeight: 600,
              borderRadius: "0.5rem",
              cursor: "pointer",
              padding: "0 1.25rem",
              height: "2.75rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
          >
            Save as draft
          </Button>
          <Button
            type="submit"
            data-testid="vehicle-submit"
            style={{
              backgroundColor: ACTIVE_EMERALD,
              color: CLEAN_WHITE,
              border: "none",
              fontWeight: 700,
              borderRadius: "0.5rem",
              cursor: "pointer",
              padding: "0 1.25rem",
              height: "2.75rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Submit for approval
          </Button>
        </div>
      </form>
    </div>
  );
}