import { g as useSupabaseUser, a as useSupabaseClient, u as useRoute, h as useRouter, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderTeleport } from 'vue/server-renderer';
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
  __name: "hesabim",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    useSupabaseClient();
    const route = useRoute();
    const router = useRouter();
    const activeTab = ref(route.query.tab ? String(route.query.tab) : "panel");
    const profileForm = ref({
      fullName: "",
      phone: ""
    });
    const savingProfile = ref(false);
    const profileSuccess = ref(false);
    const reservations = ref([]);
    const loading = ref(true);
    const activeReservationsCount = computed(() => reservations.value.filter((r) => r.status === "confirmed" || r.status === "pending").length);
    const completedReservationsCount = computed(() => reservations.value.filter((r) => r.status === "completed").length);
    const pendingPaymentsCount = computed(() => reservations.value.filter((r) => r.payment_status === "unpaid" || r.payment_status === "partial").length);
    const selectedRes = ref(null);
    const formatDate = (dateStr) => {
      if (!dateStr) return "-";
      const d = new Date(dateStr);
      return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    };
    const formatNumber = (num) => {
      if (!num) return "0";
      return num.toLocaleString("tr-TR");
    };
    const getStatusText = (status) => {
      const map = {
        "pending": "Onay Bekliyor",
        "confirmed": "Onaylandı",
        "completed": "Tamamlandı",
        "cancelled": "İptal Edildi"
      };
      return map[status] || status;
    };
    const getStatusClass = (status) => {
      const map = {
        "pending": "bg-yellow-100 text-yellow-700",
        "confirmed": "bg-green-100 text-green-700",
        "completed": "bg-blue-100 text-blue-700",
        "cancelled": "bg-red-100 text-red-700"
      };
      return map[status] || "bg-gray-100 text-gray-700";
    };
    const getPaymentText = (status) => {
      const map = {
        "unpaid": "Ödenmedi",
        "partial": "Kısmi Ödeme (Kapora)",
        "paid": "Ödendi",
        "refunded": "İade Edildi"
      };
      return map[status] || status;
    };
    const getPaymentClass = (status) => {
      const map = {
        "unpaid": "bg-red-100 text-red-700",
        "partial": "bg-yellow-100 text-yellow-700",
        "paid": "bg-green-100 text-green-700",
        "refunded": "bg-gray-100 text-gray-700"
      };
      return map[status] || "bg-gray-100 text-gray-700";
    };
    watch(() => route.query.tab, (newTab) => {
      if (newTab) activeTab.value = String(newTab);
    });
    watch(activeTab, (newTab) => {
      router.push({ query: { ...route.query, tab: newTab } });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans text-[#112135] bg-[#f8f9fc] min-h-screen py-10 lg:py-16" }, _attrs))}><div class="max-w-6xl mx-auto px-6"><div class="mb-8 flex items-center justify-between"><div><h1 class="text-3xl font-bold text-[#112135]">Hesabım</h1><p class="text-[#64748b] mt-2">Rezervasyonlarınızı, ödemelerinizi ve profilinizi buradan yönetebilirsiniz.</p></div><button class="bg-red-50 text-red-600 font-bold px-4 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 text-sm"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> Çıkış Yap </button></div><div class="grid grid-cols-1 md:grid-cols-12 gap-8"><div class="md:col-span-3"><div class="bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden sticky top-24"><nav class="flex flex-col"><button class="${ssrRenderClass(["px-6 py-4 text-left font-bold text-sm transition-colors border-b border-[#e2e8f0] flex items-center gap-3", activeTab.value === "panel" ? "bg-[#f0f9ff] text-[#215d8f] border-l-4 border-l-[#215d8f]" : "text-[#64748b] hover:bg-gray-50 border-l-4 border-l-transparent"])}"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> Hesap Özeti </button><button class="${ssrRenderClass(["px-6 py-4 text-left font-bold text-sm transition-colors border-b border-[#e2e8f0] flex items-center gap-3", activeTab.value === "orders" ? "bg-[#f0f9ff] text-[#215d8f] border-l-4 border-l-[#215d8f]" : "text-[#64748b] hover:bg-gray-50 border-l-4 border-l-transparent"])}"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> Rezervasyonlarım </button><button class="${ssrRenderClass(["px-6 py-4 text-left font-bold text-sm transition-colors border-b border-[#e2e8f0] flex items-center gap-3", activeTab.value === "payments" ? "bg-[#f0f9ff] text-[#215d8f] border-l-4 border-l-[#215d8f]" : "text-[#64748b] hover:bg-gray-50 border-l-4 border-l-transparent"])}"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg> Ödeme Geçmişi </button><button class="${ssrRenderClass(["px-6 py-4 text-left font-bold text-sm transition-colors flex items-center gap-3", activeTab.value === "profile" ? "bg-[#f0f9ff] text-[#215d8f] border-l-4 border-l-[#215d8f]" : "text-[#64748b] hover:bg-gray-50 border-l-4 border-l-transparent"])}"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> Profilim </button></nav></div></div><div class="md:col-span-9">`);
      if (activeTab.value === "panel") {
        _push(`<div class="space-y-6"><div class="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm flex items-center gap-4"><div class="w-16 h-16 rounded-full bg-[#f0f9ff] text-[#215d8f] flex items-center justify-center font-bold text-2xl uppercase">${ssrInterpolate(profileForm.value.fullName.charAt(0) || unref(user)?.email?.charAt(0) || "U")}</div><div><h2 class="text-xl font-bold text-[#112135]">Hoş Geldiniz, ${ssrInterpolate(profileForm.value.fullName || "Değerli Misafirimiz")}</h2><p class="text-[#64748b] text-sm">${ssrInterpolate(unref(user)?.email)}</p></div></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><div class="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm flex flex-col justify-center items-center text-center"><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div><span class="text-3xl font-black text-[#112135]">${ssrInterpolate(activeReservationsCount.value)}</span><span class="text-xs font-bold text-[#64748b] uppercase mt-1">Aktif Rezervasyon</span></div><div class="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm flex flex-col justify-center items-center text-center"><div class="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><span class="text-3xl font-black text-[#112135]">${ssrInterpolate(completedReservationsCount.value)}</span><span class="text-xs font-bold text-[#64748b] uppercase mt-1">Tamamlanan Tur</span></div><div class="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm flex flex-col justify-center items-center text-center"><div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-3"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><span class="text-3xl font-black text-[#112135]">${ssrInterpolate(pendingPaymentsCount.value)}</span><span class="text-xs font-bold text-[#64748b] uppercase mt-1">Bekleyen Ödeme</span></div></div></div>`);
      } else if (activeTab.value === "orders") {
        _push(`<div class="space-y-6"><div class="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-6"><h2 class="text-xl font-bold text-[#112135] mb-6">Rezervasyonlarım</h2>`);
        if (loading.value) {
          _push(`<div class="py-12 flex justify-center"><svg class="animate-spin h-8 w-8 text-[#215d8f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>`);
        } else if (reservations.value.length === 0) {
          _push(`<div class="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300"><svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><h3 class="text-lg font-bold text-[#112135] mb-1">Henüz Rezervasyonunuz Yok</h3><p class="text-[#64748b] text-sm mb-4">Lüks yat filomuzu inceleyip hemen rezervasyon yapabilirsiniz.</p>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/rezervasyon",
            class: "inline-block bg-[#215d8f] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#1a4a72] transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Hemen Rezervasyon Yap`);
              } else {
                return [
                  createTextVNode("Hemen Rezervasyon Yap")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="space-y-4"><!--[-->`);
          ssrRenderList(reservations.value, (res) => {
            _push(`<div class="border border-[#e2e8f0] rounded-xl p-5 hover:border-[#cbd5e1] transition-colors"><div class="flex flex-col md:flex-row justify-between md:items-center gap-4"><div><div class="flex items-center gap-2 mb-1"><h3 class="font-bold text-[#112135] text-lg">${ssrInterpolate(res.yacht_id?.name || "Özel Yat Turu")}</h3><span class="${ssrRenderClass([getStatusClass(res.status), "px-2 py-0.5 rounded text-[11px] font-bold uppercase"])}">${ssrInterpolate(getStatusText(res.status))}</span></div><p class="text-sm text-[#64748b]">Rezervasyon Kodu: <span class="font-mono text-[#112135]">${ssrInterpolate(res.id.split("-")[0].toUpperCase())}</span></p></div><div class="text-left md:text-right"><div class="text-[#215d8f] font-bold text-xl">${ssrInterpolate(formatNumber(res.total_price))} TL</div><div class="text-xs font-bold text-[#64748b] uppercase">${ssrInterpolate(res.guest_count)} Kişi • ${ssrInterpolate(res.duration_hours)} Saat</div></div></div><div class="w-full h-px bg-gray-100 my-4"></div><div class="flex flex-wrap items-center gap-6"><div class="flex items-center gap-2"><svg class="w-4 h-4 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span class="text-sm font-medium text-[#112135]">${ssrInterpolate(formatDate(res.booking_date))}</span></div><div class="flex items-center gap-2"><svg class="w-4 h-4 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="text-sm font-medium text-[#112135]">${ssrInterpolate(res.start_time.substring(0, 5))}</span></div><div class="ml-auto w-full md:w-auto"><button class="w-full md:w-auto px-4 py-2 bg-[#f8fafc] border border-[#e2e8f0] text-[#112135] text-sm font-bold rounded-lg hover:bg-[#f1f5f9] transition-colors">Detayları Gör</button></div></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div></div>`);
      } else if (activeTab.value === "payments") {
        _push(`<div class="space-y-6"><div class="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-6"><h2 class="text-xl font-bold text-[#112135] mb-6">Ödeme Geçmişi</h2>`);
        if (loading.value) {
          _push(`<div class="py-12 flex justify-center"><svg class="animate-spin h-8 w-8 text-[#215d8f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>`);
        } else if (reservations.value.length === 0) {
          _push(`<div class="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300"><svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg><h3 class="text-lg font-bold text-[#112135] mb-1">Ödeme Kaydı Bulunamadı</h3><p class="text-[#64748b] text-sm mb-4">Sisteme kayıtlı ödeme işleminiz bulunmamaktadır.</p></div>`);
        } else {
          _push(`<div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead class="bg-[#f8fafc] text-[#64748b] uppercase text-xs font-bold border-y border-[#e2e8f0]"><tr><th class="px-4 py-3">Rez. Kodu</th><th class="px-4 py-3">Tarih</th><th class="px-4 py-3">Tutar</th><th class="px-4 py-3">Ön Ödeme</th><th class="px-4 py-3">Durum</th></tr></thead><tbody class="divide-y divide-[#e2e8f0]"><!--[-->`);
          ssrRenderList(reservations.value, (res) => {
            _push(`<tr class="hover:bg-gray-50"><td class="px-4 py-4 font-mono font-medium text-[#112135]">${ssrInterpolate(res.id.split("-")[0].toUpperCase())}</td><td class="px-4 py-4 text-[#64748b]">${ssrInterpolate(formatDate(res.booking_date))}</td><td class="px-4 py-4 font-bold text-[#112135]">${ssrInterpolate(formatNumber(res.total_price))} TL</td><td class="px-4 py-4 text-[#64748b]">${ssrInterpolate(formatNumber(res.prepayment_amount))} TL</td><td class="px-4 py-4"><span class="${ssrRenderClass([getPaymentClass(res.payment_status), "px-2 py-1 rounded text-xs font-bold uppercase"])}">${ssrInterpolate(getPaymentText(res.payment_status))}</span></td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
        }
        _push(`</div></div>`);
      } else if (activeTab.value === "profile") {
        _push(`<div class="space-y-6"><div class="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-6"><h2 class="text-xl font-bold text-[#112135] mb-6">Profil Bilgileri</h2><form class="max-w-md space-y-5"><div><label class="block text-[13px] font-bold text-[#112135] mb-2">Ad Soyad</label><input type="text"${ssrRenderAttr("value", profileForm.value.fullName)} class="w-full h-[46px] bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 text-sm text-[#112135] outline-none focus:border-[#215d8f] focus:bg-white transition-colors"></div><div><label class="block text-[13px] font-bold text-[#112135] mb-2">Telefon Numarası</label><div class="flex bg-[#f8fafc] border border-[#e2e8f0] rounded-lg h-[46px] focus-within:border-[#215d8f] focus-within:bg-white overflow-hidden transition-colors"><div class="flex items-center px-3 border-r border-[#e2e8f0] bg-transparent shrink-0 text-sm text-[#64748b]"> +90 </div><input type="tel"${ssrRenderAttr("value", profileForm.value.phone)} placeholder="501 234 56 78" class="w-full h-full bg-transparent px-3 text-sm text-[#112135] outline-none"></div></div><div><label class="block text-[13px] font-bold text-[#112135] mb-2">E-posta Adresi (Değiştirilemez)</label><input type="email"${ssrRenderAttr("value", unref(user)?.email)} disabled class="w-full h-[46px] bg-gray-100 border border-[#e2e8f0] rounded-lg px-3 text-sm text-[#94a3b8] cursor-not-allowed"></div><button type="submit"${ssrIncludeBooleanAttr(savingProfile.value) ? " disabled" : ""} class="w-full h-[46px] bg-[#215d8f] text-white font-bold rounded-lg mt-2 hover:bg-[#1a4a72] transition-colors disabled:opacity-70 flex items-center justify-center">`);
        if (savingProfile.value) {
          _push(`<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(savingProfile.value ? "Kaydediliyor..." : "Değişiklikleri Kaydet")}</button>`);
        if (profileSuccess.value) {
          _push(`<p class="text-green-600 text-sm font-bold text-center mt-2">Profiliniz başarıyla güncellendi!</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (selectedRes.value) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"><div class="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"><div class="px-6 py-4 border-b border-[#e2e8f0] flex justify-between items-center bg-[#f8fafc]"><h3 class="text-lg font-bold text-[#112135]">Rezervasyon Detayı</h3><button class="text-[#64748b] hover:text-[#112135] transition-colors"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-6 overflow-y-auto"><div class="flex items-center justify-between mb-6"><div><p class="text-xs font-bold text-[#64748b] uppercase mb-1">Kayıt No</p><p class="font-mono text-sm text-[#112135]">${ssrInterpolate(selectedRes.value.id)}</p></div><div class="text-right"><span class="${ssrRenderClass([getStatusClass(selectedRes.value.status), "px-3 py-1 rounded text-xs font-bold uppercase"])}">${ssrInterpolate(getStatusText(selectedRes.value.status))}</span></div></div><div class="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4 mb-6 grid grid-cols-2 gap-y-4 gap-x-2"><div><p class="text-xs font-bold text-[#64748b] mb-1">Yat Adı</p><p class="text-sm font-bold text-[#112135]">${ssrInterpolate(selectedRes.value.yacht_id?.name || "-")}</p></div><div><p class="text-xs font-bold text-[#64748b] mb-1">Tarih</p><p class="text-sm font-bold text-[#112135]">${ssrInterpolate(formatDate(selectedRes.value.booking_date))}</p></div><div><p class="text-xs font-bold text-[#64748b] mb-1">Saat / Süre</p><p class="text-sm font-bold text-[#112135]">${ssrInterpolate(selectedRes.value.start_time.substring(0, 5))} / ${ssrInterpolate(selectedRes.value.duration_hours)} Saat</p></div><div><p class="text-xs font-bold text-[#64748b] mb-1">Misafir</p><p class="text-sm font-bold text-[#112135]">${ssrInterpolate(selectedRes.value.guest_count)} Kişi</p></div></div><div class="border border-[#e2e8f0] rounded-lg overflow-hidden"><div class="bg-[#f8fafc] px-4 py-2 border-b border-[#e2e8f0]"><h4 class="text-xs font-bold text-[#64748b] uppercase">Finansal Özet</h4></div><div class="p-4 space-y-3"><div class="flex justify-between text-sm"><span class="text-[#64748b]">Toplam Tutar</span><span class="font-bold text-[#112135]">${ssrInterpolate(formatNumber(selectedRes.value.total_price))} TL</span></div><div class="flex justify-between text-sm"><span class="text-[#64748b]">Ön Ödeme (Kapora)</span><span class="font-bold text-[#112135]">${ssrInterpolate(formatNumber(selectedRes.value.prepayment_amount))} TL</span></div><div class="flex justify-between text-sm pt-3 border-t border-dashed border-[#e2e8f0]"><span class="font-bold text-[#112135]">Kalan Tutar</span><span class="font-bold text-red-600">${ssrInterpolate(formatNumber(selectedRes.value.total_price - selectedRes.value.prepayment_amount))} TL</span></div></div></div>`);
          if (selectedRes.value.notes) {
            _push2(`<div class="mt-6 border border-[#e2e8f0] rounded-lg p-4 bg-[#f8fafc]"><h4 class="text-xs font-bold text-[#64748b] uppercase mb-2">Notlarınız</h4><p class="text-sm text-[#112135]">${ssrInterpolate(selectedRes.value.notes)}</p></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="px-6 py-4 border-t border-[#e2e8f0] bg-[#f8fafc] flex justify-end"><button class="px-6 py-2 bg-[#215d8f] text-white text-sm font-bold rounded-lg hover:bg-[#1a4a72] transition-colors">Kapat</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/hesabim.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=hesabim-CPnM4YGE.mjs.map
