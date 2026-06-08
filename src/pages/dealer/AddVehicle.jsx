
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ImagePlus, ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { toast } from "sonner";
// import { createVehicle } from "../../lib/api";
// import {
//   ELECTRIC_CYAN,
//   ENTERPRISE_CHARCOAL,
//   CLEAN_WHITE,
//   LIGHT_CANVAS_GREY,
//   ACTIVE_EMERALD,
// } from "../../app/assets/constants/zevgrid-colors";

// export default function AddVehicle() {
//   const navigate = useNavigate();
//   const [photos, setPhotos] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [form, setForm] = useState({
//     type: "2W", brand: "", model: "", variant: "",
//     battery: "", range: "", year: "2024", condition: "fresh",
//     registration: "", quantity: "", rent: "", tenure: "6",
//     deposit: "", city: " ", availability: "available",
//     insurance: "", notes: "",
//   });
//   const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));
//   const addPhoto = () => {
//     if (!isSubmitting) setPhotos((p) => [...p, `photo-${Date.now()}.jpg`]);
//   };

//   const buildVehiclePayload = (status) => {
//     const now = new Date().toISOString();
//     return {
//       id: `v-${Date.now()}`,
//       dealerId: localStorage.getItem("zevgrid_dealer_id") || "d-101",
//       brand: form.brand.trim(),
//       model: form.model.trim(),
//       type: form.type,
//       rent: Number(form.rent || 0),
//       quantity: Number(form.quantity || 0),
//       photos: photos.length,
//       status,
//       availability: form.availability || "available",
//       createdAt: now,
//       updatedAt: now,
//     };
//   };

//   const persistVehicle = async (status) => {
//     if (!form.brand || !form.model || !form.rent) return toast.error("Brand, model and rent are required.");
//     if (status !== "draft" && photos.length < 3) return toast.error("Upload at least 3 photos to publish.");

//     setIsSubmitting(true);
//     try {
//       const payload = await createVehicle(buildVehiclePayload(status));

//       if (payload?.success === false) {
//         throw new Error(payload?.message || "Vehicle could not be saved.");
//       }

//       toast.success(
//         payload?.message || (status === "draft" ? "Saved as draft" : "Submitted for admin approval"),
//         {
//           description: status === "draft" ? undefined : "You'll be notified within 24 hours.",
//         }
//       );
//       navigate("/dealer/listings");
//     } catch (error) {
//       toast.error("Vehicle save failed", {
//         description: error.message || "Please check the details and try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const saveDraft = () => {
//     persistVehicle("draft");
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     persistVehicle("pending");
//   };

//   // Shared styles
//   const inputStyle = {
//     marginTop: "0.375rem",
//     height: "2.75rem",
//     border: `1px solid ${ELECTRIC_CYAN}33`,
//     backgroundColor: CLEAN_WHITE,
//     color: ENTERPRISE_CHARCOAL,
//     borderRadius: "0.5rem",
//   };

//   const selectTriggerStyle = {
//     marginTop: "0.375rem",
//     height: "2.75rem",
//     border: `1px solid ${ELECTRIC_CYAN}33`,
//     backgroundColor: CLEAN_WHITE,
//     color: ENTERPRISE_CHARCOAL,
//     borderRadius: "0.5rem",
//     fontWeight: 500,
//   };

//   const sectionStyle = {
//     borderRadius: "0.75rem",
//     border: "1px solid #E2E8F0",
//     backgroundColor: CLEAN_WHITE,
//     padding: "1.25rem",
//   };

//   const sectionHeading = {
//     fontSize: "1.125rem",
//     fontWeight: 700,
//     color: ENTERPRISE_CHARCOAL,
//   };

//   const gridTwo = {
//     marginTop: "1rem",
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//     gap: "1rem",
//   };

//   const gridThree = {
//     marginTop: "1rem",
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
//     gap: "1rem",
//   };

//   const gridFour = {
//     marginTop: "1rem",
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
//     gap: "1rem",
//   };

//   const focusHandlers = {
//     onFocus: (e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN),
//     onBlur: (e) => (e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}33`),
//   };

