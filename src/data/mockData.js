// export const VEHICLE_IMAGES = {
//   ather: "https://images.unsplash.com/photo-1642665488745-4ecfaf44c798?w=900&q=80",
//   chetak: "https://images.unsplash.com/photo-1648204834832-78e68052c04f?w=900&q=80",
//   treo: "https://images.pexels.com/photos/13575094/pexels-photo-13575094.jpeg?w=900",
//   ape: "https://images.pexels.com/photos/35378833/pexels-photo-35378833.jpeg?w=900",
// };

// export const HERO_IMG = "https://static.prod-images.emergentagent.com/jobs/c9134398-26cb-4374-ae32-15d660692e02/images/e624d81ab7119f91f0ea24e02679707b8274015599431873e1477aba82e4fbb5.png";

// export const GRID_PATTERN = "https://static.prod-images.emergentagent.com/jobs/c9134398-26cb-4374-ae32-15d660692e02/images/46703e6907c2794d648b3a838fcddfaf4e228e47f5e75eec33cbff0b2a293884.png";

// export const VEHICLES = [
//   {
//     id: "v-001", brand: "Ather", model: "450X Pro", variant: "Gen 3", type: "2W", image: VEHICLE_IMAGES.ather, city: "Pune", monthlyRent: 4200, minTenure: 6, securityDeposit: 8000, batteryCapacity: "3.7 kWh", claimedRange: 146, payload: "Rider + 12kg", condition: "fresh", year: 2024, quantity: 12, availability: "available", status: "live", insurance: "Valid till 2026", registration: "MH-12-KA-****", dealerId: "d-101", photos: 6, notes: "Battery health 98%. Full service history. Ideal for delivery fleet.",
//   },
//   {
//     id: "v-002", brand: "Bajaj", model: "Chetak Premium", variant: "2024", type: "2W", image: VEHICLE_IMAGES.chetak, city: "Pune", monthlyRent: 3800, minTenure: 12, securityDeposit: 6500, batteryCapacity: "3.0 kWh", claimedRange: 113, payload: "Rider + 10kg", condition: "fresh", year: 2024, quantity: 25, availability: "available", status: "live", insurance: "Valid till 2026", registration: "MH-12-KB-****", dealerId: "d-102", photos: 5, notes: "Metal body, premium variant. Warranty active.",
//   },
//   {
//     id: "v-003", brand: "Mahindra", model: "Treo Yaari", variant: "HRT", type: "3W", image: VEHICLE_IMAGES.treo, city: "Pune", monthlyRent: 8900, minTenure: 12, securityDeposit: 18000, batteryCapacity: "7.37 kWh", claimedRange: 125, payload: "3 passenger + 50kg", condition: "demo", year: 2024, quantity: 8, availability: "reserved", status: "live", insurance: "Valid till 2026", registration: "MH-12-KD-****", dealerId: "d-101", photos: 7, notes: "Passenger auto. Permit verified. Battery health 95%.",
//   },
//   {
//     id: "v-004", brand: "Piaggio", model: "Ape E-City", variant: "FX Max", type: "3W", image: VEHICLE_IMAGES.ape, city: "Pune", monthlyRent: 10500, minTenure: 12, securityDeposit: 22000, batteryCapacity: "8.0 kWh", claimedRange: 115, payload: "Cargo 600kg", condition: "fresh", year: 2024, quantity: 4, availability: "available", status: "live", insurance: "Valid till 2026", registration: "MH-12-KF-****", dealerId: "d-103", photos: 4, notes: "Cargo loader. Ideal for last-mile logistics.",
//   },
//   {
//     id: "v-005", brand: "TVS", model: "iQube ST", variant: "5.1 kWh", type: "2W", image: VEHICLE_IMAGES.ather, city: "Pune", monthlyRent: 4500, minTenure: 6, securityDeposit: 8500, batteryCapacity: "5.1 kWh", claimedRange: 145, payload: "Rider + 15kg", condition: "fresh", year: 2024, quantity: 18, availability: "available", status: "pending", insurance: "Valid till 2026", registration: "MH-12-KE-****", dealerId: "d-102", photos: 3, notes: "Long range variant. Smart TFT dashboard.",
//   },
//   {
//     id: "v-006", brand: "Ola", model: "S1 Pro", variant: "Gen 2", type: "2W", image: VEHICLE_IMAGES.chetak, city: "Pune", monthlyRent: 4000, minTenure: 6, securityDeposit: 7500, batteryCapacity: "4.0 kWh", claimedRange: 195, payload: "Rider + 12kg", condition: "unsold", year: 2023, quantity: 6, availability: "available", status: "live", insurance: "Valid till 2026", registration: "MH-12-KG-****", dealerId: "d-103", photos: 5, notes: "Brand new stock. Unsold 2023 inventory.",
//   },
// ];

