import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile,access,readdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {createStaticServer} from '../scripts/serve.mjs';
const base='https://davidortegah.github.io/TuxFall/';
test('R49/R50/R52: clean deployment artifact, CSP hashes and all subpath resources',async t=>{
 await mkdir('dist/src',{recursive:true});await writeFile('dist/stale-qa.html','must not publish');await writeFile('dist/src/.old-qa.js','must not publish');
 execFileSync(process.execPath,['scripts/build.mjs']);
 for(const stale of ['dist/stale-qa.html','dist/src/.old-qa.js'])await assert.rejects(access(stale));
 assert.ok((await readdir('dist')).every(name=>!name.startsWith('.')));
 const server=createStaticServer({root:'dist',base:'/TuxFall/'});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));t.after(()=>new Promise(resolve=>server.close(resolve)));
 const origin=`http://127.0.0.1:${server.address().port}`;
 for(const file of ['index.html','about.html','cookies.html']){
  const url=base+(file==='index.html'?'':file),response=await fetch(origin+'/TuxFall/'+file),html=await response.text();
  assert.equal(response.status,200);assert.match(html,new RegExp(`<link rel="canonical" href="${url.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}">`));
  assert.match(html,/connect-src 'none'/);assert.match(html,/object-src 'none'/);assert.match(html,/<meta name="referrer" content="no-referrer">/);
  assert.doesNotMatch(html,/<style>|\son\w+=|javascript:/i);
  for(const [,content] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
   assert.match(html,new RegExp('sha256-'+createHash('sha256').update(content).digest('base64').replace(/[+]/g,'\\+')));
   const data=JSON.parse(content);assert.equal(data.url,base);assert.equal(data.author.name,'David Ortega Hoyas');assert.equal(data.aggregateRating,undefined);
  }
  for(const [,path] of html.matchAll(/(?:href|src)="(\.\/[^"#]+)"/g)){
   const asset=await fetch(new URL(path,origin+'/TuxFall/'+file));assert.equal(asset.status,200,path);
  }
 }
 const sitemap=await (await fetch(origin+'/TuxFall/sitemap.xml')).text();assert.equal([...sitemap.matchAll(/<loc>/g)].length,3);
 assert.equal((await fetch(origin+'/TuxFall/.git/config')).status,403);
 assert.equal((await fetch(origin+'/src/main.js')).status,404);
 assert.equal((await fetch(origin+'/TuxFall/',{method:'POST'})).status,405);
 assert.equal((await fetch(origin+'/TuxFall/src/main.js',{method:'HEAD'})).headers.get('content-type'),'text/javascript; charset=utf-8');
});
