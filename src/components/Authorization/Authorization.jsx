// src/components/Authorization/Authorization.jsx

import React, { useState } from 'react';
import "../../styles/Authorization.scss";
import { Link } from 'react-router-dom';

const Authorization = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Состояния для ошибок
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Валидация логина
  const validateLogin = (value) => {
    const loginRegex = /^[a-zA-Z0-9_]+$/;
    if (!value) {
      setLoginError('');
    } else if (!loginRegex.test(value)) {
      setLoginError('Логин может содержать только английские буквы, цифры и нижнее подчеркивание');
    } else if (/^[^a-zA-Z]/.test(value)) {
      setLoginError('Логин не должен начинаться со спецсимвола или цифры');
    } else {
      setLoginError('');
    }
  };

  // Валидация email
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError('');
    } else if (!emailRegex.test(value)) {
      setEmailError('Некорректный email');
    } else {
      setEmailError('');
    }
  };

  // Валидация пароля
  const validatePassword = (password, confirmPassword) => {
    if (!password || !confirmPassword) {
      setPasswordError('');
    } else if (password !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
    } else if (password.length < 6) {
      setPasswordError('Пароль должен содержать минимум 6 символов');
    } else {
      setPasswordError('');
    }
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем все поля
    validateLogin(login);
    validateEmail(email);
    validatePassword(password, confirmPassword);

    // Если нет ошибок, можно продолжить регистрацию
    if (!loginError && !emailError && !passwordError) {
      alert('Регистрация успешна!');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-main">
        <h2 className="auth-title">Регистрация</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="auth-container">
            {/* Поле логина */}
            <div className="auth-input">
              <input
                type="text"
                placeholder="Логин"
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                  validateLogin(e.target.value);
                }}
              />
              {loginError && <p className="error-message">{loginError}</p>}
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
            <div className="password-wrapper">
              <div className="auth-input password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value, confirmPassword);
                  }}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Скрыть' : 'Показать'}
                </button>
              </div>
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>

            {/* Поле подтверждения пароля */}
            <div className="password-wrapper">
              <div className="auth-input password-input">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Повторите пароль"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validatePassword(password, e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Скрыть' : 'Показать'}
                </button>
              </div>
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
          </div>

          {/* Кнопка регистрации */}
          <button type="submit" className="auth-button">
            Зарегистрироваться
          </button>
        </form>

        {/* Ссылка на страницу входа */}
        <Link to="/login" className="auth-link">
          Вернуться к входу
        </Link>
      </div>
    </div>
  );
};

export default Authorization;