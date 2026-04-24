import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-C3ECA2vx.mjs';
import { c as useSeoMeta } from './server.mjs';
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
  __name: "iletisim",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "İletişim | YatigoTR Yatçılık", description: "YatigoTR Yatçılık iletişim bilgileri, adres ve konum." });
    const corpInfo = [
      { label: "Yasal Ünvan", value: "Suyat Turizm Gıda San Tic Ltd Şti" },
      { label: "Mersis No", value: "0-8390-5486-5000011" },
      { label: "Vergi No", value: "8390548659 / Beşiktaş V.D." },
      { label: "İTO Sicil", value: "367173" },
      { label: "KEP Adresi", value: "suyat.turizm@hs01.kep.tr" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans bg-white text-[#1C2B3A] min-h-screen overflow-x-hidden" }, _attrs))}><section class="relative min-h-[55vh] flex items-end overflow-hidden"><div class="absolute inset-0"><img${ssrRenderAttr("src", _imports_0)} alt="İletişim" class="w-full h-full object-cover"><div class="absolute inset-0 bg-gradient-to-r from-[#0C2340]/90 via-[#0C2340]/60 to-transparent"></div><div class="absolute inset-0 bg-gradient-to-t from-[#0C2340]/80 via-transparent to-transparent"></div></div><div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 pt-40 w-full"><div class="max-w-2xl"><div class="flex items-center gap-3 mb-6"><div class="w-6 h-px bg-[#C8A96E]"></div><span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.3em]">İletişim</span></div><h1 class="text-white text-[52px] md:text-[68px] font-bold leading-[1.0] tracking-[-0.03em] mb-6">Bize<br><span class="text-[#C8A96E]">Ulaşın</span></h1><p class="text-white/60 text-[17px] font-light leading-relaxed max-w-lg">Rezervasyon talepleri, organizasyon ve tüm sorularınız için ekibimiz size en kısa sürede dönüş yapacaktır.</p></div></div></section><div class="bg-[#0C2340]"><div class="max-w-[1400px] mx-auto px-6 lg:px-12"><div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-t border-white/10"><a href="tel:+905505603030" class="group flex flex-col items-center py-8 hover:bg-white/5 transition-colors"><div class="w-10 h-10 rounded-xl bg-[#C8A96E]/10 border border-[#C8A96E]/20 flex items-center justify-center text-[#C8A96E] mb-3"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div><span class="text-[10px] text-white/40 uppercase tracking-wider mb-1">Telefon</span><span class="text-[13px] text-white font-medium group-hover:text-[#C8A96E] transition-colors">+90 550 560 30 30</span></a><a href="mailto:info@yatigotr.com" class="group flex flex-col items-center py-8 hover:bg-white/5 transition-colors"><div class="w-10 h-10 rounded-xl bg-[#C8A96E]/10 border border-[#C8A96E]/20 flex items-center justify-center text-[#C8A96E] mb-3"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div><span class="text-[10px] text-white/40 uppercase tracking-wider mb-1">E-posta</span><span class="text-[13px] text-white font-medium group-hover:text-[#C8A96E] transition-colors">info@yatigotr.com</span></a><div class="flex flex-col items-center py-8"><div class="w-10 h-10 rounded-xl bg-[#C8A96E]/10 border border-[#C8A96E]/20 flex items-center justify-center text-[#C8A96E] mb-3"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div><span class="text-[10px] text-white/40 uppercase tracking-wider mb-1">Adres</span><span class="text-[13px] text-white text-center font-medium">Arnavutköy, Beşiktaş</span></div><div class="flex flex-col items-center py-8"><div class="w-10 h-10 rounded-xl bg-[#C8A96E]/10 border border-[#C8A96E]/20 flex items-center justify-center text-[#C8A96E] mb-3"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><span class="text-[10px] text-white/40 uppercase tracking-wider mb-1">Çalışma Saati</span><span class="text-[13px] text-white font-medium">09:00 – 22:00</span></div></div></div></div><section class="py-24 bg-white"><div class="max-w-[1400px] mx-auto px-6 lg:px-12"><div class="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10"><div class="bg-white rounded-2xl border border-[#E8E0D0] p-8 lg:p-10 shadow-sm"><h2 class="text-[28px] font-bold text-[#0C2340] mb-2">Mesaj Gönderin</h2><p class="text-[#6B7A8D] text-[14px] mb-8">En kısa sürede size dönüş yapacağız.</p><form class="space-y-5"><div class="grid grid-cols-1 md:grid-cols-2 gap-5"><div><label class="block text-[12px] font-semibold text-[#1C2B3A] uppercase tracking-wider mb-2">Ad Soyad <span class="text-red-400">*</span></label><input type="text" placeholder="Adınız Soyadınız" class="w-full bg-white border border-[#E8E0D0] rounded-xl px-4 py-3.5 text-[#1C2B3A] text-[14px] focus:outline-none focus:border-[#1A7B8A] transition-colors placeholder:text-[#6B7A8D]/50"></div><div><label class="block text-[12px] font-semibold text-[#1C2B3A] uppercase tracking-wider mb-2">E-posta <span class="text-red-400">*</span></label><input type="email" placeholder="email@ornek.com" class="w-full bg-white border border-[#E8E0D0] rounded-xl px-4 py-3.5 text-[#1C2B3A] text-[14px] focus:outline-none focus:border-[#1A7B8A] transition-colors placeholder:text-[#6B7A8D]/50"></div></div><div><label class="block text-[12px] font-semibold text-[#1C2B3A] uppercase tracking-wider mb-2">Telefon</label><input type="tel" placeholder="+90 5XX XXX XX XX" class="w-full bg-white border border-[#E8E0D0] rounded-xl px-4 py-3.5 text-[#1C2B3A] text-[14px] focus:outline-none focus:border-[#1A7B8A] transition-colors placeholder:text-[#6B7A8D]/50"></div><div><label class="block text-[12px] font-semibold text-[#1C2B3A] uppercase tracking-wider mb-2">Mesajınız <span class="text-red-400">*</span></label><textarea rows="5" placeholder="Nasıl yardımcı olabiliriz?" class="w-full bg-white border border-[#E8E0D0] rounded-xl px-4 py-3.5 text-[#1C2B3A] text-[14px] focus:outline-none focus:border-[#1A7B8A] transition-colors resize-none placeholder:text-[#6B7A8D]/50"></textarea></div><button type="submit" class="w-full bg-[#0C2340] text-white font-semibold text-[14px] px-8 py-4 rounded-xl hover:bg-[#1a3a5c] transition-colors flex items-center justify-center gap-2"> Gönder <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></button></form></div><div class="bg-[#0C2340] rounded-2xl p-8 lg:p-10 text-white flex flex-col"><h3 class="text-[22px] font-bold mb-8">Kurumsal Bilgiler</h3><div class="space-y-6 flex-1"><!--[-->`);
      ssrRenderList(corpInfo, (info) => {
        _push(`<div class="border-b border-white/10 pb-5"><p class="text-[9px] font-semibold text-[#C8A96E] uppercase tracking-[0.25em] mb-2">${ssrInterpolate(info.label)}</p><p class="text-[14px] text-white/80 font-medium">${ssrInterpolate(info.value)}</p></div>`);
      });
      _push(`<!--]--></div><div class="mt-8 pt-6 border-t border-white/10"><div class="flex items-center gap-2"><div class="w-5 h-5 rounded-full bg-[#1A7B8A] flex items-center justify-center"><svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div><span class="text-[12px] text-white/50">Resmi Kayıtlı Şirket</span></div></div></div></div></div></section><section class="pb-24 bg-white"><div class="max-w-[1400px] mx-auto px-6 lg:px-12"><h2 class="text-[32px] font-bold text-[#0C2340] mb-8 text-center">Konumumuz</h2><div class="bg-white rounded-2xl border border-[#E8E0D0] p-3 shadow-sm overflow-hidden"><div class="w-full h-[420px] rounded-xl overflow-hidden relative"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1504.095034639366!2d29.04153027653655!3d41.066506215915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab61fa5b66aa1%3A0x63cd9eb55db56bb9!2sArnavutk%C3%B6y%2C%20E%C4%9Flence%20Sk.%20No%3A14%2C%2034345%20Be%C5%9Fikta%C5%9F%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1714578103328!5m2!1str!2str" class="absolute inset-0 w-full h-full border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="YatigoTR Yatçılık Konum"></iframe></div><div class="flex flex-col md:flex-row items-center justify-between gap-4 p-4"><p class="text-[#6B7A8D] text-[14px] font-medium">Arnavutköy Mh. Eğlence Sok. No:14/1 Beşiktaş İstanbul</p><a href="https://maps.google.com/?q=Arnavutköy+Eğlence+Sokak+No:14+Besiktas+Istanbul" target="_blank" class="bg-[#0C2340] text-white text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#1a3a5c] transition-colors whitespace-nowrap">Google Maps&#39;te Gör →</a></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/iletisim.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=iletisim-v_luMMrf.mjs.map
