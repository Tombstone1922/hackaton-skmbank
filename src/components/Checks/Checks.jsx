// src/components/Checks/Checks.jsx
import React, { useState } from 'react';
import "../../styles/Checks.scss"; // Импорт SCSS
import Tesseract from 'tesseract.js'; // Библиотека для распознавания текста
import Jimp from 'jimp-browser'; // Библиотека для предварительной обработки изображений

const Checks = () => {
  const [selectedFile, setSelectedFile] = useState(null); // Состояние для выбранного файла
  const [error, setError] = useState(''); // Состояние для ошибок
  const [results, setResults] = useState(null); // Состояние для результатов распознавания
  const [progress, setProgress] = useState(0); // Состояние для прогресса
  const [isProcessing, setIsProcessing] = useState(false); // Состояние для процесса обработки

  // Обработчик выбора файла
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Получаем выбранный файл
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Разрешенные типы файлов
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file); // Сохраняем файл в состоянии
        setError(''); // Очищаем ошибку
      } else {
        setError('Недопустимый формат файла. Принимаются только *.jpg, *.png, *.pdf'); // Показываем ошибку
        setSelectedFile(null); // Очищаем выбранный файл
      }
    }
  };

  // Функция для открытия диалогового окна выбора файлов
  const openFileInput = () => {
    document.getElementById('file-upload').click(); // Программно вызываем клик на скрытом input
  };

<<<<<<< Updated upstream
  const [isOpen, setIsOpen] = useState(false);
