import { a as useSupabaseClient, g as useSupabaseUser, h as useRouter, c as useSeoMeta, s as siteConfig, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, watchEffect, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "kayit",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const user = useSupabaseUser();
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const errorMsg = ref("");
    const successMsg = ref("");
    const loading = ref(false);
    watchEffect(() => {
      if (user.value) {
        router.push("/hesabim");
      }
    });
    useSeoMeta({
      title: `Kayıt Ol | ${siteConfig.name}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "w-full bg-light text-dark pt-32 pb-24 px-page-margin min-h-dvh flex items-center justify-center" }, _attrs))}><div class="w-full max-w-md bg-dark/5 p-8 rounded-lg shadow-sm"><h1 class="text-4xl font-light mb-2 text-center">Kayıt Ol</h1><p class="text-center opacity-70 mb-8">Kendi hesabınızı oluşturun ve rezervasyon yapmaya başlayın.</p><form class="flex flex-col gap-4"><div class="flex flex-col gap-2"><label class="font-medium text-sm">Ad Soyad</label><input${ssrRenderAttr("value", name.value)} type="text" class="p-3 rounded border border-dark/20 bg-transparent" placeholder="Adınız Soyadınız" required></div><div class="flex flex-col gap-2"><label class="font-medium text-sm">E-posta</label><input${ssrRenderAttr("value", email.value)} type="email" class="p-3 rounded border border-dark/20 bg-transparent" placeholder="ornek@mail.com" required></div><div class="flex flex-col gap-2"><label class="font-medium text-sm">Şifre</label><input${ssrRenderAttr("value", password.value)} type="password" class="p-3 rounded border border-dark/20 bg-transparent" placeholder="En az 6 karakter" required minlength="6"></div>`);
      if (errorMsg.value) {
        _push(`<p class="text-red-500 text-sm mt-2">${ssrInterpolate(errorMsg.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (successMsg.value) {
        _push(`<p class="text-green-600 text-sm mt-2">${ssrInterpolate(successMsg.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="bg-dark text-light w-full py-4 rounded font-medium hover:bg-dark/80 transition-colors mt-4"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}>${ssrInterpolate(loading.value ? "Kayıt Yapılıyor..." : "Kayıt Ol")}</button></form><div class="mt-6 text-center text-sm opacity-70"> Zaten hesabınız var mı? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/giris",
        class: "underline hover:opacity-100 transition-opacity font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Giriş Yapın`);
          } else {
            return [
              createTextVNode("Giriş Yapın")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/kayit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=kayit-DzmloMtL.mjs.map
