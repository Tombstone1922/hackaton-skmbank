// src/components/Authorization/Authorization.jsx
import React from 'react';
import "../../styles/Login.scss";
import { Link } from 'react-router-dom'; // Импортируем Link

const Authorization = () => {
  return (
    <div className="auth-bg">
      <div className="auth-main">
        <h2 className="auth-title">Регистрация</h2>
        <div className="auth-container">
          <div className="auth-input">
            <input
              type="text"
              placeholder="Логин"
            />
          </div>
          <div className="auth-input">
            <input
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="auth-input">
            <input
              type="text"
              placeholder="Пароль"
            />
          </div>
          <div className="auth-input">
            <input
              type="text"
              placeholder="Повторите пароль"
            />
          </div>
        </div>
        <button className="auth-button">Войти</button>
        <Link to="/login" className="auth-link">
          Вернуться к входу
        </Link>
      </div>
    </div>
  );
};

export default Authorization;