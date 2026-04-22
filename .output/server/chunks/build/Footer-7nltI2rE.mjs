import { h as _export_sfc, f as useSupabaseUser, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useSupabaseClient } from './useSupabaseClient-4v4x5xwK.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    useSupabaseClient();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "w-full bg-white text-[#1a365d] border-b border-gray-100 sticky top-0 z-[9999] shadow-sm" }, _attrs))}><div class="w-full grid grid-cols-14"><div class="col-start-3 col-end-13 w-full h-20 flex items-center justify-between"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex flex-col items-start leading-none group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-2xl font-black tracking-tight text-[#007bff] flex items-center gap-1 group-hover:text-[#1a365d] transition-colors"${_scopeId}><svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"${_scopeId}><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"${_scopeId}></path></svg> YatigoTR </span>`);
          } else {
            return [
              createVNode("span", { class: "text-2xl font-black tracking-tight text-[#007bff] flex items-center gap-1 group-hover:text-[#1a365d] transition-colors" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-8 h-8",
                  viewBox: "0 0 24 24",
                  fill: "currentColor"
                }, [
                  createVNode("path", { d: "M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" })
                ])),
                createTextVNode(" YatigoTR ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden lg:flex items-center gap-6 text-sm font-bold opacity-80">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        "exact-active-class": "text-[#007bff] border-b-2 border-[#007bff] opacity-100",
        class: "hover:text-[#007bff] transition-colors pb-1"
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
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/yatlarimiz",
        "active-class": "text-[#007bff] border-b-2 border-[#007bff] opacity-100",
        class: "hover:text-[#007bff] transition-colors pb-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Yatlarımız`);
          } else {
            return [
              createTextVNode("Yatlarımız")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/deneyimlerimiz",
        "active-class": "text-[#007bff] border-b-2 border-[#007bff] opacity-100",
        class: "hover:text-[#007bff] transition-colors pb-1"
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
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/yat-kiralama-fiyatlari",
        "active-class": "text-[#007bff] border-b-2 border-[#007bff] opacity-100",
        class: "hover:text-[#007bff] transition-colors pb-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Fiyatlar`);
          } else {
            return [
              createTextVNode("Fiyatlar")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blog",
        "active-class": "text-[#007bff] border-b-2 border-[#007bff] opacity-100",
        class: "hover:text-[#007bff] transition-colors pb-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Blog`);
          } else {
            return [
              createTextVNode("Blog")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/hakkimizda",
        "active-class": "text-[#007bff] border-b-2 border-[#007bff] opacity-100",
        class: "hover:text-[#007bff] transition-colors pb-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Hakkımızda`);
          } else {
            return [
              createTextVNode("Hakkımızda")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/iletisim",
        "active-class": "text-[#007bff] border-b-2 border-[#007bff] opacity-100",
        class: "hover:text-[#007bff] transition-colors pb-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`İletişim`);
          } else {
            return [
              createTextVNode("İletişim")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden lg:flex items-center gap-4"><div class="flex items-center text-xs font-bold bg-[#f8f9fa] rounded-full p-1 border border-gray-200"><span class="bg-[#1a365d] text-white px-3 py-1.5 rounded-full cursor-pointer">TR</span><span class="text-gray-500 px-3 py-1.5 cursor-pointer hover:text-[#1a365d]">EN</span></div>`);
      if (!unref(user)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/giris",
          class: "flex items-center gap-2 text-sm font-bold hover:text-[#007bff] transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"${_scopeId}></path></svg> Giriş `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  })
                ])),
                createTextVNode(" Giriş ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="relative group">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/hesabim",
          class: "flex items-center gap-2 text-sm font-bold text-[#007bff] hover:text-[#1a365d] transition-colors py-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> Hesabım `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])),
                createTextVNode(" Hesabım ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="absolute right-0 top-full w-48 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/hesabim",
          class: "px-4 py-3 text-sm text-[#1a365d] hover:bg-gray-50 hover:text-[#007bff] font-medium flex items-center gap-2 border-b border-gray-50"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"${_scopeId}></path></svg> Panel `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  })
                ])),
                createTextVNode(" Panel ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/hesabim?tab=rezervasyonlarim",
          class: "px-4 py-3 text-sm text-[#1a365d] hover:bg-gray-50 hover:text-[#007bff] font-medium flex items-center gap-2 border-b border-gray-50"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg> Rezervasyonlarım `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  })
                ])),
                createTextVNode(" Rezervasyonlarım ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/hesabim?tab=odeme",
          class: "px-4 py-3 text-sm text-[#1a365d] hover:bg-gray-50 hover:text-[#007bff] font-medium flex items-center gap-2 border-b border-gray-50"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"${_scopeId}></path></svg> Ödeme Geçmişi `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  })
                ])),
                createTextVNode(" Ödeme Geçmişi ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/hesabim?tab=profil",
          class: "px-4 py-3 text-sm text-[#1a365d] hover:bg-gray-50 hover:text-[#007bff] font-medium flex items-center gap-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg> Profilim `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  }),
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  })
                ])),
                createTextVNode(" Profilim ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-bold flex items-center gap-2 border-t border-gray-100 text-left w-full transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> Çıkış Yap </button></div></div>`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/rezervasyon",
        class: "bg-[#1a365d] text-white text-sm font-bold px-6 py-2.5 rounded-xl flex items-center justify-center hover:bg-[#0f2847] transition-colors shadow-md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Rezervasyon → `);
          } else {
            return [
              createTextVNode(" Rezervasyon → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex lg:hidden items-center gap-4">`);
      if (unref(user)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/hesabim",
          class: "text-[#007bff]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/giris",
          class: "text-[#1a365d]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`<button class="text-[#1a365d]"><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg></button></div></div></div></nav>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "Navbar" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "w-full bg-[#f8f9fa] pt-16 pb-8 border-t border-gray-200 text-[#1a365d]" }, _attrs))}><div class="w-full grid grid-cols-14 mb-12"><div class="col-start-3 col-end-13 grid grid-cols-1 md:grid-cols-4 gap-12"><div class="flex flex-col gap-4">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: "flex items-center gap-2"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<svg class="w-8 h-8 text-[#007bff]" viewBox="0 0 24 24" fill="currentColor"${_scopeId}><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"${_scopeId}></path></svg><span class="text-xl font-black text-[#1a365d] tracking-tight"${_scopeId}>YatigoTR YATÇILIK</span>`);
      } else {
        return [
          (openBlock(), createBlock("svg", {
            class: "w-8 h-8 text-[#007bff]",
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            createVNode("path", { d: "M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" })
          ])),
          createVNode("span", { class: "text-xl font-black text-[#1a365d] tracking-tight" }, "YatigoTR YATÇILIK")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p class="text-gray-500 text-sm mt-2"> Özel Boğaz Turu ve İstanbul Yat Kiralama. </p></div><div><h4 class="font-bold text-lg mb-6">Hızlı Linkler</h4><ul class="flex flex-col gap-3 text-sm text-gray-500 font-medium"><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/yatlarimiz",
    class: "hover:text-[#007bff] transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Yatlarımız`);
      } else {
        return [
          createTextVNode("Yatlarımız")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/yat-turu-organizasyon",
    class: "hover:text-[#007bff] transition-colors"
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
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/yat-kiralama-fiyatlari",
    class: "hover:text-[#007bff] transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Fiyatlar`);
      } else {
        return [
          createTextVNode("Fiyatlar")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/rezervasyon",
    class: "hover:text-[#007bff] transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Rezervasyon`);
      } else {
        return [
          createTextVNode("Rezervasyon")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/odeme",
    class: "hover:text-[#007bff] transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Online Ödeme`);
      } else {
        return [
          createTextVNode("Online Ödeme")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/blog",
    class: "hover:text-[#007bff] transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Blog`);
      } else {
        return [
          createTextVNode("Blog")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="mt-2">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/iletisim",
    class: "hover:text-[#007bff] transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`İletişim`);
      } else {
        return [
          createTextVNode("İletişim")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/hakkimizda",
    class: "hover:text-[#007bff] transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Hakkımızda`);
      } else {
        return [
          createTextVNode("Hakkımızda")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/sikca-sorulanlar",
    class: "hover:text-[#007bff] transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`S.S.S.`);
      } else {
        return [
          createTextVNode("S.S.S.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div><div><h4 class="font-bold text-lg mb-6">Popüler Turlar</h4><ul class="flex flex-col gap-3 text-sm text-gray-500 font-medium"><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/yat-turu-organizasyon/istanbul-bogazi-ozel-yat-turu",
    class: "hover:text-[#007bff] transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`İstanbul Boğazı Özel Yat Turu`);
      } else {
        return [
          createTextVNode("İstanbul Boğazı Özel Yat Turu")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/yat-turu-organizasyon/yemekli-yat-turu",
    class: "hover:text-[#007bff] transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Yemekli Yat Turu`);
      } else {
        return [
          createTextVNode("Yemekli Yat Turu")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/yat-turu-organizasyon/istanbul-adalar-yat-turu",
    class: "hover:text-[#007bff] transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Adalar Yat Turu`);
      } else {
        return [
          createTextVNode("Adalar Yat Turu")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/yat-turu-organizasyon/yatta-evlenme-teklifi",
    class: "hover:text-[#007bff] transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Yatta Evlenme Teklifi`);
      } else {
        return [
          createTextVNode("Yatta Evlenme Teklifi")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div><div><h4 class="font-bold text-lg mb-6">İletişim</h4><ul class="flex flex-col gap-4 text-sm text-gray-500 font-medium"><li class="flex items-start gap-3"><svg class="w-5 h-5 text-[#007bff] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg><a href="tel:+908508403030" class="hover:text-[#1a365d]">+90 850 840 30 30</a></li><li class="flex items-start gap-3"><svg class="w-5 h-5 text-[#007bff] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg><a href="mailto:info@suyat.com.tr" class="hover:text-[#1a365d]">info@suyat.com.tr</a></li><li class="flex items-start gap-3"><svg class="w-5 h-5 text-[#007bff] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><span>Arnavutköy Mh. Eğlence Sok. No:14/1 Beşiktaş İstanbul</span></li><li class="flex items-start gap-3"><svg class="w-5 h-5 text-[#007bff] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>09:00 - 02:00</span></li></ul></div></div></div><div class="w-full grid grid-cols-14 border-t border-gray-200 pt-8 text-sm text-gray-500 font-medium"><div class="col-start-3 col-end-13 flex flex-col md:flex-row justify-between items-center"><p>© 2026 YatigoTR Yatçılık. Tüm hakları saklıdır.</p><div class="flex gap-6 mt-4 md:mt-0">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/gizlilik-politikasi",
    class: "hover:text-[#1a365d]"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Gizlilik Politikası`);
      } else {
        return [
          createTextVNode("Gizlilik Politikası")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/kullanim-kosullari",
    class: "hover:text-[#1a365d]"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Kullanım Koşulları`);
      } else {
        return [
          createTextVNode("Kullanım Koşulları")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/kvkk",
    class: "hover:text-[#1a365d]"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`KVKK`);
      } else {
        return [
          createTextVNode("KVKK")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></footer>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "Footer" });

export { __nuxt_component_0 as _, __nuxt_component_1 as a };
//# sourceMappingURL=Footer-7nltI2rE.mjs.map
