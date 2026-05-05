
import { Link } from "react-router-dom";
import { ArrowRight, Battery, ShieldCheck, Search as SearchIcon, Zap, TrendingUp, Truck, Bike, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import VehicleCard from "../../components/VehicleCard";
import { VEHICLES, HERO_IMG, GRID_PATTERN } from "../../data/mockData";

import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  ACTIVE_EMERALD,
} from "../../app/assets/constants/zevgrid-colors";

export default function Home() {
  const featured = VEHICLES.filter((v) => v.status === "live").slice(0, 4);

  // Map constants to CSS variables for clean Tailwind integration
  const themeStyles = {
    "--cyan": ELECTRIC_CYAN,
    "--charcoal": ENTERPRISE_CHARCOAL,
    "--charcoal-light": `${ENTERPRISE_CHARCOAL}33`, // ~20% opacity for subtle borders
    "--charcoal-muted": `${ENTERPRISE_CHARCOAL}99`, // ~60% opacity for text
    "--navy": INFRASTRUCTURE_NAVY,
    "--white": CLEAN_WHITE,
    "--white-muted": `${CLEAN_WHITE}B3`,            // ~70% opacity for secondary dark mode text
    "--grey": LIGHT_CANVAS_GREY,
    "--emerald": ACTIVE_EMERALD,
  };

  return (
    <div data-testid="home-page" style={themeStyles} className="bg-[var(--grey)] text-[var(--charcoal)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--navy)] text-[var(--white)]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div 
          className="absolute inset-0" 
          style={{ background: `linear-gradient(to right, ${INFRASTRUCTURE_NAVY}, ${INFRASTRUCTURE_NAVY}D9, ${INFRASTRUCTURE_NAVY}66)` }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-16 sm:px-6 md:pb-32 md:pt-28 lg:px-8">
          <span 
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.25em]"
            style={{ borderColor: `${ACTIVE_EMERALD}66`, backgroundColor: `${ACTIVE_EMERALD}1A`, color: ACTIVE_EMERALD }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald)]" />
            Pune pilot · live
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Lease verified commercial EVs{" "}
            <span className="text-[var(--cyan)]">without the fleet headache.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--white-muted)] sm:text-lg">
            ZevGrid connects businesses in Pune with approved dealers for 2W & 3W electric vehicles — battery-verified, compliance-checked, ready to deploy.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/search">
              <Button
                data-testid="hero-browse-btn"
                className="h-12 w-full rounded-md px-6 text-sm font-bold transition-opacity hover:opacity-90 sm:w-auto bg-[var(--cyan)] text-[var(--navy)]"
              >
                <SearchIcon className="mr-2 h-4 w-4" />
                Browse EVs in Pune
              </Button>
            </Link>
            <Link to="/requirement">
   <Button
  data-testid="hero-requirement-btn"
  variant="navy"
  className="h-12 w-full rounded-md border-2 border-[var(--white)] bg-transparent px-6 text-sm font-bold text-[var(--white)] transition-colors hover:bg-[var(--white)] hover:text-[var(--navy)] sm:w-auto"