// export const DEALERS = [
//   { id: "d-101", dealership: "GreenDrive EV Motors", contact: "Rajesh Kulkarni", mobile: "+91 98220 11223", email: "rajesh@greendrive.in", city: "Pune", gst: "27AABCU9603R1Z2", pan: "AABCU9603R", address: "Shop 14, Karve Road, Kothrud, Pune 411038", status: "approved", joinedOn: "2025-11-04", listings: 3, docs: ["GST Certificate", "PAN Card", "Cancelled Cheque", "Aadhaar", "Shop Act"], },
//   { id: "d-102", dealership: "VoltRide Automotive", contact: "Priya Deshmukh", mobile: "+91 98765 43210", email: "priya@voltride.in", city: "Pune", gst: "27AACCV1234R1Z5", pan: "AACCV1234R", address: "Plot 22, Hinjewadi Phase 2, Pune 411057", status: "approved", joinedOn: "2025-12-11", listings: 2, docs: ["GST Certificate", "PAN Card", "Cancelled Cheque", "Aadhaar"], },
//   { id: "d-103", dealership: "Aarambh Electric Dealers", contact: "Sandeep Patil", mobile: "+91 91234 55667", email: "sandeep@aarambhev.com", city: "Pune", gst: "27AADCS2345R1Z7", pan: "AADCS2345R", address: "FC Road, Shivaji Nagar, Pune 411005", status: "pending", joinedOn: "2026-02-02", listings: 0, docs: ["GST Certificate", "PAN Card", "Cancelled Cheque"], },
//   { id: "d-104", dealership: "EcoWheels Pune", contact: "Ameya Joshi", mobile: "+91 99887 66554", email: "ameya@ecowheels.in", city: "Pune", gst: "27AAECE5678R1Z9", pan: "AAECE5678R", address: "Baner-Balewadi Road, Pune 411045", status: "pending", joinedOn: "2026-02-08", listings: 0, docs: ["PAN Card", "Aadhaar"], },
// ];

// export const LEADS = [
//   { id: "l-201", company: "Swift Logistics Pvt Ltd", contact: "Nikhil Rao", mobile: "+91 98111 22334", email: "nikhil@swiftlog.in", city: "Pune", type: "Last-mile delivery", vehiclesNeeded: 20, budget: "₹4,000/mo", preferredType: "2W", interestedIn: "v-001", stage: "qualified", createdOn: "2026-02-06", notes: "Looking for 20 Ather/TVS units. Ready to pilot 5.", },
//   { id: "l-202", company: "KinaraQuick Foods", contact: "Meera Shah", mobile: "+91 90123 44556", email: "meera@kinara.food", city: "Pune", type: "Food delivery", vehiclesNeeded: 8, budget: "₹3,800/mo", preferredType: "2W", interestedIn: "v-002", stage: "quoted", createdOn: "2026-02-04", notes: "Quote sent. Comparing with competitor.", },
//   { id: "l-203", company: "MetroHaul Transport", contact: "Farhan Khan", mobile: "+91 98211 00998", email: "farhan@metrohaul.in", city: "Pune", type: "Cargo / last-mile", vehiclesNeeded: 4, budget: "₹10,500/mo", preferredType: "3W", interestedIn: "v-004", stage: "new", createdOn: "2026-02-09", notes: "Cargo loaders for warehouse-to-store route.", },
//   { id: "l-204", company: "Pune Passenger Services", contact: "Sujata Kale", mobile: "+91 93721 11009", email: "sujata@ppsauto.in", city: "Pune", type: "Passenger auto", vehiclesNeeded: 6, budget: "₹8,900/mo", preferredType: "3W", interestedIn: "v-003", stage: "contacted", createdOn: "2026-02-07", notes: "Called. Interested in Treo Yaari.", },
//   { id: "l-205", company: "ZippyMart Hyperlocal", contact: "Rohit Mehta", mobile: "+91 87654 33221", email: "rohit@zippymart.com", city: "Pune", type: "Quick commerce", vehiclesNeeded: 12, budget: "₹4,200/mo", preferredType: "2W", interestedIn: "v-005", stage: "converted", createdOn: "2026-01-28", notes: "Signed for 12 TVS iQube. Onboarding in progress.", },
// ];

