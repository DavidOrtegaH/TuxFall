import test from 'node:test';
import assert from 'node:assert/strict';
import {createScoreDisplay} from '../src/score-display.js';
import {scoreFeedback} from '../src/feedback.js';
test('R46: freeze presentation for three blinks while actual score advances',()=>{
 const display=createScoreDisplay();let actual=500;display.trigger(actual,10);
 for(const [elapsed,hidden] of [[0,false],[.2,true],[.4,false],[.6,true],[.8,false],[1,true]]){
  actual+=10;assert.deepEqual(display.read(actual,10+elapsed,'playing'),{score:500,hidden});
 }
 assert.equal(actual,560);
 assert.deepEqual(display.read(570,11.21,'playing'),{score:570,hidden:false});
});
test('R47: pause, game over and reset discard effect; reduced motion never flashes',()=>{
 const display=createScoreDisplay();
 display.trigger(500,0);assert.deepEqual(display.read(520,.3,'playing',true),{score:500,hidden:false});
 for(const status of ['paused','over','ready']){
  display.trigger(500,0);assert.deepEqual(display.read(520,.3,status),{score:520,hidden:false});
  assert.deepEqual(display.read(530,.4,'playing'),{score:530,hidden:false});
 }
 display.trigger(500,0);display.reset();assert.equal(display.read(540,.5,'playing').score,540);
});
test('R46/R47: positive record triggers once; zero record does not; latest event replaces effect',()=>{
 const display=createScoreDisplay();
 assert.equal(scoreFeedback(0,1,0,false).newRecord,false);
 assert.equal(scoreFeedback(700,701,700,false).newRecord,true);
 assert.equal(scoreFeedback(701,702,700,true).newRecord,false);
 display.trigger(701,10);display.trigger(1000,10.5);
 assert.deepEqual(display.read(1010,10.6,'playing'),{score:1000,hidden:false});
 assert.deepEqual(scoreFeedback(999,1000,999,false),{newRecord:true,milestones:[1000]});
});
