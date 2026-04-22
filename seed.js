import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

if (!url || !key) {
  console.log("Missing env vars");
  process.exit(1);
}

const supabase = createClient(url, key);

const initialYachts = [
  { name: "SU Royal", slug: "su-royal", capacity: 36, length: "24.0", price_hourly: 7950, price_2h: 15900, price_3h: 23850, price_4h: 31800, price_adalar: 47600, price_yuzme: 47600, deposit_percentage: 50, image_url: "/images/img4.jpg", featured: false, description: "SU Royal, İstanbul Boğazı'nda lüks ve prestijin zirvesini temsil eder. 24 metrelik bu görkemli yat..." },
  { name: "SU Orion", slug: "su-orion", capacity: 24, length: "26.0", price_hourly: 6800, price_2h: 13600, price_3h: 20400, price_4h: 27200, price_adalar: 46000, price_yuzme: 46000, deposit_percentage: 50, image_url: "/images/luxury_yacht_sunset.png", featured: false, description: "SU Orion, orta ölçekli gruplar için tasarlanmış şık ve konforlu bir yattır. 26 metrelik zarif yapısıyla..." },
  { name: "SU Prestige", slug: "su-prestige", capacity: 12, length: "22.5", price_hourly: 5950, price_2h: 11900, price_3h: 17850, price_4h: 23800, price_adalar: 39600, price_yuzme: 39600, deposit_percentage: 50, image_url: "/images/img1.jpg", featured: true, description: "SU Prestige, lüks ve zarafetin mükemmel birleşimidir. 22.5 metrelik bu zarif yat, 12 kişilik kapasitesiyle..." },
  { name: "SU", slug: "su", capacity: 12, length: "21.5", price_hourly: 4950, price_2h: 9900, price_3h: 14850, price_4h: 19800, price_adalar: 34600, price_yuzme: 34600, deposit_percentage: 50, image_url: "/images/img2.jpg", featured: false, description: "SU Yatı, uygun fiyatla lüks deneyim arayanlar için mükemmel bir seçenektir. 21.5 metrelik zarif tasarımı..." }
];

const initialExperiences = [
  { name: 'İstanbul Boğazı Özel Yat Turu', slug: 'istanbul-bogazi-ozel-yat-turu', price: 9900, image_url: '/images/img4.jpg', short_description: "İstanbul Boğazının büyüleyici güzelliğini özel yatımızla keşfedin. Tarihi yalılar, görkemli köprüler ve eşsiz manzaralar sizi bekliyor.", featured: false },
  { name: 'Yemekli Yat Turu', slug: 'yemekli-yat-turu', price: 14200, image_url: '/images/luxury_yacht_sunset.png', short_description: "Işıl ışıl Boğaz manzarasında, özenle hazırlanan lezzetlerle unutulmaz bir akşam yemeği deneyimi yaşayın.", featured: false },
  { name: 'Günbatımı Boğaz Turu', slug: 'gunbatimi-bogaz-turu', price: 9900, image_url: '/images/img1.jpg', short_description: "Gökyüzünün kızıla büründüğü ve İstanbul'un tüm ihtişamıyla kendini gösterdiği sihirli saatlerde unutulmaz bir gün batımı deneyimi.", featured: true },
  { name: 'Adalar Yat Turu', slug: 'adalar-yat-turu', price: 29500, image_url: '/images/img2.jpg', short_description: "Boğaz'dan Prens Adaları'na özel yatla heyecan verici bir kaçamak. Yüzme, ada keşfi ve İstanbul'un iki yüzü tek günde.", featured: false },
  { name: 'Yüzme Turu', slug: 'yuzme-turu', price: 29500, image_url: '/images/img3.jpg', short_description: "İstanbul kalabalığından uzağa, Adalar veya Marmara'nın serin sularında serinleyin. Özel yüzme ve güneşlenme molası.", featured: false },
  { name: 'Yatta Kahvaltı', slug: 'yatta-kahvalti', price: 12490, image_url: '/images/img4.jpg', short_description: "Boğazın eşsiz sabah manzarasında, zengin bir Türk kahvaltısı sofrasıyla güne başlayın. Unutulmaz bir sabah deneyimi.", featured: false },
  { name: 'Yatta Romantik Akşam Yemeği', slug: 'yatta-romantik-aksam-yemegi', price: 14200, image_url: '/images/luxury_yacht_sunset.png', short_description: "Sıradan bir mekanı geride bırakıp özel yatınızda, baş başa Boğaz manzarası eşliğinde sadece ikinize ait romantik bir akşam yemeği.", featured: true }
];

async function seed() {
  console.log("Seeding Yachts...");
  for (let yacht of initialYachts) {
     const { data, error } = await supabase.from('yachts').upsert(yacht, { onConflict: 'slug' });
     if (error) console.error("Error inserting yacht", yacht.slug, error.message);
  }
  
  console.log("Seeding Experiences...");
  for (let exp of initialExperiences) {
     const { data, error } = await supabase.from('experiences').upsert(exp, { onConflict: 'slug' });
     if (error) console.error("Error inserting exp", exp.slug, error.message);
  }
  
  console.log("Seeding completed.");
}

seed();
