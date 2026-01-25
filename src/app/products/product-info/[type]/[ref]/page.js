export const revalidate = 3600;
import ClientFilters from "./client";

async function fetchItems(type, ref) {
  const res = await fetch(
    `https://iluma-store.ru/api/products/getproductinfo/${type}/${ref}`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) throw new Error("Ошибка загрузки товаров");
  return res.json();
}

export async function generateMetadata({ params }) {
  const { type, ref } = await params;
  let items = [];
  try {
    items = await fetchItems(type, ref);
  } catch (error) {
    console.error(error);
    return <p>Ошибка загрузки данных</p>;
  }
  return {
    title: `Купить ${items.name} с доставкой по России`,
    description: `${items.description}`,
    alternates: {
      canonical: `https://iluma-store.ru/products/product-info/${items.type}/${items.ref}`,
    },
    openGraph: {
      title: `Купить ${items.name} с доставкой по России`,
      description: `${items.description}`,
      url: `https://iluma-store.ru/products/product-info/${items.type}/${items.ref}`,
      images: [
        {
          url: `https://iluma-store.ru/favicon/og-image.png`,
          alt: items.name,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { type, ref } = await params;
  let items = [];
  try {
    items = await fetchItems(type, ref);
  } catch (error) {
    return {
      title: "Товар не найден",
      robots: { index: false },
    };
  }

  return <ClientFilters items={items} />;
}
