import { a as useSupabaseClient, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "giris",
  __ssrInlineRender: true,
  setup(__props) {
    const isLogin = ref(true);
    const loading = ref(false);
    const errorMessage = ref("");
    const form = ref({ name: "", email: "", password: "" });
    useSupabaseClient();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#0C2340] flex items-center justify-center px-6 py-20 relative overflow-hidden" }, _attrs))}><div class="absolute inset-0"><img${ssrRenderAttr("src", _imports_0)} alt="bg" class="w-full h-full object-cover opacity-20"><div class="absolute inset-0 bg-gradient-to-b from-[#0C2340]/80 to-[#0C2340]"></div></div><div class="relative z-10 w-full max-w-md"><div class="text-center mb-10">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center gap-3 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg viewBox="0 0 36 36" fill="none" class="w-10 h-10"${_scopeId}><path d="M4 24 C10 18 14 14 18 10 C22 14 26 18 32 24" stroke="#C8A96E" stroke-width="2" stroke-linecap="round"${_scopeId}></path><path d="M2 28 H34" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round" opacity="0.5"${_scopeId}></path><path d="M18 10 L18 4" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round"${_scopeId}></path><path d="M18 4 L26 14" stroke="#C8A96E" stroke-width="1.5" stroke-linejoin="round"${_scopeId}></path></svg><span class="text-[22px] font-black text-white"${_scopeId}>YatigoTR</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                viewBox: "0 0 36 36",
                fill: "none",
                class: "w-10 h-10"
              }, [
                createVNode("path", {
                  d: "M4 24 C10 18 14 14 18 10 C22 14 26 18 32 24",
                  stroke: "#C8A96E",
                  "stroke-width": "2",
                  "stroke-linecap": "round"
                }),
                createVNode("path", {
                  d: "M2 28 H34",
                  stroke: "#C8A96E",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  opacity: "0.5"
                }),
                createVNode("path", {
                  d: "M18 10 L18 4",
                  stroke: "#C8A96E",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round"
                }),
                createVNode("path", {
                  d: "M18 4 L26 14",
                  stroke: "#C8A96E",
                  "stroke-width": "1.5",
                  "stroke-linejoin": "round"
                })
              ])),
              createVNode("span", { class: "text-[22px] font-black text-white" }, "YatigoTR")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-white/40 text-[13px] mt-4">${ssrInterpolate(isLogin.value ? "Hesabınıza giriş yapın" : "Yeni hesap oluşturun")}</p></div><div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"><form class="space-y-5">`);
      if (!isLogin.value) {
        _push(`<div><label class="block text-[12px] font-semibold text-white/60 uppercase tracking-wider mb-2">Ad Soyad</label><input type="text"${ssrRenderAttr("value", form.value.name)} required placeholder="Adınız Soyadınız" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] focus:outline-none focus:border-[#C8A96E] transition-colors placeholder:text-white/20"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><label class="block text-[12px] font-semibold text-white/60 uppercase tracking-wider mb-2">E-posta</label><input type="email"${ssrRenderAttr("value", form.value.email)} required placeholder="ornek@mail.com" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] focus:outline-none focus:border-[#C8A96E] transition-colors placeholder:text-white/20"></div><div><label class="block text-[12px] font-semibold text-white/60 uppercase tracking-wider mb-2">Şifre</label><input type="password"${ssrRenderAttr("value", form.value.password)} required placeholder="••••••••" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] focus:outline-none focus:border-[#C8A96E] transition-colors placeholder:text-white/20"></div>`);
      if (errorMessage.value) {
        _push(`<div class="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300 text-[13px]">${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="w-full bg-[#C8A96E] text-[#0C2340] font-bold text-[14px] py-4 rounded-xl hover:bg-[#dbbf7e] transition-all disabled:opacity-50 flex items-center justify-center gap-2">`);
      if (loading.value) {
        _push(`<svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(loading.value ? "İşleniyor..." : isLogin.value ? "Giriş Yap" : "Kayıt Ol")}</button></form><div class="mt-6 text-center"><button class="text-[13px] text-white/40 hover:text-white/70 transition-colors">${ssrInterpolate(isLogin.value ? "Hesabınız yok mu? Ücretsiz kayıt olun →" : "Zaten hesabınız var mı? Giriş yapın →")}</button></div></div><div class="mt-6 text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-[12px] text-white/30 hover:text-white/50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`← Ana Sayfaya Dön`);
          } else {
            return [
              createTextVNode("← Ana Sayfaya Dön")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/giris.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=giris-CztwxMPe.mjs.map