>
  Post Fleet Requirement
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>
            </Link>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 border-t pt-6" style={{ borderTopColor: `${CLEAN_WHITE}33` }}>
            {[
              { v: "48+", l: "EVs live" },
              { v: "12", l: "Dealers onboarded" },
              { v: "₹3.8k+", l: "Starting /mo" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl font-bold text-[var(--white)] sm:text-3xl">{s.v}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--white-muted)]">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segment quick pick */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            to="/search?type=2W"
            data-testid="segment-2w"
            className="group relative overflow-hidden rounded-xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg bg-[var(--white)] border-[var(--charcoal-light)] hover:border-[var(--cyan)]"
          >
            <Bike className="h-10 w-10 text-[var(--cyan)]" strokeWidth={1.5} />
            <h3 className="mt-4 font-display text-2xl font-bold">Electric 2-Wheelers</h3>
            <p className="mt-2 text-sm text-[var(--charcoal-muted)]">
              Ather, Bajaj Chetak, TVS iQube, Ola — delivery & rider fleets.
            </p>
            <p className="mt-4 inline-flex items-center text-sm font-bold text-[var(--cyan)]">
              Explore 2W <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </p>
          </Link>
          <Link
            to="/search?type=3W"
            data-testid="segment-3w"
            className="group relative overflow-hidden rounded-xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg bg-[var(--white)] border-[var(--charcoal-light)] hover:border-[var(--cyan)]"
          >
            <Truck className="h-10 w-10 text-[var(--cyan)]" strokeWidth={1.5} />
            <h3 className="mt-4 font-display text-2xl font-bold">Electric 3-Wheelers</h3>
            <p className="mt-2 text-sm text-[var(--charcoal-muted)]">
              Mahindra Treo, Piaggio Ape E-City — cargo & passenger.
            </p>
            <p className="mt-4 inline-flex items-center text-sm font-bold text-[var(--cyan)]">
              Explore 3W <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </p>
          </Link>
        </div>
      </section>

      {/* Featured listings */}
      <section
        className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        style={{ backgroundImage: `url(${GRID_PATTERN})`, backgroundBlendMode: "multiply" }}
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--cyan)]">Verified inventory</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl text-[var(--charcoal)]">
              Fresh this week in Pune
            </h2>
          </div>
          <Link
            to="/search"
            data-testid="see-all-listings"
            className="hidden text-sm font-bold hover:underline sm:inline text-[var(--cyan)]"
          >
            See all →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>

      {/* Trust pillars */}
      <section className="py-16 bg-[var(--white)] text-[var(--charcoal)]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-2xl font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
            Built for operations, not just listings.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: ShieldCheck, t: "Dealer KYC verified", d: "Every dealer goes through GST, PAN and business proof checks before going live." },
              { icon: Battery, t: "Battery health disclosed", d: "No hidden degradation. Battery condition and service history surfaced upfront." },
              { icon: TrendingUp, t: "Lease pricing, not MSRP", d: "Monthly rent, tenure and security deposit clearly shown — compare like-for-like." },
            ].map((p) => (
              <div
                key={p.t}
                data-testid={`trust-${p.t.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-xl border p-6 transition-colors border-[var(--charcoal-light)] hover:border-[var(--cyan)]"
              >
                <p.icon className="h-8 w-8 text-[var(--cyan)]" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-lg font-bold">{p.t}</h3>
                <p className="mt-2 text-sm text-[var(--charcoal-muted)]">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--cyan)]">How it works</p>
        <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
          From browse to deployment in days.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            { n: "01", t: "Browse", d: "Filter by type, budget, range. No signup needed." },
            { n: "02", t: "Shortlist", d: "Sign up to unlock quotes, dealer contact and full specs." },
            { n: "03", t: "Match", d: "Our ops team qualifies your requirement and matches supply." },
            { n: "04", t: "Deploy", d: "Paperwork, insurance and handover — all managed." },
          ].map((s) => (
            <div key={s.n} className="rounded-xl border p-5 bg-[var(--white)] border-[var(--charcoal-light)]">
              <p className="font-display text-3xl font-bold text-[var(--cyan)]">{s.n}</p>
              <h3 className="mt-2 font-display text-lg font-bold">{s.t}</h3>
              <p className="mt-1 text-sm text-[var(--charcoal-muted)]">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dealer CTA */}
      <section className="py-16 bg-[var(--navy)] text-[var(--white)]">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--cyan)]">For dealers</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Move EV inventory faster. Zero listing fees in pilot.
            </h2>
            <p className="mt-4 max-w-md text-sm text-[var(--white-muted)]">
              Onboard your dealership, upload KYC, list inventory. Our team drives qualified business demand to you.
            </p>
            <Link to="/dealer/signup">
              <Button
                data-testid="home-dealer-cta"
                className="mt-6 h-12 rounded-md px-6 text-sm font-bold transition-opacity hover:opacity-90 bg-[var(--cyan)] text-[var(--navy)]"
              >
                Join as Dealer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <ul className="space-y-3">
            {[
              "Verified business leads from ops-qualified fleets",
              "Inventory status you control — available, reserved, rented",
              "Clear commercials: rent, tenure, deposit per listing",
              "Admin-moderated — no spam, no wasted calls",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm text-[var(--white-muted)]">
                {/* Changed from --emerald to --cyan */}
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--cyan)]" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}