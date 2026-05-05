/**
 * ZevGrid | Brand & UI Color Palette
 * Fleet Leasing | Telematics — Enterprise Fleet Ecosystem
 */

// ─── 1. Core Brand Colors ────────────────────────────────────────────────────

export const ELECTRIC_CYAN = "#00CDE5";
// Usage: Primary CTA Buttons, Active Data, Key Highlights

export const ENTERPRISE_CHARCOAL = "#2D3136";
// Usage: Main Text, Header, Borders, Grounding Element

// ─── 2. Dashboard Foundation ─────────────────────────────────────────────────

export const INFRASTRUCTURE_NAVY = "#0F172A";
// Usage: Dashboard Sidebar Nav, Anchor Background, Secure Interface

export const CLEAN_WHITE = "#FFFFFF";
// Usage: Main Content Areas, Card Backgrounds, Form Fields

export const LIGHT_CANVAS_GREY = "#F8FAFC";
// Usage: Overall App Background, Structure Separation, Subtle Depth

// ─── 3. Semantic & Status Colors ─────────────────────────────────────────────

export const ACTIVE_EMERALD = "#10B981";
// Usage: Vehicle Moving, Battery Good (>20%), Payment Paid

export const WARNING_AMBER = "#F59E0B";
// Usage: Vehicle Idling, Battery Low (<15%), Payment Pending

export const CRITICAL_RED = "#EF4444";
// Usage: Geofence Breach, Breakdown, Payment Overdue, Kill Switch Active

// ─── Grouped Export ───────────────────────────────────────────────────────────

export const ZEVGRID_COLORS = {
  // Core Brand
  electricCyan:       ELECTRIC_CYAN,
  enterpriseCharcoal: ENTERPRISE_CHARCOAL,

  // Dashboard Foundation
  infrastructureNavy: INFRASTRUCTURE_NAVY,
  cleanWhite:         CLEAN_WHITE,
  lightCanvasGrey:    LIGHT_CANVAS_GREY,

  // Semantic & Status
  activeEmerald:      ACTIVE_EMERALD,
  warningAmber:       WARNING_AMBER,
  criticalRed:        CRITICAL_RED,
};

export default ZEVGRID_COLORS;