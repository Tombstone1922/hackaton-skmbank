// src/components/Login/Login.jsx
import React from 'react';
import "../../styles/Login.scss";

const Login = () => {
    return (
      <div className="auth-bg">
        <div className="auth-main">
            <h2 className="auth-title">Вход</h2>
            <div className="auth-container">
                <div className="auth-input">
                    <p className="title">Логин или адрес электронной почты *</p>
                    <input
                    type="text"
                    placeholder="Логин"
                    />
                </div>
                <div className="auth-input">
                    <p className="title">Пароль *</p>
                    <input
                    type="text"
                    placeholder="Пароль"
                    />
                </div>
            </div>
            <button className="auth-button">Войти</button>
        </div>
      </div>
    );
  };
  
  export default Login;