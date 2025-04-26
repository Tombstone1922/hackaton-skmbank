// src/components/Authorization/Authorization.jsx
import React, { useState } from 'react';
import "../../styles/Authorization.scss";
import { Link } from 'react-router-dom';

const Authorization = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Состояние для показа/скрытия пароля
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Состояние для показа/скрытия подтверждения пароля
  const [emailError, setEmailError] = useState(''); // Ошибка для email

  // Регулярное выражение для проверки email
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Некорректный email');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-main">
        <h2 className="auth-title">Регистрация</h2>
        <div className="auth-container">
          {/* Поле логина */}
          <div className="auth-input">
            <input
              type="text"
              placeholder="Логин"
            />
          </div>

          {/* Поле email */}
          <div className="auth-input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>

          {/* Поле пароля */}
          <div className="auth-input password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Скрыть' : 'Показать'}
            </button>
          </div>

          {/* Поле подтверждения пароля */}
          <div className="auth-input password-input">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? 'Скрыть' : 'Показать'}
            </button>
          </div>
        </div>

        {/* Кнопка регистрации */}
        <button className="auth-button">Зарегистрироваться</button>

        {/* Ссылка на страницу входа */}
        <Link to="/login" className="auth-link">
          Вернуться к входу
        </Link>
      </div>
    </div>
  );
};

export default Authorization;