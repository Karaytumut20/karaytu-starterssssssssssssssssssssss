import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // We use serverSupabaseServiceRole to bypass RLS and fetch all active routes
  let supabase;
  try {
      supabase = await serverSupabaseServiceRole(event);
  } catch (e) {
      // Fallback if Service key is not available
      return [];
  }
  
  const urls: Array<{loc: string, lastmod?: string}> = [];
  
  // 1. Yachts
  const { data: yachts } = await supabase.from('yachts').select('slug, updated_at').eq('is_active', true);
  if (yachts && yachts.length > 0) {
    urls.push(...yachts.map(y => ({
      loc: `/yatlarimiz/${y.slug}`,
      lastmod: y.updated_at
    })));
  }
  
  // 2. Experiences
  const { data: exp } = await supabase.from('experiences').select('slug, created_at').eq('is_active', true);
  if (exp && exp.length > 0) {
    urls.push(...exp.map(e => ({
      loc: `/deneyimlerimiz/${e.slug}`,
      lastmod: e.created_at
    })));
  }
  
  // 3. Blogs
  try {
      const { data: blogs } = await supabase.from('blogs').select('slug, created_at').eq('is_active', true);
      if (blogs && blogs.length > 0) {
        urls.push(...blogs.map(b => ({
          loc: `/blog/${b.slug}`,
          lastmod: b.created_at
        })));
      }
  } catch (e) {
      // Blogs table might not exist yet if user hasn't run the SQL
  }
  

  return urls;
});
