// src/components/Recommendations.jsx
import React from 'react';
import "../../styles/Recommendations.scss"; // Импорт SCSS

const Recommendations = () => {
  return (
    <div className="recommendations">
      <h2>Лучшие предложения</h2>
      <div className="recommendations-container">
        <div className="card">
          <div className="image-holder">
            <img src="../../../images/yandex-market.png"></img>
          </div>

          <div className="card-body">
            <p className="cashback">Кэшбэк 4%</p>
            <div className="card-body-description">
              <p className="title">Яндекс. Маркет</p>
              <p className="organization">Онлайн маркетплейс</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="image-holder">
            <img src="../../../images/ozon.png"></img>
          </div>
          <div className="card-body">
            <p className="cashback">Кэшбэк 2%</p>
            <div className="card-body-description">
              <p className="title">OZON.ru</p>
              <p className="organization">Онлайн маркетплейс</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="image-holder">
            <img src="../../../images/hoff.png"></img>
          </div>
          <div className="card-body">
            <p className="cashback">Кэшбэк 5%</p>
            <div className="card-body-description">
              <p className="title">Hoff</p>
              <p className="organization">Гипермаркеты мебели</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="image-holder">
            <img src="../../../images/cuper.png"></img>
          </div>
          <div className="card-body">
            <p className="cashback">Кэшбэк 3%</p>
            <div className="card-body-description">
              <p className="title">Купер</p>
              <p className="organization">Доставка продуктов</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="image-holder">
            <img src="../../../images/mts.png"></img>
          </div>
          <div className="card-body">
            <p className="cashback">Кэшбэк 4%</p>
            <div className="card-body-description">
              <p className="title">МТС</p>
              <p className="organization">Салоны сотовой связи</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="image-holder">
            <img src="../../../images/lamoda.png"></img>
          </div>
          <div className="card-body">
            <p className="cashback">Кэшбэк 3%</p>
            <div className="card-body-description">
              <p className="title">Lamoda.ru</p>
              <p className="organization">Одежда и обувь</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;