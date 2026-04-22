import { u as useRoute, a as useAsyncData, b as useSeoMeta, c as useSchemaOrg, d as useHead, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { u as useSupabaseClient } from './useSupabaseClient-4v4x5xwK.mjs';
import { defineBreadcrumb, defineProduct } from '@unhead/schema-org/vue';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const supabase = useSupabaseClient();
    const slug = route.params.slug;
    const { data: experienceData, pending } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`exp-${slug}`, async () => {
      const { data } = await supabase.from("experiences").select("*").eq("slug", slug).single();
      return data;
    })), __temp = await __temp, __restore(), __temp);
    const experience = computed(() => experienceData.value);
    const content = computed(() => {
      if (!experience.value || !experience.value.content_json) {
        return { features: [], menu: [], itinerary: [], faq: [] };
      }
      return typeof experience.value.content_json === "string" ? JSON.parse(experience.value.content_json) : experience.value.content_json;
    });
    useSeoMeta({
      title: computed(() => experience.value?.meta_title || (experience.value?.title ? `${experience.value.title} | YatigoTR Yatçılık` : "Deneyim Detayı | YatigoTR Yatçılık")),
      description: computed(() => experience.value?.meta_description || experience.value?.short_description || "İstanbul Boğazı yat kiralama ve özel deneyimler."),
      keywords: computed(() => experience.value?.meta_keywords || "")
    });
    useSchemaOrg([
      defineBreadcrumb({
        itemListElement: [
          { name: "Ana Sayfa", item: "/" },
          { name: "Deneyimlerimiz", item: "/deneyimlerimiz" },
          { name: () => experience.value?.title || "Detay", item: () => `/deneyimlerimiz/${experience.value?.slug}` }
        ]
      }),
      defineProduct({
        name: () => experience.value?.title,
        description: () => experience.value?.meta_description || experience.value?.short_description || "İstanbul Boğazı özel yat turu.",
        image: () => experience.value?.main_image || "/images/img1.jpg",
        offers: [
          {
            price: () => experience.value?.starting_price || 0,
            priceCurrency: "TRY",
            availability: "InStock"
          }
        ]
      })
    ]);
    useHead(() => {
      const headData = {
        link: [
          { rel: "canonical", href: `https://suyatcilik.com/deneyimlerimiz/${route.params.slug}` }
        ]
      };
      if (content.value?.faq && content.value.faq.length) {
        const faqJsonLd = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": content.value.faq.map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a
            }
          }))
        };
        headData.script = [{
          type: "application/ld+json",
          innerHTML: JSON.stringify(faqJsonLd)
        }];
      }
      return headData;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "w-full bg-[#f8f9fc] text-[#1c2c44] pb-0 overflow-x-hidden min-h-dvh" }, _attrs))}>`);
      if (unref(pending)) {
        _push(`<div class="w-full h-[60vh] flex items-center justify-center"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#215d8f]"></div></div>`);
      } else if (!experience.value) {
        _push(`<div class="w-full h-[60vh] flex flex-col items-center justify-center text-center px-6"><h1 class="text-4xl font-bold text-[#112135] mb-4">Deneyim Bulunamadı</h1><p class="text-[#64748b] mb-8">Aradığınız deneyim paketi yayından kaldırılmış veya URL hatalı olabilir.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/deneyimlerimiz",
          class: "bg-[#215d8f] text-white px-8 py-3 rounded-full font-bold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Tüm Deneyimlere Dön`);
            } else {
              return [
                createTextVNode("Tüm Deneyimlere Dön")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div><div class="w-full bg-white border-b border-[#e2e8f0]/60"><div class="max-w-[840px] mx-auto px-6 lg:px-8 pt-32 pb-14 text-center"><div class="mb-6 flex items-center justify-center gap-2 text-[12px] font-bold text-[#64748b] tracking-wide uppercase">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "hover:text-[#215d8f] transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Ana Sayfa`);
            } else {
              return [
                createTextVNode("Ana Sayfa")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="text-[#cbd5e1]">•</span>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/deneyimlerimiz",
          class: "hover:text-[#215d8f] transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Deneyimler`);
            } else {
              return [
                createTextVNode("Deneyimler")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="text-[#cbd5e1]">•</span><span class="text-[#112135]">${ssrInterpolate(experience.value.title)}</span></div><h1 class="text-[34px] md:text-[44px] font-extrabold text-[#112135] leading-[1.15] mb-6 tracking-tight">${ssrInterpolate(experience.value.title)}</h1>`);
        if (experience.value.main_image) {
          _push(`<div class="mt-10 rounded-2xl overflow-hidden shadow-lg w-full h-[300px] md:h-[450px]"><img${ssrRenderAttr("src", experience.value.main_image)}${ssrRenderAttr("alt", experience.value.main_image_alt || experience.value.title)} class="w-full h-full object-cover"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="max-w-[840px] mx-auto px-6 lg:px-8 py-16"><div class="prose prose-lg prose-slate max-w-none text-[#475569] leading-relaxed text-[15px] space-y-6"><div>${(experience.value.full_description || experience.value.short_description) ?? ""}</div></div></div><div class="max-w-[840px] mx-auto px-6 lg:px-8 mb-16"><div class="bg-[#1e3a5f] rounded-[24px] p-8 md:p-14 text-center text-white relative overflow-hidden shadow-2xl"><div class="absolute top-0 right-0 w-[400px] h-[400px] bg-[#38bdf8]/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/3"></div><span class="text-[#f59e0b] text-[11px] font-bold uppercase tracking-[0.25em] block mb-3 relative z-10">ONLINE REZERVASYON</span><h3 class="text-3xl md:text-[36px] font-bold mb-4 tracking-tight relative z-10">${ssrInterpolate(experience.value.title)} İçin Tarih Belirleyin</h3><p class="text-white/80 font-medium mb-8 text-[15px] md:text-[17px] max-w-lg mx-auto relative z-10 leading-relaxed"> Rezervasyonları internet sitemiz üzerinden başlatabilirsiniz veya hızlı bilgi ve organizasyon için WhatsApp ile bize ulaşabilirsiniz. Başlangıç Fiyatı: <strong>${ssrInterpolate(Number(experience.value.starting_price).toLocaleString("tr-TR"))} TL</strong></p><div class="flex flex-col sm:flex-row justify-center gap-4 items-center relative z-10">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/rezervasyon",
          class: "bg-white text-[#112135] px-8 py-4 rounded-full font-bold text-[15px] hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center min-w-[220px]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Rezervasyon Yap <span class="ml-2"${_scopeId}>→</span>`);
            } else {
              return [
                createTextVNode(" Rezervasyon Yap "),
                createVNode("span", { class: "ml-2" }, "→")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<a href="https://wa.me/905441014343" class="bg-[#22c55e] border border-[#16a34a] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#16a34a] transition-colors shadow-lg flex items-center justify-center gap-2 min-w-[220px]"> WhatsApp İle Sor </a></div></div></div>`);
        if (content.value.itinerary && content.value.itinerary.length > 0) {
          _push(`<div class="max-w-[840px] mx-auto px-6 lg:px-8 pb-16 border-b border-[#e2e8f0]/60"><div class="prose prose-lg prose-slate max-w-none text-[#475569] leading-relaxed text-[15px] space-y-6"><h2 class="text-[24px] md:text-[26px] font-extrabold text-[#112135] mt-14 mb-6 tracking-tight">Tur Akışı</h2><div class="space-y-6 pl-2 border-l-2 border-[#e2e8f0]"><!--[-->`);
          ssrRenderList(content.value.itinerary, (step, idx) => {
            _push(`<div class="pl-4 relative"><div class="absolute w-3 h-3 bg-[#215d8f] rounded-full -left-[7px] top-1.5 border-[3px] border-[#f8f9fc]"></div><h3 class="text-[16px] font-bold text-[#112135] mb-1">${ssrInterpolate(step.title)}</h3><p>${ssrInterpolate(step.desc)}</p></div>`);
          });
          _push(`<!--]--></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (content.value.faq && content.value.faq.length > 0) {
          _push(`<div class="max-w-[840px] mx-auto px-6 lg:px-8 py-16"><div class="prose prose-lg prose-slate max-w-none text-[#475569] leading-relaxed text-[15px] space-y-8"><div><h2 class="text-[24px] md:text-[26px] font-extrabold text-[#112135] mb-6 tracking-tight">Sıkça Sorulan Sorular</h2><div class="space-y-6"><!--[-->`);
          ssrRenderList(content.value.faq, (faq, idx) => {
            _push(`<div><h3 class="text-[16px] font-bold text-[#112135] mb-1">${ssrInterpolate(faq.q)}</h3><p>${ssrInterpolate(faq.a)}</p></div>`);
          });
          _push(`<!--]--></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<section class="max-w-[1000px] mx-auto px-6 lg:px-8 py-16 bg-white border-t border-[#e2e8f0]/60"><div class="text-center mb-10"><h2 class="text-[28px] md:text-[32px] font-extrabold text-[#112135] tracking-tight mb-3">Nasıl İşliyor?</h2><p class="text-[#64748b] text-[15px] max-w-lg mx-auto">3 adımda deneyiminizi planlayın ve rezervasyonunuzu oluşturun.</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-white rounded-3xl p-8 lg:p-10 border border-[#e2e8f0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-center flex flex-col items-center"><div class="w-16 h-16 rounded-2xl bg-[#f0f9ff] flex items-center justify-center text-[#215d8f] mb-6"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div><h3 class="text-[17px] font-bold text-[#112135] mb-2">Tarih &amp; Saat Seçin</h3><p class="text-[14px] text-[#64748b] leading-relaxed">Uygun saatleri görün, tur sürenizi belirleyin.</p></div><div class="bg-white rounded-3xl p-8 lg:p-10 border border-[#e2e8f0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-center flex flex-col items-center"><div class="w-16 h-16 rounded-2xl bg-[#f0f9ff] flex items-center justify-center text-[#215d8f] mb-6"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M2 14h20a1 1 0 011 1v6H1v-6a1 1 0 011-1z"></path></svg></div><h3 class="text-[17px] font-bold text-[#112135] mb-2">Yat Seçin</h3><p class="text-[14px] text-[#64748b] leading-relaxed">Kişi sayınıza ve beklentilerinize uygun yatı seçin.</p></div><div class="bg-white rounded-3xl p-8 lg:p-10 border border-[#e2e8f0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-center flex flex-col items-center"><div class="w-16 h-16 rounded-2xl bg-[#f0f9ff] flex items-center justify-center text-[#215d8f] mb-6"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><h3 class="text-[17px] font-bold text-[#112135] mb-2">Onaylayın</h3><p class="text-[14px] text-[#64748b] leading-relaxed">Ekstralar ekleyip, değerlendirip rezervasyonu oluşturun.</p></div></div></section>`);
        if (content.value.features && content.value.features.length > 0) {
          _push(`<section class="max-w-[840px] mx-auto px-6 lg:px-8 py-12 text-center"><h2 class="text-[26px] font-bold text-[#112135] tracking-tight mb-10">Özellikler</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-left"><!--[-->`);
          ssrRenderList(content.value.features, (feature, idx) => {
            _push(`<div class="bg-white py-4 px-6 rounded-full shadow-sm border border-[#e2e8f0]/60 flex items-center gap-3"><svg class="w-5 h-5 text-[#22c55e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg><span class="text-[14px] font-semibold text-[#112135]">${ssrInterpolate(feature)}</span></div>`);
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        if (content.value.menu && content.value.menu.length > 0) {
          _push(`<section class="max-w-[840px] mx-auto px-6 lg:px-8 py-12 mb-10 text-center relative"><h2 class="text-[26px] font-bold text-[#112135] tracking-tight mb-2">Menü</h2><p class="text-[#64748b] text-[15px] mb-10">Menü ve paket içerikleri bu organizasyon için standartlaştırılmıştır.</p><div class="bg-white rounded-3xl border border-[#e2e8f0] p-8 md:p-12 text-left shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden"><div class="absolute -right-10 -top-10 w-32 h-32 bg-[#f0f9ff] rounded-full blur-2xl"></div><h3 class="text-[18px] font-extrabold text-[#112135] mb-2 relative z-10">Servis Menüsü Seçenekleri</h3><p class="text-[#64748b] text-[13px] mb-8 relative z-10">Rezervasyon sırasında özel taleplerinizi iletebilirsiniz.</p><ul class="space-y-4 relative z-10"><!--[-->`);
          ssrRenderList(content.value.menu, (menuItem, idx) => {
            _push(`<li class="flex items-center gap-3"><div class="w-1.5 h-1.5 rounded-full bg-[#215d8f] shrink-0"></div><span class="text-[15px] font-bold text-[#112135]">${ssrInterpolate(menuItem)}</span></li>`);
          });
          _push(`<!--]--></ul></div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/deneyimlerimiz/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CWx6OJ8w.mjs.map
