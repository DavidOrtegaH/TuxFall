// Raster social preview made from the game's existing pixel logo and sprites.
import {readFile,writeFile} from 'node:fs/promises';
import {deflateSync} from 'node:zlib';
import {TUX_SPRITE,CANOPY_SPRITES} from '../src/sprites.js';
const width=1200,height=630,pixels=Buffer.alloc(width*height*3),paper=[238,238,231],ink=[34,36,31];
function rect(x,y,w,h,color){for(let j=Math.max(0,y);j<Math.min(height,y+h);j++)for(let i=Math.max(0,x);i<Math.min(width,x+w);i++)pixels.set(color,(j*width+i)*3);}
rect(0,0,width,height,paper);rect(28,28,1144,4,ink);rect(28,598,1144,4,ink);rect(28,28,4,574,ink);rect(1168,28,4,574,ink);
const logo=await readFile(new URL('../src/tuxfall.svg',import.meta.url),'utf8');
for(const [,x,y] of logo.matchAll(/M(\d+) (\d+)h1v1h-1z/g))rect(313+Number(x)*14,90+Number(y)*14,14,14,ink);
for(const [y,row] of CANOPY_SPRITES[0].entries())for(const [x,pixel] of [...row].entries())if(pixel!=='.')rect(500+x*5,240+y*5,5,5,ink);
for(let i=0;i<80;i++){rect(510+Math.floor(i*.75),310+i,3,3,ink);rect(687-Math.floor(i*.75),310+i,3,3,ink);}
for(const [y,row] of TUX_SPRITE.entries())for(const [x,pixel] of [...row].entries())if(pixel!=='.')rect(565+x*5,380+y*5,5,5,pixel==='w'?[250,250,250]:ink);
function chunk(type,data){const name=Buffer.from(type),input=Buffer.concat([name,data]);let crc=0xffffffff;for(const byte of input){crc^=byte;for(let bit=0;bit<8;bit++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}const length=Buffer.alloc(4),checksum=Buffer.alloc(4);length.writeUInt32BE(data.length);checksum.writeUInt32BE((crc^0xffffffff)>>>0);return Buffer.concat([length,input,checksum]);}
const header=Buffer.alloc(13);header.writeUInt32BE(width,0);header.writeUInt32BE(height,4);header[8]=8;header[9]=2;
const raw=Buffer.alloc(height*(1+width*3));for(let y=0;y<height;y++)pixels.copy(raw,y*(1+width*3)+1,y*width*3,(y+1)*width*3);
const notice=Buffer.from('Copyright\0Required Notice: Copyright (c) 2026 David Ortega Hoyas. TuxFall. PolyForm Noncommercial 1.0.0. Tux: Larry Ewing / GIMP. See NOTICE.md.');
await writeFile(new URL('../src/social.png',import.meta.url),Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('tEXt',notice),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]));
