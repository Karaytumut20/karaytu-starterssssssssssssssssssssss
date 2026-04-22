import { Feed } from "feed";
import { siteConfig } from "~/utils/site";

export default defineEventHandler((event) => {
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: siteConfig.lang,
    image: siteConfig.ogImage,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.creator}`,
    author: {
      name: siteConfig.creator,
      email: siteConfig.contactEmail,
      link: siteConfig.url,
    },
  });

  feed.addItem({
    title: `${siteConfig.creator}'a Hoş Geldiniz`,
    id: `${siteConfig.url}/`,
    link: `${siteConfig.url}/`,
    description: siteConfig.description,
    content: `Mekanlarınıza değer katan ince dokunuşlar sunan, Konya merkezli profesyonel bir ev dekorasyon, perde ve halı firmasıyız. Plise perde, stor perde, ithal duvar kağıdı ve özel dokuma halı koleksiyonlarımızı keşfetmek için mağazamıza bekleriz. İletişim: ${siteConfig.contactTelephone}`,
    date: new Date(siteConfig.foundedAt),
    image: siteConfig.ogImage,
  });

  appendHeader(event, "Content-Type", "application/xml; charset=utf-8");
  return feed.rss2();
});
