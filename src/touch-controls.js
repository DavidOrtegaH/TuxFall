export function bindTouchControls({left,right,boost,isPlaying,move,setBoost}){
 const held=new Set();
 const update=()=>setBoost(isPlaying()&&held.size>0);
 for(const [button,direction] of [[left,-1],[right,1]]){
  button.addEventListener('pointerdown',event=>{
   if(event.button!==0||!isPlaying())return;
   event.preventDefault();move(direction);
  });
  // Pointer activations were already handled on press; keyboard/AT clicks have detail 0.
  button.addEventListener('click',event=>{if(event.detail===0&&isPlaying())move(direction);});
 }
 boost.addEventListener('pointerdown',event=>{
  if(event.button!==0||!isPlaying())return;
  event.preventDefault();held.add(event.pointerId);
  try{boost.setPointerCapture(event.pointerId);}catch{held.delete(event.pointerId);}
  update();
 });
 for(const type of ['pointerup','pointercancel','lostpointercapture'])boost.addEventListener(type,event=>{held.delete(event.pointerId);update();});
 for(const button of [left,right,boost]){
  button.addEventListener('contextmenu',event=>event.preventDefault());
  button.addEventListener('selectstart',event=>event.preventDefault());
 }
 return {reset(){held.clear();setBoost(false);}};
}
