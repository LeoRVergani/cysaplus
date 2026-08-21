/** Registra o service worker somente no build de produção. */
export function registerStudyPwa() {
  if (!import.meta.env.PROD || !("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.warn("Não foi possível registrar o modo offline do CySA+ Estudo BR.", error);
    });
  });
}
