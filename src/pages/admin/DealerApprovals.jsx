
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, FileText, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "../../components/StatusBadge";
import { getDealers, updateDealerStatus } from "../../lib/api";
import { toast } from "sonner";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
  CRITICAL_RED,
} from "../../app/assets/constants/zevgrid-colors";

export default function DealerApprovals() {
  const [list, setList] = useState([]);
  const [tab, setTab] = useState("pending");
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadDealers() {
      setIsLoading(true);
      setLoadError("");
      try {
        const result = await getDealers({
          status: tab === "all" ? undefined : tab,
          city,
          q,
        });
        if (!ignore) setList(result.data);
      } catch (error) {
        if (!ignore) {
          setList([]);
          setLoadError(error.message || "Dealers could not be loaded.");
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadDealers();
    return () => {
      ignore = true;
    };
  }, [tab, city, q]);

  const filtered = tab === "all" ? list : list.filter((d) => d.status === tab);

  const act = async (id, status) => {
    setUpdatingId(id);
    try {
      const result = await updateDealerStatus(id, status);
      setList((prev) => prev.map((d) => (d.id === id ? { ...d, ...result.data } : d)));
      toast.success(result.message || `Dealer ${status}`);
    } catch (error) {
      toast.error("Update failed", {
        description: error.message || "Please try again.",
      });
    } finally {
      setUpdatingId("");
    }
  };

  const tabItems = ["pending", "approved", "rejected", "all"];
  const inputStyle = {
    height: "2.75rem",
    border: `1px solid ${ELECTRIC_CYAN}33`,
    backgroundColor: CLEAN_WHITE,
    color: ENTERPRISE_CHARCOAL,
    borderRadius: "0.5rem",
  };

  return (
    <div
      data-testid="dealer-approvals-page"
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
        Verification queue
      </p>
      <h1
        style={{
          marginTop: "0.25rem",
          fontSize: "1.75rem",
          fontWeight: 700,
          color: ENTERPRISE_CHARCOAL,
        }}
      >
        Dealer approvals
      </h1>

      {/* Tabs — override shadcn with inline styles via a wrapper */}
      <div style={{ marginTop: "1.25rem" }}>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList
            data-testid="dealer-approvals-tabs"
            style={{
              backgroundColor: `${ENTERPRISE_CHARCOAL}14`,
              borderRadius: "0.5rem",
              padding: "0.25rem",
              gap: "0.25rem",
              display: "inline-flex",
            }}
          >
            {tabItems.map((t) => (
              <TabsTrigger
                key={t}
                value={t}
                style={{
                  borderRadius: "0.375rem",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  padding: "0.375rem 0.875rem",
                  transition: "all 0.15s ease",
                  ...(tab === t
                    ? {
                        backgroundColor: ELECTRIC_CYAN,
                        color: ENTERPRISE_CHARCOAL,
                        boxShadow: `0 2px 8px ${ELECTRIC_CYAN}44`,
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "#64748B",
                      }),
                }}
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }} className="sm:flex-row">
        <div style={{ position: "relative", flex: 1 }}>
          <SearchIcon
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              height: "1rem",
              width: "1rem",
              color: "#94A3B8",
            }}
          />
          <Input
            data-testid="dealer-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search dealership, contact, email..."
            style={{ ...inputStyle, paddingLeft: "2.25rem" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
            onBlur={(e) => (e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}33`)}
          />
        </div>
        <Input
          data-testid="dealer-city-filter"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          style={{ ...inputStyle, width: "12.5rem" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
          onBlur={(e) => (e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}33`)}
        />
      </div>

      {/* Dealer list */}
      <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {isLoading && (
          <div
            style={{
              borderRadius: "0.75rem",
              border: `1px dashed ${ELECTRIC_CYAN}44`,
              backgroundColor: CLEAN_WHITE,
              padding: "2.5rem",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#94A3B8",
            }}
          >
            Loading dealers...
          </div>
        )}

        {!isLoading && loadError && (
          <div
            style={{
              borderRadius: "0.75rem",
              border: `1px dashed ${ELECTRIC_CYAN}44`,
              backgroundColor: CLEAN_WHITE,
              padding: "2.5rem",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#94A3B8",
            }}
          >
            {loadError}
          </div>
        )}

        {!isLoading && !loadError && filtered.map((d) => (
          <div
            key={d.id}
            data-testid={`dealer-row-${d.id}`}
            style={{
              borderRadius: "0.75rem",
              border: "1px solid #E2E8F0",
              backgroundColor: CLEAN_WHITE,
              padding: "1.25rem",
            }}
          >
            {/* Top row */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>{d.dealership}</h3>
                  <StatusBadge status={d.status} />
                </div>
                <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#475569" }}>
                  {d.contact} · {d.mobile} · {d.email}
                </p>
                <p style={{ marginTop: "0.125rem", fontSize: "0.75rem", color: "#64748B" }}>{d.address}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#94A3B8",
                  }}
                >
                  Joined
                </p>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: ENTERPRISE_CHARCOAL }}>{d.joinedOn}</p>
              </div>
            </div>

            {/* Info tiles */}
            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {[
                { label: "GST", value: d.gst, mono: true },
                { label: "PAN", value: d.pan, mono: true },
                { label: "City", value: d.city, mono: false },
              ].map(({ label, value, mono }) => (
                <div
                  key={label}
                  style={{
                    borderRadius: "0.375rem",
                    border: `1px solid ${ELECTRIC_CYAN}1A`,
                    backgroundColor: LIGHT_CANVAS_GREY,
                    padding: "0.75rem",
                  }}
                >
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
                  <p
                    style={{
                      marginTop: "0.25rem",
                      fontFamily: mono ? "monospace" : "inherit",
                      fontSize: mono ? "0.75rem" : "0.875rem",
                      fontWeight: 600,
                      color: ENTERPRISE_CHARCOAL,
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Documents */}
            <div style={{ marginTop: "1rem" }}>
              <p
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#94A3B8",
                }}
              >
                Documents uploaded ({d.docs.length})
              </p>
              <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {d.docs.map((doc) => (
                  <span
                    key={doc}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      borderRadius: "0.375rem",
                      border: `1px solid ${ELECTRIC_CYAN}22`,
                      backgroundColor: CLEAN_WHITE,
                      padding: "0.25rem 0.5rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: ENTERPRISE_CHARCOAL,
                    }}
                  >
                    <FileText style={{ height: "0.75rem", width: "0.75rem", color: ELECTRIC_CYAN }} />
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* Pending actions */}
            {d.status === "pending" && (
              <div style={{ marginTop: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <Button
                  data-testid={`dealer-approve-${d.id}`}
                  disabled={updatingId === d.id}
                  onClick={() => act(d.id, "approved")}
                  style={{
                    backgroundColor: ACTIVE_EMERALD,
                    color: CLEAN_WHITE,
                    border: "none",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderRadius: "0.5rem",
                    padding: "0 1rem",
                    height: "2.25rem",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <CheckCircle2 style={{ height: "1rem", width: "1rem" }} /> Approve
                </Button>
                <Button
                  data-testid={`dealer-reject-${d.id}`}
                  disabled={updatingId === d.id}
                  onClick={() => act(d.id, "rejected")}
                  variant="outline"
                  style={{
                    border: `1px solid ${CRITICAL_RED}55`,
                    color: CRITICAL_RED,
                    backgroundColor: "transparent",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderRadius: "0.5rem",
                    padding: "0 1rem",
                    height: "2.25rem",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${CRITICAL_RED}0D`)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <XCircle style={{ height: "1rem", width: "1rem" }} /> Reject
                </Button>
              </div>
            )}

            {/* Approved actions */}
            {d.status === "approved" && (
              <div style={{ marginTop: "1.25rem" }}>
                <Button
                  data-testid={`dealer-suspend-${d.id}`}
                  disabled={updatingId === d.id}
                  onClick={() => act(d.id, "suspended")}
                  variant="outline"
                  style={{
                    border: "1px solid #E2E8F0",
                    color: "#64748B",
                    backgroundColor: "transparent",
                    fontWeight: 600,
                    cursor: "pointer",
                    borderRadius: "0.5rem",
                    padding: "0 1rem",
                    height: "2.25rem",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = ENTERPRISE_CHARCOAL)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
                >
                  Suspend
                </Button>
              </div>
            )}
          </div>
        ))}

        {/* Empty state */}
        {!isLoading && !loadError && filtered.length === 0 && (
          <div
            style={{
              borderRadius: "0.75rem",
              border: `1px dashed ${ELECTRIC_CYAN}44`,
              backgroundColor: CLEAN_WHITE,
              padding: "2.5rem",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#94A3B8",
            }}
          >
            No dealers in this tab.
          </div>
        )}
      </div>
    </div>
  );
}