// export const STATS = {
//   admin: { dealersPending: 2, dealersApproved: 2, listingsLive: 5, listingsPending: 1, leadsNew: 3, leadsConverted: 1, revenueMTD: "₹2,14,000", },
//   dealer: { liveListings: 3, pendingListings: 1, reserved: 1, newInquiries: 4, qualified: 2, converted: 1, },
// };

// export const LEAD_STAGES = [
//   { key: "new", label: "New", color: "bg-blue-50 text-blue-700 border-blue-200" },
//   { key: "contacted", label: "Contacted", color: "bg-sky-50 text-sky-700 border-sky-200" },
//   { key: "qualified", label: "Qualified", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
//   { key: "quoted", label: "Quoted", color: "bg-amber-50 text-amber-700 border-amber-200" },
//   { key: "negotiation", label: "Negotiation", color: "bg-orange-50 text-orange-700 border-orange-200" },
//   { key: "converted", label: "Converted", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
//   { key: "lost", label: "Lost", color: "bg-rose-50 text-rose-700 border-rose-200" },
// ];
import {
  ACTIVE_EMERALD,
  WARNING_AMBER,
  CRITICAL_RED,
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../app/assets/constants/zevgrid-colors";
import gridPatternLocal from "../app/assets/gridimage.png"; // Adjust the path to match your folder structure
// ─── Vehicle Images ───────────────────────────────────────────────────────────

export const VEHICLE_IMAGES = {
  ather:  "https://images.unsplash.com/photo-1642665488745-4ecfaf44c798?w=900&q=80",
  chetak: "https://images.unsplash.com/photo-1648204834832-78e68052c04f?w=900&q=80",
  treo:   "https://images.pexels.com/photos/13575094/pexels-photo-13575094.jpeg?w=900",
  ape:    "https://images.pexels.com/photos/35378833/pexels-photo-35378833.jpeg?w=900",
};

export const HERO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/c9134398-26cb-4374-ae32-15d660692e02/images/e624d81ab7119f91f0ea24e02679707b8274015599431873e1477aba82e4fbb5.png";

export const GRID_PATTERN = gridPatternLocal;
// ─── Vehicles ─────────────────────────────────────────────────────────────────

export const VEHICLES = [
  {
    id: "v-001", brand: "Ather", model: "450X Pro", variant: "Gen 3", type: "2W",
    image: VEHICLE_IMAGES.ather, city: "Pune", monthlyRent: 4200, minTenure: 6,
    securityDeposit: 8000, batteryCapacity: "3.7 kWh", claimedRange: 146,
    payload: "Rider + 12kg", condition: "fresh", year: 2024, quantity: 12,
    availability: "available", status: "live", insurance: "Valid till 2026",
    registration: "MH-12-KA-****", dealerId: "d-101", photos: 6,
    notes: "Battery health 98%. Full service history. Ideal for delivery fleet.",
  },
  {
    id: "v-002", brand: "Bajaj", model: "Chetak Premium", variant: "2024", type: "2W",
    image: VEHICLE_IMAGES.chetak, city: "Pune", monthlyRent: 3800, minTenure: 12,
    securityDeposit: 6500, batteryCapacity: "3.0 kWh", claimedRange: 113,
    payload: "Rider + 10kg", condition: "fresh", year: 2024, quantity: 25,
    availability: "available", status: "live", insurance: "Valid till 2026",
    registration: "MH-12-KB-****", dealerId: "d-102", photos: 5,
    notes: "Metal body, premium variant. Warranty active.",
  },
  {
    id: "v-003", brand: "Mahindra", model: "Treo Yaari", variant: "HRT", type: "3W",
    image: VEHICLE_IMAGES.treo, city: "Pune", monthlyRent: 8900, minTenure: 12,
    securityDeposit: 18000, batteryCapacity: "7.37 kWh", claimedRange: 125,
    payload: "3 passenger + 50kg", condition: "demo", year: 2024, quantity: 8,
    availability: "reserved", status: "live", insurance: "Valid till 2026",
    registration: "MH-12-KD-****", dealerId: "d-101", photos: 7,
    notes: "Passenger auto. Permit verified. Battery health 95%.",
  },
  {
    id: "v-004", brand: "Piaggio", model: "Ape E-City", variant: "FX Max", type: "3W",
    image: VEHICLE_IMAGES.ape, city: "Pune", monthlyRent: 10500, minTenure: 12,
    securityDeposit: 22000, batteryCapacity: "8.0 kWh", claimedRange: 115,
    payload: "Cargo 600kg", condition: "fresh", year: 2024, quantity: 4,
    availability: "available", status: "live", insurance: "Valid till 2026",
    registration: "MH-12-KF-****", dealerId: "d-103", photos: 4,
    notes: "Cargo loader. Ideal for last-mile logistics.",
  },
  {
    id: "v-005", brand: "TVS", model: "iQube ST", variant: "5.1 kWh", type: "2W",
    image: VEHICLE_IMAGES.ather, city: "Pune", monthlyRent: 4500, minTenure: 6,
    securityDeposit: 8500, batteryCapacity: "5.1 kWh", claimedRange: 145,
    payload: "Rider + 15kg", condition: "fresh", year: 2024, quantity: 18,
    availability: "available", status: "pending", insurance: "Valid till 2026",
    registration: "MH-12-KE-****", dealerId: "d-102", photos: 3,
    notes: "Long range variant. Smart TFT dashboard.",
  },
  {
    id: "v-006", brand: "Ola", model: "S1 Pro", variant: "Gen 2", type: "2W",
    image: VEHICLE_IMAGES.chetak, city: "Pune", monthlyRent: 4000, minTenure: 6,
    securityDeposit: 7500, batteryCapacity: "4.0 kWh", claimedRange: 195,
    payload: "Rider + 12kg", condition: "unsold", year: 2023, quantity: 6,
    availability: "available", status: "live", insurance: "Valid till 2026",
    registration: "MH-12-KG-****", dealerId: "d-103", photos: 5,
    notes: "Brand new stock. Unsold 2023 inventory.",
  },
];

// ─── Dealers ──────────────────────────────────────────────────────────────────

export const DEALERS = [
  {
    id: "d-101", dealership: "GreenDrive EV Motors", contact: "Rajesh Kulkarni",
    mobile: "+91 98220 11223", email: "rajesh@greendrive.in", city: "Pune",
    gst: "27AABCU9603R1Z2", pan: "AABCU9603R",
    address: "Shop 14, Karve Road, Kothrud, Pune 411038",
    status: "approved", joinedOn: "2025-11-04", listings: 3,
    docs: ["GST Certificate", "PAN Card", "Cancelled Cheque", "Aadhaar", "Shop Act"],
  },
  {
    id: "d-102", dealership: "VoltRide Automotive", contact: "Priya Deshmukh",
    mobile: "+91 98765 43210", email: "priya@voltride.in", city: "Pune",
    gst: "27AACCV1234R1Z5", pan: "AACCV1234R",
    address: "Plot 22, Hinjewadi Phase 2, Pune 411057",
    status: "approved", joinedOn: "2025-12-11", listings: 2,
    docs: ["GST Certificate", "PAN Card", "Cancelled Cheque", "Aadhaar"],
  },
  {
    id: "d-103", dealership: "Aarambh Electric Dealers", contact: "Sandeep Patil",
    mobile: "+91 91234 55667", email: "sandeep@aarambhev.com", city: "Pune",
    gst: "27AADCS2345R1Z7", pan: "AADCS2345R",
    address: "FC Road, Shivaji Nagar, Pune 411005",
    status: "pending", joinedOn: "2026-02-02", listings: 0,
    docs: ["GST Certificate", "PAN Card", "Cancelled Cheque"],
  },
  {
    id: "d-104", dealership: "EcoWheels Pune", contact: "Ameya Joshi",
    mobile: "+91 99887 66554", email: "ameya@ecowheels.in", city: "Pune",
    gst: "27AAECE5678R1Z9", pan: "AAECE5678R",
    address: "Baner-Balewadi Road, Pune 411045",
    status: "pending", joinedOn: "2026-02-08", listings: 0,
    docs: ["PAN Card", "Aadhaar"],
  },
];

// ─── Leads ────────────────────────────────────────────────────────────────────

export const LEADS = [
  {
    id: "l-201", company: "Swift Logistics Pvt Ltd", contact: "Nikhil Rao",
    mobile: "+91 98111 22334", email: "nikhil@swiftlog.in", city: "Pune",
    type: "Last-mile delivery", vehiclesNeeded: 20, budget: "₹4,000/mo",
    preferredType: "2W", interestedIn: "v-001", stage: "qualified",
    createdOn: "2026-02-06",
    notes: "Looking for 20 Ather/TVS units. Ready to pilot 5.",
  },
  {
    id: "l-202", company: "KinaraQuick Foods", contact: "Meera Shah",
    mobile: "+91 90123 44556", email: "meera@kinara.food", city: "Pune",
    type: "Food delivery", vehiclesNeeded: 8, budget: "₹3,800/mo",
    preferredType: "2W", interestedIn: "v-002", stage: "quoted",
    createdOn: "2026-02-04",
    notes: "Quote sent. Comparing with competitor.",
  },
  {
    id: "l-203", company: "MetroHaul Transport", contact: "Farhan Khan",
    mobile: "+91 98211 00998", email: "farhan@metrohaul.in", city: "Pune",
    type: "Cargo / last-mile", vehiclesNeeded: 4, budget: "₹10,500/mo",
    preferredType: "3W", interestedIn: "v-004", stage: "new",
    createdOn: "2026-02-09",
    notes: "Cargo loaders for warehouse-to-store route.",
  },
  {
    id: "l-204", company: "Pune Passenger Services", contact: "Sujata Kale",
    mobile: "+91 93721 11009", email: "sujata@ppsauto.in", city: "Pune",
    type: "Passenger auto", vehiclesNeeded: 6, budget: "₹8,900/mo",
    preferredType: "3W", interestedIn: "v-003", stage: "contacted",
    createdOn: "2026-02-07",
    notes: "Called. Interested in Treo Yaari.",
  },
  {
    id: "l-205", company: "ZippyMart Hyperlocal", contact: "Rohit Mehta",
    mobile: "+91 87654 33221", email: "rohit@zippymart.com", city: "Pune",
    type: "Quick commerce", vehiclesNeeded: 12, budget: "₹4,200/mo",
    preferredType: "2W", interestedIn: "v-005", stage: "converted",
    createdOn: "2026-01-28",
    notes: "Signed for 12 TVS iQube. Onboarding in progress.",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────

export const STATS = {
  admin: {
    dealersPending: 2,
    dealersApproved: 2,
    listingsLive: 5,
    listingsPending: 1,
    leadsNew: 3,
    leadsConverted: 1,
    revenueMTD: "₹2,14,000",
  },
  dealer: {
    liveListings: 3,
    pendingListings: 1,
    reserved: 1,
    newInquiries: 4,
    qualified: 2,
    converted: 1,
  },
};

// ─── Lead Stages ──────────────────────────────────────────────────────────────
// color object now uses ZevGrid inline-style tokens instead of Tailwind classes,
// matching the StatusBadge component's { color, bg, border } shape.

export const LEAD_STAGES = [
  {
    key: "new",
    label: "New",
    color: {
      color: ELECTRIC_CYAN,
      bg: `${ELECTRIC_CYAN}15`,
      border: `${ELECTRIC_CYAN}44`,
    },
  },
  {
    key: "contacted",
    label: "Contacted",
    color: {
      color: ELECTRIC_CYAN,
      bg: `${ELECTRIC_CYAN}15`,
      border: `${ELECTRIC_CYAN}44`,
    },
  },
  {
    key: "qualified",
    label: "Qualified",
    color: {
      color: INFRASTRUCTURE_NAVY,
      bg: `${ELECTRIC_CYAN}22`,
      border: `${ELECTRIC_CYAN}55`,
    },
  },
  {
    key: "quoted",
    label: "Quoted",
    color: {
      color: WARNING_AMBER,
      bg: `${WARNING_AMBER}1a`,
      border: `${WARNING_AMBER}4d`,
    },
  },
  {
    key: "negotiation",
    label: "Negotiation",
    color: {
      color: WARNING_AMBER,
      bg: `${WARNING_AMBER}26`,
      border: `${WARNING_AMBER}66`,
    },
  },
  {
    key: "converted",
    label: "Converted",
    color: {
      color: ACTIVE_EMERALD,
      bg: `${ACTIVE_EMERALD}1a`,
      border: `${ACTIVE_EMERALD}4d`,
    },
  },
  {
    key: "lost",
    label: "Lost",
    color: {
      color: CRITICAL_RED,
      bg: `${CRITICAL_RED}1a`,
      border: `${CRITICAL_RED}4d`,
    },
  },
];