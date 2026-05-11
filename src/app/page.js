import Image from "next/image";
import "./main.scss";
import Hero from "../../components/Home/Hero/Hero";
import Poster from "../../components/Home/Poster/Poster";
import Preview from "../../components/Home/Preview/Preview";
import About from "../../components/Home/About/About";
import New from "../../components/Home/New/New";
import Exclusive from "../../components/Home/Exclusive/Exclusive";
import Reviews from "../../components/Home/Reviews/Reviews";
import ModalManager from "../../components/ModalManager/ModalManager";
import Script from "next/script";

export const metadata = {
  title: "IQOS ILUMA Москва- официальный сайт",
  description:
    "IQOS ILUMA - оригинальные устройства и стики в Москве. Официальный магазин, гарантия, быстрая доставка.",
  alternates: {
    canonical: "https://iluma-store.ru",
  },
  openGraph: {
    title: "IQOS ILUMA Москва - официальный сайт",
    description:
      "IQOS ILUMA - оригинальные устройства и стики в Москве. Официальный магазин, гарантия, быстрая доставка.",
    url: "https://iluma-store.ru",
    type: "website",
    images: [
      {
        url: "https://iluma-store.ru/favicon/og-image.png", // обязательно PNG или JPG
        width: 512,
        height: 512,
        alt: "Iluma Store — IQOS Iluma и стики Terea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IQOS ILUMA Москва - официальный сайт",
    description:
      "IQOS ILUMA - оригинальные устройства и стики в Москве. Официальный магазин, гарантия, быстрая доставка.",
    images: ["https://iluma-store.ru/favicon/og-image.png"],
  },
};

const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "IQOS Iluma Store",
  url: "https://iluma-store.ru",
  description:
    "Официальный магазин IQOS Iluma и стиков Terea с доставкой по России",
  address: {
    "@type": "PostalAddress",
    addressCountry: "RU",
    addressLocality: "Москва",
  },
  // Добавляем примерные отзывы о магазине
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "27",
    bestRating: "5",
  },
};

// Если у вас есть конкретные популярные товары на главной, можно добавить Product разметку
const featuredProductJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "IQOS ILUMA PRIME",
  image: "https://iluma-store.ru/images/iluma-prime.jpg",
  description:
    "Устройство IQOS ILUMA - инновационная система нагревания табака",
  brand: {
    "@type": "Brand",
    name: "IQOS",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "89",
    bestRating: "5",
  },
  offers: {
    "@type": "Offer",
    url: "https://iluma-store.ru/product/iluma-prime",
    priceCurrency: "RUB",
    price: "14990",
    availability: "https://schema.org/InStock",
  },
};

export default function Home() {
  return (
    <>
      <Script
        id="store-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
      />

      <Script
        id="product-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(featuredProductJsonLd),
        }}
      />
      <main>
        <section>
          <Hero />
        </section>
        <section>
          <Poster />
        </section>
        <section>
          <Preview />
        </section>

        <section>
          <Exclusive />
        </section>

        <section>
          <New />
        </section>

        <section>
          <About />
        </section>

        <section>
          <Reviews />
        </section>
      </main>

      <ModalManager />
    </>
  );
}
