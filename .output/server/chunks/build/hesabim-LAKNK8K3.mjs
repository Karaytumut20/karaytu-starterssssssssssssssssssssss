import { f as useSupabaseUser, u as useRoute, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, watch, computed, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "hesabim",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    useSupabaseClient();
    const route = useRoute();
    const activeTab = ref("panel");
    watch(() => route.query.tab, (newTab) => {
      if (newTab && ["panel", "orders", "payments", "profile"].includes(newTab)) {
        activeTab.value = newTab;
      }
    }, { immediate: true });
    const profileForm = ref({
      fullName: ""
    });
    const successMsg = ref("");
    const fullName = computed(() => {
      return user.value?.user_metadata?.full_name || "Misafir Kullanıcı";
    });
    const realCreatedAt = ref(null);
    const memberSince = computed(() => {
      if (!realCreatedAt.value) return "Yükleniyor...";
      try {
        const date = new Date(realCreatedAt.value);
        return date.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\./g, "/");
      } catch (e) {
        return "Hata";
      }
    });
    const ordersList = ref([]);
    const loadingOrders = ref(false);
    const isOrderModalOpen = ref(false);
    const selectedOrder = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#f8f9fa] py-10 font-sans" }, _attrs))}><div class="w-full grid grid-cols-14"><div class="col-start-3 col-end-13 w-full"><div class="flex items-center gap-2 border-b border-gray-200 pb-4 mb-8 overflow-x-auto"><button class="${ssrRenderClass(["px-5 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 whitespace-nowrap", activeTab.value === "panel" ? "bg-[#1a365d] text-white shadow-sm" : "text-gray-500 hover:text-[#1a365d] bg-transparent"])}"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> Panel </button><button class="${ssrRenderClass(["px-5 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 whitespace-nowrap", activeTab.value === "orders" ? "bg-[#1a365d] text-white shadow-sm" : "text-gray-500 hover:text-[#1a365d] bg-transparent"])}"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> Rezervasyonlarım </button><button class="${ssrRenderClass(["px-5 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 whitespace-nowrap", activeTab.value === "payments" ? "bg-[#1a365d] text-white shadow-sm" : "text-gray-500 hover:text-[#1a365d] bg-transparent"])}"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg> Ödeme Geçmişi </button><button class="${ssrRenderClass(["px-5 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 whitespace-nowrap", activeTab.value === "profile" ? "bg-[#1a365d] text-white shadow-sm" : "text-gray-500 hover:text-[#1a365d] bg-transparent"])}"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Profilim </button></div>`);
      if (activeTab.value === "panel") {
        _push(`<div><div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"><div><h1 class="text-[28px] font-black text-[#1a365d] tracking-tight mb-1">Tekrar hoş geldiniz, ${ssrInterpolate(fullName.value)}!</h1><p class="text-gray-500 text-sm font-medium">Hesabım</p></div><div class="bg-[#e0f2fe] text-[#0369a1] px-5 py-2 rounded-full font-bold text-sm shadow-sm inline-flex items-center w-fit border border-[#bae6fd]"> Standart Üye </div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"><div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-[#f8fafc] border border-gray-100 flex items-center justify-center text-[#64748b]"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div><div><p class="text-xs text-gray-500 font-bold mb-1">Toplam Rezervasyon</p><p class="text-2xl font-black text-[#112135]">${ssrInterpolate(ordersList.value.length)}</p></div></div><div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-[#eff6ff] flex items-center justify-center text-[#3b82f6]"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><p class="text-xs text-gray-500 font-bold mb-1">Son Rezervasyon</p><p class="text-2xl font-black text-[#112135]">${ssrInterpolate(ordersList.value.length > 0 ? new Date(ordersList.value[0].created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "short" }) : "-")}</p></div></div><div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-[#faf5ff] flex items-center justify-center text-[#a855f7]"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div><div><p class="text-xs text-gray-500 font-bold mb-1">Üyelik Tarihi</p><p class="text-2xl font-black text-[#112135]">${ssrInterpolate(memberSince.value)}</p></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col"><div class="p-6 border-b border-gray-50 flex justify-between items-center"><h3 class="font-bold text-[#112135] text-lg">Yaklaşan Rezervasyonlar</h3><button class="text-[13px] font-bold text-[#64748b] hover:text-[#1a365d] transition-colors"> Tüm Rezervasyonları Görüntüle → </button></div><div class="p-12 flex-grow flex flex-col items-center justify-center text-center"><div class="w-16 h-16 mb-4 text-gray-400"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div><p class="text-[#64748b] font-medium mb-6 text-[15px]">Yaklaşan rezervasyonunuz bulunmuyor.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/rezervasyon",
          class: "bg-[#1a365d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0f2847] transition-colors shadow-sm text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Yeni Rezervasyon `);
            } else {
              return [
                createTextVNode(" Yeni Rezervasyon ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col"><div class="p-6 border-b border-gray-50"><h3 class="font-bold text-[#112135] text-lg">Hızlı İşlemler</h3></div><div class="p-6 space-y-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/rezervasyon",
          class: "flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-10 h-10 rounded-lg bg-[#f0f9ff] flex items-center justify-center text-[#1a365d]"${_scopeId}><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg></div><span class="font-bold text-sm text-[#112135] group-hover:text-[#007bff] transition-colors"${_scopeId}>Yeni Rezervasyon</span>`);
            } else {
              return [
                createVNode("div", { class: "w-10 h-10 rounded-lg bg-[#f0f9ff] flex items-center justify-center text-[#1a365d]" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 4v16m8-8H4"
                    })
                  ]))
                ]),
                createVNode("span", { class: "font-bold text-sm text-[#112135] group-hover:text-[#007bff] transition-colors" }, "Yeni Rezervasyon")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<a href="https://wa.me/905320000000" target="_blank" class="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group"><div class="w-10 h-10 rounded-lg bg-[#dcfce7] flex items-center justify-center text-[#22c55e]"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg></div><span class="font-bold text-sm text-[#112135] group-hover:text-[#22c55e] transition-colors">Destek</span></a></div></div></div></div>`);
      } else if (activeTab.value === "orders") {
        _push(`<div>`);
        if (loadingOrders.value) {
          _push(`<div class="text-center py-12 text-gray-500 font-medium">Sipariş verileriniz yükleniyor...</div>`);
        } else if (ordersList.value.length === 0) {
          _push(`<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"><h3 class="text-xl font-bold text-[#1a365d] mb-2">Henüz rezervasyonunuz bulunmuyor</h3><p class="text-gray-500 mb-6">Mevcut bir rezervasyonunuz olduğunda bu ekrandan takip edebilirsiniz.</p>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/rezervasyon",
            class: "bg-[#1a365d] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#0f2847] transition-colors inline-block"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Rezervasyon Yap`);
              } else {
                return [
                  createTextVNode("Rezervasyon Yap")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="space-y-4"><!--[-->`);
          ssrRenderList(ordersList.value, (order) => {
            _push(`<div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center cursor-pointer hover:border-[#cbd5e1] hover:shadow-md transition-all"><div class="flex-1"><div class="flex items-center gap-3 mb-2"><h3 class="text-lg font-bold text-[#1a365d]">${ssrInterpolate(order.yachts?.name || "Özel Tur")}</h3><span class="${ssrRenderClass(["px-2.5 py-1 text-xs font-bold rounded-lg", order.status === "pending" ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"])}">${ssrInterpolate(order.status === "pending" ? "Onay Bekliyor" : "Onaylandı")}</span></div><p class="text-gray-500 text-sm font-medium mb-1"><strong class="text-gray-700">Tarih:</strong> ${ssrInterpolate(order.booking_date)} | ${ssrInterpolate(order.start_time)}</p><p class="text-gray-500 text-sm font-medium"><strong class="text-gray-700">Süre:</strong> ${ssrInterpolate(order.duration_hours)} Saat | <strong class="text-gray-700">Kişi:</strong> ${ssrInterpolate(order.guest_count)}</p></div><div class="md:text-right border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 w-full md:w-auto"><p class="text-[12px] text-gray-500 font-bold uppercase mb-1">Toplam Tutar</p><p class="text-xl font-black text-[#0ea5e9]">${ssrInterpolate(order.total_price.toLocaleString("tr-TR"))} TL</p>`);
            if (order.payment_status === "unpaid") {
              _push(`<p class="text-xs text-red-500 font-bold mt-1">Ödenen Kapora: 0 TL</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else if (activeTab.value === "payments") {
        _push(`<div><div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"><h3 class="text-xl font-bold text-[#1a365d] mb-2">Ödeme geçmişi bulunamadı</h3><p class="text-gray-500">Önceki ödemeleriniz ve faturalarınız burada listelenecektir.</p></div></div>`);
      } else if (activeTab.value === "profile") {
        _push(`<div><div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl"><h3 class="text-xl font-bold text-[#1a365d] mb-6">Hesap Ayarları</h3><form class="space-y-5"><div><label class="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label><input type="text"${ssrRenderAttr("value", profileForm.value.fullName)} class="w-full py-2 border border-gray-300 rounded-lg focus:ring-[#007bff] focus:border-[#007bff]"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">E-posta Adresi (Değiştirilemez)</label><input type="email"${ssrRenderAttr("value", unref(user)?.email)} disabled class="w-full py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"></div><div class="pt-4 border-t border-gray-100"><button type="submit" class="bg-[#1a365d] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#0f2847] transition-colors">Bilgileri Güncelle</button>`);
        if (successMsg.value) {
          _push(`<p class="mt-3 text-sm text-green-600 font-medium">${ssrInterpolate(successMsg.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (isOrderModalOpen.value && selectedOrder.value) {
        _push(`<div class="fixed inset-0 z-[100] flex items-center justify-center bg-[#112135]/60 backdrop-blur-sm p-4"><div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fadeIn"><div class="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10"><div><h3 class="text-xl font-bold text-[#1a365d]">Rezervasyon Detayı</h3><p class="text-sm text-gray-500 mt-1">Sipariş ID: <span class="uppercase font-mono text-xs">${ssrInterpolate(selectedOrder.value.id.split("-")[0])}</span></p></div><button class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-6 space-y-8"><div class="flex items-center gap-4 bg-[#f8fafc] p-4 rounded-xl border border-gray-100"><span class="${ssrRenderClass(["px-3 py-1.5 text-sm font-bold rounded-lg", selectedOrder.value.status === "pending" ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"])}">${ssrInterpolate(selectedOrder.value.status === "pending" ? "Onay Bekliyor" : "Onaylandı")}</span><p class="text-sm text-gray-500 font-medium">Bu rezervasyonunuz sistemimizde kayıtlıdır ve `);
        if (selectedOrder.value.status === "pending") {
          _push(`<span>onaylanması beklenmektedir.</span>`);
        } else {
          _push(`<span>başarıyla onaylanmıştır.</span>`);
        }
        _push(`</p></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-6"><div><p class="text-xs text-gray-500 font-bold uppercase mb-1">Müşteri Bilgileri</p><p class="font-medium text-[#112135]">${ssrInterpolate(selectedOrder.value.full_name)}</p><p class="text-sm text-gray-600">${ssrInterpolate(selectedOrder.value.phone_number)}</p><p class="text-sm text-gray-600">${ssrInterpolate(selectedOrder.value.email)}</p></div><div><p class="text-xs text-gray-500 font-bold uppercase mb-1">Tarih &amp; Zaman</p><p class="font-medium text-[#112135]">${ssrInterpolate(selectedOrder.value.booking_date)}</p><p class="text-sm text-gray-600">Saat: ${ssrInterpolate(selectedOrder.value.start_time)}</p><p class="text-sm text-gray-600">Süre: ${ssrInterpolate(selectedOrder.value.duration_hours)} Saat</p></div></div><div class="border-t border-gray-100 pt-6"><p class="text-xs text-gray-500 font-bold uppercase mb-4">Organizasyon Detayları</p><div class="bg-gray-50 rounded-xl p-4 space-y-3"><div class="flex justify-between items-center pb-3 border-b border-gray-200"><span class="text-gray-600 text-sm">Seçilen Yat</span><span class="font-bold text-[#112135]">${ssrInterpolate(selectedOrder.value.yachts?.name || "Özel Tur")}</span></div><div class="flex justify-between items-center pb-3 border-b border-gray-200"><span class="text-gray-600 text-sm">Kişi Sayısı</span><span class="font-bold text-[#112135]">${ssrInterpolate(selectedOrder.value.guest_count)} Kişi</span></div>`);
        if (selectedOrder.value.notes) {
          _push(`<div class="pt-1"><span class="text-gray-600 text-sm block mb-1">Müşteri Notu:</span><p class="text-sm font-medium text-gray-800 italic">&quot;${ssrInterpolate(selectedOrder.value.notes)}&quot;</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="border-t border-gray-100 pt-6"><div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#f0f9ff] p-5 rounded-xl border border-sky-100"><div><p class="text-sm text-sky-800 font-medium mb-1">Özet Fiyatlandırma</p><p class="text-[12px] text-sky-600">Ödenen Kapora: <strong class="text-sky-800">${ssrInterpolate(selectedOrder.value.payment_status === "unpaid" ? "0 TL (Bekliyor)" : selectedOrder.value.prepayment_amount.toLocaleString("tr-TR") + " TL")}</strong></p></div><div class="text-left md:text-right"><p class="text-[12px] text-sky-600 font-bold uppercase">Toplam Tutar</p><p class="text-2xl font-black text-[#0ea5e9]">${ssrInterpolate(selectedOrder.value.total_price.toLocaleString("tr-TR"))} TL</p></div></div></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/hesabim.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=hesabim-LAKNK8K3.mjs.map
