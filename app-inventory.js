(()=>{const A=window.NARETH,P=A.P,INV_KEY='nareth-preview-inventory-v1';
A.items={
 grain:{id:'grain',name:'Tahıl çuvalı',type:'ürün',stack:20,base:3},
 fish:{id:'fish',name:'Nehir balığı',type:'yiyecek',stack:20,base:2},
 iron:{id:'iron',name:'Ham demir',type:'malzeme',stack:20,base:3},
 tools:{id:'tools',name:'Basit alet',type:'alet',stack:10,base:8}
};
Object.keys(A.items).forEach(id=>{if(!Number.isFinite(P.bag[id]))P.bag[id]=0});
A.inv={
 count:id=>Math.max(0,Math.floor(Number(P.bag[id])||0)),
 has:(id,n=1)=>A.inv.count(id)>=n,
 add:(id,n=1)=>{if(!A.items[id]||!Number.isFinite(n)||n<=0)return false;P.bag[id]=A.inv.count(id)+Math.floor(n);A.inv.save();return true},
 remove:(id,n=1)=>{n=Math.max(1,Math.floor(Number(n)||1));if(!A.items[id]||!A.inv.has(id,n))return false;P.bag[id]=A.inv.count(id)-n;A.inv.save();return true},
 set:(id,n=0)=>{if(!A.items[id])return false;P.bag[id]=Math.max(0,Math.floor(Number(n)||0));A.inv.save();return true},
 entries:()=>Object.keys(A.items).map(id=>({item:A.items[id],count:A.inv.count(id)})).filter(x=>x.count>0),
 total:()=>Object.keys(A.items).reduce((s,id)=>s+A.inv.count(id),0),
 save:()=>{try{let items={};Object.keys(A.items).forEach(id=>items[id]=A.inv.count(id));localStorage.setItem(INV_KEY,JSON.stringify({version:1,items}))}catch(_){} }
};
try{let s=JSON.parse(localStorage.getItem(INV_KEY)||'null');if(s&&s.items){Object.keys(A.items).forEach(id=>{if(Number.isFinite(s.items[id]))P.bag[id]=Math.max(0,Math.floor(s.items[id]))})}else A.inv.save()}catch(_){A.inv.save()}
const baseSave=A.save;A.save=()=>{baseSave();A.inv.save()};
A.itemName=id=>A.items[id]?A.items[id].name:id;
A.inventoryText=()=>{let e=A.inv.entries();return e.length?e.map(x=>`${x.item.name} x${x.count}`).join(' • '):'Çanta boş'};
addEventListener('pagehide',()=>A.inv.save());
})();
