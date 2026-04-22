import { b as useSeoMeta, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, computed, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_1$1, a as _imports_2 } from './virtual_public-DAf7m4i_.mjs';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { useRoute } from 'vue-router';
import 'pinia';
import '@supabase/ssr';
import 'node:crypto';
import '@vue/shared';
import '@unhead/schema-org/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
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

const _imports_1 = publicAssetsURL("/images/img2.jpg");
const _imports_3 = publicAssetsURL("/images/img4.jpg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const slug = route.params.slug;
    const db = {
      "yatta-evlenme-teklifi": {
        title: "Yatta Evlenme Teklifi",
        hero: "Yatta Evlenme Teklifi: Boğaz'da Romantik ve Unutulmaz Bir Evet",
        short: "Sürpriz detaylarla süslenmiş romantik bir ortamda, İstanbul Boğazı eşliğinde unutulmaz bir deneyim.",
        reviewTag: "TEKLİF DENEYİMLERİ",
        showMenu: false
      },
      "istanbul-adalar-yat-turu": {
        title: "İstanbul Adalar Yat Turu",
        hero: "İstanbul Adalar Yat Turu: Prens Adaları'na Lüks Bir Kaçamak",
        short: "İstanbul'un büyüleyici Adalar manzarası eşliğinde denizle buluşacağınız çok özel bir deneyim.",
        reviewTag: "MİSAFİR YORUMLARI",
        showMenu: false
      },
      "yemekli-yat-turu": {
        title: "Yemekli Yat Turu İstanbul",
        hero: "Yemekli Yat Turu İstanbul: Boğaz'da Unutulmaz Bir Akşam Yemeği Deneyimi",
        short: "İstanbul'un büyüleyici Boğaz manzarası eşliğinde lezzetli anları bir arada yaşayacağınız bir deneyim.",
        reviewTag: "MİSAFİR YORUMLARI",
        showMenu: true
      },
      "istanbul-bogazi-ozel-yat-turu": {
        title: "İstanbul Boğazı Özel Yat Turu",
        hero: "İstanbul Boğazı Özel Yat Turu: Size Özel Ayrıcalıklı Bir Keşif",
        short: "Boğaz'ın eşsiz manzarasında sadece size özel bir yatla unutulmaz anılar biriktirin.",
        reviewTag: "MİSAFİR YORUMLARI",
        showMenu: true
      }
    };
    const pageData = computed(() => db[slug] || db["yemekli-yat-turu"]);
    useSeoMeta({
      title: () => `${pageData.value.title} | YatigoTR Yatçılık`,
      description: () => pageData.value.short
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "w-full bg-[#f8f9fc] text-[#1c2c44] pb-0 overflow-x-hidden min-h-dvh" }, _attrs))}><div class="w-full bg-white border-b border-[#e2e8f0]/60"><div class="max-w-[840px] mx-auto px-6 lg:px-8 pt-32 pb-14 text-center"><div class="mb-6 flex items-center justify-center gap-2 text-[12px] font-bold text-[#64748b] tracking-wide uppercase">`);
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
        to: "/yat-turu-organizasyon",
        class: "hover:text-[#215d8f] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Organizasyonlar`);
          } else {
            return [
              createTextVNode("Organizasyonlar")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="text-[#cbd5e1]">•</span><span class="text-[#112135]">${ssrInterpolate(pageData.value.title)}</span></div><h1 class="text-[34px] md:text-[44px] font-extrabold text-[#112135] leading-[1.15] mb-6 tracking-tight">${ssrInterpolate(pageData.value.hero)}</h1></div></div><div class="max-w-[840px] mx-auto px-6 lg:px-8 py-16"><div class="prose prose-lg prose-slate max-w-none text-[#475569] leading-relaxed text-[15px] space-y-6"><p><strong>${ssrInterpolate(pageData.value.title)}</strong>, İstanbul&#39;un büyüleyici Boğaz manzarası eşliğinde sevdiklerinizle unutulmaz anları bir arada yaşayacağınız bir deneyimdir. Sıradan bir etkinliğin çok ötesinde; hareket eden bir sahne, değişen ışıklar ve lüks bir atmosfer demektir.</p><p>İstanbul&#39;un eşsiz silüetini izlerken yatlarımızın konforunda kendinizi özel hissedeceksiniz. Hem damak zevkinize hem de ruhunuza hitap eden bu organizasyonumuz, size muazzam bir denizaşırı kaçamak vaat eder.</p><h2 class="text-[26px] md:text-[28px] font-extrabold text-[#112135] mt-14 mb-6 tracking-tight">${ssrInterpolate(pageData.value.title)} Neden Farklı?</h2><p>Sıradan kutlamalar veya turlar güzeldir, ama <strong>Boğaz manzarasında özel yat ayrıcalığı</strong> bambaşka bir deneyimdir. İşte fark yaratan detaylar:</p><ul class="space-y-4 my-6 pl-0"><li class="flex items-start gap-3"><span class="block mt-1 w-2 h-2 rounded-full bg-[#215d8f] shrink-0"></span><span><strong class="text-[#112135]">Hareket eden manzara:</strong> Her dakikada farklı bir İstanbul görüntüsü eşliğinde</span></li><li class="flex items-start gap-3"><span class="block mt-1 w-2 h-2 rounded-full bg-[#215d8f] shrink-0"></span><span><strong class="text-[#112135]">Tamamen özel ortam:</strong> Sadece sizin grubunuz, kalabalık ve gürültü yok</span></li><li class="flex items-start gap-3"><span class="block mt-1 w-2 h-2 rounded-full bg-[#215d8f] shrink-0"></span><span><strong class="text-[#112135]">Işık gösterisi:</strong> Köprüler, saraylar ve yalıların muazzam ışıkları</span></li><li class="flex items-start gap-3"><span class="block mt-1 w-2 h-2 rounded-full bg-[#215d8f] shrink-0"></span><span><strong class="text-[#112135]">Romantik atmosfer:</strong> Dalgaların sesi, serin deniz esintisi</span></li><li class="flex items-start gap-3"><span class="block mt-1 w-2 h-2 rounded-full bg-[#215d8f] shrink-0"></span><span><strong class="text-[#112135]">Kişiye özel servis:</strong> Alanında uzman ekibin size özel ilgisi ve hizmeti</span></li></ul></div></div><div class="max-w-[840px] mx-auto px-6 lg:px-8 mb-16"><div class="bg-[#1e3a5f] rounded-[24px] p-8 md:p-14 text-center text-white relative overflow-hidden shadow-2xl"><div class="absolute top-0 right-0 w-[400px] h-[400px] bg-[#38bdf8]/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/3"></div><span class="text-[#f59e0b] text-[11px] font-bold uppercase tracking-[0.25em] block mb-3 relative z-10">HIZLI REZERVASYON</span><h3 class="text-3xl md:text-[36px] font-bold mb-4 tracking-tight relative z-10">Tarihinizi Hemen Belirleyin</h3><p class="text-white/80 font-medium mb-8 text-[15px] md:text-[17px] max-w-lg mx-auto relative z-10 leading-relaxed">Müsait tarihleri görüntüleyin, yatınızı seçin ve %50 ön ödemeyle rezervasyonunuzu kesinleştirin.</p><div class="flex flex-wrap justify-center items-center gap-4 mb-10 text-[13px] font-bold text-white/90 relative z-10"><span class="flex items-center gap-1.5"><strong class="text-white text-[16px]">4.8</strong> Google</span><span class="text-white/30 px-2">|</span><span class="flex items-center gap-2 text-[#f59e0b]"><div class="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></div> Haftasonları hızla doluyor </span></div><div class="flex flex-col sm:flex-row justify-center gap-4 items-center relative z-10">`);
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
      _push(`<a href="#" class="bg-[#22c55e] border border-[#16a34a] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#16a34a] transition-colors shadow-lg flex items-center justify-center gap-2 min-w-[220px]"><svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px] shrink-0" fill="currentColor" viewBox="0 0 448 512" style="${ssrRenderStyle({ "transform": "translateY(-1px)" })}"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg> WhatsApp </a></div></div></div><div class="max-w-[840px] mx-auto px-6 lg:px-8 pb-16 border-b border-[#e2e8f0]/60"><div class="prose prose-lg prose-slate max-w-none text-[#475569] leading-relaxed text-[15px] space-y-6">`);
      if (pageData.value.showMenu) {
        _push(`<h2 class="text-[24px] md:text-[26px] font-extrabold text-[#112135] mt-6 mb-4 tracking-tight">Detaylı Servis Seçenekleri</h2>`);
      } else {
        _push(`<!---->`);
      }
      if (pageData.value.showMenu) {
        _push(`<p><strong>${ssrInterpolate(pageData.value.title)}</strong> için talebinize göre İstanbul&#39;un en iyi işbirlikçilerinden özenle hazırlık yapılıyor. Detaylar rezervasyon sonrası sizinle planlanıyor. Tercihlerinize göre farklı seçenekler sunuyoruz:</p>`);
      } else {
        _push(`<!---->`);
      }
      if (pageData.value.showMenu) {
        _push(`<ul class="space-y-2 mt-4 mb-6 list-disc pl-5"><li>Türk mutfağı veya uluslararası seçenekler (Yemekli planlarda)</li><li>Deniz ürünleri veya et menüsü (Menü opsiyonlu paketlerde)</li><li>Özel diyet alternatifleri, Atıştırmalıklar</li></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h2 class="text-[24px] md:text-[26px] font-extrabold text-[#112135] mt-14 mb-6 tracking-tight">${ssrInterpolate(pageData.value.title)} Akışı</h2><p class="mb-4">İstanbul&#39;da yat kiralama deneyiminiz şu minvalde kusursuzca ilerler:</p><div class="space-y-6 pl-2 border-l-2 border-[#e2e8f0]"><div class="pl-4 relative"><div class="absolute w-3 h-3 bg-[#215d8f] rounded-full -left-[7px] top-1.5 border-[3px] border-[#f8f9fc]"></div><h3 class="text-[16px] font-bold text-[#112135] mb-1">1. Karşılama ve Yerleşme</h3><p>Kalkış noktasında sizi ekibimiz karşılar. Yatta yerinize geçerken güler yüzlü personelimiz organizasyonunuzu başlatır.</p></div><div class="pl-4 relative"><div class="absolute w-3 h-3 bg-[#215d8f] rounded-full -left-[7px] top-1.5 border-[3px] border-[#f8f9fc]"></div><h3 class="text-[16px] font-bold text-[#112135] mb-1">2. Kalkış ve Rotaya Giriş</h3><p>Yat hareket ederken Boğazın sularında yavaş yavaş yol alırsınız. İkramlarınızı alırken manzarayı izlemeye hazırlanın.</p></div><div class="pl-4 relative"><div class="absolute w-3 h-3 bg-[#215d8f] rounded-full -left-[7px] top-1.5 border-[3px] border-[#f8f9fc]"></div><h3 class="text-[16px] font-bold text-[#112135] mb-1">3. Eşsiz Manzara Turlama</h3><p>Dolmabahçe, Ortaköy, muazzam köprüler... Her bir köşe farklı bir tarihe, farklı bir estetiğe ev sahipliği yapar.</p></div><div class="pl-4 relative"><div class="absolute w-3 h-3 bg-[#215d8f] rounded-full -left-[7px] top-1.5 border-[3px] border-[#f8f9fc]"></div><h3 class="text-[16px] font-bold text-[#112135] mb-1">4. Tatlı Final ve Dönüş</h3><p>Dönüş yolunda içeceklerinizi yudumlarken Boğaz&#39;ın serin havasıyla dinlenir, huzurlu bir akşamın finalini yaparsınız.</p></div></div><h2 class="text-[24px] md:text-[26px] font-extrabold text-[#112135] mt-14 mb-4 tracking-tight">Tur Süresi Ne Olmalı?</h2><p>Minimum süre yasa gereği 2 saattir. Önerilen süre ise 3 saat ve üzeridir. 2 saat kısa bir Boğaz turu için yeterli olur ancak rahat bir sohbet ve daha kaliteli, telaşsız bir deneyim geçirmek için en az 3 saat öneriyoruz.</p><ul class="space-y-3 mt-4 mb-8"><li><strong class="text-[#112135]">2 saat (minimum):</strong> Kısa bir Boğaz turu, tempolu bir akış.</li><li><strong class="text-[#112135]">3 saat (önerilen):</strong> Standart tur, tüm ana noktaları kapsayan, rahat bir organizasyon.</li><li><strong class="text-[#112135]">4 saat (önerilen):</strong> Daha rahat tempo, uzun rota, bolca dinlenme zamanı.</li><li><strong class="text-[#112135]">5+ saat:</strong> Geniş Boğaz turu, Adalar kaçamağı veya özel uzun etkinlikler için.</li></ul><h2 class="text-[24px] md:text-[26px] font-extrabold text-[#112135] mt-14 mb-4 tracking-tight">En İyi Zaman Dilimi Nedir?</h2><p class="mb-6">Boğaz turunuz için en çok tercih edilen zaman dilimleri:</p><h3 class="text-[18px] font-bold text-[#112135] mb-2">Gün Batımı Başlangıçlı Turlar</h3><p class="mb-6">Gün batımından yaklaşık bir saat önce başlayın. Böylece gökyüzü yavaşça kızarırken hem gündüz hem gece manzarasına şahit olun.</p><h3 class="text-[18px] font-bold text-[#112135] mb-2">Gece Turları</h3><p class="mb-10">Karanlık bastıkça hareketlenir. İstanbul&#39;un ışıl ışıl altın kolyesi yalılar ve köprüler sulara yansıdığında bambaşka bir tecrübe edinilir.</p><h2 class="text-[24px] md:text-[26px] font-extrabold text-[#112135] mt-10 mb-4 tracking-tight">Ek Hizmetler ve Kişiselleştirme</h2><p><strong>${ssrInterpolate(pageData.value.title)}</strong> deneyiminizi özelleştirebilirsiniz:</p><ul class="space-y-3 mt-4 mb-10 pl-0"><li class="flex items-start gap-3"><span class="block mt-2 w-1.5 h-1.5 rounded-full bg-[#94a3b8] shrink-0"></span><span><strong class="text-[#112135]">Özel dekorasyon:</strong> Balon, çiçek, mum düzeni veya volkan gösterisi</span></li><li class="flex items-start gap-3"><span class="block mt-2 w-1.5 h-1.5 rounded-full bg-[#94a3b8] shrink-0"></span><span><strong class="text-[#112135]">Pasta:</strong> Özel gün pastası (kendiniz getirebilir veya bizden temin edilebilir)</span></li><li class="flex items-start gap-3"><span class="block mt-2 w-1.5 h-1.5 rounded-full bg-[#94a3b8] shrink-0"></span><span><strong class="text-[#112135]">Destekleyici Şov:</strong> Lazer kiralama, özel kemancı sürprizi</span></li><li class="flex items-start gap-3"><span class="block mt-2 w-1.5 h-1.5 rounded-full bg-[#94a3b8] shrink-0"></span><span><strong class="text-[#112135]">Müzik:</strong> Teknelerimizdeki üst düzey Bluetooth sistemler.</span></li></ul></div></div><div class="max-w-[840px] mx-auto px-6 lg:px-8 py-16"><div class="prose prose-lg prose-slate max-w-none text-[#475569] leading-relaxed text-[15px] space-y-8"><div><h2 class="text-[24px] md:text-[26px] font-extrabold text-[#112135] mb-4 tracking-tight mt-0">Filomuz Hakkında</h2><p>2-36 kişilik gruplar için farklı boyutlarda yatlarımız mevcuttur. <strong>${ssrInterpolate(pageData.value.title)}</strong> planlayanlar için tüm yatlarımızda:</p><ul class="mt-4 list-disc pl-5"><li>Dinlenme alanları, güverte ve oturma düzenleri</li><li>Klimalı rahat kapalı salon</li><li>Profesyonel servis ekibi &amp; deneyimli Kaptan</li><li>Temiz seyir, VIP hizmet</li></ul></div><div class="mt-12"><h2 class="text-[24px] md:text-[26px] font-extrabold text-[#112135] mb-4 tracking-tight">Online Rezervasyon</h2><p>Tüm aşamaları dilediğiniz gibi tasarlamak için online rezervasyon panelimizi hazırladık:</p><ul class="mt-4 list-disc pl-5"><li>Tarih ve saat seçin (müsaitlikleri anlık kontrol edin)</li><li>Grubunuza uygun lüks yatı seçin</li><li>Kişi sayısını bildirin ve isterseniz ekstralar sipariş edin</li><li>Detaylarınızı ileterek işlemi tamamlayın, size ulaşalım</li></ul></div><div class="mt-12"><h2 class="text-[24px] md:text-[26px] font-extrabold text-[#112135] mb-6 tracking-tight">Sıkça Sorulan Sorular</h2><div class="space-y-6"><div><h3 class="text-[16px] font-bold text-[#112135] mb-1">Dışarıdan yiyecek &amp; içecek getirebilir miyim?</h3><p>Evet, kendi yiyecek veya içeceğinizi rahatlıkla getirebilirsiniz. Alışverişinize karışmıyor, sadece servis imkanı sunuyoruz.</p></div><div><h3 class="text-[16px] font-bold text-[#112135] mb-1">Olumsuz hava şartlarında ne oluyor?</h3><p>Yatlarımız fırtına uyarısı haricindeki yağış koşullarında seyir yapabilmektedir, kapalı salon ısıtıcılıdır. Rota riskliyse ertelenir.</p></div><div><h3 class="text-[16px] font-bold text-[#112135] mb-1">Nereden kalkıyor?</h3><p>Standart kalkış noktalarımız (Kuruçeşme, Bebek vb.) mevcuttur ancak ek ücret karşılığında belirtilen başka rıhtımlardan alım yapılabilir.</p></div></div></div></div></div><section class="max-w-[1000px] mx-auto px-6 lg:px-8 py-16"><div class="text-center mb-10"><h2 class="text-[28px] md:text-[32px] font-extrabold text-[#112135] tracking-tight mb-3">Nasıl İşliyor?</h2><p class="text-[#64748b] text-[15px] max-w-lg mx-auto">3 adımda deneyiminizi planlayın ve rezervasyonunuzu oluşturun.</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-white rounded-3xl p-8 lg:p-10 border border-[#e2e8f0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-center flex flex-col items-center"><div class="w-16 h-16 rounded-2xl bg-[#f0f9ff] flex items-center justify-center text-[#215d8f] mb-6"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div><h3 class="text-[17px] font-bold text-[#112135] mb-2">Tarih &amp; Saat Seçin</h3><p class="text-[14px] text-[#64748b] leading-relaxed">Uygun saatleri görün, tur sürenizi belirleyin.</p></div><div class="bg-white rounded-3xl p-8 lg:p-10 border border-[#e2e8f0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-center flex flex-col items-center"><div class="w-16 h-16 rounded-2xl bg-[#f0f9ff] flex items-center justify-center text-[#215d8f] mb-6"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M2 14h20a1 1 0 011 1v6H1v-6a1 1 0 011-1z"></path></svg></div><h3 class="text-[17px] font-bold text-[#112135] mb-2">Yat Seçin</h3><p class="text-[14px] text-[#64748b] leading-relaxed">Kişi sayınıza ve beklentilerinize uygun yatı seçin.</p></div><div class="bg-white rounded-3xl p-8 lg:p-10 border border-[#e2e8f0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-center flex flex-col items-center"><div class="w-16 h-16 rounded-2xl bg-[#f0f9ff] flex items-center justify-center text-[#215d8f] mb-6"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><h3 class="text-[17px] font-bold text-[#112135] mb-2">Onaylayın</h3><p class="text-[14px] text-[#64748b] leading-relaxed">Ekstralar ekleyip, değerlendirip rezervasyonu oluşturun.</p></div></div><div class="mt-10 flex justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/rezervasyon",
        class: "bg-[#1e5687] text-white px-10 py-4 rounded-full font-bold text-[15px] hover:bg-[#1a4a72] transition-colors shadow-lg flex items-center justify-center min-w-[200px]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Rezervasyon Yap → `);
          } else {
            return [
              createTextVNode(" Rezervasyon Yap → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="max-w-[840px] mx-auto px-6 lg:px-8 py-12 text-center"><h2 class="text-[26px] font-bold text-[#112135] tracking-tight mb-10">Özellikler</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-left"><div class="bg-white py-4 px-6 rounded-full shadow-sm border border-[#e2e8f0]/60 flex items-center gap-3"><svg class="w-5 h-5 text-[#22c55e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg><span class="text-[14px] font-semibold text-[#112135]">${ssrInterpolate(pageData.value.showMenu ? "Restoranlardan özenle hazırlanan menüler" : "Özel VIP deneyimi")}</span></div><div class="bg-white py-4 px-6 rounded-full shadow-sm border border-[#e2e8f0]/60 flex items-center gap-3"><svg class="w-5 h-5 text-[#22c55e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg><span class="text-[14px] font-semibold text-[#112135]">${ssrInterpolate(pageData.value.showMenu ? "Premium içecek seçenekleri" : "Fotoğraf & Video destekli organizasyonlar")}</span></div><div class="bg-white py-4 px-6 rounded-full shadow-sm border border-[#e2e8f0]/60 flex items-center gap-3"><svg class="w-5 h-5 text-[#22c55e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg><span class="text-[14px] font-semibold text-[#112135]">Profesyonel kaptan ve servis ekibi</span></div><div class="bg-white py-4 px-6 rounded-full shadow-sm border border-[#e2e8f0]/60 flex items-center gap-3"><svg class="w-5 h-5 text-[#22c55e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg><span class="text-[14px] font-semibold text-[#112135]">Klimalı, konforlu kapalı salon ve geniş güverte</span></div><div class="bg-white py-4 px-6 rounded-full shadow-sm border border-[#e2e8f0]/60 flex items-center gap-3"><svg class="w-5 h-5 text-[#22c55e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg><span class="text-[14px] font-semibold text-[#112135]">Gün batımı veya gece özel turları</span></div></div></section>`);
      if (pageData.value.showMenu) {
        _push(`<section class="max-w-[840px] mx-auto px-6 lg:px-8 py-12 mb-10 text-center relative"><h2 class="text-[26px] font-bold text-[#112135] tracking-tight mb-2">Örnek Menü</h2><p class="text-[#64748b] text-[15px] mb-10">Menü içerikleri mevsime göre değişiklik gösterebilir. İsteğe bağlı olarak menü organizasyonu düzenlenir.</p><div class="bg-white rounded-3xl border border-[#e2e8f0] p-8 md:p-12 text-left shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden"><div class="absolute -right-10 -top-10 w-32 h-32 bg-[#f0f9ff] rounded-full blur-2xl"></div><h3 class="text-[18px] font-extrabold text-[#112135] mb-2 relative z-10">Yemekli Tur Menüsü</h3><ul class="space-y-4 mt-8 relative z-10"><li class="flex items-center gap-3"><div class="w-1.5 h-1.5 rounded-full bg-[#215d8f] shrink-0"></div><span class="text-[15px] font-bold text-[#112135]">Günün Soğuk Mezeleri (Minimum 4 çeşit) <span class="text-[#10b981] ml-1">🥬</span></span></li><li class="flex items-center gap-3"><div class="w-1.5 h-1.5 rounded-full bg-[#215d8f] shrink-0"></div><span class="text-[15px] font-bold text-[#112135]">Ara Sıcaklar <span class="text-[#10b981] ml-1">🥐</span></span></li><li class="flex items-center gap-3"><div class="w-1.5 h-1.5 rounded-full bg-[#215d8f] shrink-0"></div><span class="text-[15px] font-bold text-[#112135]">Ana Yemek: Izgara Çeşitleri (Günlük Balık / Et Seçimi)</span></li><li class="flex items-center gap-3"><div class="w-1.5 h-1.5 rounded-full bg-[#215d8f] shrink-0"></div><span class="text-[15px] font-bold text-[#112135]">Mevsim Yeşillikleri <span class="text-[#10b981] ml-1">🥗</span></span></li><li class="flex items-center gap-3"><div class="w-1.5 h-1.5 rounded-full bg-[#215d8f] shrink-0"></div><span class="text-[15px] font-bold text-[#112135]">Karışık Meyve Tabağı <span class="text-[#10b981] ml-1">🍉</span></span></li><li class="flex items-center gap-3"><div class="w-1.5 h-1.5 rounded-full bg-[#215d8f] shrink-0"></div><span class="text-[15px] font-bold text-[#112135]">Soft İçecek <span class="text-[#10b981] ml-1">🍹</span></span></li></ul></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="w-full bg-white py-20 pb-20 border-y border-[#e2e8f0]/60"><div class="max-w-[1100px] mx-auto px-6 lg:px-8 text-center"><span class="text-[#215d8f] text-[11px] font-bold uppercase tracking-[0.2em] block mb-3">${ssrInterpolate(pageData.value.reviewTag)}</span><h2 class="text-[32px] md:text-[36px] font-extrabold text-[#112135] tracking-tight mb-4">Misafirlerimiz Ne Diyor?</h2><p class="text-[#64748b] text-[15px] mb-14">Organizasyonlarımızda ağırladığımız özel anların gerçek yorumları.</p><div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"><div class="bg-white rounded-2xl border border-[#e2e8f0] p-7 shadow-sm hover:shadow-md transition-shadow relative"><div class="absolute top-6 right-6 w-6 h-6 bg-contain bg-no-repeat bg-center" style="${ssrRenderStyle({ "background-image": "url('https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg')" })}"></div><div class="flex items-center gap-3 mb-5"><div class="w-11 h-11 rounded-full bg-[#e11d48] text-white flex items-center justify-center font-bold text-[16px]">R</div><div><h4 class="text-[15px] font-bold text-[#112135]">Rezzan E.</h4><p class="text-[11px] text-[#94a3b8] font-medium mt-0.5">10 Mayıs 2026</p></div></div><div class="flex text-[#eab308] gap-1 mb-4"><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>`);
      });
      _push(`<!--]--><svg class="w-4 h-4 text-[#3b82f6] ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg></div><p class="text-[14px] text-[#112135] font-bold mb-2 tracking-tight">&quot;Her şey harikaydı!&quot;</p><p class="text-[14px] text-[#475569] leading-relaxed mt-4">Mürettebat ve tüm ekip çok neşeli ve ilgiliydiler. Organizasyon kusursuz ilerledi. Çok güzel ve mükemmel bir gezi oldu bizler için.</p></div><div class="bg-white rounded-2xl border border-[#e2e8f0] p-7 shadow-sm hover:shadow-md transition-shadow relative"><div class="absolute top-6 right-6 w-6 h-6 bg-contain bg-no-repeat bg-center" style="${ssrRenderStyle({ "background-image": "url('https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg')" })}"></div><div class="flex items-center gap-3 mb-5"><div class="w-11 h-11 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-[16px]">M</div><div><h4 class="text-[15px] font-bold text-[#112135]">Maria A.</h4><p class="text-[11px] text-[#94a3b8] font-medium mt-0.5">25 Nisan 2026</p></div></div><div class="flex text-[#eab308] gap-1 mb-4"><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>`);
      });
      _push(`<!--]--><svg class="w-4 h-4 text-[#3b82f6] ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg></div><p class="text-[14px] text-[#112135] font-bold mb-2 tracking-tight">&quot;Müthiş hizmet&quot;</p><p class="text-[14px] text-[#475569] leading-relaxed mt-4">Hizmet kalitesi muhteşemdi. Zaman uçup gitti, harika bir teknede muazzam ağırlandık.</p></div><div class="bg-white rounded-2xl border border-[#e2e8f0] p-7 shadow-sm hover:shadow-md transition-shadow relative"><div class="absolute top-6 right-6 w-6 h-6 bg-contain bg-no-repeat bg-center" style="${ssrRenderStyle({ "background-image": "url('https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg')" })}"></div><div class="flex items-center gap-3 mb-5"><div class="w-11 h-11 rounded-full bg-[#475569] text-white flex items-center justify-center font-bold text-[16px]">G</div><div><h4 class="text-[15px] font-bold text-[#112135]">Gökşen Işık</h4><p class="text-[11px] text-[#94a3b8] font-medium mt-0.5">14 Nisan 2026</p></div></div><div class="flex text-[#eab308] gap-1 mb-4"><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>`);
      });
      _push(`<!--]--><svg class="w-4 h-4 text-[#3b82f6] ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg></div><p class="text-[14px] text-[#475569] leading-relaxed mt-4">İletişim ve alaka tam beklediğimiz gibi süperdi. Rezervasyondan dönüşe kadar çok memnunduk.</p></div><div class="bg-white rounded-2xl border border-[#e2e8f0] p-7 shadow-sm hover:shadow-md transition-shadow relative"><div class="absolute top-6 right-6 w-6 h-6 bg-contain bg-no-repeat bg-center" style="${ssrRenderStyle({ "background-image": "url('https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg')" })}"></div><div class="flex items-center gap-3 mb-5"><div class="w-11 h-11 rounded-full bg-[#0ea5e9] text-white flex items-center justify-center font-bold text-[16px]">O</div><div><h4 class="text-[15px] font-bold text-[#112135]">Onur Gören</h4><p class="text-[11px] text-[#94a3b8] font-medium mt-0.5">2 Nisan 2026</p></div></div><div class="flex text-[#eab308] gap-1 mb-4"><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>`);
      });
      _push(`<!--]--><svg class="w-4 h-4 text-[#3b82f6] ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg></div><p class="text-[14px] text-[#475569] leading-relaxed mt-4">Yatta bize bu deneyimi yaşattıkları için ekibe çok teşekkür ederim.</p></div></div><div class="mt-10"><a href="#" class="bg-[#22c55e] text-white font-bold text-[14px] px-8 py-3 rounded-full inline-flex items-center gap-2 hover:bg-[#16a34a] transition-colors shadow-md"> Değerlendirmeleri Oku (25+) <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a></div></div></section><section class="max-w-[1200px] mx-auto px-6 lg:px-8 py-20 pb-12 text-center"><h2 class="text-[32px] md:text-[36px] font-extrabold text-[#112135] tracking-tight mb-3">Uygun Yatlar</h2><p class="text-[#64748b] text-[15px] mb-12">Bu deneyim için uygun yatları aşağıda bulabilirsiniz.</p><div class="bg-white rounded-3xl border border-[#e2e8f0]/80 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-8 max-w-[840px] mx-auto mb-16"><h3 class="text-[16px] font-bold text-[#112135] mb-6">Piyasa Neler Dahil?</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"><div class="flex items-start gap-2.5"><svg class="w-5 h-5 text-[#22c55e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg><span class="text-[13px] font-medium text-[#475569]">Size özel kapatılmış yat</span></div><div class="flex items-start gap-2.5"><svg class="w-5 h-5 text-[#22c55e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg><span class="text-[13px] font-medium text-[#475569]">Profesyonel Kaptan ve Mürettebat</span></div><div class="flex items-start gap-2.5"><svg class="w-5 h-5 text-[#22c55e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg><span class="text-[13px] font-medium text-[#475569]">Dışarıdan İçecek ve Yiyecek Getirme İmkanı</span></div><div class="flex items-start gap-2.5"><svg class="w-5 h-5 text-[#22c55e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg><span class="text-[13px] font-medium text-[#475569]">Gelişmiş Bluetooth Müzik Sistemi</span></div><div class="flex items-start gap-2.5"><svg class="w-5 h-5 text-[#22c55e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg><span class="text-[13px] font-medium text-[#475569]">Planlama Desteği</span></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-12"><div class="bg-white rounded-2xl border border-[#e2e8f0]/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group cursor-pointer"><div class="w-full h-[180px] overflow-hidden"><img${ssrRenderAttr("src", _imports_1$1)} alt="YatigoTR Royal" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"></div><div class="p-6 flex flex-col flex-1"><h3 class="text-[15px] font-extrabold text-[#112135] mb-1">YatigoTR Royal</h3><p class="text-[11px] text-[#94a3b8] font-semibold mb-4 uppercase tracking-wider">maks. 36 kişi • 24.0m</p><div class="mt-auto"><p class="text-[18px] font-bold text-[#1e5687]">31.800 TL <span class="text-[10px] text-[#94a3b8] font-medium block mt-0.5">başlayan fiyatlarla</span></p><p class="text-[10px] text-[#64748b] font-medium mt-1">kaparo: 50% TL</p></div></div></div><div class="bg-white rounded-2xl border border-[#e2e8f0]/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group cursor-pointer"><div class="w-full h-[180px] overflow-hidden"><img${ssrRenderAttr("src", _imports_1)} alt="YatigoTR Orion" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"></div><div class="p-6 flex flex-col flex-1"><h3 class="text-[15px] font-extrabold text-[#112135] mb-1">YatigoTR Orion</h3><p class="text-[11px] text-[#94a3b8] font-semibold mb-4 uppercase tracking-wider">maks. 24 kişi • 26.0m</p><div class="mt-auto"><p class="text-[18px] font-bold text-[#1e5687]">27.200 TL <span class="text-[10px] text-[#94a3b8] font-medium block mt-0.5">başlayan fiyatlarla</span></p><p class="text-[10px] text-[#64748b] font-medium mt-1">kaparo: 50% TL</p></div></div></div><div class="bg-white rounded-2xl border border-[#e2e8f0]/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group cursor-pointer"><div class="w-full h-[180px] overflow-hidden"><img${ssrRenderAttr("src", _imports_2)} alt="YatigoTR Prestige" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"></div><div class="p-6 flex flex-col flex-1"><h3 class="text-[15px] font-extrabold text-[#112135] mb-1">YatigoTR Prestige</h3><p class="text-[11px] text-[#94a3b8] font-semibold mb-4 uppercase tracking-wider">maks. 12 kişi • 22.5m</p><div class="mt-auto"><p class="text-[18px] font-bold text-[#1e5687]">23.800 TL <span class="text-[10px] text-[#94a3b8] font-medium block mt-0.5">başlayan fiyatlarla</span></p><p class="text-[10px] text-[#64748b] font-medium mt-1">kaparo: 50% TL</p></div></div></div><div class="bg-white rounded-2xl border border-[#e2e8f0]/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group cursor-pointer"><div class="w-full h-[180px] overflow-hidden"><img${ssrRenderAttr("src", _imports_3)} alt="YatigoTR" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"></div><div class="p-6 flex flex-col flex-1"><h3 class="text-[15px] font-extrabold text-[#112135] mb-1">YatigoTR</h3><p class="text-[11px] text-[#94a3b8] font-semibold mb-4 uppercase tracking-wider">maks. 12 kişi • 21.5m</p><div class="mt-auto"><p class="text-[18px] font-bold text-[#1e5687]">19.800 TL <span class="text-[10px] text-[#94a3b8] font-medium block mt-0.5">başlayan fiyatlarla</span></p><p class="text-[10px] text-[#64748b] font-medium mt-1">kaparo: 50% TL</p></div></div></div></div><div class="bg-[#fefce8] border border-[#fef08a] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between text-left gap-6 shadow-sm"><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-full bg-[#fef08a]/50 flex items-center justify-center shrink-0"><div class="w-4 h-4 rounded-full border-[3px] border-[#eab308]"></div></div><div><h4 class="text-[16px] font-bold text-[#112135] mb-1">Popüler tarihler hızla doluyor</h4><p class="text-[14px] text-[#64748b] leading-relaxed">En uygun tarih ve saati kaçırmamak için hemen rezervasyon yapın.</p></div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/rezervasyon",
        class: "bg-[#1e5687] text-white px-8 py-3.5 rounded-full font-bold text-[14px] whitespace-nowrap hover:bg-[#1a4a72] transition-colors shadow-md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Tarih Seçin →`);
          } else {
            return [
              createTextVNode("Tarih Seçin →")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 pb-24 text-center border-t border-[#e2e8f0]/60"><h2 class="text-[32px] md:text-[36px] font-extrabold text-[#112135] tracking-tight mb-10">Benzer Organizasyonlar</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">`);
      if (unref(slug) !== "istanbul-bogazi-ozel-yat-turu") {
        _push(`<div class="bg-white rounded-3xl border border-[#e2e8f0]/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"><div class="w-full h-[220px] overflow-hidden"><img${ssrRenderAttr("src", _imports_1$1)} alt="İstanbul Boğazı Özel Yat Turu" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"></div><div class="p-6 md:p-8 flex flex-col flex-1"><h3 class="text-[18px] font-extrabold text-[#112135] mb-3 leading-snug tracking-tight">İstanbul Boğazı Özel Yat Turu</h3><p class="text-[14px] text-[#64748b] leading-relaxed mb-6 flex-1 font-medium">İstanbul Boğazının büyüleyici güzelliğini özel yatımızla keşfedin.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/yat-turu-organizasyon/istanbul-bogazi-ozel-yat-turu",
          class: "text-[#215d8f] font-bold text-[14px] hover:text-[#1e5687] inline-flex items-center gap-1.5 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Detaylı Bilgi `);
            } else {
              return [
                createTextVNode(" Detaylı Bilgi ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(slug) !== "yatta-evlenme-teklifi") {
        _push(`<div class="bg-white rounded-3xl border border-[#e2e8f0]/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"><div class="w-full h-[220px] overflow-hidden"><img${ssrRenderAttr("src", _imports_2)} alt="Yatta Evlenme Teklifi" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"></div><div class="p-6 md:p-8 flex flex-col flex-1"><h3 class="text-[18px] font-extrabold text-[#112135] mb-3 leading-snug tracking-tight">Yatta Evlenme Teklifi</h3><p class="text-[14px] text-[#64748b] leading-relaxed mb-6 flex-1 font-medium">Hayatınızın imzasını en güzel manzara karşısında lüks yatta atın.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/yat-turu-organizasyon/yatta-evlenme-teklifi",
          class: "text-[#215d8f] font-bold text-[14px] hover:text-[#1e5687] inline-flex items-center gap-1.5 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Detaylı Bilgi `);
            } else {
              return [
                createTextVNode(" Detaylı Bilgi ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(slug) !== "istanbul-adalar-yat-turu") {
        _push(`<div class="bg-white rounded-3xl border border-[#e2e8f0]/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"><div class="w-full h-[220px] overflow-hidden"><img${ssrRenderAttr("src", _imports_3)} alt="Adalar Yat Turu" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"></div><div class="p-6 md:p-8 flex flex-col flex-1"><h3 class="text-[18px] font-extrabold text-[#112135] mb-3 leading-snug tracking-tight">Adalar Yat Turu</h3><p class="text-[14px] text-[#64748b] leading-relaxed mb-6 flex-1 font-medium">Boğaz&#39;dan Prens Adaları&#39;na özel lüks yatla eşsiz yüzme turları.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/yat-turu-organizasyon/istanbul-adalar-yat-turu",
          class: "text-[#215d8f] font-bold text-[14px] hover:text-[#1e5687] inline-flex items-center gap-1.5 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Detaylı Bilgi `);
            } else {
              return [
                createTextVNode(" Detaylı Bilgi ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/yat-turu-organizasyon/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-sHiXLkK-.mjs.map
