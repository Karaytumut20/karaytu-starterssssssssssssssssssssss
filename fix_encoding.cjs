const fs = require('fs');
const files = ['app/pages/blog/[slug].vue', 'app/pages/deneyimlerimiz/[slug].vue', 'app/pages/yat-turu-organizasyon/[slug].vue'];
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const map = {
    'Ä±': 'ı', 'Ä°': 'İ', 'Ã§': 'ç', 'Ã‡': 'Ç', 'Ã¶': 'ö', 'Ã–': 'Ö', 'Ã¼': 'ü', 'Ãœ': 'Ü', 'ÅŸ': 'ş', 'Åž': 'Ş', 'ÄŸ': 'ğ', 'Äž': 'Ğ', 'â€œ': '“', 'â€': '”', 'â€™': '’'
  };
  for (const [bad, good] of Object.entries(map)) {
    content = content.split(bad).join(good);
  }
  fs.writeFileSync(file, content, 'utf8');
}
console.log('Done');
