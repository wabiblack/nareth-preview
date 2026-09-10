(()=>{const A=window.NARETH,P=A.P,N=A.N;
const choose=(dx,dy,last='down')=>{if(Math.abs(dx)<.02&&Math.abs(dy)<.02)return last;if(Math.abs(dx)>=Math.abs(dy))return dx>=0?'right':'left';return dy>=0?'down':'up'};
P.dir=P.dir||'down';P.anim=P.anim||1;P.animClock=0;
N.forEach((n,i)=>{n.dir=n.dir||'down';n.anim=1;n.animClock=i*.07});
const baseMoveN=A.moveN;
A.moveN=dt=>{const before=N.map(n=>[n.x,n.y]);baseMoveN(dt);N.forEach((n,i)=>{if(n.hidden)return;const dx=n.x-before[i][0],dy=n.y-before[i][1],m=Math.hypot(dx,dy);if(m>.02){n.dir=choose(dx,dy,n.dir);n.animClock+=dt;n.anim=Math.floor(n.animClock*6)%3}else n.anim=1})};
const baseUpd=A.upd;
A.upd=dt=>{const world=A.scene==='world',bx=world?P.x:A.ip.x,by=world?P.y:A.ip.y;baseUpd(dt);const ax=world?P.x:A.ip.x,ay=world?P.y:A.ip.y,dx=ax-bx,dy=ay-by,m=Math.hypot(dx,dy);if(m>.02){P.dir=choose(dx,dy,P.dir);P.animClock+=dt;P.anim=Math.floor(P.animClock*7)%3}else P.anim=1};
})();