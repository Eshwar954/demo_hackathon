const API_BASE = "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const rawBody = await response.text();
  if (!rawBody) {
    return null;
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    return rawBody;
  }
}

export const api = {
  getUsers: () => request("/users"),
  loginUser: (payload) =>
    request("/users/login", { method: "POST", body: JSON.stringify(payload) }),
  createUser: (payload) =>
    request("/users", { method: "POST", body: JSON.stringify(payload) }),
  getProjects: () => request("/projects"),
  createProject: (payload) =>
    request("/projects", { method: "POST", body: JSON.stringify(payload) }),
  getCredits: () => request("/credits"),
  getCreditByProject: (projectId) => request(`/credits/${projectId}`),
  getListings: () => request("/listings"),
  getActiveListings: () => request("/listings/active"),
  createListing: (payload) =>
    request("/listings", { method: "POST", body: JSON.stringify(payload) }),
  getTransactions: () => request("/transactions"),
  createTransaction: (payload) =>
    request("/transactions", { method: "POST", body: JSON.stringify(payload) }),
  getLedger: () => request("/ledger"),
  getLedgerByCredit: (creditId) => request(`/ledger/credit/${creditId}`),
  createVerification: (payload) =>
    request("/verifications", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export const enumLabels = {
  roles: ["ADMIN", "PROJECT_OWNER", "BUYER"],
  projectStatuses: [
    "CREATED",
    "UNDER_VERIFICATION",
    "VERIFIED",
    "REJECTED",
    "COMPLETED",
  ],
  listingStatuses: ["ACTIVE", "CLOSED", "CANCELLED"],
  transactionStatuses: ["INITIATED", "SUCCESS", "FAILED", "CANCELLED"],
  verificationStatuses: ["PENDING", "APPROVED", "REJECTED"],
  projectTypes: [
    "Reforestation",
    "RenewableEnergy",
    "EnergyEfficiency",
    "WasteManagement",
  ],
};
