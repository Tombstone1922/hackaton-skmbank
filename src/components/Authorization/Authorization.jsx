import React, { useState, useContext } from 'react';
import "../../styles/Authorization.scss";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Authorization = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Состояния для ошибок
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Валидация имени пользователя
  const validateUsername = (value) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/; // Только английские буквы, цифры и нижнее подчеркивание
    if (!value) {
      setUsernameError(''); // Очищаем ошибку, если поле пустое
      return false;
    }
    if (!usernameRegex.test(value)) {
      setUsernameError('Имя пользователя должно содержать только английские буквы, цифры и нижнее подчеркивание');
      return false;
    }
    if (/^[^a-zA-Z]/.test(value)) {
      setUsernameError('Имя пользователя не должно начинаться со спецсимвола или цифры');
      return false;
    }
    setUsernameError('');
    return true;
  };

  // Валидация email
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError(''); // Очищаем ошибку, если поле пустое
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError('Некорректный email');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Валидация пароля
  const validatePassword = (password, confirmPassword) => {
    if (!password || !confirmPassword) {
      setPasswordError(''); // Очищаем ошибку, если одно из полей пустое
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Пароль должен содержать минимум 6 символов');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация полей
    const isUsernameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password, confirmPassword);

    // Если есть ошибки, прекращаем выполнение
    if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
      console.log('Validation failed:', { usernameError, emailError, passwordError });
      return;
    }

    try {
      // Отправка данных на сервер
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(); // Авторизуем пользователя
        navigate('/'); // Перенаправляем на главную страницу
      } else {
        setGeneralError(data.message || 'Произошла ошибка при регистрации');
      }
    } catch (error) {
      setGeneralError('Не удалось подключиться к серверу');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-main">
        <h2 className="auth-title">Регистрация</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="auth-container">
            {/* Поле имени пользователя */}
            <div className="auth-input">
              <input
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  validateUsername(e.target.value);
                }}
                required
              />
              {usernameError && <p className="error-message">{usernameError}</p>}
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
                required
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>

            {/* Поле пароля */}
            <div className='password'>
            <div className="auth-input password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value, confirmPassword);
                }}
                required
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
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validatePassword(password, e.target.value);
                }}
                required
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

            {/* Сообщение об ошибке пароля */}
            {passwordError && <p className="error-message">{passwordError}</p>}

            {/* Общая ошибка */}
            {generalError && <p className="error-message">{generalError}</p>}
          </div>

          {/* Кнопка регистрации */}
          <button type="submit" className="auth-button">
            Зарегистрироваться
          </button>
        </form>

        {/* Ссылка на страницу входа */}
        <Link to="/login" className="auth-link">
          Вернуться ко входу
        </Link>
      </div>
    </div>
  );
};

export default Authorization;