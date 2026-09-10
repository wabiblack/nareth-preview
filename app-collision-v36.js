(()=>{const A=window.NARETH,P=A.P;
const rects=[
  [385,175,815,458,'han'],
  [875,255,1215,500,'demirci'],
  [845,585,1145,770,'pazar'],
  [78,312,315,462,'ev']
];
const inside=(x,y,r)=>x>r[0]&&x<r[2]&&y>r[1]&&y<r[3];
const water=(x,y)=>x>1170&&x<1425&&!(y>470&&y<598);
A.solidAt=(x,y)=>rects.some(r=>inside(x,y,r))||water(x,y);
const ejectRect=(r)=>{let x=P.x,y=P.y,ds=[Math.abs(x-r[0]),Math.abs(r[2]-x),Math.abs(y-r[1]),Math.abs(r[3]-y)],m=Math.min(...ds),pad=10;if(m===ds[0])P.x=r[0]-pad;else if(m===ds[1])P.x=r[2]+pad;else if(m===ds[2])P.y=r[1]-pad;else P.y=r[3]+pad};
A.ejectPlayer=()=>{if(A.scene!=='world')return;for(const r of rects)if(inside(P.x,P.y,r)){ejectRect(r);break}if(water(P.x,P.y)){if(P.x<1297)P.x=1160;else P.x=1435}};
A.ejectPlayer();
const base=A.upd;
A.upd=dt=>{let world=A.scene==='world',ox=P.x,oy=P.y;base(dt);if(!world)return;if(!A.solidAt(P.x,P.y))return;let nx=P.x,ny=P.y;P.x=ox;P.y=oy;if(!A.solidAt(nx,oy))P.x=nx;else if(!A.solidAt(ox,ny))P.y=ny;else{P.x=ox;P.y=oy}A.cx=A.cl(P.x-A.vw/2,0,Math.max(0,A.W.w-A.vw));A.cy=A.cl(P.y-A.vh/2,0,Math.max(0,A.W.h-A.vh))};
})();
