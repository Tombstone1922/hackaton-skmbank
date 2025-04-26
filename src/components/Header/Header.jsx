// src/components/Header/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Импортируем useLocation

const Header = () => {
  const location = useLocation(); // Получаем текущий путь

  return (
    <header>
      <a href="/" className="logo">
        <img src="/logo.png" alt="Логотип Халва" className='logo-img'/>
      </a>
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
            >
              Главная
            </Link>
          </li>
          <li>
            <Link
              to="/checks"
              className={location.pathname === '/checks' ? 'active' : ''}
            >
              Чеки
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className={location.pathname === '/history' ? 'active' : ''}
            >
              История
            </Link>
          </li>
          <li>
            <Link
              to="/recommendations"
              className={location.pathname === '/recommendations' ? 'active' : ''}
            >
              Рекомендации
            </Link>
          </li>
        </ul>
      </nav>
      <div className="user">
        <a href="/login" className="login">Войти</a>
        <img src="/user.png" alt="Аватар пользователя" className='user-img'/>
      </div>
    </header>
  );
};

export default Header;