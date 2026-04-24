import fs from 'fs';
import path from 'path';

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log("Copying admin build to public folder...");
const srcLocal = path.join(process.cwd(), 'admin', 'package', '.output', 'public');
const srcVercel = path.join(process.cwd(), 'admin', 'package', '.vercel', 'output', 'static');
const dest = path.join(process.cwd(), 'public', 'admin');

let src = '';
if (fs.existsSync(srcLocal)) {
    src = srcLocal;
} else if (fs.existsSync(srcVercel)) {
    src = srcVercel;
    // Nuxt places it in .vercel/output/static/admin when baseURL is /admin/
    if (fs.existsSync(path.join(srcVercel, 'admin'))) {
        src = path.join(srcVercel, 'admin');
    }
}

if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
}

if (src !== '' && fs.existsSync(src)) {
    copyRecursiveSync(src, dest);
    console.log("Copied admin build successfully from " + src + " to public/admin!");
} else {
    console.error("Admin build not found at: " + srcLocal + " or " + srcVercel);
    process.exit(1);
}
