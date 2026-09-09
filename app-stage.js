(()=>{const A=window.NARETH,P=A.P,T=A.T,g=A.g,STAGE_KEY='nareth-preview-stage-v1';
P.fame=0;P.lastGigDay=0;
try{let s=JSON.parse(localStorage.getItem(STAGE_KEY)||'null');if(s){if(Number.isFinite(s.fame))P.fame=s.fame;if(Number.isFinite(s.lastGigDay))P.lastGigDay=s.lastGigDay}}catch(_){}
A.saveStage=()=>{try{localStorage.setItem(STAGE_KEY,JSON.stringify({fame:P.fame,lastGigDay:P.lastGigDay}))}catch(_){}};
A.stageSpot=()=>[A.vw*.195,Math.max(155,Math.min(A.vh*.45,205))];
A.atInnStage=()=>{if(A.scene!=='inn')return false;let s=A.stageSpot();return A.ds(A.ip.x,A.ip.y,s[0],s[1])<=92};
A.stageHours=()=>{let h=T.min/60;return h>=18&&h<22};
A.miraAtInn=()=>A.innGuests().some(n=>n.n==='Mira');
A.performStage=()=>{if(P.lastGigDay===T.day){A.toast='Bugün sahneye çıktın. Yarın yeniden çalabilirsin.';A.toastT=performance.now()+2200;return}if(!A.stageHours()){A.toast='Sahne 18:00–22:00 arasında açık.';A.toastT=performance.now()+2200;return}if(!A.miraAtInn()){A.toast='Mira handa değil. Sahneyi onsuz açamazsın.';A.toastT=performance.now()+2200;return}let skilled=!!P.sk.music,pay=skilled?7+Math.min(4,Math.floor(P.fame/5)):3,fameGain=skilled?2:1,mins=skilled?120:90;P.lastGigDay=T.day;P.m+=pay;P.fame+=fameGain;P.rel.Mira+=1;A.adv(mins);A.save();A.saveStage();let unlock=!P.sk.music&&P.rel.Mira>=A.M.Mira[2];A.toast=unlock?`Sahne tamamlandı • +${pay} sikke • Ün +${fameGain} • Mira güven ${P.rel.Mira}/${A.M.Mira[2]} • Müzisyenlik açıldı`:`Sahne tamamlandı • +${pay} sikke • Ün +${fameGain} • Mira güven +1`;A.toastT=performance.now()+3200};
const baseInteract=A.interact;
A.interact=()=>{if(A.scene==='inn'&&A.atInnStage()){A.performStage();return}baseInteract()};
const baseInn=A.inn;
A.inn=()=>{baseInn();let s=A.stageSpot(),x=s[0],y=s[1],done=P.lastGigDay===T.day,open=A.stageHours()&&A.miraAtInn();g.fillStyle=done?'rgba(58,49,40,.34)':open?'rgba(198,151,79,.13)':'rgba(42,34,29,.28)';g.beginPath();g.arc(x,y,68,0,7);g.fill();g.strokeStyle=done?'#75695a':open?'#b7925d':'#66584b';g.lineWidth=2;g.beginPath();g.arc(x,y,54,0,7);g.stroke();A.lab(P.sk.music?'CANLI SAHNE':'AÇIK SAHNE',x,y-54,11,open?'#f0d29b':'#b8a58c');A.lab(done?'BUGÜN TAMAMLANDI':'18:00–22:00',x,y+55,9,done?'#a99d8c':'#c7b28f');if(A.atInnStage()){g.fillStyle='rgba(224,199,150,.16)';g.beginPath();g.arc(x,y,76,0,7);g.fill()}};
const baseHud=A.hud;
A.hud=()=>{baseHud();let fy=P.room?142:108;A.box(A.vw-218,fy,202,28,'rgba(28,24,20,.9)','#7f674a');A.lab(`Ün ${P.fame} • ${P.sk.music?'Müzisyen':'Çaylak'}`,A.vw-117,fy+15,11,'#efd5a2');if(A.scene==='inn'&&!A.dlg&&A.atInnStage()){let ax=A.vw-90,ay=A.vh-92,done=P.lastGigDay===T.day,open=A.stageHours()&&A.miraAtInn()&&!done;g.beginPath();g.arc(ax,ay,47,0,7);g.fillStyle=open?'rgba(102,79,48,.97)':'rgba(70,62,52,.94)';g.fill();g.strokeStyle=open?'#d0ac70':'#847768';g.lineWidth=2;g.stroke();A.lab(done?'BİTTİ':'SAHNE',ax,ay+4,12,open?'#f3dfb7':'#c4b7a4')}};
})();