const TTL=180*86400000;
export function readCookie(cookies,name){const value=cookies.split(';').map(x=>x.trim()).find(x=>x.startsWith(name+'='));return value?value.slice(name.length+1):null;}
export function consentFrom(cookies,now=Date.now()){const [choice,expiry]=(readCookie(cookies,'tuxfall_consent')||'').split('.');const until=Number(expiry);return ['yes','no'].includes(choice)&&Number.isFinite(until)&&until>now&&until<=now+TTL+60000?{choice,until}:null;}
export function bestFrom(cookies,consent){if(consent?.choice!=='yes')return 0;const raw=readCookie(cookies,'tuxfall_best');return /^\d{1,12}$/.test(raw||'')?Number(raw):0;}
export function createPersistence(doc,location,now=()=>Date.now()){
 const path=new URL('.',location.href).pathname;
 const flags=`; Path=${path}; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`;
 const cookies=()=>{try{return doc.cookie;}catch{return '';}};
 const write=(name,value,until)=>{try{doc.cookie=`${name}=${value}; Expires=${new Date(until).toUTCString()}${flags}`;}catch{}};
 let consent=consentFrom(cookies(),now());
 const remove=()=>write('tuxfall_best','',0);
 if(consent?.choice!=='yes')remove();
 return {
  get consent(){return consent;},
  readBest(){return bestFrom(cookies(),consent);},
  choose(allowed){consent={choice:allowed?'yes':'no',until:now()+TTL};write('tuxfall_consent',`${consent.choice}.${consent.until}`,consent.until);if(!allowed)remove();},
  saveBest(score){if(consent?.choice==='yes'&&consent.until>now()){write('tuxfall_best',String(Math.floor(score)),consent.until);return bestFrom(cookies(),consent)===Math.floor(score);}return false;},
 };
}
