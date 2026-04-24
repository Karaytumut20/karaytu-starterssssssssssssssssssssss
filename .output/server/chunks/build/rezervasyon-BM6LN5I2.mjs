import { defineComponent, ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { i as _export_sfc, g as useSupabaseUser, a as useSupabaseClient, u as useRoute, c as useSeoMeta, s as siteConfig } from './server.mjs';
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
    const tourType = ref(route.query.tourType || "Boğaz Turu");
    const pickupPoint = ref("Arnavutköy");
    const dropoffPoint = ref("Arnavutköy");
    const selectedDate = ref(route.query.date || "2026-04-30");
    const selectedTime = ref(route.query.time ? String(route.query.time) : "10:00");
    const lockId = route.query.lock_id ? String(route.query.lock_id) : null;
    const hasLockId = computed(() => !!lockId);
    const selectedExtras = ref([]);
    const acceptedTerms = ref(false);
    const extraServices = [
      { name: "VIP Vito Transfer", desc: "Otelinizden yata lüks Vito ile gidiş-dönüş transfer.", icon: "🚐", price: "6.500 TL", val: 6500, type: "fixed" },
      { name: "Meze Tabağı", desc: "Geleneksel Türk mezelerinden oluşan özel tabak.", icon: "🍱", price: "1.080 TL", val: 1080, type: "person" },
      { name: "Özel İçki/Yiyecek Servisi", desc: "Dışarıdan getirdiğiniz ürünlerin profesyonel servisi.", icon: "🍷", price: "500 TL", val: 500, type: "person" },
      { name: "Meyve & Çerez Menüsü", desc: "Taze mevsim meyveleri ve karışık lüks çerez.", icon: "🍇", price: "1.180 TL", val: 1180, type: "person" },
      { name: "Profesyonel Fotoğrafçı", desc: "Tüm organizasyon boyunca profesyonel çekim.", icon: "📸", price: "12.500 TL", val: 12500, type: "fixed" },
      { name: "Kahvaltı Menüsü", desc: "Serpme organik Boğaz kahvaltısı.", icon: "🍳", price: "1.395 TL", val: 1395, type: "person" },
      { name: "Akşam Yemeği Menüsü", desc: "Balık veya et seçenekli lüks akşam yemeği.", icon: "🍽️", price: "2.150 TL", val: 2150, type: "person" },
      { name: "Özel Kutlama Pastası", desc: "Kişiye özel tasarım kutlama pastası.", icon: "🎂", price: "2.250 TL", val: 2250, type: "fixed" }
    ];
    const generateBaseTimeSlots = () => {
      const slots = [];
      let hour = 0;
      let min = 0;
      for (let i = 0; i < 48; i++) {
        const hStr = String(hour).padStart(2, "0");
        const mStr = min === 0 ? "00" : "30";
        slots.push({ time: `${hStr}:${mStr}`, status: "available" });
        min += 30;
        if (min === 60) {
          min = 0;
          hour++;
        }
      }
      return slots;
    };
    const timeSlots = ref(generateBaseTimeSlots());
    const allFetchedReservations = ref([]);
    const fetchAvailability = async () => {
      if (!selectedYacht.value || !selectedDate.value) return;
      timeSlots.value = generateBaseTimeSlots();
      const sDate = new Date(selectedDate.value);
      const startDateStr = new Date(sDate.getTime() - 7 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0];
      const endDateStr = new Date(sDate.getTime() + 7 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0];
      const { data: reservations, error } = await supabase.from("reservations").select("booking_date, start_time, duration_hours, amount_paid, payment_status, status").eq("yacht_id", selectedYacht.value).gte("booking_date", startDateStr).lte("booking_date", endDateStr).neq("status", "cancelled");
      if (reservations && !error) {
        allFetchedReservations.value = reservations.filter((res) => {
          return res.amount_paid >= 1 || res.payment_status === "partial" || res.payment_status === "paid";
        });
        allFetchedReservations.value.forEach((res) => {
          const resDate = /* @__PURE__ */ new Date(`${res.booking_date}T${res.start_time}`);
          const resStartMs = resDate.getTime();
          const resEndMs = resStartMs + res.duration_hours * 60 * 60 * 1e3;
          timeSlots.value.forEach((slot) => {
            const slotDate = /* @__PURE__ */ new Date(`${selectedDate.value}T${slot.time}:00`);
            const slotStartMs = slotDate.getTime();
            const slotEndMs = slotStartMs + 30 * 60 * 1e3;
            if (resStartMs < slotEndMs && resEndMs > slotStartMs) {
              slot.status = "booked";
              if (selectedTime.value === slot.time) {
                selectedTime.value = "";
              }
            }
          });
        });
      }
    };
    watch([selectedYacht, selectedDate], () => {
      fetchAvailability();
    }, { immediate: true });
    const checkOverlap = (startTimeStr, durHours) => {
      const reqStartMs = (/* @__PURE__ */ new Date(`${selectedDate.value}T${startTimeStr}:00`)).getTime();
      const reqEndMs = reqStartMs + durHours * 60 * 60 * 1e3;
      for (const res of allFetchedReservations.value) {
        const resStartMs = (/* @__PURE__ */ new Date(`${res.booking_date}T${res.start_time}`)).getTime();
        const resEndMs = resStartMs + res.duration_hours * 60 * 60 * 1e3;
        if (reqStartMs < resEndMs && reqEndMs > resStartMs) {
          return true;
        }
      }
      return false;
    };
    const isSlotSelected = (tTime) => {
      if (!selectedTime.value) return false;
      const reqStartMs = (/* @__PURE__ */ new Date(`${selectedDate.value}T${selectedTime.value}:00`)).getTime();
      const reqEndMs = reqStartMs + duration.value * 60 * 60 * 1e3;
      const slotStartMs = (/* @__PURE__ */ new Date(`${selectedDate.value}T${tTime}:00`)).getTime();
      return slotStartMs >= reqStartMs && slotStartMs < reqEndMs;
    };
    watch(duration, () => {
      if (selectedTime.value) {
        if (checkOverlap(selectedTime.value, duration.value)) {
          selectedTime.value = "";
        }
      }
    });
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
        if (!srv) return total;
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
      title: `Rezervasyon Oluştur | ${siteConfig.name}`,
      description: "YatigoTR Lüks Yat kiralama rezervasyon ekranı."
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[#f4f7f6] min-h-screen text-[#0b213b] font-sans pb-32 pt-24 selection:bg-[#1d4e89] selection:text-white" }, _attrs))} data-v-ea817d89><div class="max-w-[1400px] mx-auto px-4 lg:px-6 relative z-10" data-v-ea817d89><div class="mb-10 text-center" data-v-ea817d89><h1 class="text-3xl md:text-4xl font-extrabold text-[#0b213b] mb-2" data-v-ea817d89>Rezervasyon Oluştur</h1><p class="text-gray-500 text-sm" data-v-ea817d89>Deneyiminiz için mükemmel yatı ve detayları seçin.</p></div>`);
      if (loadingYachts.value) {
        _push(`<div class="flex justify-center py-20" data-v-ea817d89><svg class="animate-spin h-12 w-12 text-[#1d4e89]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-ea817d89><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-ea817d89></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-ea817d89></path></svg></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8" data-v-ea817d89><div class="lg:col-span-8 space-y-6" data-v-ea817d89><div class="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-6 md:p-8" data-v-ea817d89><div class="flex items-center gap-4 mb-6" data-v-ea817d89><div class="w-12 h-12 shrink-0 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8]" data-v-ea817d89><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1z M13 8h6a1 1 0 011 1v7a1 1 0 01-1 1h-6" data-v-ea817d89></path></svg></div><div data-v-ea817d89><h2 class="text-xl font-bold text-[#0b213b] flex items-center gap-2" data-v-ea817d89>Yat Seçin <span class="text-red-500" data-v-ea817d89>*</span></h2><p class="text-[13px] text-gray-500 mt-1" data-v-ea817d89>Deneyiminiz için mükemmel yatı seçin</p></div></div>`);
        if (hasLockId.value) {
          _push(`<div class="mb-6 bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-4" data-v-ea817d89><svg class="w-6 h-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-ea817d89></path></svg><div data-v-ea817d89><p class="text-red-600 font-bold text-sm" data-v-ea817d89>Yatınız Geçici Olarak Kilitlendi</p><p class="text-red-500/80 text-xs mt-1" data-v-ea817d89>Başka biri tarafından alınmadan önce işlemi tamamlayın.</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-5" data-v-ea817d89><!--[-->`);
        ssrRenderList(realYachts.value, (y) => {
          _push(`<div class="${ssrRenderClass([
            "rounded-[20px] overflow-hidden border-2 cursor-pointer transition-all duration-300 relative group flex flex-col",
            selectedYacht.value === y.id ? "border-[#1a73e8] shadow-[0_8px_30px_rgba(26,115,232,0.12)]" : "border-gray-100 hover:border-gray-300 shadow-sm"
          ])}" data-v-ea817d89><div class="h-[200px] relative overflow-hidden" data-v-ea817d89><img${ssrRenderAttr("src", y.main_image || "/images/default.jpg")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-v-ea817d89><div class="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-lg" data-v-ea817d89>${ssrInterpolate(y.length || "24.0")}m </div><div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[#0b213b] text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm cursor-pointer hover:bg-white transition-colors" data-v-ea817d89> Detayları Görüntüle </div></div><div class="p-5 flex flex-col flex-1 bg-white" data-v-ea817d89><h3 class="font-extrabold text-[#0b213b] text-[17px] mb-3" data-v-ea817d89>${ssrInterpolate(y.name)}</h3><div class="flex items-center gap-4 text-[12px] text-gray-500 mb-4" data-v-ea817d89><span data-v-ea817d89>Maks Kişi: <strong class="text-[#0b213b]" data-v-ea817d89>${ssrInterpolate(y.capacity)}</strong></span><span data-v-ea817d89>Maks Yemek Düzeni: <strong class="text-[#0b213b]" data-v-ea817d89>${ssrInterpolate(Math.max(1, y.capacity - 4))}</strong></span></div><div class="flex items-baseline gap-1 mb-5" data-v-ea817d89><span class="text-[20px] font-black text-[#1d4e89]" data-v-ea817d89>${ssrInterpolate(Number(y.price_hourly || 0).toLocaleString("tr-TR"))} TL</span><span class="text-[12px] text-gray-400" data-v-ea817d89>/ saat başı</span></div><div class="flex justify-between items-center text-[12px] mb-4 pb-4 border-b border-gray-100" data-v-ea817d89><span class="text-gray-500" data-v-ea817d89>Tam Gün Ada veya Boğaz Turu</span><strong class="text-[#0b213b]" data-v-ea817d89>${ssrInterpolate(Number((y.price_hourly || 0) * 8).toLocaleString("tr-TR"))} TL</strong></div><div class="flex items-center justify-between text-[10.5px] text-gray-500 mt-auto flex-wrap gap-y-2" data-v-ea817d89><span class="flex items-center gap-1" data-v-ea817d89><svg class="w-3 h-3 text-[#34A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" data-v-ea817d89></path></svg> Kaptan ve mürettebat dahil</span><span class="flex items-center gap-1" data-v-ea817d89><svg class="w-3 h-3 text-[#34A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" data-v-ea817d89></path></svg> Yakıt dahil</span><span class="flex items-center gap-1" data-v-ea817d89><svg class="w-3 h-3 text-[#34A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" data-v-ea817d89></path></svg> Sigorta dahil</span></div></div>`);
          if (selectedYacht.value === y.id) {
            _push(`<div class="absolute top-4 right-4 w-6 h-6 bg-[#1a73e8] rounded-full flex items-center justify-center shadow-md" data-v-ea817d89><svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" data-v-ea817d89></path></svg></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div><div class="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-6 md:p-8" data-v-ea817d89><div class="flex items-center gap-4 mb-6" data-v-ea817d89><div class="w-12 h-12 shrink-0 rounded-full bg-[#f4f7fe] flex items-center justify-center text-[#1d4e89]" data-v-ea817d89><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-ea817d89></path></svg></div><div data-v-ea817d89><h2 class="text-xl font-bold text-[#0b213b]" data-v-ea817d89>Tur Detayları</h2><p class="text-[13px] text-gray-500 mt-1" data-v-ea817d89>Paket, misafir sayısı, süre ve lokasyonu belirleyin</p></div></div><div class="space-y-5" data-v-ea817d89><div data-v-ea817d89><label class="block text-[11px] font-bold text-[#1d4e89] uppercase tracking-wider mb-2" data-v-ea817d89>TUR TİPİ <span class="text-red-500" data-v-ea817d89>*</span></label><select class="w-full bg-[#f8fafc] border border-gray-200 text-[#0b213b] font-semibold text-[14px] rounded-[14px] py-4 px-5 outline-none focus:border-[#1d4e89] transition-colors appearance-none relative" data-v-ea817d89><option value="Saatlik Kiralama" data-v-ea817d89${ssrIncludeBooleanAttr(Array.isArray(tourType.value) ? ssrLooseContain(tourType.value, "Saatlik Kiralama") : ssrLooseEqual(tourType.value, "Saatlik Kiralama")) ? " selected" : ""}>Saatlik Kiralama</option><option value="Tam Gün Adalar Turu (8 saat)" data-v-ea817d89${ssrIncludeBooleanAttr(Array.isArray(tourType.value) ? ssrLooseContain(tourType.value, "Tam Gün Adalar Turu (8 saat)") : ssrLooseEqual(tourType.value, "Tam Gün Adalar Turu (8 saat)")) ? " selected" : ""}>Tam Gün Adalar Turu (8 saat)</option><option value="Tam Gün Boğaz Turu (8 saat)" data-v-ea817d89${ssrIncludeBooleanAttr(Array.isArray(tourType.value) ? ssrLooseContain(tourType.value, "Tam Gün Boğaz Turu (8 saat)") : ssrLooseEqual(tourType.value, "Tam Gün Boğaz Turu (8 saat)")) ? " selected" : ""}>Tam Gün Boğaz Turu (8 saat)</option></select></div><div class="grid grid-cols-1 md:grid-cols-2 gap-5" data-v-ea817d89><div data-v-ea817d89><label class="block text-[11px] font-bold text-[#1d4e89] uppercase tracking-wider mb-2" data-v-ea817d89>MİSAFİR SAYISI <span class="text-red-500" data-v-ea817d89>*</span></label><div class="flex items-center justify-between bg-[#f8fafc] border border-gray-200 rounded-[14px] px-2 h-[56px] focus-within:border-[#1d4e89]" data-v-ea817d89><button type="button" class="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#0b213b] hover:bg-white transition-colors shadow-sm" data-v-ea817d89><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" data-v-ea817d89></path></svg></button><span class="text-[15px] font-bold text-[#0b213b]" data-v-ea817d89>${ssrInterpolate(guestCount.value)}</span><button type="button" class="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#0b213b] hover:bg-white transition-colors shadow-sm" data-v-ea817d89><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" data-v-ea817d89></path></svg></button></div></div><div data-v-ea817d89><label class="block text-[11px] font-bold text-[#1d4e89] uppercase tracking-wider mb-2" data-v-ea817d89>TUR SÜRESİ <span class="text-red-500" data-v-ea817d89>*</span></label><div class="flex items-center justify-between bg-[#f8fafc] border border-gray-200 rounded-[14px] px-2 h-[56px] focus-within:border-[#1d4e89]" data-v-ea817d89><button type="button"${ssrIncludeBooleanAttr(hasLockId.value) ? " disabled" : ""} class="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#0b213b] hover:bg-white transition-colors disabled:opacity-30 shadow-sm" data-v-ea817d89><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" data-v-ea817d89></path></svg></button><span class="text-[15px] font-bold text-[#0b213b]" data-v-ea817d89>${ssrInterpolate(duration.value)}</span><button type="button"${ssrIncludeBooleanAttr(hasLockId.value) ? " disabled" : ""} class="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#0b213b] hover:bg-white transition-colors disabled:opacity-30 shadow-sm" data-v-ea817d89><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" data-v-ea817d89></path></svg></button></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-5" data-v-ea817d89><div data-v-ea817d89><label class="block text-[11px] font-bold text-[#1d4e89] uppercase tracking-wider mb-2" data-v-ea817d89>ALIŞ NOKTASI <span class="text-red-500" data-v-ea817d89>*</span></label><select class="w-full bg-[#f8fafc] border border-gray-200 text-[#0b213b] font-semibold text-[14px] rounded-[14px] py-4 px-5 outline-none focus:border-[#1d4e89] transition-colors appearance-none" data-v-ea817d89><option value="Arnavutköy" data-v-ea817d89${ssrIncludeBooleanAttr(Array.isArray(pickupPoint.value) ? ssrLooseContain(pickupPoint.value, "Arnavutköy") : ssrLooseEqual(pickupPoint.value, "Arnavutköy")) ? " selected" : ""}>Arnavutköy</option><option value="Bebek" data-v-ea817d89${ssrIncludeBooleanAttr(Array.isArray(pickupPoint.value) ? ssrLooseContain(pickupPoint.value, "Bebek") : ssrLooseEqual(pickupPoint.value, "Bebek")) ? " selected" : ""}>Bebek</option><option value="Kuruçeşme" data-v-ea817d89${ssrIncludeBooleanAttr(Array.isArray(pickupPoint.value) ? ssrLooseContain(pickupPoint.value, "Kuruçeşme") : ssrLooseEqual(pickupPoint.value, "Kuruçeşme")) ? " selected" : ""}>Kuruçeşme</option></select></div><div data-v-ea817d89><label class="block text-[11px] font-bold text-[#1d4e89] uppercase tracking-wider mb-2" data-v-ea817d89>BIRAKIŞ NOKTASI <span class="text-red-500" data-v-ea817d89>*</span></label><select class="w-full bg-[#f8fafc] border border-gray-200 text-[#0b213b] font-semibold text-[14px] rounded-[14px] py-4 px-5 outline-none focus:border-[#1d4e89] transition-colors appearance-none" data-v-ea817d89><option value="Arnavutköy" data-v-ea817d89${ssrIncludeBooleanAttr(Array.isArray(dropoffPoint.value) ? ssrLooseContain(dropoffPoint.value, "Arnavutköy") : ssrLooseEqual(dropoffPoint.value, "Arnavutköy")) ? " selected" : ""}>Arnavutköy</option><option value="Bebek" data-v-ea817d89${ssrIncludeBooleanAttr(Array.isArray(dropoffPoint.value) ? ssrLooseContain(dropoffPoint.value, "Bebek") : ssrLooseEqual(dropoffPoint.value, "Bebek")) ? " selected" : ""}>Bebek</option><option value="Kuruçeşme" data-v-ea817d89${ssrIncludeBooleanAttr(Array.isArray(dropoffPoint.value) ? ssrLooseContain(dropoffPoint.value, "Kuruçeşme") : ssrLooseEqual(dropoffPoint.value, "Kuruçeşme")) ? " selected" : ""}>Kuruçeşme</option></select></div></div></div></div><div class="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-6 md:p-8" data-v-ea817d89><div class="flex items-center gap-4 mb-6" data-v-ea817d89><div class="w-12 h-12 shrink-0 rounded-full bg-[#f3e8ff] flex items-center justify-center text-[#9333ea]" data-v-ea817d89><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-ea817d89></path></svg></div><div data-v-ea817d89><h2 class="text-xl font-bold text-[#0b213b]" data-v-ea817d89>Tarih ve Saat</h2><p class="text-[13px] text-gray-500 mt-1" data-v-ea817d89>Turunuz için tarih ve saat seçin</p></div></div><div class="border border-gray-200 rounded-[20px] p-6 mb-5" data-v-ea817d89><div class="flex justify-between items-center mb-6" data-v-ea817d89><button class="text-gray-400 hover:text-[#0b213b] transition-colors" data-v-ea817d89><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-ea817d89></path></svg></button><span class="font-bold text-[#0b213b] text-[15px]" data-v-ea817d89>Nisan 2026</span><button class="text-gray-400 hover:text-[#0b213b] transition-colors" data-v-ea817d89><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-ea817d89></path></svg></button></div><div class="grid grid-cols-7 gap-2 mb-4 text-center" data-v-ea817d89><span class="text-[10px] font-bold text-gray-400" data-v-ea817d89>PZT</span><span class="text-[10px] font-bold text-gray-400" data-v-ea817d89>SAL</span><span class="text-[10px] font-bold text-gray-400" data-v-ea817d89>ÇAR</span><span class="text-[10px] font-bold text-gray-400" data-v-ea817d89>PER</span><span class="text-[10px] font-bold text-gray-400" data-v-ea817d89>CUM</span><span class="text-[10px] font-bold text-gray-400" data-v-ea817d89>CMT</span><span class="text-[10px] font-bold text-gray-400" data-v-ea817d89>PAZ</span></div><div class="grid grid-cols-7 gap-y-3 gap-x-2 text-center text-[13px] font-semibold" data-v-ea817d89><div class="text-gray-300 py-1.5" data-v-ea817d89>30</div><div class="text-gray-300 py-1.5" data-v-ea817d89>31</div><!--[-->`);
        ssrRenderList(22, (d) => {
          _push(`<div class="text-gray-500 py-1.5 cursor-pointer hover:bg-gray-100 rounded-lg" data-v-ea817d89>${ssrInterpolate(d)}</div>`);
        });
        _push(`<!--]--><div class="bg-[#f0f4f8] text-[#1d4e89] py-1.5 cursor-pointer rounded-lg relative" data-v-ea817d89> 23 <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1d4e89] rounded-full" data-v-ea817d89></div></div><!--[-->`);
        ssrRenderList(6, (d) => {
          _push(`<div class="text-gray-500 py-1.5 cursor-pointer hover:bg-gray-100 rounded-lg" data-v-ea817d89>${ssrInterpolate(23 + d)}</div>`);
        });
        _push(`<!--]--><div class="bg-[#1d4e89] text-white py-1.5 cursor-pointer rounded-lg font-bold shadow-md" data-v-ea817d89>30</div><div class="text-gray-300 py-1.5" data-v-ea817d89>1</div><div class="text-gray-300 py-1.5" data-v-ea817d89>2</div><div class="text-gray-300 py-1.5" data-v-ea817d89>3</div></div></div><div class="border border-gray-200 rounded-[20px] p-6 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]" data-v-ea817d89><div class="flex items-center gap-2 mb-5" data-v-ea817d89><svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ea817d89></path></svg><span class="text-[13px] font-bold text-[#0b213b]" data-v-ea817d89>Tur başlangıç saati seçin</span><span class="text-[12px] text-gray-400 ml-1" data-v-ea817d89>30 Nisan 2026, Perşembe</span></div><div class="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 gap-3 mb-6" data-v-ea817d89><!--[-->`);
        ssrRenderList(timeSlots.value, (t) => {
          _push(`<button class="${ssrRenderClass([
            "py-2.5 rounded-xl border text-[13px] font-bold transition-all relative flex items-center justify-center",
            t.status === "available" && !isSlotSelected(t.time) ? "border-[#b9d3e8] text-[#1d4e89] bg-white hover:bg-[#f0f4f8]" : "",
            t.status === "booked" ? "border-red-200 text-red-400 bg-red-50/50 cursor-not-allowed" : "",
            t.status === "busy" ? "border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed" : "",
            isSlotSelected(t.time) ? "border-[#1d4e89] bg-[#e8f0fe] text-[#1d4e89] ring-1 ring-[#1d4e89]" : ""
          ])}" data-v-ea817d89>${ssrInterpolate(t.time)} `);
          if (t.status === "booked") {
            _push(`<div class="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center border-2 border-white" data-v-ea817d89><svg class="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-ea817d89></path></svg></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div><div class="flex items-center gap-5 text-[11px] font-semibold text-gray-500 pt-2 border-t border-gray-100" data-v-ea817d89><div class="flex items-center gap-1.5" data-v-ea817d89><div class="w-3 h-3 border border-[#b9d3e8] bg-white rounded-sm" data-v-ea817d89></div> Müsait</div><div class="flex items-center gap-1.5" data-v-ea817d89><div class="w-3 h-3 bg-red-50 border border-red-200 rounded-sm flex items-center justify-center" data-v-ea817d89><div class="w-1.5 h-1.5 bg-red-500 rounded-full" data-v-ea817d89></div></div> Rezerve</div><div class="flex items-center gap-1.5" data-v-ea817d89><div class="w-3 h-3 bg-gray-100 border border-gray-200 rounded-sm" data-v-ea817d89></div> Hazırlık</div></div></div></div><div class="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-6 md:p-8" data-v-ea817d89><div class="flex items-center gap-4 mb-6" data-v-ea817d89><div class="w-12 h-12 shrink-0 rounded-full bg-amber-50 flex items-center justify-center text-amber-500" data-v-ea817d89><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" data-v-ea817d89></path></svg></div><div data-v-ea817d89><h2 class="text-xl font-bold text-[#0b213b] flex items-center gap-2" data-v-ea817d89>Premium Ekstralar <span class="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-widest" data-v-ea817d89>VIP</span></h2><p class="text-[13px] text-gray-500 mt-1" data-v-ea817d89>Lüks deneyiminizi bir üst seviyeye taşıyın</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-ea817d89><!--[-->`);
        ssrRenderList(extraServices, (item, idx) => {
          _push(`<div class="${ssrRenderClass([
            "relative overflow-hidden flex flex-col p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2",
            selectedExtras.value.includes(idx) ? "border-amber-500 bg-amber-50" : "border-gray-100 bg-white hover:border-amber-200"
          ])}" data-v-ea817d89><div class="${ssrRenderClass([
            "absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors z-10",
            selectedExtras.value.includes(idx) ? "bg-amber-500 border-amber-500" : "bg-transparent border-gray-200"
          ])}" data-v-ea817d89>`);
          if (selectedExtras.value.includes(idx)) {
            _push(`<svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" data-v-ea817d89></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 text-xl" data-v-ea817d89>${ssrInterpolate(item.icon)}</div><div class="flex-1" data-v-ea817d89><h4 class="text-[14px] font-bold text-[#0b213b] mb-1.5" data-v-ea817d89>${ssrInterpolate(item.name)}</h4><p class="text-[11px] text-gray-500 leading-relaxed mb-4" data-v-ea817d89>${ssrInterpolate(item.desc)}</p></div><div class="mt-auto pt-3 border-t border-gray-100" data-v-ea817d89><p class="text-[15px] font-black text-amber-600" data-v-ea817d89>+ ${ssrInterpolate(item.price)} `);
          if (item.type === "person") {
            _push(`<span class="text-[10px] text-gray-400 font-semibold uppercase" data-v-ea817d89>/ kişi başı</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p></div></div>`);
        });
        _push(`<!--]--></div></div><div class="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-6 md:p-8" data-v-ea817d89><div class="flex items-center gap-4 mb-6" data-v-ea817d89><div class="w-12 h-12 shrink-0 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8]" data-v-ea817d89><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-ea817d89></path></svg></div><div data-v-ea817d89><h2 class="text-xl font-bold text-[#0b213b]" data-v-ea817d89>Rezervasyon Bilgileri</h2><p class="text-[13px] text-gray-500 mt-1" data-v-ea817d89>Rezervasyon için iletişim bilgilerinizi girin</p></div></div><div class="border border-gray-200 rounded-[20px] p-6 mb-5" data-v-ea817d89><div class="grid grid-cols-1 md:grid-cols-3 gap-5" data-v-ea817d89><div data-v-ea817d89><label class="block text-[12px] font-bold text-[#0b213b] mb-2" data-v-ea817d89>Ad Soyad <span class="text-red-500" data-v-ea817d89>*</span></label><input${ssrRenderAttr("value", formName.value)} type="text" class="w-full h-12 bg-[#f4f7f6] rounded-[12px] px-4 text-[14px] font-semibold text-[#0b213b] outline-none border border-transparent focus:border-[#1d4e89] transition-colors" data-v-ea817d89></div><div data-v-ea817d89><label class="block text-[12px] font-bold text-[#0b213b] mb-2" data-v-ea817d89>Telefon <span class="text-red-500" data-v-ea817d89>*</span> <span class="text-gray-400 font-normal text-[10px]" data-v-ea817d89>(en az birini girin)</span></label><input${ssrRenderAttr("value", formPhone.value)} type="tel" class="w-full h-12 bg-[#f4f7f6] rounded-[12px] px-4 text-[14px] font-semibold text-[#0b213b] outline-none border border-transparent focus:border-[#1d4e89] transition-colors" data-v-ea817d89></div><div data-v-ea817d89><label class="block text-[12px] font-bold text-[#0b213b] mb-2" data-v-ea817d89>E-posta <span class="text-red-500" data-v-ea817d89>*</span> <span class="text-gray-400 font-normal text-[10px]" data-v-ea817d89>(en az birini girin)</span></label><input${ssrRenderAttr("value", formEmail.value)} type="email" class="w-full h-12 bg-[#f4f7f6] rounded-[12px] px-4 text-[14px] font-semibold text-[#0b213b] outline-none border border-transparent focus:border-[#1d4e89] transition-colors" data-v-ea817d89></div></div></div><div class="border border-gray-200 rounded-[20px] p-6" data-v-ea817d89><label class="block text-[12px] font-bold text-[#0b213b] mb-2" data-v-ea817d89>Notlar (opsiyonel)</label><textarea class="w-full h-24 bg-[#f4f7f6] rounded-[12px] p-4 text-[14px] font-semibold text-[#0b213b] outline-none border border-transparent focus:border-[#1d4e89] transition-colors resize-none" data-v-ea817d89>${ssrInterpolate(formNotes.value)}</textarea></div></div></div><div class="lg:col-span-4 h-full relative" data-v-ea817d89><div class="sticky top-[120px] z-20 w-full pb-10" data-v-ea817d89><div class="border border-gray-200 bg-white rounded-[24px] overflow-hidden flex flex-col shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-6 md:p-8" data-v-ea817d89><div class="flex items-center gap-3 mb-6" data-v-ea817d89><div class="w-10 h-10 rounded-full bg-[#f4f7fe] flex items-center justify-center text-[#1d4e89]" data-v-ea817d89><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-ea817d89></path></svg></div><h3 class="text-[18px] font-bold text-[#0b213b]" data-v-ea817d89>Rezervasyon Özeti</h3></div><div class="border border-[#b9d3e8] rounded-[16px] overflow-hidden mb-6 flex flex-col xl:flex-row relative" data-v-ea817d89><div class="flex flex-col flex-1" data-v-ea817d89><div class="flex-1 p-5 border-b xl:border-b-0 xl:border-r border-[#b9d3e8]" data-v-ea817d89><div class="flex items-center gap-4 mb-6" data-v-ea817d89><img${ssrRenderAttr("src", realYachts.value.find((y) => y.id === selectedYacht.value)?.main_image || "/images/default.jpg")} class="w-20 h-12 rounded-lg object-cover" data-v-ea817d89><div data-v-ea817d89><h4 class="font-bold text-[#0b213b] text-[15px]" data-v-ea817d89>${ssrInterpolate(realYachts.value.find((y) => y.id === selectedYacht.value)?.name || "Yat Seçilmedi")}</h4><p class="text-[12px] text-gray-500" data-v-ea817d89>${ssrInterpolate(realYachts.value.find((y) => y.id === selectedYacht.value)?.capacity || "-")} kişi kapasite</p></div></div><div class="grid grid-cols-2 gap-3 mb-5" data-v-ea817d89><div class="border border-gray-200 rounded-xl p-3" data-v-ea817d89><p class="text-[11px] text-gray-500 mb-1" data-v-ea817d89>Tarih</p><p class="text-[13px] font-bold text-[#0b213b]" data-v-ea817d89>${ssrInterpolate(selectedDate.value ? selectedDate.value.split("-").reverse().join(".") : "Seçilmedi")}</p></div><div class="border border-gray-200 rounded-xl p-3" data-v-ea817d89><p class="text-[11px] text-gray-500 mb-1" data-v-ea817d89>Saat</p><p class="text-[13px] font-bold text-[#0b213b]" data-v-ea817d89>${ssrInterpolate(selectedTime.value || "-")}</p></div><div class="border border-gray-200 rounded-xl p-3" data-v-ea817d89><p class="text-[11px] text-gray-500 mb-1" data-v-ea817d89>Süre</p><p class="text-[13px] font-bold text-[#0b213b]" data-v-ea817d89>${ssrInterpolate(duration.value)} saat</p></div><div class="border border-gray-200 rounded-xl p-3" data-v-ea817d89><p class="text-[11px] text-gray-500 mb-1" data-v-ea817d89>kişi</p><p class="text-[13px] font-bold text-[#0b213b]" data-v-ea817d89>${ssrInterpolate(guestCount.value)} kişi</p></div></div><div class="border border-gray-200 rounded-xl p-3 flex items-center justify-between" data-v-ea817d89><div data-v-ea817d89><p class="text-[11px] text-gray-500 mb-1 flex items-center gap-2" data-v-ea817d89>Alış <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-v-ea817d89></path></svg> Bırakış</p><p class="text-[13px] font-bold text-[#0b213b]" data-v-ea817d89>${ssrInterpolate(pickupPoint.value)} <svg class="w-3 h-3 inline text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-v-ea817d89></path></svg> ${ssrInterpolate(dropoffPoint.value)}</p></div></div></div><div class="w-full xl:w-[260px] bg-white p-5 flex flex-col relative shrink-0" data-v-ea817d89><h4 class="font-bold text-[#0b213b] text-[15px] mb-4" data-v-ea817d89>Fiyat Detayı</h4><div class="flex justify-between items-center mb-2" data-v-ea817d89><span class="text-[13px] text-gray-600" data-v-ea817d89>Yat Kirası</span><span class="text-[13px] font-bold text-[#0b213b]" data-v-ea817d89>${ssrInterpolate(formatNumber(yachtTotal.value))} TL</span></div>`);
        if (extrasTotal.value > 0) {
          _push(`<div class="flex justify-between items-center mb-2" data-v-ea817d89><span class="text-[13px] text-gray-600" data-v-ea817d89>Ekstralar</span><span class="text-[13px] font-bold text-[#0b213b]" data-v-ea817d89>${ssrInterpolate(formatNumber(extrasTotal.value))} TL</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mt-auto" data-v-ea817d89><div class="flex justify-between items-center py-4 border-t border-gray-100" data-v-ea817d89><span class="text-[16px] font-bold text-[#0b213b]" data-v-ea817d89>Toplam</span><span class="text-[20px] font-black text-[#1d4e89]" data-v-ea817d89>${ssrInterpolate(formatNumber(grandTotal.value))} TL</span></div><div class="bg-[#f4f7fe] rounded-lg p-3 flex justify-between items-center" data-v-ea817d89><span class="text-[13px] text-gray-500" data-v-ea817d89>Depozito (50%)</span><span class="text-[14px] font-bold text-[#0b213b]" data-v-ea817d89>${ssrInterpolate(formatNumber(depositAmount.value))} TL</span></div></div></div></div></div><div class="border border-gray-200 rounded-[16px] p-4 flex items-center gap-3 cursor-pointer mb-6 hover:bg-gray-50 transition-colors" data-v-ea817d89><div class="${ssrRenderClass(["w-5 h-5 rounded-[4px] border-2 flex-shrink-0 flex items-center justify-center transition-all", acceptedTerms.value ? "bg-[#1a73e8] border-[#1a73e8]" : "bg-white border-gray-300"])}" data-v-ea817d89>`);
        if (acceptedTerms.value) {
          _push(`<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea817d89><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" data-v-ea817d89></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-[13px] text-gray-600 font-medium" data-v-ea817d89><span class="text-[#1a73e8] font-bold hover:underline" data-v-ea817d89>Kullanım Koşulları</span> okudum ve kabul ediyorum.</p></div><button type="button"${ssrIncludeBooleanAttr(!selectedYacht.value || !acceptedTerms.value || !hasLockId.value && !selectedTime.value || submitLoading.value) ? " disabled" : ""} class="${ssrRenderClass([
          "w-full py-4 rounded-[12px] font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-300 shadow-sm",
          selectedYacht.value && acceptedTerms.value && (hasLockId.value || selectedTime.value) && !submitLoading.value ? "bg-[#9ca3af] text-white hover:bg-[#868e96] hover:shadow-md cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
        ])}" data-v-ea817d89>`);
        if (submitLoading.value) {
          _push(`<svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" data-v-ea817d89><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-ea817d89></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-ea817d89></path></svg>`);
        } else {
          _push(`<span data-v-ea817d89>&gt;</span>`);
        }
        _push(`<span data-v-ea817d89>${ssrInterpolate(submitLoading.value ? "İşleniyor..." : "Öde ve Rezervasyonu Tamamla")}</span></button>`);
        if (!acceptedTerms.value || !selectedYacht.value || !hasLockId.value && !selectedTime.value) {
          _push(`<p class="text-center text-[11px] text-gray-400 mt-3" data-v-ea817d89>Devam etmek için ${ssrInterpolate((!acceptedTerms.value ? 1 : 0) + (!selectedYacht.value ? 1 : 0) + (!hasLockId.value && !selectedTime.value ? 1 : 0))} alan doldurulmalı</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rezervasyon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const rezervasyon = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ea817d89"]]);

export { rezervasyon as default };
//# sourceMappingURL=rezervasyon-BM6LN5I2.mjs.map
