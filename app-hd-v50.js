(()=>{
const A=window.NARETH,g=A.g,P=A.P,old=A.world;
A.customArtV=50;
const atlas=new Image();
atlas.decoding='async';
let ready=false;
try{atlas.src='data:image/png;base64,'+(window.__N50||'')}catch(e){console.warn('NARETH v50 atlas',e)}
atlas.onload=()=>{ready=true;window.__N50=''};
atlas.onerror=()=>{ready=false;console.warn('NARETH v50 atlas load failed')};

const S={
 inn:[0,0,365,307], smith:[370,0,300,355], home:[675,0,208,247], market:[0,360,245,249],
 well:[250,360,120,119], treeA:[380,360,112,139], treeB:[500,360,103,126],
 barrels:[0,615,88,86], crates:[92,615,120,86], cart:[216,615,150,93],
 grass:[[380,510,64,64],[446,510,64,64],[512,510,64,64]],
 dirt:[[578,510,64,64],[644,510,64,64],[380,576,64,64]],
 water:[446,576,64,64], shore:[644,576,64,64]
};
const charRows={SEN:0,Mira:1,Daren:2,Orik:3,Varen:4,Sela:5,Torven:6};
const charCols={down:[708,48],up:[768,50],left:[832,44],right:[894,46],walk:[948,60]};
const charY=[[252,74],[329,72],[404,72],[477,72],[553,70],[626,72],[700,68]];
const R=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
const spr=(s,dx,dy,dw,dh,flip=false)=>{const [sx,sy,sw,sh]=s;if(!flip){g.drawImage(atlas,sx,sy,sw,sh,Math.round(dx),Math.round(dy),Math.round(dw),Math.round(dh));return}g.save();g.translate(Math.round(dx+dw),0);g.scale(-1,1);g.drawImage(atlas,sx,sy,sw,sh,0,Math.round(dy),Math.round(dw),Math.round(dh));g.restore()};
const shadow=(x,y,w,h=9,a=.22)=>{g.save();g.globalAlpha=a;g.fillStyle='#17130f';g.beginPath();g.ellipse(Math.round(x),Math.round(y),Math.round(w/2),Math.round(h/2),0,0,Math.PI*2);g.fill();g.restore()};
const lab=(t,x,y,z=10,c='#eed9b0')=>A.lab(t,Math.round(x),Math.round(y),z,c);
const hash=(x,y)=>Math.abs(((x*73856093)^(y*19349663))>>>0);
function tileGround(){for(let y=0;y<A.W.h;y+=64)for(let x=0;x<A.W.w;x+=64){const t=S.grass[hash(x>>6,y>>6)%S.grass.length];g.drawImage(atlas,...t,x,y,64,64)}}
function dirtRoad(){const pts=[[-70,530],[125,526],[300,518],[480,520],[655,541],[830,568],[1015,555],[1180,523],[1410,513],[1680,520]];g.save();g.lineCap='round';g.lineJoin='round';g.strokeStyle='rgba(89,62,38,.62)';g.lineWidth=108;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));g.stroke();g.clip();for(let y=450;y<640;y+=64)for(let x=-20;x<A.W.w+64;x+=64){const t=S.dirt[hash(x>>6,y>>6)%S.dirt.length];g.drawImage(atlas,...t,x,y,64,64)}g.restore()}
function river(){for(let y=0;y<A.W.h;y+=64)for(let x=1184;x<1420;x+=64)g.drawImage(atlas,...S.water,x,y,64,64);R(1168,0,16,A.W.h,'rgba(48,73,45,.72)');R(1420,0,14,A.W.h,'rgba(48,73,45,.72)')}
function bridge(){shadow(1298,586,292,12,.26);R(1152,472,292,112,'#4f3423');for(let x=1158;x<1438;x+=24){R(x,478,19,100,(x/24)%2?'#795337':'#6b482f');R(x+18,478,2,100,'rgba(35,23,16,.55)')}R(1148,469,300,8,'#2f2118');R(1148,580,300,8,'#2f2118')}
function farm(){R(150,662,470,282,'#493521');for(let y=672;y<940;y+=64)for(let x=158;x<615;x+=64){const t=S.dirt[(x+y)%S.dirt.length];g.drawImage(atlas,...t,x,y,64,64)}if(A.farmPlots)A.farmPlots.forEach((p,i)=>{let readyPlot=p.s===2&&A.absMin&&A.absMin()>=p.ready;if(p.s){R(p.x-42,p.y-35,84,70,p.s===1?'rgba(77,55,34,.52)':readyPlot?'rgba(166,137,63,.45)':'rgba(69,104,60,.45)');if(p.s===2)for(let xx=p.x-28;xx<=p.x+28;xx+=14){R(xx,p.y-16,3,38,readyPlot?'#cfb75d':'#789653');R(xx-4,p.y-5,8,3,readyPlot?'#e1c96f':'#98b86e')}}if(A.ds(P.x,P.y,p.x,p.y)<98)lab(`PARSEL ${i+1}`,p.x,p.y-50,8,'#f0d49d')})}
function fence(){g.fillStyle='#63462f';for(let x=72;x<615;x+=54){R(x,626,8,42,'#5b3d29');R(x-4,633,16,5,'#8a6040')}R(72,644,542,6,'#61432d');for(let x=1100;x<1490;x+=54){R(x,632,8,40,'#5b3d29');R(x-4,639,16,5,'#8a6040')}R(1096,650,392,6,'#61432d')}
function inn(){shadow(600,494,322,18,.28);spr(S.inn,435,218,330,278)}
function smith(){shadow(945,503,266,17,.30);spr(S.smith,810,181,270,320)}
function home(){shadow(200,465,184,13,.26);spr(S.home,108,239,190,226)}
function market(){shadow(960,806,224,16,.25);spr(S.market,849,580,220,224)}
function well(){shadow(640,714,90,10,.23);spr(S.well,590,615,100,99)}
function tree(x,y,v=0,s=1){const src=v?S.treeB:S.treeA,base=v?126:139,w=v?103:112;shadow(x,y+4,76*s,10,.18);spr(src,x-(w*s)/2,y-base*s+5,w*s,base*s)}
function propGroup(src,x,y,w,h){shadow(x+w/2,y+h-3,w*.75,8,.20);spr(src,x,y,w,h)}
function charSprite(o,name,near=false){const r=charRows[name]??3,dir=o.dir||'down',moving=(o.anim===2||o.anim===0);let col=charCols[dir]||charCols.down,flip=false,bob=0;if(moving&&(dir==='right'||dir==='left')){col=charCols.walk;flip=dir==='left'}else if(moving)bob=-1;const [sy,sh]=charY[r];let sw=col[1],sx=col[0],dh=72,dw=Math.max(38,Math.round(sw*(dh/sh)));if(name==='Orik'){dh=74;dw=Math.max(48,Math.round(sw*(dh/sh)))}if(name==='Torven'){dh=70;dw=Math.max(45,Math.round(sw*(dh/sh)))}shadow(o.x,o.y+28,dw*.68,8,.22);spr([sx,sy,sw,sh],o.x-dw/2,o.y-dh+30+bob,dw,dh,flip);if(near){g.strokeStyle='rgba(240,205,138,.72)';g.lineWidth=2;g.beginPath();g.ellipse(Math.round(o.x),Math.round(o.y+27),Math.round(dw*.46),5,0,0,Math.PI*2);g.stroke()}lab(name,o.x,o.y-dh+20,10,near?'#ffe1a5':'#ead3aa')}
A.world=()=>{if(A.scene!=='world')return;if(!ready||!atlas.naturalWidth){old();return}g.save();g.translate(-A.cx,-A.cy);g.imageSmoothingEnabled=false;tileGround();river();dirtRoad();bridge();farm();fence();const items=[{y:495,d:inn},{y:505,d:smith},{y:466,d:home},{y:808,d:market},{y:715,d:well},{y:410,d:()=>tree(350,405,0,.82)},{y:300,d:()=>tree(1080,290,1,.80)},{y:815,d:()=>tree(1035,805,0,.80)},{y:840,d:()=>tree(735,830,1,.74)},{y:620,d:()=>tree(315,610,0,.72)},{y:195,d:()=>tree(520,185,1,.68)},{y:190,d:()=>tree(930,180,0,.67)},{y:472,d:()=>propGroup(S.barrels,395,422,76,74)},{y:610,d:()=>propGroup(S.crates,520,535,102,73)},{y:752,d:()=>propGroup(S.cart,1000,674,124,77)}];const [nn,dd]=A.near();A.N.forEach(q=>{if(!q.hidden)items.push({y:q.y,d:()=>{const near=q===nn&&dd<135;charSprite(q,q.n,near);if(near)lab(A.act(q),q.x,q.y-29,8,'#bfae8d')}})});items.push({y:P.y,d:()=>charSprite(P,'SEN',false)});items.sort((a,b)=>a.y-b.y).forEach(o=>o.d());if(A.atInnDoor&&A.atInnDoor()){R(A.door.i[0]-31,A.door.i[1]+27,62,18,'rgba(30,23,17,.86)');lab(A.T.min/60>=6?'HANA GİR':'HAN KAPALI',A.door.i[0],A.door.i[1]+36,8,A.T.min/60>=6?'#f2d59d':'#b9aa91')}lab('KARAOVA',42,42,20,'#e0c89c');g.restore()};
})();