import { useEffect, useState } from "react";
import { Search as SearchIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "../../components/StatusBadge";
import { DEALERS } from "../../data/mockData";
import { API_BASE_URL, getVehicles, updateVehicleStatus } from "../../lib/api";
import { toast } from "sonner";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
} from "../../app/assets/constants/zevgrid-colors";

export default function ListingManagement() {
  const [q, setQ] = useState("");
  const [list, setList] = useState([]);
  const [stateFilter, setStateFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadListings() {
      setIsLoading(true);
      setLoadError("");
      try {
        const result = await getVehicles({
          q,
          status: stateFilter,
        });
        if (!ignore) setList(result.data);
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
  }, [q, stateFilter]);

  const dealerById = (id) => DEALERS.find((d) => d.id === id);

  const filtered = list.filter((v) => {
    const text = `${v.brand} ${v.model} ${v.type}`.toLowerCase();
    const matchesQ = text.includes(q.toLowerCase());
    const matchesState = stateFilter === "all" || v.status === stateFilter;
    return matchesQ && matchesState;
  });

  const setStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const result = await updateVehicleStatus(id, status);
      setList((prev) => prev.map((v) => (v.id === id ? { ...v, ...result.data } : v)));
      toast.success(result.message || `Listing marked ${status}`);
    } catch (error) {
      toast.error("Update failed", {
        description: error.message || "Please try again.",
      });
    } finally {
      setUpdatingId("");
    }
  };
const handleExport = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/export/listings.csv`, {
      method: "GET",
      headers: { accept: "*/*" },
    });
    if (!response.ok) throw new Error("Export failed");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "listings_list.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("listings exported successfully");
  } catch (error) {
    toast.error("Export failed", { description: error.message || "Please try again." });
  }
};
  const inputStyle = {
    height: "2.75rem",
    border: `1px solid ${ELECTRIC_CYAN}33`,
    backgroundColor: CLEAN_WHITE,
    color: ENTERPRISE_CHARCOAL,
    borderRadius: "0.5rem",
  };

  return (
    <div
      data-testid="listing-management-page"
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
            All listings
          </p>
          <h1 style={{ marginTop: "0.25rem", fontSize: "1.75rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
            Listing management
          </h1>
        </div>
        <Button
          data-testid="export-btn"
          variant="outline"
          style={{
            border: "1px solid #E2E8F0",
            color: "#64748B",
            backgroundColor: "transparent",
            fontWeight: 600,
            borderRadius: "0.5rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
          onClick={handleExport} 
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
        >
          <Download style={{ height: "1rem", width: "1rem" }} /> Export CSV
        </Button>
      </div>

      {/* Search + Filter */}
      <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }} className="sm:flex-row">
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
            data-testid="listings-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by brand, model, type..."
            style={{ ...inputStyle, paddingLeft: "2.25rem" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
            onBlur={(e) => (e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}33`)}
          />
        </div>
        <Select value={stateFilter} onValueChange={setStateFilter}>
          <SelectTrigger
            data-testid="listings-status-filter"
            style={{ ...inputStyle, width: "12.5rem" }}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["all", "live", "pending", "draft", "inactive"].map((val) => (
              <SelectItem key={val} value={val}>
                {val === "all" ? "All statuses" : val.charAt(0).toUpperCase() + val.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div
        style={{
          marginTop: "1.25rem",
          overflow: "hidden",
          borderRadius: "0.75rem",
          border: "1px solid #E2E8F0",
          backgroundColor: CLEAN_WHITE,
        }}
      >
        {/* Table header */}
        <div
          className="lg:grid"
          style={{
            display: "none",
            gridTemplateColumns: "1.6fr 1.2fr 1fr 1fr 1fr",
            gap: "1rem",
            borderBottom: `1px solid ${ELECTRIC_CYAN}1A`,
            backgroundColor: LIGHT_CANVAS_GREY,
            padding: "0.75rem 1.25rem",
          }}
        >
          {["Vehicle", "Dealer", "Rent", "Status", "Action"].map((col) => (
            <div
              key={col}
              style={{
                fontSize: "0.625rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#94A3B8",
              }}
            >
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {isLoading && (
          <div style={{ padding: "2.5rem", textAlign: "center", fontSize: "0.875rem", color: "#94A3B8" }}>
            Loading listings...
          </div>
        )}

        {!isLoading && loadError && (
          <div style={{ padding: "2.5rem", textAlign: "center", fontSize: "0.875rem", color: "#94A3B8" }}>
            {loadError}
          </div>
        )}

        {!isLoading && !loadError && filtered.map((v) => {
          const dealer = dealerById(v.dealerId);
          return (
            <div
              key={v.id}
              data-testid={`lm-row-${v.id}`}
              className="lg:grid lg:items-center"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                borderBottom: "1px solid #F1F5F9",
                padding: "1rem 1.25rem",
              }}
            >
              {/* Vehicle */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <img src={v.image} alt="" style={{ height: "3rem", width: "3rem", borderRadius: "0.375rem", objectFit: "cover" }} />
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 700, color: ENTERPRISE_CHARCOAL }}>
                    {v.brand} {v.model}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#64748B" }}>{v.type} · {v.condition}</p>
                </div>
              </div>

              {/* Dealer */}
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: ENTERPRISE_CHARCOAL }}>{dealer?.dealership || "—"}</p>
                <p style={{ fontSize: "0.75rem", color: "#64748B" }}>{dealer?.city}</p>
              </div>

              {/* Rent */}
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: ACTIVE_EMERALD }}>
                ₹{v.monthlyRent.toLocaleString("en-IN")}
                <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#94A3B8" }}>/mo</span>
              </p>

              {/* Status badge */}
              <div><StatusBadge status={v.status} /></div>

              {/* Action select */}
              <Select value={v.status} onValueChange={(val) => setStatus(v.id, val)} disabled={updatingId === v.id}>
                <SelectTrigger
                  data-testid={`lm-status-${v.id}`}
                  style={{
                    height: "2.25rem",
                    width: "8.75rem",
                    border: `1px solid ${ELECTRIC_CYAN}33`,
                    borderRadius: "0.5rem",
                    backgroundColor: CLEAN_WHITE,
                    color: ENTERPRISE_CHARCOAL,
                    fontWeight: 600,
                    fontSize: "0.8125rem",
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["live", "pending", "draft", "inactive"].map((val) => (
                    <SelectItem key={val} value={val}>
                      {val.charAt(0).toUpperCase() + val.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        })}

        {/* Empty state */}
        {!isLoading && !loadError && filtered.length === 0 && (
          <div style={{ padding: "2.5rem", textAlign: "center", fontSize: "0.875rem", color: "#94A3B8" }}>
            No listings found.
          </div>
        )}
      </div>
    </div>
  );
}
