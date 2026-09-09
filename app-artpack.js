(()=>{const A=window.NARETH,g=A.g,P=A.P;
const town=new Image();town.decoding='async';town.referrerPolicy='no-referrer';town.src='https://opengameart.org/sites/default/files/test_21.png';
const fallback=A.world;
A.artpack={name:'Ansimuz RPG Town CC0',ready:()=>town.complete&&town.naturalWidth>0};
const px=(v)=>Math.round(v);
const spr=(sx,sy,sw,sh,dx,dy,dw,dh)=>{if(!A.artpack.ready())return false;g.drawImage(town,sx,sy,sw,sh,px(dx),px(dy),px(dw),px(dh));return true};
const sign=(txt,x,y,w=116)=>{g.fillStyle='#2d2119';g.fillRect(x-w/2-3,y-16,w+6,32);g.fillStyle='#5a3d29';g.fillRect(x-w/2,y-13,w,26);g.strokeStyle='#a17a4c';g.lineWidth=2;g.strokeRect(x-w/2,y-13,w,26);A.lab(txt,x,y,11,'#ecd2a0')};
const barrel=(x,y)=>{if(!spr(294,276,34,37,x-15,y-19,30,34)){g.fillStyle='#68482f';g.fillRect(x-11,y-16,22,32);g.strokeStyle='#ac7d4e';g.strokeRect(x-11,y-16,22,32)}};
const treeGroup=(x,y,s=1)=>{if(!spr(145,28,140,220,x-70*s,y-110*s,140*s,220*s)){g.fillStyle='#31432d';g.beginPath();g.arc(x,y,45*s,0,7);g.fill()}};
const pixelHouse=(x,y,w,h,name,dark=false)=>{let roof=dark?'#413b34':'#74382a',wall=dark?'#6a6256':'#9b8060';g.fillStyle='rgba(24,17,13,.28)';g.fillRect(x+10,y+14,w,h);g.fillStyle=wall;g.fillRect(x,y+54,w,h-54);g.strokeStyle='#3a2b22';g.lineWidth=5;g.strokeRect(x,y+54,w,h-54);g.fillStyle=roof;g.beginPath();g.moveTo(x-12,y+60);g.lineTo(x+w/2,y);g.lineTo(x+w+12,y+60);g.lineTo(x+w-4,y+84);g.lineTo(x+4,y+84);g.closePath();g.fill();g.strokeStyle='#241b17';g.lineWidth=6;g.stroke();for(let yy=y+24;yy<y+70;yy+=12){g.strokeStyle=dark?'#665e51':'#9e4f37';g.lineWidth=3;g.beginPath();g.moveTo(x+12,yy);g.lineTo(x+w-12,yy);g.stroke()}let cx=x+w/2;g.fillStyle='#32231b';g.fillRect(cx-23,y+h-50,46,50);g.fillStyle='#765038';g.fillRect(cx-17,y+h-43,34,43);for(const wx of [x+38,x+w-38]){g.fillStyle='#2c231d';g.fillRect(wx-15,y+h-92,30,30);g.fillStyle='#e3a34c';g.fillRect(wx-10,y+h-87,20,20);g.strokeStyle='#553927';g.lineWidth=2;g.beginPath();g.moveTo(wx,y+h-87);g.lineTo(wx,y+h-67);g.moveTo(wx-10,y+h-77);g.lineTo(wx+10,y+h-77);g.stroke()}sign(name,cx,y+91,Math.min(w-30,145))};
const person=(x,y,n,near=false,player=false)=>{x=px(x);y=px(y);g.fillStyle='rgba(18,14,11,.36)';g.fillRect(x-13,y+14,27,7);let coat=player?'#312f2d':'#514337',accent=player?'#8b4435':'#70503a';g.fillStyle='#201a17';g.fillRect(x-12,y-14,24,34);g.fillStyle=coat;g.fillRect(x-10,y-12,20,28);g.fillStyle=accent;g.fillRect(x-12,y-8,24,6);g.fillStyle='#b78964';g.fillRect(x-7,y-23,14,13);g.fillStyle='#2c211b';g.fillRect(x-8,y-26,16,6);g.fillRect(x-10,y+14,7,13);g.fillRect(x+3,y+14,7,13);if(player){g.fillStyle='#6b3b30';g.fillRect(x-13,y-4,26,5)}if(near){g.strokeStyle='#e7c98a';g.lineWidth=2;g.strokeRect(x-18,y-31,36,61)}A.lab(n,x,y-42,11,near?'#ffe1a8':'#e6d2ad')};
const role={Daren:'Demirci',Mira:'Hancı',Torven:'Çiftçi',Sela:'Balıkçı',Orik:'Tüccar',Varen:'Ozan'};
const drawRoad=()=>{g.strokeStyle='#6b563d';g.lineWidth=124;g.lineCap='round';g.beginPath();g.moveTo(-30,525);g.lineTo(440,515);g.lineTo(880,575);g.lineTo(1188,520);g.stroke();g.strokeStyle='#a1845c';g.lineWidth=100;g.stroke();for(let i=0;i<76;i++){let x=(i*47)%1180,y=492+((i*61)%72);g.fillStyle=i%3?'#b09468':'#806b50';g.fillRect(x,y,12+(i%3)*4,6+(i%2)*3)}};
const drawRiver=()=>{g.fillStyle='#244b56';g.fillRect(1175,0,246,A.W.h);g.fillStyle='#315f6b';g.fillRect(1191,0,215,A.W.h);for(let y=14;y<A.W.h;y+=34){g.strokeStyle='rgba(133,185,190,.35)';g.lineWidth=3;g.beginPath();g.moveTo(1200,y);g.quadraticCurveTo(1280,y+9,1394,y);g.stroke()}g.fillStyle='#4c3a2c';g.fillRect(1145,476,302,112);g.fillStyle='#765337';g.fillRect(1157,486,278,92);for(let x=1164;x<1436;x+=25){g.strokeStyle='#37281f';g.lineWidth=5;g.beginPath();g.moveTo(x,487);g.lineTo(x,577);g.stroke()}};
const drawFarm=()=>{g.fillStyle='#3d3021';g.fillRect(150,666,466,276);g.fillStyle='#695332';g.fillRect(165,681,436,246);for(let y=700;y<920;y+=32){g.strokeStyle='#a6894d';g.lineWidth=5;g.beginPath();g.moveTo(178,y);g.lineTo(588,y);g.stroke()}g.strokeStyle='#34261c';g.lineWidth=7;g.strokeRect(150,666,466,276);if(A.farmPlots)A.farmPlots.forEach((p,i)=>{let ready=p.s===2&&A.absMin&&A.absMin()>=p.ready,grow=p.s===2;g.fillStyle=p.s===0?'rgba(76,58,37,.68)':p.s===1?'rgba(119,86,43,.72)':ready?'rgba(190,154,62,.70)':'rgba(91,123,57,.72)';g.fillRect(p.x-44,p.y-38,88,76);if(grow){g.strokeStyle=ready?'#d7bc64':'#77974d';g.lineWidth=4;for(let xx=p.x-28;xx<=p.x+28;xx+=18){g.beginPath();g.moveTo(xx,p.y+25);g.lineTo(xx,p.y-19);g.stroke()}}let near=A.ds(P.x,P.y,p.x,p.y)<100;if(near)A.lab(`PARSEL ${i+1}`,p.x,p.y-53,9,'#f1d09a')})};
const drawMarket=()=>{let S=A.shop,s=A.shopSpot||{x:963,y:666},x=s.x,y=s.y;g.fillStyle='#402d21';g.fillRect(x-63,y-22,126,54);g.fillStyle=S&&S.owned?'#8b6040':'#695544';for(let i=0;i<6;i++){g.fillStyle=i%2?'#d9c3a4':'#a95345';g.fillRect(x-66+i*22,y-52,22,31)}g.fillStyle='#69472f';g.fillRect(x-54,y+30,10,34);g.fillRect(x+44,y+30,10,34);g.fillStyle='#8a613c';g.fillRect(x-49,y-8,27,18);g.fillRect(x-13,y-8,27,18);g.fillRect(x+23,y-8,27,18);if(S&&S.stock){if(S.stock.grain)g.fillStyle='#c2a35e',g.fillRect(x-45,y-5,18,10);if(S.stock.fish)g.fillStyle='#7292a0',g.fillRect(x-9,y-5,18,10);if(S.stock.tools)g.fillStyle='#96928b',g.fillRect(x+27,y-5,18,10)}if(S&&A.workerOnShift&&A.workerOnShift())person(x,y-82,S.workerName||'Neris',false,false);A.lab(S&&S.owned?'SENİN TEZGÂHIN':'BOŞ TEZGÂH',x,y-68,9,S&&S.owned?'#efd09a':'#c3b299')};
A.world=()=>{if(!A.artpack.ready()){fallback();return}g.save();g.translate(-A.cx,-A.cy);g.imageSmoothingEnabled=false;
// ground
g.fillStyle='#51623d';g.fillRect(0,0,A.W.w,A.W.h);for(let i=0;i<540;i++){let x=(i*83)%A.W.w,y=(i*137)%A.W.h;g.fillStyle=i%4?'#65734a':'#3d5033';g.fillRect(x,y,2+(i%3),2)}drawRiver();drawRoad();drawFarm();
// real CC0 art: central inn and vegetation
spr(284,28,226,228,450,232,335,338);sign('KARAOVA HANI',618,395,150);
pixelHouse(92,286,205,150,A.home&&A.home.owned?'EVİN':'SATILIK EV',false);
pixelHouse(806,300,255,178,'DEMİRCİ',true);
// forge detail
g.fillStyle='#241b17';g.fillRect(822,490,136,72);g.fillStyle='#7f3928';g.fillRect(834,503,55,40);g.fillStyle='#e98538';g.fillRect(843,512,37,22);g.fillStyle='#4b4742';g.fillRect(902,518,58,13);g.fillRect(919,531,25,27);A.lab('DAREN’İN OCAĞI',890,574,9,'#dfbd87');
// real pixel tree clusters
[[350,400,.75],[1080,250,.8],[1020,745,.85],[735,770,.65],[260,610,.62]].forEach(q=>treeGroup(q[0],q[1],q[2]));
[ [425,450],[761,455],[1060,462],[629,466] ].forEach(q=>barrel(q[0],q[1]));
// well
g.fillStyle='#5d5547';g.beginPath();g.arc(640,655,28,0,7);g.fill();g.strokeStyle='#aaa083';g.lineWidth=5;g.stroke();g.fillStyle='#211b17';g.beginPath();g.arc(640,655,17,0,7);g.fill();g.fillStyle='#5c402b';g.fillRect(612,610,8,55);g.fillRect(660,610,8,55);g.fillRect(608,605,64,8);A.lab('KUYU',640,694,9,'#dbc79c');
drawMarket();
// home garden if purchased
if(A.homeUpgrades&&A.homeUpgrades.garden&&A.homeGardenSpot){let s=A.homeGardenSpot,ready=A.homeGardenReady&&A.homeGardenReady();g.fillStyle=A.homeUpgrades.gardenState===0?'#665035':ready?'#aa8d43':'#617744';g.fillRect(s.x-47,s.y-34,94,68);g.strokeStyle='#97764d';g.lineWidth=4;g.strokeRect(s.x-47,s.y-34,94,68)}
// fishing spots
if(A.fishSpots)A.fishSpots.forEach(s=>{let near=A.ds(P.x,P.y,s.x,s.y)<90;g.strokeStyle=near?'#d8c28d':'rgba(190,209,205,.55)';g.lineWidth=2;g.beginPath();g.arc(s.x+18,s.y,20,0,7);g.stroke()});
// NPCs + player
let[nn,dd]=A.near();A.N.forEach(n=>{if(n.hidden)return;let near=n===nn&&dd<135;person(n.x,n.y,n.n,near,false);if(near)A.lab(`${role[n.n]||A.act(n)} • ${A.act(n)}`,n.x,n.y-27,9,'#c9b58f')});person(P.x,P.y,'SEN',false,true);
if(A.atInnDoor&&A.atInnDoor())A.lab(A.T.min/60>=6?'HANA GİR':'HAN KAPALI',A.door.i[0],A.door.i[1]+44,10,A.T.min/60>=6?'#f3d49d':'#bcae98');
A.lab('KARAOVA',40,38,25,'#e7d1a7','left');g.restore()};
})();