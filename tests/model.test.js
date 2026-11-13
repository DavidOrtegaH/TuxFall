import test from 'node:test';import assert from 'node:assert/strict';
import {createGame,move,step,spawn,speedAt,currentSpeed,waveIntervalAt,stageAt,PLAYER_Y,HEIGHT} from '../src/model.js';
const playing=()=>({...createGame(),status:'playing'});
test('R1/R22: contiguous movement, boundaries and streak direction',()=>{const g=playing();move(g,-1);assert.equal(g.lane,0);assert.equal(g.impulse,-1);move(g,-1);assert.equal(g.lane,0);move(g,1);assert.equal(g.lane,1);assert.equal(g.impulse,1);assert.equal(g.impulseTime,.16);move(g,1);move(g,1);assert.equal(g.lane,2);});
test('R2: speed cap and canopy stages',()=>{assert.equal(speedAt(0),95);assert.equal(speedAt(10000),260);assert.deepEqual([0,25,50].map(stageAt),[0,1,2]);});
test('R3: planes occupy adjacent lanes, never consecutive',()=>{const g=playing();for(let i=0;i<1000;i++)spawn(g,()=>.1);g.obstacles.forEach((o,i,all)=>{assert.ok(o.lane>=0&&o.lane+o.width<=3);assert.ok(o.width<=2);if(o.type==='plane'&&i)assert.notEqual(all[i-1].type,'plane');});});
test('R3: seeded distribution makes planes rarer and leaves reaction time',()=>{let seed=42;const rng=()=>((seed=(1664525*seed+1013904223)>>>0)/2**32);const g=playing();for(let i=0;i<5000;i++)spawn(g,rng);const fraction=g.obstacles.filter(o=>o.type==='plane').length/5000;assert.ok(fraction>.1&&fraction<.25);assert.ok((545-PLAYER_Y-31)/260>1);assert.ok(waveIntervalAt(0)*speedAt(0)>62);});
test('R4: collision with either plane lane; other lane safe',()=>{for(let lane=0;lane<3;lane++){const g=playing();g.lane=lane;g.obstacles=[{lane:0,width:2,type:'plane',y:PLAYER_Y+30}];step(g,.05);assert.equal(g.status,lane<2?'over':'playing');}});
test('R4: scoring and clean restart',()=>{const g=playing();for(let i=0;i<20;i++)step(g,.05);assert.equal(g.score,9);assert.equal(createGame().score,0);assert.equal(createGame().lane,1);assert.deepEqual(createGame().obstacles,[]);});
test('R6: paused simulation is immutable',()=>{const g={...playing(),status:'paused'};const before=structuredClone(g);step(g,1);move(g,1);assert.deepEqual(g,before);});
test('R9: acceleration raises distance and score, caps and releases without changing base progression',()=>{const normal=playing(),boosted={...playing(),boost:true};for(let i=0;i<20;i++){step(normal,.05);step(boosted,.05);}assert.ok(boosted.distance>normal.distance*1.49);assert.ok(boosted.score>normal.score);assert.equal(normal.time,boosted.time);boosted.time=1000;assert.equal(currentSpeed(boosted),320);boosted.boost=false;assert.equal(currentSpeed(boosted),260);assert.ok((545-PLAYER_Y-31)/320>1);});
test('R20: increasing challenge stops at a bounded rate with visible reaction time',()=>{assert.equal(waveIntervalAt(0),1.8);assert.equal(waveIntervalAt(75),1);assert.equal(waveIntervalAt(10000),1);for(let t=0;t<75;t++)assert.ok(waveIntervalAt(t+1)<=waveIntervalAt(t));assert.ok((HEIGHT-18-PLAYER_Y-31)/320>=.9);});
test('R20: delayed player survives 8 minutes for 36 seed/acceleration combinations',()=>{
 for(const mode of ['normal','boost','intermittent'])for(let initialSeed=1;initialSeed<=12;initialSeed++){
  let seed=initialSeed;const rng=()=>((seed=(1664525*seed+1013904223)>>>0)/2**32);
  const g=playing();let plan=null;
  for(let frame=0;frame<480*120&&g.status==='playing';frame++){
   g.boost=mode==='boost'||mode==='intermittent'&&Math.floor(g.time/2)%2===0;
   // Wait for a complete silhouette; do not move into a previous row before it clears.
   if(!plan){const next=g.obstacles.filter(o=>o.y>=PLAYER_Y-31).sort((a,b)=>a.y-b.y)[0];if(next&&next.y<=HEIGHT-18&&g.lane>=next.lane&&g.lane<next.lane+next.width){const target=[0,1,2].filter(l=>l<next.lane||l>=next.lane+next.width).sort((a,b)=>Math.abs(a-g.lane)-Math.abs(b-g.lane))[0];plan={target,at:g.time+.3};}}
   if(plan&&g.time>=plan.at){move(g,Math.sign(plan.target-g.lane));if(g.lane===plan.target)plan=null;else plan.at+=.15;}
   step(g,1/120,rng);
  }
  assert.equal(g.status,'playing',`${mode}, seed ${initialSeed}, time ${g.time}`);
 }
});
