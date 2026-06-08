const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://3.6.21.47:9082";

const VEHICLE_FALLBACK_IMAGES = {
  "2W": "https://images.unsplash.com/photo-1642665488745-4ecfaf44c798?w=900&q=80",
  "3W": "https://images.pexels.com/photos/13575094/pexels-photo-13575094.jpeg?w=900",
};

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  let payload = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    const message =
      payload?.error?.message ||
      payload?.message ||
      payload?.error ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export function adminLogin(credentials) {
  return apiRequest("/api/auth/admin/login", {
    method: "POST",
    body: credentials,
  });
}

export function businessSignup(details) {
  return apiRequest("/api/auth/business/signup", {
    method: "POST",
    body: details,
  });
}

export function businessLogin(credentials) {
  return apiRequest("/api/auth/business/login", {
    method: "POST",
    body: credentials,
  });
}

export function normalizeBusiness(business = {}) {
  const createdAt = business.createdAt || "";

  return {
    ...business,
    company: business.company || "-",
    contact: business.contact || "-",
    mobile: business.mobile || "-",
    email: business.email || "-",
    city: business.city || "-",
    businessType: business.businessType || "-",
    gst: business.gst || "-",
    createdOn: createdAt ? new Date(createdAt).toLocaleDateString("en-IN") : "-",
  };
}

export async function getBusinesses() {
  const payload = await apiRequest("/api/businesses");

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Businesses could not be loaded.");
  }

  const rows = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

  return {
    data: rows.map(normalizeBusiness),
    count: Number(payload?.count ?? rows.length),
    message: payload?.message,
  };
}

export async function getBusinessById(id) {
  const payload = await apiRequest(`/api/businesses/${encodeURIComponent(id)}`);

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Business could not be loaded.");
  }

  return {
    data: normalizeBusiness(payload?.data ?? payload),
    count: Number(payload?.count ?? (payload?.data ? 1 : 0)),
    message: payload?.message,
  };
}

export async function createDealer(dealer) {
  const payload = await apiRequest("/api/dealers", {
    method: "POST",
    body: dealer,
  });

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Dealer could not be registered.");
  }

  return {
    data: payload?.data ?? payload,
    message: payload?.message,
    timestamp: payload?.timestamp,
  };
}

export function normalizeDealer(dealer = {}) {
  const createdAt = dealer.createdAt || dealer.joinedOn || "";

  return {
    ...dealer,
    dealership: dealer.dealership || "-",
    contact: dealer.contact || "-",
    mobile: dealer.mobile || "-",
    email: dealer.email || "-",
    city: dealer.city || "-",
    gst: dealer.gst || "-",
    pan: dealer.pan || "-",
    address: dealer.address || "-",
    status: dealer.status || "pending",
    docs: Array.isArray(dealer.docs) ? dealer.docs : [],
    joinedOn: createdAt ? new Date(createdAt).toLocaleDateString("en-IN") : "-",
  };
}

export async function getDealers(params = {}) {
  const payload = await apiRequest(`/api/dealers${toVehicleQuery(params)}`);

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Dealers could not be loaded.");
  }

  const rows = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

  return {
    data: rows.map(normalizeDealer),
    count: Number(payload?.count ?? rows.length),
    message: payload?.message,
  };
}

export async function getDealerById(id) {
  const payload = await apiRequest(`/api/dealers/${encodeURIComponent(id)}`);

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Dealer could not be loaded.");
  }

  return {
    data: normalizeDealer(payload?.data ?? payload),
    count: Number(payload?.count ?? (payload?.data ? 1 : 0)),
    message: payload?.message,
  };
}

