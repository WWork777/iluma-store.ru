import React from "react";
import "./style.scss";

export const metadata = {
  title: "Скидки и акции в магазине Iluma-store",
  description:
    "Скидки и акции в магазине Iluma-store - покупайте премиальные устройства IQOS ILUMA и стики Terea по привлекательным ценам",
  alternates: {
    canonical: `https://iluma-store.ru/sales`,
  },
  openGraph: {
    title: `Скидки и акции в магазине Iluma-store`,
    description: `Скидки и акции в магазине Iluma-store - покупайте премиальные устройства IQOS ILUMA и стики Terea по привлекательным ценам`,
    url: `https://iluma-store.ru/sales`,
    images: [
      {
        url: `https://iluma-store.ru/favicon/og-image.png`,
        alt: `Ilumastore`,
      },
    ],
  },
};

const Sales = () => {
  return (
    <div className="sales">
      <h1>Акции</h1>
      <div className="sales-three">
        <h3>Каждый 11-й блок стиков в подарок!</h3>
        <p>При покупке 10ти блоков - 11й в подарок</p>
      </div>
    </div>
  );
};

export default Sales;
