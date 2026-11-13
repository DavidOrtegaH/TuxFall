import {laneX,PLAYER_Y,stageAt} from './model.js';
const tux=['.....####.....','....######....','...########...','...##w##w##...','...##w##w##...','...###ww###...','...##wwww##...','..###wwww###..','..##wwwwww##..','.###wwwwww###.','.##wwwwwwww##.','###wwwwwwww###','###wwwwwwww###','.##wwwwwwww##.','..##wwwwww##..','..##########..','.wwww....wwww.'];
const bird=['##..........##','####......####','..####..####..','....######....','.....####.....','......##......'];
const plane=['........##........','.......####.......','.......####.......','##.....####.....##','##################','##################','.......####.......','.......####.......','.....########.....','.....########.....'];
function sprite(ctx,rows,x,y,s,ink){for(const [border,color] of [[2,"#111"],[1,"#fafaf3"]]){ctx.fillStyle=color;rows.forEach((row,j)=>[...row].forEach((v,i)=>{if(v!==".")ctx.fillRect(Math.round(x+i*s-border),Math.round(y+j*s-border),s+border*2,s+border*2);}));}ctx.fillStyle=ink;rows.forEach((row,j)=>[...row].forEach((v,i)=>{if(v!=='.'){ctx.fillStyle=v==='w'?'#fafaf3':ink;ctx.fillRect(Math.round(x+i*s),Math.round(y+j*s),s,s);}}));}
function cloud(ctx,x,y,s){ctx.save();ctx.translate(Math.floor(x),Math.floor(y));ctx.scale(s,s);ctx.fillRect(8,0,23,6);ctx.fillRect(0,6,43,6);ctx.fillRect(-8,12,63,7);ctx.restore();}
export function paletteAt(time){const phase=((time%60)+60)%60/60;const night=(1-Math.cos(phase*Math.PI*2))/2;return {phase,night,bg:239-211*night,fg:20+230*night};}
export function render(ctx,g,reduced=false){const {phase,night,bg,fg}=paletteAt(g.time);const paper=`rgb(${bg},${bg},${bg})`,ink=`rgb(${fg},${fg},${fg})`;ctx.fillStyle=paper;ctx.fillRect(0,0,360,520);ctx.imageSmoothingEnabled=false;
// Both celestial bodies fade continuously; no threshold changes their geometry.
for(const moon of [false,true]){const progress=(phase+(moon?.5:0))%1;const orbit=reduced?0:progress;const cx=Math.round(35+orbit*290),cy=Math.round(92-Math.sin(orbit*Math.PI)*60);ctx.globalAlpha=.65*(moon?night:1-night);ctx.fillStyle=ink;ctx.fillRect(cx,cy,22,22);if(moon){ctx.fillStyle=paper;ctx.fillRect(cx+8,cy-4,18,20);}else{for(const [dx,dy,w,h] of [[9,-8,4,4],[9,26,4,4],[-8,9,4,4],[26,9,4,4]])ctx.fillRect(cx+dx,cy+dy,w,h);}}ctx.globalAlpha=1;
for(let i=0;i<12;i++){ctx.globalAlpha=i%2?.12:.22;ctx.fillStyle=ink;const y=((i*79-g.distance*(i%2?.22:.42))%610+610)%610-35;cloud(ctx,(i*137)%390-20,y,i%3===0?1.5:1);}ctx.globalAlpha=.12;ctx.fillStyle=ink;for(const x of [120,240])for(let y=-20;y<520;y+=22)ctx.fillRect(x,Math.round(y-(g.distance%22)),1,7);ctx.globalAlpha=1;
for(const o of g.obstacles){if(o.type==='bird')sprite(ctx,bird,laneX(o.lane)-21,o.y-9,3,ink);else{ctx.save();ctx.translate(laneX(o.lane)+60-81,o.y-15);ctx.scale(3,1);sprite(ctx,plane,0,0,3,ink);ctx.restore();}}
const x=laneX(g.lane),y=PLAYER_Y;const stage=stageAt(g.time);ctx.strokeStyle=ink;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x-13,y-10);ctx.lineTo(x-34,y-61);ctx.moveTo(x+13,y-10);ctx.lineTo(x+34,y-61);ctx.stroke();ctx.fillStyle=ink;
if(stage<2){for(let i=0;i<8;i++){const offset=Math.abs(3.5-i);const top=y-88+Math.floor(offset*offset)*2;ctx.fillRect(x-40+i*10,top,10,stage===1&&i%3===0?8:y-59-top);}ctx.fillStyle=paper;ctx.fillRect(x-24,y-78,2,17);ctx.fillRect(x-1,y-85,2,24);ctx.fillRect(x+22,y-78,2,17);if(stage===1){ctx.fillStyle=ink;ctx.fillRect(x-20,y-52,4,11);ctx.fillRect(x+30,y-52,3,8);}}
else{ctx.fillRect(x-36,y-62,10,4);ctx.fillRect(x-30,y-58,4,13);ctx.fillRect(x+27,y-65,10,4);ctx.fillRect(x+31,y-61,3,10);}
// A light outline keeps the silhouette legible at the midpoint of inversion.
ctx.fillStyle='#fafaf3';tux.forEach((row,j)=>[...row].forEach((v,i)=>{if(v!=='.')ctx.fillRect(x-22+i*3,y-25+j*3,5,5);}));sprite(ctx,tux,x-21,y-24,3,'#222');
if(g.impulseTime>0&&!reduced){ctx.fillStyle=ink;const d=g.impulse;for(const side of [-1,1]){ctx.fillRect(x+side*15+(d<0?-12:0),y-1,15,6);ctx.fillRect(x+side*15+d*12-3,y-7,6,8);}ctx.globalAlpha=.25;ctx.fillRect(x-d*35,y,10,2);ctx.fillRect(x-d*43,y+8,14,2);ctx.globalAlpha=1;}
if(stage===2){ctx.globalAlpha=.4;ctx.fillStyle=ink;for(let i=0;i<7;i++){const sy=((i*89-g.distance*1.6)%520+520)%520;ctx.fillRect(15+i*52,sy,1,18);}ctx.globalAlpha=1;}
if(g.score>0&&g.score%100<3&&g.status==='playing'){ctx.fillStyle=ink;ctx.font='bold 12px monospace';ctx.textAlign='center';ctx.fillText('+'+Math.floor(g.score/100)*100,180,38);}
}

