(()=>{const A=window.NARETH,g=A.g,P=A.P;
const EXPECT=49652,raw=window.__NA33||'',atlas=new Image(),tiles={},need=['grass','dirt','stone','soil','water'];let atlasReady=false,tileReady=0,state='loading',pats=null;
const R={inn:[0,0,230,160],smith:[235,0,190,158],market:[0,165,180,127],tree:[185,170,80,108],well:[270,165,80,80],barrel:[355,165,35,30],crate:[395,165,38,25],fence:[270,250,98,41],torven:[435,165,27,48],mira:[465,165,23,48],daren:[435,218,30,48],player:[470,218,24,48]};
A.customArtV=34;A.art34={expected:EXPECT,length:raw.length,state:()=>state};
const fail=s=>{state=s};
const maybeReady=()=>{if(atlasReady&&tileReady===need.length)state='ready'};
if(raw.length!==EXPECT){fail('atlas-length')}else{
 atlas.onload=()=>{atlasReady=true;maybeReady()};atlas.onerror=()=>fail('atlas-decode');atlas.src='data:image/png;base64,'+raw;
 need.forEach(k=>{let im=new Image();im.decoding='async';im.onload=()=>{tileReady++;maybeReady()};im.onerror=()=>fail('tile-'+k);im.src='./assets/tiles-v34/'+k+'.png?v=34';tiles[k]=im});
}
delete window.__NA33;
const crop=(k,x,y,w,h)=>{let r=R[k];if(!r||!atlasReady)return;g.drawImage(atlas,r[0],r[1],r[2],r[3],Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
const ensure=()=>{if(state!=='ready')return false;if(!pats){pats={};need.forEach(k=>pats[k]=g.createPattern(tiles[k],'repeat'))}return true};
const tile=(p,x,y,w,h)=>{g.save();g.fillStyle=p;g.fillRect(x,y,w,h);g.restore()};
const prop=(k,x,y,w,h)=>crop(k,x-w/2,y-h/2,w,h);
const sign=(t,x,y)=>{g.fillStyle='rgba(31,23,18,.92)';g.fillRect(x-67,y-14,134,28);g.strokeStyle='#9d774e';g.lineWidth=2;g.strokeRect(x-67,y-14,134,28);A.lab(t,x,y,10,'#f0d5a4')};
const road=()=>{g.save();g.strokeStyle=pats.dirt;g.lineWidth=118;g.lineCap='round';g.lineJoin='round';g.beginPath();g.moveTo(-45,530);g.lineTo(430,518);g.lineTo(870,578);g.lineTo(1185,520);g.stroke();g.strokeStyle='rgba(70,49,31,.30)';g.lineWidth=3;g.stroke();g.restore()};
const river=()=>{tile(pats.water,1175,0,245,A.W.h);for(let y=24;y<A.W.h;y+=54){g.strokeStyle='rgba(199,229,220,.18)';g.lineWidth=2;g.beginPath();g.moveTo(1190,y);g.quadraticCurveTo(1290,y+8,1408,y);g.stroke()}};
const bridge=()=>{g.fillStyle='#3f2c20';g.fillRect(1150,478,300,110);g.fillStyle='#765036';g.fillRect(1160,486,280,94);for(let x=1165;x<1440;x+=23){g.strokeStyle='#33231a';g.lineWidth=4;g.beginPath();g.moveTo(x,488);g.lineTo(x,578);g.stroke()}g.strokeStyle='#241b16';g.lineWidth=7;g.strokeRect(1158,484,284,98)};
const home=()=>{let x=94,y=316,w=205,h=135;g.fillStyle='rgba(23,18,14,.25)';g.fillRect(x+7,y+8,w,h);g.fillStyle='#775f46';g.fillRect(x,y+44,w,h-44);g.fillStyle='#5f3428';g.beginPath();g.moveTo(x-10,y+49);g.lineTo(x+w/2,y);g.lineTo(x+w+10,y+49);g.lineTo(x+w-6,y+72);g.lineTo(x+6,y+72);g.closePath();g.fill();g.strokeStyle='#30231c';g.lineWidth=5;g.stroke();g.fillStyle='#39271e';g.fillRect(x+w/2-20,y+h-50,40,50);g.fillStyle='#c99746';g.fillRect(x+28,y+78,26,24);g.fillRect(x+w-54,y+78,26,24);sign(A.home&&A.home.owned?'EVİN':'SATILIK EV',x+w/2,y+91)};
const npc=(n,near)=>{let key=n.n==='Torven'?'torven':n.n==='Mira'?'mira':n.n==='Daren'?'daren':null;if(key){let r=R[key],sc=1.58,w=r[2]*sc,h=r[3]*sc;crop(key,n.x-w/2,n.y-h+20,w,h)}else{g.fillStyle='rgba(20,15,12,.28)';g.beginPath();g.ellipse(n.x,n.y+15,12,6,0,0,7);g.fill();g.fillStyle='#5b4738';g.fillRect(n.x-9,n.y-14,18,28);g.fillStyle='#b88865';g.beginPath();g.arc(n.x,n.y-20,8,0,7);g.fill()}if(near){g.strokeStyle='rgba(239,207,148,.78)';g.lineWidth=2;g.beginPath();g.arc(n.x,n.y,29,0,7);g.stroke();A.lab(A.act(n),n.x,n.y-56,9,'#dbc39b')}A.lab(n.n,n.x,n.y-41,10,near?'#ffe3aa':'#ebd7b1')};
const player=()=>{let r=R.player,sc=1.9,w=r[2]*sc,h=r[3]*sc;crop('player',P.x-w/2,P.y-h+22,w,h);A.lab('SEN',P.x,P.y-54,10,'#f0d8ad')};
const loading=()=>{g.save();g.fillStyle='#17140f';g.fillRect(0,0,A.vw,A.vh);A.lab(state==='loading'?'NARETH GRAFİKLERİ YÜKLENİYOR':'GRAFİK PAKETİ HATASI',A.vw/2,A.vh/2-10,18,state==='loading'?'#e8d3a8':'#e88b77');if(state!=='loading')A.lab(`v34 • ${state}`,A.vw/2,A.vh/2+22,11,'#bfa988');g.restore()};
A.world=()=>{if(A.scene!=='world'||!ensure()){loading();return}g.save();g.translate(-A.cx,-A.cy);g.imageSmoothingEnabled=false;
tile(pats.grass,0,0,A.W.w,A.W.h);river();road();bridge();
tile(pats.soil,145,665,475,280);g.strokeStyle='rgba(62,41,25,.72)';g.lineWidth=5;g.strokeRect(145,665,475,280);
crop('inn',425,236,365,254);crop('smith',790,288,315,262);crop('market',850,585,285,201);home();
[[345,425,95,128],[1065,275,86,116],[1030,770,82,111],[730,790,78,105],[320,610,72,98]].forEach(q=>prop('tree',...q));
prop('well',640,655,92,92);[[430,457],[764,458],[1070,469],[620,470]].forEach(q=>prop('barrel',q[0],q[1],38,33));[[545,570],[1015,720]].forEach(q=>prop('crate',q[0],q[1],42,28));
for(let x=180;x<=590;x+=92)prop('fence',x,650,94,39);for(let x=1130;x<=1450;x+=92)prop('fence',x,620,94,39);
if(A.farmPlots)A.farmPlots.forEach((p,i)=>{let ready=p.s===2&&A.absMin&&A.absMin()>=p.ready;if(p.s){g.fillStyle=p.s===1?'rgba(114,75,38,.22)':ready?'rgba(198,158,61,.34)':'rgba(93,126,57,.30)';g.fillRect(p.x-45,p.y-38,90,76)}if(A.ds(P.x,P.y,p.x,p.y)<105)A.lab(`PARSEL ${i+1}`,p.x,p.y-53,9,'#f0d29c')});
if(A.homeUpgrades&&A.homeUpgrades.garden&&A.homeGardenSpot){let s=A.homeGardenSpot;tile(pats.soil,s.x-48,s.y-34,96,68)}
if(A.fishSpots)A.fishSpots.forEach(s=>{if(A.ds(P.x,P.y,s.x,s.y)<95){g.strokeStyle='#d9c38e';g.lineWidth=2;g.beginPath();g.arc(s.x+18,s.y,20,0,7);g.stroke()}});
let[nn,dd]=A.near();A.N.forEach(n=>{if(!n.hidden)npc(n,n===nn&&dd<135)});player();
if(A.atInnDoor&&A.atInnDoor())A.lab(A.T.min/60>=6?'HANA GİR':'HAN KAPALI',A.door.i[0],A.door.i[1]+43,10,A.T.min/60>=6?'#f3d59f':'#b7a88f');
g.restore()};
})();