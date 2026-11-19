# RAAHII storefront migration

Next.js static storefront with source on GitHub and a Cloudflare Pages Function for Stripe-hosted checkout. Work in progress: Shopify remains the live store until the launch checklist is complete.

## Recovered on November 8, 2026

12 active storefront products, 164 variants, 6 collections, 2 content pages, storefront navigation menus and shop policies. Original handles, prices, descriptions, size guides and memberships are exported in `data/shopify-catalog.json`. Product and homepage images are mirrored in `public/images/`.

Only active published products appear in browsing and checkout. Archived catalog data remains in the source backup. No customers, orders or credentials are included. Recovered Printful product IDs are unverified; Shopify SKUs are not automatically Printful sync variant IDs.

## Development

```sh
npm ci
npm test
npm run dev
npm run build
```

Build output: `out/`. `next dev` serves the storefront only; use Cloudflare Pages local development to test the function. A static server alone cannot process checkout.

## Hosting and payments

GitHub Pages prohibits ecommerce hosting. Keep source on GitHub and deploy to a suitable host, provisionally Cloudflare Pages. The former GitHub Pages workflow now validates changes only.

In Cloudflare Pages connect the reviewed repository branch, select Framework preset **None**, Node 22, build command `npm run build`, output `out`. The root `functions/` directory implements `/api/checkout`. Do not use a Next.js server adapter.

Configure server-only environment values:

| Setting | Purpose |
| --- | --- |
| `CHECKOUT_ENABLED` | Keep false until payment, shipping and fulfillment verification |
| `STORE_ORIGIN` | Exact HTTPS origin, initially the test deployment URL |
| `STRIPE_SECRET_KEY` | Stripe test key first, stored as a host secret |
| `SHIPPING_RATE_ID` | Approved Stripe shipping rate in the same mode/currency |
| `SHIPPING_COUNTRIES` | Explicit comma-separated destination country codes |

Checkout uses authoritative server catalog prices and exact variant/SKU data. It collects shipping details and enables Stripe automatic tax; configure Stripe Tax first. Shipping is one approved flat Stripe rate, not a live Printful quote. Verify it for all supported baskets/destinations before launch.

The success page never marks an order paid. Fulfillment is manual: verify payment in Stripe and place the matching Printful order. No webhook order database or fulfillment automation is included yet.

## Before launch

See [docs/launch-checklist.md](docs/launch-checklist.md). Visual parity, policy corrections, Printful mappings, real payment tests, hosting and domain cutover remain unverified. Do not cancel Shopify before these gates pass. Domain renewal, payment processing and production costs still apply; hosting depends on plan and usage.

References: [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), [Pages Functions pricing](https://developers.cloudflare.com/pages/functions/pricing/).
