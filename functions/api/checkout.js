import catalog from '../../data/shopify-catalog.json';
import {createCheckout} from '../../services/checkout.mjs';
export async function onRequestPost({request,env}) {return createCheckout(request,env,catalog);}
