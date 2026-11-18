"""Mirror the exported Shopify images; fail rather than silently drop an asset."""
import concurrent.futures, hashlib, json, pathlib, re, urllib.request
root=pathlib.Path(__file__).resolve().parents[1]
catalog=json.loads((root/'data/shopify-catalog.json').read_text())
urls={m['image']['url'] for p in catalog['products']['nodes'] for m in p['media']['nodes'] if m.get('image')}
urls.update(c['image']['url'] for c in catalog['collections']['nodes'] if c.get('image'))
home=(root/'pages/index.js').read_text()
urls.update(re.findall(r'https://raahii\.us/cdn/shop/files/[^"\s]+',home))
directory=root/'public/images'; directory.mkdir(parents=True,exist_ok=True)
def download(url):
    suffix=pathlib.Path(url.split('?')[0]).suffix or '.jpg'
    name=hashlib.sha256(url.encode()).hexdigest()[:20]+suffix
    target=directory/name
    if not target.exists():
        req=urllib.request.Request(url,headers={'User-Agent':'RAAHII Migration'})
        with urllib.request.urlopen(req,timeout=30) as response:
            if not response.headers.get('Content-Type','').startswith('image/'): raise RuntimeError('Not an image: '+url)
            target.write_bytes(response.read())
    return url,'/images/'+name
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
    mapping=dict(executor.map(download,sorted(urls)))
(root/'data/image-map.json').write_text(json.dumps(mapping,indent=2))
for url,path in mapping.items(): home=home.replace(url,path)
(root/'pages/index.js').write_text(home)
print(f'Mirrored {len(mapping)} images')
