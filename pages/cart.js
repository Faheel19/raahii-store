import Head from 'next/head';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import Layout from '../components/Layout';
import {products} from '../data/products';

export default function Cart() {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem('raahii-cart') || '[]')); }
    catch { setItems([]); }
    setReady(true);
  }, []);
  const rows = items.map(item => {
    const product = products.find(p => p.variants.some(v => v.id === item.variantId));
    const variant = product?.variants.find(v => v.id === item.variantId);
    return {...item, product, variant};
  });
  function update(variantId, quantity) {
    const next = items.map(item => item.variantId === variantId ? {...item, quantity} : item).filter(item => item.quantity > 0);
    localStorage.setItem('raahii-cart', JSON.stringify(next));
    setItems(next);
  }
  async function checkout() {
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/checkout', {method: 'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({items})});
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Checkout is unavailable. Please try again.');
      const url = new URL(result.url);
      if (url.protocol !== 'https:' || url.hostname !== 'checkout.stripe.com') throw new Error('Invalid checkout response.');
      window.location.assign(url.href);
    } catch (e) {setError(e.message); setBusy(false);}
  }
  return <Layout><Head><title>Your bag — RAAHII</title><meta name="robots" content="noindex" /></Head>
    <main className="container" style={{paddingTop:48, minHeight:'60vh'}}>
      <h1>Your bag</h1>
      {!ready ? <p>Loading your bag…</p> : !rows.length ? <p>Your bag is empty. <Link href="/collections/all/">Explore the collection →</Link></p> : <>
        {rows.map(row => <section key={row.variantId} style={{padding:'24px 0',borderBottom:'1px solid var(--border)'}}>
          {row.product ? <><Link href={`/products/${row.product.id}/`}>{row.product.name}</Link><p>{row.variant.title} · ${Number(row.variant.price).toFixed(2)}</p></> : <p>This item is no longer available. Remove it to continue.</p>}
          <label>Quantity <select aria-label={`Quantity for ${row.product?.name || 'unavailable item'} ${row.variant?.title || ''}`} value={row.quantity} onChange={e => update(row.variantId, Number(e.target.value))}>
            {Array.from({length:10}, (_,i) => <option key={i+1} value={i+1}>{i+1}</option>)}
          </select></label>{' '}<button onClick={() => update(row.variantId,0)}>Remove</button>
        </section>)}
        <p style={{margin:'24px 0'}}>Subtotal: ${rows.reduce((sum,r) => sum + Number(r.variant?.price || 0)*r.quantity,0).toFixed(2)}</p>
        <p>Shipping and applicable taxes are calculated at checkout.</p>
        <button disabled={busy || rows.some(r => !r.variant?.availableForSale)} onClick={checkout} style={{padding:16,marginTop:24}}>{busy ? 'Opening checkout…' : 'Checkout'}</button>
        {error && <p role="alert">{error}</p>}
      </>}
    </main>
  </Layout>;
}
