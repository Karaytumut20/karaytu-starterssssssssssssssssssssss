import { f as useSupabaseUser, a as useAsyncData, b as useSeoMeta, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, ref, watch, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-C3ECA2vx.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-4v4x5xwK.mjs';
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
import '@unhead/schema-org/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSupabaseClient();
    useSupabaseUser();
    const { data: homeData } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("home-all-data", async () => {
      {
        return {
          yachts: [],
          experiences: [],
          settings: [],
          reviews: []
        };
      }
    }, { lazy: true })), __temp = await __temp, __restore(), __temp);
    const fallbackYachts = [
      { id: "1", name: "YatigoTR Royal", slug: "YatigoTR-royal", capacity: 36, length: "24.0", price_hourly: 7950, price_2h: 15900, main_image: "/images/img4.jpg", featured: false },
      { id: "2", name: "YatigoTR Orion", slug: "YatigoTR-orion", capacity: 24, length: "26.0", price_hourly: 6800, price_2h: 13600, main_image: "/images/luxury_yacht_sunset.png", featured: false },
      { id: "3", name: "YatigoTR Prestige", slug: "YatigoTR-prestige", capacity: 12, length: "22.5", price_hourly: 5950, price_2h: 11900, main_image: "/images/img1.jpg", featured: true },
      { id: "4", name: "YatigoTR", slug: "YatigoTR", capacity: 12, length: "21.5", price_hourly: 4950, price_2h: 9900, main_image: "/images/img2.jpg", featured: false }
    ];
    const fallbackExperiences = [
      { id: "exp1", title: "İstanbul Boğazı Özel Yat Turu", slug: "istanbul-bogazi-ozel-yat-turu", starting_price: 9900, main_image: "/images/img4.jpg", short_description: "İstanbul Boğazının büyüleyici güzelliğini özel yatımızla keşfedin. Tarihi yalılar..." },
      { id: "exp2", title: "Yemekli Yat Turu", slug: "yemekli-yat-turu", starting_price: 14200, main_image: "/images/luxury_yacht_sunset.png", short_description: "Işıl ışıl Boğaz manzarasında, özenle hazırlanan lezzetlerle unutulmaz bir akşam yemeği..." },
      { id: "exp3", title: "Adalar Yat Turu", slug: "adalar-yat-turu", starting_price: 29500, main_image: "/images/img2.jpg", short_description: "Boğaz'dan Prens Adaları'na özel yatla heyecan verici bir kaçamak. Yüzme, ada keşfi..." },
      { id: "exp4", title: "Yatta Evlenme Teklifi", slug: "yatta-evlenme-teklifi", starting_price: 14200, main_image: "/images/img3.jpg", short_description: "Hayal edilebilecek en romantik ortamda evlilik teklifi edin." }
    ];
    const yachts = computed(() => {
      const db = homeData.value?.yachts;
      return db && db.length > 0 ? db : fallbackYachts;
    });
    const experiences = computed(() => {
      const db = homeData.value?.experiences;
      return db && db.length > 0 ? db : fallbackExperiences;
    });
    const allReviews = computed(() => {
      return homeData.value?.reviews || [];
    });
    const settingsForm = ref({
      hero_title: "İstanbul Boğazında\nÖzel Yat Turu",
      hero_subtitle: "Boğaz turu, gün batımı, yemekli tur ve özel etkinlikler için size en uygun yatı seçin ve kolayca rezervasyon yapın.",
      hero_badge: "İstanbul Boğazı'nda Özel Yat Kiralama",
      hero_price_text: "Saatlik 4.950 TL'den başlayan fiyatlarla",
      stats_years: "16+",
      stats_rating: "4.8",
      stats_guests: "65Bin+",
      site_meta_title: "",
      site_meta_description: "",
      site_meta_keywords: ""
    });
    watch(() => homeData.value?.settings, (dbSettings) => {
      if (dbSettings && dbSettings.length > 0) {
        dbSettings.forEach((item) => {
          if (settingsForm.value[item.key_name] !== void 0) {
            settingsForm.value[item.key_name] = item.value;
          }
        });
        useSeoMeta({
          title: settingsForm.value.site_meta_title || "YatigoTR Yatçılık - Boğazda Özel Yat Kiralama",
          description: settingsForm.value.site_meta_description || "İstanbul Boğazı'nda en uygun fiyatlarla özel yat kiralama, boğaz turu, evlilik teklifi ve organizasyonlar için hemen rezervasyon yapın.",
          keywords: settingsForm.value.site_meta_keywords || "yat kiralama, boğaz turu"
        });
      }
    }, { immediate: true });
    const getAvatarColor = (name) => {
      if (!name) return "#1c2c44";
      const colors = [
        "#e53935",
        // Red
        "#1e88e5",
        // Blue
        "#43a047",
        // Green
        "#fdd835",
        // Yellow (darker text theoretically needed, but let's stick to typical Material)
        "#8e24aa",
        // Purple
        "#fb8c00",
        // Orange
        "#00acc1",
        // Cyan
        "#d81b60"
        // Pink
      ];
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      const index = Math.abs(hash) % colors.length;
      return colors[index];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans text-[#1c2c44] bg-[#f8f9fc] min-h-screen pb-10 overflow-x-hidden" }, _attrs))}><section class="w-full relative overflow-hidden min-h-[85vh] lg:min-h-[800px] flex flex-col justify-center"><div class="absolute inset-0 z-0 bg-[#0f2038]"><img${ssrRenderAttr("src", _imports_0)} alt="İstanbul Boğazı Özel Yat Turu" class="w-full h-full object-cover object-bottom opacity-70"><div class="absolute inset-0 bg-gradient-to-r from-[#0f2038]/95 via-[#0f2038]/70 to-transparent"></div></div><div class="w-full grid grid-cols-14 mt-20 relative z-10"><div class="col-start-3 col-end-13 w-full"><div class="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full py-1.5 mb-8"><div class="w-1.5 h-1.5 rounded-full bg-[#eab308]"></div><span class="text-white text-[11px] font-bold tracking-wide">${ssrInterpolate(settingsForm.value.hero_badge)}</span></div><h1 class="text-white text-5xl md:text-[5rem] font-bold leading-[1.05] tracking-tight mb-8 whitespace-pre-line" style="${ssrRenderStyle({ "line-break": "auto" })}">${String(settingsForm.value.hero_title || "").replace(/\n/g, "<br />") ?? ""}</h1><div class="w-12 h-1 bg-[#00bfff] mb-6"></div><p class="text-white/90 text-[15px] md:text-[17px] font-medium max-w-[500px] leading-relaxed mb-8">${ssrInterpolate(settingsForm.value.hero_subtitle)}</p><div class="inline-flex items-center gap-2 border border-[#eab308]/30 bg-[#172740]/60 backdrop-blur-md rounded-lg px-5 py-3 mb-8"><svg class="w-4 h-4 text-[#eab308]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg><span class="text-[#eab308] text-[13px] font-bold">${ssrInterpolate(settingsForm.value.hero_price_text)}</span></div><div class="flex flex-wrap items-center gap-4 lg:gap-6 mb-12"><div class="flex items-center gap-2"><svg class="w-4 h-4 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg><span class="text-white text-[12px] font-bold tracking-wide">Güvenli Ödeme</span></div><div class="flex items-center gap-2"><svg class="w-4 h-4 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><span class="text-white text-[12px] font-bold tracking-wide">Profesyonel Mürettebat</span></div><div class="flex items-center gap-2"><svg class="w-4 h-4 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg><span class="text-white text-[12px] font-bold tracking-wide">Anında Onay</span></div></div><div class="flex items-center gap-10 lg:gap-16 mb-12"><div class="flex flex-col"><span class="text-[#00bfff] text-[32px] font-black leading-none mb-1 shadow-sm">${ssrInterpolate(settingsForm.value.stats_years)}</span><span class="text-white/80 text-[10px] font-bold uppercase tracking-wider">Yıllık Deneyim</span></div><div class="flex flex-col border-l border-white/10 pl-10 lg:pl-16"><span class="text-[#00bfff] text-[32px] font-black leading-none mb-1 shadow-sm">${ssrInterpolate(settingsForm.value.stats_rating)}</span><span class="text-white/80 text-[10px] font-bold uppercase tracking-wider">Google Puanı</span></div><div class="flex flex-col border-l border-white/10 pl-10 lg:pl-16"><span class="text-[#00bfff] text-[32px] font-black leading-none mb-1 shadow-sm">${ssrInterpolate(settingsForm.value.stats_guests)}</span><span class="text-white/80 text-[10px] font-bold uppercase tracking-wider">Mutlu Misafir</span></div></div><div><div class="flex flex-wrap items-center gap-4 mb-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/rezervasyon",
        class: "bg-white text-[#1c2c44] font-bold text-[14px] px-8 py-3.5 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Hemen Rezervasyon Yap → `);
          } else {
            return [
              createTextVNode(" Hemen Rezervasyon Yap → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/yatlarimiz",
        class: "bg-[#2a4365]/40 backdrop-blur-md border border-white/30 text-white font-bold text-[14px] px-8 py-3.5 rounded-full flex items-center justify-center hover:bg-[#2a4365]/60 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Yatlarımız `);
          } else {
            return [
              createTextVNode(" Yatlarımız ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-white/60 text-[10px] font-medium ml-2">%50 ön ödemeyle kesinleştirin</p></div></div></div><div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 w-full"><span class="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Kaydır</span><svg class="w-6 h-6 text-white/50 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="7" y="4" width="10" height="16" rx="5" stroke-width="1.5"></rect><path d="M12 8v4" stroke-width="1.5" stroke-linecap="round"></path></svg></div></section><section class="w-full bg-white pt-20 pb-20"><div class="w-full grid grid-cols-14"><div class="col-start-3 col-end-13 w-full"><div class="text-center mb-16 flex flex-col items-center"><span class="text-[#0073e6] text-[10px] font-bold uppercase tracking-[0.15em] mb-3 block">Nasil Çalışır?</span><h2 class="text-3xl md:text-[2.5rem] font-bold text-[#1c2c44] tracking-tight leading-tight mb-4">3 Adımda Yat Kiralama</h2><p class="text-[#64748b] text-sm md:text-base font-medium">Online rezervasyon sistemiyle kolay ve hızlı yat kiralama.</p></div><div class="flex flex-col lg:flex-row justify-center items-start lg:items-center relative gap-12 lg:gap-0 mt-20 lg:mt-24"><div class="hidden lg:block absolute top-[50px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-[#e2e8f0] z-0 pointer-events-none"></div><div class="flex flex-col items-center text-center z-10 w-full lg:w-1/3 relative"><div class="relative mb-6"><div class="w-24 h-24 rounded-full bg-[#f0f6ff] flex items-center justify-center text-[#1c2c44]"><svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div><div class="absolute -top-1 -right-1 w-7 h-7 bg-[#ffd700] rounded-full border-2 border-white flex items-center justify-center text-[#1c2c44] text-xs font-bold shadow-sm">1</div></div><h3 class="text-lg font-bold text-[#1c2c44] mb-3">Yat Seçin</h3><p class="text-[#64748b] text-[13px] leading-relaxed max-w-[240px] font-medium">Kişi sayınıza ve etkinlik türünüze göre en uygun yatı belirleyin.</p><div class="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-[#cbd5e1] z-10"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></div></div><div class="flex flex-col items-center text-center z-10 w-full lg:w-1/3 relative"><div class="relative mb-6"><div class="w-24 h-24 rounded-full bg-[#f0f6ff] flex items-center justify-center text-[#1c2c44]"><svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div><div class="absolute -top-1 -right-1 w-7 h-7 bg-[#ffd700] rounded-full border-2 border-white flex items-center justify-center text-[#1c2c44] text-xs font-bold shadow-sm">2</div></div><h3 class="text-lg font-bold text-[#1c2c44] mb-3">Tarih ve Saat Belirleyin</h3><p class="text-[#64748b] text-[13px] leading-relaxed max-w-[240px] font-medium">Anlık müsaitlik takviminden istediğiniz tarih ve saati seçin.</p><div class="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-[#cbd5e1] z-10"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></div></div><div class="flex flex-col items-center text-center z-10 w-full lg:w-1/3 relative"><div class="relative mb-6"><div class="w-24 h-24 rounded-full bg-[#fffcf0] flex items-center justify-center text-[#ffd700]"><svg class="w-10 h-10 text-[#ffd700]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="absolute -top-1 -right-1 w-7 h-7 bg-[#ffd700] rounded-full border-2 border-white flex items-center justify-center text-[#1c2c44] text-xs font-bold shadow-sm">3</div></div><h3 class="text-lg font-bold text-[#1c2c44] mb-3">Rezervasyonu Tamamlayın</h3><p class="text-[#64748b] text-[13px] leading-relaxed max-w-[240px] font-medium">%50 ön ödeme ile rezervasyonunuzu kesinleştirin, kalan tutarı tur günü ödeyin.</p></div></div></div></div></section><section class="w-full grid grid-cols-14 py-20 pb-10"><div class="col-start-3 col-end-13 w-full"><div class="text-center mb-12 flex flex-col items-center"><span class="text-[#215d8f] text-[11px] font-bold uppercase tracking-[0.18em] mb-2.5 block">DENEYİMLER</span><h2 class="text-[32px] md:text-[42px] font-extrabold text-[#112135] tracking-tight leading-tight mb-3">Popüler Deneyimler</h2><p class="text-[#64748b] text-[15px] font-medium">Boğaz turları ve özel organizasyonlar için öne çıkan seçenekler.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
      ssrRenderList(experiences.value.slice(0, 4), (exp) => {
        _push(`<div class="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-[#e2e8f0]/60 flex flex-col group relative"><div class="w-full h-[220px] overflow-hidden relative"><img${ssrRenderAttr("src", exp.main_image || "/images/default.jpg")}${ssrRenderAttr("alt", exp.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"></div><div class="p-6 flex flex-col flex-grow"><h3 class="text-[17px] font-bold text-[#1c2c44] leading-tight mb-2">${ssrInterpolate(exp.title)}</h3><p class="text-[#64748b] text-[13px] leading-relaxed line-clamp-3 mb-6">${ssrInterpolate(exp.short_description)}</p><div class="mt-auto"><div class="flex flex-col mb-4"><span class="text-[#0073e6] font-bold text-[18px]">${ssrInterpolate(Number(exp.starting_price).toLocaleString("tr-TR"))} TL</span><span class="text-gray-400 text-[10px] uppercase tracking-wider font-bold">başlayan fiyatlarla</span></div><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/deneyimlerimiz/${exp.slug}`,
          class: "flex-1 bg-white text-[#1c2c44] border border-gray-200 font-bold text-[12px] py-2.5 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Detayları Gör `);
            } else {
              return [
                createTextVNode(" Detayları Gör ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/rezervasyon",
          class: "flex-1 bg-[#1c2c44] text-white border border-[#1c2c44] font-bold text-[12px] py-2.5 rounded-lg flex items-center justify-center hover:bg-[#2a4365] transition-colors text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Rezervasyon Yap `);
            } else {
              return [
                createTextVNode(" Rezervasyon Yap ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-14 mb-0 flex justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/deneyimlerimiz",
        class: "bg-[#1c2c44] text-white font-bold text-[13px] px-8 py-3.5 rounded-full flex items-center justify-center hover:bg-[#2a4365] transition-colors shadow-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tüm Deneyimleri Görün <span class="ml-2"${_scopeId}>→</span>`);
          } else {
            return [
              createTextVNode(" Tüm Deneyimleri Görün "),
              createVNode("span", { class: "ml-2" }, "→")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="w-full grid grid-cols-14 py-10 pb-20 border-t border-gray-100"><div class="col-start-3 col-end-13 w-full"><div class="mb-12 flex flex-col items-start"><span class="text-[#215d8f] text-[11px] font-bold uppercase tracking-[0.18em] mb-2.5 block">FİLOMUZ</span><div class="w-full flex-col md:flex-row flex justify-between items-start md:items-end gap-4"><h2 class="text-[32px] md:text-[42px] font-extrabold text-[#112135] tracking-tight leading-tight">Yatlarımız</h2><p class="text-[#64748b] text-[14px] font-medium max-w-sm text-left md:text-right">Kişi sayısı ve tur planınıza göre en uygun yatı seçin.</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
      ssrRenderList(yachts.value.slice(0, 4), (yacht) => {
        _push(`<div class="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-[#e2e8f0]/60 flex flex-col group relative"><div class="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-[#1c2c44] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">${ssrInterpolate(yacht.capacity)} kişi </div><div class="w-full h-[220px] overflow-hidden relative"><img${ssrRenderAttr("src", yacht.main_image || "/images/default.jpg")}${ssrRenderAttr("alt", yacht.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"></div><div class="p-6 flex flex-col flex-grow"><h3 class="text-[17px] font-bold text-[#1c2c44] leading-tight mb-2">${ssrInterpolate(yacht.name)}</h3><p class="text-[#64748b] text-[12px] leading-relaxed line-clamp-3 mb-6">${ssrInterpolate(yacht.description || `${yacht.name}, İstanbul Boğazı'nda lüks ve prestijin zirvesini temsil eder.`)}</p><div class="mt-auto flex items-center justify-between"><div class="flex items-baseline gap-1"><span class="text-[#1c2c44] font-extrabold text-[18px]">${ssrInterpolate(Number(yacht.price_hourly).toLocaleString("tr-TR"))}</span><span class="text-gray-400 text-[10px] font-bold">TL / saat</span></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/yatlarimiz/${yacht.slug}`,
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
      _push(`<!--]--></div><div class="mt-14 mb-0 flex justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/yatlarimiz",
        class: "text-[#1c2c44] font-bold text-[13px] px-8 py-3.5 hover:text-[#0073e6] transition-colors flex items-center justify-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tüm Yatlarımızı Görün <span class="ml-2"${_scopeId}>→</span>`);
          } else {
            return [
              createTextVNode(" Tüm Yatlarımızı Görün "),
              createVNode("span", { class: "ml-2" }, "→")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-10 mb-0 flex justify-center"><a href="https://g.page/suyatcilik" target="_blank" class="bg-[#e8f5e9] text-[#2e7d32] border border-[#a5d6a7] font-bold text-[13px] px-6 py-2 rounded-full flex items-center justify-center hover:bg-[#c8e6c9] transition-colors shadow-sm"> Değerlendirme 5.0/5.0 <span class="ml-2 bg-[#ffffff] rounded-full flex p-1 w-5 h-5 items-center justify-center shadow-sm"><svg viewBox="0 0 24 24" class="w-3 h-3"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg></span></a></div></div></section>`);
      if (allReviews.value.length > 0) {
        _push(`<section class="w-full grid grid-cols-14 py-16 pb-24 border-t border-gray-100"><div class="col-start-3 col-end-13 w-full"><div class="text-center mb-12 flex flex-col items-center"><span class="text-[#215d8f] text-[11px] font-bold uppercase tracking-[0.18em] mb-2.5 block">MÜŞTERİ YORUMLARI</span><h2 class="text-[32px] md:text-[42px] font-extrabold text-[#112135] tracking-tight leading-tight mb-3">Misafirlerimiz Ne Diyor?</h2><p class="text-[#64748b] text-[15px] font-medium">Google&#39;da 5 yıldızlı yorumlarımızı inceleyin.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(allReviews.value.slice(0, 6), (review) => {
          _push(`<div class="bg-white p-6 rounded-[16px] shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-[#e2e8f0]/40 relative flex flex-col"><svg class="absolute top-6 right-6 w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg><div class="flex items-center gap-3 mb-4">`);
          if (!review.avatar_url || !review.avatar_url.includes("/")) {
            _push(`<div class="${ssrRenderClass(`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-lg uppercase shadow-sm`)}" style="${ssrRenderStyle({ backgroundColor: review.avatar_color || getAvatarColor(review.reviewer_name) })}">${ssrInterpolate(review.reviewer_name?.charAt(0) || "U")}</div>`);
          } else {
            _push(`<div class="w-10 h-10 rounded-full overflow-hidden shadow-sm"><img${ssrRenderAttr("src", review.avatar_url)}${ssrRenderAttr("alt", review.reviewer_name)} class="w-full h-full object-cover"></div>`);
          }
          _push(`<div><h4 class="font-bold text-[14px] text-[#1c2c44] leading-none mb-1">${ssrInterpolate(review.reviewer_name)}</h4><p class="text-[11px] text-[#94a3b8] font-medium">${ssrInterpolate(review.created_at ? new Date(review.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }) : "11 Nisan 2026")}</p></div></div><div class="flex items-center gap-1.5 mb-3"><div class="flex text-[#fbbc05]"><!--[-->`);
          ssrRenderList(Math.floor(Number(review.rating) || 5), (s) => {
            _push(`<svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`);
          });
          _push(`<!--]--></div><svg class="w-3.5 h-3.5 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg></div><p class="text-[13px] text-[#475569] leading-relaxed font-medium mb-2">${ssrInterpolate(review.comment)}</p></div>`);
        });
        _push(`<!--]--></div><div class="mt-8 flex justify-center"><div class="bg-[#0b6b4e] text-white text-[12px] font-bold py-1.5 rounded-md flex items-center gap-1.5 shadow-sm"><span>Doğrulayan: Trustindex</span><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22A10 10 0 1 0 12 2a10 10 0 0 0 0 20Z"></path><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></div></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-IgNUARWv.mjs.map
