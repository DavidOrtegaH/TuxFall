import {mkdir,copyFile,cp} from 'node:fs/promises';
import './create-favicon.mjs';
await mkdir('dist',{recursive:true});
await Promise.all(['index.html','cookies.html','about.html','NOTICE.md','LICENSE'].map(file=>copyFile(file,'dist/'+file)).concat(cp('src','dist/src',{recursive:true})));
console.log('Built dist/');
