import { a as useSupabaseClient, c as useSeoMeta, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "yat-kiralama-fiyatlari",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const yachtsList = ref([]);
    const included = [
      { title: "Profesyonel Mürettebat", desc: "Deneyimli kaptan ve mürettebat ekibi turunuz boyunca hizmetinizdedir.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>' },
      { title: "Yakıt Dahil", desc: "Tur süresi boyunca tüm yakıt giderleri fiyata dahildir.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>' },
      { title: "Tam Sigorta", desc: "Tüm yolcular ve tekne için kapsamlı sigorta sağlanır.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>' },
      { title: "İkramlar", desc: "Çay, kahve, YatigoTR ve mevsimsel meyve servisi standarttır.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>' }
    ];
    const extraServices = [
      { name: "Lazer Gösterisi", price: "2.500", unit: "Tur Boyu" },
      { name: "Volkan Gösterisi", price: "950", unit: "Tur Boyu" },
      { name: "Gül 25 Adet", price: "3.950", unit: "Tur Boyu" },
      { name: "Fasıl", price: "15.000", unit: "Tur Boyu" },
      { name: "Dansöz", price: "8.500", unit: "Tur Boyu" },
      { name: "Kemancı", price: "8.500", unit: "Tur Boyu" },
      { name: "Uçan Balon", price: "3.950", unit: "Tur Boyu" },
      { name: "Vito Transfer", price: "6.500", unit: "Tur Boyu" },
      { name: "Meze Tabağı", price: "1.080", unit: "Kişi Başı" },
      { name: "Dışarıdan Yiyecek", price: "500", unit: "Kişi Başı" },
      { name: "Meyve/Cips Menü", price: "1.380", unit: "Kişi Başı" },
      { name: "Fotoğrafçı", price: "12.500", unit: "Tur Boyu" },
      { name: "Kahvaltı", price: "1.395", unit: "Kişi Başı" },
      { name: "Yemek Menüsü", price: "2.150", unit: "Kişi Başı" },
      { name: "Pasta", price: "2.250", unit: "Tur Boyu" }
    ];
    useSeoMeta({ title: "Yat Kiralama Fiyatları | YatigoTR", description: "İstanbul Boğazı yat kiralama fiyatları. Sürpriz ücret yok." });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<main${ssrRenderAttrs(_attrs)}><div class="font-sans bg-white text-[#1C2B3A] min-h-screen overflow-x-hidden"><section class="relative min-h-[60vh] flex items-end overflow-hidden"><div class="absolute inset-0"><img${ssrRenderAttr("src", _imports_0)} alt="Fiyatlar" class="w-full h-full object-cover"><div class="absolute inset-0 bg-gradient-to-r from-[#0C2340]/90 via-[#0C2340]/60 to-transparent"></div><div class="absolute inset-0 bg-gradient-to-t from-[#0C2340]/80 via-transparent to-transparent"></div></div><div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 pt-40 w-full"><div class="max-w-2xl"><div class="flex items-center gap-3 mb-6"><div class="w-6 h-px bg-[#C8A96E]"></div><span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.3em]">Güncel Fiyatlar 2026</span></div><h1 class="text-white text-[52px] md:text-[68px] font-bold leading-[1.0] tracking-[-0.03em] mb-6">Yat Kiralama<br><span class="text-[#C8A96E]">Fiyatları</span></h1><p class="text-white/60 text-[17px] font-light leading-relaxed max-w-lg mb-10">Tüm fiyatlara mürettebat, yakıt ve sigorta dahildir. Sürpriz ek ücret yoktur.</p><div class="flex flex-wrap gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/rezervasyon",
        class: "inline-flex items-center gap-2 bg-[#C8A96E] text-[#0C2340] font-semibold text-[14px] px-8 py-4 rounded-lg hover:bg-[#dbbf7e] transition-all shadow-lg"
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
        _: 1
      }, _parent));
      _push(`<a href="https://wa.me/905441014343" target="_blank" class="inline-flex items-center gap-2 border border-white/25 text-white font-medium text-[14px] px-8 py-4 rounded-lg hover:bg-white/8 transition-all">Fiyat Sor</a></div></div></div></section><section class="py-24 bg-white"><div class="max-w-[1400px] mx-auto px-6 lg:px-12"><div class="text-center mb-16"><span class="text-[#1A7B8A] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-4">Yat Fiyatları</span><h2 class="text-[40px] md:text-[48px] font-bold text-[#0C2340] leading-tight">Yat Kiralama Fiyatları</h2><p class="text-[#6B7A8D] mt-4 text-[15px]">Minimum kiralama süresi 2 saattir. Tüm fiyatlara KDV dahildir.</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"><!--[-->`);
      ssrRenderList(yachtsList.value, (yacht) => {
        _push(`<div class="${ssrRenderClass(["group bg-white rounded-2xl overflow-hidden border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300", yacht.highlight ? "border-[#C8A96E] ring-2 ring-[#C8A96E]/20" : "border-[#E8E0D0]"])}"><div class="relative aspect-[16/9] overflow-hidden"><img${ssrRenderAttr("src", yacht.img)}${ssrRenderAttr("alt", yacht.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"><div class="absolute top-4 left-4 bg-[#0C2340]/80 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Maks. ${ssrInterpolate(yacht.cap)} kişi </div>`);
        if (yacht.highlight) {
          _push(`<div class="absolute top-4 right-4 bg-[#C8A96E] text-[#0C2340] text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">En Popüler</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="p-7"><h2 class="text-[22px] font-bold text-[#0C2340] mb-6">${ssrInterpolate(yacht.name)}</h2><div class="space-y-0 mb-5"><div class="flex justify-between items-center py-3.5 border-b border-gray-100"><span class="text-[14px] text-[#6B7A8D] font-medium">2 Saat</span><span class="text-[16px] font-bold text-[#0C2340]">${ssrInterpolate(yacht.p2)} ₺</span></div><div class="flex justify-between items-center py-3.5 border-b border-gray-100"><span class="text-[14px] text-[#6B7A8D] font-medium">3 Saat</span><span class="text-[16px] font-bold text-[#0C2340]">${ssrInterpolate(yacht.p3)} ₺</span></div><div class="flex justify-between items-center py-3.5 border-b border-gray-100"><span class="text-[14px] text-[#6B7A8D] font-medium">4 Saat</span><span class="text-[16px] font-bold text-[#0C2340]">${ssrInterpolate(yacht.p4)} ₺</span></div><div class="flex justify-between items-center py-3.5 border-b border-gray-100 bg-white -mx-7 px-7"><span class="text-[13px] text-[#6B7A8D] font-medium">Saatlik Ücret</span><span class="text-[15px] font-bold text-[#1A7B8A]">${ssrInterpolate(yacht.ph)} ₺/Saat</span></div><div class="flex justify-between items-center py-3.5 border-b border-gray-100"><span class="text-[13px] text-[#6B7A8D] font-medium">Tam Gün Adalar Turu (8 saat)</span><span class="text-[15px] font-bold text-[#0C2340]">${ssrInterpolate(yacht.padalar)} ₺</span></div><div class="flex justify-between items-center py-3.5"><span class="text-[13px] text-[#6B7A8D] font-medium">Tam Gün Boğaz Turu (8 saat)</span><span class="text-[15px] font-bold text-[#0C2340]">${ssrInterpolate(yacht.pbogaz)} ₺</span></div></div><div class="flex items-center gap-4 py-4 border-t border-gray-100 mb-5"><span class="flex items-center gap-1.5 text-[11px] text-[#6B7A8D] font-medium"><svg class="w-3.5 h-3.5 text-[#1A7B8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Yakıt </span><span class="flex items-center gap-1.5 text-[11px] text-[#6B7A8D] font-medium"><svg class="w-3.5 h-3.5 text-[#1A7B8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Sigorta </span><span class="flex items-center gap-1.5 text-[11px] text-[#6B7A8D] font-medium"><svg class="w-3.5 h-3.5 text-[#1A7B8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> İkramlar </span></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/rezervasyon",
          class: "block w-full text-center py-3.5 bg-[#0C2340] text-white font-semibold text-[14px] rounded-xl hover:bg-[#1a3a5c] transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Bu Yatı Rezerve Et`);
            } else {
              return [
                createTextVNode("Bu Yatı Rezerve Et")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-24 bg-[#0C2340]"><div class="max-w-[1400px] mx-auto px-6 lg:px-12"><div class="text-center mb-16"><span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-4">Şeffaf Fiyatlandırma</span><h2 class="text-[40px] font-bold text-white leading-tight">Fiyata Dahil Hizmetler</h2><p class="text-white/40 mt-4 text-[15px]">Sürpriz ek ücret yok. Gösterilen fiyat ödeyeceğiniz fiyattır.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"><!--[-->`);
      ssrRenderList(included, (inc) => {
        _push(`<div class="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 hover:border-[#C8A96E]/30 transition-all"><div class="w-12 h-12 rounded-xl bg-[#C8A96E]/10 border border-[#C8A96E]/20 flex items-center justify-center text-[#C8A96E] mb-5"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">${inc.icon ?? ""}</svg></div><h3 class="text-[17px] font-bold text-white mb-2">${ssrInterpolate(inc.title)}</h3><p class="text-white/40 text-[13px] leading-relaxed">${ssrInterpolate(inc.desc)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-24 bg-white"><div class="max-w-[1400px] mx-auto px-6 lg:px-12"><div class="text-center mb-16"><span class="text-[#1A7B8A] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-4">Özelleştir</span><h2 class="text-[40px] font-bold text-[#0C2340] leading-tight">Ek Hizmetler</h2><p class="text-[#6B7A8D] mt-4 text-[15px]">Turunuzu özelleştirmek için ek hizmetler ekleyebilirsiniz.</p></div><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"><!--[-->`);
      ssrRenderList(extraServices, (addon) => {
        _push(`<div class="bg-white border border-[#E8E0D0] rounded-xl p-5 hover:border-[#0C2340] hover:shadow-lg transition-all group"><div class="flex items-start justify-between mb-3"><h3 class="text-[15px] font-bold text-[#0C2340] leading-tight pr-2 group-hover:text-[#1A7B8A] transition-colors">${ssrInterpolate(addon.name)}</h3><span class="text-[#C8A96E] font-bold text-[15px] whitespace-nowrap shrink-0">${ssrInterpolate(addon.price)} ₺</span></div><span class="text-[10px] bg-white text-[#6B7A8D] font-semibold px-2 py-1 rounded uppercase tracking-wider">${ssrInterpolate(addon.unit)}</span></div>`);
      });
      _push(`<!--]--></div></div></section></div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/yat-kiralama-fiyatlari.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=yat-kiralama-fiyatlari-DcGTiK9I.mjs.map
