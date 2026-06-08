
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, X, MapPin } from "lucide-react";
import { Button } from "../../components/ui/button";

import { Label } from "../../components/ui/label";
import { Slider } from "../../components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../components/ui/sheet";
import VehicleCard from "../../components/VehicleCard";
import { getVehicles } from "../../lib/api";

import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../../app/assets/constants/zevgrid-colors";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const initialType = params.get("type") || "all";

  const [type, setType] = useState(initialType);
  const [maxRent, setMaxRent] = useState(30000);
  const [minRange, setMinRange] = useState(80);
  const [tenure, setTenure] = useState("any");
  const [sort, setSort] = useState("rent-asc");
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadVehicles() {
      setIsLoading(true);
      setLoadError("");
      try {
        const result = await getVehicles({
          status: "live",
          type,
          maxRent,
          minRange,
        });
        if (!ignore) setVehicles(result.data);
      } catch (error) {
        if (!ignore) {
          setVehicles([]);
          setLoadError(error.message || "Vehicles could not be loaded.");
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadVehicles();
    return () => {
      ignore = true;
    };
  }, [type, maxRent, minRange]);

  const filtered = useMemo(() => {
    let list = [...vehicles];
    if (tenure !== "any") list = list.filter((v) => v.minTenure <= Number(tenure));
    if (sort === "rent-asc") list.sort((a, b) => a.monthlyRent - b.monthlyRent);
    if (sort === "rent-desc") list.sort((a, b) => b.monthlyRent - a.monthlyRent);
    if (sort === "range-desc") list.sort((a, b) => b.claimedRange - a.claimedRange);
    return list;
  }, [vehicles, tenure, sort]);

  const clearAll = () => {
    setType("all");
    setMaxRent(12000);
    setMinRange(80);
    setTenure("any");
    setParams({});
  };

  // Map constants to CSS variables for clean Tailwind integration
  const themeStyles = {
    "--cyan": ELECTRIC_CYAN,
    "--cyan-light": `${ELECTRIC_CYAN}1A`,       // ~10% opacity for active filter bg
    "--cyan-border": `${ELECTRIC_CYAN}4D`,      // ~30% opacity for panel borders
    "--charcoal": ENTERPRISE_CHARCOAL,
    "--charcoal-light": `${ENTERPRISE_CHARCOAL}33`, // ~20% opacity for borders
    "--charcoal-muted": `${ENTERPRISE_CHARCOAL}99`, // ~60% opacity for subtext
    "--navy": INFRASTRUCTURE_NAVY,
    "--white": CLEAN_WHITE,
    "--grey": LIGHT_CANVAS_GREY,
  };

  const FilterPanel = () => (
    <div className="space-y-6" data-testid="filter-panel">
      <div>
        <Label className="text-xs font-bold uppercase tracking-widest text-[var(--charcoal-muted)]">Vehicle type</Label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {["all", "2W", "3W"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              data-testid={`filter-type-${t}`}
              className={`rounded-md border px-3 py-2 text-sm font-semibold transition-colors ${
                type === t
                  ? "border-[var(--cyan)] bg-[var(--cyan-light)] text-[var(--navy)]"
                  : "border-[var(--charcoal-light)] bg-[var(--white)] text-[var(--charcoal-muted)] hover:border-[var(--cyan)]"
              }`}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs font-bold uppercase tracking-widest text-[var(--charcoal-muted)]">Max monthly rent</Label>
          <span className="text-sm font-bold text-[var(--charcoal)]">₹{maxRent.toLocaleString("en-IN")}</span>
        </div>
        <Slider
          data-testid="filter-rent-slider"
          min={200}
          max={15000}
          step={500}
          value={[maxRent]}
          onValueChange={(v) => setMaxRent(v[0])}
          className="mt-3"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs font-bold uppercase tracking-widest text-[var(--charcoal-muted)]">Min range (km)</Label>
          <span className="text-sm font-bold text-[var(--charcoal)]">{minRange}+ km</span>
        </div>
        <Slider
          data-testid="filter-range-slider"
          min={50}
          max={250}
          step={10}
          value={[minRange]}
          onValueChange={(v) => setMinRange(v[0])}
          className="mt-3"
        />
      </div>
      <div>
        <Label className="text-xs font-bold uppercase tracking-widest text-[var(--charcoal-muted)]">Tenure</Label>
        <Select value={tenure} onValueChange={setTenure}>
          <SelectTrigger className="mt-2 border-[var(--charcoal-light)] focus:ring-[var(--cyan)]" data-testid="filter-tenure">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="6">Up to 6 months</SelectItem>
            <SelectItem value="12">Up to 12 months</SelectItem>
            <SelectItem value="24">Up to 24 months</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="outline"
        onClick={clearAll}
        data-testid="filter-clear-btn"
        className="w-full border-[var(--charcoal-light)] text-[var(--charcoal)] hover:bg-[var(--grey)]"
      >
        <X className="mr-2 h-4 w-4" />
        Clear filters
      </Button>
    </div>
  );

  return (
    <div data-testid="search-page" style={themeStyles} className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-[var(--charcoal)]">
      <div className="flex items-center gap-2 text-sm text-[var(--charcoal-muted)]">
        <MapPin className="h-4 w-4 text-[var(--cyan)]" />
        Pune <span className="text-[var(--charcoal-light)]">·</span> {filtered.length} EVs available
      </div>
      <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Browse Electric Vehicles</h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--charcoal-muted)]">
        Public inventory. Sign up only to request quotes or unlock dealer contact.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden rounded-xl border border-[var(--charcoal-light)] bg-[var(--white)] p-6 lg:block">
          <h2 className="font-display text-lg font-bold">Filters</h2>
          <div className="mt-4">
            <FilterPanel />
          </div>
        </aside>

        <div>
          {/* Mobile filter + sort */}
          <div className="mb-4 flex items-center justify-between gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="lg:hidden border-[var(--charcoal-light)] text-[var(--charcoal)]"
                  data-testid="mobile-filter-btn"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85%] sm:w-[380px] bg-[var(--white)]">
                <SheetHeader>
                  <SheetTitle className="text-[var(--charcoal)]">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterPanel />
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px] border-[var(--charcoal-light)] focus:ring-[var(--cyan)]" data-testid="sort-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent-asc">Rent: low to high</SelectItem>
                <SelectItem value="rent-desc">Rent: high to low</SelectItem>
                <SelectItem value="range-desc">Range: high to low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="rounded-xl border border-dashed border-[var(--charcoal-light)] bg-[var(--white)] p-10 text-center text-sm text-[var(--charcoal-muted)]">
              Loading EVs...
            </div>
          ) : loadError ? (
            <div className="rounded-xl border border-dashed border-[var(--charcoal-light)] bg-[var(--white)] p-10 text-center">
              <p className="font-display text-lg font-bold">Could not load EVs</p>
              <p className="mt-2 text-sm text-[var(--charcoal-muted)]">{loadError}</p>
              <Button onClick={clearAll} className="mt-4 bg-[var(--cyan)] text-[var(--navy)] hover:opacity-90 font-bold">
                Reset filters
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div
              data-testid="no-results"
              className="rounded-xl border border-dashed border-[var(--charcoal-light)] bg-[var(--white)] p-10 text-center"
            >
              <p className="font-display text-lg font-bold">No EVs match your filters</p>
              <p className="mt-2 text-sm text-[var(--charcoal-muted)]">Try widening the range or rent budget.</p>
              <Button onClick={clearAll} className="mt-4 bg-[var(--cyan)] text-[var(--navy)] hover:opacity-90 font-bold">
                Reset filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          )}

          {/* Inline CTA */}
          <div className="mt-10 rounded-xl border border-[var(--cyan-border)] bg-[var(--cyan-light)] p-6">
            <h3 className="font-display text-lg font-bold text-[var(--navy)]">Can't find the right fit?</h3>
            <p className="mt-1 text-sm text-[var(--charcoal)]">
              Post your fleet requirement — our ops team will match you with dealer inventory.
            </p>
            <Link to="/requirement">
              <Button
                data-testid="search-post-req-btn"
                className="mt-4 bg-[var(--cyan)] text-[var(--navy)] hover:opacity-90 font-bold"
              >
                Post Requirement
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
