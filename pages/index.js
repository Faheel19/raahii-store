import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { collections, products } from "../data/products";

const MARQUEE_TEXT = "RAAHII · را ہی · STREET CULTURE · ثقافت · LIMITED DROPS · URBAN FASHION · ";

const HERO_IMAGE = "https://raahii.us/cdn/shop/files/IMG_2368.jpg?v=1713077418&width=2400";

const SLIDESHOW_IMAGES = [
  "https://raahii.us/cdn/shop/files/IMG_2357.jpg?v=1713077422&width=2400",
  "https://raahii.us/cdn/shop/files/IMG_2342.jpg?v=1713077419&width=2400",
  "https://raahii.us/cdn/shop/files/IMG_2360.jpg?v=1713077422&width=2400",
  "https://raahii.us/cdn/shop/files/IMG_2344.jpg?v=1713077419&width=2400",
];

const COLLECTION_IMAGES = {
  sweatshirts: "https://raahii.us/cdn/shop/files/unisex-premium-sweatshirt-white-front-65ea7c104709d.jpg?v=1709866010&width=800",
  hoodies: "https://raahii.us/cdn/shop/files/unisex-premium-hoodie-forest-green-front-65ea9b3be7157.jpg?v=1738214305&width=800",
  tshirts: "https://raahii.us/cdn/shop/files/oversized-faded-t-shirt-faded-bone-front-6923d03f16ca3.jpg?v=1763954758&width=800",
  limited: "https://raahii.us/cdn/shop/files/unisex-premium-hoodie-black-front-66155d0a9e482.jpg?v=1712676118&width=800",
  embroidery: "https://raahii.us/cdn/shop/files/unisex-premium-sweatshirt-white-front-65ea758ac0f0a.jpg?v=1709867521&width=800",
};

