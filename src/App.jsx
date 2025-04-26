// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext/AuthContext';
import Header from './components/Header/Header';
import ExpensesChart from './components/ExpensesChart/ExpensesChart';
import TrendsChart from './components/TrendsChart/TrendsChart';
import Recommendations from './components/Recommendations/Recommendations';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <main className='main-page'>
            <Routes>
              {/* Главная страница с двумя компонентами */}
              <Route
                path="/"
                element={
                  <>
                    <ExpensesChart />
                    <TrendsChart />
                  </>
                }
              />
              {/* Страница рекомендаций */}
              <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;