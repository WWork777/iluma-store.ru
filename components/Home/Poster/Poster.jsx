"use client";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Poster.scss";

import Image from "next/image";

export default function Poster() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className}" aria-label="Слайд ${index + 1}"></span>`;
        },
      }}
      modules={[Pagination]}
      className="poster"
    >
      {/* Слайд 1 — Limited Edition */}
      <SwiperSlide>
        <Link
          href="/products/iqosexclusive"
          className="services-card"
          aria-label="IQOS Iluma Limited Edition — купить сейчас"
        >
          <div>
            <p>IQOS Iluma Limited Edition</p>
            <span>В наличии! Успевайте купить!</span>
          </div>
          <strong>LIMITED</strong>
        </Link>
        <Image
          src="/Home/Poster/posterGalaxy.webp"
          alt="IQOS Iluma Limited Edition"
          width={1000}
          height={1000}
          loading="eager"
          priority={true}
        />
      </SwiperSlide>

      {/* Слайд 2 — Terea Sticks */}
      <SwiperSlide>
        <Link
          href="/products/stiki-terea-dlya-iqos-iluma"
          className="services-card"
          aria-label="Стики Terea для IQOS Iluma — купить"
        >
          <div>
            <p>Terea for IQOS ILUMA</p>
            <span>
              Стики Terea для IQOS Iluma — попробуйте и откройте новый уровень
              наслаждения!
            </span>
          </div>
        </Link>
        <Image
          src="/Home/Poster/poster2.png"
          alt="Стики Terea для IQOS Iluma"
          width={1000}
          height={1000}
          loading="lazy"
        />
      </SwiperSlide>

      {/* Слайд 3 — Блог */}
      <SwiperSlide>
        <Link
          href="/blog"
          className="services-card"
          aria-label="Блог Iluma Store — статьи и инструкции"
        >
          <div>
            <p>Наш Блог!</p>
            <span>
              Информация о разных аспектах использования стиков. Сравнения,
              оценки, инструкции!
            </span>
          </div>
        </Link>
        <Image
          src="/Home/Poster/posterGalaxy.webp"
          alt="Блог о IQOS Iluma и Terea"
          width={1000}
          height={1000}
          loading="lazy"
        />
      </SwiperSlide>

      <div className="swiper-pagination"></div>
    </Swiper>
  );
}
