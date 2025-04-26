import React, { useState } from 'react';
import "../../styles/Checks.scss"; // Импорт SCSS

const Checks = () => {
  const [selectedFile, setSelectedFile] = useState(null); // Состояние для выбранного файла
  const [error, setError] = useState(''); // Состояние для ошибки
  
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
  
  // Открывает диалоговое окно выбора файлов
  const openFileInput = () => {
    document.getElementById('file-upload').click(); // Программно вызываем клик на скрытом input
  };

  const [isOpen, setIsOpen] = useState(false);

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
      </div>

      <div className="check-container">
        <p className="title">Ваши чеки</p>
        <div className="check-table">
          <div className="check-card">
            <div className="top-section">
              <p className="title">Чек №85204</p>
              <p className="date">Отсканировано: 25.04.2025 10:03</p>
            </div>
            <div className="info-table opened">
              <div className="item">
                <p className="item-title">Сумма платежа</p>
                <p className="item-value">287.93 ₽</p>
              </div>
              <div className="item">
                <p className="item-title">Дата и время совершения платежа</p>
                <p className="item-value">25.04.2025 14:00</p>
              </div>
              <div className="item">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checks;