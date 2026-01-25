export const dynamic = "force-dynamic";
import ClientFilters from "./client";

async function fetchItems() {
  const res = await fetch("https://iluma-store.ru/api/products/getiqos", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Ошибка загрузки товаров");
  return res.json();
}

export async function generateMetadata() {
  const title =
    "Купить IQOS ILUMA в Москве и России — оригинальные устройства | Iluma Store";
  const description =
    "Официальный магазин IQOS ILUMA. Покупайте оригинальные устройства с доставкой по Москве и всей России. Гарантия качества, акции и скидки на Iluma Store.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://iluma-store.ru/products/ustrojstva-iqos-iluma`,
    },
    openGraph: {
      title,
      description,
      url: `https://iluma-store.ru/products/ustrojstva-iqos-iluma`,
      type: "website",
      images: [
        {
          url: `https://iluma-store.ru/favicon/og-image.png`,
          width: 512,
          height: 512,
          alt: "Iluma Store — купить IQOS ILUMA",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://iluma-store.ru/favicon/og-image.png"],
    },
  };
}

export default async function Page() {
  let items = [];
  try {
    items = await fetchItems();
  } catch (error) {
    console.error(error);
    return <p>Ошибка загрузки данных</p>;
  }

  return (
    <div className="products-container">
      <h1 className="page-title">
        Оригинальные устройства IQOS ILUMA — купить в Москве и России
      </h1>
      <ClientFilters items={items} />
    </div>
  );
}
