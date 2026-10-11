import json, urllib.request, xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
url='https://trends.google.com/trending/rss?geo=IN'
req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 MemeMobTrendSignals/2.0'})
with urllib.request.urlopen(req,timeout=25) as response: root=ET.fromstring(response.read())
items=[]
for item in root.findall('./channel/item')[:30]:
    title=item.findtext('title','').strip()
    link=item.findtext('link','').strip()
    traffic=item.findtext('{https://trends.google.com/trending/rss}approx_traffic','').strip()
    if title: items.append({'title':title,'url':link,'traffic':traffic})
out={'updated_at':datetime.now(timezone.utc).isoformat(),'source':'Google Trends India trending searches RSS','note':'Search-interest signals, not Instagram trend or audio rankings.','trends':items}
Path('data/trends.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Wrote {len(items)} trend signals')
