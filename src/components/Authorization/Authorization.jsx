import React, { useState, useContext } from 'react';
import "../../styles/Authorization.scss";
import { Link, useNavigate } from 'react-router-dom';  // Добавляем useNavigate для редиректа
import { AuthContext } from '../../context/AuthContext';

const Authorization = () => {
  const [username, setUsername] = useState(''); // Добавляем поле username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useContext(AuthContext);  // Контекст для авторизации
  const navigate = useNavigate();  // Хук для перенаправления

  // Валидация email
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Некорректный email');
    } else {
      setEmailError('');
    }
  };

  // Валидация пароля
  const validatePassword = (password, confirmPassword) => {
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

    validateEmail(email);
    const isPasswordValid = validatePassword(password, confirmPassword);

    if (emailError || !isPasswordValid) {
      return;
    }

    try {
      // Отправка данных на сервер (регистрация)
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), // Отправляется username, а не email как username
      });

      if (response.ok) {
        console.log('Registration successful');
        login(); // Авторизуем пользователя
        navigate('/'); // Перенаправляем на главную страницу
      } else {
        const errorData = await response.json();
        console.error('Ошибка регистрации:', errorData.message);
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-main">
        <h2 className="auth-title">Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-container">
            {/* Поле для имени пользователя */}
            <div className="auth-input">
              <input
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>

          {/* Кнопка регистрации */}
          <button type="submit" className="auth-button">Зарегистрироваться</button>
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