//   return (
//     <div
//       data-testid="add-vehicle-page"
//       style={{
//         margin: "0 auto",
//         width: "100%",
//         maxWidth: "56rem",
//         padding: "1.5rem 1.5rem",
//         backgroundColor: LIGHT_CANVAS_GREY,
//         minHeight: "100vh",
//       }}
//     >
//       {/* Back */}
//       <button
//         onClick={() => navigate(-1)}
//         data-testid="add-vehicle-back"
//         style={{
//           marginBottom: "0.75rem",
//           display: "inline-flex",
//           alignItems: "center",
//           gap: "0.375rem",
//           fontSize: "0.875rem",
//           fontWeight: 600,
//           color: "#64748B",
//           background: "none",
//           border: "none",
//           cursor: "pointer",
//           padding: 0,
//         }}
//         onMouseEnter={(e) => (e.currentTarget.style.color = ENTERPRISE_CHARCOAL)}
//         onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
//       >
//         <ArrowLeft style={{ height: "1rem", width: "1rem" }} /> Back
//       </button>

//       {/* Header */}
//       <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: ELECTRIC_CYAN }}>
//         New listing
//       </p>
//       <h1 style={{ marginTop: "0.25rem", fontSize: "1.75rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
//         Add electric vehicle
//       </h1>
//       <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#64748B" }}>
//         Fill minimum fields + 3 photos to submit for admin approval.
//       </p>

//       <form onSubmit={submit} style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

//         {/* Basic details */}
//         <section style={sectionStyle}>
//           <h2 style={sectionHeading}>Basic details</h2>
//           <div style={gridTwo}>
//             <div>
//               <Label style={{ color: "#475569" }}>Vehicle type *</Label>
//               <Select value={form.type} onValueChange={(v) => update("type", v)}>
//                 <SelectTrigger style={selectTriggerStyle} data-testid="vehicle-type"><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="2W">Electric 2W</SelectItem>
//                   <SelectItem value="3W">Electric 3W</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label style={{ color: "#475569" }}>Brand *</Label>
//               <Input data-testid="vehicle-brand" value={form.brand} onChange={(e) => update("brand", e.target.value)} placeholder="Ather, Bajaj, Mahindra..." style={inputStyle} {...focusHandlers} />
//             </div>
//             <div>
//               <Label style={{ color: "#475569" }}>Model *</Label>
//               <Input data-testid="vehicle-model" value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="450X Pro" style={inputStyle} {...focusHandlers} />
//             </div>
//             <div>
//               <Label style={{ color: "#475569" }}>Variant</Label>
//               <Input data-testid="vehicle-variant" value={form.variant} onChange={(e) => update("variant", e.target.value)} style={inputStyle} {...focusHandlers} />
//             </div>
//             <div>
//               <Label style={{ color: "#475569" }}>Year of manufacture</Label>
//               <Input data-testid="vehicle-year" value={form.year} onChange={(e) => update("year", e.target.value)} style={inputStyle} {...focusHandlers} />
//             </div>
//             <div>
//               <Label style={{ color: "#475569" }}>Condition</Label>
//               <Select value={form.condition} onValueChange={(v) => update("condition", v)}>
//                 <SelectTrigger style={selectTriggerStyle} data-testid="vehicle-condition"><SelectValue /></SelectTrigger>
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

//         {/* Battery & range */}
//         <section style={sectionStyle}>
//           <h2 style={sectionHeading}>Battery &amp; range</h2>
//           <div style={gridThree}>
//             <div>
//               <Label style={{ color: "#475569" }}>Battery capacity *</Label>
//               <Input data-testid="vehicle-battery" value={form.battery} onChange={(e) => update("battery", e.target.value)} placeholder="3.7 kWh" style={inputStyle} {...focusHandlers} />
//             </div>
//             <div>
//               <Label style={{ color: "#475569" }}>Claimed range (km) *</Label>
//               <Input data-testid="vehicle-range" type="number" value={form.range} onChange={(e) => update("range", e.target.value)} placeholder="146" style={inputStyle} {...focusHandlers} />
//             </div>
//             <div>
//               <Label style={{ color: "#475569" }}>Registration status</Label>
//               <Input data-testid="vehicle-registration" value={form.registration} onChange={(e) => update("registration", e.target.value)} placeholder="MH-12-XX-0000" style={inputStyle} {...focusHandlers} />
//             </div>
//           </div>
//         </section>

