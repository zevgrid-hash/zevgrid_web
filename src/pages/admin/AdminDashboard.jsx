
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserCheck, CarFront, Inbox, TrendingUp, Clock } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import { STATS, LEADS, VEHICLES, LEAD_STAGES } from "../../data/mockData";
import { getAdminStats, getDealers, getVehicles } from "../../lib/api";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
  WARNING_AMBER,
} from "../../app/assets/constants/zevgrid-colors";

const metricCardStyle = {
  background: CLEAN_WHITE,
  border: `1px solid #E2E8F0`,
  borderRadius: "0.75rem",
  padding: "1.25rem",
  display: "block",
  textDecoration: "none",
  transition: "all 0.2s ease",
  color: "inherit",
};

const metricIconWrapStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "2.25rem",
  width: "2.25rem",
  borderRadius: "0.375rem",
  backgroundColor: `${ELECTRIC_CYAN}1A`, // 10% opacity
  color: ELECTRIC_CYAN,
};

const Metric = ({ icon: Icon, label, value, sub, link }) => (
  <Link
    to={link}
    style={metricCardStyle}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = ELECTRIC_CYAN;
      e.currentTarget.style.boxShadow = `0 4px 12px ${ELECTRIC_CYAN}22`;
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "#E2E8F0";
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={metricIconWrapStyle}>
        <Icon style={{ height: "1rem", width: "1rem" }} />
      </span>
      <span
        style={{
          fontSize: "0.625rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: ELECTRIC_CYAN,
        }}
      >
        {sub}
      </span>
    </div>
    <p
      style={{
        marginTop: "1rem",
        fontSize: "0.625rem",
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#64748B",
      }}
    >
      {label}
    </p>
    <p
      style={{
        marginTop: "0.25rem",
        fontSize: "1.875rem",
        fontWeight: 700,
        color: ENTERPRISE_CHARCOAL,
      }}
    >
      {value}
    </p>
  </Link>
);

