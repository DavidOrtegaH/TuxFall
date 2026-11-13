import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {pathToFileURL} from 'node:url';
const types={'.png':'image/png','.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml; charset=utf-8'};
export function createStaticServer({root=resolve('.'),base='/'}={}){
 root=resolve(root);
 return createServer(async(req,res)=>{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'}).end();return;}
  try{
   const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   if(base!=='/'&&pathname===base.slice(0,-1)){res.writeHead(308,{Location:base}).end();return;}
   if(!pathname.startsWith(base)){res.writeHead(404).end('Not found');return;}
   const relative=pathname.slice(base.length)||'index.html';
   if(relative.split(/[\\/]/).some(part=>part.startsWith('.'))){res.writeHead(403).end();return;}
   const path=resolve(root,relative);
   if(!path.startsWith(root+sep)){res.writeHead(403).end();return;}
   const data=await readFile(path);
   res.writeHead(200,{'Content-Type':types[extname(path)]||'text/plain; charset=utf-8','X-Content-Type-Options':'nosniff'});
   res.end(req.method==='HEAD'?undefined:data);
  }catch{res.writeHead(404).end('Not found');}
 });
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const option=(key,fallback)=>{const index=process.argv.indexOf(key);return index<0?fallback:process.argv[index+1];};
 const port=Number(option('--port','5173')),base=option('--base','/');
 if(!base.startsWith('/')||!base.endsWith('/'))throw Error('Base must begin and end with /');
 createStaticServer({root:option('--root','.'),base}).listen(port,'127.0.0.1',()=>console.log(`TuxFall: http://127.0.0.1:${port}${base}`));
}