//         {/* Commercials */}
//         <section style={sectionStyle}>
//           <h2 style={sectionHeading}>Commercials</h2>
//           <div style={gridFour}>
//             <div>
//               <Label style={{ color: "#475569" }}>Quantity *</Label>
//               <Input data-testid="vehicle-quantity" type="number" value={form.quantity} onChange={(e) => update("quantity", e.target.value)} style={inputStyle} {...focusHandlers} />
//             </div>
//             <div>
//               <Label style={{ color: "#475569" }}>Monthly rent (₹) *</Label>
//               <Input data-testid="vehicle-rent" type="number" value={form.rent} onChange={(e) => update("rent", e.target.value)} style={inputStyle} {...focusHandlers} />
//             </div>
//             <div>
//               <Label style={{ color: "#475569" }}>Min tenure</Label>
//               <Select value={form.tenure} onValueChange={(v) => update("tenure", v)}>
//                 <SelectTrigger style={selectTriggerStyle} data-testid="vehicle-tenure"><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="3">3 months</SelectItem>
//                   <SelectItem value="6">6 months</SelectItem>
//                   <SelectItem value="12">12 months</SelectItem>
//                   <SelectItem value="24">24 months</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label style={{ color: "#475569" }}>Security deposit (₹)</Label>
//               <Input data-testid="vehicle-deposit" type="number" value={form.deposit} onChange={(e) => update("deposit", e.target.value)} style={inputStyle} {...focusHandlers} />
//             </div>
//           </div>
//           <div style={gridTwo}>
//             <div>
//               <Label style={{ color: "#475569" }}>City</Label>
//               <Input data-testid="vehicle-city" value={form.city} onChange={(e) => update("city", e.target.value)} style={inputStyle} {...focusHandlers} />
//             </div>
//             <div>
//               <Label style={{ color: "#475569" }}>Insurance status</Label>
//               <Input data-testid="vehicle-insurance" value={form.insurance} onChange={(e) => update("insurance", e.target.value)} placeholder="Valid till 2026" style={inputStyle} {...focusHandlers} />
//             </div>
//           </div>
//         </section>

//         {/* Photos */}
//         <section style={sectionStyle}>
//           <h2 style={sectionHeading}>Photos</h2>
//           <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#64748B" }}>
//             Minimum 3 photos required to publish.
//           </p>
//           <div
//             style={{
//               marginTop: "1rem",
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
//               gap: "0.75rem",
//             }}
//           >
//             {photos.map((p, i) => (
//               <div
//                 key={i}
//                 style={{
//                   aspectRatio: "1",
//                   borderRadius: "0.375rem",
//                   border: `1px solid ${ELECTRIC_CYAN}33`,
//                   backgroundColor: LIGHT_CANVAS_GREY,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: "0.75rem",
//                   color: "#94A3B8",
//                 }}
//               >
//                 Photo {i + 1}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addPhoto}
//               disabled={isSubmitting}
//               data-testid="vehicle-add-photo"
//               style={{
//                 aspectRatio: "1",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "0.25rem",
//                 borderRadius: "0.375rem",
//                 border: `2px dashed ${ELECTRIC_CYAN}55`,
//                 backgroundColor: "transparent",
//                 fontSize: "0.75rem",
//                 fontWeight: 600,
//                 color: "#94A3B8",
//                 cursor: isSubmitting ? "not-allowed" : "pointer",
//                 opacity: isSubmitting ? 0.7 : 1,
//                 transition: "all 0.15s ease",
//               }}
//               onMouseEnter={(e) => {
//                 if (isSubmitting) return;
//                 e.currentTarget.style.borderColor = ELECTRIC_CYAN;
//                 e.currentTarget.style.color = ELECTRIC_CYAN;
//               }}
//               onMouseLeave={(e) => {
//                 if (isSubmitting) return;
//                 e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}55`;
//                 e.currentTarget.style.color = "#94A3B8";
//               }}
//             >
//               <ImagePlus style={{ height: "1.25rem", width: "1.25rem" }} />
//               Add photo
//             </button>
//           </div>
//           <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#94A3B8" }}>
//             {photos.length} / 3 minimum
//           </p>
//         </section>

