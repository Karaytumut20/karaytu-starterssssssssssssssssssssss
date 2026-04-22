<template>
  <main class="w-full bg-[#f8f9fc] text-[#1c2c44] pt-32 pb-24 min-h-dvh">
    
    <!-- Loading State -->
    <div v-if="pending" class="w-full h-[50vh] flex justify-center items-center">
       <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#215d8f]"></div>
    </div>
    
    <div v-else-if="!post" class="w-full h-[50vh] flex flex-col items-center justify-center">
      <h1 class="text-3xl font-bold mb-4">Yazı Bulunamadı</h1>
      <NuxtLink to="/blog" class="bg-[#215d8f] text-white px-6 py-2 rounded-full">Blog'a Dön</NuxtLink>
    </div>

    <div v-else class="max-w-6xl mx-auto px-6 lg:px-8">
      
      <!-- Breadcrumb & Top Meta -->
      <div class="mb-8 flex flex-col items-center text-center">
        <div class="flex items-center gap-2 text-[12px] font-bold text-[#0ea5e9] uppercase tracking-[0.1em] mb-4">
          <NuxtLink to="/blog" class="hover:text-[#1c2c44] transition-colors">Blog</NuxtLink>
          <span class="text-[#cbd5e1]">•</span>
          <span>{{ post.category }}</span>
        </div>
        
        <h1 class="text-3xl md:text-5xl lg:text-[54px] font-black text-[#1c2c44] tracking-tight leading-[1.1] max-w-4xl mb-6">
          {{ post.title }}
        </h1>
        
        <div class="flex items-center gap-4 text-[#64748b] text-[13px] font-medium">
           <span class="flex items-center gap-1.5">
             <svg class="w-4 h-4 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             {{ post.date }}
           </span>
           <span class="w-1 h-1 bg-[#cbd5e1] rounded-full"></span>
           <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {{ post.readTime }}
           </span>
        </div>
      </div>

      <!-- Hero Image -->
      <div class="w-full aspect-[16/9] lg:aspect-[21/9] rounded-[24px] overflow-hidden mb-16 shadow-lg border border-[#e2e8f0]/80">
         <NuxtImg :src="post.image" class="w-full h-full object-cover" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-14 gap-16">
        
        <!-- Main Article (8 cols) -->
        <div class="lg:col-span-8 flex flex-col">
           <article class="prose prose-lg prose-slate prose-img:rounded-xl prose-headings:text-[#1c2c44] max-w-none text-[#475569] leading-relaxed">
             <p v-if="post.desc" class="text-[20px] font-medium text-[#1c2c44] mb-8 leading-snug">
               {{ post.desc }}
             </p>
             <div v-html="post.content"></div>
           </article>

           <!-- Share & Action -->
           <div class="mt-16 pt-8 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div class="flex items-center gap-3">
                 <span class="text-[13px] font-bold text-[#1c2c44]">Paylaş:</span>
                 <div class="flex gap-2">
                   <button class="w-9 h-9 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#0ea5e9] hover:border-[#0ea5e9] transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></button>
                   <button class="w-9 h-9 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#0ea5e9] hover:border-[#0ea5e9] transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></button>
                 </div>
              </div>
              <NuxtLink to="/hakkimizda" class="text-[13px] font-bold text-[#0ea5e9] hover:underline">Hakkımızda Daha Fazla Bilgi &rarr;</NuxtLink>
           </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-4 flex flex-col gap-8">
           
           <!-- Promo Box -->
           <div class="bg-[#1c2c44] rounded-[24px] p-8 text-white relative overflow-hidden shadow-xl">
              <div class="absolute -right-8 -top-8 w-32 h-32 bg-[#0ea5e9] rounded-full blur-[80px] opacity-40"></div>
              <h3 class="text-xl font-bold mb-3 tracking-tight">Kusursuz Bir Organizasyon İster Misiniz?</h3>
              <p class="text-white/80 text-[13px] leading-relaxed mb-6">Uzman ekibimizle yatta parti, davet veya kurumsal yemeklerinizi baştan sona organize edelim.</p>
              <NuxtLink to="/iletisim" class="w-full bg-[#0ea5e9] hover:bg-[#0284c7] transition-colors text-center text-[14px] font-bold py-3.5 rounded-xl block">
                Bize Ulaşın
              </NuxtLink>
           </div>

           <!-- Related Articles -->
           <div v-if="relatedPosts.length > 0" class="bg-white rounded-2xl border border-[#e2e8f0]/80 p-6 shadow-sm">
             <h3 class="font-bold text-[#1c2c44] text-[18px] mb-5 pb-3 border-b border-[#e2e8f0]">Diğer Yazılar</h3>
             <ul class="flex flex-col gap-4">
               <li v-for="rel in relatedPosts" :key="rel.slug">
                 <NuxtLink :to="`/blog/${rel.slug}`" class="group flex gap-4 items-center">
                   <div class="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                     <img :src="rel.image_url || '/images/default.jpg'" class="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                   </div>
                   <div>
                     <h4 class="text-[14px] font-bold text-[#1c2c44] group-hover:text-[#0ea5e9] leading-snug transition-colors line-clamp-2 mb-1">{{ rel.title }}</h4>
                     <p class="text-[#94a3b8] text-[11px] font-medium">{{ new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(rel.created_at)) }}</p>
                   </div>
                 </NuxtLink>
               </li>
             </ul>
           </div>

        </div>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute, useAsyncData, useSupabaseClient, useSeoMeta, definePageMeta, useHead, useSchemaOrg, defineBreadcrumb, defineArticle } from '#imports';
