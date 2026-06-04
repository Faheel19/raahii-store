# RAAHII Store — Self-Hosted on GitHub Pages

South Asian streetwear storefront. No Shopify. No monthly fees.

**Stack:** Next.js (static export) → GitHub Pages → Stripe Checkout

---

## Setup

### 1. Install dependencies

```bash
npm install
npm run dev     # localhost:3000
```

### 2. Add your products

Edit `data/products.js`:
- Add your product names, descriptions, prices, image paths
- Set `stripeLink` for each product (see step 3)

### 3. Set up Stripe

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Create a free account (no monthly fee — just 2.9% + 30¢ per sale)
3. For each product: **Products → Payment Links → Create**
4. Copy the link (e.g. `https://buy.stripe.com/abc123`) into `data/products.js`

**Tip:** In Stripe Payment Links, add a "Custom field" called "Size" so customers can select their size during checkout.

### 4. Add product images

Put your product images in `public/images/`.  
Reference them in `data/products.js` as `/images/your-image.jpg`.

Export from Shopify:
- Admin → Products → Export
- Images are linked in the CSV — download them and add to `public/images/`

### 5. Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/raahii-store.git
git push -u origin main
```

### 6. Enable GitHub Pages

1. GitHub repo → Settings → Pages
2. Source: **GitHub Actions**
3. The workflow in `.github/workflows/deploy.yml` runs automatically on every push

### 7. Connect your domain (raahii.us)

In your domain registrar (where you bought raahii.us), set these DNS records:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     YOUR_USERNAME.github.io
```

Then in GitHub: Settings → Pages → Custom domain → enter `raahii.us`

### 8. Cancel Shopify ✓

---

## Fulfillment (Printful)

Since you're on print-on-demand:

**Option A — Manual:** When a Stripe payment comes in, log into Printful and manually place the order. Works fine at low volume.

**Option B — Webhook automation:** Set up a Stripe webhook that triggers a Printful order. Needs a small serverless function (Vercel/Netlify free tier). Ask Claude to help set this up when you're ready.

---

## Folder Structure

```
raahii-store/
├── data/
│   └── products.js          ← Add your products here
├── pages/
│   ├── index.js             ← Homepage
│   ├── collections/[slug].js ← Collection pages
│   └── products/[id].js     ← Product pages
├── components/
│   ├── Nav.js
│   ├── Footer.js
│   ├── Layout.js
│   └── ProductCard.js
├── styles/
│   └── globals.css
├── public/
│   └── images/              ← Put product photos here
└── .github/workflows/
    └── deploy.yml           ← Auto-deploy on push
```

---

## Monthly Cost

| Service | Cost |
|---------|------|
| GitHub Pages hosting | $0 |
| Stripe (platform fee) | $0 |
| Stripe per transaction | 2.9% + 30¢ |
| Domain (raahii.us) | Whatever you already pay |
| **Shopify** | **$0 (cancelled)** |
