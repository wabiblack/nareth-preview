(()=>{
const A=window.NARETH,P=A.P,g=A.g;
A.hud=()=>{
  let loc=A.scene==='inn'?'Karaova Hanı':A.scene==='home'?'Kendi Evin':'Karaova',
      skills=Object.values(P.sk).filter(Boolean).length,
      cnt=id=>A.inv?A.inv.count(id):(P.bag[id]||0),
      left={x:10,y:9,w:214,h:62},
      right={x:A.vw-232,y:9,w:222,h:72};

  A.drawHudPanel(left.x,left.y,left.w,left.h,()=>{
    g.textAlign='left';g.textBaseline='alphabetic';
    g.font='700 18px Georgia';g.fillStyle='#ead4a8';g.fillText('NARETH',23,32);
    g.font='10px sans-serif';g.fillStyle='#d2c09f';g.fillText(`YS 327 • Gün ${A.T.day} • ${A.time()}`,23,49);
    g.fillStyle='#b8a98c';g.fillText(`${loc} • ${P.m} sikke`,23,64);
  });

  A.drawHudPanel(right.x,right.y,right.w,right.h,()=>{
    let x=right.x+12;g.textAlign='left';g.textBaseline='alphabetic';
    g.font='700 9px sans-serif';g.fillStyle='#d9c59e';g.fillText(`TAHIL ${cnt('grain')}  •  BALIK ${cnt('fish')}`,x,24);
    g.font='9px sans-serif';g.fillStyle='#d8cdb9';g.fillText(`DEMİR ${cnt('iron')}  •  ALET ${cnt('tools')}`,x,39);
    g.fillStyle='#f0dfbd';g.fillText(`BECERİ ${skills}/4  •  ÜN ${P.fame||0}`,x,54);
    let up=A.homeUpgrades?A.homeUpgrades.chest+A.homeUpgrades.bench+A.homeUpgrades.garden:0,
        extra=A.scene==='home'&&A.home&&A.home.owned?`EV GELİŞİM ${up}/3`
        :A.shop&&A.shop.owned?`KASA ${A.shop.cash} • ${A.shop.worker?(A.shop.workerName||'ÇALIŞAN'):'SEN'}`
        :A.home&&A.home.owned?'EV SAHİBİ ✓':P.room?'ODA ANAHTARI ✓':`VAREN ${P.rel.Varen||0}/${A.M.Varen?A.M.Varen[2]:4}`;
    g.fillStyle='#b9aa8d';g.fillText(extra,x,68);
  });

  if(!A.dlg){
    let bx=92,by=A.vh-92,ax=A.vw-90,ay=A.vh-92,p=A.hudPlayer(),
        joyFade=A.ds(p.x,p.y,bx,by)<110?.28:1,
        actFade=A.ds(p.x,p.y,ax,ay)<105?.28:1,
        state=A.actionState();
    g.save();g.globalAlpha=joyFade;
    g.beginPath();g.arc(bx,by,54,0,7);g.fillStyle='rgba(20,18,16,.46)';g.fill();
    g.strokeStyle='rgba(190,165,122,.20)';g.lineWidth=2;g.stroke();
    g.beginPath();g.arc(bx+A.st.x,by+A.st.y,24,0,7);g.fillStyle='rgba(193,169,126,.52)';g.fill();g.restore();

    g.save();g.globalAlpha=actFade;
    g.beginPath();g.arc(ax,ay,43,0,7);g.fillStyle=state.active?'rgba(113,78,51,.94)':'rgba(83,62,47,.86)';g.fill();
    g.strokeStyle=state.active?'rgba(235,198,137,.48)':'rgba(176,148,107,.22)';g.lineWidth=2;g.stroke();
    A.lab(state.txt,ax,ay+3,11);g.restore();
  }

  if(performance.now()<A.toastT&&!A.dlg){
    g.font='600 12px sans-serif';let w=Math.min(A.vw-40,g.measureText(A.toast).width+30);
    A.box(A.vw/2-w/2,A.vh-52,w,32,'rgba(32,27,23,.93)','#685846');
    g.fillStyle='#f3e4c4';g.textAlign='center';g.textBaseline='middle';g.fillText(A.toast,A.vw/2,A.vh-32);
  }
  A.drawDlg();
};
})();