(()=>{const A=window.NARETH,P=A.P,g=A.g;
A.hudPlayer=()=>A.scene==='inn'?{x:A.ip.x,y:A.ip.y}:{x:P.x-A.cx,y:P.y-A.cy};
A.panelAlpha=(x,y,w,h)=>{let p=A.hudPlayer(),pad=52,hit=p.x>=x-pad&&p.x<=x+w+pad&&p.y>=y-pad&&p.y<=y+h+pad;return hit ? .20 : .94};
A.drawHudPanel=(x,y,w,h,fn)=>{g.save();g.globalAlpha=A.panelAlpha(x,y,w,h);A.box(x,y,w,h,'rgba(28,24,20,.88)','#7f674a');fn();g.restore()};
A.actionState=()=>{let txt='ETKİLEŞ',active=false;
 if(A.scene==='inn'){
  if(A.atInnBed&&A.atInnBed())return{txt:P.room?'UYU':'YATAK',active:true};
  if(A.atInnStage&&A.atInnStage()){let done=P.sk.music?P.lastGigDay===A.T.day:P.lastListenDay===A.T.day;return{txt:done?'BİTTİ':P.sk.music?'SAHNE':'DİNLE',active:true}};
  if(A.atInnExit&&A.atInnExit())return{txt:'ÇIK',active:true};
  let[n,d]=A.near();return{txt:'ETKİLEŞ',active:!!(n&&d<=115)};
 }
 if(A.atInnDoor&&A.atInnDoor())return{txt:A.T.min/60>=6?'GİR':'KAPALI',active:true};
 if(A.nearShop){let[r,d]=A.nearShop();if(r&&d<=82)return{txt:A.shop&&A.shop.owned?'TEZGAH':'KİRALA',active:true}}
 if(A.nearFarmPlot){let[r,d]=A.nearFarmPlot();if(r&&d<=78)return{txt:A.farmActionLabel?A.farmActionLabel(r.p):'TARIM',active:true}}
 if(A.nearFishSpot){let[r,d]=A.nearFishSpot();if(r&&d<=74)return{txt:A.fishActionLabel?A.fishActionLabel():'OLTA AT',active:true}}
 if(A.nearSmithForge){let[r,d]=A.nearSmithForge();if(r&&d<=76)return{txt:A.smithActionLabel?A.smithActionLabel():'ÖRS',active:true}}
 let[n,d]=A.near();return{txt,active:!!(n&&d<=130)};
};
A.hud=()=>{let loc=A.scene==='inn'?'Karaova Hanı':'Karaova',skills=Object.values(P.sk).filter(Boolean).length,cnt=id=>A.inv?A.inv.count(id):(P.bag[id]||0),left={x:12,y:10,w:238,h:70},right={x:A.vw-262,y:10,w:250,h:82};
 A.drawHudPanel(left.x,left.y,left.w,left.h,()=>{g.textAlign='left';g.textBaseline='alphabetic';g.font='700 20px Georgia';g.fillStyle='#e8d3a8';g.fillText('NARETH',26,35);g.font='11px sans-serif';g.fillStyle='#d2bf9e';g.fillText(`YS 327 • Gün ${A.T.day} • ${A.time()}`,26,53);g.fillStyle='#b9aa8d';g.fillText(`${loc} • ${P.m} sikke`,26,69)});
 A.drawHudPanel(right.x,right.y,right.w,right.h,()=>{let x=right.x+14;g.textAlign='left';g.textBaseline='alphabetic';g.font='700 10px sans-serif';g.fillStyle='#d8c39d';g.fillText(`TAHIL ${cnt('grain')}  •  BALIK ${cnt('fish')}`,x,27);g.font='10px sans-serif';g.fillStyle='#d7cbb8';g.fillText(`DEMİR ${cnt('iron')}  •  ALET ${cnt('tools')}`,x,43);g.fillStyle='#f0dfbd';g.fillText(`BECERİ ${skills}/4  •  ÜN ${P.fame||0}`,x,59);let extra=A.shop&&A.shop.owned?`KASA ${A.shop.cash} • ${A.shop.worker?(A.shop.workerName||'ÇALIŞAN'):'SEN'}`:P.room?'ODA ANAHTARI ✓':`VAREN ${P.rel.Varen||0}/${A.M.Varen?A.M.Varen[2]:4}`;g.fillStyle='#b9aa8d';g.fillText(extra,x,75)});
 if(!A.dlg){let bx=92,by=A.vh-92,ax=A.vw-90,ay=A.vh-92,p=A.hudPlayer(),joyFade=A.ds(p.x,p.y,bx,by)<110 ? .32 : 1,actFade=A.ds(p.x,p.y,ax,ay)<105 ? .32 : 1,state=A.actionState();g.save();g.globalAlpha=joyFade;g.beginPath();g.arc(bx,by,61,0,7);g.fillStyle='rgba(23,20,17,.5)';g.fill();g.beginPath();g.arc(bx+A.st.x,by+A.st.y,27,0,7);g.fillStyle='rgba(192,167,124,.55)';g.fill();g.restore();g.save();g.globalAlpha=actFade;g.beginPath();g.arc(ax,ay,47,0,7);g.fillStyle=state.active?'rgba(117,82,53,.96)':'rgba(94,68,50,.9)';g.fill();A.lab(state.txt,ax,ay+4,12);g.restore()}
 if(performance.now()<A.toastT&&!A.dlg){g.font='600 14px sans-serif';let w=Math.min(A.vw-40,g.measureText(A.toast).width+34);A.box(A.vw/2-w/2,A.vh-58,w,38,'rgba(36,30,24,.94)','#6f5d49');g.fillStyle='#f4e5c5';g.textAlign='center';g.textBaseline='middle';g.fillText(A.toast,A.vw/2,A.vh-35)}
 A.drawDlg();
};
})();
