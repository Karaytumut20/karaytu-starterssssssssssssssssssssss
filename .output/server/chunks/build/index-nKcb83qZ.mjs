import { a as useAsyncData, b as useSeoMeta, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, createTextVNode, unref, openBlock, createBlock, createVNode, useSSRContext } from 'vue';
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
    const { data: dbPosts, pending } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("blogs", async () => {
      const { data } = await supabase.from("blogs").select("*").eq("is_active", true).order("created_at", { ascending: false });
      return data || [];
    })), __temp = await __temp, __restore(), __temp);
    const posts = computed(() => {
      return dbPosts.value?.map((p) => ({
        title: p.title,
        slug: p.slug,
        category: p.category || "Rehber",
        date: new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(p.created_at)),
        readTime: Math.max(1, Math.ceil((p.content?.length || 0) / 1e3)) + " dk okuma",
        image: p.image_url || "/images/default.jpg",
        desc: p.excerpt || p.content?.substring(0, 150) + "..."
      })) || [];
    });
    useSeoMeta({
      title: "Yat Kiralama & Boğaz Turu Blogu | YatigoTR Yatçılık",
      description: "Yat kiralama rehberi, boğaz turu ipuçları ve deniz deneyimleri hakkında en güncel yazılarımız."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans text-[#1c2c44] bg-[#f8f9fc] min-h-screen pb-20 overflow-x-hidden" }, _attrs))}><section class="w-full relative overflow-hidden min-h-[60vh] lg:min-h-[500px] flex flex-col justify-center mb-16"><div class="absolute inset-0 z-0 bg-[#0f2038]"><img${ssrRenderAttr("src", _imports_0)} alt="Blog" class="w-full h-full object-cover object-bottom opacity-70"><div class="absolute inset-0 bg-gradient-to-r from-[#0f2038]/95 via-[#0f2038]/70 to-transparent"></div></div><div class="w-full grid grid-cols-14 mt-10 relative z-10"><div class="col-start-3 col-end-13 w-full"><div class="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full py-1.5 mb-6"><div class="w-1.5 h-1.5 rounded-full bg-[#eab308]"></div><span class="text-white text-[11px] font-bold tracking-wide">Blog</span></div><h1 class="text-white text-4xl md:text-[5rem] font-bold leading-[1.05] tracking-tight mb-6"> Blog </h1><div class="w-12 h-1 bg-[#00bfff] mb-6"></div><p class="text-white/90 text-[14px] md:text-[17px] font-medium max-w-[450px] leading-relaxed mb-10"> Yat kiralama, boğaz turları ve deniz deneyimleri hakkında ipuçları ve bilgiler. </p><div class="flex flex-wrap items-center gap-8 lg:gap-12 mb-10"><div class="flex flex-col"><span class="text-[#00bfff] text-[32px] font-black leading-none mb-1 shadow-sm">16+</span><span class="text-white text-[11px] font-bold uppercase tracking-wider">Yıllık Deneyim</span></div><div class="flex flex-col border-l border-white/20 pl-8 lg:pl-12"><span class="text-[#00bfff] text-[32px] font-black leading-none mb-1 shadow-sm">4.8</span><span class="text-white text-[11px] font-bold uppercase tracking-wider">Google Puanı</span></div><div class="flex flex-col border-l border-white/20 pl-8 lg:pl-12"><span class="text-[#00bfff] text-[32px] font-black leading-none mb-1 shadow-sm">65Bin+</span><span class="text-white text-[11px] font-bold uppercase tracking-wider">Özel Yat Turu</span></div></div><div class="flex flex-wrap items-center gap-4">`);
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
      _push(`<a href="https://wa.me/905441014343" target="_blank" class="bg-[#2a4365]/40 backdrop-blur-md border border-white/30 text-white font-bold text-[14px] px-8 py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#2a4365]/60 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px] shrink-0" fill="currentColor" viewBox="0 0 448 512" style="${ssrRenderStyle({ "transform": "translateY(-1px)" })}"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg> WhatsApp </a></div></div></div><div class="absolute bottom-4 left-0 right-0 mx-auto flex flex-col items-center gap-2 z-10 w-full"><span class="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] ml-1">Kaydır</span><svg class="w-6 h-6 text-white/70 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="7" y="4" width="10" height="16" rx="5" stroke-width="1.5"></rect><path d="M12 8v4" stroke-width="1.5" stroke-linecap="round"></path></svg></div></section>`);
      if (unref(pending)) {
        _push(`<div class="w-full h-32 flex justify-center items-center"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#215d8f]"></div></div>`);
      } else {
        _push(`<section class="w-full grid grid-cols-14"><div class="col-start-3 col-end-13 w-full">`);
        if (posts.value.length === 0) {
          _push(`<div class="text-center text-gray-500 py-10"> Henüz blog yazısı eklenmemiş. </div>`);
        } else {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
          ssrRenderList(posts.value, (post, index) => {
            _push(`<div class="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-[#e2e8f0]/80 flex flex-col group hover:-translate-y-1 transition-all duration-300"><div class="w-full h-[220px] overflow-hidden relative"><img${ssrRenderAttr("src", post.image)}${ssrRenderAttr("alt", post.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"><div class="absolute top-4 left-4 bg-[#eab308] text-[#1c2c44] text-[11px] font-black px-3 py-1.5 rounded shadow-sm tracking-wider uppercase">${ssrInterpolate(post.category)}</div></div><div class="p-6 flex flex-col flex-1"><div class="flex items-center gap-4 text-[#64748b] text-[12px] font-medium mb-3"><span>${ssrInterpolate(post.date)}</span><span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(post.readTime)}</span></div><h2 class="text-[19px] font-bold text-[#1c2c44] mb-3 leading-snug tracking-tight">${ssrInterpolate(post.title)}</h2><p class="text-[#64748b] text-[14px] leading-relaxed mb-6 flex-1 line-clamp-3">${ssrInterpolate(post.desc)}</p>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/blog/${post.slug}`,
              class: "text-[#0ea5e9] font-bold text-[14px] flex items-center gap-1.5 group-hover:text-[#0284c7] transition-colors mt-auto w-fit"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Devamını Oku <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
                } else {
                  return [
                    createTextVNode(" Devamını Oku "),
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 transform group-hover:translate-x-1 transition-transform",
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
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div></section>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-nKcb83qZ.mjs.map
