// src/components/Header/Header.jsx
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header>
      <a href="/" className="logo">
        <img src="/logo.png" alt="Логотип Халва" className="logo-img" />
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
        {isAuthenticated ? (
          <button onClick={logout} className="logout">
            Выйти
          </button>
        ) : (
          <Link to="/login" className="login">
            Войти
          </Link>
        )}
        <img src="/user.png" alt="Аватар пользователя" className="user-img" />
      </div>
    </header>
  );
};

export default Header;