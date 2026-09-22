# ASAS Workbench - Feature Addition & Architecture Guide

Welcome to the **ASAS Workbench** developer workspace! This document outlines how to easily add new pages, features, and custom services to this application while maintaining a clean, highly organized, and robust codebase.

---

## 🚀 How to Add a New Page / Feature

Follow these **3 simple steps** to add any new page or feature to your project:

### Step 1: Create your Feature Directory
Create a directory under `frontend/src/features/` with the standard folder layout.

**Example: Creating an "analytics" feature**
Create the following folders:
- `frontend/src/features/analytics/pages/`
- `frontend/src/features/analytics/components/`
- `frontend/src/features/analytics/services/`

### Step 2: Write your Page Component
Create your main page file inside your `pages` folder. For example, `frontend/src/features/analytics/pages/AnalyticsPage.tsx`:

```tsx
import { Sparkles } from "lucide-react";

export function AnalyticsPage() {
  return (
    <div className="fade-in" style={{ padding: "20px" }}>
      <div className="page-head">
        <div>
          <div className="eyebrow">
            <Sparkles size={13} /> INSIGHTS
          </div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Real-time usage insights and application telemetry.</p>
        </div>
      </div>
      
      <div className="card" style={{ padding: "24px" }}>
        <h3>Activity Monitor</h3>
        <p className="muted">Analytics tracking is currently running idle.</p>
      </div>
    </div>
  );
}
```

Add an export file `frontend/src/features/analytics/index.ts` to make clean imports easy:
```typescript
export * from "./pages/AnalyticsPage";
```

### Step 3: Register the Page in the Centralized Routes Config
Open `frontend/src/config/routes.tsx` and import your new page. Add an entry to the `APP_ROUTES` array:

```tsx
import { BarChart3 } from "lucide-react"; // Import an icon
import { AnalyticsPage } from "../features/analytics"; // Import your page

export const APP_ROUTES: AppRouteConfig[] = [
  // ... existing routes (dashboard, settings)
  {
    path: "/analytics",
    label: "Analytics",
    icon: BarChart3,
    category: "Monitoring",
    element: <AnalyticsPage />,
    showInNav: true, // Set to false if you want the route active but hidden from the sidebar
  },
];
```

**That's it! 🎉** 
Your new page is now fully functional and is automatically registered in:
1. **React Router DOM** routing lists.
2. **The Sidebar Menu** navigation panel.
3. **The Global Search Command Palette** (`Cmd + K` or `Ctrl + K`).

---

## 🛠️ Recommended Folder Architecture

To keep the codebase modular, clean, and isolated as you scale to dozens of features:

```text
frontend/src/
├── app/
│   ├── App.tsx             # Simplified router mapping APP_ROUTES
│   └── shell/
│       └── AppShell.tsx    # App layout, global sidebar nav, command search palette
│
├── config/
│   └── routes.tsx          # ROUTE REGISTRY (Single source of truth for features)
│
├── features/               # Isolated domains / business contexts
│   └── [feature-name]/
│       ├── pages/          # Full page layouts (AnalyticsPage.tsx, etc.)
│       ├── components/     # Feature-only widgets/cards (AnalyticsChart.tsx)
│       ├── hooks/          # Custom react hooks (useAnalyticsData.ts)
│       ├── services/       # Feature-only APIs & backend wrappers (analyticsService.ts)
│       └── index.ts        # Public API export for the feature
│
├── components/             # SHARED COMPONENTS
│   └── common/             # Reusable UI widgets (Buttons, Modal, Loader)
│
└── services/               # SHARED GLOBAL SERVICES
    └── api.ts              # Global network, logger, database helper clients
```

---

## 💡 Best Practices

1. **Decouple Backend Bindings (The Service Layer)**
   Always put your auto-generated Wails client bindings (`wailsjs/...`) inside a file within your feature's `services/` directory (like `settingsService.ts` or a new `analyticsService.ts`) instead of directly inside UI pages. This makes it super simple to mock the backend and test your components independently!
   
2. **Keep Features Self-Contained**
   Avoid importing assets/components directly from another feature folder. If something is used in multiple features, move it up to `frontend/src/components/common/` or `frontend/src/services/`.

3. **Keep Imports Clean**
   Use the `index.ts` files inside each feature folder as their "public gate" to export components. This keeps imports looking clean (e.g. `import { SettingsPage } from "../features/settings"`).
