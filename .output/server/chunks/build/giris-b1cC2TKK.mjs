import { _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "giris",
  __ssrInlineRender: true,
  setup(__props) {
    const isLogin = ref(true);
    const loading = ref(false);
    const errorMessage = ref("");
    const form = ref({
      name: "",
      email: "",
      password: ""
    });
    useSupabaseClient();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-cover bg-center",
        style: { "background-image": "url('/images/img4.jpg')", "box-shadow": "inset 0 0 0 2000px rgba(26,54,93,0.8)" }
      }, _attrs))}><div class="sm:mx-auto sm:w-full sm:max-w-md"><div class="flex justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-3xl font-black tracking-tight text-white flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-10 h-10" viewBox="0 0 24 24" fill="currentColor"${_scopeId}><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"${_scopeId}></path></svg> YatigoTR `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-10 h-10",
                viewBox: "0 0 24 24",
                fill: "currentColor"
              }, [
                createVNode("path", { d: "M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" })
              ])),
              createTextVNode(" YatigoTR ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><h2 class="mt-6 text-center text-3xl font-extrabold text-white">${ssrInterpolate(isLogin.value ? "Hesabınıza Giriş Yapın" : "Yeni Hesap Oluşturun")}</h2><p class="mt-2 text-center text-sm text-gray-300"> Veya <button class="font-medium text-[#60a5fa] hover:text-[#93c5fd]">${ssrInterpolate(isLogin.value ? "ücretsiz üye olun" : "zaten hesabınız varsa giriş yapın")}</button></p></div><div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md"><div class="bg-white py-8 shadow-2xl sm:rounded-xl sm:px-10 border border-gray-100"><form class="space-y-6">`);
      if (!isLogin.value) {
        _push(`<div><label for="name" class="block text-sm font-medium text-gray-700"> Ad Soyad </label><div class="mt-1"><input id="name" name="name" type="text" autocomplete="name"${ssrRenderAttr("value", form.value.name)} required class="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#007bff] focus:border-[#007bff] sm:text-sm"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><label for="email" class="block text-sm font-medium text-gray-700"> E-posta adresi </label><div class="mt-1 relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg></div><input id="email" name="email" type="email" autocomplete="email"${ssrRenderAttr("value", form.value.email)} required class="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#007bff] focus:border-[#007bff] sm:text-sm" placeholder="ornek@mail.com"></div></div><div><label for="password" class="block text-sm font-medium text-gray-700"> Şifre </label><div class="mt-1 relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg></div><input id="password" name="password" type="password" autocomplete="current-password"${ssrRenderAttr("value", form.value.password)} required class="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#007bff] focus:border-[#007bff] sm:text-sm" placeholder="••••••••"></div></div>`);
      if (isLogin.value) {
        _push(`<div class="flex items-center justify-between"><div class="flex items-center"><input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-[#007bff] focus:ring-[#007bff] border-gray-300 rounded"><label for="remember-me" class="ml-2 block text-sm text-gray-900"> Beni Hatırla </label></div><div class="text-sm"><a href="#" class="font-medium text-[#007bff] hover:text-[#0056b3]"> Şifremi Unuttum </a></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (errorMessage.value) {
        _push(`<div class="bg-red-50 border-l-4 border-red-400 p-4"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-red-700">${ssrInterpolate(errorMessage.value)}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="w-full flex justify-center py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#1a365d] hover:bg-[#0f2847] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007bff] disabled:opacity-50 transition-colors">`);
      if (loading.value) {
        _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(loading.value ? "İşleniyor..." : isLogin.value ? "Giriş Yap" : "Kayıt Ol")}</button></div></form></div></div></div>`);
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
//# sourceMappingURL=giris-b1cC2TKK.mjs.map
