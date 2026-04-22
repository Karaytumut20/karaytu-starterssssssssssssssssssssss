import { u as useRoute, a as useAsyncData, b as useSeoMeta, c as useSchemaOrg, d as useHead, _ as __nuxt_component_0$1, e as __nuxt_component_1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, ref, mergeProps, unref, withCtx, createTextVNode, openBlock, createBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useSupabaseClient } from './useSupabaseClient-4v4x5xwK.mjs';
import { defineBreadcrumb, defineProduct } from '@unhead/schema-org/vue';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'consola';
import 'node:fs';
import 'node:url';
import '@supabase/supabase-js';
import 'fast-xml-parser';
import 'ipx';
import 'node:path';
import 'node:crypto';
import 'pinia';
import 'vue-router';
import '@supabase/ssr';
import '@vue/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const supabase = useSupabaseClient();
    const slug = route.params.slug;
    const { data: pageData, pending } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`yacht-page-${slug}`, async () => {
      const { data: yacht2 } = await supabase.from("yachts").select("*").eq("slug", slug).single();
      let otherYachts2 = [];
      if (yacht2) {
        const { data: others } = await supabase.from("yachts").select("*").neq("id", yacht2.id).limit(20);
        if (others && others.length > 0) {
          otherYachts2 = others.sort(() => 0.5 - Math.random()).slice(0, 4);
        }
      }
      return { yacht: yacht2, otherYachts: otherYachts2 };
    })), __temp = await __temp, __restore(), __temp);
    const yacht = computed(() => pageData.value?.yacht);
    const otherYachts = computed(() => pageData.value?.otherYachts || []);
    const galleryImages = computed(() => {
      if (!yacht.value) return [];
      let imgs = [];
      if (yacht.value.main_image) {
        imgs.push({ src: yacht.value.main_image, alt: yacht.value.main_image_alt || yacht.value.name });
      }
      if (yacht.value.gallery) {
        let parsedUrls = yacht.value.gallery;
        if (typeof parsedUrls === "string") {
          try {
            parsedUrls = JSON.parse(parsedUrls);
          } catch (e) {
          }
        }
        let parsedAlts = yacht.value.gallery_alts || [];
        if (typeof parsedAlts === "string") {
          try {
            parsedAlts = JSON.parse(parsedAlts);
          } catch (e) {
          }
        }
        if (Array.isArray(parsedUrls)) {
          parsedUrls.forEach((url, idx) => {
            imgs.push({
              src: url,
              alt: parsedAlts[idx] || `${yacht.value.name} - Görsel ${idx + 1}`
            });
          });
        }
      }
      return imgs.length > 0 ? imgs : [{ src: "/images/img1.jpg", alt: yacht.value?.name || "Yat Resmi" }];
    });
    const activeImage = ref(0);
    const minDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const booking = ref({
      date: "",
      time: "12:00",
      durationKey: "2h"
    });
    const totalPrice = computed(() => {
      if (!yacht.value) return 0;
      const base = yacht.value.price_hourly || 0;
      switch (booking.value.durationKey) {
        case "2h":
          return yacht.value.price_2h || base * 2;
        case "3h":
          return yacht.value.price_3h || base * 3;
        case "4h":
          return yacht.value.price_4h || base * 4;
        case "adalar":
          return yacht.value.price_adalar || base * 8;
        case "bogaz":
          return yacht.value.price_bogaz || base * 8;
        default:
          return base * 2;
      }
    });
    const formError = ref("");
    useSeoMeta({
      title: () => yacht.value?.meta_title || `${yacht.value?.name || "Yat Detay"} | Lüks Yat Kiralama`,
      description: () => yacht.value?.meta_description || yacht.value?.description || "İstanbul Boğazında lüks yat kiralama detayları.",
      keywords: () => yacht.value?.meta_keywords || ""
    });
    useSchemaOrg([
      defineBreadcrumb({
        itemListElement: [
          { name: "Ana Sayfa", item: "/" },
          { name: "Yatlarımız", item: "/yatlarimiz" },
          { name: () => yacht.value?.name || "Detay", item: () => `/yatlarimiz/${yacht.value?.slug}` }
        ]
      }),
      defineProduct({
        name: () => yacht.value?.name,
        description: () => yacht.value?.meta_description || "İstanbul Boğazı lüks kiralık yat.",
        image: () => yacht.value?.main_image || "/images/img1.jpg",
        offers: [
          {
            price: () => yacht.value?.price_hourly || 0,
            priceCurrency: "TRY",
            availability: "InStock"
          }
        ]
      })
    ]);
    useHead(() => {
      const headData = {
        link: [
          { rel: "canonical", href: `https://suyatcilik.com/yatlarimiz/${route.params.slug}` }
        ]
      };
      if (yacht.value?.faq && yacht.value.faq.length) {
        const faqJsonLd = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": yacht.value.faq.map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a
            }
          }))
        };
        headData.script = [{
          type: "application/ld+json",
          innerHTML: JSON.stringify(faqJsonLd)
        }];
      }
      return headData;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NuxtImg = __nuxt_component_1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "w-full bg-[#f8f9fc] text-[#1c2c44] pt-24 lg:pt-32 pb-24 min-h-dvh" }, _attrs))}>`);
      if (unref(pending)) {
        _push(`<div class="w-full h-[50vh] flex items-center justify-center"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#215d8f]"></div></div>`);
      } else if (!yacht.value) {
        _push(`<div class="w-full h-[50vh] flex flex-col items-center justify-center"><h1 class="text-3xl font-bold mb-4">Yat Bulunamadı</h1>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/yatlarimiz",
          class: "bg-[#215d8f] text-white px-6 py-2 rounded-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Tüm Yatlar`);
            } else {
              return [
                createTextVNode("Tüm Yatlar")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="max-w-6xl mx-auto px-6 lg:px-8"><div class="mb-6 flex items-center gap-2 text-[13px] font-medium text-[#64748b]">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "hover:text-[#0ea5e9] transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Ana Sayfa`);
            } else {
              return [
                createTextVNode("Ana Sayfa")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span>/</span>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/yatlarimiz",
          class: "hover:text-[#0ea5e9] transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Yatlarımız`);
            } else {
              return [
                createTextVNode("Yatlarımız")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span>/</span><span class="text-[#1c2c44] font-bold">${ssrInterpolate(yacht.value.name)}</span></div><div class="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 xl:gap-16 items-start mb-16"><div class="flex flex-col gap-8"><div class="relative rounded-[24px] overflow-hidden shadow-lg aspect-[16/9] bg-black group">`);
        if (galleryImages.value[activeImage.value]) {
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: galleryImages.value[activeImage.value].src,
            format: "webp",
            alt: galleryImages.value[activeImage.value].alt,
            class: "absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (galleryImages.value.length > 1) {
          _push(`<div class="absolute bottom-4 left-0 right-0 justify-center gap-2 z-10 mt-4 hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity"><!--[-->`);
          ssrRenderList(galleryImages.value, (img, idx) => {
            _push(`<button class="${ssrRenderClass(["w-16 h-12 rounded-lg overflow-hidden border-2 transition-all", activeImage.value === idx ? "border-white !scale-110" : "border-transparent opacity-60 hover:opacity-100"])}"><img${ssrRenderAttr("src", img.src)}${ssrRenderAttr("alt", img.alt)} class="w-full h-full object-cover"></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (galleryImages.value.length > 1) {
          _push(`<button class="md:hidden absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm shadow p-2 rounded-full"><svg class="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        if (galleryImages.value.length > 1) {
          _push(`<button class="md:hidden absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm shadow p-2 rounded-full"><svg class="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="bg-white rounded-2xl shadow-sm border border-[#e2e8f0]/80 p-8"><h1 class="text-3xl md:text-4xl font-extrabold text-[#1c2c44] leading-tight mb-4">${ssrInterpolate(yacht.value.name)}</h1><div class="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-100">`);
        if (yacht.value.capacity) {
          _push(`<div class="flex items-center gap-2 text-[#64748b] bg-[#f8f9fc] border border-[#e2e8f0] px-3 py-1.5 rounded-lg"><svg class="w-5 h-5 text-[#215d8f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg><span class="font-semibold">${ssrInterpolate(yacht.value.capacity)} Kişi</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (yacht.value.length) {
          _push(`<div class="flex items-center gap-2 text-[#64748b] bg-[#f8f9fc] border border-[#e2e8f0] px-3 py-1.5 rounded-lg"><svg class="w-5 h-5 text-[#215d8f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg><span class="font-semibold">${ssrInterpolate(yacht.value.length)} Metre</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (yacht.value.built_year) {
          _push(`<div class="flex items-center gap-2 text-[#64748b] bg-[#f8f9fc] border border-[#e2e8f0] px-3 py-1.5 rounded-lg"><svg class="w-5 h-5 text-[#215d8f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span class="font-semibold">Yapım: ${ssrInterpolate(yacht.value.built_year)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (yacht.value.cabins) {
          _push(`<div class="flex items-center gap-2 text-[#64748b] bg-[#f8f9fc] border border-[#e2e8f0] px-3 py-1.5 rounded-lg"><span class="font-semibold px-2">Kabin: ${ssrInterpolate(yacht.value.cabins)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (yacht.value.bathrooms) {
          _push(`<div class="flex items-center gap-2 text-[#64748b] bg-[#f8f9fc] border border-[#e2e8f0] px-3 py-1.5 rounded-lg"><span class="font-semibold px-2">Banyo: ${ssrInterpolate(yacht.value.bathrooms)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (yacht.value.description) {
          _push(`<div class="prose prose-slate max-w-none text-[#475569] leading-relaxed mb-8"><p>${yacht.value.description ?? ""}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-gray-50 rounded-2xl p-6 border border-[#e2e8f0]"><h3 class="text-lg font-bold text-[#1c2c44] mb-4">Özel Tur Paketleri</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"><p class="font-bold text-[#1c2c44] mb-1">Tam Gün (Adalar Turu)</p><p class="text-sm text-gray-500 mb-2">09:00 - 17:00 arası (8 saat)</p><p class="text-lg font-black text-[#0ea5e9]">${ssrInterpolate(Number(yacht.value.price_adalar || yacht.value.price_hourly * 8).toLocaleString("tr-TR"))} TL</p></div><div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"><p class="font-bold text-[#1c2c44] mb-1">Tam Gün (Boğaz Turu)</p><p class="text-sm text-gray-500 mb-2">09:00 - 17:00 arası (8 saat)</p><p class="text-lg font-black text-[#0ea5e9]">${ssrInterpolate(Number(yacht.value.price_bogaz || yacht.value.price_hourly * 8).toLocaleString("tr-TR"))} TL</p></div></div></div></div></div><div class="relative"><div class="sticky top-32 bg-white rounded-[24px] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-[#e2e8f0]/80 p-8"><div class="flex justify-between items-start border-b border-gray-100 pb-6 mb-6"><div><p class="text-[#64748b] text-[13px] font-bold uppercase tracking-wider mb-1">Saatlik Fiyat</p><p class="text-3xl font-black text-[#1c2c44] leading-none">${ssrInterpolate(Number(yacht.value.price_hourly).toLocaleString("tr-TR"))} <span class="text-[14px] font-bold text-gray-400">TL / saat</span></p></div></div><div class="space-y-5"><div><label class="block text-sm font-bold text-[#1c2c44] mb-2">Tarih Seçin</label><input type="date"${ssrRenderAttr("value", booking.value.date)}${ssrRenderAttr("min", unref(minDate))} class="w-full bg-[#f8f9fc] border border-gray-200 text-[#1c2c44] font-bold text-sm rounded-xl py-3 focus:ring-2 focus:ring-[#007bff] focus:border-transparent outline-none transition-all"></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-bold text-[#1c2c44] mb-2">Saat Seçin</label><input type="time"${ssrRenderAttr("value", booking.value.time)} class="w-full bg-[#f8f9fc] border border-gray-200 text-[#1c2c44] font-bold text-sm rounded-xl py-3 focus:ring-2 focus:ring-[#007bff] focus:border-transparent outline-none transition-all"></div><div><label class="block text-sm font-bold text-[#1c2c44] mb-2">Program Seçimi</label><select class="w-full bg-[#f8f9fc] border border-gray-200 text-[#1c2c44] font-bold text-sm rounded-xl py-3 focus:ring-2 focus:ring-[#007bff] focus:border-transparent outline-none transition-all appearance-none cursor-pointer"><option value="2h"${ssrIncludeBooleanAttr(Array.isArray(booking.value.durationKey) ? ssrLooseContain(booking.value.durationKey, "2h") : ssrLooseEqual(booking.value.durationKey, "2h")) ? " selected" : ""}>2 Saat Mola</option><option value="3h"${ssrIncludeBooleanAttr(Array.isArray(booking.value.durationKey) ? ssrLooseContain(booking.value.durationKey, "3h") : ssrLooseEqual(booking.value.durationKey, "3h")) ? " selected" : ""}>3 Saat Gezi</option><option value="4h"${ssrIncludeBooleanAttr(Array.isArray(booking.value.durationKey) ? ssrLooseContain(booking.value.durationKey, "4h") : ssrLooseEqual(booking.value.durationKey, "4h")) ? " selected" : ""}>4 Saat</option><option value="adalar"${ssrIncludeBooleanAttr(Array.isArray(booking.value.durationKey) ? ssrLooseContain(booking.value.durationKey, "adalar") : ssrLooseEqual(booking.value.durationKey, "adalar")) ? " selected" : ""}>Tam Gün (Adalar)</option><option value="bogaz"${ssrIncludeBooleanAttr(Array.isArray(booking.value.durationKey) ? ssrLooseContain(booking.value.durationKey, "bogaz") : ssrLooseEqual(booking.value.durationKey, "bogaz")) ? " selected" : ""}>Tam Gün (Boğaz)</option></select></div></div></div><div class="mt-8 pt-6 border-t border-gray-100"><div class="flex justify-between items-end mb-6"><span class="text-[#1c2c44] font-bold text-lg">Toplam Tutar</span><span class="text-2xl font-black text-[#0ea5e9]">${ssrInterpolate(Number(totalPrice.value).toLocaleString("tr-TR"))} TL</span></div>`);
        if (formError.value) {
          _push(`<div class="mb-4 text-xs font-bold text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">${ssrInterpolate(formError.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="w-full bg-[#1c2c44] text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-[#0f172a] transition-all shadow-lg group"> Hemen Rezervasyon Yap <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></button><a href="https://wa.me/905441014343" target="_blank" class="w-full mt-3 bg-[#22c55e] text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-[#16a34a] transition-colors shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg> WhatsApp ile Sor </a></div></div></div></div>`);
        if (yacht.value.faq && yacht.value.faq.length > 0) {
          _push(`<div class="mt-8 mb-16 max-w-4xl"><h2 class="text-2xl md:text-3xl font-extrabold text-[#1c2c44] mb-8">Sıkça Sorulan Sorular</h2><div class="space-y-4"><!--[-->`);
          ssrRenderList(yacht.value.faq, (faq, idx) => {
            _push(`<details class="group bg-white border border-[#e2e8f0]/80 rounded-2xl p-6 shadow-sm [&amp;_summary::-webkit-details-marker]:hidden cursor-pointer"><summary class="flex justify-between items-center font-bold text-lg text-[#1c2c44]">${ssrInterpolate(faq.q)} <span class="transition group-open:rotate-180"><svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg></span></summary><p class="text-[#475569] mt-4 leading-relaxed">${ssrInterpolate(faq.a)}</p></details>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (otherYachts.value && otherYachts.value.length > 0) {
          _push(`<div class="mt-20 pt-16 border-t border-gray-200"><div class="flex items-center justify-between mb-8"><h2 class="text-2xl md:text-3xl font-extrabold text-[#1c2c44]">Diğer Yatlarımız</h2>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/yatlarimiz",
            class: "text-[#215d8f] font-bold text-sm hover:underline flex items-center gap-1"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Tümünü Gör <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
              } else {
                return [
                  createTextVNode(" Tümünü Gör "),
                  (openBlock(), createBlock("svg", {
                    class: "w-4 h-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 5l7 7-7 7"
                    })
                  ]))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
          ssrRenderList(otherYachts.value, (oy) => {
            _push(`<div class="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-[#e2e8f0]/60 flex flex-col group relative">`);
            if (oy.capacity) {
              _push(`<div class="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-[#1c2c44] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">${ssrInterpolate(oy.capacity)} kişi </div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="w-full h-[200px] overflow-hidden relative bg-gray-100">`);
            _push(ssrRenderComponent(_component_NuxtImg, {
              src: oy.main_image || "/images/default.jpg",
              alt: oy.name,
              class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700",
              format: "webp"
            }, null, _parent));
            _push(`</div><div class="p-6 flex flex-col flex-grow"><h3 class="text-[17px] font-bold text-[#1c2c44] leading-tight mb-2">${ssrInterpolate(oy.name)}</h3><div class="mt-auto flex items-center justify-between"><div class="flex items-baseline gap-1"><span class="text-[#1c2c44] font-extrabold text-[18px]">₺${ssrInterpolate(Number(oy.price_hourly).toLocaleString("tr-TR"))}</span><span class="text-gray-400 text-[10px] font-bold">/ saat</span></div>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/yatlarimiz/${oy.slug}`,
              class: "w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#1c2c44] group-hover:bg-[#1c2c44] group-hover:text-white transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 5l7 7-7 7"
                      })
                    ]))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/yatlarimiz/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CJVvQJGa.mjs.map
