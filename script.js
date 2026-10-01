const $=id=>document.getElementById(id), D=DAVET, t=new Date(D.tarih);
document.title=D.isim+" · Doğum Günü Daveti 🎂";
$("bg").style.setProperty("--pos",D.fotoKonumu);
$("isim").textContent=D.isim;
$("yas").textContent=D.yas?D.yas+" yaşına giriyorum":"";
$("mesaj").textContent=D.mesaj;
$("tarih").textContent=t.toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric",weekday:"long"});
$("saat").textContent="Saat "+t.toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"});
$("mekan").textContent=D.mekan;$("adres").textContent=D.adres;$("harita").href=D.harita;
$("imza").textContent="— "+D.davetEden;
const f=d=>d.toISOString().replace(/[-:]|\.\d{3}/g,""), son=new Date(t.getTime()+4*36e5);
$("takvim").href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(D.isim+" - Doğum Günü")+"&dates="+f(t)+"/"+f(son)+"&location="+encodeURIComponent(D.mekan+", "+D.adres);
$("yanit").href="https://wa.me/"+D.telefon+"?text="+encodeURIComponent("Merhaba! Doğum günü davetine geliyorum 🎉");
function say(){let k=Math.max(0,t-Date.now());const p=(id,v)=>$(id).textContent=v;
p("g",Math.floor(k/864e5));p("s",Math.floor(k/36e5)%24);p("d",Math.floor(k/6e4)%60);p("sn",Math.floor(k/1e3)%60)}
say();setInterval(say,1000);
// Balonlar: kartın içinden fırlar, sonra doğal biçimde süzülür
const bc=$("balonlar"),bx=bc.getContext("2d"),dpr=Math.min(devicePixelRatio||1,2);let B=[];
const bBoyut=()=>{bc.width=innerWidth*dpr;bc.height=innerHeight*dpr;bx.setTransform(dpr,0,0,dpr,0,0)};bBoyut();addEventListener("resize",bBoyut);
const bRenk=[[224,86,122],[232,168,124],[184,106,223],[255,190,70],[95,201,192],[240,120,90],[247,231,206]];
const mix=(c,k)=>`rgb(${c.map(v=>Math.round(v+(k>0?(255-v)*k:v*k))).join()})`;
function balonlar(n,gec=0){const r=$("kart").getBoundingClientRect();
for(let i=0;i<n&&B.length<40;i++){const w=22+Math.random()*24;
B.push({x:r.left+r.width*(.12+Math.random()*.76),y:r.top+r.height*(.35+Math.random()*.5),vx:(Math.random()-.5)*4,vy:-(10+Math.random()*7),
w,h:w*1.35,c:bRenk[(Math.random()*bRenk.length)|0],s:.25,ph:Math.random()*6.28,term:.9+Math.random()*1.1,t:-(gec+i*(5+Math.random()*9)),tilt:0})}}
function balonCiz(p){const{w,h,c}=p,sw=Math.sin(p.t*.05+p.ph)*9-p.vx*5;
bx.save();bx.translate(p.x,p.y);bx.rotate(p.tilt);bx.scale(p.s,p.s);
bx.strokeStyle="rgba(247,231,206,.6)";bx.lineWidth=1;bx.beginPath();bx.moveTo(0,h+6);bx.quadraticCurveTo(sw,h+40,-sw*.6,h+85);bx.stroke();
const g=bx.createRadialGradient(-w*.35,-h*.35,w*.1,0,0,w*1.4);g.addColorStop(0,mix(c,.55));g.addColorStop(.4,mix(c,0));g.addColorStop(1,mix(c,-.35));
bx.fillStyle=g;bx.globalAlpha=.96;bx.beginPath();bx.moveTo(0,h);bx.bezierCurveTo(-w*.4,h*.9,-w,h*.5,-w,0);bx.bezierCurveTo(-w,-h,w,-h,w,0);bx.bezierCurveTo(w,h*.5,w*.4,h*.9,0,h);bx.fill();
bx.fillStyle=mix(c,-.4);bx.beginPath();bx.moveTo(0,h-1);bx.lineTo(-5,h+7);bx.lineTo(5,h+7);bx.fill();
bx.fillStyle="rgba(255,255,255,.5)";bx.beginPath();bx.ellipse(-w*.42,-h*.38,w*.16,h*.27,-.45,0,6.3);bx.fill();bx.restore()}
(function bDongu(){bx.clearRect(0,0,innerWidth,innerHeight);
B=B.filter(p=>p.y>-p.h*3-100);
for(const p of B){p.t++;if(p.t<0)continue;
p.vy=p.vy*.96-p.term*.04;p.vx=(p.vx+Math.sin(p.t*.035+p.ph)*.06)*.985;p.x+=p.vx;p.y+=p.vy;p.s+=(1-p.s)*.07;
p.tilt=Math.max(-.35,Math.min(.35,p.vx*.07));balonCiz(p)}
requestAnimationFrame(bDongu)})();
const azalt=matchMedia("(prefers-reduced-motion:reduce)").matches;
// Konfeti
const cv=$("konfeti"),cx=cv.getContext("2d");let P=[];
const boyut=()=>{cv.width=innerWidth;cv.height=innerHeight};boyut();addEventListener("resize",boyut);
const renk=["#e0567a","#e8a87c","#f7e7ce","#ffd166","#b86adf","#5fc9c0"];
function patlat(n,x=innerWidth/2,y=innerHeight*.7){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=4+Math.random()*9;
P.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-6,r:Math.random()*6,w:5+Math.random()*6,c:renk[i%6],o:1})}}
function yagmur(n){for(let i=0;i<n;i++)P.push({x:Math.random()*innerWidth,y:-20,vx:Math.random()*2-1,vy:2+Math.random()*3,r:Math.random()*6,w:5+Math.random()*6,c:renk[i%6],o:1})}
(function ciz(){cx.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.y<innerHeight+20&&p.o>0);
for(const p of P){p.x+=p.vx;p.y+=p.vy;p.vy+=.18;p.vx*=.99;p.r+=.15;if(p.y>innerHeight*.9)p.o-=.03;
cx.save();cx.globalAlpha=Math.max(p.o,0);cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.w/2,-p.w/4,p.w,p.w/2);cx.restore()}
requestAnimationFrame(ciz)})();
if(!azalt){setTimeout(()=>{const r=$("kart").getBoundingClientRect();patlat(130,r.left+r.width/2,r.top+r.height*.5);balonlar(13)},700);setInterval(()=>{if(!document.hidden)balonlar(2+((Math.random()*2)|0))},6500);let n=0;const iv=setInterval(()=>{yagmur(8);if(++n>25)clearInterval(iv)},150)}
$("pasta").onclick=()=>{$("pasta").classList.add("sonuk");$("ipucu").textContent="Dileğin kabul oldu! 🎉 Seni bekliyorum.";
if(!azalt){const r=$("kart").getBoundingClientRect();patlat(170,r.left+r.width/2,r.top+r.height*.5);balonlar(12);yagmur(50)}};
