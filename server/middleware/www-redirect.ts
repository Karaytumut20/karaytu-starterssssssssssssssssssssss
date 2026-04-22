export default defineEventHandler((event) => {
  // 1. İstek atılan asıl host'u (domaini) yakala.
  // x-forwarded-host: Vercel, Cloudflare gibi aracıları (proxy) kullanan sunucular için hayati önem taşır.
  const host =
    getRequestHeader(event, "x-forwarded-host") ||
    getRequestHeader(event, "host");

  // 2. Host içerisinden portu ayıklayarak sadece saf alan adını veya IP'yi alıyoruz
  // 🔥 TS HATASI ÇÖZÜMÜ: split ile bölünen dizinin ilk elemanı TS tarafından tanımsız (undefined) kabul edilebilir,
  // bu yüzden sonuna '|| ""' ekleyerek veri tipini kesinlikle 'string' olarak mühürlüyoruz.
  const hostWithoutPort = host?.split(":")[0] || "";

  // 3. Gelen isteğin bir IP adresi olup olmadığını denetleyen RegEx (IPv4 formatı)
  const isIpAddress = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostWithoutPort);

  // 4. İstek 'www.' ile gelmişse, localhost ise, Vercel test linki ise VEYA BİR IP ADRESİ İSE hiçbir şey yapma
  if (
    !host ||
    host.startsWith("www.") ||
    host.includes("localhost") ||
    host.includes("127.0.0.1") ||
    host.includes("vercel.app") ||
    isIpAddress
  ) {
    return;
  }

  // 5. İstek www olmadan gelmiş. Hemen URL detaylarını al.
  const url = getRequestURL(event);

  // 6. Host'un başına www. ekle
  const newHost = `www.${host}`;

  // 7. Protokolü (http/https) güvenli bir şekilde belirle.
  const protocol =
    getRequestHeader(event, "x-forwarded-proto") ||
    (import.meta.dev ? "http" : "https");

  // 8. Modern ve SEO Uyumlu Yönlendirme (308)
  // 308, eski 301'in aksine GET dışındaki istekleri (POST, PUT) bozmadan aynı methodla yönlendirir.
  return sendRedirect(
    event,
    `${protocol}://${newHost}${url.pathname}${url.search}`,
    308,
  );
});
