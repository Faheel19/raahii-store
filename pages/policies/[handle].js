import Head from 'next/head';
import Layout from '../../components/Layout';
import catalog from '../../data/shopify-catalog.json';
const slug = p => p.type.toLowerCase().replaceAll('_','-');
export function getStaticPaths() {return {paths:catalog.shop.shopPolicies.map(p => ({params:{handle:slug(p)}})),fallback:false};}
export function getStaticProps({params}) {return {props:{policy:catalog.shop.shopPolicies.find(p => slug(p) === params.handle)}};}
export default function Policy({policy}) {return <Layout><Head><title>{policy.title} — RAAHII</title></Head><main className="container product-description" style={{paddingTop:48}}><h1>{policy.title}</h1><div dangerouslySetInnerHTML={{__html:policy.body}} /></main></Layout>;}
