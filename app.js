const $=id=>document.getElementById(id);
const canvas=$("memeCanvas"),ctx=canvas.getContext("2d");
let uploadedImage=null;
const sets={
relatable:[
["ME: I’LL SLEEP EARLY TONIGHT","ALSO ME AT 2:47 AM: ONE LAST SCROLL"],
["WHEN YOU FINALLY GET COMFORTABLE","AND REMEMBER YOU FORGOT ONE THING"],
["MY BANK BALANCE AFTER PAYDAY","MY BANK BALANCE THREE DAYS LATER"],
["I’M NOT IGNORING YOU","I’M REHEARSING A REPLY IN MY HEAD"],
["PLANS AT 7 PM","ME AT 6:58 PM: CANCEL?"]
],
savage:[
["I’M NOT SAYING I’M RIGHT","I’M JUST SAYING THE RECEIPTS ARE LOUD"],
["THE CONFIDENCE IS IMPRESSIVE","THE FACTS WOULD LIKE A WORD"],
["SOME PEOPLE BRING PEACE","OTHERS BRING A GROUP CHAT TOPIC"],
["MY STANDARDS AREN’T HIGH","YOUR AUDITION IS JUST NOT GOING WELL"],
["I LOVE EVERYONE EQUALLY","FROM A VERY REASONABLE DISTANCE"]
],
desi:[
["GUESTS: BAS 5 MINUTE KE LIYE AAYE HAIN","MUMMY: KHANA LAGAO, CHAI BANAO"],
["INDIAN PARENTS: KOI PRESSURE NAHI","ALSO INDIAN PARENTS: SHARMA JI KA BETA"],
["SALARY AATE HI","EMI, RENT AUR UDHARI: NAMASTE"],
["WHEN THE RELATIVE ASKS ‘SHAADI KAB?’","ME: WIFI KA PASSWORD BATAO PEHLE"],
["PLAN: DIET START MONDAY","SUNDAY NIGHT: LAST TIME MOMOS"]
],
dark:[
["MY SLEEP SCHEDULE ISN’T BROKEN","IT’S RUNNING AN EXPERIMENT"],
["I HAVE MY LIFE TOGETHER","IN A FOLDER CALLED ‘FINAL_FINAL_2’"],
["THE UNIVERSE HAS A PLAN FOR ME","CAN IT PLEASE SEND THE CALENDAR INVITE"],
["I’M HEALING AND GROWING","MOSTLY GROWING MY TO-DO LIST"],
["I’VE HIT ROCK BOTTOM","AT LEAST THE RENT IS CHEAPER"]
],
wholesome:[
["SOME DAYS YOU WIN","SOME DAYS YOU JUST SHOWED UP — THAT COUNTS"],
["REMINDER: YOU’RE DOING BETTER","THAN YOUR INNER CRITIC SAYS"],
["TINY PROGRESS IS STILL PROGRESS","KEEP GOING, YOU’VE GOT THIS"],
["WHEN A FRIEND REMEMBERS THE SMALL THING","THAT YOU THOUGHT NO ONE NOTICED"],
["YOU DON’T HAVE TO BE PERFECT","TO BE SOMEONE’S FAVOURITE PERSON"]
],
work:[
["ME: I WORK BEST UNDER PRESSURE","MY MANAGER: GREAT, HERE ARE 14 TASKS"],
["QUICK CALL?","45 MINUTES, 3 ACTION ITEMS, NO DECISIONS"],
["WHEN THE EMAIL SAYS ‘GENTLE REMINDER’","BUT THE DEADLINE WAS YESTERDAY"],
["WORK-LIFE BALANCE","WORK HAS ENTERED THE CHAT"],
["MY CALENDAR LOOKS PRODUCTIVE","MY BRAIN HAS LEFT THE MEETING"]
]};
const topicExamples={
relatable:["adulting","weekend plans","overthinking","online shopping","Monday mood"],
savage:["fake friends","mixed signals","ego","unnecessary drama","bad decisions"],
desi:["shaadi season","mummy's calls","salary day","Indian relatives","chai breaks"],
dark:["sleep schedule","existential dread","procrastination","life admin","Monday"],
wholesome:["friendship","small wins","self care","being kind","new beginnings"],
work:["meetings","deadlines","boss messages","office life","work from home"]};
const hashtagSets={
relatable:"#relatable #memes #dailyhumour #reelsindia",
savage:"#savagehumour #memesdaily #desihumour #relatable",
desi:"#desimemes #indianmemes #desihumour #reelsindia",
dark:"#darkhumour #memes #relatablememes #internetculture",
wholesome:"#wholesome #goodvibes #relatable #memes",
work:"#officememes #corporatehumour #worklife #memes"};
function dimensions(){
 const f=$("format").value;
 if(f==="square")return [1080,1080,"1080 × 1080"];
 if(f==="story")return [1080,1920,"1080 × 1920"];
 return [1080,1350,"1080 × 1350"];
}
function drawCover(img,w,h){
 const scale=Math.max(w/img.width,h/img.height),sw=w/scale,sh=h/scale,sx=(img.width-sw)/2,sy=(img.height-sh)/2;
 ctx.drawImage(img,sx,sy,sw,sh,0,0,w,h);
}
function drawBackground(w,h){
 const grad=ctx.createLinearGradient(0,0,w,h);grad.addColorStop(0,"#c7ff44");grad.addColorStop(.55,"#b9a7ff");grad.addColorStop(1,"#ffb8d2");
 ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
 ctx.fillStyle="#171717";ctx.globalAlpha=.09;
 for(let i=0;i<22;i++){ctx.beginPath();ctx.arc((i*197)%w,(i*293)%h,35+(i%4)*15,0,Math.PI*2);ctx.fill()}
 ctx.globalAlpha=1;
}
function wrapLines(text,maxWidth,font){
 ctx.font=font;const words=text.trim().split(/\s+/);let lines=[],line="";
 for(const word of words){const test=line?line+" "+word:word;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=word}else line=test}
 if(line)lines.push(line);return lines;
}
function drawTextBlock(text,y,w,h,baseSize){
 if(!text.trim())return;
 const color=$("textColor").value,outline=$("stroke").checked;
 const maxWidth=w*.88;let size=baseSize,lines,font;
 do{font=`900 ${size}px Impact, "Arial Black", system-ui, sans-serif`;lines=wrapLines(text.toUpperCase(),maxWidth,font);if(lines.length<=4)break;size-=2}while(size>20);
 ctx.font=font;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillStyle=color;ctx.strokeStyle="#111";ctx.lineJoin="round";ctx.lineWidth=outline?Math.max(5,size*.12):0;
 const lineH=size*1.08,total=lines.length*lineH;let yy=y-total/2+lineH/2;
 for(const line of lines){if(outline)ctx.strokeText(line,w/2,yy,maxWidth);ctx.fillText(line,w/2,yy,maxWidth);yy+=lineH}
}
function render(){
 const [w,h,badge]=dimensions();if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}
 if(uploadedImage)drawCover(uploadedImage,w,h);else drawBackground(w,h);
 // Subtle contrast gradient behind text for readability.
 const grad=ctx.createLinearGradient(0,0,0,h);grad.addColorStop(0,"rgba(0,0,0,.48)");grad.addColorStop(.3,"rgba(0,0,0,0)");grad.addColorStop(.7,"rgba(0,0,0,0)");grad.addColorStop(1,"rgba(0,0,0,.55)");
 ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
 const size=Number($("fontSize").value),top=$("topText").value,bottom=$("bottomText").value;
 drawTextBlock(top,h*.16,w,h,size);drawTextBlock(bottom,h*.84,w,h,size);
 ctx.textAlign="left";ctx.font="800 23px system-ui";ctx.fillStyle="#ffffff";ctx.globalAlpha=.82;ctx.fillText("MEME MOB",w*.055,h*.955);ctx.globalAlpha=1;
 $("dimensionBadge").textContent=badge;
}
function choosePair(){
 const vibe=$("vibe").value,topic=$("topic").value.trim(),arr=sets[vibe],pair=arr[Math.floor(Math.random()*arr.length)];
 const subject=topic?topic.toUpperCase():topicExamples[vibe][Math.floor(Math.random()*topicExamples[vibe].length)].toUpperCase();
 const variations=[
 [pair[0].replace(/ME\b/g,subject),pair[1]],
 [pair[0],pair[1].replace(/ME\b/g,subject)],
 [topic?`WHEN SOMEONE SAYS ${subject}`:pair[0],pair[1]],
 [pair[0],topic?`SOMEHOW IT’S ALWAYS ${subject}`:pair[1]]
 ];
 return variations[Math.floor(Math.random()*variations.length)];
}
function generate(){
 const ideas=[];for(let i=0;i<4;i++)ideas.push(choosePair());
 const unique=ideas.filter((p,i)=>ideas.findIndex(x=>x[0]===p[0]&&x[1]===p[1])===i);
 $("ideas").innerHTML=unique.map((p,i)=>`<div class="idea"><span><b>${escapeHtml(p[0])}</b><br>${escapeHtml(p[1])}</span><button data-idea="${i}">Use this</button></div>`).join("");
 [...$("ideas").querySelectorAll("button")].forEach((b,i)=>b.addEventListener("click",()=>{const p=unique[i];$("topText").value=p[0];$("bottomText").value=p[1];render();setCaption(p)}));
 if(unique.length){$("topText").value=unique[0][0];$("bottomText").value=unique[0][1];render();setCaption(unique[0])}
}
function setCaption(pair){
 const topic=$("topic").value.trim();const vibe=$("vibe").value;
 $("captionText").textContent=topic?`Tell me this isn’t you when it comes to ${topic}. 😂`:`Which one of your friends is this? Tag them. 👀`;
 $("hashtags").textContent=hashtagSets[vibe];
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
$("generateBtn").addEventListener("click",generate);
$("randomBtn").addEventListener("click",()=>{const vibes=Object.keys(sets);$("vibe").value=vibes[Math.floor(Math.random()*vibes.length)];$("topic").value=topicExamples[$("vibe").value][Math.floor(Math.random()*topicExamples[$("vibe").value].length)];generate()});
["topText","bottomText","fontSize","textColor","stroke","format"].forEach(id=>$(id).addEventListener("input",render));
$("vibe").addEventListener("change",()=>{setCaption(["",""]);generate()});
$("topic").addEventListener("input",()=>setCaption(["",""]));
$("imageUpload").addEventListener("change",e=>{
 const file=e.target.files&&e.target.files[0];if(!file)return;
 if(!file.type.startsWith("image/")){alert("Please select an image file.");return}
 const url=URL.createObjectURL(file),img=new Image();
 img.onload=()=>{uploadedImage=img;render();URL.revokeObjectURL(url)};
 img.onerror=()=>{alert("Could not load this image.")};img.src=url;
});
$("downloadBtn").addEventListener("click",()=>{
 render();canvas.toBlob(blob=>{if(!blob){$("notice").textContent="Export failed. Try a different image.";return}
 const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`meme-mob-${$("format").value}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);
 $("notice").textContent="PNG exported. Review it before posting.";}, "image/png");
});
$("copyCaptionBtn").addEventListener("click",async()=>{
 const text=$("captionText").textContent+"\n\n"+$("hashtags").textContent;
 try{await navigator.clipboard.writeText(text);$("notice").textContent="Caption and hashtags copied."}
 catch{$("notice").textContent="Clipboard permission unavailable. Copy the caption and hashtags manually."}
});
drawBackground(canvas.width,canvas.height);generate();
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});
