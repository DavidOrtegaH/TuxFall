import {createGame,move,step} from './model.js';
import {render,paletteAt} from './render.js';
import {createPersistence} from './persistence.js';
import {initializeLanguage} from './i18n.js';
import {playIcon,pauseIcon,retryIcon,soundIcon,mutedIcon} from './icons.js';
import {createSoundEngine} from './sound.js';
import {createSoundPreference} from './sound-preference.js';
import {scoreFeedback} from './feedback.js';
import {tuxExclamation} from './celebration.js';
const $=id=>document.getElementById(id),ctx=$('game').getContext('2d');
let deviceStorage=null;
try{deviceStorage=localStorage;}catch{}
const i18n=initializeLanguage(document,location,deviceStorage,()=>{previousStatus=undefined;sync();$('cookie-choice').textContent=t(storage.consent?.choice==='yes'?'cookieOn':'cookieOff');announce(t('languageChanged'));});
const t=(key,values)=>i18n.t(key,values);
const storage=createPersistence(document,location,()=>Date.now(),deviceStorage);
const soundPreference=createSoundPreference(document,location);
const sound=createSoundEngine({initialEnabled:soundPreference.value});
$('record-tux-left').innerHTML=tuxExclamation;
$('record-tux-right').innerHTML=tuxExclamation;
try{localStorage.removeItem('tuxfall-best');}catch{}
let game=createGame(),best=storage.readBest(),last=0,recordAtStart=best,recordBeaten=false,noticeUntil=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const touchInput=matchMedia('(any-pointer: coarse)');
let inputMode;
function setInputMode(mode){
 if(inputMode===mode)return;
 inputMode=mode;$('arcade').dataset.input=mode;
 $('guide-keyboard').hidden=mode!=='keyboard';$('guide-touch').hidden=mode!=='touch';
}
setInputMode(touchInput.matches?'touch':'keyboard');
touchInput.addEventListener('change',()=>setInputMode(touchInput.matches?'touch':'keyboard'));
document.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'||e.pointerType==='pen')setInputMode('touch');});
const boostKeys=new Set();let touchBoost=false;
let previousStatus,soundState;
function announce(text){$('announcement').textContent=text;}
function clearBoost(){boostKeys.clear();touchBoost=false;game.boost=false;}
function updateBoost(){game.boost=game.status==='playing'&&(touchBoost||boostKeys.size>0);}
function syncSound(){
 const state=`${sound.supported}/${sound.enabled}/${i18n.language}`;if(state===soundState)return;soundState=state;
 const label=t(!sound.supported?'soundUnavailable':sound.enabled?'muteSound':'unmuteSound');
 $('sound').innerHTML=sound.enabled?soundIcon:mutedIcon;$('sound').disabled=!sound.supported;
 $('sound').setAttribute('aria-label',label);$('sound').title=label;$('sound').setAttribute('aria-pressed',String(!sound.enabled));
}
function changeLane(direction){const before=game.lane;move(game,direction);if(game.lane!==before)void sound.play('lane');}
function sync(){
 syncSound();
 const paused=game.status==='paused',over=game.status==='over';
 $('score').textContent=String(game.score).padStart(5,'0');$('best').textContent=String(best).padStart(5,'0');
 $('menu-best').textContent=String(best).padStart(5,'0');$('menu-score').textContent=String(game.score).padStart(5,'0');
 $('touch-controls').hidden=inputMode!=='touch'||!['playing','paused'].includes(game.status);
 const {bg}=paletteAt(game.time);$('arcade').style.setProperty('--sky',`rgb(${bg},${bg},${bg})`);
 $('boost').classList.toggle('active',game.boost);
 $('record-notice').hidden=!(game.status==='playing'&&game.time<noticeUntil);
 if(previousStatus===game.status)return;
 previousStatus=game.status;
 $('arcade').dataset.status=game.status;
 $('pause').disabled=game.status==='ready'||over;
 $('pause').innerHTML=paused?playIcon:pauseIcon;$('pause').setAttribute('aria-label',t(paused?'resumeGame':'pauseGame'));
 $('overlay').hidden=game.status==='playing';
 $('overlay-label').textContent=t(over?'endLabel':paused?'paused':'playAction');
 $('overlay-label').hidden=game.status==='playing';
 $('menu-best-label').textContent=t(over&&recordBeaten?'newRecordLabel':'yourBest');
 $('record-tux-left').hidden=$('record-tux-right').hidden=!over||!recordBeaten;
 $('menu-score-row').hidden=!over;
 $('start').innerHTML=over?retryIcon:playIcon;
 $('start').setAttribute('aria-label',t(over?'retryGame':paused?'resumeGame':'startGame'));
 $('start').title=$('start').getAttribute('aria-label');
}
function start(){sound.stop();void sound.unlock();if(game.status==='paused')game.status='playing';else{game=createGame();game.status='playing';recordAtStart=best;recordBeaten=false;noticeUntil=0;}clearBoost();last=performance.now();sync();announce(t('playingAnnouncement'));$('start').blur();}
function pause(){clearBoost();sound.stop();if(game.status==='playing'){game.status='paused';announce(t('pausedAnnouncement'));}else if(game.status==='paused'){game.status='playing';last=performance.now();void sound.unlock();}sync();}
$('start').addEventListener('click',start);$('pause').addEventListener('click',pause);
$('sound').addEventListener('click',()=>{sound.setEnabled(!sound.enabled);soundPreference.set(sound.enabled);if(sound.enabled)void sound.play('lane');syncSound();});
$('left').addEventListener('click',()=>changeLane(-1));$('right').addEventListener('click',()=>changeLane(1));
$('boost').addEventListener('pointerdown',e=>{if(game.status!=='playing')return;e.preventDefault();$('boost').setPointerCapture(e.pointerId);touchBoost=true;updateBoost();});
for(const event of ['pointerup','pointercancel','lostpointercapture'])$('boost').addEventListener(event,()=>{touchBoost=false;updateBoost();});
window.addEventListener('keydown',e=>{
 if(!e.metaKey&&!e.ctrlKey&&!e.altKey)setInputMode('keyboard');
 const key=e.key.toLowerCase();if($('cookie-settings').open||e.target.closest?.('select,input,textarea'))return;
 if(game.status==='playing'&&key.startsWith('arrow')){
  e.preventDefault();e.stopImmediatePropagation();$('game').focus({preventScroll:true});
 }
 if(!['arrowleft','arrowright','arrowdown','a','d','s',' ','p','escape'].includes(key))return;
 if(e.target instanceof HTMLButtonElement&&key===' ')return;
 e.preventDefault();if(e.repeat)return;
 if(key==='arrowdown'||key==='s'){boostKeys.add(key);updateBoost();}
 if(key==='arrowleft'||key==='a')changeLane(-1);if(key==='arrowright'||key==='d')changeLane(1);
 if(key==='p'||key==='escape')pause();
 if(key===' '){if(game.status!=='playing')start();else pause();}
},{capture:true});
window.addEventListener('keyup',e=>{
 if(game.status==='playing'&&!$('cookie-settings').open&&e.key.startsWith('Arrow')){e.preventDefault();e.stopImmediatePropagation();}
 boostKeys.delete(e.key.toLowerCase());updateBoost();
},{capture:true});
function loseFocus(){clearBoost();sound.stop();if(game.status==='playing')pause();}
document.addEventListener('visibilitychange',()=>{if(document.hidden)loseFocus();});window.addEventListener('blur',loseFocus);
function chooseCookies(allowed){storage.choose(allowed);if(allowed)best=Math.max(best,storage.readBest());const saved=allowed&&storage.saveBest(best);$('cookie-banner').hidden=true;$('cookie-settings').close();announce(t(allowed?(saved?'savedAnnouncement':'blockedAnnouncement'):'rejectedAnnouncement'));}
for(const button of document.querySelectorAll('[data-cookies]'))button.addEventListener('click',()=>chooseCookies(button.dataset.cookies==='yes'));
$('cookie-banner').hidden=!!storage.consent;
$('cookie-open').addEventListener('click',()=>{loseFocus();$('cookie-choice').textContent=t(storage.consent?.choice==='yes'?'cookieOn':'cookieOff');$('cookie-settings').showModal();});
$('cookie-close').addEventListener('click',()=>$('cookie-settings').close());
window.addEventListener('pagehide',()=>storage.saveBest(best));
function frame(now){const before=game.status,previousScore=game.score;step(game,(now-last)/1000);last=now;
 const feedback=scoreFeedback(previousScore,game.score,recordAtStart,recordBeaten);
 if(game.score>best)best=game.score;
 if(feedback.newRecord){recordBeaten=true;noticeUntil=game.time+4;announce(t('recordAnnouncement',{best:recordAtStart}));void sound.play('record');}
 feedback.milestones.forEach((_,index)=>void sound.play('milestone',(feedback.newRecord ? .34 : 0)+index*.22));
 if(before==='playing'&&game.status==='over'){clearBoost();storage.saveBest(best);announce(`${recordBeaten?t('newRecord')+' ':''}${t('endAnnouncement',{score:game.score})}`);}
 render(ctx,game,reduced.matches);sync();requestAnimationFrame(frame);
}sync();requestAnimationFrame(frame);