export async function updateDealer(id, updates) {
  const payload = await apiRequest(`/api/dealers/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: updates,
  });

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Dealer could not be updated.");
  }

  return {
    data: normalizeDealer(payload?.data ?? payload),
    count: Number(payload?.count ?? (payload?.data ? 1 : 0)),
    message: payload?.message,
  };
}

export async function getDealerStats(dealerId) {
  const payload = await apiRequest(`/api/stats/dealer${toVehicleQuery({ dealerId })}`);

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Dealer stats could not be loaded.");
  }

  return {
    data: {
      vehicles: {
        total: Number(payload?.data?.vehicles?.total ?? 0),
        live: Number(payload?.data?.vehicles?.live ?? 0),
      },
      leads: {
        new: Number(payload?.data?.leads?.new ?? 0),
        converted: Number(payload?.data?.leads?.converted ?? 0),
        total: Number(payload?.data?.leads?.total ?? 0),
      },
    },
    message: payload?.message,
    timestamp: payload?.timestamp,
  };
}

export async function getAdminStats() {
  const payload = await apiRequest("/api/stats/admin");

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Admin stats could not be loaded.");
  }

  return {
    data: {
      vehicles: {
        total: Number(payload?.data?.vehicles?.total ?? 0),
        live: Number(payload?.data?.vehicles?.live ?? 0),
        pending: Number(payload?.data?.vehicles?.pending ?? 0),
        draft: Number(payload?.data?.vehicles?.draft ?? 0),
        inactive: Number(payload?.data?.vehicles?.inactive ?? 0),
      },
      dealers: {
        total: Number(payload?.data?.dealers?.total ?? 0),
        approved: Number(payload?.data?.dealers?.approved ?? 0),
        pending: Number(payload?.data?.dealers?.pending ?? 0),
        rejected: Number(payload?.data?.dealers?.rejected ?? 0),
        suspended: Number(payload?.data?.dealers?.suspended ?? 0),
      },
      businesses: {
        total: Number(payload?.data?.businesses?.total ?? 0),
      },
      leads: {
        total: Number(payload?.data?.leads?.total ?? 0),
        new: Number(payload?.data?.leads?.new ?? 0),
        converted: Number(payload?.data?.leads?.converted ?? 0),
        lost: Number(payload?.data?.leads?.lost ?? 0),
      },
    },
    timestamp: payload?.timestamp,
  };
}

export async function updateDealerStatus(id, status) {
  const payload = await apiRequest(`/api/dealers/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    body: { status },
  });

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Dealer status could not be updated.");
  }

  return {
    data: normalizeDealer(payload?.data ?? payload),
    count: Number(payload?.count ?? (payload?.data ? 1 : 0)),
    message: payload?.message,
  };
}

export function createVehicle(vehicle) {
  return apiRequest("/api/vehicles", {
    method: "POST",
    body: vehicle,
  });
}

export async function updateVehicle(id, updates) {
  const payload = await apiRequest(`/api/vehicles/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: updates,
  });

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Vehicle could not be updated.");
  }

  return {
    data: normalizeVehicle(payload?.data ?? payload),
    count: Number(payload?.count ?? (payload?.data ? 1 : 0)),
    message: payload?.message,
  };
}

export async function updateVehicleStatus(id, status) {
  const payload = await apiRequest(`/api/vehicles/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    body: { status },
  });

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Vehicle status could not be updated.");
  }

  return {
    data: normalizeVehicle(payload?.data ?? payload),
    count: Number(payload?.count ?? (payload?.data ? 1 : 0)),
    message: payload?.message,
  };
}

export async function updateVehicleAvailability(id, availability) {
  const payload = await apiRequest(`/api/vehicles/${encodeURIComponent(id)}/availability`, {
    method: "PATCH",
    body: { availability },
  });

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Vehicle availability could not be updated.");
  }

  return {
    data: normalizeVehicle(payload?.data ?? payload),
    count: Number(payload?.count ?? (payload?.data ? 1 : 0)),
    message: payload?.message,
  };
}

