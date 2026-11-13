import {mkdir,copyFile,readdir,rm,readFile,writeFile} from 'node:fs/promises';
import {resolve,extname,sep,posix} from 'node:path';
import {createHash} from 'node:crypto';
import './create-favicon.mjs';
import './create-social.mjs';
const root=resolve('.'),output=resolve(root,'dist');
if(!output.startsWith(root+sep)||output===root)throw Error('Unexpected build output');
const {version}=JSON.parse(await readFile('package.json','utf8'));
const publicFiles=['index.html','cookies.html','about.html','sitemap.xml','NOTICE.md','LICENSE'];
const assets=(await readdir('src',{withFileTypes:true})).filter(entry=>entry.isFile()&&!entry.name.startsWith('.')&&['.js','.svg','.css','.png'].includes(extname(entry.name))).map(entry=>'src/'+entry.name).sort();
const contents=new Map(),hash=createHash('sha256').update(version);
for(const file of assets){const raw=await readFile(file),data=extname(file)==='.png'?raw:Buffer.from(raw.toString('utf8').replace(/\r\n/g,'\n'));contents.set(file,data);hash.update(file).update(data);}
const fingerprint=hash.digest('hex').slice(0,16);
const names=Object.fromEntries(assets.map(file=>{const extension=extname(file);return [file,file.slice(0,-extension.length)+'.'+fingerprint+extension];}));
await rm(output,{recursive:true,force:true});
await mkdir(resolve(output,'src'),{recursive:true});
for(const file of publicFiles){
 if(extname(file)!=='.html'){await copyFile(file,resolve(output,file));continue;}
 let html=await readFile(file,'utf8');
 for(const [original,fingerprinted] of Object.entries(names))html=html.replaceAll(original,fingerprinted);
 await writeFile(resolve(output,file),html.replace('</head>',`<meta name="application-version" content="${version}"></head>`));
}
for(const file of assets){
 let data=contents.get(file);
 if(extname(file)==='.js')data=data.toString('utf8').replace(/(['"])(\.\/[^'"]+\.js)\1/g,(match,quote,relative)=>{
  const target=names[posix.join(posix.dirname(file),relative)];
  if(!target)throw Error(`Unknown import ${relative} in ${file}`);
  return quote+'./'+posix.relative(posix.dirname(file),target)+quote;
 });
 await writeFile(resolve(output,names[file]),data);
}
await writeFile(resolve(output,'version.json'),JSON.stringify({version,revision:process.env.GITHUB_SHA??null,fingerprint,assets:names})+'\n');
console.log(`Built clean dist/ (${version}, fingerprint ${fingerprint})`);
