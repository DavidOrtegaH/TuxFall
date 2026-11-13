export const CONSENT_DAYS=720,COOKIE_DAYS=400;
const DAY=86400000,CONSENT_TTL=CONSENT_DAYS*DAY,COOKIE_TTL=COOKIE_DAYS*DAY;
const RECORD_KEY='tuxfall_record_v2',PREFERENCE_KEY='tuxfall_consent_v2';
export function readCookie(cookies,name){const value=cookies.split(';').map(x=>x.trim()).find(x=>x.startsWith(name+'='));return value?value.slice(name.length+1):null;}
function parseConsent(raw,now){const [version,choice,expiry]=(raw||'').split('.');const until=Number(expiry);return version==='v2'&&['yes','no'].includes(choice)&&Number.isFinite(until)&&until>now&&until<=now+CONSENT_TTL+60000?{choice,until}:null;}
export const consentFrom=(cookies,now=Date.now())=>parseConsent(readCookie(cookies,'tuxfall_consent'),now);
const numericScore=raw=>/^\d{1,12}$/.test(raw||'')?Number(raw):0;
export function bestFrom(cookies,consent){return consent?.choice==='yes'?numericScore(readCookie(cookies,'tuxfall_best')):0;}

export function createPersistence(doc,location,now=()=>Date.now(),local=null){
 const path=new URL('.',location.href).pathname;
 const flags=`; Path=${path}; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`;
 const cookies=()=>{try{return doc.cookie;}catch{return '';}};
 const get=key=>{try{return local?.getItem(key)??null;}catch{return null;}};
 const put=(key,value)=>{try{local?.setItem(key,value);}catch{}};
 const forget=key=>{try{local?.removeItem(key);}catch{}};
 const write=(name,value,until)=>{try{doc.cookie=`${name}=${value}; Expires=${new Date(until).toUTCString()}${flags}`;}catch{}};
 let consent=parseConsent(get(PREFERENCE_KEY),now())||consentFrom(cookies(),now());
 const currentConsent=()=>{const latest=parseConsent(get(PREFERENCE_KEY),now())||consentFrom(cookies(),now());if(latest)consent=latest;return consent?.until>now()?consent:null;};
 function rememberChoice(){if(!consent||consent.until<=now())return;const raw=`v2.${consent.choice}.${consent.until}`;put(PREFERENCE_KEY,raw);write('tuxfall_consent',raw,Math.min(now()+COOKIE_TTL,consent.until));}
 function readBest(){return currentConsent()?.choice==='yes'?Math.max(numericScore(get(RECORD_KEY)),bestFrom(cookies(),consent)):0;}
 function saveBest(score){
  if(currentConsent()?.choice!=='yes'||!Number.isSafeInteger(score)||score<0||score>999999999999)return false;
  const best=Math.max(score,readBest());put(RECORD_KEY,String(best));
  write('tuxfall_best',String(best),Math.min(now()+COOKIE_TTL,consent.until));
  return numericScore(get(RECORD_KEY))===best&&get(RECORD_KEY)!==null||readCookie(cookies(),'tuxfall_best')===String(best);
 }
 // Renew cookie lifetimes, never the deadline of the consent decision itself.
 if(currentConsent()){rememberChoice();if(consent.choice==='yes')saveBest(readBest());}
 else if(get(PREFERENCE_KEY)!==null)forget(PREFERENCE_KEY);
 return {
  get consent(){return currentConsent();},readBest,saveBest,
  choose(allowed){
   consent={choice:allowed?'yes':'no',until:now()+CONSENT_TTL};rememberChoice();
   if(!allowed){forget(RECORD_KEY);write('tuxfall_best','',0);}
  },
 };
}
