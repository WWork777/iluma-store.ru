export const dynamic = "force-dynamic";
import ClientFilters from "./client";

async function fetchItems() {
  const res = await fetch("https://iluma-store.ru/api/products/getterea", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Ошибка загрузки товаров");
  return res.json();
}

export async function generateMetadata() {
  const title = "Купить стики Heets в Iluma-store с доставкой по России";
  return {
    title,
    description:
      "Каталог стиков Heets с доставкой по всей России. Лучший выбор вкусов и брендов!",
    alternates: {
      canonical: `https://iluma-store.ru/products/heets`,
    },
    openGraph: {
      title: `Купить стики Heets в Iluma-store с доставкой по России`,
      description: `Каталог стиков Heets с доставкой по всей России. Лучший выбор вкусов и брендов!`,
      url: `https://iluma-store.ru/products/heets`,
      images: [
        {
          url: `https://iluma-store.ru/favicon/og-image.png`,
          alt: `Ilumastore`,
        },
      ],
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
      <h1 style={{ position: "absolute", zIndex: "-9999" }}>Стики Heets</h1>
      <ClientFilters items={items} />
    </div>
  );
}
