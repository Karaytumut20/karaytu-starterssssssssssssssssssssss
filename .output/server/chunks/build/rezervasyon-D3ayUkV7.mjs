import { defineComponent, ref, watch, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderTeleport } from 'vue/server-renderer';
import { f as useSupabaseUser, u as useRoute, b as useSeoMeta, s as siteConfig } from './server.mjs';
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
  __name: "rezervasyon",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseUser();
    const supabase = useSupabaseClient();
    const route = useRoute();
    const selectedYacht = ref(route.query.yacht_id ? String(route.query.yacht_id) : null);
    const guestCount = ref(2);
    const duration = ref(route.query.duration ? Number(route.query.duration) : 2);
    const tourType = ref("Boğaz Turu");
    const pickup = ref("Arnavutköy");
    const dropoff = ref("Arnavutköy");
    const parseDay = (dateStr) => {
      if (!dateStr || typeof dateStr !== "string") return 20;
      const p = dateStr.split("-");
      return p.length === 3 ? parseInt(p[2]) : 20;
    };
    const selectedDate = ref(parseDay(route.query.date));
    const selectedTime = ref(route.query.time ? String(route.query.time) : "10:00");
    const selectedExtras = ref([]);
    const acceptedTerms = ref(false);
    const showTermsModal = ref(false);
    const busySlots = ref([]);
    const fetchAvailability = async () => {
      if (!selectedYacht.value || !selectedDate.value) {
        busySlots.value = [];
        return;
      }
      const isUUID = typeof selectedYacht.value === "string" && selectedYacht.value.length > 10;
      if (!isUUID) return;
      const dateStr = `2026-04-${String(selectedDate.value).padStart(2, "0")}`;
      const { data } = await supabase.from("reservations").select("start_time, duration_hours").eq("yacht_id", selectedYacht.value).eq("booking_date", dateStr).in("status", ["confirmed", "pending"]);
      if (data) {
        let busy = [];
        data.forEach((r) => {
          const sh = parseInt(r.start_time.split(":")[0]);
          const sm = parseInt(r.start_time.split(":")[1]);
          const startMinutes = sh * 60 + sm;
          const endMinutes = startMinutes + r.duration_hours * 60;
          for (let t = startMinutes; t < endMinutes; t += 30) {
            const hh = String(Math.floor(t / 60) % 24).padStart(2, "0");
            const mm = String(t % 60).padStart(2, "0");
            busy.push(`${hh}:${mm}`);
          }
        });
        busySlots.value = busy;
      } else {
        busySlots.value = [];
      }
    };
    watch([selectedYacht, selectedDate, duration], () => {
      fetchAvailability();
      selectedTime.value = "";
    });
    const dynamicTimeSlots = computed(() => {
      const slots = [];
      for (let h = 0; h < 24; h++) {
        for (let m of ["00", "30"]) {
          const time = `${String(h).padStart(2, "0")}:${m}`;
          const isBusy = busySlots.value.includes(time);
          let canBook = !isBusy;
          if (canBook) {
            const startMins = h * 60 + parseInt(m);
            let neededDuration = duration.value * 60;
            for (let step = 30; step < neededDuration; step += 30) {
              const tMins = startMins + step;
              const thh = String(Math.floor(tMins / 60) % 24).padStart(2, "0");
              const tmm = String(tMins % 60).padStart(2, "0");
              if (busySlots.value.includes(`${thh}:${tmm}`)) {
                canBook = false;
                break;
              }
            }
          }
          slots.push({
            time,
            status: canBook ? "müsait" : "rezerve"
          });
        }
      }
      return slots;
    });
    const extraServices = [
      { name: "Lazer Gösterisi", desc: "Boğaz köprüsünün altında isminizi lazerle yansıtın.", icon: "🌟", price: "2.500 TL", val: 2500, type: "fixed" },
      { name: "Volkan Gösterisi", desc: "Görkemli ve unutulmaz anlar için volkan şelalesi.", icon: "🎇", price: "950 TL", val: 950, type: "fixed" },
      { name: "25 Adet Gül", desc: "Özel anların vazgeçilmezi birinci sınıf güller.", icon: "🌹", price: "3.950 TL", val: 3950, type: "fixed" },
      { name: "Fasıl Ekibi", desc: "Canlı Türk sanat müziği ile nostaljik boğaz gecesi.", icon: "🎻", price: "15.000 TL", val: 15e3, type: "fixed" },
      { name: "Dansöz", desc: "Geleneksel oryantal şov ile eğlencenin dorukları.", icon: "💃", price: "8.500 TL", val: 8500, type: "fixed" },
      { name: "Kemancı", desc: "Romantik akşam yemeğiniz için canlı keman dinletisi.", icon: "🎻", price: "8.500 TL", val: 8500, type: "fixed" },
      { name: "Uçan Balon", desc: "Güverteyi süsleyen uçan helyum balonlar.", icon: "🎈", price: "3.950 TL", val: 3950, type: "fixed" },
      { name: "VIP Vito Transfer", desc: "Otelinizden yata lüks Vito ile gidiş-dönüş transfer.", icon: "🚐", price: "6.500 TL", val: 6500, type: "fixed" },
      { name: "Meze Tabağı", desc: "Geleneksel Türk mezelerinden oluşan özel tabak.", icon: "🍱", price: "1.080 TL", val: 1080, type: "person" },
      { name: "Özel İçki/Yiyecek Servisi", desc: "Dışarıdan getirdiğiniz ürünlerin profesyonel servisi.", icon: "🍷", price: "500 TL", val: 500, type: "person" },
      { name: "Meyve & Çerez Menüsü", desc: "Taze mevsim meyveleri ve karışık lüks çerez.", icon: "🍇", price: "1.180 TL", val: 1180, type: "person" },
      { name: "Profesyonel Fotoğrafçı", desc: "Tüm organizasyon boyunca profesyonel çekim.", icon: "📸", price: "12.500 TL", val: 12500, type: "fixed" },
      { name: "Kahvaltı Menüsü", desc: "Serpme organik Boğaz kahvaltısı.", icon: "🍳", price: "1.395 TL", val: 1395, type: "person" },
      { name: "Akşam Yemeği Menüsü", desc: "Balık veya et seçenekli lüks akşam yemeği.", icon: "🍽️", price: "2.150 TL", val: 2150, type: "person" },
      { name: "Özel Kutlama Pastası", desc: "Kişiye özel tasarım kutlama pastası.", icon: "🎂", price: "2.250 TL", val: 2250, type: "fixed" }
    ];
    const realYachts = ref([]);
    const loadingYachts = ref(true);
    const yachtTotal = computed(() => {
      if (!selectedYacht.value) return 0;
      const yacht = realYachts.value.find((y) => y.id === selectedYacht.value);
      if (yacht && yacht.price_hourly) {
        return Number(yacht.price_hourly) * duration.value;
      }
      return 0;
    });
    const extrasTotal = computed(() => {
      return selectedExtras.value.reduce((total, idx) => {
        const srv = extraServices[idx];
        if (srv.type === "person") {
          return total + srv.val * guestCount.value;
        }
        return total + srv.val;
      }, 0);
    });
    const grandTotal = computed(() => yachtTotal.value + extrasTotal.value);
    const depositAmount = computed(() => grandTotal.value / 2);
    const formatNumber = (num) => {
      return num.toLocaleString("tr-TR");
    };
    const formName = ref("");
    const formEmail = ref("");
    const formPhone = ref("");
    const formNotes = ref("");
    const submitLoading = ref(false);
    useSeoMeta({
      title: `Rezervasyon Yap | ${siteConfig.name}`,
      description: "YatigoTR Yatçılık rezervasyon sistemi. Tarih, saat ve kişi sayısını seçerek özel yat kiralama talebinizi oluşturun ve onaylayın."
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans text-[#112135] bg-[#f8f9fc] min-h-screen" }, _attrs))}><section class="w-full bg-[#0b1526] pt-[130px] pb-[120px] relative text-center"><div class="max-w-4xl mx-auto px-6"><h1 class="text-white text-3xl md:text-[42px] font-bold tracking-tight mb-4">İstanbul&#39;da Özel Yat Turu</h1><p class="text-white/80 text-[15px] font-medium mb-12">Yatınızı seçin, tarih belirleyin, anında rezervasyonunuzu yapın.</p><div class="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-12"><div class="flex items-center gap-2"><svg class="w-[18px] h-[18px] text-[#eab308]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg><span class="text-white text-[13px] font-semibold">Güvenli Ödeme</span></div><div class="flex items-center gap-2"><svg class="w-[18px] h-[18px] text-[#eab308]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><span class="text-white text-[13px] font-semibold">Profesyonel Mürettebat</span></div><div class="flex items-center gap-2"><svg class="w-[18px] h-[18px] text-[#eab308]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span class="text-white text-[13px] font-semibold">Anında Onay</span></div></div><div class="flex items-center justify-center"><div class="flex flex-col items-center px-6 md:px-12 border-r border-[#ffffff20]"><span class="text-[#eab308] text-[28px] md:text-[32px] font-black leading-none mb-2 mt-1">16+</span><span class="text-white/70 text-[10px] font-bold uppercase tracking-[0.1em]">Yıllık Deneyim</span></div><div class="flex flex-col items-center px-6 md:px-12 border-r border-[#ffffff20]"><span class="text-[#eab308] text-[28px] md:text-[32px] font-black leading-none mb-2 mt-1">4.8</span><span class="text-white/70 text-[10px] font-bold uppercase tracking-[0.1em]">Google Puan</span></div><div class="flex flex-col items-center px-6 md:px-12"><span class="text-[#eab308] text-[28px] md:text-[32px] font-black leading-none mb-2 mt-1">65K+</span><span class="text-white/70 text-[10px] font-bold uppercase tracking-[0.1em]">Mutlu Misafir</span></div></div></div></section><div class="w-full bg-[#f8fafc] pb-24 relative z-10"><div class="max-w-[1000px] mx-auto sm:px-6 -mt-[44px] space-y-6"><div class="bg-white rounded-2xl border border-[#eef2f6] shadow-[0_4px_24px_rgb(0,0,0,0.02)] overflow-hidden p-6 md:p-8"><div class="flex items-start gap-4 mb-8"><div class="w-12 h-12 shrink-0 rounded-full bg-[#f0f9ff] flex items-center justify-center text-[#0ea5e9]"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M2 14h20a1 1 0 011 1v6H1v-6a1 1 0 011-1z"></path></svg></div><div class="pt-1"><h2 class="text-lg font-bold text-[#112135]">Yat Seçin <span class="text-red-500">*</span></h2><p class="text-[13px] text-[#64748b] font-medium mt-0.5">Deneyiminiz için mükemmel yatı seçin</p></div></div>`);
      if (loadingYachts.value) {
        _push(`<div class="py-12 flex justify-center w-full"><svg class="animate-spin h-8 w-8 text-[#1e5687]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
        ssrRenderList(realYachts.value, (yacht) => {
          _push(`<div class="${ssrRenderClass([
            "rounded-2xl overflow-hidden flex flex-col group cursor-pointer transition-all relative",
            selectedYacht.value === yacht.id ? "border-2 border-[#1e5687] shadow-lg ring-4 ring-[#1e5687]/10" : "border border-[#eef2f6] hover:border-[#cbd5e1] hover:shadow-md"
          ])}"><div class="w-full h-[210px] relative overflow-hidden bg-gray-100"><img${ssrRenderAttr("src", yacht.main_image || "/images/img1.jpg")}${ssrRenderAttr("alt", yacht.name)} class="w-full h-full object-cover">`);
          if (yacht.length_meters) {
            _push(`<div class="absolute top-3 left-3 bg-[#1e293b]/70 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full">${ssrInterpolate(yacht.length_meters)}m </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-[#112135] text-[12px] font-bold py-2 rounded-[8px] shadow-sm"> Detayları Görüntüle </div></div><div class="p-6 flex flex-col"><h3 class="text-[17px] font-bold text-[#112135] mb-2 line-clamp-1">${ssrInterpolate(yacht.name)}</h3><div class="flex items-center gap-4 text-[12px] text-[#64748b] mb-4"><span>Maks Kişi: <strong class="text-[#112135]">${ssrInterpolate(yacht.capacity)}</strong></span>`);
          if (yacht.cabins) {
            _push(`<span>Kabin: <strong class="text-[#112135]">${ssrInterpolate(yacht.cabins)}</strong></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="mb-4"><p class="text-[22px] font-bold text-[#1e5687] tracking-tight">${ssrInterpolate(formatNumber(yacht.price_hourly))} TL <span class="text-[12px] text-[#94a3b8] font-medium tracking-normal mt-1">/ saat başı</span></p></div><div class="w-full h-[1px] bg-[#f1f5f9] mb-4"></div><div class="flex flex-wrap items-center gap-x-4 gap-y-2"><div class="flex items-center gap-1.5 text-[11px] font-medium text-[#64748b]"><svg class="w-3.5 h-3.5 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Kaptan ve mürettebat dahil </div><div class="flex items-center gap-1.5 text-[11px] font-medium text-[#64748b]"><svg class="w-3.5 h-3.5 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Yakıt dahil </div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="bg-white rounded-2xl border border-[#eef2f6] shadow-[0_4px_24px_rgb(0,0,0,0.02)] overflow-hidden p-6 md:p-8"><div class="flex items-start gap-4 mb-8"><div class="w-12 h-12 shrink-0 rounded-full bg-[#f0f9ff] flex items-center justify-center text-[#215d8f]"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></div><div class="pt-1"><h2 class="text-lg font-bold text-[#112135]">Tur Detayları</h2><p class="text-[13px] text-[#64748b] font-medium mt-0.5">Paket, misafir sayısı, süre ve lokasyonu belirleyin</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"><div class="col-span-1 md:col-span-2"><label class="block text-[11px] font-bold text-[#1e5687] uppercase tracking-widest mb-2.5">TUR TİPİ <span class="text-red-500">*</span></label><div class="relative"><select class="w-full appearance-none bg-white border border-[#cbd5e1] text-[#112135] font-medium text-[14px] rounded-[10px] py-3.5 outline-none focus:border-[#1e5687]"><option value="Boğaz Turu"${ssrIncludeBooleanAttr(Array.isArray(tourType.value) ? ssrLooseContain(tourType.value, "Boğaz Turu") : ssrLooseEqual(tourType.value, "Boğaz Turu")) ? " selected" : ""}>Boğaz Turu</option><option value="Adalar Turu"${ssrIncludeBooleanAttr(Array.isArray(tourType.value) ? ssrLooseContain(tourType.value, "Adalar Turu") : ssrLooseEqual(tourType.value, "Adalar Turu")) ? " selected" : ""}>Adalar Turu</option><option value="Yüzme Turu"${ssrIncludeBooleanAttr(Array.isArray(tourType.value) ? ssrLooseContain(tourType.value, "Yüzme Turu") : ssrLooseEqual(tourType.value, "Yüzme Turu")) ? " selected" : ""}>Yüzme Turu</option><option value="Evlilik Teklifi"${ssrIncludeBooleanAttr(Array.isArray(tourType.value) ? ssrLooseContain(tourType.value, "Evlilik Teklifi") : ssrLooseEqual(tourType.value, "Evlilik Teklifi")) ? " selected" : ""}>Evlilik Teklifi</option></select><div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#94a3b8]"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div></div></div><div><label class="block text-[11px] font-bold text-[#1e5687] uppercase tracking-widest mb-2.5">MİSAFİR SAYISI <span class="text-red-500">*</span></label><div class="flex items-center justify-between bg-[#f8fafc] border border-[#cbd5e1] rounded-[10px] p-1 h-[52px]"><button type="button" class="w-10 h-10 flex items-center justify-center text-[#94a3b8] hover:text-[#112135] transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg></button><span class="text-[15px] font-bold text-[#112135]">${ssrInterpolate(guestCount.value)}</span><button type="button" class="w-10 h-10 flex items-center justify-center text-[#94a3b8] hover:text-[#112135] transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></button></div></div><div><label class="block text-[11px] font-bold text-[#1e5687] uppercase tracking-widest mb-2.5">TUR SÜRESİ</label><div class="flex items-center justify-between bg-[#f8fafc] border border-[#cbd5e1] rounded-[10px] p-1 h-[52px]"><button type="button" class="w-10 h-10 flex items-center justify-center text-[#94a3b8] hover:text-[#112135] transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg></button><span class="text-[15px] font-bold text-[#112135]">${ssrInterpolate(duration.value)}</span><button type="button" class="w-10 h-10 flex items-center justify-center text-[#94a3b8] hover:text-[#112135] transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></button></div></div><div><label class="block text-[11px] font-bold text-[#1e5687] uppercase tracking-widest mb-2.5">ALIŞ NOKTASI <span class="text-red-500">*</span></label><div class="relative"><select class="w-full appearance-none bg-white border border-[#cbd5e1] text-[#112135] font-bold text-[14px] rounded-[10px] py-3.5 outline-none focus:border-[#1e5687]"><option value="Arnavutköy"${ssrIncludeBooleanAttr(Array.isArray(pickup.value) ? ssrLooseContain(pickup.value, "Arnavutköy") : ssrLooseEqual(pickup.value, "Arnavutköy")) ? " selected" : ""}>Arnavutköy</option><option value="Bebek"${ssrIncludeBooleanAttr(Array.isArray(pickup.value) ? ssrLooseContain(pickup.value, "Bebek") : ssrLooseEqual(pickup.value, "Bebek")) ? " selected" : ""}>Bebek</option><option value="Kuruçeşme"${ssrIncludeBooleanAttr(Array.isArray(pickup.value) ? ssrLooseContain(pickup.value, "Kuruçeşme") : ssrLooseEqual(pickup.value, "Kuruçeşme")) ? " selected" : ""}>Kuruçeşme</option><option value="Eminönü"${ssrIncludeBooleanAttr(Array.isArray(pickup.value) ? ssrLooseContain(pickup.value, "Eminönü") : ssrLooseEqual(pickup.value, "Eminönü")) ? " selected" : ""}>Eminönü</option><option value="Kadıköy"${ssrIncludeBooleanAttr(Array.isArray(pickup.value) ? ssrLooseContain(pickup.value, "Kadıköy") : ssrLooseEqual(pickup.value, "Kadıköy")) ? " selected" : ""}>Kadıköy</option></select><div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#94a3b8]"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div></div></div><div><label class="block text-[11px] font-bold text-[#1e5687] uppercase tracking-widest mb-2.5">BIRAKIŞ NOKTASI <span class="text-red-500">*</span></label><div class="relative"><select class="w-full appearance-none bg-white border border-[#cbd5e1] text-[#112135] font-bold text-[14px] rounded-[10px] py-3.5 outline-none focus:border-[#1e5687]"><option value="Arnavutköy"${ssrIncludeBooleanAttr(Array.isArray(dropoff.value) ? ssrLooseContain(dropoff.value, "Arnavutköy") : ssrLooseEqual(dropoff.value, "Arnavutköy")) ? " selected" : ""}>Arnavutköy</option><option value="Bebek"${ssrIncludeBooleanAttr(Array.isArray(dropoff.value) ? ssrLooseContain(dropoff.value, "Bebek") : ssrLooseEqual(dropoff.value, "Bebek")) ? " selected" : ""}>Bebek</option><option value="Kuruçeşme"${ssrIncludeBooleanAttr(Array.isArray(dropoff.value) ? ssrLooseContain(dropoff.value, "Kuruçeşme") : ssrLooseEqual(dropoff.value, "Kuruçeşme")) ? " selected" : ""}>Kuruçeşme</option><option value="Eminönü"${ssrIncludeBooleanAttr(Array.isArray(dropoff.value) ? ssrLooseContain(dropoff.value, "Eminönü") : ssrLooseEqual(dropoff.value, "Eminönü")) ? " selected" : ""}>Eminönü</option><option value="Kadıköy"${ssrIncludeBooleanAttr(Array.isArray(dropoff.value) ? ssrLooseContain(dropoff.value, "Kadıköy") : ssrLooseEqual(dropoff.value, "Kadıköy")) ? " selected" : ""}>Kadıköy</option></select><div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#94a3b8]"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div></div></div></div></div><div class="bg-white rounded-2xl border border-[#eef2f6] shadow-[0_4px_24px_rgb(0,0,0,0.02)] overflow-hidden p-6 md:p-8"><div class="flex items-start gap-4 mb-8"><div class="w-12 h-12 shrink-0 rounded-full bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed]"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div><div class="pt-1"><h2 class="text-lg font-bold text-[#112135]">Tarih ve Saat</h2><p class="text-[13px] text-[#64748b] font-medium mt-0.5">Turunuz için tarih ve saat seçin</p></div></div><div class="border border-[#e2e8f0] rounded-[16px] p-6 pb-8 mb-4"><div class="flex items-center justify-between mb-8 px-2"><button class="text-[#94a3b8] hover:text-[#475569] transition-colors"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><h3 class="text-[16px] font-extrabold text-[#112135]">Nisan 2026</h3><button class="text-[#94a3b8] hover:text-[#475569] transition-colors"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div><div class="grid grid-cols-7 text-center mb-6"><div class="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wide">PZT</div><div class="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wide">SAL</div><div class="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wide">ÇAR</div><div class="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wide">PER</div><div class="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wide">CUM</div><div class="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wide">CMT</div><div class="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wide">PAZ</div></div><div class="grid grid-cols-7 text-center gap-y-7"><div class="h-10 flex items-center justify-center text-[14px] font-medium text-[#cbd5e1]">30</div><div class="h-10 flex items-center justify-center text-[14px] font-medium text-[#cbd5e1]">31</div><!--[-->`);
      ssrRenderList(30, (day) => {
        _push(`<div class="h-10 flex items-center justify-center cursor-pointer group">`);
        if (selectedDate.value === day) {
          _push(`<div class="w-full max-w-[56px] h-9 bg-[#1e5687] text-white rounded-[10px] flex items-center justify-center text-[14px] font-bold shadow-md">${ssrInterpolate(day)}</div>`);
        } else {
          _push(`<div class="text-[14px] font-medium text-[#64748b] group-hover:text-[#112135] transition-colors">${ssrInterpolate(day)}</div>`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--><div class="h-10 flex items-center justify-center text-[14px] font-medium text-[#cbd5e1]">1</div><div class="h-10 flex items-center justify-center text-[14px] font-medium text-[#cbd5e1]">2</div><div class="h-10 flex items-center justify-center text-[14px] font-medium text-[#cbd5e1]">3</div></div></div>`);
      if (selectedDate.value) {
        _push(`<div class="border border-[#e2e8f0] rounded-[16px] p-6 mb-4"><div class="flex items-center gap-2 mb-4"><svg class="w-5 h-5 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><h3 class="text-[15px] font-bold text-[#112135]">Tur başlangıç saati seçin <span class="text-[#94a3b8] font-normal ml-1">${ssrInterpolate(selectedDate.value)} Nisan 2026, Pazartesi</span></h3></div><div class="bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] text-[13px] font-medium rounded-[8px] py-3 flex items-center gap-2 mb-6"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>${ssrInterpolate(tourType.value)} (${ssrInterpolate(duration.value)} saat)</strong> Bu paket sadece 09:00 - 18:00 saatleri arasında seçilebilir.</span></div><div class="grid grid-cols-4 md:grid-cols-6 gap-3"><!--[-->`);
        ssrRenderList(dynamicTimeSlots.value, (t) => {
          _push(`<button type="button" class="${ssrRenderClass([
            "py-3 rounded-[12px] text-[15px] font-bold border transition-colors flex items-center justify-center cursor-pointer",
            t.status === "müsait" && selectedTime.value !== t.time ? "border-[#cbd5e1] text-[#0f172a] hover:border-[#1e5687]" : "",
            t.status === "müsait" && selectedTime.value === t.time ? "border-[#1e5687] bg-[#f0f9ff] text-[#1e5687]" : "",
            t.status !== "müsait" ? "border-[#f1f5f9] text-[#cbd5e1] bg-[#f8fafc] cursor-not-allowed" : ""
          ])}">${ssrInterpolate(t.time)}</button>`);
        });
        _push(`<!--]--></div><div class="border-t border-[#f1f5f9] mt-6 pt-4 flex gap-6"><div class="flex items-center gap-2"><div class="w-4 h-4 rounded-[4px] border-[1.5px] border-[#38bdf8] bg-white"></div><span class="text-[12px] font-bold text-[#64748b]">Müsait</span></div><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-[#ef4444]"></div><span class="text-[12px] font-bold text-[#64748b]">Rezerve</span></div><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-[#cbd5e1]"></div><span class="text-[12px] font-bold text-[#64748b]">Hazırlık</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!selectedYacht.value) {
        _push(`<div class="border border-dashed border-[#cbd5e1] rounded-[10px] py-4 text-center bg-[#f8fafc]"><p class="text-[13px] text-[#94a3b8] font-medium">Müsait saatleri görmek için öncelikle bir yat seçin</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-white rounded-2xl border border-[#eef2f6] shadow-[0_4px_24px_rgb(0,0,0,0.02)] overflow-hidden p-6 md:p-8"><div class="flex items-start gap-4 mb-8"><div class="w-12 h-12 shrink-0 rounded-full bg-[#fef3c7] flex items-center justify-center text-[#d97706] shadow-inner"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg></div><div class="pt-1"><h2 class="text-lg font-bold text-[#112135]">Ekstra Hizmetler <span class="bg-[#d97706] text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ml-2">Premium</span></h2><p class="text-[13px] text-[#64748b] font-medium mt-1">Turunuzu VIP bir deneyime dönüştürün. Seçtiğiniz ekstralar toplam tutara anında yansır.</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(extraServices, (item, idx) => {
        _push(`<div class="${ssrRenderClass([
          "relative overflow-hidden flex flex-col p-5 rounded-[16px] cursor-pointer transition-all duration-300",
          selectedExtras.value.includes(idx) ? "border-2 border-[#1e5687] bg-[#f0f9ff] shadow-md ring-4 ring-[#1e5687]/5" : "border border-[#e2e8f0] bg-white hover:border-[#cbd5e1] hover:shadow-sm"
        ])}"><div class="${ssrRenderClass([
          "absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors z-10",
          selectedExtras.value.includes(idx) ? "bg-[#1e5687] border-[#1e5687]" : "bg-white border-[#cbd5e1]"
        ])}">`);
        if (selectedExtras.value.includes(idx)) {
          _push(`<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center mb-4 text-[24px]">${ssrInterpolate(item.icon)}</div><div class="flex-1"><h4 class="text-[15px] font-bold text-[#112135] mb-1 leading-tight">${ssrInterpolate(item.name)}</h4><p class="text-[11px] text-[#64748b] leading-snug mb-3">${ssrInterpolate(item.desc)}</p></div><div class="mt-auto pt-3 border-t border-dashed border-gray-200"><p class="text-[14px] font-black text-[#1e5687]">+ ${ssrInterpolate(item.price)} `);
        if (item.type === "person") {
          _push(`<span class="text-[10px] text-gray-500 font-medium">/ kişi başı</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white rounded-2xl border border-[#eef2f6] shadow-[0_4px_24px_rgb(0,0,0,0.02)] overflow-hidden p-6 md:p-8"><div class="flex items-start gap-4 mb-8"><div class="w-12 h-12 shrink-0 rounded-full bg-[#f0f9ff] flex items-center justify-center text-[#2563eb]"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div><div class="pt-1"><h2 class="text-lg font-bold text-[#112135]">Rezervasyon Bilgileri</h2><p class="text-[13px] text-[#64748b] font-medium mt-0.5">Rezervasyon için iletişim bilgilerinizi girin</p></div></div><div class="border border-[#e2e8f0] rounded-[16px] p-6 space-y-6"><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div><label class="block text-[13px] font-bold text-[#112135] mb-2">Ad Soyad <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", formName.value)} type="text" placeholder="Adınız ve soyadınız" class="w-full h-[52px] bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] text-[14px] text-[#112135] placeholder-[#94a3b8] outline-none focus:border-[#215d8f] focus:bg-white transition-colors"></div><div><label class="block text-[13px] font-bold text-[#112135] mb-2">Telefon <span class="text-red-500">*</span> <span class="text-[#94a3b8] font-normal">(en az birini girin)</span></label><div class="flex bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] h-[52px] focus-within:border-[#215d8f] focus-within:bg-white overflow-hidden transition-colors"><div class="flex items-center gap-1.5 px-3 border-r border-[#e2e8f0] bg-transparent shrink-0 cursor-pointer"><span class="text-[16px]">🇹🇷</span><svg class="w-3.5 h-3.5 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="flex items-center px-3 font-medium text-[#112135] text-[14px] shrink-0"> +90 </div><input${ssrRenderAttr("value", formPhone.value)} type="tel" placeholder="501 234 56 78" class="w-full h-full bg-transparent px-1 text-[14px] text-[#112135] placeholder-[#94a3b8] outline-none"></div></div><div><label class="block text-[13px] font-bold text-[#112135] mb-2">E-posta <span class="text-red-500">*</span> <span class="text-[#94a3b8] font-normal">(en az birini girin)</span></label><input${ssrRenderAttr("value", formEmail.value)} type="email" placeholder="ornek@email.com" class="w-full h-[52px] bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] text-[14px] text-[#112135] placeholder-[#94a3b8] outline-none focus:border-[#215d8f] focus:bg-white transition-colors"></div></div></div><div class="border border-[#e2e8f0] rounded-[16px] p-6 mt-6"><label class="block text-[13px] font-bold text-[#112135] mb-2">Notlar (opsiyonel)</label><textarea placeholder="Örn: Doğum günü kutlaması, diyet tercihleri..." class="w-full h-[100px] bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] p-4 text-[14px] text-[#112135] placeholder-[#94a3b8] outline-none focus:border-[#215d8f] focus:bg-white transition-colors resize-none">${ssrInterpolate(formNotes.value)}</textarea></div></div><div class="bg-white rounded-2xl border border-[#eef2f6] shadow-[0_4px_24px_rgb(0,0,0,0.02)] overflow-hidden p-6 md:p-8"><div class="flex items-start gap-4 mb-8"><div class="w-12 h-12 shrink-0 rounded-full bg-[#f0f9ff] flex items-center justify-center text-[#112135]"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"></path></svg></div><div class="pt-2"><h2 class="text-lg font-bold text-[#112135]">Rezervasyon Özeti</h2></div></div><div class="flex flex-col lg:flex-row gap-6 mb-8"><div class="flex-1 space-y-4"><div class="grid grid-cols-2 gap-4"><div class="bg-white border border-[#e2e8f0] rounded-[12px] p-4"><div class="text-[12px] text-[#215d8f] font-medium mb-1">Tarih</div><div class="text-[14px] font-bold text-[#112135]">${ssrInterpolate(selectedDate.value)} Nisan 2026</div></div><div class="bg-white border border-[#e2e8f0] rounded-[12px] p-4"><div class="text-[12px] text-[#215d8f] font-medium mb-1">Saat</div><div class="text-[14px] font-bold text-[#112135]">${ssrInterpolate(selectedTime.value ? selectedTime.value : "-")}</div></div></div><div class="grid grid-cols-2 gap-4"><div class="bg-white border border-[#e2e8f0] rounded-[12px] p-4"><div class="text-[12px] text-[#215d8f] font-medium mb-1">Süre</div><div class="text-[14px] font-bold text-[#112135]">${ssrInterpolate(duration.value)} saat</div></div><div class="bg-white border border-[#e2e8f0] rounded-[12px] p-4"><div class="text-[12px] text-[#215d8f] font-medium mb-1">Kişi</div><div class="text-[14px] font-bold text-[#112135]">${ssrInterpolate(guestCount.value)} kişi</div></div></div><div class="bg-white border border-[#e2e8f0] rounded-[12px] p-4"><div class="text-[12px] text-[#215d8f] font-medium mb-1">Alış → Bırakış</div><div class="text-[14px] font-bold text-[#112135]">${ssrInterpolate(pickup.value)} → ${ssrInterpolate(dropoff.value)}</div></div></div><div class="w-full lg:w-[400px] shrink-0 border border-[#e2e8f0] rounded-[16px] overflow-hidden flex flex-col"><div class="p-6 flex-1 bg-white"><h3 class="text-[16px] font-bold text-[#112135] mb-6">Fiyat Detayı</h3><div class="flex justify-between items-center text-[14px] mb-3"><span class="text-[#64748b] font-medium">Yat Kirası</span><span class="font-bold text-[#112135]">${ssrInterpolate(formatNumber(yachtTotal.value))} TL</span></div>`);
      if (extrasTotal.value > 0) {
        _push(`<div class="flex justify-between items-center text-[14px] mb-2 pt-2 border-t border-dashed border-[#e2e8f0]"><span class="text-[#64748b] font-medium">Ek Hizmetler</span><span class="font-bold text-[#112135]">${ssrInterpolate(formatNumber(extrasTotal.value))} TL</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="w-full h-[1px] bg-[#e2e8f0]"></div><div class="p-6 bg-white"><div class="flex justify-between items-end mb-4"><span class="text-[17px] font-bold text-[#112135]">Toplam</span><span class="text-[32px] font-bold text-[#215d8f] leading-none">${ssrInterpolate(formatNumber(grandTotal.value))} TL</span></div><div class="flex justify-between items-center bg-[#f0f9ff] text-[#215d8f] rounded-[8px] p-3 text-[14px] font-medium border border-[#e0f2fe]"><span>Depozito (50%)</span><span class="font-bold text-[#112135]">${ssrInterpolate(formatNumber(depositAmount.value))} TL</span></div></div></div></div><div class="bg-[#f8fafc] rounded-[16px] p-6 mb-8 border border-[#e2e8f0]/60"><h3 class="text-center text-[15px] font-bold text-[#112135] mb-6">Misafirlerimiz Ne Diyor?</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="bg-white p-5 rounded-[12px] shadow-sm border border-[#e2e8f0]/40"><div class="flex gap-1 mb-3 text-[#eab308]"><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`);
      });
      _push(`<!--]--></div><p class="text-[#64748b] text-[13px] italic mb-4 leading-relaxed">&quot;Doğum günümü burada kutladık, her şey mükemmeldi. Mürettebat çok ilgili ve profesyoneldi.&quot;</p><p class="text-[#112135] text-[13px] font-bold">Ayşe K.</p></div><div class="bg-white p-5 rounded-[12px] shadow-sm border border-[#e2e8f0]/40"><div class="flex gap-1 mb-3 text-[#eab308]"><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`);
      });
      _push(`<!--]--></div><p class="text-[#64748b] text-[13px] italic mb-4 leading-relaxed">&quot;İş yemeği için kiraladık, misafirlerimiz çok etkilendi. Boğaz manzarası ve hizmet kalitesi inanılmazdı.&quot;</p><p class="text-[#112135] text-[13px] font-bold">Mehmet R.</p></div><div class="bg-white p-5 rounded-[12px] shadow-sm border border-[#e2e8f0]/40"><div class="flex gap-1 mb-3 text-[#eab308]"><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`);
      });
      _push(`<!--]--></div><p class="text-[#64748b] text-[13px] italic mb-4 leading-relaxed">&quot;İstanbul tatilimizin en güzel deneyimiydi. Gece Boğaz turu gerçekten büyüleyici.&quot;</p><p class="text-[#112135] text-[13px] font-bold">Sarah L.</p></div></div></div><div class="flex items-center gap-4 p-5 border border-[#e2e8f0] rounded-[12px] cursor-pointer hover:border-[#cbd5e1] transition-colors mb-6"><div class="${ssrRenderClass(["w-5 h-5 rounded-[4px] border-[1.5px] flex-shrink-0 flex items-center justify-center transition-colors", acceptedTerms.value ? "bg-[#215d8f] border-[#215d8f]" : "bg-white border-[#cbd5e1]"])}">`);
      if (acceptedTerms.value) {
        _push(`<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><p class="text-[14px] text-[#64748b] font-medium"><span class="text-[#215d8f] font-bold hover:underline cursor-pointer hover:text-[#1a4a72] transition-colors">Kullanım Koşulları</span>nı okudum ve kabul ediyorum.</p></div></div><button type="button"${ssrIncludeBooleanAttr(!selectedYacht.value || !acceptedTerms.value || submitLoading.value) ? " disabled" : ""} class="${ssrRenderClass([
        "w-full py-4 rounded-[12px] font-bold text-[16px] flex items-center justify-center gap-2 transition-all relative",
        selectedYacht.value && acceptedTerms.value && !submitLoading.value ? "bg-[#1e5687] text-white shadow-lg shadow-[#1e5687]/30 hover:bg-[#154168] cursor-pointer" : "bg-[#94a3b8] text-white opacity-80 cursor-not-allowed pointer-events-none"
      ])}">`);
      if (!submitLoading.value) {
        _push(`<svg class="w-5 h-5 absolute left-1/2 -ml-[130px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>`);
      } else {
        _push(`<svg class="animate-spin w-5 h-5 absolute left-1/2 -ml-[130px] text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      }
      _push(`<span class="pl-2">${ssrInterpolate(submitLoading.value ? "İşleniyor..." : "Öde ve Rezervasyonu Tamamla")}</span></button>`);
      if (!selectedYacht.value) {
        _push(`<p class="text-center text-[12px] text-[#ef4444] font-medium mt-3">Devam etmek için yat seçmelisiniz.</p>`);
      } else if (!acceptedTerms.value) {
        _push(`<p class="text-center text-[12px] text-[#ef4444] font-medium mt-3">Devam etmek için kullanım koşullarını kabul etmelisiniz.</p>`);
      } else {
        _push(`<p class="text-center text-[12px] text-[#22c55e] font-medium mt-3">Rezervasyonunuz tamamlanmaya hazır!</p>`);
      }
      _push(`</div></div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showTermsModal.value) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0f172a]/40 backdrop-blur-[12px]"><div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden relative border border-white/20"><div class="px-6 py-5 border-b border-[#e2e8f0] flex justify-between items-center bg-white"><h3 class="text-xl font-bold text-[#112135]">Kullanım Koşulları &amp; İptal Politikası</h3><button class="text-[#64748b] hover:text-[#0f172a] bg-[#f8fafc] hover:bg-[#e2e8f0] transition-colors p-2 rounded-full border border-[#e2e8f0]"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-6 md:p-8 overflow-y-auto w-full prose prose-sm max-w-none text-[#64748b]"><h4 class="text-[#112135] font-bold mt-0 text-[15px] mb-2">1. Rezervasyon ve Ödeme Süreci</h4><p class="text-[14px] leading-relaxed mb-6">Rezervasyonun kesinleşmesi için toplam kiralama bedelinin en az %50&#39;si ön ödeme (depozito) olarak tahsil edilir. Kalan tutar indirim uygulanmaksızın, yat turu başlamadan en geç 1 saat önce nakit veya banka havalesi ile tamamlanmalıdır.</p><h4 class="text-[#112135] font-bold text-[15px] mb-2">2. İptal ve İade İşlemleri</h4><p class="text-[14px] leading-relaxed mb-6">Tur tarihine 7 gün kalana kadar yapılan iptallerde yatırılan kaporanın tamamı iade edilir. 7 - 3 gün arası iptallerde operasyonel kesintiler nedeniyle kaporanın yalnızca %50&#39;si iade edilebilir. Tur tarihine 3 günden az bir süre kalmışsa maalesef iade yapılamaz.</p><h4 class="text-[#112135] font-bold text-[15px] mb-2">3. Erteleme veya İklim Koşulları</h4><p class="text-[14px] leading-relaxed mb-6">Fırtına uyarısı veya güvenlik riski oluşturan durumlarda, kaptanın nihai kararıyla misafirlerimizin güvenliğini sağlamak için tur, her iki tarafın uygun olacağı farklı bir tarihe bedelsiz şekilde ertelenir. Misafirlerden kaynaklanan gecikmeler toplam kira süresine eklenmez.</p><h4 class="text-[#112135] font-bold text-[15px] mb-2">4. Misafir Güvenliği ve Tekne Kuralları</h4><p class="text-[14px] leading-relaxed mb-6">Kurallarımız gereğince tekne içerisinde güvenli alanların dışına çıkmak yasaktır. Misafirlerin, yat içerisindeki demirbaş ve elektronik ekipmanlara verdikleri hasarlardan kendileri maddi olarak sorumludur. Yüzme turlarında kapasite aşımına izin verilmez.</p></div><div class="px-6 py-5 border-t border-[#e2e8f0] bg-white flex justify-end"><button class="bg-[#112135] text-white px-8 py-3.5 rounded-[10px] font-bold text-[14px] hover:bg-[#1a3250] transition-colors shadow-lg"> Onaylıyor ve Kabul Ediyorum </button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rezervasyon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=rezervasyon-D3ayUkV7.mjs.map
