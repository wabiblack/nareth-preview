(()=>{const A=window.NARETH,P=A.P,T=A.T,g=A.g,ROOM_KEY='nareth-preview-room-v1';
try{P.room=localStorage.getItem(ROOM_KEY)==='1'?1:0}catch(_){P.room=0}
A.saveRoom=()=>{try{localStorage.setItem(ROOM_KEY,P.room?'1':'0')}catch(_){}};
A.roomBed=()=>[A.vw*.82,A.vh*.68];
A.atInnBed=()=>{if(A.scene!=='inn')return false;let b=A.roomBed();return A.ds(A.ip.x,A.ip.y,b[0],b[1])<=82};
A.rentRoom=()=>{if(!A.dlg||A.dlg.n.n!=='Mira')return;if(A.scene!=='inn'){A.dlg.t='Oda işini handa konuşalım. Tezgâha uğra.';return}if(P.room){A.dlg.t='Odan hazır. Anahtar sende. Sağ taraftaki yatakta uyuyabilirsin.';return}if(P.m<3){A.dlg.t='Oda gecelik 3 sikke. Sende yeterli para yok.';return}P.m-=3;P.room=1;A.save();A.saveRoom();A.dlg.t='3 sikkeye bir oda tuttun. Anahtar sende. Sağ taraftaki yatak artık senin.';A.toast='Oda kiralandı • -3 sikke';A.toastT=performance.now()+2200};
A.sleepInn=()=>{if(!P.room){A.toast='Önce Mira’dan oda kiralamalısın.';A.toastT=performance.now()+2200;return}let delta=(1440-T.min)+420;A.adv(delta);P.room=0;A.save();A.saveRoom();let b=A.roomBed();A.ip.x=b[0];A.ip.y=b[1]+72;A.dlg=null;A.st.id=null;A.st.x=A.st.y=0;A.toast=`Uyandın • Gün ${T.day} • 07:00`;A.toastT=performance.now()+2600};
const baseButtons=A.buttons;
A.buttons=()=>{let R=baseButtons(),n=A.dlg&&A.dlg.n;if(!n||n.n!=='Mira')return R;let [x,y0,w,h0,B]=R,y=y0-42,h=h0+42;B.push(['room',P.room?'ODA ANAHTARI ✓':'ODA KİRALA • 3',x+16,y0+82,w-32,33]);return[x,y,w,h,B]};
const baseTap=A.tap;
A.tap=p=>{if(A.dlg){let B=A.buttons()[4];for(const b of B){if(b[0]==='room'&&p.x>=b[2]&&p.x<=b[2]+b[4]&&p.y>=b[3]&&p.y<=b[3]+b[5]){A.rentRoom();return}}}baseTap(p)};
const baseInteract=A.interact;
A.interact=()=>{if(A.scene==='inn'&&A.atInnBed()){A.sleepInn();return}baseInteract()};
const baseInn=A.inn;
A.inn=()=>{baseInn();let w=A.vw,h=A.vh,b=A.roomBed(),rx=w*.70,ry=h*.55,rw=w*.24,rh=h*.27;g.fillStyle='rgba(31,23,19,.92)';g.fillRect(rx,ry,rw,rh);g.strokeStyle='#806348';g.lineWidth=3;g.strokeRect(rx,ry,rw,rh);g.fillStyle='#4c382b';g.fillRect(rx+14,ry+14,rw-28,rh-28);g.fillStyle='#2c211b';g.fillRect(b[0]-52,b[1]-28,104,62);g.fillStyle=P.room?'#8a6b4d':'#68523f';g.fillRect(b[0]-44,b[1]-20,88,48);g.fillStyle='#c0a57a';g.fillRect(b[0]-38,b[1]-15,76,15);A.lab(P.room?'SENİN ODAN':'KİRALIK ODA',b[0],ry+4,10,P.room?'#f0d29b':'#baa98e');A.lab('YATAK',b[0],b[1]+40,10,'#d8c19a');if(A.atInnBed()){g.fillStyle='rgba(224,199,150,.17)';g.beginPath();g.arc(b[0],b[1],64,0,7);g.fill()}};
const baseHud=A.hud;
A.hud=()=>{baseHud();if(P.room&&!A.dlg){A.box(A.vw-218,108,202,28,'rgba(28,24,20,.9)','#7f674a');A.lab('Oda anahtarı ✓',A.vw-117,123,11,'#efd5a2')}if(A.scene==='inn'&&!A.dlg&&A.atInnBed()){let ax=A.vw-90,ay=A.vh-92;g.beginPath();g.arc(ax,ay,47,0,7);g.fillStyle=P.room?'rgba(74,98,58,.96)':'rgba(94,68,50,.92)';g.fill();g.strokeStyle=P.room?'#b7d28f':'#b39168';g.lineWidth=2;g.stroke();A.lab(P.room?'UYU':'YATAK',ax,ay+4,12,P.room?'#f1e3c1':'#d6c2a2')}};
})();