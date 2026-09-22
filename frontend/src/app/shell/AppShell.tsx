import Logo from "../../assets/logo.png";
import AsasLogo from "../../assets/asas-logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Sun,
  Moon,
  Monitor,
  Command,
  X,
  ArrowRight,
  Menu,
  Cpu
} from "lucide-react";
import { useState, useEffect, useCallback, type ReactNode } from "react";
import { APP_ROUTES } from "../../config/routes";
import { settingsService } from "../../features/settings";
import "./AppShell.css";


export function AppShell({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem("sidebar_collapsed") === "true");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem("theme") || "system";
    document.documentElement.classList.remove("theme-light", "theme-dark", "theme-system");
    document.documentElement.classList.add(`theme-${saved}`);
    return saved;
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuToggle = useCallback(() => {
    if (window.innerWidth <= 1024) {
      setMobileMenuOpen(prev => !prev);
    } else {
      setSidebarCollapsed(prev => {
        const next = !prev;
        localStorage.setItem("sidebar_collapsed", String(next));
        return next;
      });
    }
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const motionPref = localStorage.getItem("pref_reduce_motion");
    if (motionPref === "true") {
      document.documentElement.classList.add("reduce-motion");
      document.documentElement.classList.add("potato-mode");
    } else {
      document.documentElement.classList.remove("reduce-motion");
      document.documentElement.classList.remove("potato-mode");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (searchOpen) setSearchOpen(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, mobileMenuOpen]);

  // Handle window resize to automatically close mobile menu when expanding screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const applyTheme = useCallback((theme: string) => {
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark", "theme-system");
    root.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
    setCurrentTheme(theme);
    window.dispatchEvent(new Event("storage"));
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem("theme") || "system";
      if (saved !== currentTheme) {
        const root = document.documentElement;
        root.classList.remove("theme-light", "theme-dark", "theme-system");
        root.classList.add(`theme-${saved}`);
        setCurrentTheme(saved);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [currentTheme]);

  // Build searchable items from APP_ROUTES
  const searchItems = [
    ...APP_ROUTES.map((route) => ({
      title: route.label,
      category: "Navigation Page",
      icon: route.icon,
      action: () => {
        navigate(route.path);
        setSearchOpen(false);
        closeMobileMenu();
      }
    })),
    {
      title: "Light Theme",
      category: "Appearance",
      icon: Sun,
      action: async () => {
        applyTheme("light");
        try {
          await settingsService.setTheme("light");
        } catch (e) {
          console.error(e);
        }
        setSearchOpen(false);
      }
    },
    {
      title: "Dark Theme",
      category: "Appearance",
      icon: Moon,
      action: async () => {
        applyTheme("dark");
        try {
          await settingsService.setTheme("dark");
        } catch (e) {
          console.error(e);
        }
        setSearchOpen(false);
      }
    },
    {
      title: "System Theme",
      category: "Appearance",
      icon: Monitor,
      action: async () => {
        applyTheme("system");
        try {
          await settingsService.setTheme("system");
        } catch (e) {
          console.error(e);
        }
        setSearchOpen(false);
      }
    }
  ];

  const filteredItems = searchItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const navItems = APP_ROUTES.filter((route) => route.showInNav !== false);
  return (
    <div className="app">
      <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="brand" onClick={() => { navigate("/"); closeMobileMenu(); }}>
          <div className="brand-mark">
            <Cpu size={20} />
          </div>
          <div className="brand-text">
            <strong>ASAS Workbench</strong>
            <span>Powered by ASAS Labs</span>
          </div>
        </div>

        <nav className="nav-group">
          {navItems.map(({ path, label, icon: Icon }) => (
            <button
              key={path}
              onClick={() => {
                navigate(path);
                closeMobileMenu();
              }}
              className={location.pathname === path ? "nav-item active" : "nav-item"}
              title={label}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="status-indicator-wrap">
            <div className="status-indicator"></div>
            <span>System Online</span>
          </div>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div className="mobile-backdrop" onClick={closeMobileMenu}></div>
      )}

      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <button 
              className="icon-button menu-toggle" 
              onClick={handleMenuToggle} 
              aria-label="Toggle Menu"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu size={20} />
            </button>
            <div className="search-box" onClick={() => setSearchOpen(true)} style={{ cursor: "pointer" }}>
              <Search size={17} />
              <span>Search...</span>
              <kbd>⌘ K</kbd>
            </div>
          </div>
          <div className="topbar-actions">
            <button 
              className="icon-button topbar-theme-toggle" 
              onClick={() => {
                const next = currentTheme === "dark" ? "light" : "dark";
                applyTheme(next);
                settingsService.setTheme(next).catch(console.error);
              }}
              aria-label="Toggle theme"
              title={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
            >
              {currentTheme === "dark" ? (
                <Sun size={17} className="theme-icon sun" />
              ) : (
                <Moon size={17} className="theme-icon moon" />
              )}
            </button>
            <div className="topbar-avatar">
              <img src={AsasLogo} alt="ASAS Labs Logo" />
            </div>
          </div>
        </header>
        <section className="content">{children}</section>
      </main>

      {searchOpen && (
        <div className="search-modal-backdrop" onClick={() => setSearchOpen(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-input-wrap">
              <Command size={18} className="muted" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search features..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="icon-button" onClick={() => setSearchOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="search-results">
              {filteredItems.length === 0 ? (
                <div className="search-empty">No matching features or commands found.</div>
              ) : (
                filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="search-result-item" onClick={item.action}>
                      <div className="search-result-icon">
                        <Icon size={16} />
                      </div>
                      <div className="search-result-text">
                        <strong>{item.title}</strong>
                        <span>{item.category}</span>
                      </div>
                      <ArrowRight size={14} className="muted" />
                    </div>
                  );
                })
              )}
            </div>
            <div className="search-footer">
              <span>Use <strong>↑↓</strong> to navigate, <strong>Enter</strong> to select, <strong>ESC</strong> to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
