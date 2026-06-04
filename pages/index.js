import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { collections, products } from "../data/products";

const MARQUEE_TEXT = "RAAHII · را ہی · STREET CULTURE · ثقافت · LIMITED DROPS · URBAN FASHION · ";

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const limitedDrops = products.filter((p) => p.isLimitedDrop);

  return (
    <Layout>
      <Head>
        <title>RAAHII — را ہی | South Asian Streetwear</title>
        <meta name="description" content="Where Urdu calligraphy meets street swagger. South Asian urban fashion." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.heroEyebrow}>South Asian Streetwear</p>
          <h1 style={styles.heroTitle}>
            <span style={styles.heroEn}>RAAHII</span>
            <span className="urdu" style={styles.heroUrdu}>را ہی</span>
          </h1>
          <p style={styles.heroSub}>Where Urdu calligraphy meets street swagger</p>
          <div style={styles.heroCtas}>
            <Link href="/collections/limited" style={styles.ctaPrimary}>
              View Limited Drops
            </Link>
            <Link href="/collections/hoodies" style={styles.ctaSecondary}>
              Shop All
            </Link>
          </div>
        </div>
        <div style={styles.heroOverlay} />
      </section>

      {/* Marquee ticker */}
      <div style={styles.ticker} aria-hidden="true">
        <div style={styles.tickerTrack}>
          <span style={styles.tickerText}>{MARQUEE_TEXT.repeat(4)}</span>
        </div>
      </div>

      {/* Collections grid */}
      <section style={styles.section}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Collections</h2>
            <span className="urdu" style={styles.sectionUrdu}>کلیکشنز</span>
          </div>
          <div style={styles.collectionsGrid}>
            {collections.map((col) => (
              <Link key={col.id} href={`/collections/${col.slug}`} style={styles.collectionCard}>
                <div style={styles.collectionInner}>
                  <span style={styles.collectionName}>{col.name}</span>
                  <span className="urdu" style={styles.collectionUrdu}>{col.nameUrdu}</span>
                </div>
                <span style={styles.collectionArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section style={styles.section}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Featured</h2>
            <Link href="/collections/hoodies" style={styles.viewAll}>View all →</Link>
          </div>
          <div style={styles.productGrid}>
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Limited drops callout */}
      {limitedDrops.length > 0 && (
        <section style={styles.dropsSection}>
          <div className="container" style={styles.dropsInner}>
            <div>
              <p style={styles.dropsEyebrow}>Don&apos;t miss out</p>
              <h2 style={styles.dropsTitle}>Limited Drops</h2>
              <p className="urdu" style={styles.dropsUrdu}>لمیٹڈ ڈراپس</p>
            </div>
            <Link href="/collections/limited" style={styles.ctaPrimary}>
              Shop Drops →
            </Link>
          </div>
        </section>
      )}
    </Layout>
  );
}

const styles = {
  hero: {
    position: "relative",
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(135deg, #0a0a0a 60%, #1a1208 100%)",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at 70% 50%, rgba(200,169,110,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    padding: "0 1.5rem",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  heroEyebrow: {
    fontSize: "0.7rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "var(--accent)",
    marginBottom: "1.5rem",
  },
  heroTitle: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1.5rem",
  },
  heroEn: {
    fontSize: "clamp(4rem, 12vw, 10rem)",
    fontWeight: 700,
    letterSpacing: "0.08em",
    lineHeight: 1,
    color: "var(--white)",
  },
  heroUrdu: {
    fontSize: "clamp(3rem, 9vw, 7rem)",
    color: "var(--accent)",
    lineHeight: 1.2,
  },
  heroSub: {
    fontSize: "0.9rem",
    color: "var(--gray)",
    letterSpacing: "0.05em",
    marginBottom: "2.5rem",
    maxWidth: "400px",
  },
  heroCtas: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  ctaPrimary: {
    display: "inline-block",
    padding: "0.8rem 2rem",
    background: "var(--accent)",
    color: "var(--black)",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontWeight: 700,
    transition: "background 0.2s",
  },
  ctaSecondary: {
    display: "inline-block",
    padding: "0.8rem 2rem",
    border: "1px solid var(--border)",
    color: "var(--white)",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    transition: "border-color 0.2s",
  },
  ticker: {
    overflow: "hidden",
    borderTop: "1px solid var(--border)",
    borderBottom: "1px solid var(--border)",
    padding: "0.75rem 0",
    background: "var(--gray-light)",
  },
  tickerTrack: {
    display: "flex",
    animation: "marquee 30s linear infinite",
    whiteSpace: "nowrap",
  },
  tickerText: {
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    color: "var(--accent)",
    paddingRight: "2rem",
  },
  section: {
    padding: "5rem 0",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: "1rem",
    marginBottom: "2.5rem",
    borderBottom: "1px solid var(--border)",
    paddingBottom: "1rem",
  },
  sectionTitle: {
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 700,
    color: "var(--white)",
  },
  sectionUrdu: {
    fontSize: "1rem",
    color: "var(--accent)",
    opacity: 0.7,
  },
  viewAll: {
    marginLeft: "auto",
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    color: "var(--gray)",
    textTransform: "uppercase",
  },
  collectionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1px",
    background: "var(--border)",
    border: "1px solid var(--border)",
  },
  collectionCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1.5rem",
    background: "var(--black)",
    transition: "background 0.2s",
    gap: "1rem",
  },
  collectionInner: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  collectionName: {
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "var(--white)",
  },
  collectionUrdu: {
    fontSize: "0.9rem",
    color: "var(--accent)",
    opacity: 0.7,
  },
  collectionArrow: {
    color: "var(--accent)",
    fontSize: "1rem",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "2rem",
  },
  dropsSection: {
    background: "var(--gray-light)",
    borderTop: "1px solid var(--border)",
    borderBottom: "1px solid var(--border)",
    padding: "4rem 0",
    marginTop: "2rem",
  },
  dropsInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "2rem",
  },
  dropsEyebrow: {
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--accent)",
    marginBottom: "0.5rem",
  },
  dropsTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    marginBottom: "4px",
  },
  dropsUrdu: {
    fontSize: "1.5rem",
    color: "var(--accent)",
    opacity: 0.8,
  },
};