//         {/* Notes */}
//         <section style={sectionStyle}>
//           <h2 style={sectionHeading}>Notes</h2>
//           <Textarea
//             data-testid="vehicle-notes"
//             value={form.notes}
//             onChange={(e) => update("notes", e.target.value)}
//             placeholder="Battery health, service history, accessories..."
//             style={{
//               marginTop: "0.75rem",
//               minHeight: "6.25rem",
//               border: `1px solid ${ELECTRIC_CYAN}33`,
//               backgroundColor: CLEAN_WHITE,
//               color: ENTERPRISE_CHARCOAL,
//               borderRadius: "0.5rem",
//               resize: "vertical",
//             }}
//             onFocus={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
//             onBlur={(e) => (e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}33`)}
//           />
//         </section>

//         {/* Actions */}
//         <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "stretch" }} className="sm:flex-row sm:justify-end">
//           <Button
//             type="button"
//             variant="outline"
//             disabled={isSubmitting}
//             onClick={saveDraft}
//             data-testid="vehicle-save-draft"
//             style={{
//               border: "1px solid #E2E8F0",
//               color: "#64748B",
//               backgroundColor: "transparent",
//               fontWeight: 600,
//               borderRadius: "0.5rem",
//               cursor: isSubmitting ? "not-allowed" : "pointer",
//               opacity: isSubmitting ? 0.7 : 1,
//               padding: "0 1.25rem",
//               height: "2.75rem",
//             }}
//             onMouseEnter={(e) => {
//               if (!isSubmitting) e.currentTarget.style.borderColor = ELECTRIC_CYAN;
//             }}
//             onMouseLeave={(e) => {
//               if (!isSubmitting) e.currentTarget.style.borderColor = "#E2E8F0";
//             }}
//           >
//             {isSubmitting ? "Saving..." : "Save as draft"}
//           </Button>
//           <Button
//             type="submit"
//             disabled={isSubmitting}
//             data-testid="vehicle-submit"
//             style={{
//               backgroundColor: ACTIVE_EMERALD,
//               color: CLEAN_WHITE,
//               border: "none",
//               fontWeight: 700,
//               borderRadius: "0.5rem",
//               cursor: isSubmitting ? "not-allowed" : "pointer",
//               opacity: isSubmitting ? 0.7 : 1,
//               padding: "0 1.25rem",
//               height: "2.75rem",
//             }}
//             onMouseEnter={(e) => {
//               if (!isSubmitting) e.currentTarget.style.opacity = "0.85";
//             }}
//             onMouseLeave={(e) => {
//               if (!isSubmitting) e.currentTarget.style.opacity = "1";
//             }}
//           >
//             {isSubmitting ? "Submitting..." : "Submit for approval"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { createVehicle } from "../../lib/api";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
} from "../../app/assets/constants/zevgrid-colors";

