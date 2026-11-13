// Presentation only: this module never writes to the game score or best record.
export function createScoreDisplay(){
 let effect=null;
 return {
  reset(){effect=null;},
  trigger(score,time){effect={score,time};},
  read(score,time,status,reduced=false){
   if(status!=='playing'){effect=null;return {score,hidden:false};}
   if(!effect)return {score,hidden:false};
   const elapsed=time-effect.time;
   if(elapsed>=1.2){effect=null;return {score,hidden:false};}
   return {score:effect.score,hidden:!reduced&&Math.floor((elapsed+1e-9)/.2)%2===1};
  }
 };
}
