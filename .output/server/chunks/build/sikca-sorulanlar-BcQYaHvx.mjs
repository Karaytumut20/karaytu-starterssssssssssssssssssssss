import { c as useSeoMeta, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "sikca-sorulanlar",
  __ssrInlineRender: true,
  setup(__props) {
    const open = ref(null);
    const faqs = [
      { q: "Yat kiralama fiyatlarına neler dahildir?", a: "Fiyatlarımıza profesyonel kaptan ve mürettebat, yakıt ve tam kapsamlı sigorta dahildir. Çay, kahve ve temel ikramlar ücretsiz sunulmaktadır." },
      { q: "Tekneye dışarıdan yiyecek ve içecek getirebilir miyiz?", a: "Evet, kendi yiyecek ve içeceklerinizi getirebilirsiniz. Servis hizmeti (tabak, bardak, buz) için ek ücret alınabilir. Profesyonel catering hizmetimiz de mevcuttur." },
      { q: "Kötü hava koşullarında tur iptal edilir mi?", a: "Hafif yağmur turu engellemez. Liman Başkanlığı tarafından denize çıkış yasağı olan durumlarda turunuz ücretsiz ertelenir." },
      { q: "Rezervasyonumu nasıl iptal edebilirim?", a: "Tur tarihinden 15 gün öncesine kadar yapılan iptallerde kapora iade edilir. 15 günden az süre kaldığında ücret iadesi yapılmaz, tarih değişikliği talep edilebilir." },
      { q: "Bebekli/çocuklu aileler için güvenli mi?", a: "Evet, yatlarımız sertifikalı güvenlik standartlarına sahiptir. Çocuk can yelekleri mevcuttur. Küçük çocukların ebeveyn gözetiminde olması gerekmektedir." },
      { q: "Süsleme ve organizasyon desteği veriyor musunuz?", a: "Evet. Doğum günü balonları, fasıl, kemancı, volkan gösterisi, drone ve fotoğrafçı gibi tüm ekstra talepleriniz için destek sağlıyoruz." }
    ];
    useSeoMeta({
      title: "Sıkça Sorulan Sorular | YatigoTR Yatçılık",
      description: "Yat kiralama ve organizasyon hakkında sıkça sorulan sorular."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans bg-white text-[#1C2B3A] min-h-screen overflow-x-hidden" }, _attrs))}><section class="bg-[#0C2340] pt-36 pb-20 px-6"><div class="max-w-[1400px] mx-auto px-6 lg:px-12"><div class="flex items-center gap-3 mb-6"><div class="w-6 h-px bg-[#C8A96E]"></div><span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.3em]">SSS</span></div><h1 class="text-[52px] md:text-[64px] font-bold text-white leading-tight tracking-[-0.02em] mb-4">Sıkça Sorulan<br><span class="text-[#C8A96E]">Sorular</span></h1><p class="text-white/50 text-[17px] font-light max-w-xl">Yat kiralama, organizasyon ve fiyatlandırma hakkında aklınıza takılan soruların cevapları.</p></div></section><section class="py-24 px-6"><div class="max-w-4xl mx-auto"><div class="space-y-4"><!--[-->`);
      ssrRenderList(faqs, (faq, idx) => {
        _push(`<div class="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden hover:border-[#0C2340]/20 transition-colors group"><button class="w-full flex items-center justify-between p-7 text-left"><h3 class="text-[17px] font-semibold text-[#0C2340] pr-6 leading-snug group-hover:text-[#1A7B8A] transition-colors">${ssrInterpolate(faq.q)}</h3><div class="${ssrRenderClass(["w-8 h-8 rounded-full border border-[#E8E0D0] flex items-center justify-center shrink-0 transition-all", open.value === idx ? "bg-[#0C2340] border-[#0C2340]" : "bg-transparent"])}"><svg class="${ssrRenderClass(["w-4 h-4 transition-transform", open.value === idx ? "rotate-45 text-white" : "text-[#6B7A8D]"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></div></button><div class="px-7 pb-7 border-t border-gray-100" style="${ssrRenderStyle(open.value === idx ? null : { display: "none" })}"><p class="text-[#6B7A8D] text-[15px] leading-relaxed pt-5">${ssrInterpolate(faq.a)}</p></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-16 bg-[#0C2340] rounded-2xl p-10 text-center"><h2 class="text-[28px] font-bold text-white mb-3">Başka Sorunuz mu Var?</h2><p class="text-white/50 text-[15px] mb-8">Ekibimiz 7/24 size yardımcı olmaya hazır.</p><div class="flex flex-wrap gap-4 justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/iletisim",
        class: "bg-[#C8A96E] text-[#0C2340] font-semibold text-[14px] px-8 py-4 rounded-lg hover:bg-[#dbbf7e] transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`İletişime Geç`);
          } else {
            return [
              createTextVNode("İletişime Geç")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="https://wa.me/905441014343" target="_blank" class="border border-white/25 text-white font-medium text-[14px] px-8 py-4 rounded-lg hover:bg-white/5 transition-all">WhatsApp</a></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sikca-sorulanlar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=sikca-sorulanlar-BcQYaHvx.mjs.map
