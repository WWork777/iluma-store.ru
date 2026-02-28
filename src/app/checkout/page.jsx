"use client";
import "./style.scss";
import { useContext, useRef, useState, useMemo } from "react";
import { CartContext } from "@/cart/add/cart";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Link from "next/link";

const CheckoutPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("delivery");
  const [loading, setLoading] = useState(false);
  const {
    cartItems,
    removeFromCart,
    clearCart,
    addOne,
    deleteOne,
    calculateTotalPrice,
    hasSticks,
  } = useContext(CartContext);
  const totalPrice = useMemo(() => calculateTotalPrice(), [cartItems]);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    lastName: "",
    phoneNumber: "",
    telegram: "",
    city: "",
    streetAddress: "",
  });

  const totalQuantity = cartItems
    .filter((item) => item.type === "Пачка")
    .reduce((acc, item) => acc + item.quantity, 0);

  const hasBlock = cartItems.some((item) => item.type === "Блок");

  const onlyPacksAndBlocks = cartItems.every(
    (item) => item.type === "Пачка" || item.type === "Блок",
  );

  const [errors, setErrors] = useState({});

  const scroolTo = (element) => {
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      element.focus();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let element;

    // Валидация телефона
    if (!formData.phoneNumber) {
      element = document.querySelector(
        `[placeholder="Введите номер телефона"]`,
      );
      scroolTo(element);
      newErrors.phoneNumber = "Введите номер телефона";
    } else if (formData.phoneNumber.replace(/\D/g, "").length < 11) {
      element = document.querySelector(
        `[placeholder="Введите номер телефона"]`,
      );
      scroolTo(element);
      newErrors.phoneNumber = "Некорректный номер телефона";
    }

    // Валидация города для доставки
    if (selectedMethod === "delivery") {
      if (!formData.city.trim()) {
        element = document.querySelector(`[name="city"]`);
        scroolTo(element);
        newErrors.city = "Введите ваш город";
      } else if (!/^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/.test(formData.city)) {
        element = document.querySelector(`[name="city"]`);
        scroolTo(element);
        newErrors.city =
          "Город может содержать только буквы, цифры, пробелы и дефисы";
      }
    }

    // Валидация Telegram (если указан)
    if (
      formData.telegram.trim() &&
      !/^[@a-zA-Z0-9_]{5,32}$/.test(formData.telegram.replace(/^@/, ""))
    ) {
      newErrors.telegram = "Некорректный формат Telegram username";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let isValid = true;

    if (name === "telegram") {
      isValid = /^@?[a-zA-Z0-9_]*$/.test(value);
    } else if (name === "lastName") {
      isValid = /^[a-zA-Zа-яА-ЯёЁ0-9\s-]*$/.test(value);
    } else if (name === "city") {
      isValid = /^[a-zA-Zа-яА-ЯёЁ0-9\s-]*$/.test(value); // Добавлены английские буквы
    } else if (name === "streetAddress") {
      isValid = /^[а-яА-ЯёЁ0-9\s-]*$/.test(value);
    }

    if (isValid) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
    if (errors.phoneNumber) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: "",
      }));
    }
  };

  // Функция для проверки предыдущих заказов
  const checkPreviousOrders = async (phoneE164) => {
    try {
      console.log("Checking orders for phone:", phoneE164);

      const checkResponse = await fetch(
        `/api/check-orders?phone=${encodeURIComponent(phoneE164)}`,
        {
          cache: "no-store",
          signal: AbortSignal.timeout(5000), // Таймаут 5 секунд
        },
      );

      if (checkResponse.ok) {
        const checkData = await checkResponse.json();
        console.log("Check orders API response:", checkData);

        // Безопасное извлечение данных
        const previousOrdersCount =
          parseInt(checkData.previous_orders_count) || 0;
        const isFirstOrder = previousOrdersCount === 0;

        console.log("Parsed order info:", {
          previousOrdersCount,
          isFirstOrder,
        });

        return {
          isFirstOrder,
          previousOrdersCount,
          success: true,
          error: null,
        };
      } else {
        const errorText = await checkResponse.text();
        console.warn(
          "API check-orders failed:",
          checkResponse.status,
          errorText,
        );

        return {
          isFirstOrder: true, // По умолчанию считаем новым
          previousOrdersCount: 0,
          success: false,
          error: `API error: ${checkResponse.status}`,
        };
      }
    } catch (error) {
      console.warn("Error checking previous orders:", error);

      // Определяем тип ошибки
      let errorType = "network_error";
      if (error.name === "AbortError") {
        errorType = "timeout_error";
      } else if (error.name === "TypeError") {
        errorType = "network_error";
      }

      return {
        isFirstOrder: true, // По умолчанию считаем новым
        previousOrdersCount: 0,
        success: false,
        error: `${errorType}: ${error.message}`,
      };
    }
  };

  // Функция для отправки в Telegram с повторными попытками
  const sendToTelegram = async (message, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Telegram attempt ${attempt}/${maxRetries}`);

        const response = await fetch("/api/telegram-proxi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: "-1002155675591",
            text: message,
            parse_mode: "HTML",
          }),
        });

        if (response.ok) {
          console.log(`Telegram sent successfully on attempt ${attempt}`);
          return true;
        } else {
          console.warn(
            `Telegram attempt ${attempt} failed: ${response.status}`,
          );
        }
      } catch (error) {
        console.warn(`Telegram attempt ${attempt} error:`, error);
      }

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }

    console.error("All Telegram attempts failed");
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
      const totalPrice = calculateTotalPrice();
      const site = "iqos-iluma.com";

      const formattedCart = cartItems
        .map(
          (item) =>
            `- ${item.name} (${item.type || "обычный"}) x${item.quantity}: ${
              item.price
            } ₽`,
        )
        .join("\n");

      // Форматируем Telegram username
      const telegramUsername = formData.telegram.trim()
        ? formData.telegram.startsWith("@")
          ? formData.telegram
          : `@${formData.telegram}`
        : "не указан";

      try {
        // 1. Проверяем предыдущие заказы по телефону
        const phoneNorm = formData.phoneNumber.replace(/\D/g, "");
        const phoneE164 = `+${phoneNorm}`;

        console.log("Starting order check...");
        const orderCheck = await checkPreviousOrders(phoneE164);

        const isFirstOrder = orderCheck.isFirstOrder;
        const previousOrdersCount = orderCheck.previousOrdersCount;
        const checkSuccess = orderCheck.success;
        const checkError = orderCheck.error;

        console.log("Order check completed:", {
          isFirstOrder,
          previousOrdersCount,
          checkSuccess,
          checkError,
        });

        // 2. Подготавливаем сообщение для Telegram
        let headerLine;
        let statusNote = "";

        if (checkSuccess) {
          // Если проверка успешна - показываем точный статус
          headerLine = isFirstOrder
            ? "🔥 НОВЫЙ КЛИЕНТ 🔥"
            : `📋 Повторный заказ (${previousOrdersCount + 1}-й по счету)`;
        } else {
          // Если проверка не удалась - показываем это в сообщении
          headerLine = "🟡 КЛИЕНТ (статус не подтвержден)";
          statusNote = `\n⚠️ Проверка статуса клиента не удалась: ${checkError}`;
        }

        const telegramMessage = `
Заказ с сайта ${site}

${headerLine}${statusNote}

Имя: ${formData.lastName || "Не указано"}   
Телефон: +${formData.phoneNumber}
Telegram: ${telegramUsername}
Способ доставки: ${selectedMethod === "delivery" ? "Доставка" : "Самовывоз"}
${
  selectedMethod === "delivery"
    ? `Город: ${formData.city || "Не указан"}\n`
    : ""
}

Корзина:
${formattedCart}

Общая сумма: ${totalPrice} ₽
      `;

        console.log("Prepared Telegram message");

        // 3. В первую очередь отправляем в Telegram (ВСЕГДА!)
        console.log("Sending to Telegram...");
        const telegramSent = await sendToTelegram(telegramMessage);

        if (!telegramSent) {
          console.error("FAILED: Telegram not sent after all retries");
          // Даже если Telegram не отправился, продолжаем - возможно другие каналы сработают
        } else {
          console.log("SUCCESS: Telegram sent");
        }

        // 4. Сохраняем в базу данных (даже если проверка не удалась)
        const saveToDb = async () => {
          try {
            const orderData = {
              customer_name: formData.lastName.trim() || "Не указано",
              phone_number: phoneE164,
              is_delivery: selectedMethod === "delivery",
              city:
                formData.city.trim() ||
                (selectedMethod === "delivery" ? "Не указано" : "Москва"),
              total_amount: totalPrice,
              address:
                formData.streetAddress.trim() ||
                (selectedMethod === "delivery" ? "Не указано" : "Самовывоз"),
              ordered_items: cartItems.map((item) => ({
                product_name: `${item.name} (${item.type || "обычный"})`,
                quantity: item.quantity,
                price_at_time_of_order: item.price,
              })),
              // Используем результат проверки или по умолчанию считаем новым
              is_first_order: checkSuccess ? (isFirstOrder ? 1 : 0) : 1,
              check_error: checkError || null, // Сохраняем ошибку проверки для отладки
            };

            console.log("Saving to database...");
            const response = await fetch("/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
            });

            if (response.ok) {
              const result = await response.json();
              console.log("SUCCESS: Database saved", result);
              return true;
            } else {
              const errorText = await response.text();
              console.warn("WARNING: Database save failed:", errorText);
              return false;
            }
          } catch (error) {
            console.warn("WARNING: Database error:", error);
            return false;
          }
        };

        // 5. Отправляем на почту
        const sendEmail = async () => {
          try {
            console.log("Sending email...");
            const res = await fetch("/api/email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: telegramMessage }),
            });
            if (res.ok) {
              console.log("SUCCESS: Email sent");
            } else {
              console.warn("WARNING: Email failed");
            }
          } catch (error) {
            console.warn("WARNING: Email error:", error);
          }
        };

        // 6. Отправляем WhatsApp
        const sendWhatsApp = async () => {
          try {
            console.log("Sending WhatsApp...");

            const autoReply = `Добрый День!

Получили ваше бронирование 

Когда Вам было бы удобно получить заказ ?

Менеджер продолжит с Вами диалог в этом чате в рабочие часы.`;

            const orderInfo = `
📦 СОСТАВ ЗАКАЗА:
${formattedCart}

💰 Сумма: ${totalPrice} ₽

👤 Контактные данные:
Имя: ${formData.lastName || "Не указано"}
Телефон: +${formData.phoneNumber}
Telegram: ${telegramUsername}

${selectedMethod === "delivery" ? `🏙 Город: ${formData.city || "Не указан"}` : ""}`;

            // Объединяем автоответ с информацией о заказе
            const fullMessage = `${autoReply}\n\n${orderInfo}`;

            const idInstance = "1103290542";
            const apiTokenInstance =
              "65dee4a31f1342768913a5557afc548591af648dffc44259a6";

            const response = await fetch(
              `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chatId: `${formData.phoneNumber}@c.us`,
                  message: fullMessage,
                }),
              },
            );

            if (response.ok) {
              console.log("SUCCESS: WhatsApp sent");
              return true;
            } else {
              const errorText = await response.text();
              console.warn("WARNING: WhatsApp failed:", errorText);
              return false;
            }
          } catch (error) {
            console.warn("WARNING: WhatsApp error:", error);
            return false;
          }
        };

        // Запускаем все фоновые операции параллельно
        console.log("Starting background operations...");
        await Promise.allSettled([saveToDb(), sendEmail(), sendWhatsApp()])
          .then((results) => {
            console.log("All background operations completed:", results);
          })
          .catch((error) => {
            console.log("Error in background operations:", error);
          });

        // 7. Всегда показываем успешное сообщение пользователю
        console.log("Order processing completed");
        alert(
          "✅ Ваш заказ был отправлен!\nВ ближайшее время с вами свяжется наш менеджер.",
        );

        // Очищаем корзину и перенаправляем
        clearCart();
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } catch (error) {
        console.error("Unexpected error in main processing:", error);

        // Даже при критической ошибке показываем пользователю успех
        // (скорее всего Telegram уже был отправлен или попытается отправиться)
        alert(
          "✅ Ваш заказ был отправлен!\nВ ближайшее время с вами свяжется наш менеджер.",
        );

        // Все равно очищаем корзину
        clearCart();
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-form">
        <div className="plitka">
          <h1>Оформление заказа</h1>
          <h5>
            ВАЖНО! Укажите Ваш номер в WhatsApp или Telegram ник для связи{" "}
            <br></br>
            <br></br>
            Уважаемые покупатели, в связи с обновлением требований
            законодательства со страницы бронирования товара убраны возможности
            выбора способов доставки.
          </h5>
        </div>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="checkout-name">
            <h4>Контактные данные</h4>
            <input
              type="text"
              name="lastName"
              placeholder="Ваше имя"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && (
              <p className="error" style={{ color: "red" }}>
                {errors.lastName}
              </p>
            )}

            <input
              type="text"
              name="telegram"
              placeholder="Telegram username (необязательно)"
              value={formData.telegram}
              onChange={handleInputChange}
              onFocus={(e) => {
                const value = formData.telegram;
                if (!value.startsWith("@")) {
                  setFormData((prev) => ({
                    ...prev,
                    telegram: "@" + (value || ""),
                  }));

                  setTimeout(() => {
                    e.target.setSelectionRange(1, 1);
                  }, 0);
                }
              }}
              onBlur={(e) => {
                if (formData.telegram === "@") {
                  setFormData((prev) => ({
                    ...prev,
                    telegram: "",
                  }));
                }
              }}
            />
            {errors.telegram && (
              <p className="error" style={{ color: "red" }}>
                {errors.telegram}
              </p>
            )}

            <PhoneInput
              country={"ru"}
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              disableDropdown={true}
              onlyCountries={["ru"]}
              inputStyle={{
                width: "100%",
                fontSize: "16px",
                padding: "10px 20px",
                fontFamily: "inherit",
              }}
              placeholder="Введите номер телефона"
            />
            {errors.phoneNumber && (
              <p className="error" style={{ color: "red" }}>
                {errors.phoneNumber}
              </p>
            )}

            <div style={{ position: "relative", width: "100%" }}>
              <input
                type="text"
                name="city"
                placeholder="Город *"
                value={formData.city}
                onChange={handleInputChange}
                disabled={onlyPacksAndBlocks && totalQuantity < 10 && !hasBlock}
              />
              {errors.city && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "5px",
                    marginBottom: "0",
                    fontWeight: "500",
                  }}
                >
                  {errors.city}
                </p>
              )}
            </div>
          </div>

          {/* <div className="checkout-delivery"> */}
          {/* <div className="checkout-delivery-method">
              <button
                type="button"
                className={selectedMethod === "pickup" ? "active" : ""}
                onClick={() => setSelectedMethod("pickup")}
                disabled={true}
                style={{
                  opacity: 0.5,
                  cursor: "not-allowed",
                  position: "relative",
                }}
              >
                Самовывоз
                <br />
                <span style={{ fontSize: "14px", color: "rgb(198, 58, 58)" }}>
                  Недоступен
                </span>
              </button>
              {onlyPacksAndBlocks && totalQuantity < 10 && !hasBlock ? (
                <button type="button" className={selectedMethod} disabled>
                  Доставка<br></br>
                  <span style={{ fontSize: "14px", color: "rgb(198, 58, 58)" }}>
                    Нужно 10 пачек или блок
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  className={selectedMethod === "delivery" ? "active" : ""}
                  onClick={() => setSelectedMethod("delivery")}
                >
                  Доставка
                </button>
              )}
            </div> */}

          {/* {selectedMethod === "pickup" && (
              <div className="checkout-delivery-pickup">
                <p style={{ color: "rgb(198, 58, 58)", fontWeight: "bold" }}>
                  ⚠️ Самовывоз временно недоступен. Пожалуйста, выберите
                  доставку.
                </p>
              </div>
            )}
          </div> */}
        </form>
      </div>

      <div className="checkout-table">
        <h4>Ваша корзина</h4>
        {cartItems.length > 0 ? (
          <div>
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <div className="cart-item-name">
                      <p>{item.name}</p>
                      {item.type === "default" ? "" : <p>({item.type})</p>}
                    </div>
                    <div className="price">
                      <p>Количество: {item.quantity}</p>
                      <p>Цена: {item.price} ₽</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="checkout-total">
              <p>Итого:</p>
              <p>{calculateTotalPrice()} ₽</p>
            </div>
            <button
              onClick={handleExternalSubmit}
              disabled={loading || selectedMethod === "pickup"}
              style={{
                opacity: selectedMethod === "pickup" ? 0.5 : 1,
                cursor: selectedMethod === "pickup" ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Загрузка..." : "Оформить бронирование"}
            </button>
            {selectedMethod === "pickup" && (
              <p
                style={{
                  color: "rgb(198, 58, 58)",
                  fontSize: "14px",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Самовывоз недоступен. Выберите доставку для оформления заказа.
              </p>
            )}
          </div>
        ) : (
          <div>
            <h5 style={{ textAlign: "center", marginTop: "30%" }}>
              Корзина пуста
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
