import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.inner}>
        <div style={styles.brand}>
          <span style={styles.logo}>RAAHII</span>
          <span className="urdu" style={styles.logoUrdu}>را ہی</span>
          <p style={styles.tagline}>Where Urdu calligraphy meets street swagger</p>
        </div>

        <div style={styles.links}>
          <Link href="/pages/about" style={styles.link}>About</Link>
          <Link href="/pages/contact" style={styles.link}>Contact</Link>
          <Link href="/pages/shipping" style={styles.link}>Shipping</Link>
          <Link href="/pages/returns" style={styles.link}>Returns</Link>
        </div>

        <div style={styles.social}>
          <a href="https://www.instagram.com/raahiibynotnormal/" target="_blank" rel="noopener" style={styles.socialLink}>Instagram</a>
          <a href="https://www.tiktok.com/@raahiibynotnormal" target="_blank" rel="noopener" style={styles.socialLink}>TikTok</a>
        </div>
      </div>

      <div className="container" style={styles.bottom}>
        <span style={styles.copy}>© {new Date().getFullYear()} RAAHII. All rights reserved.</span>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    borderTop: "1px solid var(--border)",
    marginTop: "6rem",
    paddingTop: "3rem",
    paddingBottom: "2rem",
  },
  inner: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "2rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid var(--border)",
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  logo: {
    fontSize: "1.1rem",
    fontWeight: 700,
    letterSpacing: "0.15em",
  },
  logoUrdu: {
    fontSize: "1.2rem",
    color: "var(--accent)",
  },
  tagline: {
    fontSize: "0.75rem",
    color: "var(--gray)",
    maxWidth: "200px",
    lineHeight: 1.6,
    marginTop: "4px",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  link: {
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--gray)",
  },
  social: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    alignItems: "flex-end",
  },
  socialLink: {
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--gray)",
  },
  bottom: {
    paddingTop: "1.5rem",
  },
  copy: {
    fontSize: "0.7rem",
    color: "var(--gray)",
    letterSpacing: "0.08em",
  },
};
