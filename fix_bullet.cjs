const fs = require('fs');
const files = ['app/pages/blog/[slug].vue', 'app/pages/deneyimlerimiz/[slug].vue', 'app/pages/yat-turu-organizasyon/[slug].vue'];
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.split('”¢').join('•');
  fs.writeFileSync(file, content, 'utf8');
}
