import Head from "next/head";
import Layout from "../../components/Layout";
import ProductCard from "../../components/ProductCard";
import { collections, getProductsByCollection } from "../../data/products";

export async function getStaticPaths() {
  return {
    paths: collections.map((c) => ({ params: { slug: c.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const collection = collections.find((c) => c.slug === params.slug);
  const products = getProductsByCollection(params.slug);
  return { props: { collection, products } };
}

export default function CollectionPage({ collection, products }) {
  return (
    <Layout>
      <Head>
        <title>{collection.name} — RAAHII</title>
        <meta name="description" content={`Shop ${collection.name} from RAAHII`} />
      </Head>

      <div className="container" style={styles.page}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerText}>
            <p style={styles.eyebrow}>Collection</p>
            <h1 style={styles.title}>{collection.name}</h1>
            <span className="urdu" style={styles.titleUrdu}>{collection.nameUrdu}</span>
          </div>
          <p style={styles.count}>{products.length} items</p>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div style={styles.grid}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div style={styles.empty}>
            <p style={styles.emptyText}>Coming soon.</p>
            <span className="urdu" style={styles.emptyUrdu}>جلد آ رہا ہے</span>
          </div>
        )}
      </div>
    </Layout>
  );
}

const styles = {
  page: {
    paddingTop: "4rem",
    paddingBottom: "6rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottom: "1px solid var(--border)",
    paddingBottom: "2rem",
    marginBottom: "3rem",
  },
  headerText: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  eyebrow: {
    fontSize: "0.65rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "var(--accent)",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    lineHeight: 1,
  },
  titleUrdu: {
    fontSize: "1.5rem",
    color: "var(--accent)",
    opacity: 0.8,
  },
  count: {
    fontSize: "0.75rem",
    color: "var(--gray)",
    letterSpacing: "0.1em",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "2.5rem",
  },
  empty: {
    textAlign: "center",
    padding: "6rem 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  emptyText: {
    fontSize: "0.9rem",
    color: "var(--gray)",
    letterSpacing: "0.1em",
  },
  emptyUrdu: {
    fontSize: "1.5rem",
    color: "var(--accent)",
    opacity: 0.6,
  },
};
