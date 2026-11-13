import {readCookie} from './persistence.js';
export const LANGUAGE_KEY='tuxfall_language';
const valid=value=>value==='es'||value==='en';
export function createLanguagePreference(doc,location,local=null,now=()=>Date.now()){
 const path=new URL('.',location.href).pathname;let language='es';
 const get=()=>{try{return local?.getItem(LANGUAGE_KEY);}catch{return null;}};
 const cookie=()=>{try{return readCookie(doc.cookie,LANGUAGE_KEY);}catch{return null;}};
 function remember(){try{doc.cookie=`${LANGUAGE_KEY}=${language}; Expires=${new Date(now()+400*86400000).toUTCString()}; Path=${path}; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`;}catch{}try{local?.setItem(LANGUAGE_KEY,language);}catch{}}
 function refresh(){const saved=cookie(),backup=get();language=valid(saved)?saved:valid(backup)?backup:'es';if(valid(saved)||valid(backup))remember();return language;}
 refresh();
 return {get value(){return language;},refresh,set(value){if(!valid(value))return false;language=value;remember();return true;}};
}
