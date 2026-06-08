import { useEffect, useState } from "react";
import { Building2, ChevronDown, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBusinesses, getBusinessById } from "../../lib/api";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../../app/assets/constants/zevgrid-colors";

export default function BusinessManagement() {
  const [businesses, setBusinesses] = useState([]);
  const [q, setQ] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [businessDetails, setBusinessDetails] = useState({});
  const [detailsLoadingId, setDetailsLoadingId] = useState("");
  const [detailsError, setDetailsError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadBusinesses() {
      setIsLoading(true);
      setLoadError("");
      try {
        const result = await getBusinesses();
        if (!ignore) setBusinesses(result.data);
      } catch (error) {
        if (!ignore) {
          setBusinesses([]);
          setLoadError(error.message || "Businesses could not be loaded.");
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadBusinesses();
    return () => {
      ignore = true;
    };
  }, []);

  const filtered = businesses.filter((business) => {
    const text = `${business.company} ${business.contact} ${business.mobile} ${business.email} ${business.city} ${business.businessType}`.toLowerCase();
    return text.includes(q.toLowerCase());
  });

  const toggleDetails = async (id) => {
    if (selectedId === id) {
      setSelectedId("");
      return;
    }

    setSelectedId(id);
    setDetailsError("");

    if (businessDetails[id]) return;

    setDetailsLoadingId(id);
    try {
      const result = await getBusinessById(id);
      setBusinessDetails((current) => ({ ...current, [id]: result.data }));
    } catch (error) {
      setDetailsError(error.message || "Business details could not be loaded.");
    } finally {
      setDetailsLoadingId("");
    }
  };

  return (
    <div
      data-testid="business-management-page"
      style={{
        margin: "0 auto",
        width: "100%",
        maxWidth: "80rem",
        padding: "1.5rem 2rem",
        backgroundColor: LIGHT_CANVAS_GREY,
        minHeight: "100vh",
      }}
    >
      <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: ELECTRIC_CYAN }}>
        Business accounts
      </p>
      <h1 style={{ marginTop: "0.25rem", fontSize: "1.75rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
        Businesses
      </h1>

      <div style={{ marginTop: "1rem", position: "relative", maxWidth: "30rem" }}>
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
          data-testid="business-search"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Search company, contact, email..."
          style={{
            height: "2.75rem",
            paddingLeft: "2.25rem",
            border: `1px solid ${ELECTRIC_CYAN}33`,
            backgroundColor: CLEAN_WHITE,
            color: ENTERPRISE_CHARCOAL,
            borderRadius: "0.5rem",
          }}
        />
      </div>

      <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {isLoading && (
          <div style={{ borderRadius: "0.75rem", border: `1px dashed ${ELECTRIC_CYAN}44`, backgroundColor: CLEAN_WHITE, padding: "2.5rem", textAlign: "center", fontSize: "0.875rem", color: "#94A3B8" }}>
            Loading businesses...
          </div>
        )}

        {!isLoading && loadError && (
          <div style={{ borderRadius: "0.75rem", border: `1px dashed ${ELECTRIC_CYAN}44`, backgroundColor: CLEAN_WHITE, padding: "2.5rem", textAlign: "center", fontSize: "0.875rem", color: "#94A3B8" }}>
            {loadError}
          </div>
        )}

        {!isLoading && !loadError && filtered.map((business) => (
          <div
            key={business.id}
            data-testid={`business-row-${business.id}`}
            style={{
              borderRadius: "0.75rem",
              border: "1px solid #E2E8F0",
              backgroundColor: CLEAN_WHITE,
              padding: "1.25rem",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <span style={{ display: "flex", height: "2.25rem", width: "2.25rem", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem", backgroundColor: `${ELECTRIC_CYAN}1A`, color: ELECTRIC_CYAN, flexShrink: 0 }}>
                  <Building2 style={{ height: "1rem", width: "1rem" }} />
                </span>
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>{business.company}</h3>
                  <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#475569" }}>
                    {business.contact} · {business.mobile} · {business.email}
                  </p>
                  <p style={{ marginTop: "0.125rem", fontSize: "0.75rem", color: "#64748B" }}>
                    {business.city} · {business.businessType} · Created {business.createdOn}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94A3B8" }}>GST</p>
                <p style={{ marginTop: "0.25rem", fontFamily: "monospace", fontSize: "0.75rem", fontWeight: 600, color: ENTERPRISE_CHARCOAL }}>{business.gst}</p>
                <Button
                  data-testid={`business-details-${business.id}`}
                  onClick={() => toggleDetails(business.id)}
                  variant="outline"
                  style={{
                    marginTop: "0.75rem",
                    border: `1px solid ${ELECTRIC_CYAN}33`,
                    backgroundColor: "transparent",
                    color: ENTERPRISE_CHARCOAL,
                    borderRadius: "0.5rem",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                  }}
                >
                  {selectedId === business.id ? "Hide" : "View"} details
                  <ChevronDown style={{ height: "0.875rem", width: "0.875rem", transform: selectedId === business.id ? "rotate(180deg)" : "none" }} />
                </Button>
              </div>
            </div>

            {selectedId === business.id && (
              <div
                style={{
                  marginTop: "1rem",
                  borderTop: "1px solid #F1F5F9",
                  paddingTop: "1rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {detailsLoadingId === business.id && (
                  <p style={{ gridColumn: "1 / -1", fontSize: "0.875rem", color: "#64748B" }}>Loading details...</p>
                )}
                {detailsError && detailsLoadingId !== business.id && (
                  <p style={{ gridColumn: "1 / -1", fontSize: "0.875rem", color: "#64748B" }}>{detailsError}</p>
                )}
                {businessDetails[business.id] && [
                  ["Company", businessDetails[business.id].company],
                  ["Contact", businessDetails[business.id].contact],
                  ["Mobile", businessDetails[business.id].mobile],
                  ["Email", businessDetails[business.id].email],
                  ["City", businessDetails[business.id].city],
                  ["Business type", businessDetails[business.id].businessType],
                  ["Fleet count", businessDetails[business.id].count ?? "-"],
                  ["GST", businessDetails[business.id].gst],
                  ["Created", businessDetails[business.id].createdOn],
                ].map(([label, value]) => (
                  <div key={label} style={{ borderRadius: "0.5rem", border: `1px solid ${ELECTRIC_CYAN}1A`, backgroundColor: LIGHT_CANVAS_GREY, padding: "0.75rem" }}>
                    <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94A3B8" }}>{label}</p>
                    <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", fontWeight: 600, color: ENTERPRISE_CHARCOAL, overflowWrap: "anywhere" }}>{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {!isLoading && !loadError && filtered.length === 0 && (
          <div style={{ borderRadius: "0.75rem", border: `1px dashed ${ELECTRIC_CYAN}44`, backgroundColor: CLEAN_WHITE, padding: "2.5rem", textAlign: "center", fontSize: "0.875rem", color: "#94A3B8" }}>
            No businesses found.
          </div>
        )}
      </div>
    </div>
  );
}
