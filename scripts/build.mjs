import {mkdir,copyFile,cp} from 'node:fs/promises';
import './create-favicon.mjs';
await mkdir('dist',{recursive:true});await copyFile('index.html','dist/index.html');await copyFile('cookies.html','dist/cookies.html');await cp('src','dist/src',{recursive:true});await copyFile('NOTICE.md','dist/NOTICE.md');await copyFile('LICENSE','dist/LICENSE');console.log('Built dist/');

