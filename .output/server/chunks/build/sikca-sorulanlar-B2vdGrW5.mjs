import { b as useSeoMeta, c as useSchemaOrg, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, resolveDirective, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { defineWebPage, defineQuestion } from '@unhead/schema-org/vue';
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
  __name: "sikca-sorulanlar",
  __ssrInlineRender: true,
  setup(__props) {
    const faqs = [
      {
        q: "Yat kiralama fiyatlarına neler dahildir?",
        a: "Fiyatlarımıza yatın kullanımı, profesyonel kaptan ve mürettebat hizmeti, seyir süresince tüketilecek yakıt ve misafirlerimiz için sağlanan tam kapsamlı denizcilik sigortası dahildir. Çay, kahve ve YatigoTR gibi temel ikramlarımız ücretsiz olarak sunulmaktadır. Menülü ya da ekstra organizasyon paketleri için ayrıca fiyatlandırma yapılır."
      },
      {
        q: "Tekneye dışarıdan yiyecek ve içecek getirebilir miyiz?",
        a: "Evet, kendi yiyecek ve alkollü/alkolsüz içeceklerinizi getirebilirsiniz. Bu durumda tarafımızdan sadece servis hizmeti (tabak, bardak, buz, servis personeli) bedeli alınabilir. Ancak dileyen misafirlerimiz için baştan sona profesyonel catering hizmetimiz mevcuttur."
      },
      {
        q: "Kötü hava koşullarında tur iptal edilir mi?",
        a: "Hafif yağmur ya da rüzgar turu engellemez, filomuzdaki yatlar kapalı, ısıtmalı salonlara sahiptir ve olası hava değişimlerine karşı korunaklıdır. Ancak Liman Başkanlığı tarafından verilen 'Denize Çıkış Yasağı' veya misafirlerin güvenliğini tehlikeye sokacak aşırı fırtına durumunda turunuz ücretsiz olarak farklı bir tarihe ertelenir."
      },
      {
        q: "Rezervasyonumu nasıl iptal edebilirim? Ücret iadesi var mı?",
        a: "Tur tarihinden 15 gün öncesine kadar yapılan iptallerde ödenen kaporanın tamamı iade edilir. Tur tarihine 15 günden daha az bir süre kalmışsa, yapılan hazırlıklar ve yatın o saate kilitlenmesi sebebiyle ücret iadesi yapılmamaktadır, ancak müsaitliğe göre tarih değişikliği talep edilebilir."
      },
      {
        q: "Bebekli/Çocuklu aileler için güvenli mi?",
        a: "Kesinlikle. Yat filomuz en üst düzey güvenlik standartlarına sahiptir ve sertifikalıdır. Çocuk can yelekleri yatta yeteri kadar bulunmaktadır. Küçük çocuklu misafirlerimizin güvenliğini önemsiyoruz ancak turlar boyunca küçük çocukların ebeveyn gözetiminde olması zorunludur."
      },
      {
        q: "Süsleme ve organizasyon için siz destek veriyor musunuz?",
        a: "Evet. Doğum günü balonları, fasıl ekipleri, kemancı, volkan gösterileri, drone veya profesyonel fotoğrafçı gibi tüm ekstra talepleriniz profesyonel organizasyon ekibimiz tarafından sağlanmaktadır."
      }
    ];
    useSeoMeta({
      title: "Sıkça Sorulan Sorular (S.S.S) | YatigoTR Yatçılık",
      description: "Yat kiralama, organizasyon, fiyatlar ve süreçler hakkında aklınıza takılan tüm soruların cevaplarını bulabileceğiniz SSS sayfası.",
      ogTitle: "Sıkça Sorulan Sorular | YatigoTR Yatçılık",
      ogDescription: "Yat kiralama hakkında merak edilenler: Ücret iadeleri, fiyata dahil olanlar, dışarıdan yiyecek getirme ve daha fazlası."
    });
    useSchemaOrg([
      defineWebPage({
        name: "Sıkça Sorulan Sorular",
        description: "Yat kiralama ve organizasyon işlemleri hakkında sıkça sorulan sorular."
      })
    ]);
    faqs.forEach((faq) => {
      useSchemaOrg([
        defineQuestion({
          name: faq.q,
          acceptedAnswer: faq.a
        })
      ]);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_reveal = resolveDirective("reveal");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "w-full bg-light text-dark pt-32 pb-24 px-page-margin min-h-dvh" }, _attrs))}><div class="max-w-4xl mx-auto"><div class="mb-16"><h1${ssrRenderAttrs(mergeProps({ class: "text-4xl md:text-6xl font-light tracking-tight text-dark mb-6" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))}>Sıkça Sorulan Sorular</h1><p${ssrRenderAttrs(mergeProps({ class: "text-lg text-dark/70" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))}> İstanbul Boğazı yat turları, kiralama süreçleri, kapasite ve fiyatlandırma hakkında en çok merak edilenler. </p></div><div class="space-y-6"><!--[-->`);
      ssrRenderList(faqs, (faq, idx) => {
        _push(`<div class="border border-dark/20 rounded-2xl p-6 transition-colors hover:bg-dark/5"><h3 class="text-xl font-medium mb-3">${ssrInterpolate(faq.q)}</h3><p class="text-dark/70 leading-relaxed font-light">${ssrInterpolate(faq.a)}</p></div>`);
      });
      _push(`<!--]--></div><div class="mt-20 p-10 bg-dark text-light rounded-2xl text-center"><h2 class="text-2xl mb-4 font-light">Başka bir sorunuz mu var?</h2><p class="mb-8 opacity-70">Aklınıza takılan her şey için bizimle iletişime geçmekten çekinmeyin. Ekibimiz 7/24 size yardımcı olmaya hazırdır.</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/iletisim",
        class: "px-8 py-4 bg-light text-dark rounded font-medium hover:bg-light/90 transition-colors inline-block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Müşteri Temsilcisiyle Görüşün`);
          } else {
            return [
              createTextVNode("Müşteri Temsilcisiyle Görüşün")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sikca-sorulanlar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=sikca-sorulanlar-B2vdGrW5.mjs.map
