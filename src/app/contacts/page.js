import "./style.scss";
import Link from "next/link";
import Map from "../../../components/YandexMap/Map";

export const metadata = {
  title: "Контакты | Iluma-store",
  description:
    "Свяжитесь с магазином устройствв IQOS ILUMA и стики Terea – только оригинальная продукция. Быстрая доставка по всей России и скидки для постоянных клиентов.",
  alternates: {
    canonical: `https://iluma-store.ru/contacts`,
  },
  openGraph: {
    title: `Контакты | Iluma-store`,
    description: `Свяжитесь с магазином устройствв IQOS ILUMA и стики Terea – только оригинальная продукция. Быстрая доставка по всей России и скидки для постоянных клиентов.`,
    url: `https://iluma-store.ru/contacts`,
    images: [
      {
        url: `https://iluma-store.ru/favicon/og-image.png`,
        alt: `Ilumastore`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакты | Iluma-store",
    description:
      "Свяжитесь с магазином устройствв IQOS ILUMA и стики Terea – только оригинальная продукция. Быстрая доставка по всей России и скидки для постоянных клиентов.",
    images: ["https://iluma-store.ru/favicon/og-image.png"],
  },
};

const Contacts = () => {
  return (
    <div className="contacts">
      <h1>Контакты IlumaStore</h1>
      <div className="adress">
        {/* <h3>Адрес</h3>
        <p>
          г.Москва - ул. Римского-Корсакова, 11, корп 8 (Ориентир: Пункт OZON)
        </p> */}
        {/* <p>
          Телефон: <Link href="tel:"></Link>
        </p> */}
        <p>График работы:</p>
        <p>Пн-пт: с 12:00-20:00</p>
        <p>Сб-вс: с 12.00-20.00</p>
      </div>
      <div className="social">
        <h3>Социальные сети</h3>
        {/* <p>
          Whatsapp:{" "}
          <Link href="https://api.whatsapp.com/send/?phone=79951538019&text=Здравствуйте%21+Хочу+оформить+заказ&type=phone_number&app_absent=0">
            +79951538019
          </Link>
        </p> */}
      </div>
      {/* <Map /> */}
    </div>
  );
};

export default Contacts;
