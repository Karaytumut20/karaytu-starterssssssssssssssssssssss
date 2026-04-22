export const siteConfig = {
  name: "SU Yatçılık | İstanbul Boğazı'nda Özel Yat Kiralama",
  shortName: "SU Yatçılık",
  description:
    "İstanbul Boğazı'nda lüks yat kiralama. Boğaz turu, gün batımı, yemekli yat turu, evlenme teklifi ve özel etkinlikler için online rezervasyon yapın.",
  url: "https://www.suyat.com.tr",

  ogImage: "https://www.suyat.com.tr/og-image.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,

  ogLocality: "İstanbul",
  ogCountryName: "Türkiye",

  themeColors: {
    dark: "#0c0c0c",
    light: "#f0f4f8",
  },
  defaultThemeColor: "#0c0c0c",

  siteType: "TravelAgency",
  priceRange: "$$$",
  lang: "tr",

  // 🔥 GÜNCELLEME: Dil kodları (Uluslararası SEO)
  locale: "tr-TR",

  contactEmail: "info@suyat.com.tr",
  contactTelephone: "+908508403030",
  foundedAt: "2015-01-01",

  address: {
    streetAddress: "Arnavutköy Mh. Eğlence Sok. No:14/1",
    addressLocality: "Beşiktaş",
    addressRegion: "İstanbul",
    postalCode: "34345",
    addressCountry: "TR",
  },
  geo: {
    latitude: 41.0682,
    longitude: 29.0435,
  },

  links: {
    instagram: "https://instagram.com/suyatcilik",
  },
  twitterHandle: "",

  keywords: [
    "İstanbul Yat Kiralama",
    "Boğaz Turu",
    "Özel Yat Kiralama",
    "Lüks Yat Kiralama",
    "Yemekli Boğaz Turu",
    "Yatta Evlenme Teklifi",
    "Adalar Turu",
    "Tekne Kiralama İstanbul",
  ],
  knowsAbout: [
    "Özel Yat Kiralama",
    "Boğaz Turları",
    "Yatta Etkinlik",
    "Kurumsal Yat Turları",
    "Evlilik Teklifi Organizasyonu",
    "Lüks Tatil Deneyimi",
  ],

  creator: "SU Yatçılık",

  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    bing: "bing-verification-code",
  },
} as const;

export type SiteConfig = typeof siteConfig;
