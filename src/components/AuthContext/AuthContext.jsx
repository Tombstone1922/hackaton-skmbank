// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';

// Создаём контекст
export const AuthContext = createContext();

// Создаём провайдер
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Состояние пользователя

  // Функция для входа
  const login = (userData) => {
    setUser(userData);
  };

  // Функция для выхода
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};