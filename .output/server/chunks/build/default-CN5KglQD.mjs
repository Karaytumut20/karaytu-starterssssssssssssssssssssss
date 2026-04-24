import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './Footer-D2oKFoU0.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { i as _export_sfc } from './server.mjs';
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
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Navbar = __nuxt_component_0;
      const _component_Footer = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout-wrapper relative w-full h-[100dvh] overflow-hidden bg-light" }, _attrs))} data-v-531b860c>`);
      _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
      _push(`<div class="fixed bottom-0 left-0 w-full h-[100vh] bg-light translate-y-full pointer-events-none" aria-hidden="true" data-v-531b860c></div><main id="lenis-scroll-container" class="absolute inset-0 w-full h-full overflow-y-auto page-content overscroll-none pt-safe-top pb-safe-bottom pl-safe-left pr-safe-right lenis" data-v-531b860c><div id="lenis-content-wrapper" class="w-full min-h-full bg-light flex flex-col" data-v-531b860c><div class="flex-grow flex flex-col w-full" data-v-531b860c>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Footer, { class: "mt-auto" }, null, _parent));
      _push(`</div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-531b860c"]]);

export { _default as default };
//# sourceMappingURL=default-CN5KglQD.mjs.map
