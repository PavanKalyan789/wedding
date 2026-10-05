const E=C.event,V=C.venue,$=s=>document.querySelector(s);
const cal="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(`${C.couple.first} & ${C.couple.second} – ${E.titleEn}`)+"&dates="+[E.startISO,E.endISO].map(x=>new Date(x).toISOString().replace(/[-:]|\.\d{3}/g,"")).join("/")+"&location="+encodeURIComponent([V.name,V.address].filter(Boolean).join(", "));
const S=[
`<div class="r te gd" style="font-size:2.6cqw">${E.greetingTe}</div><div class="r sm">join us for the<br>${E.titleEn.toLowerCase()} of</div><div class="r nm wipe">${C.couple.first}</div><div class="r and">AND</div><div class="r nm wipe">${C.couple.second}</div><div class="r dt">${E.dateShort}</div><div class="r sm">${E.time}</div>`,
`<div class="r te h gd">ఆహ్వానం</div><div class="r rule"></div><div class="r te bd">${C.invitation.te}</div><div class="r rule"></div><div class="r bd" style="font-size:2cqw">${C.invitation.en}</div>`,
`<div class="r te h gd">${E.titleTe}</div><div class="r sm">${E.titleEn.toUpperCase()}</div><div class="r rule"></div><div class="r dt" style="font-size:2.5cqw;margin:0">${E.dateText.toUpperCase()}</div><div class="r sm">${E.time}</div><div class="r rule"></div><div class="r" style="font-size:3cqw">${V.name}</div>${V.address?`<div class="r bd">${V.address}</div>`:""}<a class="r pill f" href="${V.mapsUrl}" target="_blank" rel="noopener">📍 Get Directions</a>`,
`<div class="r te h gd">కార్యక్రమ వివరాలు</div><div class="r sm">PROGRAMME</div><div class="r rule"></div><div class="r tl">${C.programme.map(p=>`<div><b>${p[0]}</b>${p[1]}<br><span class="te" style="font-size:2cqw">${p[2]}</span></div>`).join("")}</div>`,
`<div class="r sm">THE CELEBRATION BEGINS IN</div><div class="r cd" id="cd"></div><div class="r rule"></div><button class="r pill f" id="rs">మీ రాకను తెలియజేయండి · RSVP</button><a class="r pill" href="${cal}" target="_blank" rel="noopener">📅 Add to Calendar</a><button class="r pill" id="sh">Share Invitation</button>`
];
$("#scenes").innerHTML=S.map(h=>`<div class="sc">${h}</div>`).join("");
const sc=[...document.querySelectorAll(".sc")];sc.forEach(s=>s.querySelectorAll(".r").forEach((e,i)=>e.style.setProperty("--i",i)));
$("#dots").innerHTML=S.map((_,i)=>`<button class="dot" data-i="${i}" aria-label="Page ${i+1}"></button>`).join("");
const dots=[...document.querySelectorAll(".dot")];let cur=-1,timer;
function go(i,manual){if(manual)clearTimeout(timer);i=Math.max(0,Math.min(S.length-1,i));if(i===cur)return;cur=i;sc.forEach((s,k)=>s.classList.toggle("on",k===i));dots.forEach((d,k)=>d.classList.toggle("on",k===i));
 if(!manual&&!matchMedia("(prefers-reduced-motion:reduce)").matches&&i<S.length-1)timer=setTimeout(()=>go(i+1),C.autoplaySeconds*1000+(i===0?1500:0))}
go(0);
$("#dots").onclick=e=>{const d=e.target.closest(".dot");if(d)go(+d.dataset.i,1)};$("#pv").onclick=()=>go(cur-1,1);$("#nx").onclick=()=>go(cur+1,1);
let sx=0;$("#panel").ontouchstart=e=>sx=e.touches[0].clientX;$("#panel").ontouchend=e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>45)go(cur+(d<0?1:-1),1)};
/* countdown */
const st=new Date(E.startISO);function tick(){const d=st-Date.now(),c=$("#cd");if(d<=0){c.textContent="The Celebration Has Begun ❤️";return}c.innerHTML=[[Math.floor(d/864e5),"DAYS"],[Math.floor(d/36e5)%24,"HRS"],[Math.floor(d/6e4)%60,"MIN"],[Math.floor(d/1e3)%60,"SEC"]].map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}tick();setInterval(tick,1000);
/* share */
$("#sh").onclick=async()=>{const text=`💐 You are warmly invited to the ${E.titleEn} of ${C.couple.first} & ${C.couple.second} ❤️\n\n📅 ${E.dateText}\n🕰️ ${E.time}\n📍 ${V.name}\n\n${location.href}`;try{if(navigator.share){await navigator.share({title:document.title,text});return}}catch(_){}window.open("https://wa.me/?text="+encodeURIComponent(text),"_blank")};
/* rsvp */
$("#rs").onclick=()=>C.rsvp.link?window.open(C.rsvp.link,"_blank"):$("#md").classList.add("on");$("#mc").onclick=()=>$("#md").classList.remove("on");
let att="yes";document.querySelectorAll("#md .o .pill").forEach(b=>b.onclick=()=>{att=b.dataset.v;document.querySelectorAll("#md .o .pill").forEach(x=>x.classList.toggle("f",x===b))});
$("#f").onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));d.attending=att;await submitRSVP(d);$("#f").hidden=true;$("#th").hidden=false};
/* falling leaves/petals + gold sparkles (stay behind the white panel) */
const fx=$("#fx");for(let i=0;i<14;i++){const p=document.createElement("i");const s=8+Math.random()*10;p.className="pt "+(i%3?"l":"c");p.style.cssText=`left:${i%2?-2+Math.random()*20:80+Math.random()*20}%;width:${s}px;height:${s*1.3}px;animation-duration:${11+Math.random()*10}s;animation-delay:${-Math.random()*20}s`;fx.appendChild(p)}
for(let i=0;i<9;i++){const p=document.createElement("i");p.className="sp";p.style.cssText=`left:${i%2?4+Math.random()*12:84+Math.random()*12}%;top:${4+Math.random()*92}%;animation-delay:${-Math.random()*3}s;animation-duration:${2.5+Math.random()*2.5}s`;fx.appendChild(p)}
/* music: starts on the first tap anywhere (browsers block silent autoplay); button toggles */
if(C.music){const a=$("#aud");a.src=C.music;a.volume=.6;const b=document.createElement("button");b.id="mus";const up=()=>b.textContent=a.paused?"🔊 Music":"⏸ Music";up();let us=0;
 b.onclick=e=>{e.stopPropagation();us=1;a.paused?a.play():a.pause()};a.onplay=a.onpause=up;document.body.appendChild(b);
 addEventListener("pointerdown",e=>{if(!us&&!e.target.closest("#mus"))a.play().catch(()=>{})},{once:true})}
