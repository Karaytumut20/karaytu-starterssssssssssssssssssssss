import { i as _export_sfc, a as useSupabaseClient, b as useAsyncData, c as useSeoMeta, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, withCtx, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-C3ECA2vx.mjs';
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
    const mainContainer = ref(null);
    const { data: homeData, pending } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("home-all-data-lux", async () => {
      return { yachts: [], settings: [], experiences: [], reviews: [] };
    }, { lazy: true })), __temp = await __temp, __restore(), __temp);
    const fallbackYachts = [
      { id: "1", name: "YatigoTR Royal", slug: "yatigo-royal", capacity: 36, length: "24.0", price_hourly: 7950, main_image: "/images/img4.jpg" },
      { id: "2", name: "YatigoTR Orion", slug: "yatigo-orion", capacity: 24, length: "26.0", price_hourly: 6800, main_image: "/images/luxury_yacht_sunset.png" },
      { id: "3", name: "YatigoTR Prestige", slug: "yatigo-prestige", capacity: 12, length: "22.5", price_hourly: 5950, main_image: "/images/img1.jpg" }
    ];
    const yachts = computed(() => {
      const d = homeData.value?.yachts;
      return d?.length ? d : fallbackYachts;
    });
    const experiences = computed(() => homeData.value?.experiences || []);
    const reviews = computed(() => homeData.value?.reviews || []);
    const settingsForm = ref({});
    if (homeData.value?.settings?.length) {
      homeData.value.settings.forEach((item) => {
        settingsForm.value[item.key_name] = item.value;
      });
    }
    useSeoMeta({
      title: "Lüks Yat Kiralama | İstanbul Boğazı",
      description: "İstanbul Boğazı'nda elit yat kiralama deneyimi. Awwwards standartlarında lüks."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "bg-[#050A10] text-white font-sans min-h-screen overflow-hidden selection:bg-amber-500 selection:text-black",
        ref_key: "mainContainer",
        ref: mainContainer
      }, _attrs))} data-v-7e5c8dd9><div class="fixed top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none" data-v-7e5c8dd9></div><div class="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" data-v-7e5c8dd9></div><section class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" data-v-7e5c8dd9><div class="absolute inset-0 z-0" data-v-7e5c8dd9><img${ssrRenderAttr("src", _imports_0)} alt="Hero Background" class="w-full h-full object-cover opacity-30" data-v-7e5c8dd9><div class="absolute inset-0 bg-gradient-to-b from-[#050A10]/10 via-[#050A10]/60 to-[#050A10]" data-v-7e5c8dd9></div></div><div class="relative z-10 max-w-[1400px] w-full mx-auto px-6 flex flex-col items-center text-center" data-v-7e5c8dd9><div class="hero-badge inline-flex items-center gap-3 px-5 py-2 rounded-full border border-amber-500/30 bg-black/40 backdrop-blur-md mb-8" data-v-7e5c8dd9><div class="w-2 h-2 rounded-full bg-amber-500 animate-ping" data-v-7e5c8dd9></div><span class="text-amber-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]" data-v-7e5c8dd9>${ssrInterpolate(settingsForm.value.hero_badge || "Lüksün Sınırlarını Keşfedin")}</span></div><h1 class="hero-title text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] font-[&#39;Playfair_Display&#39;] mb-8" data-v-7e5c8dd9> DENİZDEKİ <br data-v-7e5c8dd9><span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600 italic" data-v-7e5c8dd9>SARAYINIZ</span></h1><p class="hero-desc text-lg md:text-xl text-white/60 max-w-2xl font-light mb-12" data-v-7e5c8dd9> İstanbul Boğazı&#39;nın eşsiz dokusunu, dünya standartlarında lüks yat filomuz ve kişiye özel hizmet anlayışımızla deneyimleyin. </p><div class="hero-btn" data-v-7e5c8dd9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/yatlarimiz",
        class: "group relative inline-flex items-center justify-center px-8 py-5 text-base font-bold text-black bg-amber-500 rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" data-v-7e5c8dd9${_scopeId}></span><span class="relative flex items-center gap-2" data-v-7e5c8dd9${_scopeId}> Filoyu Keşfet <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-7e5c8dd9${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-v-7e5c8dd9${_scopeId}></path></svg></span>`);
          } else {
            return [
              createVNode("span", { class: "absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" }),
              createVNode("span", { class: "relative flex items-center gap-2" }, [
                createTextVNode(" Filoyu Keşfet "),
                (openBlock(), createBlock("svg", {
                  class: "w-5 h-5 group-hover:translate-x-1 transition-transform",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M17 8l4 4m0 0l-4 4m4-4H3"
                  })
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="py-24 bg-white relative z-10 text-center" data-v-7e5c8dd9><div class="max-w-[1300px] mx-auto px-6" data-v-7e5c8dd9><div class="mb-14" data-v-7e5c8dd9><h4 class="text-[#1d4e89] text-[13px] font-bold uppercase tracking-[0.2em] mb-3 font-sans" data-v-7e5c8dd9>DENEYİMLER</h4><h2 class="text-[#0b213b] text-4xl md:text-5xl font-extrabold mb-4 font-sans tracking-tight" data-v-7e5c8dd9>Popüler Deneyimler</h2><p class="text-gray-500 text-[15px] font-sans" data-v-7e5c8dd9>Boğaz turları ve özel organizasyonlar için öne çıkan seçenekler.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left" data-v-7e5c8dd9><!--[-->`);
      ssrRenderList(experiences.value.slice(0, 4), (exp) => {
        _push(`<div class="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col transition-transform hover:-translate-y-1" data-v-7e5c8dd9><div class="h-[180px] overflow-hidden" data-v-7e5c8dd9><img${ssrRenderAttr("src", exp.main_image || "/images/default.jpg")}${ssrRenderAttr("alt", exp.title)} class="w-full h-full object-cover" data-v-7e5c8dd9></div><div class="p-6 flex flex-col flex-1" data-v-7e5c8dd9><h3 class="text-[#0b213b] text-[17px] font-bold mb-2 font-sans leading-snug" data-v-7e5c8dd9>${ssrInterpolate(exp.title)}</h3><p class="text-gray-500 text-[13px] line-clamp-2 leading-relaxed mb-4 font-sans" data-v-7e5c8dd9>${ssrInterpolate(exp.short_description)}</p><div class="border-t border-gray-100 my-4" data-v-7e5c8dd9></div><div class="mb-5" data-v-7e5c8dd9><p class="text-[#1d4e89] text-[22px] font-extrabold font-sans leading-none" data-v-7e5c8dd9>${ssrInterpolate(Number(exp.starting_price || 0).toLocaleString("tr-TR"))} TL</p><p class="text-gray-400 text-[11px] font-sans mt-1" data-v-7e5c8dd9>başlayan fiyatlarla</p></div><div class="flex gap-2 mt-auto" data-v-7e5c8dd9>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/deneyimlerimiz/${exp.slug}`,
          class: "flex-1 text-center py-2.5 rounded-xl border border-[#1d4e89] text-[#1d4e89] font-bold text-[13px] hover:bg-[#f0f4f8] transition-colors font-sans"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Detayları Gör`);
            } else {
              return [
                createTextVNode("Detayları Gör")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/rezervasyon",
          class: "flex-1 text-center py-2.5 rounded-xl bg-[#1d4e89] text-white font-bold text-[13px] hover:bg-[#153a66] transition-colors font-sans"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Rezervasyon Yap`);
            } else {
              return [
                createTextVNode("Rezervasyon Yap")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div><div class="text-center mt-12" data-v-7e5c8dd9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/deneyimlerimiz",
        class: "inline-flex items-center gap-2 bg-[#0b213b] text-white px-8 py-3.5 rounded-xl font-bold text-[14px] hover:bg-[#153a66] transition-colors font-sans shadow-md hover:shadow-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tüm Deneyimleri Görün → `);
          } else {
            return [
              createTextVNode(" Tüm Deneyimleri Görün → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="py-24 bg-white relative z-10 border-t border-gray-50/50" data-v-7e5c8dd9><div class="max-w-[1300px] mx-auto px-6" data-v-7e5c8dd9><div class="flex flex-col md:flex-row justify-between items-end mb-12" data-v-7e5c8dd9><div data-v-7e5c8dd9><h4 class="text-[#1d4e89] text-[13px] font-bold uppercase tracking-[0.2em] mb-3 font-sans" data-v-7e5c8dd9>FİLOMUZ</h4><h2 class="text-[#0b213b] text-4xl md:text-5xl font-extrabold font-sans tracking-tight" data-v-7e5c8dd9>Yatlarımız</h2></div><p class="text-gray-500 text-[15px] font-sans mt-4 md:mt-0" data-v-7e5c8dd9>Kişi sayısı ve tur planınıza göre en uygun yatı seçin.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-v-7e5c8dd9><!--[-->`);
      ssrRenderList(yachts.value.slice(0, 4), (yacht) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: yacht.id,
          to: `/yatlarimiz/${yacht.slug}`,
          class: "bg-white rounded-[16px] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col transition-transform hover:-translate-y-1 group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="relative h-[200px] overflow-hidden" data-v-7e5c8dd9${_scopeId}><img${ssrRenderAttr("src", yacht.main_image || "/images/img1.jpg")}${ssrRenderAttr("alt", yacht.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-v-7e5c8dd9${_scopeId}><div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#0b213b] text-[13px] font-bold px-4 py-1.5 rounded-xl shadow-sm" data-v-7e5c8dd9${_scopeId}>${ssrInterpolate(yacht.capacity)} kişi </div></div><div class="p-6 flex flex-col flex-1" data-v-7e5c8dd9${_scopeId}><h3 class="text-[#0b213b] text-[18px] font-bold mb-3 font-sans" data-v-7e5c8dd9${_scopeId}>${ssrInterpolate(yacht.name)}</h3><p class="text-gray-500 text-[13px] line-clamp-2 leading-relaxed mb-6 font-sans" data-v-7e5c8dd9${_scopeId}>${ssrInterpolate(yacht.name)}, İstanbul Boğazı&#39;nda lüks ve prestijin zirvesini temsil eder. ${ssrInterpolate(yacht.length)} metrelik bu görkemli yat, ... </p><div class="mt-auto" data-v-7e5c8dd9${_scopeId}><div class="w-full h-px bg-gray-100 mb-5" data-v-7e5c8dd9${_scopeId}></div><div class="flex justify-between items-center" data-v-7e5c8dd9${_scopeId}><div data-v-7e5c8dd9${_scopeId}><span class="text-[#0b213b] text-[22px] font-extrabold font-sans leading-none" data-v-7e5c8dd9${_scopeId}>${ssrInterpolate(Number(yacht.price_hourly || 0).toLocaleString("tr-TR"))}</span><span class="text-gray-400 text-[12px] font-sans ml-1" data-v-7e5c8dd9${_scopeId}>TL / saat</span></div><div class="w-10 h-10 rounded-xl bg-[#f8fafc] border border-gray-100 flex items-center justify-center text-[#0b213b] group-hover:bg-[#1d4e89] group-hover:text-white transition-colors" data-v-7e5c8dd9${_scopeId}><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-7e5c8dd9${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" data-v-7e5c8dd9${_scopeId}></path></svg></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "relative h-[200px] overflow-hidden" }, [
                  createVNode("img", {
                    src: yacht.main_image || "/images/img1.jpg",
                    alt: yacht.name,
                    class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  }, null, 8, ["src", "alt"]),
                  createVNode("div", { class: "absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#0b213b] text-[13px] font-bold px-4 py-1.5 rounded-xl shadow-sm" }, toDisplayString(yacht.capacity) + " kişi ", 1)
                ]),
                createVNode("div", { class: "p-6 flex flex-col flex-1" }, [
                  createVNode("h3", { class: "text-[#0b213b] text-[18px] font-bold mb-3 font-sans" }, toDisplayString(yacht.name), 1),
                  createVNode("p", { class: "text-gray-500 text-[13px] line-clamp-2 leading-relaxed mb-6 font-sans" }, toDisplayString(yacht.name) + ", İstanbul Boğazı'nda lüks ve prestijin zirvesini temsil eder. " + toDisplayString(yacht.length) + " metrelik bu görkemli yat, ... ", 1),
                  createVNode("div", { class: "mt-auto" }, [
                    createVNode("div", { class: "w-full h-px bg-gray-100 mb-5" }),
                    createVNode("div", { class: "flex justify-between items-center" }, [
                      createVNode("div", null, [
                        createVNode("span", { class: "text-[#0b213b] text-[22px] font-extrabold font-sans leading-none" }, toDisplayString(Number(yacht.price_hourly || 0).toLocaleString("tr-TR")), 1),
                        createVNode("span", { class: "text-gray-400 text-[12px] font-sans ml-1" }, "TL / saat")
                      ]),
                      createVNode("div", { class: "w-10 h-10 rounded-xl bg-[#f8fafc] border border-gray-100 flex items-center justify-center text-[#0b213b] group-hover:bg-[#1d4e89] group-hover:text-white transition-colors" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2.5",
                            d: "M9 5l7 7-7 7"
                          })
                        ]))
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="text-center mt-12" data-v-7e5c8dd9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/yatlarimiz",
        class: "inline-flex items-center gap-2 text-[#1d4e89] font-bold text-[15px] hover:text-[#0b213b] transition-colors font-sans"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tüm Yatlarımızı Görün → `);
          } else {
            return [
              createTextVNode(" Tüm Yatlarımızı Görün → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="py-24 bg-[#fafbfc] relative z-10 border-t border-gray-100" data-v-7e5c8dd9><div class="max-w-[1300px] mx-auto px-6" data-v-7e5c8dd9><div class="text-center mb-14" data-v-7e5c8dd9><h4 class="text-[#216a9a] text-[13px] font-bold uppercase tracking-[0.2em] mb-3 font-sans" data-v-7e5c8dd9>MÜŞTERİ YORUMLARI</h4><h2 class="text-[#0b213b] text-4xl md:text-5xl font-extrabold mb-4 font-sans tracking-tight" data-v-7e5c8dd9>Misafirlerimiz Ne Diyor?</h2><p class="text-gray-500 text-[16px] font-sans" data-v-7e5c8dd9>Google&#39;da 5 yıldızlı yorumlarımızı inceleyin.</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-v-7e5c8dd9><!--[-->`);
      ssrRenderList(reviews.value.slice(0, 6), (review) => {
        _push(`<div class="bg-white rounded-[16px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col transition-transform hover:-translate-y-1" data-v-7e5c8dd9><div class="flex justify-between items-start mb-4" data-v-7e5c8dd9><div class="flex items-center gap-3" data-v-7e5c8dd9>`);
        if (!review.avatar_url) {
          _push(`<div class="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg" style="${ssrRenderStyle({ backgroundColor: review.avatar_color || "#1565c0" })}" data-v-7e5c8dd9>${ssrInterpolate(review.reviewer_name?.charAt(0)?.toUpperCase())}</div>`);
        } else {
          _push(`<div class="w-11 h-11 rounded-full overflow-hidden" data-v-7e5c8dd9><img${ssrRenderAttr("src", review.avatar_url)} alt="avatar" class="w-full h-full object-cover" data-v-7e5c8dd9></div>`);
        }
        _push(`<div data-v-7e5c8dd9><h4 class="text-[#0b213b] font-bold text-[15px] leading-tight font-sans" data-v-7e5c8dd9>${ssrInterpolate(review.reviewer_name)}</h4><p class="text-gray-400 text-[13px] font-sans" data-v-7e5c8dd9>${ssrInterpolate(new Date(review.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }))}</p></div></div><svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" data-v-7e5c8dd9><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" data-v-7e5c8dd9></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" data-v-7e5c8dd9></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" data-v-7e5c8dd9></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" data-v-7e5c8dd9></path></svg></div><div class="flex items-center gap-1 mb-3" data-v-7e5c8dd9><!--[-->`);
        ssrRenderList(Math.floor(review.rating || 5), (i) => {
          _push(`<svg class="w-4 h-4 text-[#FBBC05]" fill="currentColor" viewBox="0 0 20 20" data-v-7e5c8dd9><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-7e5c8dd9></path></svg>`);
        });
        _push(`<!--]--><svg class="w-4 h-4 text-[#4285F4] ml-1" fill="currentColor" viewBox="0 0 24 24" data-v-7e5c8dd9><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" data-v-7e5c8dd9></path></svg></div><p class="text-[#0b213b] text-[14px] leading-relaxed font-sans line-clamp-3" data-v-7e5c8dd9>${ssrInterpolate(review.comment)}</p></div>`);
      });
      _push(`<!--]--></div><div class="flex justify-center mt-10" data-v-7e5c8dd9><div class="inline-flex items-center gap-1.5 bg-[#0d825b] text-white px-4 py-2 rounded-lg shadow-sm font-sans font-bold text-[13px] hover:shadow-md transition-shadow cursor-default" data-v-7e5c8dd9> Doğrulayan: Trustindex <svg class="w-4 h-4 opacity-80" fill="currentColor" viewBox="0 0 20 20" data-v-7e5c8dd9><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" data-v-7e5c8dd9></path></svg></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7e5c8dd9"]]);

export { index as default };
//# sourceMappingURL=index-C8o0Ph2J.mjs.map
