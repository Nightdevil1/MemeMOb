(()=>{
 const $=id=>document.getElementById(id);
 const STORE={drafts:'mememob_v2_drafts',queue:'mememob_v2_queue'};
 const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'[]')}catch{return[]}};
 const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 async function trends(){
  $('trendStatus').textContent='Checking saved trend snapshot…';
  try{
   const r=await fetch('./data/trends.json?ts='+Date.now(),{cache:'no-store'});if(!r.ok)throw Error('No snapshot');
   const d=await r.json();const items=Array.isArray(d)?d:(d.trends||d.items||[]);
   if(!items.length){$('trendList').innerHTML='<div class="trend-card"><strong>No trend snapshot yet</strong><small>Run the “Refresh Meme Mob trend signals” workflow in GitHub Actions, or check back after the next scheduled update.</small></div>';$('trendStatus').textContent='No data in the current snapshot.';return}
   $('trendList').innerHTML=items.slice(0,18).map((x,i)=>{const title=typeof x==='string'?x:(x.title||x.query||x.name||'Trend signal');const traffic=x.traffic||x.search_volume||x.value||'';const url=x.url||('https://www.google.com/search?q='+encodeURIComponent(title));return `<div class="trend-card"><span class="trend-tag">SIGNAL ${i+1}</span><strong>${esc(title)}</strong><small>${esc(traffic?'Search signal: '+traffic:'India search-interest signal')}</small><small><a href="${esc(url)}" target="_blank" rel="noopener">Explore ↗</a></small></div>`}).join('');
   $('trendStatus').textContent='Snapshot loaded. Source and timestamp: '+esc(d.updated_at||d.updated||'not provided')+'. This is not an Instagram-wide trend ranking.';
  }catch{$('trendStatus').textContent='Could not load the trend snapshot. Open the app online after the GitHub trend workflow has run.';$('trendList').innerHTML=''}
 }
 function current(){return {id:Date.now(),topic:$('topic')?.value||'',vibe:$('vibe')?.value||'relatable',format:$('format')?.value||'portrait',top:$('topText')?.value||'',bottom:$('bottomText')?.value||'',caption:$('captionText')?.textContent||'',hashtags:$('hashtags')?.textContent||'',savedAt:new Date().toISOString()}}
 function renderDrafts(){const a=read(STORE.drafts);$('savedDrafts').innerHTML=a.length?a.slice().reverse().map(x=>`<div class="saved-item"><div><strong>${esc(x.topic||x.top||'Untitled meme')}</strong><small>${esc(x.vibe)} · ${new Date(x.savedAt).toLocaleString()}</small></div><div><button class="secondary" data-load="${x.id}">Load</button> <button class="secondary" data-delete="${x.id}">Delete</button></div></div>`).join(''):'<div class="hint">No drafts saved yet.</div>'}
 function renderQueue(){const a=read(STORE.queue);$('queueList').innerHTML=a.length?a.slice().sort((x,y)=>(x.date+x.time).localeCompare(y.date+y.time)).map(x=>`<div class="saved-item"><div><strong>${esc(x.topic||x.top||'Untitled meme')}</strong><small>${esc(x.date)} at ${esc(x.time)} IST · ${esc(x.vibe)}</small></div><button class="secondary" data-qdelete="${x.id}">Remove</button></div>`).join(''):'<div class="hint">Your local queue is empty.</div>'}
 $('refreshTrends').addEventListener('click',trends);
 $('saveDraft').addEventListener('click',()=>{const a=read(STORE.drafts);a.push(current());write(STORE.drafts,a);renderDrafts();$('trendStatus').textContent='Draft saved on this device.'});
 $('queueDraft').addEventListener('click',()=>{if(!$('planDate').value){$('planDate').focus();$('trendStatus').textContent='Choose a date before adding to the queue.';return}const a=read(STORE.queue);a.push({...current(),date:$('planDate').value,time:$('planTime').value||'19:00'});write(STORE.queue,a);renderQueue();$('trendStatus').textContent='Added to your local queue. This does not publish the post.'});
 $('exportQueue').addEventListener('click',()=>{const a=read(STORE.queue);const cols=['topic','vibe','format','top','bottom','caption','hashtags','date','time'];const quote=v=>'"'+String(v??'').replace(/"/g,'""')+'"';const csv=[cols.join(','),...a.map(x=>cols.map(k=>quote(x[k])).join(','))].join('\r\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='meme-mob-content-queue.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
 document.addEventListener('click',e=>{const load=e.target.closest('[data-load]');if(load){const x=read(STORE.drafts).find(d=>String(d.id)===load.dataset.load);if(!x)return;['topic','vibe','format','topText','bottomText'].forEach((id,i)=>{const k=['topic','vibe','format','top','bottom'][i];if($(id))$(id).value=x[k]||''});$('topic').dispatchEvent(new Event('input'));$('topText').dispatchEvent(new Event('input'));$('bottomText').dispatchEvent(new Event('input'));$('trendStatus').textContent='Draft loaded into the editor.'}const del=e.target.closest('[data-delete]');if(del){write(STORE.drafts,read(STORE.drafts).filter(x=>String(x.id)!==del.dataset.delete));renderDrafts()}const qdel=e.target.closest('[data-qdelete]');if(qdel){write(STORE.queue,read(STORE.queue).filter(x=>String(x.id)!==qdel.dataset.qdelete));renderQueue()}});
 if($('planDate'))$('planDate').value=new Date().toISOString().slice(0,10);
 trends();renderDrafts();renderQueue();
})();
