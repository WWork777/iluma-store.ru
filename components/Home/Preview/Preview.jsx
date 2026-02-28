import "./Preview.scss";
import Image from "next/image";
import Link from "next/link";

export default function Preview() {
  return (
    <section className="preview" aria-label="Популярные товары">
      <div className="preview-card preview-column-one">
        <Link
          href="/products/ustrojstva-iqos-iluma"
          aria-label="Забронировать  IQOS iLuma от 8 500 ₽"
        >
          <h3>IQOS iLuma</h3>
          <p>от 8 500 ₽</p>
          <Image
            src="/Home/Preview/iluma.png"
            alt="IQOS iLuma — устройство для нагревания табака"
            width={500}
            height={700}
            priority={true}
          />
        </Link>
      </div>

      <div className="preview-column-two">
        <Link
          href="/products/stiki-terea-dlya-iqos-iluma"
          className="preview-card"
          aria-label="Забронировать  стики Terea для IQOS Iluma от 3 300 ₽"
        >
          <h3>Стики Terea</h3>
          <p>от 3 300 ₽</p>
          <Image
            src="/Home/Preview/terea.png"
            alt="Стики Terea для IQOS iLuma"
            width={500}
            height={700}
          />
        </Link>

        <Link
          href="/products/iqosexclusive"
          className="preview-card"
          aria-label="Эксклюзивные устройства IQOS от 9 500 ₽"
        >
          <h3>Эксклюзивы</h3>
          <p>от 9 500 ₽</p>
          <Image
            src="/Home/Preview/limited.webp"
            alt="Эксклюзивные устройства IQOS Iluma"
            width={500}
            height={700}
          />
        </Link>

        <Link
          href="/products/heets"
          className="preview-card"
          aria-label="Стики Heets для IQOS от 6 000 ₽"
        >
          <h3>Стики Heets</h3>
          <p>от 6 000 ₽</p>
          <Image
            src="/Home/Preview/heets.png"
            alt="Стики Heets для IQOS"
            width={500}
            height={700}
          />
        </Link>

        <Link
          href="/products/aksesuary-dlya-iqos-iluma"
          className="preview-card"
          aria-label="Аксессуары для IQOS от 1 490 ₽"
        >
          <h3>Аксессуары</h3>
          <p>от 1 490 ₽</p>
          <Image
            src="/Home/Preview/device.png"
            alt="Аксессуары для IQOS"
            width={500}
            height={700}
          />
        </Link>
      </div>

      {/* Мобильная версия */}
      <div className="preview mob">
        <div className="preview-column-two">
          <Link
            href="/products/iqosexclusive"
            className="preview-card"
            aria-label="Эксклюзивные устройства IQOS от 9 500 ₽"
          >
            <h3>Эксклюзивы</h3>
            <p>от 9 500 ₽</p>
            <Image
              src="/Home/Preview/limited.webp"
              alt="Эксклюзивные устройства IQOS Iluma"
              width={500}
              height={700}
            />
          </Link>

          <Link
            href="/products/heets"
            className="preview-card"
            aria-label="Стики Heets для IQOS от 6 000 ₽"
          >
            <h3>Стики Heets</h3>
            <p>от 6 000 ₽</p>
            <Image
              src="/Home/Preview/heets.png"
              alt="Стики Heets для IQOS"
              width={500}
              height={700}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
