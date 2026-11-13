export const SOUND_PATTERNS={
 lane:{notes:[720],endFrequency:420,spacing:0,duration:.095,wave:'triangle',peak:.8},
 record:{notes:[784,988,1318],spacing:.09,duration:.11,wave:'square',peak:.35},
 milestone:{notes:[784,1047],spacing:.13,duration:.22,wave:'sine',peak:.85}
};
export function createSoundEngine({AudioContextClass=globalThis.AudioContext??globalThis.webkitAudioContext,initialEnabled=false}={}){
 let context=null,master=null,enabled=initialEnabled,failed=false,generation=0;
 const active=new Set(),supported=()=>typeof AudioContextClass==='function'&&!failed;
 async function unlock(){
  if(!enabled||!supported())return false;
  if(!context){try{context=new AudioContextClass();master=context.createGain();master.gain.value=.22;master.connect(context.destination);}catch{failed=true;return false;}}
  try{if(context.state==='suspended')await context.resume();return context.state==='running';}catch{return false;}
 }
 function stop(){
  generation++;
  if(!context||!master)return;
  const now=context.currentTime;
  try{master.gain.cancelScheduledValues(now);master.gain.setValueAtTime(master.gain.value,now);master.gain.linearRampToValueAtTime(0,now+.008);}catch{}
  for(const oscillator of active)try{oscillator.stop(now+.008);}catch{}
  active.clear();
 }
 async function play(effect,delay=0){
  const pattern=SOUND_PATTERNS[effect],token=generation;
  if(!pattern||!enabled||!await unlock()||!enabled||token!==generation)return false;
  try{
   const now=context.currentTime;master.gain.cancelScheduledValues(now);master.gain.setValueAtTime(.22,now);
   pattern.notes.forEach((frequency,index)=>{
    const start=now+.005+Math.max(0,delay)+index*pattern.spacing,oscillator=context.createOscillator(),gain=context.createGain();
    oscillator.type=pattern.wave;oscillator.frequency.setValueAtTime(frequency,start);
    if(pattern.endFrequency)oscillator.frequency.exponentialRampToValueAtTime(pattern.endFrequency,start+pattern.duration);
    gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(pattern.peak,start+.004);gain.gain.exponentialRampToValueAtTime(.0001,start+pattern.duration);
    oscillator.connect(gain);gain.connect(master);active.add(oscillator);
    oscillator.onended=()=>{active.delete(oscillator);oscillator.disconnect();gain.disconnect();};
    oscillator.start(start);oscillator.stop(start+pattern.duration+.01);
   });return true;
  }catch{return false;}
 }
 return {get supported(){return supported();},get enabled(){return enabled&&supported();},unlock,play,stop,
  setEnabled(value){enabled=Boolean(value)&&supported();stop();if(enabled)void unlock();return enabled;}
 };
}
