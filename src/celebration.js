import {TUX_SPRITE} from './sprites.js';
let silhouette='',belly='';
for(const [y,row] of TUX_SPRITE.entries())for(const [x,pixel] of [...row].entries())if(pixel!=='.'){
 const cell=`M${x+2} ${y+1}h1v1h-1z`;silhouette+=cell;if(pixel==='w')belly+=cell;
}
export const tuxExclamation=`<svg viewBox="0 0 18 24" aria-hidden="true" focusable="false" shape-rendering="crispEdges"><path d="${silhouette}" fill="#22241f" stroke="#22241f" stroke-width="1"/><path d="${belly}" fill="#fafafa"/><path d="M8 21h2v2H8z" fill="#22241f"/></svg>`;
