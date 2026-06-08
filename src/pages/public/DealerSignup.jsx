
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Upload, CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createDealer } from "../../lib/api";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  ACTIVE_EMERALD,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from  "../../app/assets/constants/zevgrid-colors";


const s = {
  eyebrow: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: ELECTRIC_CYAN,
  },
  heading: {
    marginTop: "8px",
    fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: INFRASTRUCTURE_NAVY,
  },
  subheading: {
    marginTop: "8px",
    fontSize: "0.875rem",
    color: `${ENTERPRISE_CHARCOAL}99`,
    lineHeight: 1.6,
  },
  // Stepper
  stepCircle: {
    active: {
      display: "flex", alignItems: "center", justifyContent: "center",
      height: "32px", width: "32px", borderRadius: "50%", flexShrink: 0,
      backgroundColor: ELECTRIC_CYAN, color: INFRASTRUCTURE_NAVY,
      fontSize: "12px", fontWeight: 700,
    },
    inactive: {
      display: "flex", alignItems: "center", justifyContent: "center",
      height: "32px", width: "32px", borderRadius: "50%", flexShrink: 0,
      backgroundColor: LIGHT_CANVAS_GREY,
      border: `1.5px solid ${ENTERPRISE_CHARCOAL}26`,
      color: `${ENTERPRISE_CHARCOAL}55`,
      fontSize: "12px", fontWeight: 700,
    },
  },
  stepLine: {
    active:   { height: "2px", flex: 1, backgroundColor: ELECTRIC_CYAN },
    inactive: { height: "2px", flex: 1, backgroundColor: `${ENTERPRISE_CHARCOAL}20` },
  },
  stepLabel: {
    active:   { fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: ELECTRIC_CYAN },
    inactive: { fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: `${ENTERPRISE_CHARCOAL}55` },
  },
  // Card
  card: {
    marginTop: "32px",
    borderRadius: "12px",
    border: `1px solid ${LIGHT_CANVAS_GREY}`,
    backgroundColor: CLEAN_WHITE,
    padding: "24px",
    boxShadow: `0 1px 6px ${INFRASTRUCTURE_NAVY}0a`,
  },
  sectionTitle: {
    fontSize: "1.125rem",
    fontWeight: 700,
    color: INFRASTRUCTURE_NAVY,
    letterSpacing: "-0.01em",
  },
  helperText: {
    fontSize: "0.875rem",
    color: `${ENTERPRISE_CHARCOAL}80`,
  },
  // Doc row
  docRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "8px",
    border: `1px solid ${LIGHT_CANVAS_GREY}`,
    backgroundColor: LIGHT_CANVAS_GREY,
    padding: "12px",
  },
  docRowUploaded: {
    border: `1px solid ${ACTIVE_EMERALD}33`,
    backgroundColor: `${ACTIVE_EMERALD}08`,
  },
  docLabel: {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: INFRASTRUCTURE_NAVY,
  },
  docSub: {
    fontSize: "11px",
    color: `${ENTERPRISE_CHARCOAL}66`,
    marginTop: "2px",
  },
  docSubUploaded: {
    color: ACTIVE_EMERALD,
  },
  // Review boxes
  reviewBox: {
    borderRadius: "8px",
    border: `1px solid ${LIGHT_CANVAS_GREY}`,
    backgroundColor: LIGHT_CANVAS_GREY,
    padding: "16px",
    fontSize: "0.875rem",
  },
  reviewLabel: { fontWeight: 700, color: INFRASTRUCTURE_NAVY },
  reviewMeta:  { color: `${ENTERPRISE_CHARCOAL}80`, marginTop: "2px" },
  // Notice
  notice: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    borderRadius: "8px",
    border: `1px solid ${ACTIVE_EMERALD}33`,
    backgroundColor: `${ACTIVE_EMERALD}0d`,
    padding: "12px",
    fontSize: "12px",
    color: INFRASTRUCTURE_NAVY,
    lineHeight: 1.5,
  },
};

// ─── Docs config ──────────────────────────────────────────────────────────────

