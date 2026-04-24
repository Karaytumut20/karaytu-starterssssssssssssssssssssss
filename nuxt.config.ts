import { siteConfig } from "./app/utils/site";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  ssr: process.env.NODE_ENV === 'production', // 🔥 KÖK ÇÖZÜM: Canlıda (Production) SSR açık, yerelde (Local/Windows) Vite-Node çökmesini engellemek için SSR kapalı.

  // 🔥 Windows IPC Fix: IPv6 (::1) yerine IPv4 (127.0.0.1) kullanarak
  // Vite Node IPC soketinin çökmesini engelliyoruz.
  devServer: {
    host: '127.0.0.1',
  },

  srcDir: "app/",

  app: {
    head: {
      htmlAttrs: {
        lang: siteConfig.lang,
      },
      // 🔥 KÖK ÇÖZÜM: Tarayıcının ilk boyama (Initial Paint) anında beyaz patlatmasını %100 engeller.
      bodyAttrs: {
        style: "background-color: #0c0c0c;",
      },
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no",
      meta: [
        { name: "theme-color", content: siteConfig.defaultThemeColor },
        { name: "msapplication-TileColor", content: "#0c0c0c" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "default",
        },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#fffcf5" },
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: siteConfig.url,
      gtagId: "",
    },
  },

  routeRules: {
    '/admin/**': { proxy: 'http://127.0.0.1:3005/admin/**' }
  },

  ignore: [
    "admin/**",
    "supabase/**"
  ],

  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@vite-pwa/nuxt",
    "nuxt-schema-org",
    "@nuxtjs/supabase",
    "@nuxtjs/google-fonts"
  ],

  supabase: {
    redirectOptions: {
      login: "/giris",
      callback: "/confirm",
      exclude: ["/*"], // By default exclude all routes, we will protect manually for now based on needs or protect specific paths like /hesabim
    },
  },

  // 🔥 GÜNCELLEME: Global Stock Yazı Tipi (Inter)
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700, 800, 900],
      'Playfair Display': [400, 500, 600, 700],
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
  },

  schemaOrg: {
    identity: "Organization",
  },

  css: ["~/assets/scss/main.scss"],

  build: {
    transpile: ["gsap", "three"],
  },

  vite: {
    optimizeDeps: {
      include: [
        "three",
        "three/examples/jsm/loaders/SVGLoader.js",
        "@unhead/schema-org/vue",
        "lenis",
      ],
    },
  },

  devServerHandlers: [],
  nitro: {
    routeRules: {
      "/_ipx/**": {
        headers: {
          "cache-control": "public, max-age=31536000, immutable",
        },
      },
      "/**": {
        headers: {
          "X-Content-Type-Options": "nosniff",
          "X-XSS-Protection": "1; mode=block",
          "Strict-Transport-Security":
            "max-age=31536000; includeSubDomains; preload",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          // CSP headers removed temporarily as they block Vite HMR and DevTools in local environment, 
          // causing "Bu inçerik engellenmiştir" errors and IPC crashes.
        },
      },
    },
  },

  image: {
    format: ["avif", "webp"],
    quality: 90,
    provider: "ipx",
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1440,
      "3xl": 1600,
      "4xl": 1920,
      "5xl": 2560,
      "6xl": 3840,
    },
  },

  site: {
    url: siteConfig.url,
    name: siteConfig.name,
    trailingSlash: false,
  },

  sitemap: {
    autoLastmod: true,
    strictNuxtContentPaths: true,
    sources: [
      '/api/_sitemap-urls',
    ],
  },

  robots: {
    allow: "*",
    sitemap: `${siteConfig.url}/sitemap.xml`,
  },

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: siteConfig.name,
      short_name: siteConfig.shortName,
      description: siteConfig.description,
      theme_color: siteConfig.defaultThemeColor,
      background_color: siteConfig.defaultThemeColor,
      display: "standalone",
      orientation: "portrait",
      id: "/",
      start_url: "/",
      icons: [
        {
          src: "/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: null,
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff2}"],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
    devOptions: {
      enabled: false,
      suppressWarnings: true,
    },
  },

  hooks: {
    "pages:extend"(pages) {
      pages.push({
        name: "contact",
        path: "/contact",
        file: "~/pages/index.vue",
      });
    },
    'nitro:config'(nitroConfig) {
      const imports = (nitroConfig as any).imports;
      if (imports?.imports) {
        imports.imports = imports.imports.filter((i: any) => i?.name !== 'useAppConfig');
      }
    },
  },
});