export function deleteVehicle(id) {
  return apiRequest(`/api/vehicles/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

function toVehicleQuery(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "" || value === "all" || value === "any") return;
    query.set(key, value);
  });

  const text = query.toString();
  return text ? `?${text}` : "";
}

export function normalizeVehicle(vehicle = {}) {
  const rent = Number(vehicle.rent ?? vehicle.monthlyRent ?? 0);
  const type = vehicle.type || "2W";

  return {
    ...vehicle,
    type,
    rent,
    monthlyRent: rent,
    image: vehicle.image || VEHICLE_FALLBACK_IMAGES[type] || VEHICLE_FALLBACK_IMAGES["2W"],
    city: vehicle.city || "nagpur",
    claimedRange: Number(vehicle.claimedRange ?? vehicle.range ?? 0),
    batteryCapacity: vehicle.batteryCapacity || vehicle.battery || "-",
    minTenure: Number(vehicle.minTenure ?? vehicle.tenure ?? 0),
    securityDeposit: Number(vehicle.securityDeposit ?? vehicle.deposit ?? 0),
    condition: vehicle.condition || "listed",
    availability: vehicle.availability || "available",
    status: vehicle.status || "draft",
    quantity: Number(vehicle.quantity ?? 0),
    photos: Number(vehicle.photos ?? 0),
  };
}

export async function getVehicles(params = {}) {
  const payload = await apiRequest(`/api/vehicles${toVehicleQuery(params)}`);

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Vehicles could not be loaded.");
  }

  const rows = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

  return {
    data: rows.map(normalizeVehicle),
    count: Number(payload?.count ?? rows.length),
    message: payload?.message,
  };
}

export async function getVehicleById(id) {
  const payload = await apiRequest(`/api/vehicles/${encodeURIComponent(id)}`);

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Vehicle could not be loaded.");
  }

  return {
    data: normalizeVehicle(payload?.data ?? payload),
    count: Number(payload?.count ?? (payload?.data ? 1 : 0)),
    message: payload?.message,
  };
}

export function normalizeLead(lead = {}) {
  const createdAt = lead.createdAt || lead.createdOn || "";

  return {
    ...lead,
    company: lead.company || "-",
    contact: lead.contact || "-",
    mobile: lead.mobile || "-",
    email: lead.email || "-",
    city: lead.city || "-",
    type: lead.type || "-",
    count: Number(lead.count ?? lead.vehiclesNeeded ?? 0),
    vehiclesNeeded: Number(lead.count ?? lead.vehiclesNeeded ?? 0),
    tenure: lead.tenure || "-",
    budget: lead.budget || "-",
    useCase: lead.useCase || lead.type || "-",
    notes: lead.notes || "",
    dealerId: lead.dealerId || "",
    stage: lead.stage || "new_lead",
    preferredType: lead.type || "-",
    interestedIn: lead.interestedIn || "",
    createdOn: createdAt ? new Date(createdAt).toLocaleDateString("en-IN") : "-",
  };
}

export async function getLeads(params = {}) {
  const payload = await apiRequest(`/api/leads${toVehicleQuery(params)}`);

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Leads could not be loaded.");
  }

  const rows = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

  return {
    data: rows.map(normalizeLead),
    count: Number(payload?.count ?? rows.length),
    message: payload?.message,
  };
}

function formatMetaLabel(value = "") {
  return String(value)
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function getLeadStages() {
  const payload = await apiRequest("/api/meta/lead-stages");

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Lead stages could not be loaded.");
  }

  const rows = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

  return {
    data: rows.map((stage) => ({
      key: stage,
      label: formatMetaLabel(stage),
    })),
    count: Number(payload?.count ?? rows.length),
    timestamp: payload?.timestamp,
  };
}

export async function getLeadById(id) {
  const payload = await apiRequest(`/api/leads/${encodeURIComponent(id)}`);

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Lead could not be loaded.");
  }

  return {
    data: normalizeLead(payload?.data ?? payload),
    count: Number(payload?.count ?? (payload?.data ? 1 : 0)),
    message: payload?.message,
  };
}

export async function createLead(lead) {
  const payload = await apiRequest("/api/leads", {
    method: "POST",
    body: lead,
  });

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Lead could not be created.");
  }

  return {
    data: normalizeLead(payload?.data ?? payload),
    message: payload?.message,
    timestamp: payload?.timestamp,
  };
}

export async function updateLead(id, updates) {
  const payload = await apiRequest(`/api/leads/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: updates,
  });

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Lead could not be updated.");
  }

  return {
    data: normalizeLead(payload?.data ?? payload),
    message: payload?.message,
    timestamp: payload?.timestamp,
  };
}

export async function updateLeadStage(id, stage) {
  const payload = await apiRequest(`/api/leads/${encodeURIComponent(id)}/stage`, {
    method: "PATCH",
    body: { stage },
  });

  if (payload?.success === false) {
    throw new Error(payload.message || payload.error || "Lead stage could not be updated.");
  }

  return {
    data: normalizeLead(payload?.data ?? payload),
    count: Number(payload?.count ?? (payload?.data ? 1 : 0)),
    message: payload?.message,
  };
}

export { API_BASE_URL };
