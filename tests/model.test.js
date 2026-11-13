import test from 'node:test';import assert from 'node:assert/strict';
import {createGame,move,step,spawn,speedAt,currentSpeed,waveIntervalAt,stageAt,PLAYER_Y,HEIGHT} from '../src/model.js';
const playing=()=>({...createGame(),status:'playing'});
test('R1/R22: contiguous movement, boundaries and streak direction',()=>{const g=playing();move(g,-1);assert.equal(g.lane,0);assert.equal(g.impulse,-1);move(g,-1);assert.equal(g.lane,0);move(g,1);assert.equal(g.lane,1);assert.equal(g.impulse,1);assert.equal(g.impulseTime,.16);move(g,1);move(g,1);assert.equal(g.lane,2);});
test('R2: speed cap and canopy stages',()=>{assert.equal(speedAt(0),95);assert.equal(speedAt(10000),340);assert.deepEqual([0,25,50].map(stageAt),[0,1,2]);});
test('R3: planes occupy adjacent lanes, never consecutive',()=>{const g=playing();for(let i=0;i<1000;i++)spawn(g,()=>.1);g.obstacles.forEach((o,i,all)=>{assert.ok(o.lane>=0&&o.lane+o.width<=3);assert.ok(o.width<=2);if(o.type==='plane'&&i)assert.notEqual(all[i-1].type,'plane');});});
test('R3: seeded distribution makes planes rarer and leaves reaction time',()=>{let seed=42;const rng=()=>((seed=(1664525*seed+1013904223)>>>0)/2**32);const g=playing();for(let i=0;i<5000;i++)spawn(g,rng);const fraction=g.obstacles.filter(o=>o.type==='plane').length/5000;assert.ok(fraction>.1&&fraction<.25);assert.ok((545-PLAYER_Y-31)/260>1);assert.ok(waveIntervalAt(0)*speedAt(0)>62);});
test('R4: collision with either plane lane; other lane safe',()=>{for(let lane=0;lane<3;lane++){const g=playing();g.lane=lane;g.obstacles=[{lane:0,width:2,type:'plane',y:PLAYER_Y+30}];step(g,.05);assert.equal(g.status,lane<2?'over':'playing');}});
test('R4: scoring and clean restart',()=>{const g=playing();for(let i=0;i<20;i++)step(g,.05);assert.equal(g.score,9);assert.equal(createGame().score,0);assert.equal(createGame().lane,1);assert.deepEqual(createGame().obstacles,[]);});
test('R6: paused simulation is immutable',()=>{const g={...playing(),status:'paused'};const before=structuredClone(g);step(g,1);move(g,1);assert.deepEqual(g,before);});
test('R9: acceleration raises distance and score, caps and releases without changing base progression',()=>{const normal=playing(),boosted={...playing(),boost:true};for(let i=0;i<20;i++){step(normal,.05);step(boosted,.05);}assert.ok(boosted.distance>normal.distance*1.49);assert.ok(boosted.score>normal.score);assert.equal(normal.time,boosted.time);boosted.time=1000;assert.equal(currentSpeed(boosted),430);boosted.boost=false;assert.equal(currentSpeed(boosted),340);assert.ok((HEIGHT-18-PLAYER_Y-31)/430>=.68);});
test('R25: maximum speed and wave rate stay bounded with reaction time',()=>{assert.equal(waveIntervalAt(0),1.8);assert.ok(Math.abs(waveIntervalAt(90)-.74)<1e-9);assert.ok(Math.abs(waveIntervalAt(10000)-.74)<1e-9);for(let t=0;t<90;t++)assert.ok(waveIntervalAt(t+1)<=waveIntervalAt(t));assert.ok((HEIGHT-18-PLAYER_Y-31)/430>=.68);});
test('R25: delayed player survives 8 minutes across 72 frame-rate/seed/boost combinations',()=>{
 for(const hz of [30,120])for(const mode of ['normal','boost','intermittent'])for(let initialSeed=1;initialSeed<=12;initialSeed++){
  let seed=initialSeed;const rng=()=>((seed=(1664525*seed+1013904223)>>>0)/2**32);
  const g=playing();let plan=null;
  for(let frame=0;frame<480*hz&&g.status==='playing';frame++){
   g.boost=mode==='boost'||mode==='intermittent'&&Math.floor(g.time/2)%2===0;
   // Wait for a complete silhouette; do not move into a previous row before it clears.
   if(!plan){const first=g.obstacles.filter(o=>o.y>=PLAYER_Y-31).sort((a,b)=>a.y-b.y)[0];if(first&&first.y<=HEIGHT-18){const row=g.obstacles.filter(o=>Math.abs(o.y-first.y)<.1),free=[0,1,2].filter(l=>!row.some(o=>l>=o.lane&&l<o.lane+o.width));if(!free.includes(g.lane))plan={target:free.sort((a,b)=>Math.abs(a-g.lane)-Math.abs(b-g.lane))[0],at:g.time+.22};}}
   if(plan&&g.time>=plan.at){move(g,Math.sign(plan.target-g.lane));if(g.lane===plan.target)plan=null;else plan.at+=.11;}
   step(g,1/hz,rng);
  }
  assert.equal(g.status,'playing',`${mode}, seed ${initialSeed}, time ${g.time}`);
 }
});
test('R25: late-game rows leave one escape and usually change the gap',()=>{let seed=73,pairs=0,changed=0;const rng=()=>((seed=(1664525*seed+1013904223)>>>0)/2**32),g={...playing(),time:120};for(let i=0;i<2000;i++){const before=g.lastGap,wasPlane=g.lastPlane;g.obstacles=[];spawn(g,rng);const free=[0,1,2].filter(l=>!g.obstacles.some(o=>l>=o.lane&&l<o.lane+o.width));assert.ok(free.length>=1);assert.ok(free.includes(g.lastGap));assert.ok(!(wasPlane&&g.lastPlane));if(g.obstacles.length===2)pairs++;if(g.lastGap!==before)changed++;}assert.ok(pairs/2000>.4);assert.ok(changed/2000>.8);});
