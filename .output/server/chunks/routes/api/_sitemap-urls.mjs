import { c as defineEventHandler, e as serverSupabaseServiceRole } from '../../_/nitro.mjs';
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

const _sitemapUrls = defineEventHandler(async (event) => {
  let supabase;
  try {
    supabase = await serverSupabaseServiceRole(event);
  } catch (e) {
    return [];
  }
  const urls = [];
  const { data: yachts } = await supabase.from("yachts").select("slug, updated_at").eq("is_active", true);
  if (yachts && yachts.length > 0) {
    urls.push(...yachts.map((y) => ({
      loc: `/yatlarimiz/${y.slug}`,
      lastmod: y.updated_at
    })));
  }
  const { data: exp } = await supabase.from("experiences").select("slug, created_at").eq("is_active", true);
  if (exp && exp.length > 0) {
    urls.push(...exp.map((e) => ({
      loc: `/deneyimlerimiz/${e.slug}`,
      lastmod: e.created_at
    })));
  }
  try {
    const { data: blogs } = await supabase.from("blogs").select("slug, created_at").eq("is_active", true);
    if (blogs && blogs.length > 0) {
      urls.push(...blogs.map((b) => ({
        loc: `/blog/${b.slug}`,
        lastmod: b.created_at
      })));
    }
  } catch (e) {
  }
  return urls;
});

export { _sitemapUrls as default };
//# sourceMappingURL=_sitemap-urls.mjs.map
