import React from 'react';
import "../../styles/Checks.scss"; // Импорт SCSS

const Checks = () => {
  return (
    <div className="checks">
        <div className="check-loader">
        <img src="../../../images/receipt-payment-check.svg"></img>
            {/* <button className="load-button">Выберите файл</button> */}
            <p className="primary-text">Загрузите или перетащите сюда чек</p>
            <p className="secondary-text">Принимаются файлы *.jpg *.png *.pdf</p>
        </div>

        <div className="check-container">
            <p className="title">Ваши чеки</p>
            <div className="check-table"></div>
        </div>
    </div>
  );
};

export default Checks;