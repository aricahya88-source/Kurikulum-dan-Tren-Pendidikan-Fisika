import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(new URL('..', import.meta.url).pathname);
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const checks=[];
const add=(name,ok,detail='')=>checks.push({name,ok,detail});

const setup=read('apps-script/Setup.gs');
const config=read('src/lib/courseConfig.ts');
const themes=read('src/lib/projectThemes.ts');
const manifest=JSON.parse(read('public/manifest.webmanifest'));

add('Brand Edu Curicula',setup.includes('EDU CURICULA SIAP')&&manifest.name.includes('Edu Curicula'));
const weekIds=[...setup.matchAll(/'W(\d{2})'/g)].map(m=>m[1]);
for(let i=1;i<=16;i++){const n=String(i).padStart(2,'0');add(`Week ${n}`,weekIds.includes(n)||config.includes(`base(${i},`));}
add('7 student-led meetings',[3,4,9,10,11,12,13].every(n=>config.includes(`base(${n},`)&&config.includes(n===3?'STUDENT_LED':'STUDENT_LED')));
add('Article analysis activity',setup.includes("activity_id:'ARTICLE_ANALYSIS'")&&themes!==undefined);
add('Program analysis activity',setup.includes("activity_id:'PROGRAM_ANALYSIS'"));
add('UTS blueprint activity',setup.includes("project_code:'UTS_BLUEPRINT'")&&themes.includes("code:'UTS_BLUEPRINT'"));
add('UAS curriculum activity',setup.includes("project_code:'UAS_CURRICULUM'")&&themes.includes("code:'UAS_CURRICULUM'"));
add('No lecture rule',setup.toLowerCase().includes('metode ceramah tidak diperbolehkan'));
add('PWA icons',fs.existsSync(path.join(root,'public/icon-192.png'))&&fs.existsSync(path.join(root,'public/icon-512.png')));

const failed=checks.filter(c=>!c.ok);
console.log(JSON.stringify({ok:failed.length===0,checks,failed},null,2));
if(failed.length)process.exit(1);
