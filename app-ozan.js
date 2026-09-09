(()=>{const A=window.NARETH,g=A.g;
const baseGuests=A.innGuests,baseSpot=A.innSpot;
A.innGuests=()=>{let list=baseGuests();let v=A.N.find(n=>n.n==='Varen');if(v&&v.hidden&&v.insideAt==='i'&&(v.a==='Hana hazırlanıyor'||v.a==='Sahnede çalıyor')&&!list.includes(v))list.push(v);return list};
A.innSpot=n=>n.n==='Varen'?[A.vw*.34,Math.max(154,Math.min(A.vh*.38,188))]:baseSpot(n);
const baseInn=A.inn;
A.inn=()=>{baseInn();let v=A.innGuests().find(n=>n.n==='Varen');if(!v)return;let p=A.innSpot(v),x=p[0]+19,y=p[1]+8;g.save();g.strokeStyle='#d2b47d';g.lineWidth=3;g.beginPath();g.moveTo(x+5,y-20);g.lineTo(x+22,y-48);g.stroke();g.fillStyle='#8b633f';g.beginPath();g.ellipse(x,y,10,15,.2,0,Math.PI*2);g.fill();g.strokeStyle='#d5bd8e';g.lineWidth=1;g.beginPath();g.moveTo(x-4,y-10);g.lineTo(x+16,y-42);g.moveTo(x,y-8);g.lineTo(x+19,y-40);g.stroke();g.restore()};
})();