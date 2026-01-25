export const dynamic = "force-dynamic";
import ClientFilters from "./client";

async function fetchItems() {
  const res = await fetch("https://iluma-store.ru/api/products/getdevices", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Ошибка загрузки товаров");
  return res.json();
}

export async function generateMetadata() {
  const title =
    "Купить аксессуары для IQOS ILUMA в Iluma-store с доставкой по России";
  const description =
    "Каталог аксессуаров для устройств IQOS ILUMA с доставкой по Москве и всей России. Лучший выбор, акции и скидки!";

  return {
    title,
    description,
    alternates: {
      canonical: `https://iluma-store.ru/products/aksessuary-dlya-iqos-iluma`,
    },
    openGraph: {
      title,
      description,
      url: `https://iluma-store.ru/products/aksessuary-dlya-iqos-iluma`,
      type: "website",
      images: [
        {
          url: `https://iluma-store.ru/favicon/web-app-manifest-512x512.png`,
          width: 512,
          height: 512,
          alt: "Iluma Store — аксессуары для IQOS ILUMA",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://iluma-store.ru/favicon/web-app-manifest-512x512.png"],
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
        Аксессуары для IQOS ILUMA в Москве и России
      </h1>
      <ClientFilters items={items} />
    </div>
  );
}
