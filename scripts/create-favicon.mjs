import {writeFile} from 'node:fs/promises';
import {TUX_SPRITE} from '../src/sprites.js';
let pixels='';
for(const [y,row] of TUX_SPRITE.entries())for(const [x,pixel] of [...row].entries())if(pixel!=='.')pixels+=`<rect x="${18+x*2}" y="${29+y*2}" width="2" height="2" fill="${pixel==='w'?'#fafafa':'#22241f'}"/>`;
const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" shape-rendering="crispEdges"><metadata>Required Notice: Copyright (c) 2026 David Ortega Hoyas. TuxFall. PolyForm Noncommercial 1.0.0: https://polyformproject.org/licenses/noncommercial/1.0.0 . Tux originally created by Larry Ewing with GIMP; see NOTICE.md.</metadata><path fill="#fafafa" d="M21 0h22v4h10v4h6v8h3v8H2v-8h3V8h6V4h10z"/><path fill="#22241f" d="M23 3h18v3h10v4h5v8h3v3H5v-3h3v-8h5V6h10z"/><path stroke="#fafafa" stroke-width="2" fill="none" d="M23 7v12m9-14v14m9-12v12"/><path stroke="#fafafa" stroke-width="4" fill="none" d="M12 22l14 18m26-18L38 40"/><path stroke="#22241f" stroke-width="2" fill="none" d="M12 22l14 18m26-18L38 40"/><path fill="#fafafa" d="M26 27h12v2h4v2h2v4h2v14h2v14H16V49h2V35h2v-4h2v-2h4z"/>${pixels}</svg>\n`;
await writeFile(new URL('../src/favicon.svg',import.meta.url),svg);
console.log('Created src/favicon.svg from the playable Tux sprite');
