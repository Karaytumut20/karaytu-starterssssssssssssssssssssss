import { c as defineEventHandler, f as appendHeader } from '../_/nitro.mjs';
import { Feed } from 'feed';
import { s as siteConfig } from '../_/site.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue';
import 'consola';
import 'node:fs';
import 'node:url';
import '@supabase/supabase-js';
import 'fast-xml-parser';
import 'ipx';
import 'node:path';
import 'node:crypto';

const rss_xml = defineEventHandler((event) => {
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: siteConfig.lang,
    image: siteConfig.ogImage,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${(/* @__PURE__ */ new Date()).getFullYear()}, ${siteConfig.creator}`,
    author: {
      name: siteConfig.creator,
      email: siteConfig.contactEmail,
      link: siteConfig.url
    }
  });
  feed.addItem({
    title: `${siteConfig.creator}'a Ho\u015F Geldiniz`,
    id: `${siteConfig.url}/`,
    link: `${siteConfig.url}/`,
    description: siteConfig.description,
    content: `Mekanlar\u0131n\u0131za de\u011Fer katan ince dokunu\u015Flar sunan, Konya merkezli profesyonel bir ev dekorasyon, perde ve hal\u0131 firmas\u0131y\u0131z. Plise perde, stor perde, ithal duvar ka\u011F\u0131d\u0131 ve \xF6zel dokuma hal\u0131 koleksiyonlar\u0131m\u0131z\u0131 ke\u015Ffetmek i\xE7in ma\u011Fazam\u0131za bekleriz. \u0130leti\u015Fim: ${siteConfig.contactTelephone}`,
    date: new Date(siteConfig.foundedAt),
    image: siteConfig.ogImage
  });
  appendHeader(event, "Content-Type", "application/xml; charset=utf-8");
  return feed.rss2();
});

export { rss_xml as default };
//# sourceMappingURL=rss.xml.mjs.map
