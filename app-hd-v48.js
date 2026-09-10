(()=>{
const A=window.NARETH,g=A.g,P=A.P;
A.customArtV=48;
const C={
 grass:'#4f613d',grassL:'#62764b',grassD:'#3d5032',grassM:'#566a41',
 road:'#a7895d',roadL:'#b99a6a',roadD:'#71593d',roadM:'#92744f',
 soil:'#5f4931',soilL:'#886a43',water:'#2f5e69',waterL:'#3f7580',waterD:'#23454d',
 wood:'#5b3d2a',woodL:'#82593a',woodD:'#332219',beam:'#563823',
 plaster:'#927a5d',plasterL:'#a58a68',plasterD:'#745d45',
 dark:'#241914',cream:'#ead3a6',roof:'#6c3930',roofL:'#905043',roofD:'#4d2924',
 stone:'#625e53',stoneL:'#827b6a',stoneD:'#454239',gold:'#d9a24c'
};
const R=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
const hash=(x,y)=>Math.abs(((x*73856093)^(y*19349663))>>>0);
const lab=(t,x,y,z=10,c=C.cream)=>A.lab(t,Math.round(x),Math.round(y),z,c);
const poly=(pts,c)=>{g.fillStyle=c;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(Math.round(p[0]),Math.round(p[1])):g.moveTo(Math.round(p[0]),Math.round(p[1])));g.closePath();g.fill()};
const ln=(x1,y1,x2,y2,w,c)=>{g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(Math.round(x1),Math.round(y1));g.lineTo(Math.round(x2),Math.round(y2));g.stroke()};
const shadow=(x,y,w,h=11)=>{g.save();g.globalAlpha=.25;R(x-w/2,y,w,h,'#140f0c');g.restore()};

const tuft=(x,y,s=1)=>{
  let d=C.grassD,m=C.grassM,l=C.grassL;
  R(x,y,2*s,7*s,d); R(x+4*s,y-2*s,2*s,9*s,m); R(x+8*s,y+1*s,2*s,6*s,d);
  R(x+2*s,y+1*s,2*s,4*s,l); R(x+6*s,y,2*s,4*s,l);
};
const pebble=(x,y,s=1)=>{
  R(x,y,6*s,3*s,'#706b5d'); R(x+1*s,y,4*s,1*s,'#9b927b'); R(x+5*s,y+2*s,2*s,2*s,'#4c493f');
};
const ground=()=>{
  R(0,0,A.W.w,A.W.h,C.grass);
  for(let y=14;y<A.W.h;y+=22){
    for(let x=12;x<A.W.w;x+=27){
      let h=hash(x,y),m=h%17;
      if(m===0)R(x+(h%6),y+((h>>5)%5),2,2,C.grassL);
      else if(m===1)R(x,y,3,2,C.grassD);
      else if(m===2)R(x+4,y,2,3,C.grassM);
    }
  }
  for(let i=0;i<145;i++){
    let x=(i*157+83)%A.W.w,y=(i*113+49)%A.W.h,h=hash(x,y);
    if(!(x>1150&&x<1440)){
      if(i%3===0)tuft(x,y,.75+(h%3)*.12);
      else if(i%5===0)pebble(x,y,.7);
      else R(x,y,10+(h%18),2,i%2?C.grassM:C.grassD);
    }
  }
  for(let i=0;i<28;i++){
    let x=(i*233+71)%1120,y=(i*181+137)%930;
    if(i%4===0){R(x,y,2,2,'#c3a968');R(x+3,y+1,1,1,'#d2c07d')}
  }
};

const roadPts=[[-80,529],[100,526],[300,518],[480,522],[670,545],[845,569],[1015,556],[1180,523],[1405,512],[1680,520]];
const road=()=>{
  g.save(); g.lineCap='round'; g.lineJoin='round';
  g.strokeStyle=C.roadD; g.lineWidth=108; g.beginPath(); roadPts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke();
  g.strokeStyle=C.road; g.lineWidth=88; g.stroke();
  g.strokeStyle='rgba(228,202,151,.20)'; g.lineWidth=2;
  for(let i=0;i<25;i++){let x=i*68+18,y=504+((i*41)%73);g.beginPath();g.moveTo(x,y);g.lineTo(x+14+(i%4)*5,y+(i%3)-1);g.stroke()}
  g.restore();
  for(let i=0;i<135;i++){
    let x=(i*79+31)%1580,y=488+((i*43)%87),h=hash(x,y);
    R(x,y,2+(h%6),1+(h%3),h%4===0?C.roadL:C.roadM);
  }
  for(let i=0;i<46;i++){
    let x=(i*101+53)%1550,y=476+((i*67)%110);
    if(i%2)pebble(x,y,.65); else R(x,y,5,2,'#7f6444');
  }
};

const river=()=>{
  R(1170,0,258,A.W.h,C.waterD); R(1184,0,230,A.W.h,C.water); R(1200,0,198,A.W.h,C.waterL);
  for(let y=18;y<A.W.h;y+=28){
    for(let x=1210;x<1380;x+=58){
      let o=((y/14)%2)*10;
      R(x+o,y,26,2,'rgba(193,226,221,.36)');
      R(x+13,y+9,18,2,'rgba(24,62,70,.28)');
    }
  }
  for(let y=11;y<A.W.h;y+=74){R(1192,y,7,26,'rgba(94,139,140,.22)');R(1399,y+23,6,18,'rgba(29,67,72,.27)')}
  R(1162,0,8,A.W.h,'#3d5138');R(1426,0,8,A.W.h,'#3d5138');
};
const bridge=()=>{
  shadow(1298,586,304,10);
  R(1146,466,304,124,C.dark);R(1155,475,286,106,'#6c4b33');
  for(let x=1160;x<1438;x+=22){R(x,480,5,97,'#35241c');R(x+6,482,2,92,'rgba(199,147,87,.24)')}
  R(1149,471,296,7,'#2e211a');R(1149,579,296,7,'#2e211a');
  R(1145,459,9,134,'#4a3224');R(1441,459,9,134,'#4a3224');
};

const sign=(txt,x,y,w=126)=>{
  shadow(x,y+17,w+6,5);R(x-w/2-4,y-16,w+8,32,C.dark);R(x-w/2,y-13,w,26,'#5b3c29');
  R(x-w/2+4,y-9,w-8,2,'#896044');R(x-w/2+4,y+8,w-8,2,'#3b281e');lab(txt,x,y,10,'#f1d7a1')
};
const stoneBase=(x,y,w)=>{
  R(x,y,w,18,C.stoneD);
  for(let xx=x+4;xx<x+w-6;xx+=20){
    let h=hash(xx,y);R(xx,y+3,15+(h%5),10,h%2?C.stone:C.stoneL);R(xx+2,y+4,8,2,'rgba(220,211,178,.16)')
  }
};
const win=(x,y,w=28,h=27)=>{
  R(x-3,y-3,w+6,h+6,C.dark);R(x,y,w,h,'#bd833a');R(x+3,y+3,w-6,h-6,C.gold);
  R(x+w/2-2,y,4,h,'#664329');R(x,y+h/2-2,w,4,'#664329');R(x+4,y+4,7,5,'#f1ca72');
};
const wallTexture=(x,y,w,h)=>{
  for(let yy=y+7;yy<y+h-8;yy+=17)for(let xx=x+8;xx<x+w-8;xx+=29){
    let q=hash(xx,yy);if(q%4===0)R(xx+(q%7),yy,7+(q%7),2,'rgba(70,51,36,.18)');
    if(q%11===0)R(xx,yy+5,3,3,'rgba(218,194,151,.16)');
  }
};
const roofTiles=(x,y,w,c1,c2)=>{
  for(let row=0;row<5;row++){
    let yy=y+16+row*9,step=24,off=(row%2)*12;
    for(let xx=x+14+off;xx<x+w-12;xx+=step){
      let h=hash(xx,yy);R(xx,yy,18,5,h%3===0?c2:c1);R(xx+2,yy,14,1,'rgba(238,180,132,.12)');
    }
  }
};
const building=(o)=>{
  let {x,y,w,h,roof1,roof2,name,doorX,windows=[],forge=false}=o;
  shadow(x+w/2,y+h+8,w-16,13);
  R(x+5,y+55,w-10,h-55,C.plasterD);R(x+10,y+58,w-20,h-61,C.plaster);wallTexture(x+10,y+58,w-20,h-61);
  poly([[x-9,y+57],[x+w/2,y-4],[x+w+9,y+57],[x+w+3,y+69],[x-3,y+69]],C.dark);
  poly([[x,y+51],[x+w/2,y+2],[x+w,y+51],[x+w-6,y+62],[x+6,y+62]],roof1); roofTiles(x,y,w,roof1,roof2);
  R(x+10,y+64,w-20,6,C.beam);R(x+15,y+64,7,h-69,C.beam);R(x+w-22,y+64,7,h-69,C.beam);
  R(x+w/2-3,y+64,7,h-69,C.beam);
  for(let yy=y+93;yy<y+h-25;yy+=31)R(x+12,yy,w-24,4,C.beam);
  stoneBase(x+8,y+h-18,w-16);
  windows.forEach(p=>win(x+p[0],y+p[1],p[2]||28,p[3]||27));
  let dx=x+doorX;R(dx-24,y+h-69,48,69,C.dark);R(dx-18,y+h-61,36,61,'#65442f');R(dx-14,y+h-57,4,52,'#835a39');R(dx+10,y+h-32,4,4,'#d4a95b');
  if(forge){
    R(x+w-67,y+86,43,60,C.dark);R(x+w-61,y+92,31,47,'#77392a');R(x+w-56,y+99,21,31,'#d56e30');
    R(x+w-51,y+105,11,18,'#ffc267');R(x+w-46,y+109,5,10,'#fff0a3');
    R(x+w+10,y+128,58,10,'#393734');R(x+w+26,y+138,24,32,'#4b4842');R(x+w+30,y+142,16,3,'#76716a');
  }
  sign(name,x+w/2,y+77,Math.min(w-28,name.length>10?154:112));
};

const inn=()=>building({x:450,y:275,w:300,h:210,roof1:'#6e3d34',roof2:'#925244',name:'KARAOVA HANI',doorX:150,windows:[[33,99],[87,99],[184,99],[239,99]]});
const smith=()=>building({x:838,y:311,w:214,h:178,roof1:'#4d4742',roof2:'#67605a',name:'DEMİRCİ',doorX:106,windows:[[28,96]],forge:true});
const home=()=>building({x:110,y:320,w:180,h:137,roof1:'#673a31',roof2:'#884b3c',name:A.home&&A.home.owned?'EVİN':'SATILIK EV',doorX:90,windows:[[24,83],[127,83]]});

const market=()=>{
  let x=850,y=646,w=226;shadow(x+w/2,y+116,w,12);
  R(x,y+36,w,72,'#4e3424');R(x+9,y+102,10,53,'#442c1f');R(x+w-19,y+102,10,53,'#442c1f');
  for(let i=0;i<12;i++)R(x+i*19,y,20,36,i%2?'#d7bd90':'#9a4f40');
  R(x-5,y+34,w+10,7,C.dark);
  for(let i=0;i<5;i++){R(x+15+i*42,y+58,29,22,'#745034');R(x+19+i*42,y+63,21,12,i%3===0?'#c1a15d':i%3===1?'#78936a':'#8d8c86')}
  sign(A.shop&&A.shop.owned?'SENİN TEZGÂHIN':'PAZAR',x+w/2,y-16,140)
};
const farm=()=>{
  R(150,662,470,282,'#34261c');R(159,671,452,264,C.soil);
  for(let y=692;y<927;y+=30){R(171,y,426,5,C.soilL);R(171,y+5,426,3,'#493526')}
  for(let i=0;i<32;i++){let x=175+(i*59)%410,y=684+(i*37)%230;R(x,y,3,2,i%2?'#9a7b4e':'#4b3828')}
  if(A.farmPlots)A.farmPlots.forEach((p,i)=>{let ready=p.s===2&&A.absMin&&A.absMin()>=p.ready;if(p.s){R(p.x-42,p.y-35,84,70,p.s===1?'#6f5138':ready?'#a58a44':'#5f7848');if(p.s===2){for(let xx=p.x-27;xx<=p.x+27;xx+=13){R(xx,p.y-17,3,40,ready?'#c7a957':'#76914e');R(xx-5,p.y-7,6,3,ready?'#d8bd6a':'#92aa65')}}}if(A.ds(P.x,P.y,p.x,p.y)<98)lab(`PARSEL ${i+1}`,p.x,p.y-50,8,'#efd09b')})
};
const tree=(x,y,s=1)=>{
  shadow(x,y+30,54*s,10);R(x-5*s,y+8*s,10*s,40*s,'#432d20');R(x-9*s,y+31*s,18*s,7*s,'#322219');
  const B=[[-26,-10,27],[-8,-26,30],[18,-15,27],[-18,8,29],[13,8,28],[2,-5,34]];
  B.forEach((b,i)=>{let xx=x+b[0]*s,yy=y+b[1]*s,rr=b[2]*s;R(xx-rr/2,yy-rr/2,rr,rr,i%3===0?'#2f4a33':i%3===1?'#3a5c3a':'#46673f')});
  for(let i=0;i<12;i++){let h=hash(x+i,y);R(x-30*s+(h%58)*s,y-30*s+((h>>5)%50)*s,4*s,3*s,i%3?'#71894f':'#8aa05c')}
};
const well=()=>{shadow(640,690,72,10);R(606,640,9,52,'#493124');R(665,640,9,52,'#493124');R(602,636,76,8,'#5d402d');stoneBase(610,667,60);R(616,657,48,14,'#77705f');R(621,660,38,8,'#211b17');lab('KUYU',640,706,8,'#d9c59d')};
const barrel=(x,y)=>{shadow(x,y+18,28,6);R(x-13,y-18,26,36,'#33241b');R(x-11,y-16,22,32,'#735037');R(x-13,y-11,26,4,'#2d2925');R(x-13,y+7,26,4,'#2d2925');R(x-8,y-14,3,27,'rgba(213,157,94,.22)')};
const crate=(x,y)=>{shadow(x,y+14,38,5);R(x-18,y-14,36,28,'#35231a');R(x-15,y-11,30,22,'#724e36');R(x-11,y-8,22,3,'#9b6f48');R(x-2,y-11,4,22,'#493225');ln(x-14,y+10,x+14,y-9,2,'rgba(45,30,22,.42)')};
const fence=()=>{
  for(let x=82;x<608;x+=50){R(x,618,7,48,'#573b29');R(x-4,624,16,5,'#795538')}R(72,635,548,6,'#5e422d');
  for(let x=1110;x<1475;x+=50){R(x,626,7,46,'#573b29');R(x-4,632,16,5,'#795538')}R(1098,643,390,6,'#5e422d')
};

const PA={
 Daren:{coat:'#48545d',coatL:'#64727b',accent:'#8a563d',hair:'#2b211d'},
 Mira:{coat:'#6c4745',coatL:'#8b5b56',accent:'#b47b57',hair:'#3b2b25'},
 Torven:{coat:'#4d6045',coatL:'#667b5b',accent:'#806a45',hair:'#4a3527'},
 Sela:{coat:'#3e615e',coatL:'#557b77',accent:'#6c8e8b',hair:'#2d2722'},
 Orik:{coat:'#62513f',coatL:'#806b52',accent:'#a17244',hair:'#32251f'},
 Varen:{coat:'#65506a',coatL:'#81688a',accent:'#9a6b48',hair:'#2a2228'},
 SEN:{coat:'#2d3537',coatL:'#455052',accent:'#974c3e',hair:'#241c18'}
};
const person=(x,y,name,near=false,player=false)=>{
  x=Math.round(x);y=Math.round(y);let p=PA[name]||PA.Orik;
  shadow(x,y+25,31,7);
  R(x-7,y-25,14,12,'#b78361');R(x-8,y-28,16,6,p.hair);R(x-7,y-23,3,3,'#d7a27b');R(x+3,y-22,2,2,'#6b4735');
  R(x-9,y-12,18,4,'#9f6b4c');R(x-12,y-9,24,27,p.coat);R(x-10,y-6,20,5,p.accent);R(x-9,y+1,18,3,p.coatL);
  R(x-15,y-7,4,18,p.coat);R(x+11,y-7,4,18,p.coat);R(x-15,y+9,4,4,'#a87959');R(x+11,y+9,4,4,'#a87959');
  R(x-9,y+18,7,12,'#28221f');R(x+2,y+18,7,12,'#28221f');R(x-10,y+29,9,3,'#191614');R(x+2,y+29,9,3,'#191614');
  if(player){R(x-12,y-4,24,3,'#b15c49');R(x+7,y-6,3,14,'#6f2f28')}
  if(near){g.strokeStyle='#e8c989';g.lineWidth=2;g.strokeRect(x-19,y-33,38,68)}
  lab(name,x,y-44,10,near?'#ffe3aa':'#ecd7af')
};

A.world=()=>{
  if(A.scene!=='world')return;
  g.save();g.translate(-A.cx,-A.cy);g.imageSmoothingEnabled=false;
  ground();river();road();bridge();farm();fence();
  let items=[{y:485,d:inn},{y:489,d:smith},{y:457,d:home},{y:760,d:market},{y:701,d:well}];
  [[350,397,1],[1085,258,.92],[1032,797,.88],[735,817,.8],[314,607,.76],[520,181,.70],[930,172,.70]].forEach(q=>items.push({y:q[1]+35*q[2],d:()=>tree(...q)}));
  [[430,461],[774,467],[1071,473],[622,471]].forEach(q=>items.push({y:q[1],d:()=>barrel(...q)}));
  [[548,586],[1014,744],[684,610],[362,590]].forEach(q=>items.push({y:q[1],d:()=>crate(...q)}));
  let[n,d]=A.near();
  A.N.forEach(q=>{if(!q.hidden)items.push({y:q.y,d:()=>{let near=q===n&&d<135;person(q.x,q.y,q.n,near,false);if(near)lab(A.act(q),q.x,q.y-28,8,'#bfae8d')}})});
  items.push({y:P.y,d:()=>person(P.x,P.y,'SEN',false,true)});
  items.sort((a,b)=>a.y-b.y).forEach(o=>o.d());
  if(A.atInnDoor&&A.atInnDoor()){R(A.door.i[0]-29,A.door.i[1]+28,58,18,'rgba(35,25,20,.84)');lab(A.T.min/60>=6?'HANA GİR':'HAN KAPALI',A.door.i[0],A.door.i[1]+37,8,A.T.min/60>=6?'#f2d59d':'#b9aa91')}
  lab('KARAOVA',42,42,20,'#dfc99f');
  g.restore();
};
})();