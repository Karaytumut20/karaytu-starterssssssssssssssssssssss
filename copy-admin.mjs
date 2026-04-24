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
const src = path.join(process.cwd(), 'admin', 'package', '.output', 'public');
const dest = path.join(process.cwd(), 'public', 'admin');

if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
}

if (fs.existsSync(src)) {
    copyRecursiveSync(src, dest);
    console.log("Copied admin build successfully to app/public/admin!");
} else {
    console.error("Admin build not found at: " + src);
    process.exit(1);
}
