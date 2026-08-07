import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, FlaskConical, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { company } from "@/data/company";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Manufacturing", to: "/manufacturing" },
  { label: "Quality & Certifications", to: "/quality" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact Us", to: "/contact" },
] as const;

const socialIcons: Record<string, React.ReactNode> = {
  LinkedIn: <Linkedin className="h-4 w-4" />,
  Twitter: <Twitter className="h-4 w-4" />,
  Facebook: <Facebook className="h-4 w-4" />,
  Instagram: <Instagram className="h-4 w-4" />,
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #0d2040 40%, #0a3d2e 80%, #052e22 100%)",
        color: "#e2f0ec",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: "4px",
          background: "linear-gradient(90deg, #1a9b6c 0%, #2dd4bf 35%, #38bdf8 65%, #1a9b6c 100%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand column */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div
              style={{
                background: "linear-gradient(135deg, #1a9b6c, #2dd4bf)",
                borderRadius: "10px",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FlaskConical className="h-5 w-5 text-white" />
            </div>
            <h3
              style={{
                fontWeight: 700,
                fontSize: "1.1rem",
                background: "linear-gradient(90deg, #2dd4bf, #7dd3fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {company.name}
            </h3>
          </div>

          <p style={{ fontSize: "0.875rem", lineHeight: "1.75", color: "#94a3b8", maxWidth: "28rem" }}>
            {company.intro}
          </p>

          {/* Social links */}
          <div className="mt-6 flex flex-wrap gap-3">
            {company.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 14px",
                  borderRadius: "8px",
                  border: "1px solid rgba(45, 212, 191, 0.25)",
                  backgroundColor: "rgba(45, 212, 191, 0.07)",
                  color: "#94a3b8",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#2dd4bf";
                  el.style.color = "#2dd4bf";
                  el.style.backgroundColor = "rgba(45, 212, 191, 0.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(45, 212, 191, 0.25)";
                  el.style.color = "#94a3b8";
                  el.style.backgroundColor = "rgba(45, 212, 191, 0.07)";
                }}
              >
                {socialIcons[item.label] ?? null}
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#2dd4bf",
              marginBottom: "1rem",
            }}
          >
            Quick Links
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  style={{
                    fontSize: "0.875rem",
                    color: "#94a3b8",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#2dd4bf"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; }}
                >
                  <span style={{ color: "#1a9b6c", fontSize: "0.6rem" }}>▶</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#2dd4bf",
              marginBottom: "1rem",
            }}
          >
            Contact
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <li style={{ display: "flex", gap: "10px", fontSize: "0.875rem", color: "#94a3b8" }}>
              <MapPin style={{ marginTop: "2px", height: "16px", width: "16px", flexShrink: 0, color: "#2dd4bf" }} />
              <span>
                {company.address.line1}, {company.address.line2}
                <br />
                {company.address.city} {company.address.postalCode}
              </span>
            </li>
            <li style={{ display: "flex", gap: "10px", fontSize: "0.875rem", color: "#94a3b8" }}>
              <Phone style={{ marginTop: "2px", height: "16px", width: "16px", flexShrink: 0, color: "#2dd4bf" }} />
              <a
                href={`tel:${company.phone}`}
                style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#2dd4bf"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; }}
              >
                {company.phone}
              </a>
            </li>
            <li style={{ display: "flex", gap: "10px", fontSize: "0.875rem", color: "#94a3b8" }}>
              <Mail style={{ marginTop: "2px", height: "16px", width: "16px", flexShrink: 0, color: "#2dd4bf" }} />
              <a
                href={`mailto:${company.email}`}
                style={{ color: "inherit", textDecoration: "none", wordBreak: "break-all", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#2dd4bf"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; }}
              >
                {company.email}
              </a>
            </li>
          </ul>

          {/* Certification badge */}
          <div
            style={{
              marginTop: "1.5rem",
              padding: "10px 14px",
              borderRadius: "8px",
              background: "rgba(26, 155, 108, 0.12)",
              border: "1px solid rgba(26, 155, 108, 0.3)",
              fontSize: "0.7rem",
              color: "#6ee7b7",
              lineHeight: "1.5",
            }}
          >
            🏥 <strong>WHO-GMP Certified</strong>
            <br />
            ISO 9001:2015 | Schedule M Compliant
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(45, 212, 191, 0.15)" }}>
        <div
          className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
          style={{ fontSize: "0.75rem", color: "#64748b" }}
        >
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p>Manufactured under WHO-GMP guidelines. For registered healthcare partners.</p>
        </div>
      </div>
    </footer>
  );
}
