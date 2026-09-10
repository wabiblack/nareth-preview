(()=>{const A=window.NARETH,P=A.P;
const blocks=[
  {n:'han-sol',x1:434,y1:406,x2:566,y2:476},{n:'han-sag',x1:634,y1:406,x2:766,y2:476},{n:'han-arka',x1:566,y1:406,x2:634,y2:438},
  {n:'demirci-sol',x1:914,y1:442,x2:1018,y2:505},{n:'demirci-sag',x1:1072,y1:442,x2:1176,y2:505},{n:'demirci-arka',x1:1018,y1:442,x2:1072,y2:466},
  {n:'pazar',x1:890,y1:664,x2:1118,y2:714},
  {n:'ev-sol',x1:108,y1:392,x2:180,y2:452},{n:'ev-sag',x1:220,y1:392,x2:282,y2:452},{n:'ev-arka',x1:180,y1:392,x2:220,y2:418}
];
const inside=(x,y,r)=>x>r.x1&&x<r.x2&&y>r.y1&&y<r.y2;
const waterPoint=(x,y)=>x>1182&&x<1418&&!(y>474&&y<596);
const pointSolid=(x,y)=>blocks.some(r=>inside(x,y,r))||waterPoint(x,y);
A.solidAt=(x,y)=>pointSolid(x,y);
A.footBlocked=(x,y)=>[[0,0],[-7,-4],[7,-4],[-7,4],[7,4]].some(p=>pointSolid(x+p[0],y+p[1]));
const eject=()=>{if(A.scene!=='world')return;let guard=0;while(A.footBlocked(P.x,P.y)&&guard++<90){const tries=[[0,6],[0,-6],[6,0],[-6,0]];let moved=false;for(const [dx,dy] of tries){if(!A.footBlocked(P.x+dx,P.y+dy)){P.x+=dx;P.y+=dy;moved=true;break}}if(!moved){P.y+=6}}};
eject();
const base=A.upd;
A.upd=dt=>{const world=A.scene==='world',ox=P.x,oy=P.y;base(dt);if(!world)return;const nx=P.x,ny=P.y;if(!A.footBlocked(nx,ny))return;P.x=ox;P.y=oy;if(!A.footBlocked(nx,oy))P.x=nx;else if(!A.footBlocked(ox,ny))P.y=ny;A.cx=A.cl(P.x-A.vw/2,0,Math.max(0,A.W.w-A.vw));A.cy=A.cl(P.y-A.vh/2,0,Math.max(0,A.W.h-A.vh))};
})();