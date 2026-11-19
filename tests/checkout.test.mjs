import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createCheckout} from '../services/checkout.mjs';
const catalog=JSON.parse(fs.readFileSync(new URL('../data/shopify-catalog.json',import.meta.url)));
const env={CHECKOUT_ENABLED:'true',STRIPE_SECRET_KEY:'sk_test_fake',STORE_ORIGIN:'https://raahii.us',SHIPPING_RATE_ID:'shr_test',SHIPPING_COUNTRIES:'US'};
const active=catalog.products.nodes.find(p => p.status==='ACTIVE');
const id=active.variants.nodes[0].id;
const request=items => new Request('https://raahii.us/api/checkout',{method:'POST',headers:{Origin:env.STORE_ORIGIN,'Content-Type':'application/json'},body:JSON.stringify({items})});
test('uses authoritative variant price, exact SKU, quantity and shipping',async () => {
  let sent;
  const result=await createCheckout(request([{variantId:id,quantity:2,price:1}]),env,catalog,async (url,options) => {sent=options.body;return new Response(JSON.stringify({url:'https://checkout.stripe.com/c/pay/test'}));});
  assert.equal(result.status,200);
  assert.equal(sent.get('line_items[0][price_data][unit_amount]'),String(Math.round(Number(active.variants.nodes[0].price)*100)));
  assert.equal(sent.get('line_items[0][price_data][product_data][metadata][sku]'),active.variants.nodes[0].sku);
  assert.equal(sent.get('line_items[0][quantity]'),'2');
  assert.equal(sent.get('shipping_address_collection[allowed_countries][0]'),'US');
});
test('rejects archived products, forged variants, invalid quantities and duplicate overflow',async () => {
  const archived='gid://shopify/ProductVariant/archived-test';
  const fixture={...catalog,products:{...catalog.products,nodes:[...catalog.products.nodes,{...active,status:'ARCHIVED',variants:{nodes:[{...active.variants.nodes[0],id:archived}]}}]}};
  for (const items of [[{variantId:archived,quantity:1}],[{variantId:'fake',quantity:1}],[{variantId:id,quantity:0}],[{variantId:id,quantity:1.5}],[{variantId:id,quantity:6},{variantId:id,quantity:5}]]) {
    const result=await createCheckout(request(items),env,fixture,()=>{throw new Error('Must not call Stripe');});
    assert.equal(result.status,400);
  }
});
test('stays closed until configuration is explicitly enabled',async () => {
  assert.equal((await createCheckout(request([{variantId:id,quantity:1}]),{...env,CHECKOUT_ENABLED:'false'},catalog)).status,503);
});
test('rejects foreign origin and hides provider errors',async () => {
  const req=request([{variantId:id,quantity:1}]);req.headers.set('Origin','https://other.example');
  assert.equal((await createCheckout(req,env,catalog)).status,403);
  const response=await createCheckout(request([{variantId:id,quantity:1}]),env,catalog,async()=>new Response(JSON.stringify({error:'secret details'}),{status:400}));
  assert.equal(response.status,502);assert.ok(!(await response.text()).includes('secret details'));
});
test('export has no truncated catalog connections or duplicate handles/variants',() => {
  for (const key of ['products','collections','pages','menus']) assert.equal(catalog[key].pageInfo.hasNextPage,false,key);
  assert.equal(new Set(catalog.products.nodes.map(p=>p.handle)).size,catalog.products.nodes.length);
  assert.ok(catalog.products.nodes.every(p => p.status==='ACTIVE' && p.onlineStoreUrl));
  const ids=[];
  for (const p of catalog.products.nodes) {assert.equal(p.variants.pageInfo.hasNextPage,false);assert.equal(p.media.pageInfo.hasNextPage,false); ids.push(...p.variants.nodes.map(v=>v.id));}
  assert.equal(new Set(ids).size,ids.length);
  const productIds=new Set(catalog.products.nodes.map(p=>p.id));
  for (const c of catalog.collections.nodes) {
    assert.equal(c.products.pageInfo.hasNextPage,false);
    assert.ok(c.products.nodes.every(p=>productIds.has(p.id)));
  }
});
