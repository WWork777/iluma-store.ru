// app/not-found.js
import Link from "next/link";
import styles from "./styles/NotFound.module.css";

export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.graphic}>
          <div className={styles.circle}></div>
          <div className={styles.shadow}></div>
        </div>
        <div className={styles.number}>404</div>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.message}>
          Запрашиваемая страница не существует или была перемещена.
          <br />
          Пожалуйста, воспользуйтесь навигацией по сайту.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.homeButton}>
            На главную
          </Link>
          <Link href="/products" className={styles.catalogButton}>
            В каталог
          </Link>
        </div>
      </div>
    </div>
  );
}
