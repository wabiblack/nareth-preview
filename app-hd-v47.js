(()=>{
const A=window.NARETH,g=A.g,P=A.P;
A.customArtV=47;
const C={grass:'#566642',grass2:'#64734a',grass3:'#465638',roadEdge:'#765d3f',road:'#a98a5e',roadHi:'#b99a6b',soil:'#665037',soilHi:'#8b6c43',water:'#315c67',water2:'#3b6b75',wood:'#5a3b29',wood2:'#82583a',dark:'#261b16',cream:'#e9d2a3',roof:'#713b31',roof2:'#98503c',stone:'#6d6759'};
const R=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
const hash=(x,y)=>Math.abs(((x*73856093)^(y*19349663))>>>0);
const label=(t,x,y,z=11,col=C.cream)=>A.lab(t,Math.round(x),Math.round(y),z,col);
const ground=()=>{
 R(0,0,A.W.w,A.W.h,C.grass);
 for(let y=18;y<A.W.h;y+=26)for(let x=14;x<A.W.w;x+=31){let h=hash(x,y);if(h%5===0){R(x+(h%9),y+((h>>5)%7),2+(h%3),2,C.grass3)}else if(h%7===0){R(x,y,3,2,C.grass2)}}
 for(let i=0;i<90;i++){let x=(i*173+97)%A.W.w,y=(i*109+61)%A.W.h,w=16+(i%4)*8;R(x,y,w,3,i%2?C.grass2:C.grass3)}
};
const roadPts=[[-70,532],[130,526],[330,520],[510,525],[720,555],[900,584],[1080,556],[1230,520],[1450,512],[1670,523]];
const road=()=>{
 g.save();g.lineCap='square';g.lineJoin='round';
 g.strokeStyle=C.roadEdge;g.lineWidth=126;g.beginPath();roadPts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();
 g.strokeStyle=C.road;g.lineWidth=106;g.stroke();
 g.strokeStyle='rgba(225,197,145,.24)';g.lineWidth=2;for(let i=0;i<22;i++){let x=i*74+15,y=513+((i*37)%68);g.beginPath();g.moveTo(x,y);g.lineTo(x+18+(i%4)*6,y+(i%3)-1);g.stroke()}
 g.restore();
 for(let i=0;i<120;i++){let x=(i*83+27)%1570,y=480+((i*47)%105),h=hash(x,y);R(x,y,3+(h%7),2+(h%3),h%3===0?C.roadHi:'#8d704d')}
};
const river=()=>{
 R(1172,0,252,A.W.h,'#263f45');R(1184,0,228,A.W.h,C.water);R(1200,0,196,A.W.h,C.water2);
 for(let y=18;y<A.W.h;y+=34){for(let x=1210;x<1380;x+=54){R(x+((y/17)%2)*12,y,24,2,'rgba(190,223,217,.34)');R(x+18,y+9,14,2,'rgba(20,56,65,.28)')}}
 R(1164,0,8,A.W.h,'#41513a');R(1424,0,8,A.W.h,'#41513a');
};
const bridge=()=>{
 R(1145,468,304,128,C.dark);R(1155,478,284,108,'#6f4d34');
 for(let x=1160;x<1438;x+=23){R(x,481,5,102,'#33241c');R(x+6,484,2,95,'rgba(196,144,86,.25)')}
 R(1148,472,296,8,'#2b2019');R(1148,580,296,8,'#2b2019');
};
const shadow=(x,y,w)=>{g.save();g.globalAlpha=.22;R(x-w/2,y,w,13,'#15100d');g.restore()};
const sign=(txt,x,y,w=130)=>{R(x-w/2-4,y-17,w+8,34,'#211712');R(x-w/2,y-13,w,26,'#5f402b');R(x-w/2+4,y-9,w-8,18,'#745039');label(txt,x,y,11,'#f1d59c')};
const windowPx=(x,y)=>{R(x,y,32,30,'#2b231d');R(x+4,y+4,24,22,'#d59c46');R(x+15,y+4,3,22,'#6b472e');R(x+4,y+14,24,3,'#6b472e');R(x+7,y+7,6,5,'#f1c76f')};
const roof= (x,y,w,h,c1,c2)=>{
 R(x,y+42,w,h-42,'#927453');
 g.fillStyle=C.dark;g.beginPath();g.moveTo(x-10,y+56);g.lineTo(x+w/2,y-8);g.lineTo(x+w+10,y+56);g.lineTo(x+w+3,y+72);g.lineTo(x-3,y+72);g.closePath();g.fill();
 g.fillStyle=c1;g.beginPath();g.moveTo(x,y+51);g.lineTo(x+w/2,y);g.lineTo(x+w,y+51);g.lineTo(x+w-6,y+65);g.lineTo(x+6,y+65);g.closePath();g.fill();
 for(let yy=y+19;yy<y+61;yy+=10){for(let xx=x+16;xx<x+w-12;xx+=27){let hh=hash(xx,yy);R(xx+(hh%5),yy,18,4,hh%2?c2:c1)}}
};
const timber=(x,y,w,h)=>{R(x+8,y+68,w-16,6,'#60412e');R(x+16,y+68,7,h-74,'#60412e');R(x+w-23,y+68,7,h-74,'#60412e');R(x+w/2-3,y+68,7,h-74,'#60412e');for(let yy=y+96;yy<y+h-20;yy+=34)R(x+12,yy,w-24,4,'#60412e')};
const inn=()=>{
 let x=432,y=258,w=336,h=232;shadow(x+w/2,y+h+9,w-30);roof(x,y,w,h,'#744137','#935344');timber(x,y,w,h);
 R(x+20,y+83,82,72,'#806047');R(x+w-102,y+83,82,72,'#806047');
 windowPx(x+42,y+105);windowPx(x+262,y+105);windowPx(x+112,y+105);windowPx(x+192,y+105);
 R(x+w/2-28,y+h-68,56,68,'#2d2019');R(x+w/2-21,y+h-59,42,59,'#68462e');R(x+w/2+10,y+h-31,5,5,'#d5ad5b');
 R(x+58,y+170,52,8,'#4d3325');R(x+w-110,y+170,52,8,'#4d3325');
 sign('KARAOVA HANI',x+w/2,y+78,166);
};
const smith=()=>{
 let x=825,y=296,w=236,h=196;shadow(x+w/2,y+h+9,w-15);roof(x,y,w,h,'#4f4640','#625a52');timber(x,y,w,h);
 windowPx(x+31,y+104);R(x+w-68,y+89,46,68,'#2d2420');R(x+w-61,y+98,32,48,'#7a3d2c');R(x+w-56,y+105,22,31,'#e27a32');R(x+w-50,y+110,12,18,'#ffc261');
 R(x+91,y+h-58,50,58,'#2d2019');R(x+98,y+h-51,36,51,'#59402f');sign('DEMİRCİ',x+w/2,y+73,112);
 R(x+w+11,y+137,60,12,'#403c38');R(x+w+27,y+149,24,36,'#4f4a43');
};
const home=()=>{
 let x=102,y=310,w=195,h=145;shadow(x+w/2,y+h+7,w-20);roof(x,y,w,h,'#6b3b31','#8d4b39');timber(x,y,w,h);windowPx(x+25,y+86);windowPx(x+w-57,y+86);R(x+w/2-20,y+h-48,40,48,'#5a3c2c');sign(A.home&&A.home.owned?'EVİN':'SATILIK EV',x+w/2,y+70,112)
};
const market=()=>{
 let x=842,y=640,w=250;shadow(x+w/2,y+112,w);R(x,y+35,w,76,'#543925');R(x+12,y+104,12,56,'#4a301f');R(x+w-24,y+104,12,56,'#4a301f');
 for(let i=0;i<10;i++)R(x+i*25,y,25,38,i%2?'#d5bb8f':'#984d3d');
 R(x-6,y+35,w+12,8,'#32231b');for(let i=0;i<5;i++){R(x+18+i*46,y+59,32,24,'#7a5837');R(x+23+i*46,y+64,22,14,i%3===0?'#c4a35f':i%3===1?'#7f9a67':'#8d8c88')}
 sign(A.shop&&A.shop.owned?'SENİN TEZGÂHIN':'PAZAR',x+w/2,y-17,142)
};
const farm=()=>{
 R(146,659,480,287,'#34261c');R(156,669,460,267,C.soil);
 for(let y=690;y<930;y+=31){R(169,y,434,6,C.soilHi);R(169,y+6,434,3,'#4d3929')}
 if(A.farmPlots)A.farmPlots.forEach((p,i)=>{let ready=p.s===2&&A.absMin&&A.absMin()>=p.ready;if(p.s){R(p.x-43,p.y-36,86,72,p.s===1?'#72543a':ready?'#a88d45':'#617a49');if(p.s===2){for(let xx=p.x-28;xx<=p.x+28;xx+=14){R(xx,p.y-17,3,42,ready?'#c7aa57':'#78924e');R(xx-5,p.y-8,6,3,ready?'#d9bd69':'#91aa63')}}}if(A.ds(P.x,P.y,p.x,p.y)<100)label(`PARSEL ${i+1}`,p.x,p.y-51,9,'#f0d09b')})
};
const tree=(x,y,s=1)=>{
 shadow(x,y+28,52*s);R(x-5*s,y+8*s,10*s,38*s,'#4a3223');R(x-9*s,y+31*s,18*s,7*s,'#39261c');
 const blobs=[[-25,-12,25],[-5,-24,28],[19,-10,24],[-16,6,27],[12,8,25],[0,-3,31]];blobs.forEach((b,i)=>{let xx=x+b[0]*s,yy=y+b[1]*s,rr=b[2]*s;R(xx-rr/2,yy-rr/2,rr,rr,i%3===0?'#304b34':i%3===1?'#3b5d3b':'#47683f')});
 for(let i=0;i<8;i++){let h=hash(x+i,y);R(x-28*s+(h%54)*s,y-27*s+((h>>5)%48)*s,4*s,3*s,i%2?'#6f874d':'#809557')}
};
const well=()=>{shadow(640,688,75);R(606,639,9,54,'#493225');R(665,639,9,54,'#493225');R(602,635,76,8,'#5f432e');R(612,660,56,33,'#514b42');R(617,655,46,13,'#7c7462');R(621,659,38,8,'#241e1a');label('KUYU',640,704,9,'#d9c59c')};
const barrel=(x,y)=>{R(x-13,y-18,26,36,'#3a281e');R(x-11,y-16,22,32,'#765036');R(x-13,y-12,26,4,'#2f2925');R(x-13,y+7,26,4,'#2f2925');R(x-8,y-14,4,28,'rgba(206,150,88,.22)')};
const crate=(x,y)=>{R(x-18,y-14,36,28,'#38251b');R(x-15,y-11,30,22,'#755038');R(x-11,y-8,22,3,'#9d7047');R(x-2,y-11,4,22,'#4c3426')};
const fence=()=>{for(let x=85;x<610;x+=52){R(x,618,8,48,'#5c402b');R(x-5,624,18,6,'#7a5738')}R(74,635,548,7,'#63452f');for(let x=1110;x<1470;x+=52){R(x,625,8,48,'#5c402b');R(x-5,631,18,6,'#7a5738')}R(1098,642,385,7,'#63452f')};
const person=(x,y,name,near=false,player=false)=>{
 x=Math.round(x);y=Math.round(y);shadow(x,y+22,30);let body=player?'#2f3536':name==='Daren'?'#4d555d':name==='Mira'?'#6e4a44':name==='Torven'?'#536348':name==='Sela'?'#3e6462':name==='Orik'?'#665441':'#68506a';
 R(x-8,y-21,16,13,'#b78462');R(x-9,y-24,18,6,'#2d211c');R(x-11,y-8,22,27,body);R(x-11,y-5,22,5,player?'#934b3c':'#76503b');R(x-9,y+19,7,12,'#27211e');R(x+2,y+19,7,12,'#27211e');R(x-14,y-5,4,19,body);R(x+10,y-5,4,19,body);
 if(near){g.strokeStyle='#e9c98c';g.lineWidth=2;g.strokeRect(x-18,y-30,36,64)}label(name,x,y-41,11,near?'#ffe2a9':'#ecd6ad')
};
A.world=()=>{
 if(A.scene!=='world')return;
 g.save();g.translate(-A.cx,-A.cy);g.imageSmoothingEnabled=false;ground();river();road();bridge();farm();fence();
 let items=[{y:490,d:inn},{y:493,d:smith},{y:455,d:home},{y:758,d:market},{y:700,d:well}];
 [[345,395,1],[1080,255,.95],[1030,795,.9],[735,815,.82],[315,605,.78],[520,180,.72],[930,170,.72]].forEach(q=>items.push({y:q[1]+35*q[2],d:()=>tree(...q)}));
 [[430,462],[774,468],[1072,474],[622,472]].forEach(q=>items.push({y:q[1],d:()=>barrel(...q)}));[[548,586],[1015,744],[684,610]].forEach(q=>items.push({y:q[1],d:()=>crate(...q)}));
 let[n,d]=A.near();A.N.forEach(q=>{if(!q.hidden)items.push({y:q.y,d:()=>{let near=q===n&&d<135;person(q.x,q.y,q.n,near,false);if(near)label(A.act(q),q.x,q.y-26,9,'#c7b28e')}})});items.push({y:P.y,d:()=>person(P.x,P.y,'SEN',false,true)});
 items.sort((a,b)=>a.y-b.y).forEach(o=>o.d());
 if(A.atInnDoor&&A.atInnDoor()){R(A.door.i[0]-31,A.door.i[1]+28,62,20,'rgba(38,27,21,.86)');label(A.T.min/60>=6?'HANA GİR':'HAN KAPALI',A.door.i[0],A.door.i[1]+38,9,A.T.min/60>=6?'#f3d59d':'#b7a88f')}
 label('KARAOVA',42,42,24,'#e6d0a5');g.restore();
};
})();