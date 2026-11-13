import test from 'node:test';
import assert from 'node:assert/strict';
import {scoreFeedback} from '../src/feedback.js';
import {createSoundEngine} from '../src/sound.js';

test('R37/R38: record crossing is strict and once per run; milestones do not repeat',()=>{
 assert.deepEqual(scoreFeedback(998,1000,999,false),{newRecord:true,milestones:[1000]});
 assert.deepEqual(scoreFeedback(1000,1001,999,true),{newRecord:false,milestones:[]});
 assert.equal(scoreFeedback(998,999,999,false).newRecord,false);
 assert.equal(scoreFeedback(0,1,0,false).newRecord,false);
 assert.deepEqual(scoreFeedback(999,3001,4000,false).milestones,[1000,2000,3000]);
 assert.deepEqual(scoreFeedback(3001,3001,4000,false).milestones,[]);
});
function fakeAudio(){
 const instances=[];
 class Param { value=0; setValueAtTime(value){this.value=value;} cancelScheduledValues(){} linearRampToValueAtTime(){} exponentialRampToValueAtTime(){} }
 class Context {
  state='suspended';currentTime=10;destination={};oscillators=[];
  constructor(){instances.push(this);}
  async resume(){this.state='running';}
  createGain(){return {gain:new Param(),connect(){},disconnect(){}};}
  createOscillator(){const oscillator={frequency:new Param(),connect(){},disconnect(){},start(time){this.started=time;},stop(time){this.stopped=time;}};this.oscillators.push(oscillator);return oscillator;}
 }
 return {Context,instances};
}
test('R38/R39: audio is lazy, effects differ and delayed notes stop on mute',async()=>{
 const {Context,instances}=fakeAudio(),sound=createSoundEngine({AudioContextClass:Context});
 assert.equal(instances.length,0);
 assert.equal(await sound.play('lane'),true);
 const context=instances[0];assert.equal(context.oscillators.length,1);
 assert.equal(context.oscillators[0].frequency.value,720);
 await sound.play('record');assert.equal(context.oscillators.length,4);
 await sound.play('milestone',.34);assert.equal(context.oscillators.length,6);
 assert.ok(context.oscillators[4].started>=10.34);
 sound.setEnabled(false);assert.equal(sound.enabled,false);
 assert.ok(context.oscillators.every(note=>note.stopped===10.008));
 assert.equal(await sound.play('lane'),false);
 sound.setEnabled(true);assert.equal(context.oscillators.length,6);
 assert.equal(await sound.play('lane'),true);
});
test('R39: pausing invalidates pending playback; unavailable audio is harmless',async()=>{
 const {Context,instances}=fakeAudio(),sound=createSoundEngine({AudioContextClass:Context});
 const pending=sound.play('record');sound.stop();assert.equal(await pending,false);
 assert.equal(instances[0].oscillators.length,0);
 const unavailable=createSoundEngine({AudioContextClass:null});
 assert.equal(unavailable.supported,false);assert.equal(await unavailable.play('lane'),false);
 class Broken {constructor(){throw Error('blocked');}}
 const blocked=createSoundEngine({AudioContextClass:Broken});
 assert.equal(await blocked.play('lane'),false);assert.equal(blocked.supported,false);
});
