import { c as useSeoMeta, a as useSupabaseClient, b as useAsyncData, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
    useSeoMeta({
      title: "Yatlarımız | İstanbul Boğazı'nda Yat Kiralama",
      description: "İstanbul Boğazı'nda kiralayabileceğiniz yatlarımızı inceleyin."
    });
    const supabase = useSupabaseClient();
    const { data } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("yachts", async () => {
      const { data: y } = await supabase.from("yachts").select("*").order("created_at", { ascending: true });
      return y || [];
    })), __temp = await __temp, __restore(), __temp);
    const fallbackYachts = [
      { id: "1", name: "YatigoTR Royal", slug: "yatigo-royal", capacity: 36, length: "24.0", price_hourly: 7950, main_image: "/images/img4.jpg", featured: false },
      { id: "2", name: "YatigoTR Orion", slug: "yatigo-orion", capacity: 24, length: "26.0", price_hourly: 6800, main_image: "/images/luxury_yacht_sunset.png", featured: false },
      { id: "3", name: "YatigoTR Prestige", slug: "yatigo-prestige", capacity: 12, length: "22.5", price_hourly: 5950, main_image: "/images/img1.jpg", featured: true },
      { id: "4", name: "YatigoTR Classic", slug: "yatigo-classic", capacity: 12, length: "21.5", price_hourly: 4950, main_image: "/images/img2.jpg", featured: false }
    ];
    const yachts = computed(() => data.value?.length ? data.value : fallbackYachts);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans bg-white text-[#1C2B3A] min-h-screen overflow-x-hidden" }, _attrs))}><section class="relative min-h-[75vh] flex items-end overflow-hidden"><div class="absolute inset-0"><img${ssrRenderAttr("src", _imports_0)} alt="Filomuz" class="w-full h-full object-cover"><div class="absolute inset-0 bg-gradient-to-r from-[#0C2340]/90 via-[#0C2340]/60 to-transparent"></div><div class="absolute inset-0 bg-gradient-to-t from-[#0C2340]/80 via-transparent to-transparent"></div></div><div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 pt-40 w-full"><div class="max-w-2xl"><div class="flex items-center gap-3 mb-6"><div class="w-6 h-px bg-[#C8A96E]"></div><span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.3em]">Premium Yat Filosu</span></div><h1 class="text-white text-[56px] md:text-[76px] font-bold leading-[1.0] tracking-[-0.03em] mb-6">Lüks Yat<br><span class="text-[#C8A96E]">Filomuz</span></h1><p class="text-white/60 text-[17px] font-light leading-relaxed max-w-lg mb-10">Her özel an için mükemmel yatı keşfedin. Lüks ve konforu bir arada sunan filomuzla İstanbul Boğazı&#39;nda unutulmaz anlar yaşayın.</p><div class="flex flex-wrap gap-4">`);
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
      _push(`<a href="https://wa.me/905441014343" target="_blank" class="inline-flex items-center gap-2 border border-white/25 text-white font-medium text-[14px] px-8 py-4 rounded-lg hover:bg-white/8 transition-all">WhatsApp</a></div></div></div></section><section class="py-24 bg-white"><div class="max-w-[1400px] mx-auto px-6 lg:px-12"><div class="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6"><div><span class="text-[#1A7B8A] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-4">Filomuz</span><h2 class="text-[40px] md:text-[52px] font-bold text-[#0C2340] leading-tight tracking-[-0.02em]">Size Özel<br>Yatlarımız</h2></div><p class="text-[#6B7A8D] text-[15px] leading-relaxed max-w-sm">Farklı kapasite ve özelliklere sahip lüks yatlarımızı inceleyin.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(yachts.value, (yacht) => {
        _push(`<div class="group bg-white rounded-2xl overflow-hidden border border-[#E8E0D0] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"><div class="relative aspect-[16/10] overflow-hidden"><img${ssrRenderAttr("src", yacht.main_image || "/images/img1.jpg")}${ssrRenderAttr("alt", yacht.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"><div class="absolute top-4 left-4"><span class="bg-[#0C2340]/85 backdrop-blur-sm text-[#C8A96E] text-[9px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">${ssrInterpolate(yacht.featured ? "Öne Çıkan" : "Özel Yat")}</span></div></div><div class="p-6"><div class="flex items-start justify-between mb-3"><h3 class="text-[19px] font-bold text-[#0C2340]">${ssrInterpolate(yacht.name)}</h3></div><div class="flex items-center gap-4 text-[#6B7A8D] text-[12px] mb-5 pb-5 border-b border-gray-100">`);
        if (yacht.capacity) {
          _push(`<span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-[#1A7B8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> ${ssrInterpolate(yacht.capacity)} Kişi Kapasiteli </span>`);
        } else {
          _push(`<!---->`);
        }
        if (yacht.length) {
          _push(`<span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-[#1A7B8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l5-5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg> ${ssrInterpolate(yacht.length)} Metre </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex items-center justify-between"><div><div class="text-[9px] text-[#6B7A8D] uppercase tracking-wider mb-1">Saatlik Başlangıç</div><div class="text-[22px] font-bold text-[#0C2340]">₺${ssrInterpolate(new Intl.NumberFormat("tr-TR").format(yacht.price_hourly || 0))}</div></div><div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/yatlarimiz/${yacht.slug}`,
          class: "h-10 px-4 border border-[#E8E0D0] text-[#0C2340] text-[13px] font-medium rounded-lg flex items-center hover:bg-white transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`İncele`);
            } else {
              return [
                createTextVNode("İncele")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/rezervasyon",
          class: "h-10 px-4 bg-[#0C2340] text-white text-[13px] font-medium rounded-lg flex items-center hover:bg-[#1a3a5c] transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Kirala`);
            } else {
              return [
                createTextVNode("Kirala")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/yatlarimiz/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DcswwWGp.mjs.map
