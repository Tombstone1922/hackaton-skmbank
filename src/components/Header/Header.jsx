// src/components/Header/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src="/logo.png" alt="Логотип Халва" className='logo-img'/>
      </div>
      <nav>
        <ul>
          <li><a href="#">Главная</a></li>
          <li><a href="#">Чеки</a></li>
          <li><a href="#">История</a></li>
          <li><a href="#">Рекомендации</a></li>
        </ul>
      </nav>
      <div className="user">
        <a href="#" className="login">Войти</a>
        <img src="/user.png" alt="Аватар пользователя" className='user-img'/>
      </div>
    </header>
  );
};

export default Header;