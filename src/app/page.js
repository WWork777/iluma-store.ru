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

export const metadata = {
  title: "IQOS ILUMA - официальный сайт",
  description:
    "IQOS ILUMA - оригинальные устройства и стики. Официальный магазин, гарантия, быстрая доставка.",
  alternates: {
    canonical: "https://iluma-store.ru",
  },
  openGraph: {
    title: "IQOS ILUMA - официальный сайт",
    description:
      "IQOS ILUMA - оригинальные устройства и стики. Официальный магазин, гарантия, быстрая доставка.",
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
    title: "IQOS ILUMA - официальный сайт",
    description:
      "IQOS ILUMA - оригинальные устройства и стики. Официальный магазин, гарантия, быстрая доставка.",
    images: ["https://iluma-store.ru/favicon/og-image.png"],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Iluma Store",
            url: "https://iluma-store.ru",
            description:
              "Официальный магазин IQOS Iluma и стиков Terea с доставкой по России",
            address: {
              "@type": "PostalAddress",
              addressCountry: "RU",
              addressLocality: "Москва",
            },
          }),
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

      {/* <ModalManager /> */}
    </>
  );
}
