import Logo from "../../../assets/logo.png";

export function DashboardPage() {
  return (
    <div className="fade-in" style={{ display: "grid", placeItems: "center", minHeight: "75vh", textAlign: "center", padding: "2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "600px", width: "100%" }}>
        <div style={{
          position: "relative",
          marginBottom: "2rem",
          padding: "1.5rem",
          borderRadius: "24px",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <img 
            src={Logo} 
            alt="ASAS Workbench Logo" 
            style={{ 
              width: "clamp(120px, 22vw, 180px)", 
              height: "clamp(120px, 22vw, 180px)", 
              objectFit: "cover", 
              borderRadius: "20px",
              boxShadow: "0 16px 36px rgba(0, 0, 0, 0.35), 0 0 30px var(--accent-glow)"
            }} 
          />
        </div>
        <h1 style={{ 
          fontSize: "clamp(2.2rem, 5vw, 3.5rem)", 
          fontWeight: 800,
          letterSpacing: "-0.03em",
          marginBottom: "0.75rem",
          background: "linear-gradient(135deg, var(--text) 0%, var(--text-muted) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          ASAS Workbench
        </h1>
        <p style={{ 
          color: "var(--text-muted)", 
          fontSize: "clamp(1rem, 2vw, 1.25rem)", 
          fontWeight: 500,
          letterSpacing: "0.01em" 
        }}>
          Powered by ASAS Labs
        </p>
      </div>
    </div>
  );
}
