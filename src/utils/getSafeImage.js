// Некоторые товары в escuelajs API до сих пор ссылаются на мёртвый
// via.placeholder.com (сервис закрылся в 2024). Подменяем домен на живой
// аналог placehold.co ДО того, как браузер попробует загрузить картинку.
export function getSafeImage(url) {
  if (!url || typeof url !== "string") return null;

  if (url.includes("via.placeholder.com")) {
    return url.replace("via.placeholder.com", "placehold.co");
  }

  // иногда встречаются совсем битые значения вроде "[object Object]" или пустых строк
  if (!url.startsWith("http")) return null;

  return url;
}

// Локальная заглушка (SVG в base64) — используем для onError и как дефолт,
// чтобы вообще не дёргать сеть, когда картинки точно нет.
export const FALLBACK_IMAGE =
  "data:image/svg+xml;base64," +
  btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150">
      <rect width="100%" height="100%" fill="#e5e7eb"/>
      <text x="50%" y="50%" font-family="sans-serif" font-size="13" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">No Image</text>
    </svg>`
  );
