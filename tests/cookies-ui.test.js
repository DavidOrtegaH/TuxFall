import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('R55/R56: initial cookie prompt is outside game flow with no-consent dismissal',async()=>{
 const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
 const gameEnd=html.indexOf('</main>'),prompt=html.indexOf('<dialog class="cookie-banner"');
 assert.ok(prompt>gameEnd);assert.match(html,/<button id="cookie-later"[^>]*data-i18n="later"/);
 const dialog=html.slice(prompt,html.indexOf('</dialog>',prompt));
 assert.match(dialog,/data-cookies="yes"/);assert.match(dialog,/data-cookies="no"/);assert.match(dialog,/\.\/cookies.html/);
 const main=await readFile(new URL('../src/main.js',import.meta.url),'utf8');
 assert.match(main,/if\(!storage.consent\)\$\('cookie-banner'\)\.showModal\(\)/);
 assert.match(main,/cookie-settings'\)\.open\|\|\$\('cookie-banner'\)\.open/);
});
