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
  title: "Купить IQOS Iluma и Terea в Москве | Iluma Store",
  description:
    "Оригинальные устройства IQOS Iluma и стики Terea с доставкой по РФ. Гарантия подлинности, низкие цены и акции.",
  alternates: {
    canonical: `https://iluma-store.ru`,
  },
  openGraph: {
    title: `Купить IQOS Iluma и Terea в Москве | Iluma Store`,
    description: `Оригинальные устройства IQOS Iluma и стики Terea с доставкой по РФ. Гарантия подлинности, низкие цены и акции.`,
    url: `https://iluma-store.ru`,
    images: [
      {
        url: `/favicon/web-app-manifest-512x512`,
        alt: `Ilumastore`,
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <h1 className="hidden-h1">
        IQOS Iluma и стики Terea недорого и с доставкой по всей России
      </h1>
      <Hero />
      <Poster />
      <Preview />
      <Exclusive />
      <New />
      <About />
      <Reviews />
      <ModalManager/>
    </>
  );
}
