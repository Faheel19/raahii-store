import catalog from "./shopify-catalog.json";
import legacy from "./legacy-products.json";
import aliases from "./product-aliases.json";
import imageMap from "./image-map.json";

export const collections = catalog.collections.nodes.map(c => ({
  id: c.handle, slug: c.handle, name: c.title, nameUrdu: "",
  descriptionHtml: c.descriptionHtml, productIds: c.products.nodes.map(p => p.id),
}));
export const collectionAliases = {
  hoodies: "hoodies-ہوڈیز", sweatshirts: "sweatshirts-سویٹ-شرٹ",
  tshirts: "t-shirts-ٹی-شرٹس", limited: "dark-noir-ڈارک-نور", embroidery: "embroidery-کڑھائی"
};
export const products = catalog.products.nodes.filter(p => p.status === "ACTIVE" && p.onlineStoreUrl).map(p => {
  const previous = legacy.find(l => aliases[l.id] === p.handle);
  const memberships = collections.filter(c => c.productIds.includes(p.id));
  return {
    id: p.handle, shopifyId: p.id, name: p.title, nameUrdu: previous?.nameUrdu || "",
    collection: memberships.find(c => c.id !== "frontpage")?.id || "frontpage",
    price: Math.min(...p.variants.nodes.map(v => Number(v.price))),
    description: p.descriptionHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
    descriptionHtml: p.descriptionHtml, seo: p.seo,
    images: p.media.nodes.filter(m => m.image).map(m => imageMap[m.image.url] || m.image.url),
    options: p.options, variants: p.variants.nodes,
    sizes: p.options.find(o => o.name === "Size")?.values || [],
    isSoldOut: !p.variants.nodes.some(v => v.availableForSale),
    isLimitedDrop: memberships.some(c => c.id === collectionAliases.limited),
    // Recovered product-level Printful IDs are unverified; map every variant before fulfillment.
    printfulId: previous?.printfulId || null,
  };
});
export const productAliases = aliases;
export function getProductsByCollection(slug) {
  if (slug === "all") return products;
  const c = collections.find(c => c.slug === (collectionAliases[slug] || slug));
  return c ? products.filter(p => c.productIds.includes(p.shopifyId)) : [];
}
export function getProductById(id) { return products.find(p => p.id === (aliases[id] || id)); }
