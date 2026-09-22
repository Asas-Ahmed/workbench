# ASAS Workbench

> A powerful, multi-platform personal workspace for tools, utilities, and solutions to real-world problems I face, developed by **ASAS Labs**.

**ASAS Workbench** is an extensible cross-platform application designed to bring tools, workflows, utilities, and creative ideas into one polished workspace across **Android, Linux, and Windows**.

Built with a robust hybrid architecture utilizing **Go + Wails** for desktop and **Capacitor** for Android, paired with a modern **React + TypeScript + Vite** frontend, ASAS Workbench is engineered for continuous growth, clean separation of concerns, and rapid feature expansion.

---

## ✨ Vision

ASAS Workbench is my personal, powerful workspace where I can seamlessly add new tools and workflows as I need them.

The goal is to have a single application to host solutions to the real-world problems I encounter, ensuring the application remains maintainable as it grows.

Everything is organized around independent feature modules and a centralized route registry, allowing ASAS Workbench to continuously evolve.

---

## 🧩 Architecture & Multi-Platform Support

ASAS Workbench follows a **feature-first architecture** with a centralized route registry (`frontend/src/config/routes.tsx`) and application shell layout (`AppShell`). 

It supports multiple platforms from a unified codebase:
1. **Desktop (Linux & Windows):** Powered by **Go + Wails**, exposing native Go backend services directly via thin Wails bindings to the React frontend.
2. **Mobile (Android):** Powered by **Capacitor**, wrapping the web frontend for Android devices with native asset integration and Gradle builds.

```text
ASAS Workbench/
│
├── cmd/
│   └── main.go
│
├── backend/                  # Go Backend (Desktop native services)
│   ├── app/
│   ├── internal/
│   │   ├── settings/
│   │   └── workspace/
│   ├── repository/
│   ├── infrastructure/
│   └── shared/
│
├── frontend/                 # React + TypeScript Frontend (Shared across Desktop & Android)
│   ├── android/              # Capacitor Android project wrapper & Gradle build configs
│   └── src/
│       ├── app/
│       │   ├── App.tsx
│       │   └── shell/
│       │       └── AppShell.tsx
│       │
│       ├── config/
│       │   └── routes.tsx          # Single source of truth for features & navigation
│       │
│       ├── features/               # Isolated feature modules (dashboard, settings, etc.)
│       │   ├── dashboard/
│       │   └── settings/
│       │
│       ├── components/
│       │   └── common/
│       │
│       └── styles/
│           └── globals.css
│
├── docs/
│   └── ARCHITECTURE_GUIDE.md
│
├── Makefile                  # Cross-platform build & dev automation tasks
└── build/
```

### Why feature-first?

A new feature lives entirely inside its own module:

```text
features/
└── my-new-tool/
    ├── pages/
    ├── components/
    ├── hooks/
    ├── services/
    ├── types.ts
    └── index.ts
```

Adding a new tool or feature is as simple as creating the feature folder, writing your page component, and registering it in `frontend/src/config/routes.tsx`. It automatically appears in the sidebar navigation and command search palette (`Cmd/Ctrl + K`)!

---

## 🛠️ Tech Stack

| Layer             | Technology                |
|-------------------|---------------------------|
| Desktop Framework | Wails (Go)                |
| Mobile Framework  | Capacitor (Android)       |
| Backend           | Go                        |
| Frontend          | React                     |
| Language          | TypeScript                |
| Build Tool        | Vite                      |
| Persistence       | SQLite-ready architecture |
| UI & Icons        | Lucide React & Custom CSS |
| Platforms         | Linux, Windows, Android   |

---

## 🏗️ Development Philosophy

### Keep Wails bindings / Native bridges thin

Frontend:
```text
React
  ↓
Feature Service (Service Layer wrapping Wails Go bindings / Capacitor APIs)
  ↓
Wails API / Native Bridge
  ↓
Go Service (Desktop)
  ↓
Repository / Infrastructure
```

Business logic should not be buried inside React components or direct platform calls.

### Keep features isolated

Features communicate through stable public interfaces rather than importing each other's internal implementation.

---

## 📦 Getting Started & Commands

### Requirements

* **Go** (for Desktop Wails backend)
* **Node.js & npm**
* **Wails CLI** (`go install github.com/wailsapp/wails/v2/cmd/wails@latest`)
* **Android Studio / Android SDK** (optional, for Android builds)

### Automation with Makefile

ASAS Workbench provides a convenient `Makefile` to handle development and cross-platform builds:

#### 1. Install Frontend Dependencies
```bash
make frontend
# or: cd frontend && npm install
```

#### 2. Run Desktop Development (Live Reload)
```bash
make dev
# Runs: wails dev -tags webkit2_41
```

#### 3. Build Production Binaries & Android App
* **Linux Build:**
  ```bash
  make build-linux
  ```
* **Windows Build:**
  ```bash
  make build-windows
  ```
* **Android Build (Debug APK via Capacitor & Gradle):**
  ```bash
  make build-android
  ```

---

## 🗂️ Adding a New Feature

Please check [docs/ARCHITECTURE_GUIDE.md](docs/ARCHITECTURE_GUIDE.md) for a comprehensive 3-step guide on adding new pages and features to ASAS Workbench.

---

## 🎨 Product

**ASAS Workbench**

* Short name: **ASAS Workbench**
* Brand: **ASAS Labs**

---

## 🧪 Status

> 🚧 Active Development

The core architecture, navigation shell, command palette, dashboard, settings module, and multi-platform support (Android, Linux, Windows) are fully established. I am actively adding new personal tools and workflows as needed.

---

## 🤝 Contributing

This is a personal workspace for ASAS Labs.

---

## 📄 License

MIT

---

**ASAS Labs · Building ASAS Workbench**


