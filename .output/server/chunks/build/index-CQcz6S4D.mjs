import { f as useSupabaseUser, a as useAsyncData, b as useSeoMeta, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
    const supabase = useSupabaseClient();
    useSupabaseUser();
    const { data } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("experiences", async () => {
      const { data: e } = await supabase.from("experiences").select("*").order("created_at", { ascending: true });
      return e || [];
    })), __temp = await __temp, __restore(), __temp);
    const experiences = computed(() => {
      return data.value || [];
    });
    useSeoMeta({
      title: "Deneyimler | İstanbul Boğazı'nda Özel Yat Turları",
      description: "İstanbul Boğazı'nda evlenme teklifi, doğum günü partisi, kahvaltı, mezuniyet ve çok daha fazlası. Yatta eşsiz deneyimleri keşfedin."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans text-[#1c2c44] bg-[#f8f9fc] min-h-screen pb-0 overflow-x-hidden" }, _attrs))}><section class="w-full relative overflow-hidden min-h-[60vh] lg:min-h-[500px] flex flex-col justify-center"><div class="absolute inset-0 z-0 bg-[#0f2038]"><img${ssrRenderAttr("src", _imports_0)} alt="Deneyimler" class="w-full h-full object-cover object-bottom opacity-70"><div class="absolute inset-0 bg-gradient-to-r from-[#0f2038]/95 via-[#0f2038]/70 to-transparent"></div></div><div class="w-full grid grid-cols-14 mt-10 relative z-10"><div class="col-start-3 col-end-13 w-full"><div class="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full py-1.5 mb-6"><div class="w-1.5 h-1.5 rounded-full bg-[#eab308]"></div><span class="text-white text-[11px] font-bold tracking-wide">Deneyimler</span></div><h1 class="text-white text-4xl md:text-[5rem] font-bold leading-[1.05] tracking-tight mb-6"> Deneyimler </h1><div class="w-12 h-1 bg-[#00bfff] mb-6"></div><p class="text-white/90 text-[14px] md:text-[17px] font-medium max-w-[550px] leading-relaxed mb-10"> İstanbul Boğazı&#39;nda unutulmaz anlar yaşayın. </p><div class="flex flex-wrap items-center gap-8 lg:gap-12 mb-10"><div class="flex flex-col"><span class="text-[#00bfff] text-[32px] font-black leading-none mb-1 shadow-sm">16+</span><span class="text-white text-[11px] font-bold uppercase tracking-wider">Yıllık Deneyim</span></div><div class="flex flex-col border-l border-white/20 pl-8 lg:pl-12"><span class="text-[#00bfff] text-[32px] font-black leading-none mb-1 shadow-sm">4.8</span><span class="text-white text-[11px] font-bold uppercase tracking-wider">Google Puanı</span></div><div class="flex flex-col border-l border-white/20 pl-8 lg:pl-12"><span class="text-[#00bfff] text-[32px] font-black leading-none mb-1 shadow-sm">65Bin+</span><span class="text-white text-[11px] font-bold uppercase tracking-wider">Özel Yat Turu</span></div></div><div class="flex flex-wrap items-center gap-4">`);
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
      _push(`<a href="https://wa.me/905441014343" target="_blank" class="bg-[#2a4365]/40 backdrop-blur-md border border-white/30 text-white font-bold text-[14px] px-8 py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#2a4365]/60 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px] shrink-0" fill="currentColor" viewBox="0 0 448 512" style="${ssrRenderStyle({ "transform": "translateY(-1px)" })}"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg> WhatsApp </a></div></div></div><div class="absolute bottom-4 left-0 right-0 mx-auto flex flex-col items-center gap-2 z-10 w-full"><span class="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] ml-1">Kaydır</span><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white/60 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg></div></section><section class="w-full grid grid-cols-14 py-20"><div class="col-start-3 col-end-13 w-full"><div class="text-center mb-16 flex flex-col items-center"><h2 class="text-3xl md:text-[2.5rem] font-bold text-[#1c2c44] tracking-tight leading-tight mb-3">Tüm Deneyimler</h2><p class="text-[#64748b] text-[15px] font-medium">Size en uygun deneyimi seçin.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(experiences.value, (exp, index) => {
        _push(`<div class="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-[#e2e8f0]/80 flex flex-col group hover:-translate-y-1 transition-all duration-300"><div class="w-full h-[220px] overflow-hidden relative"><img${ssrRenderAttr("src", exp.main_image || "/images/img4.jpg")}${ssrRenderAttr("alt", exp.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"></div><div class="p-6 flex flex-col flex-1"><h3 class="text-[18px] font-bold text-[#1c2c44] mb-3 leading-snug tracking-tight">${ssrInterpolate(exp.title)}</h3><p class="text-[#64748b] text-[14px] leading-relaxed mb-6 flex-1 line-clamp-3 font-medium">${ssrInterpolate(exp.short_description)}</p>`);
        if (exp.starting_price) {
          _push(`<div class="mb-5"><p class="text-[18px] font-extrabold text-[#1c2c44] tracking-tight">${ssrInterpolate(exp.starting_price)} TL</p><p class="text-[11px] text-[#94a3b8] font-medium mt-0.5">başlayan fiyatlarla</p></div>`);
        } else {
          _push(`<div class="mb-5"><p class="text-[18px] font-extrabold text-[#1c2c44] tracking-tight">Fiyat Alın</p><p class="text-[11px] text-[#94a3b8] font-medium mt-0.5">kişiye özel planlanır</p></div>`);
        }
        _push(`<div class="flex gap-2.5 mt-auto">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/deneyimlerimiz/${exp.slug}`,
          class: "flex-1 text-center py-[10px] border border-[#215d8f] text-[#215d8f] font-bold text-[13px] rounded-md hover:bg-gray-50 transition-colors bg-white"
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
          class: "flex-1 text-center py-[10px] bg-[#215d8f] text-white font-bold text-[13px] rounded-md hover:bg-opacity-90 transition-colors shadow-sm"
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
      _push(`<!--]--></div></div></section><section class="w-full bg-[#215d8f] py-20 mt-10"><div class="max-w-4xl mx-auto px-6 lg:px-8 text-center text-white"><h2 class="text-3xl md:text-[34px] font-bold tracking-tight mb-4">Size Özel Bir Deneyim mi İstiyorsunuz?</h2><p class="text-white/80 text-[15px] md:text-[16px] font-medium max-w-2xl mx-auto mb-10">İhtiyaçlarınıza göre deneyimi planlamak için bize ulaşın veya online rezervasyon yapın.</p><div class="flex flex-wrap items-center justify-center gap-4 text-[14px] font-bold">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/rezervasyon",
        class: "bg-white text-[#215d8f] px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors shadow-md flex items-center justify-center min-w-[200px]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Rezervasyon Yap → `);
          } else {
            return [
              createTextVNode(" Rezervasyon Yap → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="https://wa.me/905441014343" target="_blank" class="bg-[#22c55e] text-white px-8 py-3.5 rounded-full hover:bg-[#16a34a] transition-colors shadow-md flex items-center justify-center gap-2 min-w-[200px]"><svg xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px] shrink-0" fill="currentColor" viewBox="0 0 448 512" style="${ssrRenderStyle({ "transform": "translateY(-1px)" })}"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg> WhatsApp </a></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/deneyimlerimiz/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CQcz6S4D.mjs.map