export default function AdminDashboard() {
  const [adminStats, setAdminStats] = useState(null);
  const [statsError, setStatsError] = useState("");
  const [pendingDealers, setPendingDealers] = useState([]);
  const [pendingDealersError, setPendingDealersError] = useState("");
  // const pendingVehicles = VEHICLES.filter((v) => v.status === "pending");
  
  const pipeline = LEAD_STAGES.map((s) => ({
    ...s,
    count: LEADS.filter((l) => l.stage === s.key).length,
  }));

  useEffect(() => {
    let ignore = false;

    async function loadStats() {
      try {
        const [statsResult, dealersResult] = await Promise.all([
          getAdminStats(),
          getDealers({ status: "pending" }),
        ]);
        if (!ignore) {
          setAdminStats(statsResult.data);
          setPendingDealers(dealersResult.data);
        }
      } catch (error) {
        if (!ignore) {
          setStatsError(error.message || "Admin stats could not be loaded.");
          setPendingDealersError(error.message || "Pending dealers could not be loaded.");
        }
      }
    }

    loadStats();
    return () => {
      ignore = true;
    };
  }, []);
    const [list, setList] = useState([]);
 
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
 
  useEffect(() => {
    let ignore = false;

    async function loadListings() {
      setIsLoading(true);
      setLoadError("");
      try {
        const result = await getVehicles({
          status: "pending"
        });
        if (!ignore) setList(result.data);
        console.log(result.data)
      } catch (error) {
        if (!ignore) {
          setList([]);
          setLoadError(error.message || "Listings could not be loaded.");
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadListings();
    return () => {
      ignore = true;
    };
  }, []);
  const sectionStyle = {
    borderRadius: "0.75rem",
    border: "1px solid #E2E8F0",
    background: CLEAN_WHITE,
    padding: "1.25rem",
  };

  const sectionHeadingStyle = {
    fontWeight: 700,
    fontSize: "1.125rem",
    color: ENTERPRISE_CHARCOAL,
  };

  const openQueueLinkStyle = {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: ELECTRIC_CYAN,
    textDecoration: "none",
  };

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "0.375rem",
    border: "1px solid #F1F5F9",
    padding: "0.75rem",
  };

  const labelSmStyle = {
    fontSize: "0.75rem",
    color: "#64748B",
  };

  const pipelineCardStyle = {
    borderRadius: "0.375rem",
    border: "1px solid #E2E8F0",
    backgroundColor: LIGHT_CANVAS_GREY,
    padding: "0.75rem",
  };

  return (
    <div
      data-testid="admin-dashboard"
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
      <p
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: ELECTRIC_CYAN,
        }}
      >
        Ops overview
      </p>
      <h1
        style={{
          marginTop: "0.25rem",
          fontSize: "1.75rem",
          fontWeight: 700,
          color: ENTERPRISE_CHARCOAL,
        }}
      >
        Marketplace control room
      </h1>

      {/* Metrics Grid */}
      <div
        style={{
          marginTop: "1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0.75rem",
        }}
        className="md:grid-cols-4"
      >
        <Metric icon={UserCheck} label="Pending dealers" value={adminStats?.dealers.pending ?? STATS.admin.dealersPending} sub="Review" link="/admin/dealer-approvals" />
        <Metric icon={CarFront} label="Pending listings" value={adminStats?.vehicles.pending ?? STATS.admin.listingsPending} sub="Approve" link="/admin/vehicle-approvals" />
        <Metric icon={Inbox} label="New leads" value={adminStats?.leads.new ?? STATS.admin.leadsNew} sub="Qualify" link="/admin/leads" />
        <Metric icon={TrendingUp} label="Businesses" value={adminStats?.businesses.total ?? STATS.admin.leadsConverted} sub="Accounts" link="/admin/businesses" />
      </div>
      {statsError && (
        <p style={{ marginTop: "0.75rem", fontSize: "0.8125rem", color: "#64748B" }}>{statsError}</p>
      )}

      {/* Two-column sections */}
      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1.5rem",
        }}
        className="lg:grid-cols-2"
      >
        {/* Pending Dealer Approvals */}
        <section style={sectionStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={sectionHeadingStyle}>Pending dealer approvals</h2>
            <Link
              to="/admin/dealer-approvals"
              style={openQueueLinkStyle}
              data-testid="admin-see-dealers"
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Open queue →
            </Link>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {pendingDealers.map((d) => (
              <div key={d.id} data-testid={`admin-pending-dealer-${d.id}`} style={rowStyle}>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: ENTERPRISE_CHARCOAL }}>{d.dealership}</p>
                  <p style={labelSmStyle}>
                    {d.contact} · {d.city} · {d.mobile}
                  </p>
                </div>
                <Clock style={{ height: "1rem", width: "1rem", color: WARNING_AMBER }} />
              </div>
            ))}
            {pendingDealersError && (
              <p style={labelSmStyle}>{pendingDealersError}</p>
            )}
            {!pendingDealersError && pendingDealers.length === 0 && (
              <p style={labelSmStyle}>No pending dealers.</p>
            )}
          </div>
        </section>

        {/* Listings Awaiting Review */}
        <section style={sectionStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={sectionHeadingStyle}>Listings awaiting review</h2>
            <Link
              to="/admin/vehicle-approvals"
              style={openQueueLinkStyle}
              data-testid="admin-see-vehicles"
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Open queue →
            </Link>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {list.map((v) => (
              <div key={v.id} data-testid={`admin-pending-vehicle-${v.id}`} style={{ ...rowStyle, justifyContent: "flex-start", gap: "0.75rem" }}>
                <img src={v.image} alt="" style={{ height: "3rem", width: "3rem", borderRadius: "0.375rem", objectFit: "cover" }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: ENTERPRISE_CHARCOAL, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {v.brand} {v.model}
                  </p>
                  <p style={labelSmStyle}>
                    {v.type} · ₹{v.monthlyRent.toLocaleString("en-IN")}/mo · {v.photos} photos
                  </p>
                </div>
                <Clock style={{ height: "1rem", width: "1rem", color: WARNING_AMBER, flexShrink: 0 }} />
              </div>
            ))}
            {list.length === 0 && (
              <p style={labelSmStyle}>No pending listings.</p>
            )}
          </div>
        </section>
      </div>

      {/* Lead Pipeline */}
      <section style={{ ...sectionStyle, marginTop: "2rem" }}>
        <h2 style={sectionHeadingStyle}>Lead pipeline</h2>
        <div
          style={{
            marginTop: "1rem",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0.75rem",
          }}
          className="sm:grid-cols-4 lg:grid-cols-7"
        >
          {pipeline.map((s) => (
            <div key={s.key} data-testid={`pipeline-${s.key}`} style={pipelineCardStyle}>
              <StatusBadge status={s.key} />
              <p
                style={{
                  marginTop: "0.75rem",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: ENTERPRISE_CHARCOAL,
                }}
              >
                {s.count}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
