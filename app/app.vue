<template>
  <div
    class="min-h-screen app-wrapper bg-light text-dark selection:bg-dark selection:text-light"
  >
    <VitePwaManifest />

    <NuxtRouteAnnouncer />
    <GridHelper />

    <RotateDeviceOverlay />

    <Preloader />

    <NuxtLayout>
      <NuxtPage :page-key="route.fullPath" :transition="pageTransition" />
    </NuxtLayout>

    <Menu />
    <ContactModal />
    <FloatingWhatsApp />
    <PhoneVerificationModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "~/utils/site";
import { useAppStore } from "~/stores/app";

const store = useAppStore();
const route = useRoute();

if (route.path === "/contact") {
  store.isContactOpen = true;
}

useHead({
  htmlAttrs: {
    lang: siteConfig.lang,
    translate: "no",
    class: () => (store.isBot ? "is-bot-agent" : ""),
  },
  titleTemplate: (titleChunk) => {
    if (store.isContactOpen) {
      return `İletişime Geçin | ${siteConfig.shortName}`;
    }
    if (
      !titleChunk ||
      titleChunk === "Home" ||
      titleChunk === siteConfig.name
    ) {
      return siteConfig.name;
    }
    return `${titleChunk} | ${siteConfig.shortName}`;
  },
  meta: [
    { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
    { name: "color-scheme", content: "light" },
    { name: "google", content: "notranslate" },
    { name: "robots", content: "index, follow, notranslate" },
    { "http-equiv": "Content-Language", content: siteConfig.lang },
    { property: "og:locality", content: siteConfig.ogLocality },
    { property: "og:country-name", content: siteConfig.ogCountryName },
    {
      name: "google-site-verification",
      content: siteConfig.verification.google,
    },
    { name: "yandex-verification", content: siteConfig.verification.yandex },
    { name: "msvalidate.01", content: siteConfig.verification.bing },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no",
    },
  ],
  link: [
    { rel: "canonical", href: () => `${siteConfig.url}${route.path}` },
    // 🔥 GÜNCELLEME: Uluslararası SEO (Hreflang)
    {
      rel: "alternate",
      hreflang: siteConfig.locale,
      href: () => `${siteConfig.url}${route.path}`,
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: () => `${siteConfig.url}${route.path}`,
    },

    { rel: "help", href: "/llms.txt", type: "text/plain" },
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: "RSS Feed",
      href: "/rss.xml",
    },
    { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
    { rel: "dns-prefetch", href: "https://www.google-analytics.com" },
    { rel: "preconnect", href: "https://www.googletagmanager.com" },
    { rel: "preconnect", href: "https://www.google-analytics.com" },
  ],
  noscript: [
    {
      innerHTML:
        "<style>.invisible { visibility: visible !important; opacity: 1 !important; }</style>",
    },
  ],
});

useSeoMeta({
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords.join(", "),
  author: siteConfig.creator,

  ogLocale: siteConfig.locale.replace("-", "_"),
  ogType: "website",
  ogSiteName: siteConfig.shortName,
  ogTitle: siteConfig.name,
  ogDescription: siteConfig.description,
  ogImage: siteConfig.ogImage,
  ogImageWidth: siteConfig.ogImageWidth,
  ogImageHeight: siteConfig.ogImageHeight,
  ogUrl: () => `${siteConfig.url}${route.path}`,

  twitterCard: "summary_large_image",
  twitterSite: siteConfig.twitterHandle,
  twitterCreator: siteConfig.twitterHandle,
  twitterTitle: siteConfig.name,
  twitterDescription: siteConfig.description,
  twitterImage: siteConfig.ogImage,
});

useSchemaOrg([
  defineOrganization({
    name: siteConfig.name,
    legalName: siteConfig.creator,
    logo: siteConfig.ogImage,
    url: siteConfig.url,
    sameAs: Object.values(siteConfig.links),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contactTelephone,
      contactType: "Customer Support",
    },
  }),
  defineLocalBusiness({
    "@type": "TravelAgency" as any,
    name: siteConfig.creator,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contactTelephone,
    priceRange: siteConfig.priceRange,
    address: siteConfig.address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    image: siteConfig.ogImage,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:30",
        closes: "19:00",
      },
    ],
  }),
  defineWebSite({
    name: siteConfig.shortName,
    url: siteConfig.url,
    inLanguage: siteConfig.lang,
    description: siteConfig.description,
  }),
  defineBreadcrumb({
    itemListElement: [{ name: "Ana Sayfa", item: siteConfig.url }],
  }),
]);

const pageTransition = {
  name: "page",
  mode: "out-in" as const,
  css: false,

  onBeforeLeave: (el: Element) => {
    store.startTransition();
  },
  onLeave: (el: Element, done: () => void) => {
    gsap.to(el, {
      opacity: 0,
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: done,
    });
  },
  onLeaveCancelled: (el: Element) => {
    gsap.killTweensOf(el);
    gsap.set(el, { opacity: 1 });
    store.endTransition();
  },
  onBeforeEnter: (el: Element) => {
    gsap.set(el, { opacity: 0 });
    store.resetScroll();
  },
  onEnter: (el: Element, done: () => void) => {
    gsap.to(el, {
      opacity: 1,
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => {
        ScrollTrigger.refresh();
        done();
      },
    });
  },
  onAfterEnter: (el: Element) => {
    gsap.set(el, { clearProps: "opacity" });
    store.endTransition();
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  },
  onEnterCancelled: (el: Element) => {
    gsap.killTweensOf(el);
    gsap.set(el, { opacity: 1, clearProps: "opacity" });
    store.endTransition();
  },
};

const handlePopState = () => {
  if (window.location.pathname === "/contact") {
    store.openContact();
  } else {
    store.closeContact();
  }
};

onMounted(() => {
  window.addEventListener("popstate", handlePopState);

  if (window.location.pathname === "/contact") {
    if (store.isBot) return;

    store.isContactOpen = false;

    if (store.isPreloaderDone) {
      store.openContact();
    } else {
      const unwatch = watch(
        () => store.isPreloaderDone,
        (isDone) => {
          if (isDone) {
            setTimeout(() => {
              store.openContact();
            }, 100);
            unwatch();
          }
        },
      );
    }
  }
});

onUnmounted(() => {
  window.removeEventListener("popstate", handlePopState);
});
</script>
