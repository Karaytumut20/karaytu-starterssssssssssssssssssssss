const fs = require('fs');

let f1 = fs.readFileSync('app/pages/deneyimlerimiz/index.vue', 'utf8');
f1 = f1.replace(/e\.target\.src/g, '(e.target as HTMLImageElement).src');
fs.writeFileSync('app/pages/deneyimlerimiz/index.vue', f1);

let f2 = fs.readFileSync('app/pages/rezervasyon.vue', 'utf8');
f2 = f2.replace(/e\.target\.src/g, '(e.target as HTMLImageElement).src');
f2 = f2.replace(/route\.query\.date/g, '(route.query.date as string | undefined)');
f2 = f2.replace(/route\.query\.time/g, '(route.query.time as string | undefined)');
f2 = f2.replace(/route\.query\.duration/g, '(route.query.duration as string | undefined)');
f2 = f2.replace(/const srv = extraServices\[idx\];/g, 'const srv = extraServices[idx]; if (!srv) return total;');
fs.writeFileSync('app/pages/rezervasyon.vue', f2);

let f3 = fs.readFileSync('app/pages/yatlarimiz/index.vue', 'utf8');
f3 = f3.replace(/e\.target\.src/g, '(e.target as HTMLImageElement).src');
f3 = f3.replace(/data\.serverPrefetch/g, '(data as any).serverPrefetch');
fs.writeFileSync('app/pages/yatlarimiz/index.vue', f3);

let f4 = fs.readFileSync('app/pages/yatlarimiz/[slug].vue', 'utf8');
f4 = f4.replace(/booking\.value\.time\.split/g, '(booking.value.time || "").split');
fs.writeFileSync('app/pages/yatlarimiz/[slug].vue', f4);

let f5 = fs.readFileSync('app/pages/iletisim.vue', 'utf8');
f5 = f5.replace(/allowfullscreen=""/g, '');
fs.writeFileSync('app/pages/iletisim.vue', f5);
