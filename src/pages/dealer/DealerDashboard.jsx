
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Package, Clock, Inbox, TrendingUp, ArrowRight, PlusCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import StatusBadge from "../../components/StatusBadge";
import { LEADS, STATS } from "../../data/mockData";
import { getDealerById, getDealerStats, getVehicles, updateDealer } from "../../lib/api";
import { toast } from "sonner";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
  WARNING_AMBER,
} from "../../app/assets/constants/zevgrid-colors";

const TONE_MAP = {
  cyan:   { bg: `${ELECTRIC_CYAN}1A`,  icon: ELECTRIC_CYAN },
  amber:  { bg: `${WARNING_AMBER}1A`,  icon: WARNING_AMBER },
  blue:   { bg: "#3B82F61A",           icon: "#3B82F6" },
  emerald:{ bg: `${ACTIVE_EMERALD}1A`, icon: ACTIVE_EMERALD },
};

const Stat = ({ icon: Icon, label, value, tone = "cyan" }) => {
  const colors = TONE_MAP[tone] ?? TONE_MAP.cyan;
  return (
    <div
      style={{
        borderRadius: "0.75rem",
        border: "1px solid #E2E8F0",
        backgroundColor: CLEAN_WHITE,
        padding: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          style={{
            display: "flex",
            height: "2rem",
            width: "2rem",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0.375rem",
            backgroundColor: colors.bg,
            color: colors.icon,
          }}
        >
          <Icon style={{ height: "1rem", width: "1rem" }} />
        </span>
        <p
          style={{
            fontSize: "0.625rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#94A3B8",
          }}
        >
          {label}
        </p>
      </div>
      <p style={{ marginTop: "0.75rem", fontSize: "1.875rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
        {value}
      </p>
    </div>
  );
};

const seeAllLink = {
  fontSize: "0.75rem",
  fontWeight: 700,
  color: ELECTRIC_CYAN,
  textDecoration: "none",
};

export default function DealerDashboard() {
  const [dealer, setDealer] = useState(null);
  const [dealerError, setDealerError] = useState("");
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(false);
  const [vehiclesError, setVehiclesError] = useState("");
  const [profileForm, setProfileForm] = useState({
    dealership: "",
    contact: "",
    mobile: "",
    email: "",
    city: "",
    gst: "",
    pan: "",
    address: "",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const myLeads = LEADS.slice(0, 3);

  useEffect(() => {
    let ignore = false;
    const dealerId = localStorage.getItem("zevgrid_dealer_id");

    async function loadAll() {
      setIsLoadingVehicles(true);

      try {
        const [dealerResult, statsResult, vehiclesResult] = await Promise.all([
          getDealerById(dealerId),
          getDealerStats(dealerId),
          getVehicles({ dealerId }),
        ]);

        if (!ignore) {
          // Dealer profile
          setDealer(dealerResult.data);
          setProfileForm({
            dealership: dealerResult.data.dealership || "",
            contact:    dealerResult.data.contact    || "",
            mobile:     dealerResult.data.mobile     || "",
            email:      dealerResult.data.email      || "",
            city:       dealerResult.data.city       || "",
            gst:        dealerResult.data.gst        || "",
            pan:        dealerResult.data.pan        || "",
            address:    dealerResult.data.address    || "",
          });

          // Stats
          setStats(statsResult.data);

          // Vehicles — already scoped to this dealer by the API
          setVehicles(vehiclesResult.data);
        }
      } catch (error) {
        if (!ignore) {
          const msg = error.message || "Could not load data.";
          setDealerError(msg);
          setStatsError(msg);
          setVehiclesError(msg);
        }
      } finally {
        if (!ignore) setIsLoadingVehicles(false);
      }
    }

    if (dealerId) loadAll();
    return () => { ignore = true; };
  }, []);

  const updateProfileField = (field, value) =>
    setProfileForm((curr) => ({ ...curr, [field]: value }));

  const saveProfile = async () => {
    const dealerId = dealer?.id || localStorage.getItem("zevgrid_dealer_id");

    if (!dealerId) {
      toast.error("Dealer profile unavailable", {
        description: "Register or sign in as a dealer before updating profile details.",
      });
      return;
    }

    setIsSavingProfile(true);
    try {
      const result = await updateDealer(dealerId, profileForm);
      setDealer(result.data);
      setProfileForm({
        dealership: result.data.dealership || "",
        contact:    result.data.contact    || "",
        mobile:     result.data.mobile     || "",
        email:      result.data.email      || "",
        city:       result.data.city       || "",
        gst:        result.data.gst        || "",
        pan:        result.data.pan        || "",
        address:    result.data.address    || "",
      });
      toast.success(result.message || "Dealer profile updated");
    } catch (error) {
      toast.error("Profile update failed", {
        description: error.message || "Please try again.",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <div
      data-testid="dealer-dashboard"
      style={{
        margin: "0 auto",
        width: "100%",
        maxWidth: "80rem",
        padding: "1.5rem 2rem",
        backgroundColor: LIGHT_CANVAS_GREY,
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
        <div>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: ELECTRIC_CYAN }}>
            Dealer dashboard
          </p>
          <h1 style={{ marginTop: "0.25rem", fontSize: "1.75rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
            Welcome back, {dealer?.dealership || "Dealer"}
          </h1>
          <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
            {dealer?.status && <StatusBadge status={dealer.status} />}
            {dealer && (
              <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>
                {dealer.city} · {dealer.mobile}
              </span>
            )}
            {!dealer && dealerError && (
              <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>{dealerError}</span>
            )}
          </div>
        </div>
        <Link to="/dealer/add-vehicle">
          <Button
            data-testid="dealer-add-cta"
            style={{
              backgroundColor: ACTIVE_EMERALD,
              color: CLEAN_WHITE,
              border: "none",
              fontWeight: 700,
              borderRadius: "0.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              padding: "0 1rem",
              height: "2.5rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <PlusCircle style={{ height: "1rem", width: "1rem" }} /> Add vehicle
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div
        style={{
          marginTop: "1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0.75rem",
        }}
        className="md:grid-cols-4"
      >
        <Stat icon={Package}    label="Live listings"  value={stats?.vehicles.live      ?? STATS.dealer.liveListings}    tone="emerald" />
        <Stat icon={Clock}      label="Total vehicles"  value={stats?.vehicles.total     ?? STATS.dealer.pendingListings}  tone="amber"   />
        <Stat icon={Inbox}      label="New inquiries"  value={stats?.leads.new          ?? STATS.dealer.newInquiries}     tone="blue"    />
        <Stat icon={TrendingUp} label="Converted"      value={stats?.leads.converted    ?? STATS.dealer.converted}        tone="cyan"    />
      </div>
      {statsError && (
        <p style={{ marginTop: "0.75rem", fontSize: "0.8125rem", color: "#64748B" }}>{statsError}</p>
      )}

      {/* Two-column sections */}
      <div
        style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}
        className="lg:grid-cols-2"
      >
        {/* Recent listings */}
        <section
          style={{ borderRadius: "0.75rem", border: "1px solid #E2E8F0", backgroundColor: CLEAN_WHITE, padding: "1.25rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>Your recent listings</h2>
            <Link
              to="/dealer/listings"
              style={seeAllLink}
              data-testid="dealer-see-listings"
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              See all →
            </Link>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {isLoadingVehicles && (
              <p style={{ fontSize: "0.875rem", color: "#94A3B8", textAlign: "center", padding: "1rem 0" }}>
                Loading listings…
              </p>
            )}
            {!isLoadingVehicles && vehiclesError && (
              <p style={{ fontSize: "0.875rem", color: "#64748B" }}>{vehiclesError}</p>
            )}
            {!isLoadingVehicles && !vehiclesError && vehicles.slice(0, 4).map((v) => (
              <div
                key={v.id}
                data-testid={`dealer-listing-${v.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  borderRadius: "0.375rem",
                  border: `1px solid ${ELECTRIC_CYAN}1A`,
                  padding: "0.75rem",
                }}
              >
                <img src={v.image} alt="" style={{ height: "3.5rem", width: "3.5rem", borderRadius: "0.375rem", objectFit: "cover", flexShrink: 0 }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: ENTERPRISE_CHARCOAL, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {v.brand} {v.model}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#64748B" }}>
                    ₹{v.monthlyRent.toLocaleString("en-IN")}/mo · {v.quantity} units
                  </p>
                </div>
                <StatusBadge status={v.status} />
              </div>
            ))}
            {!isLoadingVehicles && !vehiclesError && vehicles.length === 0 && (
              <p
                style={{
                  borderRadius: "0.375rem",
                  border: `1px dashed ${ELECTRIC_CYAN}44`,
                  padding: "1.5rem",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "#94A3B8",
                }}
              >
                No listings yet. Add your first vehicle.
              </p>
            )}
          </div>
        </section>

        {/* Recent inquiries */}
        <section
          style={{ borderRadius: "0.75rem", border: "1px solid #E2E8F0", backgroundColor: CLEAN_WHITE, padding: "1.25rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>Recent inquiries</h2>
            <Link
              to="/dealer/inquiries"
              style={seeAllLink}
              data-testid="dealer-see-inquiries"
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              See all →
            </Link>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {myLeads.map((l) => (
              <div
                key={l.id}
                data-testid={`dealer-lead-${l.id}`}
                style={{
                  borderRadius: "0.375rem",
                  border: `1px solid ${ELECTRIC_CYAN}1A`,
                  padding: "0.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: ENTERPRISE_CHARCOAL }}>{l.company}</p>
                    <p style={{ fontSize: "0.75rem", color: "#64748B" }}>
                      {l.contact} · {l.vehiclesNeeded} × {l.preferredType} · {l.budget}
                    </p>
                  </div>
                  <StatusBadge status={l.stage} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Dealer profile form */}
      <section
        style={{
          marginTop: "2rem",
          borderRadius: "0.75rem",
          border: "1px solid #E2E8F0",
          backgroundColor: CLEAN_WHITE,
          padding: "1.25rem",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          <div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>Dealer profile</h2>
            <p style={{ marginTop: "0.25rem", fontSize: "0.8125rem", color: "#64748B" }}>
              Keep dealership and contact details current for admin verification.
            </p>
          </div>
          <Button
            data-testid="dealer-profile-save"
            onClick={saveProfile}
            disabled={isSavingProfile}
            style={{
              backgroundColor: ACTIVE_EMERALD,
              color: CLEAN_WHITE,
              border: "none",
              fontWeight: 700,
              borderRadius: "0.5rem",
              cursor: "pointer",
              padding: "0 1rem",
              height: "2.5rem",
            }}
          >
            {isSavingProfile ? "Saving..." : "Save profile"}
          </Button>
        </div>

        <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          {[
            ["dealership", "Dealership"],
            ["contact",    "Contact person"],
            ["mobile",     "Mobile"],
            ["email",      "Email"],
            ["city",       "City"],
            ["gst",        "GST"],
            ["pan",        "PAN"],
            ["address",    "Address"],
          ].map(([field, label]) => (
            <div key={field}>
              <Label>{label}</Label>
              <Input
                data-testid={`dealer-profile-${field}`}
                value={profileForm[field]}
                onChange={(e) => updateProfileField(field, e.target.value)}
                disabled={isSavingProfile}
                style={{
                  marginTop: "0.375rem",
                  height: "2.75rem",
                  border: `1px solid ${ELECTRIC_CYAN}33`,
                  borderRadius: "0.5rem",
                  color: ENTERPRISE_CHARCOAL,
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section
        style={{
          marginTop: "2rem",
          borderRadius: "0.75rem",
          border: `1px solid ${ELECTRIC_CYAN}33`,
          background: `linear-gradient(135deg, ${ELECTRIC_CYAN}12 0%, ${ACTIVE_EMERALD}0D 100%)`,
          padding: "1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
            Grow your fleet visibility
          </h3>
          <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#475569" }}>
            Listings with 5+ photos get 3× more inquiries.
          </p>
        </div>
        <Link to="/dealer/add-vehicle">
          <Button
            data-testid="dealer-grow-cta"
            style={{
              backgroundColor: ACTIVE_EMERALD,
              color: CLEAN_WHITE,
              border: "none",
              fontWeight: 700,
              borderRadius: "0.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              padding: "0 1rem",
              height: "2.5rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Add listing <ArrowRight style={{ height: "1rem", width: "1rem" }} />
          </Button>
        </Link>
      </section>
    </div>
  );
}