=======
  // Функция для обработки и распознавания чека
  const processReceipt = async () => {
    if (!selectedFile) return;

    try {
      setIsProcessing(true);
      setProgress(0);

      // Шаг 1: Предварительная обработка изображения
      updateProgress(10, "Обработка изображения...");
      const processedImage = await preprocessImage(selectedFile);

      // Шаг 2: Распознавание текста
      updateProgress(30, "Распознавание текста...");
      const { data: { text } } = await Tesseract.recognize(
        processedImage,
        'rus+eng',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              const progressPercent = 30 + Math.floor(m.progress * 60);
              updateProgress(progressPercent, "Анализ текста...");
            }
          },
          preserve_interword_spaces: 1,
          tessedit_char_whitelist: '0123456789.,абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:/- '
        }
      );

      // Шаг 3: Извлечение данных
      updateProgress(95, "Анализ данных...");
      const result = {
        date: extractDate(text),
        time: extractTime(text),
        total: extractTotal(text),
        shop: extractShop(text),
        items: extractItems(text),
        rawText: text
      };
      updateProgress(100, "Готово!");
      setResults(result);
    } catch (error) {
      setError(`Ошибка при обработке чека: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Функция предварительной обработки изображения
  async function preprocessImage(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async function(event) {
        try {
          // Используем Jimp для обработки изображения
          const image = await Jimp.read(event.target.result);
          await image
            .greyscale()
            .contrast(0.5)
            .normalize()
            .quality(100);
          // Конвертируем обратно в base64
          const processedData = await image.getBase64Async(Jimp.MIME_JPEG);
          resolve(processedData);
        } catch (error) {
          console.warn("Ошибка обработки изображения, используем оригинал", error);
          resolve(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Функции извлечения данных
  function extractDate(text) {
    const dateRegex = /(\d{2}[./-]\d{2}[./-]\d{4})|(\d{4}[./-]\d{2}[./-]\d{2})/;
    const match = text.match(dateRegex);
    return match ? match[0] : null;
  }

  function extractTime(text) {
    const timeRegex = /(\d{1,2}:\d{2}(?::\d{2})?)/;
    const match = text.match(timeRegex);
    return match ? match[0] : null;
  }

  function extractTotal(text) {
    const totalRegex = /(ИТОГО|СУММА|Total|Всего|К ОПЛАТЕ)[:\s]*(\d+[,.]\d{2})/i;
    const match = text.match(totalRegex);
    if (match) return parseFloat(match[2].replace(',', '.'));
    const amounts = text.match(/\d+[,.]\d{2}/g) || [];
    if (amounts.length > 0) {
      const maxAmount = Math.max(...amounts.map(a => parseFloat(a.replace(',', '.'))));
      return maxAmount > 0 ? maxAmount : null;
    }
    return null;
  }

  function extractShop(text) {
    const lines = text.split('\n').slice(0, 5);
    for (const line of lines) {
      const cleanLine = line.trim();
      if (cleanLine && !cleanLine.match(/(дата|время|чек|касс|номер)/i)) {
        return cleanLine;
      }
    }
    return null;
  }

  function extractItems(text) {
    const items = [];
    const lines = text.split('\n');
    const itemPatterns = [
      /(.+?)\s+(\d+[,.]\d{2})\s*$/,
      /(.+?)\s+(\d+)\s*[xх*]\s*(\d+[,.]\d{2})/,
      /(.+?)\s+(\d+[,.]\d{2})\s+(\d+[,.]\d{2})/
    ];
    for (const line of lines) {
      if (line.trim().length < 3) continue;
      for (const pattern of itemPatterns) {
        const match = line.trim().match(pattern);
        if (match) {
          items.push({
            name: match[1].trim(),
            quantity: match[2] ? parseInt(match[2]) : 1,
            price: parseFloat(match[match.length - 1].replace(',', '.'))
          });
          break;
        }
      }
    }
    return items;
  }

  // Функция обновления прогресса
  function updateProgress(percent, message) {
    setProgress(percent);
    console.log(message);
  }

  // Функция отображения результатов
  function displayResults() {
    let html = `
      <p><strong>Магазин:</strong> ${results.shop || 'не распознано'}</p>
      <p><strong>Дата:</strong> ${results.date || 'не распознана'}</p>
      <p><strong>Время:</strong> ${results.time || 'не распознано'}</p>
      <p><strong>Итого:</strong> ${results.total ? results.total.toFixed(2) + ' ₽' : 'не распознана'}</p>
    `;
    if (results.items.length > 0) {
      html += `<h3>Позиции:</h3><div id="itemsList">`;
      results.items.forEach((item, i) => {
        html += `
          <div class="item-row">
            <span class="item-name">${i + 1}. ${item.name}</span>
            <span class="item-price">${item.quantity} × ${item.price.toFixed(2)} ₽</span>
          </div>
        `;
      });
      html += `</div>`;
    }
    // Кнопка для просмотра сырого текста (для отладки)
    html += `
      <button onclick="document.getElementById('rawText').style.display='block';this.style.display='none'">
        Показать распознанный текст
      </button>
      <div id="rawText" style="display:none; margin-top:10px; padding:10px; background:#eee; white-space:pre-wrap;">
        ${results.rawText}
      </div>
    `;
    return html;
  }
>>>>>>> Stashed changes

  return (
    <div className="checks">
      {/* Блок загрузки чека */}
      <div className="check-loader" onClick={openFileInput}>
        <img src="../../../images/receipt-payment-check.svg" alt="Загрузка чека" />
        <p className="primary-text">Загрузите или перетащите сюда чек</p>
        <p className="secondary-text">Принимаются файлы *.jpg *.png *.pdf</p>
        <input
          id="file-upload"
          type="file"
          accept=".jpg,.png,.pdf" // Разрешенные форматы файлов
          style={{ display: 'none' }} // Скрываем стандартный input
          onChange={handleFileChange}
        />
        {error && <p className="error-message">{error}</p>}
        {selectedFile && (
          <p className="success-message">Файл "{selectedFile.name}" успешно загружен!</p>
        )}
        {isProcessing && (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
            <span>{progress}%</span>
          </div>
        )}
        {!isProcessing && selectedFile && (
          <button className="process-button" onClick={processReceipt}>
            Обработать чек
          </button>
        )}
        {results && (
          <div className="results">
            <h2>Результаты распознавания</h2>
            <div dangerouslySetInnerHTML={{ __html: displayResults() }} />
          </div>
        )}
      </div>

      {/* Блок с чеками */}
      <div className="check-container">
        <p className="title">Ваши чеки</p>
        <div className="check-table">
          <div className="check-card">
            <div className="top-section">
              <p className="title">Чек №85204</p>
              <p className="date">Отсканировано: 25.04.2025 10:03</p>
            </div>
<<<<<<< Updated upstream
            <div className="info-table opened">
              <div className="item">
                <p className="item-title">Сумма платежа</p>
                <p className="item-value">287.93 ₽</p>
=======
            <div className="info-table">
              <div className="item">
                <p className="item-title">Название организации</p>
                <p className="item-value">Master Grill</p>
>>>>>>> Stashed changes
              </div>
              <div className="item">
                <p className="item-title">Дата и время совершения платежа</p>
                <p className="item-value">25.04.2025 14:00</p>
              </div>
              <div className="item">
<<<<<<< Updated upstream
                <p className="item-title">Название организации</p>
                <p className="item-value">АГРОТОРГ</p>
              </div>
            </div>

            <button
            className="more-button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            >
              {isOpen ? 'Скрыть' : 'Подробнее'}
            </button>

            <div className={`info-table ${isOpen ? 'opened' : ''}`}>
              <div className="item">
                <p className="item-title">Тип операции</p>
                <p className="item-value">Приход</p>
              </div>
              <div className="item">
                <p className="item-title">ИНН</p>
                <p className="item-value">7825706086</p>
              </div>
              <div className="item">
                <p className="item-title">Адрес совершения платежа</p>
                <p className="item-value">446022,63,САМАРСКАЯ ОБЛАСТЬ,СЫЗРАНЬ Г,ЛОКОМОБИЛЬНАЯ УЛ,1</p>
              </div>
            </div>
=======
                <p className="item-title">Адрес совершения платежа</p>
                <p className="item-value">446022,63,САМАРСКАЯ ОБЛАСТЬ,СЫЗРАНЬ Г,ЛОКОМОБИЛЬНАЯ УЛ,1</p>
              </div>
            </div>
            <button className="more-button">Подробнее...</button>
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checks;