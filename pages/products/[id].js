import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Layout from "../../components/Layout";
import { products, collections, getProductById } from "../../data/products";

export async function getStaticPaths() {
  return {
    paths: products.map((p) => ({ params: { id: p.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = getProductById(params.id);
  const collection = collections.find((c) => c.id === product.collection);
  return { props: { product, collection } };
}

export default function ProductPage({ product, collection }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeError, setShowSizeError] = useState(false);

  function handleBuy() {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    // Append size to Stripe link as a custom field if needed,
    // or just open the link — Stripe lets you add custom fields in the dashboard.
    // For now we open the link with size as a URL param for your records.
    const url = `${product.stripeLink}?prefilled_custom1=${encodeURIComponent(selectedSize)}`;
    window.open(url, "_blank");
  }

  return (
    <Layout>
      <Head>
        <title>{product.name} — RAAHII</title>
        <meta name="description" content={product.description} />
        {product.images?.[0] && <meta property="og:image" content={product.images[0]} />}
      </Head>

      <div className="container" style={styles.page}>
        {/* Breadcrumb */}
        <div style={styles.breadcrumb}>
          <Link href="/" style={styles.breadLink}>Home</Link>
          <span style={styles.breadSep}>/</span>
          <Link href={`/collections/${collection.slug}`} style={styles.breadLink}>{collection.name}</Link>
          <span style={styles.breadSep}>/</span>
          <span style={styles.breadCurrent}>{product.name}</span>
        </div>

        <div style={styles.layout}>
          {/* Image */}
          <div style={styles.imageSection}>
            <div style={styles.imageWrap}>
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} style={styles.image} />
              ) : (
                <div style={styles.imagePlaceholder}>
                  <span className="urdu" style={styles.placeholderText}>{product.nameUrdu}</span>
                </div>
              )}
              {product.isLimitedDrop && !product.isSoldOut && (
                <span style={styles.badge}>Limited Drop</span>
              )}
            </div>
          </div>

          {/* Info */}
          <div style={styles.infoSection}>
            <div>
              <p style={styles.collectionLabel}>{collection.name}</p>
              <h1 style={styles.productName}>{product.name}</h1>
              <p className="urdu" style={styles.productNameUrdu}>{product.nameUrdu}</p>
              <p style={styles.price}>${product.price}</p>
            </div>

            <p style={styles.description}>{product.description}</p>

            {/* Size selector */}
            <div style={styles.sizeSection}>
              <p style={styles.sizeLabel}>
                Size
                {selectedSize && <span style={styles.selectedSize}> — {selectedSize}</span>}
              </p>
              <div style={styles.sizeGrid}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setShowSizeError(false); }}
                    style={{
                      ...styles.sizeBtn,
                      ...(selectedSize === size ? styles.sizeBtnActive : {}),
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {showSizeError && (
                <p style={styles.sizeError}>Please select a size</p>
              )}
            </div>

            {/* Buy button */}
            {product.isSoldOut ? (
              <button style={styles.btnSoldOut} disabled>Sold Out</button>
            ) : product.stripeLink === "https://buy.stripe.com/REPLACE_ME" ? (
              <div style={styles.setupNotice}>
                <p style={styles.setupText}>
                  ⚠️ Add your Stripe payment link in <code>data/products.js</code> to enable checkout.
                </p>
              </div>
            ) : (
              <button style={styles.btnBuy} onClick={handleBuy}>
                Buy Now — ${product.price}
              </button>
            )}

            <p style={styles.stripeNote}>
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  page: {
    paddingTop: "3rem",
    paddingBottom: "6rem",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "3rem",
    fontSize: "0.65rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  breadLink: {
    color: "var(--gray)",
  },
  breadSep: {
    color: "var(--gray)",
    opacity: 0.4,
  },
  breadCurrent: {
    color: "var(--white)",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "5rem",
    alignItems: "start",
  },
  imageSection: {},
  imageWrap: {
    position: "relative",
    aspectRatio: "3/4",
    background: "var(--gray-light)",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: "3rem",
    color: "var(--accent)",
    opacity: 0.4,
  },
  badge: {
    position: "absolute",
    top: "16px",
    left: "16px",
    background: "var(--accent)",
    color: "var(--black)",
    fontSize: "0.6rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 700,
    padding: "4px 12px",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    position: "sticky",
    top: "80px",
  },
  collectionLabel: {
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--accent)",
    marginBottom: "0.75rem",
  },
  productName: {
    fontSize: "1.75rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    lineHeight: 1.1,
    marginBottom: "6px",
  },
  productNameUrdu: {
    fontSize: "1.3rem",
    color: "var(--accent)",
    opacity: 0.8,
    marginBottom: "1.5rem",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "var(--white)",
  },
  description: {
    fontSize: "0.85rem",
    color: "var(--gray)",
    lineHeight: 1.8,
    borderTop: "1px solid var(--border)",
    paddingTop: "1.5rem",
  },
  sizeSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  sizeLabel: {
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "var(--gray)",
  },
  selectedSize: {
    color: "var(--white)",
  },
  sizeGrid: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  sizeBtn: {
    width: "48px",
    height: "48px",
    border: "1px solid var(--border)",
    background: "transparent",
    color: "var(--white)",
    fontSize: "0.7rem",
    letterSpacing: "0.08em",
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
  },
  sizeBtnActive: {
    border: "1px solid var(--accent)",
    background: "var(--accent)",
    color: "var(--black)",
    fontWeight: 700,
  },
  sizeError: {
    fontSize: "0.7rem",
    color: "#e05c5c",
    letterSpacing: "0.08em",
  },
  btnBuy: {
    width: "100%",
    padding: "1rem",
    background: "var(--accent)",
    color: "var(--black)",
    border: "none",
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  btnSoldOut: {
    width: "100%",
    padding: "1rem",
    background: "var(--gray-light)",
    color: "var(--gray)",
    border: "1px solid var(--border)",
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    cursor: "not-allowed",
  },
  setupNotice: {
    padding: "1rem",
    border: "1px solid rgba(200,169,110,0.3)",
    background: "rgba(200,169,110,0.05)",
  },
  setupText: {
    fontSize: "0.8rem",
    color: "var(--accent)",
    lineHeight: 1.6,
  },
  stripeNote: {
    fontSize: "0.65rem",
    color: "var(--gray)",
    letterSpacing: "0.08em",
    textAlign: "center",
  },
};
