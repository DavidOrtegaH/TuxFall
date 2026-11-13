import test from 'node:test';
import assert from 'node:assert/strict';
import {createSoundPreference} from '../src/sound-preference.js';
const location={href:'https://example.org/TuxFall/',protocol:'https:'};
test('R42: sound is off by default; explicit on/off persists with scoped cookies',()=>{
 let cookie='',writes=[];
 const doc={get cookie(){return cookie;},set cookie(value){writes.push(value);cookie=value.split(';')[0];}};
 const preference=createSoundPreference(doc,location);
 assert.equal(preference.value,false);assert.equal(writes.length,0);
 preference.set(true);assert.match(writes.at(-1),/tuxfall_sound=on; Max-Age=34560000;.*Path=\/TuxFall\/; SameSite=Lax; Secure/);
 assert.equal(createSoundPreference(doc,location).value,true);
 preference.set(false);assert.equal(createSoundPreference(doc,location).value,false);
});
test('R42: malformed or blocked cookies safely fall back to muted; visit choice still works',()=>{
 assert.equal(createSoundPreference({cookie:'tuxfall_sound=invalid'},location).value,false);
 const blocked={get cookie(){throw Error('blocked');},set cookie(value){throw Error('blocked');}};
 const preference=createSoundPreference(blocked,location);assert.equal(preference.value,false);
 preference.set(true);assert.equal(preference.value,true);
});