export default function AddVehicle() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Each photo: { file: File, previewUrl: string }
  const [photos, setPhotos] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    type: "2W", brand: "", model: "", variant: "",
    battery: "", range: "", year: "2024", condition: "fresh",
    registration: "", quantity: "", rent: "", tenure: "6",
    deposit: "", city: " ", availability: "available",
    insurance: "", notes: "",
  });
  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  // ── Photo helpers ────────────────────────────────────────────────────────────

  const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const MAX_PHOTOS = 10;
  const MAX_SIZE_MB = 5;

  const addFiles = useCallback((files) => {
    const incoming = Array.from(files);

    const valid = incoming.filter((f) => {
      if (!ACCEPTED.includes(f.type)) {
        toast.error(`${f.name}: unsupported format. Use JPG, PNG, or WebP.`);
        return false;
      }
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`${f.name}: exceeds ${MAX_SIZE_MB} MB limit.`);
        return false;
      }
      return true;
    });

    setPhotos((prev) => {
      const remaining = MAX_PHOTOS - prev.length;
      if (remaining <= 0) {
        toast.error(`Maximum ${MAX_PHOTOS} photos allowed.`);
        return prev;
      }
      const toAdd = valid.slice(0, remaining).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      if (valid.length > remaining) {
        toast.warning(`Only ${remaining} more photo(s) can be added (max ${MAX_PHOTOS}).`);
      }
      return [...prev, ...toAdd];
    });
  }, []);

  const removePhoto = (index) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleFileInput = (e) => {
    if (e.target.files?.length) addFiles(e.target.files);
    // Reset so the same file can be re-selected after removal
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  // ── Vehicle payload ──────────────────────────────────────────────────────────

  const buildVehiclePayload = (status) => {
    const now = new Date().toISOString();
    return {
      id: `v-${Date.now()}`,
      dealerId: localStorage.getItem("zevgrid_dealer_id") || "d-101",
      brand: form.brand.trim(),
      model: form.model.trim(),
      type: form.type,
      rent: Number(form.rent || 0),
      quantity: Number(form.quantity || 0),
      // Pass File objects so the API layer can handle FormData upload
      photoFiles: photos.map((p) => p.file),
      photos: photos.length,
      status,
      availability: form.availability || "available",
      createdAt: now,
      updatedAt: now,
    };
  };

  const persistVehicle = async (status) => {
    if (!form.brand || !form.model || !form.rent)
      return toast.error("Brand, model and rent are required.");
    if (status !== "draft" && photos.length < 3)
      return toast.error("Upload at least 3 photos to publish.");

    setIsSubmitting(true);
    try {
      const payload = await createVehicle(buildVehiclePayload(status));

      if (payload?.success === false) {
        throw new Error(payload?.message || "Vehicle could not be saved.");
      }

      toast.success(
        payload?.message || (status === "draft" ? "Saved as draft" : "Submitted for admin approval"),
        { description: status === "draft" ? undefined : "You'll be notified within 24 hours." }
      );
      navigate("/dealer/listings");
    } catch (error) {
      toast.error("Vehicle save failed", {
        description: error.message || "Please check the details and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => persistVehicle("draft");
  const submit = (e) => { e.preventDefault(); persistVehicle("pending"); };

  // ── Shared styles ────────────────────────────────────────────────────────────

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

  // ── Render ───────────────────────────────────────────────────────────────────

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

        {/* ── Photos ── */}
        <section style={sectionStyle}>
          <h2 style={sectionHeading}>Photos</h2>
          <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#64748B" }}>
            Minimum 3 photos required to publish. Max {MAX_PHOTOS} photos, up to {MAX_SIZE_MB} MB each (JPG, PNG, WebP).
          </p>

          {/* Hidden native file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED.join(",")}
            multiple
            style={{ display: "none" }}
            onChange={handleFileInput}
            data-testid="vehicle-photo-input"
          />

          {/* Drop zone + grid */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            style={{
              marginTop: "1rem",
              padding: photos.length === 0 ? "1.5rem" : "0",
              borderRadius: "0.5rem",
              border: photos.length === 0
                ? `2px dashed ${isDragOver ? ELECTRIC_CYAN : `${ELECTRIC_CYAN}55`}`
                : "none",
              backgroundColor: isDragOver ? `${ELECTRIC_CYAN}08` : "transparent",
              transition: "all 0.15s ease",
            }}
          >
            {/* Empty-state drop zone */}
            {photos.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  padding: "1.5rem 0",
                }}
                onClick={() => !isSubmitting && fileInputRef.current?.click()}
              >
                <ImagePlus style={{ width: "2rem", height: "2rem", color: isDragOver ? ELECTRIC_CYAN : "#94A3B8" }} />
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: isDragOver ? ELECTRIC_CYAN : "#64748B", margin: 0 }}>
                  {isDragOver ? "Drop photos here" : "Click or drag & drop photos"}
                </p>
                <p style={{ fontSize: "0.75rem", color: "#94A3B8", margin: 0 }}>
                  JPG, PNG, WebP · up to {MAX_SIZE_MB} MB each
                </p>
              </div>
            )}

            {/* Photo thumbnails grid */}
            {photos.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {photos.map((photo, i) => (
                  <div
                    key={photo.previewUrl}
                    style={{
                      position: "relative",
                      aspectRatio: "1",
                      borderRadius: "0.5rem",
                      overflow: "hidden",
                      border: `1px solid ${ELECTRIC_CYAN}33`,
                    }}
                  >
                    <img
                      src={photo.previewUrl}
                      alt={`Vehicle photo ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      disabled={isSubmitting}
                      data-testid={`vehicle-remove-photo-${i}`}
                      style={{
                        position: "absolute",
                        top: "0.25rem",
                        right: "0.25rem",
                        width: "1.375rem",
                        height: "1.375rem",
                        borderRadius: "9999px",
                        backgroundColor: "rgba(15,23,42,0.75)",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        padding: 0,
                        transition: "background-color 0.15s ease",
                      }}
                      onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.backgroundColor = "#ef4444"; }}
                      onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.backgroundColor = "rgba(15,23,42,0.75)"; }}
                      aria-label={`Remove photo ${i + 1}`}
                    >
                      <X style={{ width: "0.75rem", height: "0.75rem", color: CLEAN_WHITE }} />
                    </button>

                    {/* Index badge */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: "0.25rem",
                        left: "0.25rem",
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        color: CLEAN_WHITE,
                        backgroundColor: "rgba(15,23,42,0.6)",
                        padding: "0.1rem 0.35rem",
                        borderRadius: "0.25rem",
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>
                ))}

                {/* Add more tile (shown alongside existing photos) */}
                {photos.length < MAX_PHOTOS && (
                  <button
                    type="button"
                    onClick={() => !isSubmitting && fileInputRef.current?.click()}
                    disabled={isSubmitting}
                    data-testid="vehicle-add-photo"
                    style={{
                      aspectRatio: "1",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.25rem",
                      borderRadius: "0.5rem",
                      border: `2px dashed ${ELECTRIC_CYAN}55`,
                      backgroundColor: "transparent",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#94A3B8",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      opacity: isSubmitting ? 0.7 : 1,
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (isSubmitting) return;
                      e.currentTarget.style.borderColor = ELECTRIC_CYAN;
                      e.currentTarget.style.color = ELECTRIC_CYAN;
                    }}
                    onMouseLeave={(e) => {
                      if (isSubmitting) return;
                      e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}55`;
                      e.currentTarget.style.color = "#94A3B8";
                    }}
                  >
                    <ImagePlus style={{ height: "1.25rem", width: "1.25rem" }} />
                    Add more
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Counter with progress bar */}
          <div style={{ marginTop: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.375rem" }}>
              <span style={{ fontSize: "0.75rem", color: photos.length >= 3 ? ACTIVE_EMERALD : "#94A3B8", fontWeight: 600 }}>
                {photos.length} / {MAX_PHOTOS} photos
              </span>
              {photos.length < 3 && (
                <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                  {3 - photos.length} more needed to publish
                </span>
              )}
              {photos.length >= 3 && (
                <span style={{ fontSize: "0.75rem", color: ACTIVE_EMERALD }}>
                  ✓ Minimum met
                </span>
              )}
            </div>
            <div style={{ height: "4px", borderRadius: "9999px", backgroundColor: "#E2E8F0", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${Math.min((photos.length / MAX_PHOTOS) * 100, 100)}%`,
                  backgroundColor: photos.length >= 3 ? ACTIVE_EMERALD : ELECTRIC_CYAN,
                  borderRadius: "9999px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
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
            disabled={isSubmitting}
            onClick={saveDraft}
            data-testid="vehicle-save-draft"
            style={{
              border: "1px solid #E2E8F0",
              color: "#64748B",
              backgroundColor: "transparent",
              fontWeight: 600,
              borderRadius: "0.5rem",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.7 : 1,
              padding: "0 1.25rem",
              height: "2.75rem",
            }}
            onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.borderColor = ELECTRIC_CYAN; }}
            onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.borderColor = "#E2E8F0"; }}
          >
            {isSubmitting ? "Saving..." : "Save as draft"}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            data-testid="vehicle-submit"
            style={{
              backgroundColor: ACTIVE_EMERALD,
              color: CLEAN_WHITE,
              border: "none",
              fontWeight: 700,
              borderRadius: "0.5rem",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.7 : 1,
              padding: "0 1.25rem",
              height: "2.75rem",
            }}
            onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.opacity = "1"; }}
          >
            {isSubmitting ? "Submitting..." : "Submit for approval"}
          </Button>
        </div>
      </form>
    </div>
  );
}
