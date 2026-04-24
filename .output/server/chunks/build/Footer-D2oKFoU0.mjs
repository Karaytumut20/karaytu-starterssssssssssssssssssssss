import { i as _export_sfc, g as useSupabaseUser, a as useSupabaseClient, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, openBlock, createBlock, createTextVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    useSupabaseClient();
    ref(false);
    const mobileOpen = ref(false);
    const navLinks = [
      { to: "/", label: "Ana Sayfa" },
      { to: "/yatlarimiz", label: "Yatlarımız" },
      { to: "/deneyimlerimiz", label: "Deneyimler" },
      { to: "/yat-kiralama-fiyatlari", label: "Fiyatlar" },
      { to: "/blog", label: "Blog" },
      { to: "/hakkimizda", label: "Hakkımızda" },
      { to: "/iletisim", label: "İletişim" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "w-full fixed top-0 left-0 right-0 z-[9999] bg-[#0C2340] shadow-lg shadow-black/20 transition-all duration-500" }, _attrs))}><div class="max-w-[1400px] mx-auto px-6 lg:px-12 h-[76px] flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-3 group shrink-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative w-9 h-9"${_scopeId}><svg viewBox="0 0 36 36" fill="none" class="w-full h-full"${_scopeId}><path d="M4 24 C10 18 14 14 18 10 C22 14 26 18 32 24" stroke="#C8A96E" stroke-width="2" stroke-linecap="round"${_scopeId}></path><path d="M2 28 H34" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round" opacity="0.5"${_scopeId}></path><path d="M18 10 L18 4" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round"${_scopeId}></path><path d="M18 4 L26 14" stroke="#C8A96E" stroke-width="1.5" stroke-linejoin="round"${_scopeId}></path></svg></div><div class="flex flex-col leading-none"${_scopeId}><span class="text-[17px] font-black text-white tracking-wide"${_scopeId}>YatigoTR</span><span class="text-[8px] text-[#C8A96E] font-medium uppercase tracking-[0.3em]"${_scopeId}>Yat Kiralama</span></div>`);
          } else {
            return [
              createVNode("div", { class: "relative w-9 h-9" }, [
                (openBlock(), createBlock("svg", {
                  viewBox: "0 0 36 36",
                  fill: "none",
                  class: "w-full h-full"
                }, [
                  createVNode("path", {
                    d: "M4 24 C10 18 14 14 18 10 C22 14 26 18 32 24",
                    stroke: "#C8A96E",
                    "stroke-width": "2",
                    "stroke-linecap": "round"
                  }),
                  createVNode("path", {
                    d: "M2 28 H34",
                    stroke: "#C8A96E",
                    "stroke-width": "1.5",
                    "stroke-linecap": "round",
                    opacity: "0.5"
                  }),
                  createVNode("path", {
                    d: "M18 10 L18 4",
                    stroke: "#C8A96E",
                    "stroke-width": "1.5",
                    "stroke-linecap": "round"
                  }),
                  createVNode("path", {
                    d: "M18 4 L26 14",
                    stroke: "#C8A96E",
                    "stroke-width": "1.5",
                    "stroke-linejoin": "round"
                  })
                ]))
              ]),
              createVNode("div", { class: "flex flex-col leading-none" }, [
                createVNode("span", { class: "text-[17px] font-black text-white tracking-wide" }, "YatigoTR"),
                createVNode("span", { class: "text-[8px] text-[#C8A96E] font-medium uppercase tracking-[0.3em]" }, "Yat Kiralama")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden lg:flex items-center gap-1"><!--[-->`);
      ssrRenderList(navLinks, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.to,
          to: link.to,
          class: "px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5",
          "exact-active-class": link.to === "/" ? "text-white" : "",
          "active-class": link.to !== "/" ? "text-[#C8A96E]" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="hidden lg:flex items-center gap-3">`);
      if (!unref(user)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/giris",
          class: "text-[13px] font-medium text-white/60 hover:text-white transition-colors px-3 py-2 flex items-center gap-1.5"
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
          class: "flex items-center gap-1.5 text-[13px] font-medium text-white/60 hover:text-white transition-colors px-3 py-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"${_scopeId}></path></svg> Hesabım `);
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
                createTextVNode(" Hesabım ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="absolute right-0 top-full mt-2 w-52 bg-[#0C2340] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/hesabim?tab=orders",
          class: "flex items-center gap-2 px-4 py-3 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Rezervasyonlarım`);
            } else {
              return [
                createTextVNode("Rezervasyonlarım")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/hesabim?tab=profile",
          class: "flex items-center gap-2 px-4 py-3 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Profilim`);
            } else {
              return [
                createTextVNode("Profilim")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="w-full text-left flex items-center gap-2 px-4 py-3 text-[13px] text-red-400 hover:bg-white/5 transition-colors">Çıkış Yap</button></div></div>`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/rezervasyon",
        class: "bg-[#C8A96E] text-[#0C2340] text-[13px] font-bold px-6 py-2.5 rounded-lg hover:bg-[#dbbf7e] transition-all shadow-md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Rezervasyon Yap `);
          } else {
            return [
              createTextVNode(" Rezervasyon Yap ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex lg:hidden items-center gap-3">`);
      if (unref(user)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/hesabim",
          class: "text-white/70"
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
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/giris",
          class: "text-white/70"
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
      _push(`<button class="text-white/80 p-1.5">`);
      if (!mobileOpen.value) {
        _push(`<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`);
      } else {
        _push(`<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
      }
      _push(`</button></div></div>`);
      if (mobileOpen.value) {
        _push(`<div class="lg:hidden bg-[#0C2340]/98 backdrop-blur-md border-t border-white/5 px-6 py-4"><div class="flex flex-col gap-1"><!--[-->`);
        ssrRenderList(navLinks, (link) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: link.to,
            to: link.to,
            onClick: ($event) => mobileOpen.value = false,
            class: "px-3 py-3 text-[14px] font-medium text-white/70 hover:text-white rounded-lg"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(link.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(link.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/rezervasyon",
          onClick: ($event) => mobileOpen.value = false,
          class: "mt-3 bg-[#C8A96E] text-[#0C2340] font-bold text-[14px] px-6 py-3 rounded-lg text-center"
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
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
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
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "w-full bg-[#0C2340] text-white pt-20 pb-0" }, _attrs))}><div class="max-w-[1400px] mx-auto px-6 lg:px-12 mb-20"><div class="border border-[#C8A96E]/20 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#0d2847]"><div><h2 class="text-[26px] md:text-[32px] font-bold text-white mb-2 leading-tight">Unutulmaz bir deneyim için<br><span class="text-[#C8A96E]">hemen rezervasyon yapın.</span></h2><p class="text-white/40 text-[14px]">Sınırlı kapasite · Erken rezervasyonda özel fiyat</p></div>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/rezervasyon",
    class: "shrink-0 bg-[#C8A96E] text-[#0C2340] font-semibold text-[14px] px-8 py-4 rounded-lg hover:bg-[#dbbf7e] transition-all shadow-lg whitespace-nowrap"
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
  _push(`</div></div><div class="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/8"><div>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: "flex items-center gap-3 mb-6"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<svg viewBox="0 0 36 36" fill="none" class="w-9 h-9"${_scopeId}><path d="M4 24 C10 18 14 14 18 10 C22 14 26 18 32 24" stroke="#C8A96E" stroke-width="2" stroke-linecap="round"${_scopeId}></path><path d="M2 28 H34" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round" opacity="0.5"${_scopeId}></path><path d="M18 10 L18 4" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round"${_scopeId}></path><path d="M18 4 L26 14" stroke="#C8A96E" stroke-width="1.5" stroke-linejoin="round"${_scopeId}></path></svg><div${_scopeId}><div class="text-[16px] font-black text-white"${_scopeId}>YatigoTR</div><div class="text-[8px] text-[#C8A96E] uppercase tracking-[0.3em] font-medium"${_scopeId}>Yatçılık</div></div>`);
      } else {
        return [
          (openBlock(), createBlock("svg", {
            viewBox: "0 0 36 36",
            fill: "none",
            class: "w-9 h-9"
          }, [
            createVNode("path", {
              d: "M4 24 C10 18 14 14 18 10 C22 14 26 18 32 24",
              stroke: "#C8A96E",
              "stroke-width": "2",
              "stroke-linecap": "round"
            }),
            createVNode("path", {
              d: "M2 28 H34",
              stroke: "#C8A96E",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              opacity: "0.5"
            }),
            createVNode("path", {
              d: "M18 10 L18 4",
              stroke: "#C8A96E",
              "stroke-width": "1.5",
              "stroke-linecap": "round"
            }),
            createVNode("path", {
              d: "M18 4 L26 14",
              stroke: "#C8A96E",
              "stroke-width": "1.5",
              "stroke-linejoin": "round"
            })
          ])),
          createVNode("div", null, [
            createVNode("div", { class: "text-[16px] font-black text-white" }, "YatigoTR"),
            createVNode("div", { class: "text-[8px] text-[#C8A96E] uppercase tracking-[0.3em] font-medium" }, "Yatçılık")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p class="text-white/40 text-[13px] leading-relaxed mb-6">İstanbul Boğazı&#39;nda 16 yıllık deneyimle özel yat kiralama ve organizasyon.</p><div class="flex gap-3"><a href="https://wa.me/908508403030" target="_blank" class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#25d366] hover:border-[#25d366]/30 transition-colors text-[11px] font-bold">WA</a><a href="https://instagram.com" target="_blank" class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#e1306c] hover:border-[#e1306c]/30 transition-colors text-[11px] font-bold">IG</a></div></div><div><h4 class="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C8A96E] mb-6">Keşfet</h4><ul class="space-y-3"><!--[-->`);
  ssrRenderList([["/yatlarimiz", "Yatlarımız"], ["/deneyimlerimiz", "Deneyimler"], ["/yat-kiralama-fiyatlari", "Fiyatlar"], ["/blog", "Blog"], ["/hakkimizda", "Hakkımızda"], ["/iletisim", "İletişim"]], (l) => {
    _push(`<li>`);
    _push(ssrRenderComponent(_component_NuxtLink, {
      to: l[0],
      class: "text-[13px] text-white/40 hover:text-white transition-colors"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(l[1])}`);
        } else {
          return [
            createTextVNode(toDisplayString(l[1]), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</li>`);
  });
  _push(`<!--]--></ul></div><div><h4 class="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C8A96E] mb-6">Turlar</h4><ul class="space-y-3"><!--[-->`);
  ssrRenderList([["/deneyimlerimiz/istanbul-bogazi-ozel-yat-turu", "Boğaz Turu"], ["/deneyimlerimiz/yemekli-yat-turu", "Yemekli Tur"], ["/deneyimlerimiz/adalar-yat-turu", "Adalar Turu"], ["/deneyimlerimiz/evlilik-teklifi", "Evlilik Teklifi"]], (l) => {
    _push(`<li>`);
    _push(ssrRenderComponent(_component_NuxtLink, {
      to: l[0],
      class: "text-[13px] text-white/40 hover:text-white transition-colors"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(l[1])}`);
        } else {
          return [
            createTextVNode(toDisplayString(l[1]), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</li>`);
  });
  _push(`<!--]--></ul></div><div><h4 class="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C8A96E] mb-6">İletişim</h4><ul class="space-y-4"><li><div class="text-[9px] text-[#C8A96E] uppercase tracking-wider mb-1">Telefon</div><a href="tel:+908508403030" class="text-[13px] text-white/60 hover:text-white">+90 850 840 30 30</a></li><li><div class="text-[9px] text-[#C8A96E] uppercase tracking-wider mb-1">E-posta</div><a href="mailto:info@yatigotr.com" class="text-[13px] text-white/60 hover:text-white">info@yatigotr.com</a></li><li><div class="text-[9px] text-[#C8A96E] uppercase tracking-wider mb-1">Adres</div><span class="text-[13px] text-white/60">Arnavutköy, Beşiktaş, İstanbul</span></li><li><div class="text-[9px] text-[#C8A96E] uppercase tracking-wider mb-1">Çalışma Saatleri</div><span class="text-[13px] text-white/60">09:00 – 02:00</span></li></ul></div></div><div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-3"><p class="text-[12px] text-white/20">© 2026 YatigoTR Yatçılık. Tüm hakları saklıdır.</p><div class="flex gap-5 text-[12px] text-white/20">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/gizlilik-politikasi",
    class: "hover:text-white/50 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Gizlilik`);
      } else {
        return [
          createTextVNode("Gizlilik")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/kullanim-kosullari",
    class: "hover:text-white/50 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Kullanım`);
      } else {
        return [
          createTextVNode("Kullanım")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/kvkk",
    class: "hover:text-white/50 transition-colors"
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
  _push(`</div></div></footer>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "Footer" });

export { __nuxt_component_0 as _, __nuxt_component_1 as a };
//# sourceMappingURL=Footer-D2oKFoU0.mjs.map
