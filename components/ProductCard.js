import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} style={styles.card}>
      <div style={styles.imageWrap}>
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            style={styles.image}
          />
        ) : (
          <div style={styles.placeholder}>
            <span className="urdu" style={styles.placeholderText}>{product.nameUrdu}</span>
          </div>
        )}

        {product.isLimitedDrop && !product.isSoldOut && (
          <span style={styles.badge}>Limited Drop</span>
        )}
        {product.isSoldOut && (
          <span style={{ ...styles.badge, background: "var(--gray)" }}>Sold Out</span>
        )}
      </div>

      <div style={styles.info}>
        <div>
          <p style={styles.name}>{product.name}</p>
          <p className="urdu" style={styles.nameUrdu}>{product.nameUrdu}</p>
        </div>
        <p style={styles.price}>${product.price}</p>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    display: "block",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  imageWrap: {
    position: "relative",
    aspectRatio: "3/4",
    background: "var(--gray-light)",
    overflow: "hidden",
    marginBottom: "1rem",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--gray-light)",
  },
  placeholderText: {
    fontSize: "1.5rem",
    color: "var(--accent)",
    opacity: 0.5,
  },
  badge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "var(--accent)",
    color: "var(--black)",
    fontSize: "0.6rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 700,
    padding: "4px 10px",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "1rem",
  },
  name: {
    fontSize: "0.8rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--white)",
    marginBottom: "2px",
  },
  nameUrdu: {
    fontSize: "0.85rem",
    color: "var(--accent)",
    opacity: 0.8,
  },
  price: {
    fontSize: "0.85rem",
    color: "var(--white)",
    whiteSpace: "nowrap",
  },
};
