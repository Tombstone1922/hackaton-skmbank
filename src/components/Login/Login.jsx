// src/components/Login/Login.jsx
import React from 'react';
import "../../styles/Login.scss";
import { Link } from 'react-router-dom'; // Импортируем Link

const Login = () => {
  return (
    <div className="login-bg">
      <div className="login-main">
        <h2 className="login-title">Вход</h2>
        <div className="login-container">
          <div className="login-input">
            <input
              type="text"
              placeholder="Логин"
            />
          </div>
          <div className="login-input">
            <input
              type="text"
              placeholder="Пароль"
            />
          </div>
        </div>
        <button className="login-button">Войти</button>
        <Link to="/authorization" className="login-link">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default Login;