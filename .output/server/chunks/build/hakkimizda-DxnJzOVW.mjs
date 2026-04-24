import { c as useSeoMeta, a as useSupabaseClient, b as useAsyncData, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-C3ECA2vx.mjs';
import { _ as _imports_1, a as _imports_2 } from './virtual_public-DAf7m4i_.mjs';
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
  __name: "hakkimizda",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeoMeta({ title: "Hakkımızda | YatigoTR Yatçılık", description: "İstanbul Boğazı yat kiralama, vizyonumuz, referanslarımız." });
    const supabase = useSupabaseClient();
    const values = [
      { title: "Güvenlik", desc: "Tüm yatlarımız üst düzey güvenlik standartlarına sahiptir. Deneyimli kaptanlarımızla güvenliğiniz her şeyin üstündedir.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>' },
      { title: "Kalite", desc: "Premium yatlar, profesyonel ekip ve özenli hizmet anlayışıyla kaliteyi her detayda yaşatıyoruz.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>' },
      { title: "Deneyim", desc: "16 yılı aşkın sektör tecrübemizle her organizasyonu kusursuz biçimde planlıyoruz.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>' }
    ];
    const whyUs = [
      "Türkiye'nin en köklü yat kiralama şirketlerinden biri",
      "Deneyimli ve profesyonel kaptan ve mürettebat",
      "Tam donanımlı ve bakımlı lüks yat filosu",
      "Esnek fiyatlandırma ve şeffaf iletişim",
      "Profesyonel müşteri desteği ve danışmanlık",
      "Tüm sigorta ve yasal belgelere sahip güvenli hizmet"
    ];
    const { data: dbSettings } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("about-settings", async () => {
      const { data } = await supabase.from("site_settings").select("*");
      return data || [];
    })), __temp = await __temp, __restore(), __temp);
    const settingsForm = ref({ stats_years: "16+", stats_rating: "4.8", stats_guests: "65Bin+" });
    if (dbSettings.value?.length) {
      dbSettings.value.forEach((item) => {
        if (settingsForm.value[item.key_name] !== void 0) settingsForm.value[item.key_name] = item.value;
      });
    }
    const { data: fetchReviews } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("about-reviews", async () => {
      const { data } = await supabase.from("reviews").select("*").eq("is_active", true).order("created_at", { ascending: false }).limit(6);
      return data || [];
    })), __temp = await __temp, __restore(), __temp);
    const allReviews = computed(() => fetchReviews.value?.length ? fetchReviews.value : []);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans bg-white text-[#1C2B3A] min-h-screen overflow-x-hidden" }, _attrs))}><section class="relative min-h-[65vh] flex items-end overflow-hidden"><div class="absolute inset-0"><img${ssrRenderAttr("src", _imports_0)} alt="Hakkımızda" class="w-full h-full object-cover"><div class="absolute inset-0 bg-gradient-to-r from-[#0C2340]/90 via-[#0C2340]/60 to-transparent"></div><div class="absolute inset-0 bg-gradient-to-t from-[#0C2340]/80 via-transparent to-transparent"></div></div><div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 pt-40 w-full"><div class="max-w-2xl"><div class="flex items-center gap-3 mb-6"><div class="w-6 h-px bg-[#C8A96E]"></div><span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.3em]">Hakkımızda</span></div><h1 class="text-white text-[52px] md:text-[72px] font-bold leading-[1.0] tracking-[-0.03em] mb-6">YatigoTR<br><span class="text-[#C8A96E]">Yatçılık</span></h1><p class="text-white/60 text-[17px] font-light leading-relaxed max-w-lg mb-10">Boğaz&#39;ın incisi: Lüks, konfor ve profesyonel hizmetle 16 yıldır İstanbul Boğazı&#39;nda denizi sevdiren marka.</p><div class="flex flex-wrap gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/yatlarimiz",
        class: "inline-flex items-center gap-2 bg-[#C8A96E] text-[#0C2340] font-semibold text-[14px] px-8 py-4 rounded-lg hover:bg-[#dbbf7e] transition-all shadow-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Filomuzu İncele`);
          } else {
            return [
              createTextVNode("Filomuzu İncele")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/iletisim",
        class: "inline-flex items-center gap-2 border border-white/25 text-white font-medium text-[14px] px-8 py-4 rounded-lg hover:bg-white/8 transition-all"
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
      _push(`</div></div></div></section><div class="bg-[#0C2340]"><div class="max-w-[1400px] mx-auto px-6 lg:px-12"><div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-t border-white/10"><div class="flex flex-col items-center py-7"><span class="text-[32px] font-bold text-white mb-1">${ssrInterpolate(settingsForm.value.stats_years)}</span><span class="text-[10px] text-white/40 uppercase tracking-widest">Yıllık Deneyim</span></div><div class="flex flex-col items-center py-7"><span class="text-[32px] font-bold text-white mb-1">${ssrInterpolate(settingsForm.value.stats_rating)}</span><span class="text-[10px] text-white/40 uppercase tracking-widest">Google Puanı</span></div><div class="flex flex-col items-center py-7"><span class="text-[32px] font-bold text-white mb-1">${ssrInterpolate(settingsForm.value.stats_guests)}</span><span class="text-[10px] text-white/40 uppercase tracking-widest">Mutlu Misafir</span></div><div class="flex flex-col items-center py-7"><span class="text-[32px] font-bold text-[#C8A96E] mb-1">100%</span><span class="text-[10px] text-white/40 uppercase tracking-widest">Müşteri Memnuniyeti</span></div></div></div></div><section class="py-28 bg-white"><div class="max-w-[1400px] mx-auto px-6 lg:px-12"><div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"><div><span class="text-[#1A7B8A] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-4">Biz Kimiz</span><h2 class="text-[40px] md:text-[52px] font-bold text-[#0C2340] leading-tight tracking-[-0.02em] mb-8">Boğaz&#39;ın En<br>Köklü Markası</h2><p class="text-[20px] text-[#0C2340] font-medium leading-snug mb-6">İstanbul Boğazı&#39;nda yatta geçireceğiniz her anın mükemmel olması için çalışıyoruz.</p><div class="text-[#6B7A8D] text-[15px] leading-relaxed space-y-4"><p>2008 yılından bu yana YatigoTR Yatçılık olarak, İstanbul Boğazı&#39;nda lüks yat kiralama, boğaz turu ve özel organizasyonlar alanında uzmanlaşmış profesyonel bir denizcilik firmasıyız.</p><p>Sektördeki 16 yılı aşkın tecrübemiz, profesyonel ekibimiz ve yüksek standartlarda donatılmış yat filomuzla sektörün öncülerinden biriyiz.</p></div></div><div class="relative"><div class="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]"><img${ssrRenderAttr("src", _imports_1)} alt="YatigoTR Yatçılık" class="w-full h-full object-cover"></div><div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-[#E8E0D0] flex items-center gap-4"><div class="w-14 h-14 bg-[#0C2340] rounded-xl flex items-center justify-center text-[#C8A96E] shrink-0"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><p class="text-[22px] font-bold text-[#0C2340] leading-none mb-1">16+ Yıl</p><p class="text-[#6B7A8D] text-[12px] uppercase tracking-wider font-medium">Sektörel Deneyim</p></div></div></div></div></div></section><section class="py-28 bg-[#0C2340]"><div class="max-w-[1400px] mx-auto px-6 lg:px-12"><div class="text-center mb-16"><span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-4">Ne İçin Çalışıyoruz</span><h2 class="text-[40px] md:text-[52px] font-bold text-white leading-tight">Değerlerimiz</h2><p class="text-white/40 mt-4 text-[15px]">Her organizasyonumuzda titizlikle uyguladığımız temel prensipler.</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(values, (val) => {
        _push(`<div class="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-[#C8A96E]/30 transition-all"><div class="w-14 h-14 rounded-xl bg-[#C8A96E]/10 border border-[#C8A96E]/20 flex items-center justify-center text-[#C8A96E] mb-7"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">${val.icon ?? ""}</svg></div><h3 class="text-[20px] font-bold text-white mb-3">${ssrInterpolate(val.title)}</h3><p class="text-white/40 text-[14px] leading-relaxed">${ssrInterpolate(val.desc)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-28 bg-white"><div class="max-w-[1400px] mx-auto px-6 lg:px-12"><div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"><div class="relative"><div class="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]"><img${ssrRenderAttr("src", _imports_2)} alt="Neden YatigoTR" class="w-full h-full object-cover"></div><div class="absolute -bottom-6 right-6 bg-white p-5 rounded-2xl shadow-xl border border-[#E8E0D0] flex items-center gap-3"><div class="w-10 h-10 bg-[#1A7B8A] rounded-xl flex items-center justify-center text-white shrink-0"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></div><div><p class="text-[20px] font-bold text-[#0C2340] leading-none mb-0.5">100%</p><p class="text-[#6B7A8D] text-[11px] uppercase tracking-wider">Müşteri Memnuniyeti</p></div></div></div><div><span class="text-[#1A7B8A] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-4">Fark Yaratan Detaylar</span><h2 class="text-[40px] md:text-[52px] font-bold text-[#0C2340] leading-tight tracking-[-0.02em] mb-8">Neden<br>YatigoTR?</h2><ul class="space-y-4"><!--[-->`);
      ssrRenderList(whyUs, (item) => {
        _push(`<li class="flex items-start gap-4"><div class="w-6 h-6 rounded-full bg-[#0C2340] flex items-center justify-center shrink-0 mt-0.5"><svg class="w-3.5 h-3.5 text-[#C8A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div><span class="text-[#1C2B3A] text-[15px] font-medium leading-relaxed">${ssrInterpolate(item)}</span></li>`);
      });
      _push(`<!--]--></ul></div></div></div></section>`);
      if (allReviews.value.length > 0) {
        _push(`<section class="py-28 bg-white"><div class="max-w-[1400px] mx-auto px-6 lg:px-12"><div class="text-center mb-16"><span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-4">Müşteri Değerlendirmeleri</span><h2 class="text-[40px] md:text-[52px] font-bold text-[#0C2340] leading-tight">Misafirlerimiz<br>Ne Diyor?</h2></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(allReviews.value.slice(0, 6), (review) => {
          _push(`<div class="bg-white rounded-2xl p-7 border border-[#E8E0D0]"><div class="flex text-[#C8A96E] mb-5"><!--[-->`);
          ssrRenderList(5, (s) => {
            _push(`<svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`);
          });
          _push(`<!--]--></div><p class="text-[#4A5568] text-[14px] leading-relaxed mb-6 italic">&quot;${ssrInterpolate(review.comment)}&quot;</p><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white" style="${ssrRenderStyle({ backgroundColor: review.avatar_color || "#1A7B8A" })}">${ssrInterpolate(review.reviewer_name?.charAt(0) || "U")}</div><div><div class="font-semibold text-[14px] text-[#0C2340]">${ssrInterpolate(review.reviewer_name)}</div><div class="text-[11px] text-[#6B7A8D]">Doğrulanmış Misafir</div></div></div></div>`);
        });
        _push(`<!--]--></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/hakkimizda.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=hakkimizda-DxnJzOVW.mjs.map
