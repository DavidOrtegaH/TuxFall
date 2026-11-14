import test from 'node:test';
import assert from 'node:assert/strict';
import {bindTouchControls} from '../src/touch-controls.js';
import {createGame,move} from '../src/model.js';
class Button extends EventTarget {capture=new Set();setPointerCapture(id){this.capture.add(id);}}
function emit(target,type,values={}){const event=new Event(type,{cancelable:true});Object.assign(event,{button:0,pointerId:1,detail:1,...values});target.dispatchEvent(event);return event;}
function setup(){const game=createGame();game.status='playing';const left=new Button(),right=new Button(),boost=new Button();const controls=bindTouchControls({left,right,boost,isPlaying:()=>game.status==='playing',move:direction=>move(game,direction),setBoost:value=>{game.boost=value;}});return {game,left,right,boost,controls};}
test('R60: movement happens on press once, preserves boundaries and keyboard/AT activation',()=>{
 const {game,left,right}=setup();
 assert.equal(emit(left,'pointerdown').defaultPrevented,true);assert.equal(game.lane,0);
 emit(left,'click');assert.equal(game.lane,0);
 emit(right,'pointerdown');assert.equal(game.lane,1);emit(right,'click');assert.equal(game.lane,1);
 emit(right,'click',{detail:0});assert.equal(game.lane,2);
 emit(right,'pointerdown');assert.equal(game.lane,2);
 emit(left,'pointerdown',{button:2});assert.equal(game.lane,2);
});
test('R60: boost supports multiple fingers and releases on cancellation, capture loss and reset',()=>{
 const {game,boost,controls}=setup();
 emit(boost,'pointerdown',{pointerId:1});emit(boost,'pointerdown',{pointerId:2});assert.equal(game.boost,true);
 emit(boost,'pointerup',{pointerId:1});assert.equal(game.boost,true);
 emit(boost,'pointercancel',{pointerId:2});assert.equal(game.boost,false);
 emit(boost,'pointerdown',{pointerId:3});emit(boost,'lostpointercapture',{pointerId:3});assert.equal(game.boost,false);
 emit(boost,'pointerdown');controls.reset();assert.equal(game.boost,false);
 emit(boost,'pointerup');assert.equal(game.boost,false);
});
test('R59/R60: native selection/menu suppressed, stopped game ignores inputs and failed capture is safe',()=>{
 const {game,left,right,boost}=setup();
 for(const button of [left,right,boost])for(const type of ['contextmenu','selectstart'])assert.equal(emit(button,type).defaultPrevented,true);
 game.status='paused';emit(left,'pointerdown');emit(right,'click',{detail:0});emit(boost,'pointerdown');assert.equal(game.lane,1);assert.equal(game.boost,false);
 game.status='playing';boost.setPointerCapture=()=>{throw Error('pointer unavailable');};assert.doesNotThrow(()=>emit(boost,'pointerdown'));assert.equal(game.boost,false);
});
