import React from "react";
import data from "../../../data/products.json";
import ProductList from "../../../../components/ProductsComponents/ProductsList/ProductsList";
import Link from "next/link";

export const metadata = {
  title: "Купить устройства Iqos Iluma от 8000 руб. и стики Terea от 3350 руб.",
  description:
    "Здесь вы можете купить устройства IQOS Iluma от 8000 руб. и стики Terea от 3350 руб. Получите доступ к современным технологиям без дыма. Заказывайте с доставкой и наслаждайтесь качеством IQOS уже сегодня!",
  keyword:
    "ILUMA, IQOS, купить IQOS, устройства IQOS, аксессуары IQOS,tereaspace, оригинальные IQOS, интернет-магазин IQOS, доставка IQOS, выгодные цены IQOS, новейшие технологии IQOS, Terea, IQOS ILUMA, купить IQOS ILUMA, устройства IQOS ILUMA, аксессуары IQOS ILUMA, оригинальные IQOS ILUMA, интернет-магазин IQOS ILUMA, доставка IQOS ILUMA, выгодные цены IQOS ILUMA, новейшие технологии IQOS ILUMA, Стики Terea, Купить Terea стики, цены Terea, купить Terea, выгодные цены Terea, лучшие стики Terea, купить ILUMA, устройства ILUMA, аксессуары ILUMA, оригинальные  ILUMA, интернет-магазин ILUMA, доставка ILUMA, выгодные цены ILUMA, новейшие технологии ILUMA",
  openGraph: {
    title: "TereaSpace || Все товары",
    description:
      "Здесь вы можете купить устройства IQOS Iluma от 8000 руб. и стики Terea от 3350 руб. Получите доступ к современным технологиям без дыма. Заказывайте с доставкой и наслаждайтесь качеством IQOS уже сегодня!",
    url: "https://iluma-store.ru/allproducts",
    images: [
      {
        url: "https://iluma-store.ru/favicon/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: "https://iluma-store.ru/products/allproducts",
  },
};

const AllProducts = () => {
  return (
    <>
      <div className="heading">
        <h1>Все товары</h1>
      </div>
      <ProductList
        nameCat={data.IqosIlumaOne}
        title="Iqos Iluma One"
        nalichie={1}
        desc="Iluma One"
      />
      <ProductList
        nameCat={data.IqosIlumaIOne}
        title="Iqos Iluma I One"
        nalichie={1}
        desc="Iluma I One"
      />
      <ProductList
        nameCat={data.IqosIlumaiStandart}
        title="Iqos Iluma I Standart"
        nalichie={1}
        desc="Iluma I Standart"
      />
      <ProductList
        nameCat={data.IqosIlumaStandart}
        title="Iqos Iluma Standart"
        nalichie={1}
        desc="Iluma Standart"
      />
      <ProductList
        nameCat={data.ILumaPrime}
        title="Iqos Iluma Prime"
        nalichie={1}
        desc="Iluma Prime"
      />
      <ProductList
        nameCat={data.IqosIlumaiPrime}
        title="Iqos Iluma I Prime"
        nalichie={1}
        desc="Iluma I Prime"
      />
      <ProductList
        nameCat={data.KazTereaBlock}
        title="Terea Казахстан (Блок)"
        nalichie={1}
        desc="Стики Terea Казахстан (Блок)"
      />
      <ProductList
        nameCat={data.KazTerea}
        title="Terea Казахстан"
        nalichie={1}
        desc="Стики Terea Казахстан"
      />
      <ProductList
        nameCat={data.ArmTereaBlock}
        title="Terea Армения (Блок)"
        nalichie={1}
        desc="Стики Terea Армения (Блок)"
      />
      <ProductList
        nameCat={data.ArmTerea}
        title="Terea Армения"
        nalichie={1}
        desc="Стики Terea Армения"
      />
      <ProductList
        nameCat={data.IndTereaBlock}
        title="Terea Индонезия (Блок)"
        nalichie={1}
        desc="Стики Terea Индонезия (Блок)"
      />
      <ProductList
        nameCat={data.IndTerea}
        title="Terea Индонезия"
        nalichie={1}
        desc="Стики Terea Индонезия"
      />
      <ProductList
        nameCat={data.polTereaBlock}
        title="Terea Польша (Блок)"
        nalichie={1}
        desc="Стики Terea Польша (Блок)"
      />
      <ProductList
        nameCat={data.polTerea}
        title="Terea Польша"
        nalichie={1}
        desc="Стики Terea Польша"
      />
      <ProductList
        nameCat={data.UzbTereaBlock}
        title="Terea Узбекистан (Блок)"
        nalichie={1}
        desc="Стики Terea Узбекистан (Блок)"
      />
      <ProductList
        nameCat={data.UzbTerea}
        title="Terea Узбекистан"
        nalichie={1}
        desc="Стики Terea Узбекистан"
      />
      <ProductList
        nameCat={data.JapanTereaBlock}
        title="Terea Япония (Блок)"
        nalichie={1}
        desc="Стики Terea Япония (Блок)"
      />
      <ProductList
        nameCat={data.JapanTerea}
        title="Terea Япония"
        nalichie={1}
        desc="Стики Terea Япония"
      />
      <ProductList
        nameCat={data.DutyFree}
        title="Terea Швейцария"
        nalichie={1}
        desc="Стики Terea Швейцария"
      />
      <ProductList
        nameCat={data.DutyFreePack}
        title="Terea Швейцария"
        nalichie={1}
        desc="Стики Terea Швейцария"
      />
      <ProductList
        nameCat={data.Heets}
        title="Heets Швейцария"
        nalichie={1}
        desc="Стики Heets Швейцария"
      />
      <ProductList
        nameCat={data.Accessories}
        title="Аксессуары"
        nalichie={1}
        desc="Аксессуары"
      />
    </>
  );
};

export default AllProducts;
