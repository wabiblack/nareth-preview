(()=>{const A=window.NARETH,P=A.P;
const bodies=[
  {n:'han',x1:438,y1:258,x2:762,y2:455,gap:{x1:566,y1:418,x2:634,y2:470}},
  {n:'demirci',x1:925,y1:318,x2:1168,y2:474,gap:{x1:1018,y1:432,x2:1072,y2:492}},
  {n:'pazar',x1:895,y1:620,x2:1110,y2:716},
  {n:'ev',x1:112,y1:355,x2:278,y2:438,gap:{x1:178,y1:405,x2:220,y2:455}}
];
const inside=(x,y,r)=>x>r.x1&&x<r.x2&&y>r.y1&&y<r.y2;
const bodyHit=(x,y,r)=>inside(x,y,r)&&!(r.gap&&inside(x,y,r.gap));
const water=(x,y)=>x>1182&&x<1418&&!(y>474&&y<596);
A.solidAt=(x,y)=>bodies.some(r=>bodyHit(x,y,r))||water(x,y);
const nearestExit=r=>{let x=P.x,y=P.y,opts=[{d:Math.abs(x-r.x1),x:r.x1-5,y},{d:Math.abs(r.x2-x),x:r.x2+5,y},{d:Math.abs(y-r.y1),x,y:r.y1-5},{d:Math.abs(r.y2-y),x,y:r.y2+5}].sort((a,b)=>a.d-b.d);for(const o of opts){if(!A.solidAt(o.x,o.y)){P.x=o.x;P.y=o.y;return}}};
A.ejectPlayer=()=>{if(A.scene!=='world')return;for(const r of bodies)if(bodyHit(P.x,P.y,r)){nearestExit(r);return}if(water(P.x,P.y)){P.x=P.x<1300?1174:1426}};
A.ejectPlayer();
const base=A.upd;
A.upd=dt=>{const world=A.scene==='world',ox=P.x,oy=P.y;base(dt);if(!world)return;const nx=P.x,ny=P.y;if(!A.solidAt(nx,ny))return;P.x=ox;P.y=oy;if(!A.solidAt(nx,oy))P.x=nx;else if(!A.solidAt(ox,ny))P.y=ny;A.cx=A.cl(P.x-A.vw/2,0,Math.max(0,A.W.w-A.vw));A.cy=A.cl(P.y-A.vh/2,0,Math.max(0,A.W.h-A.vh))};
})();
