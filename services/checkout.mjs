const json = (body,status=200) => new Response(JSON.stringify(body), {status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});

// Cloudflare Pages Function. Prices and permitted SKUs come only from this server's catalog.
// Paid orders are processed manually in Stripe and Printful; this endpoint never fulfills an order.
export async function createCheckout(request,env,catalog,fetcher=fetch) {
  if (request.method !== 'POST') return json({error:'Method not allowed'},405);
  if (!env.STRIPE_SECRET_KEY || !env.STORE_ORIGIN || !env.SHIPPING_RATE_ID || !env.SHIPPING_COUNTRIES || env.CHECKOUT_ENABLED !== 'true')
    return json({error:'Checkout is being prepared. Please contact info@raahii.us.'},503);
  if (request.headers.get('Origin') !== env.STORE_ORIGIN) return json({error:'Invalid origin'},403);
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json({error:'Expected JSON'},415);
  let body;
  try {
    const text = await request.text();
    if (text.length > 16384) return json({error:'Request is too large'},413);
    body=JSON.parse(text);
  } catch {return json({error:'Invalid request'},400);}
  if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 20) return json({error:'Invalid bag'},400);
  const items=new Map();
  for (const item of body.items) {
    if (!item || typeof item.variantId !== 'string' || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) return json({error:'Invalid item or quantity'},400);
    items.set(item.variantId,(items.get(item.variantId)||0)+item.quantity);
    if (items.get(item.variantId)>10) return json({error:'Maximum quantity is 10 per variant'},400);
  }
  const params=new URLSearchParams({mode:'payment',success_url:`${env.STORE_ORIGIN}/checkout/success/`,cancel_url:`${env.STORE_ORIGIN}/cart/`,'automatic_tax[enabled]':'true','shipping_options[0][shipping_rate]':env.SHIPPING_RATE_ID});
  env.SHIPPING_COUNTRIES.split(',').map(c => c.trim()).filter(Boolean).forEach((c,i) => params.set(`shipping_address_collection[allowed_countries][${i}]`,c));
  let i=0;
  for (const [id,quantity] of items) {
    const product=catalog.products.nodes.find(p => p.status === 'ACTIVE' && p.onlineStoreUrl && p.variants.nodes.some(v => v.id === id));
    const variant=product?.variants.nodes.find(v => v.id === id);
    if (!variant?.availableForSale) return json({error:'An item is no longer available'},400);
    const amount=Math.round(Number(variant.price)*100);
    if (!Number.isSafeInteger(amount) || amount <= 0) return json({error:'Invalid catalog price'},503);
    const prefix=`line_items[${i++}]`;
    params.set(`${prefix}[quantity]`,String(quantity));
    params.set(`${prefix}[price_data][currency]`,catalog.shop.currencyCode.toLowerCase());
    params.set(`${prefix}[price_data][unit_amount]`,String(amount));
    params.set(`${prefix}[price_data][product_data][name]`,`${product.title} — ${variant.title}`);
    params.set(`${prefix}[price_data][product_data][metadata][shopify_variant_id]`,id);
    params.set(`${prefix}[price_data][product_data][metadata][sku]`,variant.sku || '');
  }
  try {
    const response=await fetcher('https://api.stripe.com/v1/checkout/sessions',{method:'POST',headers:{Authorization:`Bearer ${env.STRIPE_SECRET_KEY}`,'Content-Type':'application/x-www-form-urlencoded'},body:params});
    const session=await response.json();
    if (!response.ok || !session.url) return json({error:'Unable to start checkout. Please try again.'},502);
    return json({url:session.url});
  } catch {return json({error:'Unable to reach checkout. Please try again.'},502);}
}
