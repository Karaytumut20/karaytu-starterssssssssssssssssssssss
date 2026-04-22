export default defineEventHandler((event) => {
  // Geliştirme (Localhost) ortamında isek kalkanı kapat
  if (import.meta.dev) return;

  const host = getRequestHeader(event, "host") || "";
  const hostWithoutPort = host.split(":")[0] || "";

  // İzin verilen beyaz liste (Kendi domainlerin ve Vercel/Netlify gibi servisler)
  const allowedDomains = [
    "suyatcilik.com", // update with your domain
    "vercel.app",
    "netlify.app",
    "localhost",
    "127.0.0.1",
  ];

  const isIpAddress = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostWithoutPort);

  const isAuthorized =
    isIpAddress ||
    allowedDomains.some(
      (domain) =>
        hostWithoutPort === domain || hostWithoutPort.endsWith(`.${domain}`),
    );

  // Korsan Domain Tespit Edildiğinde Sunucu Yanıtı Anında 403 Forbidden Olarak Kesilir
  if (!isAuthorized) {
    setResponseStatus(event, 403);
    return "Yasal Uyarı: Bu alan adının yetkisi yoktur.";
  }
});
