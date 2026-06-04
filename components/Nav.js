import Link from "next/link";
import { useState } from "react";
import { collections } from "../data/products";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav style={styles.nav}>
        <div className="container" style={styles.inner}>
          <Link href="/" style={styles.logo}>
            <span>RAAHII</span>
            <span className="urdu" style={styles.logoUrdu}>را ہی</span>
          </Link>

          <div style={styles.links}>
            {collections.map((c) => (
              <Link key={c.id} href={`/collections/${c.slug}`} style={styles.link}>
                {c.name}
              </Link>
            ))}
          </div>

          <button
            style={styles.burger}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span style={{ ...styles.burgerLine, transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ ...styles.burgerLine, opacity: open ? 0 : 1 }} />
            <span style={{ ...styles.burgerLine, transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {open && (
        <div style={styles.mobileMenu}>
          {collections.map((c) => (
            <Link
              key={c.id}
              href={`/collections/${c.slug}`}
              style={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              <span>{c.name}</span>
              <span className="urdu" style={{ color: "var(--accent)", fontSize: "1rem" }}>{c.nameUrdu}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: "rgba(10,10,10,0.92)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid var(--border)",
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "64px",
    gap: "2rem",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "1.1rem",
    fontWeight: 700,
    letterSpacing: "0.15em",
    color: "var(--white)",
  },
  logoUrdu: {
    fontSize: "1.2rem",
    color: "var(--accent)",
  },
  links: {
    display: "flex",
    gap: "2rem",
    flex: 1,
    justifyContent: "center",
    "@media (max-width: 768px)": { display: "none" },
  },
  link: {
    fontSize: "0.75rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--gray)",
    transition: "color 0.2s",
    ":hover": { color: "var(--white)" },
  },
  burger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    padding: "4px",
    "@media (max-width: 768px)": { display: "flex" },
  },
  burgerLine: {
    width: "22px",
    height: "1.5px",
    background: "var(--white)",
    transition: "transform 0.2s, opacity 0.2s",
    display: "block",
  },
  mobileMenu: {
    position: "fixed",
    top: "64px",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    background: "var(--black)",
    display: "flex",
    flexDirection: "column",
    padding: "2rem 1.5rem",
    gap: "0.5rem",
  },
  mobileLink: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 0",
    borderBottom: "1px solid var(--border)",
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--white)",
  },
};
