import { defineComponent, resolveDirective, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps } from 'vue/server-renderer';
import { c as useSeoMeta, d as useSchemaOrg } from './server.mjs';
import { defineWebPage } from '@unhead/schema-org/vue';
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
  __name: "online-odeme",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Online Ödeme | YatigoTR Yatçılık",
      description: "YatigoTR Yatçılık rezervasyon ödemelerinizi 256-bit SSL güvenlikli altyapımızla kredi kartı ile güvenle online olarak gerçekleştirebilirsiniz."
    });
    useSchemaOrg([
      defineWebPage({
        name: "Online Ödeme | YatigoTR Yatçılık",
        description: "256-bit SSL şifreleme alt yapısıyla yat kiralama online ödeme sayfası."
      })
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_reveal = resolveDirective("reveal");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "w-full bg-light text-dark pt-32 pb-24 px-page-margin min-h-dvh" }, _attrs))}><div class="max-w-3xl mx-auto"><div class="mb-12 text-center"><h1${ssrRenderAttrs(mergeProps({ class: "text-4xl md:text-5xl font-light tracking-tight text-dark mb-4" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))}>Güvenli Online Ödeme</h1><p${ssrRenderAttrs(mergeProps({ class: "text-dark/70" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))}> Rezervasyonunuzu kesinleştirmek veya kalan bakiyenizi ödemek için 256-bit SSL güvenlikli altyapımızı kullanabilirsiniz. </p></div><div class="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-dark/10"><form class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-2"><label class="text-sm font-medium text-dark/70">Adınız Soyadınız</label><input type="text" required placeholder="Örn: Ahmet Yılmaz" class="w-full bg-light border border-dark/20 rounded p-4 outline-none focus:border-dark transition-colors"></div><div class="space-y-2"><label class="text-sm font-medium text-dark/70">T.C. Kimlik / Pasaport No</label><input type="text" required placeholder="Fatura kesimi için gereklidir" class="w-full bg-light border border-dark/20 rounded p-4 outline-none focus:border-dark transition-colors"></div></div><div class="space-y-2"><label class="text-sm font-medium text-dark/70">Ödenecek Tutar (TL)</label><input type="number" required min="1" placeholder="0.00" class="w-full bg-light border border-dark/20 rounded p-4 outline-none focus:border-dark transition-colors font-medium text-xl"></div><div class="pt-6 border-t border-dark/10"><h3 class="text-lg font-medium mb-4">Kart Bilgileri</h3><div class="space-y-4"><input type="text" placeholder="Kart Üzerindeki İsim" class="w-full bg-light border border-dark/20 rounded p-4 outline-none focus:border-dark transition-colors"><input type="text" placeholder="Kart Numarası" class="w-full bg-light border border-dark/20 rounded p-4 outline-none focus:border-dark transition-colors"><div class="grid grid-cols-2 gap-4"><input type="text" placeholder="AA/YY" class="w-full bg-light border border-dark/20 rounded p-4 outline-none focus:border-dark transition-colors"><input type="text" placeholder="CVC" class="w-full bg-light border border-dark/20 rounded p-4 outline-none focus:border-dark transition-colors"></div></div></div><button type="submit" class="w-full py-4 mt-8 bg-dark text-light rounded font-medium hover:bg-dark/90 transition-colors flex items-center justify-center gap-2"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> Güvenle Öde </button><div class="text-center mt-4"><p class="text-xs text-dark/50 flex items-center justify-center gap-2"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> Iyzico / PayTR altyapısıyla 3D Secure güvencesi altındadır </p></div></form></div></div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/online-odeme.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=online-odeme-CXioDcWt.mjs.map
