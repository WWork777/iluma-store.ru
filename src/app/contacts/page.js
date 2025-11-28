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
        url: `/favicon/web-app-manifest-512x512`,
        alt: `Ilumastore`,
      },
    ],
  },
};

const Contacts = () => {
  return (
    <div className="contacts">
      <h1>Контакты IlumaStore</h1>
      <div className="adress">
        <h3>Адрес</h3>
        <p>
          г.Москва - ул. Римского-Корсакова, 11, корп 8 (Ориентир: Пункт OZON)
        </p>
        <p>
          Телефон: <Link href="tel:+7 (995) 153-80-19">+7 (995) 153-80-19</Link>
        </p>
        <p>Время работы: с 10:00 до 23:00, без выходных</p>
      </div>
      <div className="social">
        <h3>Социальные сети</h3>
        <p>
          Telegram:{" "}
          <Link href="https://t.me/+tXZ1x8yraKUzNWEy">@IlumaStore</Link>
        </p>
        <p>
          Whatsapp:{" "}
          <Link href="https://api.whatsapp.com/send/?phone=79951538019&text=Здравствуйте%21+Хочу+оформить+заказ&type=phone_number&app_absent=0">
            @IlumaStore
          </Link>
        </p>
      </div>
      <Map />
    </div>
  );
};

export default Contacts;
