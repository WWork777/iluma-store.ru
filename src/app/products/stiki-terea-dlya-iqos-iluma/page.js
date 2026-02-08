export const dynamic = "force-dynamic";
import ClientFilters from "./client";

// Добавляем metadataBase
export const metadataBase = new URL(
  process.env.NODE_ENV === "production"
    ? "https://iluma-store.ru"
    : "http://localhost:3000"
);

async function safeFetch(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

async function fetchItems() {
  try {
    // Для серверного рендеринга используем абсолютный URL
    let apiUrl;
    
    if (typeof window === "undefined") {
      // На сервере используем абсолютный URL
      const baseUrl = process.env.NODE_ENV === "production"
        ? "https://iluma-store.ru"
        : "http://localhost:3000";
      apiUrl = `${baseUrl}/api/products/getterea`;
    } else {
      // На клиенте используем относительный URL
      apiUrl = `/api/products/getterea`;
    }

    return await safeFetch(apiUrl, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Ошибка загрузки товаров");
  }
}

export async function generateMetadata() {
  const title = "Стики TEREA для IQOS ILUMA Москва";
  const description =
    "Стики Terea для IQOS ILUMA в Москве. Все скусы в наличии, оригинальная продукция, доставка.";

  return {
    title,
    description,
    metadataBase,
    alternates: {
      canonical: `/products/stiki-terea-dlya-iqos-iluma`,
    },
    openGraph: {
      title,
      description,
      url: `/products/stiki-terea-dlya-iqos-iluma`,
      type: "website",
      images: [
        {
          url: `/favicon/og-image.png`,
          width: 512,
          height: 512,
          alt: "Iluma Store — стики Terea для IQOS ILUMA",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/favicon/og-image.png"],
    },
  };
}

export default async function Page() {
  let items = [];

  try {
    items = await fetchItems();
  } catch (error) {
    console.error("Page error:", error);
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Ошибка загрузки данных</h1>
        <p>Не удалось загрузить информацию о стиках Terea.</p>
        <a href="/products" style={{ color: "blue" }}>
          Вернуться в каталог
        </a>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1 className="page-title">
        Купить стики Terea для IQOS ILUMA в Москве и России
      </h1>
      <ClientFilters items={items} />
    </div>
  );
}