import Head from 'next/head';
import Layout from '../../components/Layout';
import catalog from '../../data/shopify-catalog.json';
export function getStaticPaths() {return {paths:catalog.pages.nodes.filter(p => p.isPublished).map(p => ({params:{handle:p.handle}})),fallback:false};}
export function getStaticProps({params}) {return {props:{page:catalog.pages.nodes.find(p => p.handle === params.handle)}};}
export default function ContentPage({page}) {return <Layout><Head><title>{page.title} — RAAHII</title></Head><main className="container product-description" style={{paddingTop:48}}><h1>{page.title}</h1><div dangerouslySetInnerHTML={{__html:page.body}} />{page.handle === 'contact-us' && <p><a href="mailto:info@raahii.us">info@raahii.us</a></p>}</main></Layout>;}
