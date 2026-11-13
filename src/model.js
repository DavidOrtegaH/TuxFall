export const WIDTH=360, HEIGHT=520, PLAYER_Y=174;
export const laneX=lane=>60+lane*120;
export const speedAt=time=>Math.min(340,95+time*3.4);
export const currentSpeed=g=>Math.min(430,speedAt(g.time)*(g.boost?1.5:1));
export const waveIntervalAt=time=>1.8-1.06*Math.max(0,Math.min(1,time/90));
export const stageAt=time=>time<25?0:time<50?1:2;
export function createGame(){return {status:'ready',lane:1,time:0,distance:0,score:0,boost:false,obstacles:[],spawnIn:1.8,lastPlane:false,lastGap:1,impulse:0,impulseTime:0};}
export function move(g,direction){if(g.status!=='playing')return;const next=Math.max(0,Math.min(2,g.lane+Math.sign(direction)));if(next!==g.lane){g.impulse=Math.sign(direction);g.impulseTime=.16;g.lane=next;}}
export function spawn(g,rng=Math.random){
 const difficulty=Math.max(0,Math.min(1,(g.time-20)/60));
 const plane=!g.lastPlane&&rng()<.22,pair=!plane&&rng()<.65*difficulty;
 const pick=items=>items[Math.min(items.length-1,Math.floor(rng()*items.length))];
 let gap;
 if(plane||pair){const options=plane?[0,2]:[0,1,2];const alternate=options.filter(l=>l!==g.lastGap);gap=pick(alternate.length&&rng()<.9*difficulty?alternate:options);if(plane)g.obstacles.push({lane:gap===0?1:0,width:2,type:'plane',y:HEIGHT+25});else for(const lane of [0,1,2].filter(l=>l!==gap))g.obstacles.push({lane,width:1,type:'bird',y:HEIGHT+25});}
 else{const lane=rng()<.7*difficulty?g.lastGap:pick([0,1,2]);g.obstacles.push({lane,width:1,type:'bird',y:HEIGHT+25});gap=pick([0,1,2].filter(l=>l!==lane));}
 g.lastGap=gap;g.lastPlane=plane;
}
export function step(g,dt,rng=Math.random){if(g.status!=='playing')return;dt=Math.max(0,Math.min(dt,.05));g.time+=dt;const travel=currentSpeed(g)*dt;g.distance+=travel;g.score=Math.floor(g.distance/10);g.impulseTime=Math.max(0,g.impulseTime-dt);g.spawnIn-=dt;if(g.spawnIn<=0){spawn(g,rng);g.spawnIn+=waveIntervalAt(g.time);}for(const o of g.obstacles){const previous=o.y;o.y-=travel;const overlaps=g.lane>=o.lane&&g.lane<o.lane+o.width;if(overlaps&&o.y-13<=PLAYER_Y+18&&previous+13>=PLAYER_Y-18)g.status='over';}g.obstacles=g.obstacles.filter(o=>o.y>-45);}

