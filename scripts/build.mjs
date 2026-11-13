import {mkdir,copyFile,readdir,rm,readFile,writeFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import './create-favicon.mjs';
import './create-social.mjs';
const root=resolve('.'),output=resolve(root,'dist');
if(!output.startsWith(root+sep)||output===root)throw Error('Unexpected build output');
await rm(output,{recursive:true,force:true});
await mkdir(resolve(output,'src'),{recursive:true});
const publicFiles=['index.html','cookies.html','about.html','sitemap.xml','NOTICE.md','LICENSE'];
const assets=(await readdir('src',{withFileTypes:true})).filter(entry=>entry.isFile()&&!entry.name.startsWith('.')&&['.js','.svg','.css','.png'].includes(extname(entry.name))).map(entry=>'src/'+entry.name);
await Promise.all([...publicFiles,...assets].map(file=>copyFile(file,resolve(output,file))));
const {version}=JSON.parse(await readFile('package.json','utf8'));
await writeFile(resolve(output,'version.json'),JSON.stringify({version,revision:process.env.GITHUB_SHA??null})+'\n');
for(const file of ['index.html','about.html','cookies.html']){
 const path=resolve(output,file),html=await readFile(path,'utf8');
 await writeFile(path,html.replace('</head>',`<meta name="application-version" content="${version}"></head>`));
}
console.log('Built clean dist/ (public files only)');
