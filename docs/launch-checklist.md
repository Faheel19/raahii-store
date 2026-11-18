# Launch checklist

## Implemented

- Recovered existing Next.js code and exported catalog/content.
- Preserved original handles and added aliases for older repository product URLs.
- Added exact variant selection, persistent bag and server-authoritative Stripe checkout.
- Mirrored product and homepage images; removed production GitHub Pages deployment.

## Required before accepting orders

- Export the Shopify theme ZIP, blog content, redirects, app configuration, discounts, shipping/tax settings, business records, orders and customers privately. This catalog export is not a complete business backup.
- Compare original Shopify desktop/mobile layouts with this storefront. Existing repository styling was retained; visual parity has not been established.
- Review recovered navigation and remaining custom features. Contact currently uses email rather than the original form.
- Review policies: shipping-policy body is empty, terms still describe Shopify hosting, and some product descriptions use a different contact email. These require business decisions.
- Verify Printful sync variant IDs, artwork, stock, shipping destinations and costs. Legacy product IDs are reference only.
- Decide whether manual fulfillment is acceptable. If automation is required, add signed webhooks, durable deduplication, retries and Printful integration before launch.
- Configure Cloudflare Pages and confirm its server function, not just static hosting.
- Configure Stripe test keys, approved shipping rate, destinations, tax settings and receipt emails.
- Test a Stripe purchase, cancellation, failure and refund; verify exact color/size/SKU, quantity, tax, price and address.
- Process an end-to-end Printful test order with the correct artwork and verify tracking/support procedures.
- Use matching Stripe test/live configuration. Deploy server catalog changes together with storefront changes.
- Verify SEO, sitemap, links, mobile interactions, accessibility and image loading.
- Review framework support/security before production deployment.

## Domain and retirement

- Identify the raahii.us registrar and DNS access; save current entries and a rollback procedure.
- Configure the selected host using its returned DNS values. Preserve MX/TXT/email records; do not reuse the old GitHub Pages IP instructions.
- Verify apex/www, HTTPS, redirects, checkout origin and email after cutover.
- Review outstanding Shopify orders, refunds, gift cards, app subscriptions and record retention.
- Cancel Shopify only after the replacement is proven operational. No cancellation has been performed.

## Manual fulfillment

1. Verify the Checkout Session/payment is **paid** in Stripe, not pending or merely returned to the success page.
2. Inspect exact line item, variant, quantity, SKU and shipping address. Resolve a verified Printful sync variant/artwork; do not infer it by removing a SKU prefix.
3. Check for an existing Printful order using the Stripe Session ID before creating another. Keep that ID as the order reference to prevent duplicates.
4. Review artwork, delivery cost and margin before confirming. Send tracking and retain refund/support records.