import { computed } from 'vue';

const route = useRoute();
definePageMeta({
  layout: "custom" 
});

const supabase = useSupabaseClient();
const slug = route.params.slug as string;

const { data: dbPost, pending } = await useAsyncData(`blog-${slug}`, async () => {
    const { data } = await supabase.from('blogs').select('*').eq('slug', slug).single();
    return data;
});

const post = computed(() => {
    if(!dbPost.value) return null;
    const p = dbPost.value;
    return {
        title: p.title,
        category: p.category || 'Rehber',
        date: new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(p.created_at)),
        readTime: Math.max(1, Math.ceil((p.content?.length || 0) / 1000)) + " dk okuma",
        image: p.image_url || '/images/default.jpg',
        desc: p.excerpt || '',
        content: p.content,
        meta_title: p.meta_title,
        meta_description: p.meta_description,
        meta_keywords: p.meta_keywords
    };
});

// fetch related posts
const { data: relatedPostsData } = await useAsyncData(`related-blogs-${slug}`, async () => {
    const { data } = await supabase.from('blogs').select('title, slug, image_url, created_at').neq('slug', slug).eq('is_active', true).order('created_at', { ascending: false }).limit(3);
    return data || [];
});

const relatedPosts = computed(() => relatedPostsData.value || []);

useSeoMeta({
  title: () => post.value?.meta_title || `${post.value?.title || 'Blog'} | YatigoTR Yatçılık`,
  description: () => post.value?.meta_description || post.value?.desc,
  keywords: () => post.value?.meta_keywords || ''
});

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: "Ana Sayfa", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: () => post.value?.title || "Yazı", item: () => `/blog/${route.params.slug}` }
    ]
  }),
  defineArticle({
    headline: () => post.value?.title,
    description: () => post.value?.meta_description || post.value?.desc,
    image: () => post.value?.image || "/images/img1.jpg",
    author: {
        name: "YatigoTR Yatçılık",
        url: "https://suyatcilik.com"
    },
    datePublished: () => dbPost.value?.created_at
  })
]);

useHead(() => {
    return {
      link: [
        { rel: 'canonical', href: `https://suyatcilik.com/blog/${route.params.slug}` }
      ]
    };
});

onMounted(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
});
</script>
