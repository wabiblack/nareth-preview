(()=>{const A=window.NARETH,g=A.g;
A.visualVersion=29;
let seed=937421,dots=[];const rnd=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
for(let i=0;i<430;i++)dots.push({x:rnd()*A.W.w,y:rnd()*A.W.h,r:1+rnd()*2,t:rnd()});
A.vpoly=(pts,fill,stroke=null,lw=1)=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=lw;g.stroke()}};
A.vroof=(x,y,w,h,col='#6d382b')=>{g.fillStyle='rgba(24,18,14,.28)';g.fillRect(x+10,y+13,w,h);A.vpoly([[x-14,y+27],[x+w*.5,y-58],[x+w+14,y+27],[x+w-2,y+62],[x+2,y+62]],col,'#38251f',4);for(let i=0;i<7;i++){g.strokeStyle=i%2?'rgba(45,26,22,.45)':'rgba(151,76,49,.26)';g.lineWidth=3;let yy=y+10+i*7;g.beginPath();g.moveTo(x+8,yy);g.lineTo(x+w-8,yy);g.stroke()}};
A.vwindow=(x,y,on=true)=>{g.fillStyle='#30241d';g.fillRect(x-13,y-12,26,24);g.fillStyle=on?'#e8a84e':'#77634d';g.fillRect(x-9,y-8,18,16);g.strokeStyle='#4b3325';g.lineWidth=2;g.beginPath();g.moveTo(x,y-8);g.lineTo(x,y+8);g.moveTo(x-9,y);g.lineTo(x+9,y);g.stroke()};
A.vbuilding=(x,y,w,h,name,opt={})=>{g.fillStyle='rgba(35,27,20,.24)';g.fillRect(x+12,y+18,w,h);g.fillStyle=opt.wall||'#8d765b';g.fillRect(x,y+25,w,h-25);g.strokeStyle='#574432';g.lineWidth=4;g.strokeRect(x,y+25,w,h-25);A.vroof(x,y,w,h,opt.roof||'#713d2f');for(let xx=x+18;xx<x+w-18;xx+=42){g.strokeStyle='rgba(73,51,35,.40)';g.lineWidth=5;g.beginPath();g.moveTo(xx,y+34);g.lineTo(xx,y+h);g.stroke()}let dx=x+w/2,dy=y+h-43;g.fillStyle='#33251e';g.fillRect(dx-23,dy,46,43);g.fillStyle='#6e4d34';g.fillRect(dx-18,dy+5,36,38);g.fillStyle='#d1a05d';g.beginPath();g.arc(dx+10,dy+22,3,0,7);g.fill();A.vwindow(x+42,y+h-61,opt.lit!==false);A.vwindow(x+w-42,y+h-61,opt.lit!==false);g.fillStyle='#39291f';g.fillRect(dx-66,y+37,132,30);g.strokeStyle='#856544';g.lineWidth=2;g.strokeRect(dx-66,y+37,132,30);A.lab(name,dx,y+52,12,'#ead4a7')};
A.vtree=t=>{g.fillStyle='rgba(25,33,24,.25)';g.beginPath();g.ellipse(t.x+7,t.y+10,t.r*1.35,t.r*.75,0,0,7);g.fill();g.fillStyle='#5f4630';g.fillRect(t.x-3,t.y+5,6,t.r+8);let cols=['#33472f','#40563a','#506441'];for(let i=0;i<5;i++){let a=i*1.256+((t.x+t.y)%7)*.11,rr=t.r*.65,x=t.x+Math.cos(a)*rr,y=t.y+Math.sin(a)*rr*.7;g.fillStyle=cols[i%3];g.beginPath();g.arc(x,y,t.r*.72,0,7);g.fill()}g.fillStyle='#61734c';g.beginPath();g.arc(t.x-4,t.y-t.r*.2,t.r*.64,0,7);g.fill()};
A.vperson=(x,y,n='SEN',near=false,player=false)=>{g.fillStyle='rgba(20,16,13,.30)';g.beginPath();g.ellipse(x+3,y+17,17,8,0,0,7);g.fill();g.fillStyle=player?'#2e312e':'#584536';g.fillRect(x-11,y-13,22,30);g.fillStyle=player?'#7f4336':'#76533e';g.fillRect(x-13,y-8,26,7);g.fillStyle='#b88b67';g.beginPath();g.arc(x,y-20,10,0,7);g.fill();g.fillStyle='#34251f';g.beginPath();g.arc(x,y-24,10,Math.PI,Math.PI*2);g.fill();g.fillStyle='#2b211b';g.fillRect(x-11,y+16,8,13);g.fillRect(x+3,y+16,8,13);if(near){g.strokeStyle='rgba(238,207,145,.72)';g.lineWidth=2;g.beginPath();g.arc(x,y,28,0,7);g.stroke()}A.lab(n,x,y-45,11,near?'#ffe2aa':'#e7d6b4')};
A.world=()=>{let P=A.P;g.save();g.translate(-A.cx,-A.cy);
// base ground
g.fillStyle='#6f7650';g.fillRect(0,0,A.W.w,A.W.h);dots.forEach(d=>{g.fillStyle=d.t>.55?'rgba(211,190,132,.12)':'rgba(45,57,36,.14)';g.beginPath();g.arc(d.x,d.y,d.r,0,7);g.fill()});
// river and banks
g.fillStyle='#607453';g.fillRect(1134,0,322,A.W.h);g.fillStyle='#355e69';g.fillRect(1182,0,228,A.W.h);g.strokeStyle='#6f856f';g.lineWidth=13;g.beginPath();g.moveTo(1176,0);g.lineTo(1176,A.W.h);g.moveTo(1416,0);g.lineTo(1416,A.W.h);g.stroke();for(let y=20;y<A.W.h;y+=38){g.strokeStyle='rgba(168,204,195,.26)';g.lineWidth=2;g.beginPath();g.moveTo(1200,y);g.quadraticCurveTo(1280,y+8,1385,y);g.stroke()}
// stone bridge
g.fillStyle='#746a57';g.fillRect(1156,485,284,94);g.strokeStyle='#4a4236';g.lineWidth=5;g.strokeRect(1156,485,284,94);for(let x=1172;x<1430;x+=27){g.strokeStyle='#9a8a70';g.lineWidth=2;g.beginPath();g.moveTo(x,491);g.lineTo(x,572);g.stroke()}
// main road
g.strokeStyle='#a8895d';g.lineWidth=112;g.lineCap='round';g.beginPath();g.moveTo(-40,530);g.lineTo(460,520);g.lineTo(900,588);g.lineTo(1170,535);g.stroke();g.strokeStyle='rgba(199,174,127,.30)';g.lineWidth=82;g.stroke();for(let i=0;i<55;i++){let x=20+i*21,y=510+Math.sin(i*.83)*19+(i>22?25:0);g.fillStyle=i%3?'#8e7656':'#b09168';g.beginPath();g.ellipse(x,y,8+(i%4),4+(i%3),i*.37,0,7);g.fill()}
// farm area
g.fillStyle='#5c5037';g.fillRect(160,665,455,270);g.strokeStyle='#9a8152';g.lineWidth=4;for(let y=700;y<922;y+=31){g.beginPath();g.moveTo(182,y);g.lineTo(594,y);g.stroke()}g.strokeStyle='#4b3d2b';g.lineWidth=5;g.strokeRect(160,665,455,270);
// buildings
A.vbuilding(470,300,260,176,'KARAOVA HANI',{wall:'#8f765c',roof:'#743b2c'});A.vbuilding(816,334,238,155,'DEMİRCİ',{wall:'#75665a',roof:'#4d4037'});A.vbuilding(92,292,205,140,A.home&&A.home.owned?'EVİN':'SATILIK EV',{wall:'#806c55',roof:'#684334'});
// smith open forge
g.fillStyle='#34261f';g.fillRect(824,493,135,52);g.fillStyle='#b85d32';g.fillRect(841,504,47,29);g.fillStyle='#f09a3d';g.fillRect(849,511,31,16);g.fillStyle='#4a4641';g.fillRect(900,508,55,12);g.fillRect(916,520,24,24);A.lab('OCAK',870,555,9,'#e6c08a');
// market zone
g.fillStyle='rgba(104,76,46,.28)';g.fillRect(650,574,420,165);for(let i=0;i<4;i++){let x=680+i*92;g.fillStyle=i%2?'#9b6a45':'#b78d5c';g.fillRect(x,590,69,63);g.fillStyle=i%2?'#d6c0a1':'#a95d48';for(let s=0;s<3;s++)g.fillRect(x+s*23,574,23,20)}A.lab('KARAOVA PAZARI',850,560,13,'#e3c99a');
// fences
const fence=(x1,y1,x2,y2)=>{g.strokeStyle='#4b3928';g.lineWidth=7;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();let n=Math.max(2,Math.floor(A.ds(x1,y1,x2,y2)/42));for(let i=0;i<=n;i++){let t=i/n,x=x1+(x2-x1)*t,y=y1+(y2-y1)*t;g.fillStyle='#63492f';g.fillRect(x-4,y-10,8,22)}};fence(135,645,625,645);fence(135,945,625,945);fence(1100,610,1460,610);
// wells, barrels, signs
g.fillStyle='#5e513f';g.beginPath();g.arc(640,655,28,0,7);g.fill();g.strokeStyle='#9c8b70';g.lineWidth=6;g.stroke();g.fillStyle='#332a23';g.beginPath();g.arc(640,655,17,0,7);g.fill();A.lab('KUYU',640,694,9,'#d6c39e');
[[442,451],[752,455],[1058,472],[627,472]].forEach(([x,y])=>{g.fillStyle='#5a3f2d';g.beginPath();g.ellipse(x,y,12,17,0,0,7);g.fill();g.strokeStyle='#98734c';g.lineWidth=2;g.stroke()});
// trees
(A.trees||[]).forEach(A.vtree);
// entrance hints
if(A.atInnDoor()){g.fillStyle='rgba(236,202,139,.16)';g.beginPath();g.arc(A.door.i[0],A.door.i[1],38,0,7);g.fill();A.lab(A.T.min/60>=6?'HANA GİR':'HAN KAPALI',A.door.i[0],A.door.i[1]+44,10,A.T.min/60>=6?'#f2d49e':'#bcae98')}
// labels and people
let[nn,dd]=A.near(),labels=[];A.N.forEach(n=>{if(n.hidden)return;let near=n===nn&&dd<145;A.vperson(n.x,n.y,n.n,near,false);let ly=n.y-29;labels.forEach(o=>{if(Math.abs(n.x-o.x)<110&&Math.abs(ly-o.y)<28)ly=o.y-28});labels.push({x:n.x,y:ly});A.lab(A.act(n),n.x,ly-1,9,'#c7b496')});A.vperson(P.x,P.y,'SEN',false,true);
A.lab('KARAOVA',42,42,28,'#e5d1a7','left');g.restore()};
})();