export default function Home() {
  const limitedDrops = products.filter((p) => p.isLimitedDrop);
  const featuredProducts = products.slice(0, 4);

  return (
    <Layout>
      <Head>
        <title>RAAHII — را ہی | South Asian Streetwear</title>
        <meta name="description" content="Where Urdu calligraphy meets street swagger. South Asian urban fashion." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* HERO */}
      <section style={{ ...styles.hero, backgroundImage: `url(${HERO_IMAGE})` }}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <p style={styles.heroEyebrow}>South Asian Streetwear</p>
          <h1 style={styles.heroTitle}>
            <span style={styles.heroEn}>RAAHII</span>
            <span className="urdu" style={styles.heroUrdu}>را ہی</span>
          </h1>
          <p style={styles.heroSub}>Where Urdu calligraphy meets street swagger</p>
          <div style={styles.heroCtas}>
            <Link href="/collections/limited" style={styles.ctaPrimary}>View Limited Drops</Link>
            <Link href="/collections/hoodies" style={styles.ctaSecondary}>Shop All</Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={styles.ticker} aria-hidden="true">
        <div style={styles.tickerTrack}>
          <span style={styles.tickerText}>{MARQUEE_TEXT.repeat(6)}</span>
        </div>
      </div>

      {/* COLLECTIONS GRID */}
      <section style={styles.section}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Collections</h2>
            <span className="urdu" style={styles.sectionUrdu}>کلیکشنز</span>
          </div>
          <div style={styles.collectionsGrid}>
            {collections.map((col) => (
              <Link key={col.id} href={`/collections/${col.slug}`} style={styles.collectionCard}>
                {COLLECTION_IMAGES[col.id] && (
                  <img
                    src={COLLECTION_IMAGES[col.id]}
                    alt={col.name}
                    style={styles.collectionImg}
                  />
                )}
                <div style={styles.collectionOverlay} />
                <div style={styles.collectionLabel}>
                  <span style={styles.collectionName}>{col.name}</span>
                  <span className="urdu" style={styles.collectionUrdu}>{col.nameUrdu}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE SLIDESHOW */}
      <section style={styles.slideshowSection}>
        <div style={styles.slideshowGrid}>
          {SLIDESHOW_IMAGES.map((src, i) => (
            <div key={i} style={styles.slideshowItem}>
              <img src={src} alt={`RAAHII lifestyle ${i + 1}`} style={styles.slideshowImg} />
            </div>
          ))}
        </div>
      </section>

      {/* DARK NOIR SPOTLIGHT */}
      {limitedDrops[0] && (
        <section style={{
          ...styles.spotlightSection,
          backgroundImage: `url(${limitedDrops[0].images[0]})`,
        }}>
          <div style={styles.spotlightOverlay} />
          <div className="container" style={styles.spotlightContent}>
            <p style={styles.spotlightEyebrow}>Limited Drop</p>
            <h2 style={styles.spotlightTitle}>{limitedDrops[0].name}</h2>
            <p className="urdu" style={styles.spotlightUrdu}>{limitedDrops[0].nameUrdu}</p>
            <p style={styles.spotlightPrice}>${limitedDrops[0].price}</p>
            <Link href={`/products/${limitedDrops[0].id}`} style={styles.ctaPrimary}>
              Shop Now
            </Link>
          </div>
        </section>
      )}

      {/* FEATURED PRODUCTS */}
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
    </Layout>
  );
}

const styles = {
  hero: {
    position: "relative",
    minHeight: "95vh",
    display: "flex",
    alignItems: "flex-end",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.1) 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    padding: "0 1.5rem 5rem",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  heroEyebrow: {
    fontSize: "0.7rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "var(--accent)",
    marginBottom: "1rem",
  },
  heroTitle: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
    marginBottom: "1.25rem",
  },
  heroEn: {
    fontSize: "clamp(4rem, 12vw, 10rem)",
    fontWeight: 700,
    letterSpacing: "0.08em",
    lineHeight: 1,
    color: "var(--white)",
  },
  heroUrdu: {
    fontSize: "clamp(2rem, 5vw, 4rem)",
    color: "var(--accent)",
    lineHeight: 1.3,
    display: "block",
    direction: "ltr",
    unicodeBidi: "plaintext",
  },
  heroSub: {
    fontSize: "0.9rem",
    color: "rgba(245,242,236,0.7)",
    letterSpacing: "0.05em",
    marginBottom: "2rem",
  },
  heroCtas: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  ctaPrimary: {
    display: "inline-block",
    padding: "0.85rem 2.25rem",
    background: "var(--accent)",
    color: "var(--black)",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontWeight: 700,
  },
  ctaSecondary: {
    display: "inline-block",
    padding: "0.85rem 2.25rem",
    border: "1px solid rgba(245,242,236,0.4)",
    color: "var(--white)",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
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
    animation: "marquee 40s linear infinite",
    whiteSpace: "nowrap",
  },
  tickerText: {
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    color: "var(--accent)",
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
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
  },
  collectionCard: {
    position: "relative",
    aspectRatio: "2/3",
    overflow: "hidden",
    display: "block",
    background: "#ffffff",
  },
  collectionImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    transition: "transform 0.5s ease",
  },
  collectionOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.1) 60%)",
  },
  collectionLabel: {
    position: "absolute",
    bottom: "1.25rem",
    left: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  collectionName: {
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "var(--white)",
    fontWeight: 700,
  },
  collectionUrdu: {
    fontSize: "1rem",
    color: "var(--accent)",
  },
  slideshowSection: {
    padding: "0 0 5rem",
  },
  slideshowGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "4px",
  },
  slideshowItem: {
    aspectRatio: "3/4",
    overflow: "hidden",
  },
  slideshowImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
  spotlightSection: {
    position: "relative",
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginBottom: "2rem",
  },
  spotlightOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, rgba(10,10,10,0.88) 35%, rgba(10,10,10,0.15) 100%)",
  },
  spotlightContent: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "500px",
  },
  spotlightEyebrow: {
    fontSize: "0.65rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "var(--accent)",
  },
  spotlightTitle: {
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
    fontWeight: 700,
    lineHeight: 1.2,
    color: "var(--white)",
  },
  spotlightUrdu: {
    fontSize: "1.5rem",
    color: "var(--accent)",
  },
  spotlightPrice: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "var(--white)",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "2rem",
  },
};
