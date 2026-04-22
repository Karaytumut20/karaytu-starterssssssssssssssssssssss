import { a as useAsyncData, b as useSeoMeta, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-C3ECA2vx.mjs';
import { _ as _imports_1, a as _imports_2 } from './virtual_public-DAf7m4i_.mjs';
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
  __name: "hakkimizda",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const supabase = useSupabaseClient();
    const { data: dbSettings } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("about-settings", async () => {
      const { data } = await supabase.from("site_settings").select("*");
      return data || [];
    })), __temp = await __temp, __restore(), __temp);
    const settingsForm = ref({
      stats_years: "16+",
      stats_rating: "4.8",
      stats_guests: "65Bin+"
    });
    if (dbSettings.value && dbSettings.value.length > 0) {
      dbSettings.value.forEach((item) => {
        if (settingsForm.value[item.key_name] !== void 0) {
          settingsForm.value[item.key_name] = item.value;
        }
      });
    }
    const fallbackReviews = [
      { id: "r1", reviewer_name: "Gülşah Işık", avatar_url: "", rating: 5, comment: "Çağla hanımın ilgi ve alakası için çok teşekkür ederiz çok keyifli bir gece geçirdik." },
      { id: "r2", reviewer_name: "ONUR GÖREN", avatar_url: "", rating: 5, comment: "Süleyman kaptan ve çağla hanıma kusursuz emelleri için çok teşekkür ederiz." },
      { id: "r3", reviewer_name: "Tuba Aydın", avatar_url: "", rating: 5, comment: "Taha Bey ve Erol kaptan çok ilgililer, biz memnun kaldık. Evlilik teklifi organizasyonunu kusursuz sundular." }
    ];
    const { data: fetchReviews } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("about-reviews", async () => {
      const { data } = await supabase.from("reviews").select("*").eq("is_active", true).order("created_at", { ascending: false }).limit(6);
      return data || [];
    })), __temp = await __temp, __restore(), __temp);
    const allReviews = computed(() => {
      return fetchReviews.value && fetchReviews.value.length > 0 ? fetchReviews.value : fallbackReviews;
    });
    useSeoMeta({
      title: "Hakkımızda | YatigoTR Yatçılık Kurumsal",
      description: "İstanbul Boğazı yat kiralama, vizyonumuz, referanslarımız ve misafir yorumlarımız."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans text-[#1c2c44] bg-white min-h-screen pb-0 overflow-x-hidden" }, _attrs))}><section class="w-full relative overflow-hidden min-h-[60vh] lg:min-h-[500px] flex flex-col justify-center"><div class="absolute inset-0 z-0 bg-[#0f2038]"><img${ssrRenderAttr("src", _imports_0)} alt="Hakkımızda" class="w-full h-full object-cover object-bottom opacity-70"><div class="absolute inset-0 bg-gradient-to-r from-[#0f2038]/95 via-[#0f2038]/70 to-transparent"></div></div><div class="w-full grid grid-cols-14 mt-10 relative z-10"><div class="col-start-3 col-end-13 w-full"><div class="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full py-1.5 mb-6"><div class="w-1.5 h-1.5 rounded-full bg-[#eab308]"></div><span class="text-white text-[11px] font-bold tracking-wide uppercase">Hakkımızda</span></div><h1 class="text-white text-4xl md:text-[5rem] font-bold leading-[1.05] tracking-tight mb-6"> YatigoTR Yatçılık </h1><div class="w-12 h-1 bg-[#00bfff] mb-6"></div><p class="text-white/90 text-[14px] md:text-[17px] font-medium max-w-[550px] leading-relaxed mb-10"> Boğaz&#39;ın incisi: Lüks, konfor ve profesyonel hizmetle yıllardır İstanbul Boğazı&#39;nda denizi sevdiren marka. </p><div class="flex flex-wrap items-center gap-8 lg:gap-12 mb-10"><div class="flex flex-col"><span class="text-[#00bfff] text-[32px] font-black leading-none mb-1 shadow-sm">${ssrInterpolate(settingsForm.value.stats_years)}</span><span class="text-white text-[11px] font-bold uppercase tracking-wider">Yıllık Deneyim</span></div><div class="flex flex-col border-l border-white/20 pl-8 lg:pl-12"><span class="text-[#00bfff] text-[32px] font-black leading-none mb-1 shadow-sm">${ssrInterpolate(settingsForm.value.stats_rating)}</span><span class="text-white text-[11px] font-bold uppercase tracking-wider">Google Puanı</span></div><div class="flex flex-col border-l border-white/20 pl-8 lg:pl-12"><span class="text-[#00bfff] text-[32px] font-black leading-none mb-1 shadow-sm">${ssrInterpolate(settingsForm.value.stats_guests)}</span><span class="text-white text-[11px] font-bold uppercase tracking-wider">Özel Yat Turu</span></div></div><div class="flex flex-wrap items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/yatlarimiz",
        class: "bg-white text-[#1c2c44] font-bold text-[14px] px-8 py-3.5 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Filomuzu Keşfedin → `);
          } else {
            return [
              createTextVNode(" Filomuzu Keşfedin → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="https://wa.me/905441014343" target="_blank" class="bg-[#2a4365]/40 backdrop-blur-md border border-white/30 text-white font-bold text-[14px] px-8 py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#2a4365]/60 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px] shrink-0" fill="currentColor" viewBox="0 0 448 512" style="${ssrRenderStyle({ "transform": "translateY(-1px)" })}"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg> WhatsApp </a></div></div></div><div class="absolute bottom-4 left-0 right-0 mx-auto flex flex-col items-center gap-2 z-10 w-full"><span class="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] ml-1">Kaydır</span><svg class="w-6 h-6 text-white/70 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="7" y="4" width="10" height="16" rx="5" stroke-width="1.5"></rect><path d="M12 8v4" stroke-width="1.5" stroke-linecap="round"></path></svg></div></section><section class="w-full grid grid-cols-14 py-20 lg:py-28"><div class="col-start-3 col-end-13 w-full"><div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"><div><span class="text-[#0ea5e9] text-[11px] font-black tracking-[0.1em] uppercase mb-2 block">Hakkımızda</span><h2 class="text-3xl lg:text-4xl font-bold text-[#1c2c44] tracking-tight mb-6">Biz Kimiz?</h2><p class="text-[20px] lg:text-[22px] font-medium text-[#1c2c44] leading-snug mb-6"> İstanbul Boğazı&#39;nda yatta geçireceğiniz her anın mükemmel olması için çalışıyoruz. </p><div class="text-[#64748b] text-[15px] leading-relaxed space-y-4"><p>2008 yılından bu yana YatigoTR Yatçılık olarak, İstanbul Boğazı&#39;nda lüks yat kiralama, boğaz turu ve özel organizasyonlar alanında uzmanlaşmış profesyonel bir denizcilik firmasıyız.</p><p>Sektördeki 16 yılı aşkın tecrübemiz, profesyonel ekibimiz, yüksek standartlarda donatılmış yat filomuz ve müşteri odaklı hizmet anlayışımızla sektörün öncülerinden biriyiz. Denizin üzerindeki en özel anlarınıza eşlik etmekten gurur duyuyoruz.</p></div></div><div class="relative"><div class="rounded-2xl overflow-hidden shadow-2xl h-[400px] w-full"><img${ssrRenderAttr("src", _imports_1)} alt="YatigoTR Yatçılık" class="w-full h-full object-cover"></div><div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 flex items-center gap-4"><div class="w-12 h-12 bg-[#f0f6ff] rounded-full flex items-center justify-center text-[#0ea5e9] shrink-0"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><p class="text-[20px] font-black text-[#1c2c44] leading-none mb-1">16+ Yıl</p><p class="text-[#64748b] text-[12px] font-bold uppercase tracking-wider">Sektörel Deneyim</p></div></div></div></div></div></section><section class="w-full bg-[#f8f9fc] py-20 lg:py-28"><div class="w-full grid grid-cols-14 text-center"><div class="col-start-3 col-end-13 w-full"><span class="text-[#0ea5e9] text-[11px] font-black tracking-[0.1em] uppercase mb-2 block">Ne İçin Çalışıyoruz</span><h2 class="text-3xl lg:text-4xl font-bold text-[#1c2c44] tracking-tight mb-4">Değerlerimiz</h2><p class="text-[#64748b] text-[15px] mb-16">Her organizasyonumuzda titizlikle uyguladığımız temel prensipler.</p><div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"><div class="bg-white border border-[#e2e8f0]/80 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300"><div class="w-14 h-14 rounded-full bg-[#f0f6ff] text-[#0ea5e9] flex items-center justify-center mb-6"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></div><h3 class="text-xl font-bold text-[#1c2c44] mb-3">Güvenlik</h3><p class="text-[#64748b] text-[14px] leading-relaxed">Tüm yatlarımız en üst düzey güvenlik standartlarına sahiptir ve düzenli bakımdan geçer. Deneyimli kaptanlarımızla sizin güvenliğiniz her şeyin üstünde tutulur.</p></div><div class="bg-white border border-[#e2e8f0]/80 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300"><div class="w-14 h-14 rounded-full bg-[#f0f6ff] text-[#0ea5e9] flex items-center justify-center mb-6"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg></div><h3 class="text-xl font-bold text-[#1c2c44] mb-3">Kalite</h3><p class="text-[#64748b] text-[14px] leading-relaxed">Premium yatlar, profesyonel ekip ve özenli hizmet anlayışı ile kaliteyi her detayda yaşatıyoruz. Mükemmellik bizim için bir alışkanlık.</p></div><div class="bg-white border border-[#e2e8f0]/80 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300"><div class="w-14 h-14 rounded-full bg-[#f0f6ff] text-[#0ea5e9] flex items-center justify-center mb-6"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><h3 class="text-xl font-bold text-[#1c2c44] mb-3">Deneyim</h3><p class="text-[#64748b] text-[14px] leading-relaxed">16 yılı aşkın sektör tecrübemiz ile her organizasyonu kusursuz bir şekilde planlıyoruz. Devlet başkanlarından ünlü markalara kadar binlerce özel etkinlik.</p></div></div></div></div></section><section class="w-full grid grid-cols-14 py-20 lg:py-28"><div class="col-start-3 col-end-13 w-full"><div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"><div class="order-2 lg:order-1 relative"><div class="rounded-2xl overflow-hidden shadow-xl h-[450px] w-full"><img${ssrRenderAttr("src", _imports_2)} alt="YatigoTR Yatçılık Neden Biz" class="w-full h-full object-cover"></div><div class="absolute -bottom-5 right-10 bg-white px-6 py-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3"><div class="w-8 h-8 bg-[#2563eb] rounded-full flex items-center justify-center text-white shrink-0"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div><div><p class="text-[18px] font-black text-[#1c2c44] leading-none mb-0.5">100%</p><p class="text-[#64748b] text-[11px] font-bold">Müşteri Memnuniyeti</p></div></div></div><div class="order-1 lg:order-2"><span class="text-[#0ea5e9] text-[11px] font-black tracking-[0.1em] uppercase mb-2 block">Fark Yaratan Detaylar</span><h2 class="text-3xl lg:text-4xl font-bold text-[#1c2c44] tracking-tight mb-4">Neden YatigoTR Yatçılık?</h2><p class="text-[#64748b] text-[15px] mb-8">Sektörde bizleri tercih etmeniz için birçok sebep var.</p><ul class="space-y-5"><li class="flex items-start gap-4"><div class="w-6 h-6 rounded-full bg-[#f0f6ff] text-[#0ea5e9] flex items-center justify-center shrink-0 mt-0.5"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div><span class="text-[#1c2c44] font-semibold text-[15px]">Türkiye&#39;nin en köklü yat kiralama şirketlerinden biri</span></li><li class="flex items-start gap-4"><div class="w-6 h-6 rounded-full bg-[#f0f6ff] text-[#0ea5e9] flex items-center justify-center shrink-0 mt-0.5"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div><span class="text-[#1c2c44] font-semibold text-[15px]">Deneyimli ve profesyonel kaptan ve mürettebat</span></li><li class="flex items-start gap-4"><div class="w-6 h-6 rounded-full bg-[#f0f6ff] text-[#0ea5e9] flex items-center justify-center shrink-0 mt-0.5"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div><span class="text-[#1c2c44] font-semibold text-[15px]">Tam donanımlı ve bakımlı lüks yat filosu</span></li><li class="flex items-start gap-4"><div class="w-6 h-6 rounded-full bg-[#f0f6ff] text-[#0ea5e9] flex items-center justify-center shrink-0 mt-0.5"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div><span class="text-[#1c2c44] font-semibold text-[15px]">Esnek fiyatlandırma ve şeffaf iletişim</span></li><li class="flex items-start gap-4"><div class="w-6 h-6 rounded-full bg-[#f0f6ff] text-[#0ea5e9] flex items-center justify-center shrink-0 mt-0.5"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div><span class="text-[#1c2c44] font-semibold text-[15px]">Profesyonel müşteri desteği ve danışmanlık</span></li><li class="flex items-start gap-4"><div class="w-6 h-6 rounded-full bg-[#f0f6ff] text-[#0ea5e9] flex items-center justify-center shrink-0 mt-0.5"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div><span class="text-[#1c2c44] font-semibold text-[15px]">Tüm sigorta ve yasal belgelere sahip güvenli hizmet</span></li></ul></div></div></div></section><section class="w-full grid grid-cols-14 py-20 text-center border-t border-[#e2e8f0]/60"><div class="col-start-3 col-end-13 w-full"><span class="text-[#0ea5e9] text-[11px] font-black tracking-[0.1em] uppercase mb-2 block">Güven Veren Referanslar</span><h2 class="text-3xl font-bold text-[#1c2c44] tracking-tight mb-3">Kurumsal Referanslarımız</h2><p class="text-[#64748b] text-[15px] mb-12">Güvenilir markalar bizimle çalışıyor</p><div class="flex flex-wrap justify-center items-center gap-10 lg:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"><span class="text-2xl font-black tracking-tighter">EFES</span><span class="text-2xl font-black lowercase tracking-tight">beko</span><span class="text-2xl font-black italic">LG</span><span class="text-2xl font-bold lowercase text-green-700">bp</span><span class="text-2xl font-black italic text-red-600">THY</span><span class="text-2xl font-black tracking-widest text-[#1c2c44]">ARKAS</span><span class="text-2xl font-black text-green-500">Spotify</span><span class="text-2xl font-bold text-[#ff6600]">sahibinden.com</span></div></div></section><section class="bg-[#f8f9fc] py-20"><div class="w-full grid grid-cols-14"><div class="col-start-3 col-end-13 w-full"><div class="text-center mb-16"><span class="text-[#0ea5e9] text-[11px] font-black tracking-[0.1em] uppercase mb-2 block">Müşteri Değerlendirmeleri</span><h2 class="text-3xl lg:text-4xl font-bold text-[#1c2c44] tracking-tight mb-4">Misafirlerimiz Ne Diyor?</h2><p class="text-[#64748b] text-[15px] mb-12">Yüzlerce mutlu misafirimizin yorumları.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(allReviews.value.slice(0, 6), (review) => {
        _push(`<div class="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#e2e8f0]/80"><div class="flex items-center gap-4 mb-4">`);
        if (!review.avatar_url) {
          _push(`<div class="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#64748b] font-bold text-lg uppercase">${ssrInterpolate(review.reviewer_name.charAt(0))}</div>`);
        } else {
          _push(`<div class="w-10 h-10 rounded-full overflow-hidden"><img${ssrRenderAttr("src", review.avatar_url)}${ssrRenderAttr("alt", review.reviewer_name)} class="w-full h-full object-cover"></div>`);
        }
        _push(`<div><h4 class="font-bold text-[#1c2c44] text-[14px]">${ssrInterpolate(review.reviewer_name)}</h4><p class="text-[11px] text-[#94a3b8]">${ssrInterpolate(review.created_at ? new Date(review.created_at).toLocaleDateString() : "Yakın zamanda")}</p></div><div class="ml-auto w-5 h-5 bg-[#ffffff] rounded border border-gray-100 flex items-center justify-center"><span class="text-[10px] font-bold text-red-500">G</span></div></div><div class="flex items-center gap-1 mb-3 text-[#eab308]"><!--[-->`);
        ssrRenderList(Math.floor(review.rating || 5), (star) => {
          _push(`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`);
        });
        _push(`<!--]--></div><p class="text-[#64748b] text-[13px] leading-relaxed">${ssrInterpolate(review.comment)}</p></div>`);
      });
      _push(`<!--]--></div><div class="mt-12 flex justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "https://google.com",
        target: "_blank",
        class: "bg-[#eab308] text-[#1c2c44] font-bold text-[14px] px-8 py-3.5 rounded-lg shadow-md hover:bg-[#ca8a04] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Yorumları İnceleyin`);
          } else {
            return [
              createTextVNode("Yorumları İnceleyin")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section></div>`);
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
//# sourceMappingURL=hakkimizda-Cr46TSQD.mjs.map
