# Carbon Credit Trading System - Frontend

This repository contains the React-based frontend interface for the Carbon Credit Tracking and Trading System. The application is specifically designed to meet rigorous hackathon evaluation criteria by providing three uniquely tailored role-based dashboards (Admin, Project Owner, and Buyer).

## 🚀 Tech Stack & Libraries Used

The frontend was built natively using modern, lightweight frameworks to ensure absolute speed and aesthetic compliance:

* **Framework:** [React 18](https://react.dev/) initialized via [Vite](https://vitejs.dev/) for lightning-fast HMR and optimized building.
* **Styling Framework:** [Tailwind CSS v4](https://tailwindcss.com/) - Used exclusively for structural layouts, responsive grids, aesthetic utility classes, and glassmorphic UI components.
* **Routing:** `react-router-dom` - Enables seamless single-page application (SPA) transitions and secure programmatic route protection based on the logged-in user's role.
* **State Management:** React Context API natively handles authentication variables and global user credentials across all secure nested routes. Local component states (`useState`) simulate dynamic transactions natively before API backend wiring.
* **Typography & Icons:** 
   * [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter) for clean, geometric financial topography.
   * [Material Symbols Outlined](https://fonts.google.com/icons) for crisp, professional UI indicators.

## 🧩 Architectural Features

### 1. Robust Role-Based Security
The infrastructure deploys a singular point-of-entry `Login` gateway that securely resolves contextual routing. Depending on the authenticated credentials, the application strictly tunnels users into their specific isolated portal logic without bleeding:

* **Admin (`/admin`)**: Verifier + Controller. Tracks issuances, rejects/approves audit lifecycles (CREATED → UNDER_VERIFICATION → VERIFIED), and parses system-wide user credentials.
* **Project Owner (`/owner`)**: Creator + Seller. Can log newly proposed forestry assets, view generated credit balances, and map native inventory to the active order book via Listings.
* **Buyer (`/buyer`)**: Generates fluid checkout mechanisms intercepting available global liquidity, checking mathematical totals intuitively (`Total = Price * Qty`), and spawning sequential historical ledgers locally tracked.

### 2. Live Interaction Design (Without APIs)
To facilitate immediate hackathon evaluations prior to backend `Axios` logic compilation, the entire application dynamically manages arrays natively:
* Forms organically update state visually (e.g. creating a listing instantly populates the active marketplace matrix).
* Real-time form validations securely trap mathematical overflow errors automatically.
* Dynamic custom-built "Toasts / Notifications" natively intercept the user's view upon execution success seamlessly.

## ⚙️ Getting Started

To run this frontend ecosystem locally on your development server:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Boot the Development Server**
   ```bash
   npm run dev
   ```

3. **Explore the Mock Credentials**
   Navigate to `localhost:5173` and utilize the default context login switches to instantly access the isolated dashboard environments.

---
*Developed for the explicit evaluation parameters of the Carbon Tracking ecosystem setup.*
