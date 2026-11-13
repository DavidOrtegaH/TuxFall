import {readCookie} from './persistence.js';
export const SOUND_KEY='tuxfall_sound';
export function createSoundPreference(doc,location,now=()=>Date.now()){
 const path=new URL('.',location.href).pathname;
 let value=false,explicit=false;
 try{const saved=readCookie(doc.cookie,SOUND_KEY);explicit=saved==='on'||saved==='off';value=saved==='on';}catch{}
 function remember(){try{doc.cookie=`${SOUND_KEY}=${value?'on':'off'}; Max-Age=34560000; Expires=${new Date(now()+400*86400000).toUTCString()}; Path=${path}; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`;}catch{}}
 if(explicit)remember();
 return {get value(){return value;},set(next){value=Boolean(next);remember();}};
}