const DOCS = [
  { key: "gst",    label: "GST Certificate" },
  { key: "pan",    label: "PAN / Business Registration" },
  { key: "cheque", label: "Cancelled Cheque" },
  { key: "id",     label: "ID Proof (Aadhaar / Director KYC)" },
  { key: "dealer", label: "Dealership Proof (Shop Act)" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DealerSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [docs, setDocs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    dealership: "", contact: "", mobile: "", email: "",
    city: "Pune", gst: "", pan: "", address: "", bank: "",
  });
  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const next = () => {
    if (step === 1 && (!form.dealership || !form.mobile || !form.email))
      return toast.error("Please fill required fields.");
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const result = await createDealer({
        dealership: form.dealership,
        contact: form.contact,
        mobile: form.mobile,
        email: form.email,
        city: form.city,
        gst: form.gst,
        pan: form.pan,
        address: form.address,
        status: "pending",
      });

      if (result.data?.id) {
        localStorage.setItem("zevgrid_dealer_id", result.data.id);
      }

      toast.success(result.message || "Dealer registered successfully", {
        description: "Admin will verify within 24-48 hours.",
      });
      navigate("/dealer/dashboard");
    } catch (error) {
      toast.error("Dealer registration failed", {
        description: error.message || "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = ["Business info", "Documents", "Review"];

  return (
    <div data-testid="dealer-signup-page" className="mx-auto max-w-3xl px-4 py-10 sm:px-6">

      {/* Page heading */}
      <p style={s.eyebrow}>Become a dealer</p>
      <h1 style={s.heading}>Join ZevGrid as a dealer</h1>
      <p style={s.subheading}>
        List your commercial EV inventory. Approval in 24–48 hours after KYC verification.
      </p>

      {/* Stepper */}
      <div data-testid="dealer-stepper" style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "8px" }}>
        {[1, 2, 3].map((n) => (
          <div key={n} style={{ display: "flex", flex: 1, alignItems: "center", gap: "8px" }}>
            <div style={step >= n ? s.stepCircle.active : s.stepCircle.inactive}>
              {step > n ? <CheckCircle2 style={{ width: "16px", height: "16px" }} /> : n}
            </div>
            {n < 3 && <div style={step > n ? s.stepLine.active : s.stepLine.inactive} />}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "8px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" }}>
        {stepLabels.map((label, idx) => (
          <span key={label} style={step >= idx + 1 ? s.stepLabel.active : s.stepLabel.inactive}>
            {label}
          </span>
        ))}
      </div>

      {/* Card */}
      <div style={s.card}>

        {/* ── Step 1: Business info ── */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }} data-testid="dealer-step-1">
            <h2 style={s.sectionTitle}>Dealership details</h2>
            <div>
              <Label required>Dealership name</Label>
              <Input data-testid="dealer-dealership" value={form.dealership} onChange={(e) => update("dealership", e.target.value)} style={{ marginTop: "6px", height: "44px" }} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div><Label>Contact person</Label><Input data-testid="dealer-contact" value={form.contact} onChange={(e) => update("contact", e.target.value)} style={{ marginTop: "6px", height: "44px" }} /></div>
              <div><Label required>Mobile</Label><Input data-testid="dealer-mobile" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} style={{ marginTop: "6px", height: "44px" }} /></div>
              <div><Label required>Email</Label><Input data-testid="dealer-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} style={{ marginTop: "6px", height: "44px" }} /></div>
              <div><Label>City</Label><Input data-testid="dealer-city" value={form.city} onChange={(e) => update("city", e.target.value)} style={{ marginTop: "6px", height: "44px" }} /></div>
              <div><Label>GST number</Label><Input data-testid="dealer-gst" value={form.gst} onChange={(e) => update("gst", e.target.value)} placeholder="27AABCU9603R1Z2" style={{ marginTop: "6px", height: "44px" }} /></div>
              <div><Label>PAN</Label><Input data-testid="dealer-pan" value={form.pan} onChange={(e) => update("pan", e.target.value)} style={{ marginTop: "6px", height: "44px" }} /></div>
            </div>
            <div><Label>Dealership address</Label><Input data-testid="dealer-address" value={form.address} onChange={(e) => update("address", e.target.value)} style={{ marginTop: "6px", height: "44px" }} /></div>
            <div><Label>Bank account (payout)</Label><Input data-testid="dealer-bank" value={form.bank} onChange={(e) => update("bank", e.target.value)} placeholder="HDFC · XXXX1234 · IFSC" style={{ marginTop: "6px", height: "44px" }} /></div>
            <Button onClick={next} data-testid="dealer-step1-next" variant="default">
              Continue to documents
            </Button>
          </div>
        )}

        {/* ── Step 2: Documents ── */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }} data-testid="dealer-step-2">
            <div>
              <h2 style={s.sectionTitle}>Upload documents</h2>
              <p style={{ ...s.helperText, marginTop: "4px" }}>PDF or image. Max 5MB each. Required for KYC.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {DOCS.map((d) => {
                const uploaded = !!docs[d.key];
                return (
                  <div key={d.key} style={{ ...s.docRow, ...(uploaded ? s.docRowUploaded : {}) }}>
                    <div>
                      <p style={s.docLabel}>{d.label}</p>
                      <p style={{ ...s.docSub, ...(uploaded ? s.docSubUploaded : {}) }}>
                        {uploaded ? docs[d.key] : "Not uploaded"}
                      </p>
                    </div>
                    <Button
                      variant={uploaded ? "outline" : "navy"}
                      data-testid={`upload-${d.key}`}
                      onClick={() => setDocs((p) => ({ ...p, [d.key]: `${d.label.split(" ")[0]}.pdf` }))}
                      style={uploaded ? { borderColor: `${ACTIVE_EMERALD}55`, color: ACTIVE_EMERALD } : {}}
                    >
                      {uploaded
                        ? <><CheckCircle2 style={{ width: "16px", height: "16px", marginRight: "4px" }} />Uploaded</>
                        : <><Upload style={{ width: "16px", height: "16px", marginRight: "4px" }} />Upload</>
                      }
                    </Button>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <Button variant="outline" onClick={() => setStep(1)} data-testid="dealer-step2-back">Back</Button>
              <Button variant="default" onClick={next} data-testid="dealer-step2-next">Review &amp; submit</Button>
            </div>
          </div>
        )}

        {/* ── Step 3: Review ── */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }} data-testid="dealer-step-3">
            <h2 style={s.sectionTitle}>Review and submit</h2>

            {/* Business summary */}
            <div style={s.reviewBox}>
              <p style={s.reviewLabel}>{form.dealership || "—"}</p>
              <p style={s.reviewMeta}>{form.contact} · {form.mobile} · {form.email}</p>
              <p style={s.reviewMeta}>{form.address || "Address not provided"}</p>
              <p style={s.reviewMeta}>GST: {form.gst || "—"} · PAN: {form.pan || "—"}</p>
            </div>

            {/* Docs summary */}
            <div style={{ ...s.reviewBox, backgroundColor: CLEAN_WHITE }}>
              <p style={s.reviewLabel}>Documents uploaded</p>
              <ul style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px", listStyle: "none", padding: 0 }}>
                {DOCS.map((d) => (
                  <li key={d.key} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem" }}>
                    <CheckCircle2 style={{
                      width: "16px", height: "16px", flexShrink: 0,
                      color: docs[d.key] ? ACTIVE_EMERALD : `${ENTERPRISE_CHARCOAL}30`,
                    }} />
                    <span style={{ color: docs[d.key] ? ENTERPRISE_CHARCOAL : `${ENTERPRISE_CHARCOAL}55` }}>
                      {d.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Terms notice */}
            <div style={s.notice}>
              <Shield style={{ width: "16px", height: "16px", flexShrink: 0, marginTop: "1px", color: ACTIVE_EMERALD }} />
              By submitting, you agree to ZevGrid dealer terms. Admin will verify and activate your account within 24–48 hours.
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <Button variant="outline" onClick={() => setStep(2)} data-testid="dealer-step3-back" disabled={isSubmitting}>Back</Button>
              <Button variant="default" onClick={submit} data-testid="dealer-step3-submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit application"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
