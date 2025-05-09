// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import ExpensesChart from './components/ExpensesChart/ExpensesChart';
import TrendsChart from './components/TrendsChart/TrendsChart';
import Recommendations from './components/Recommendations/Recommendations';
import Login from './components/Login/Login';
import Checks from './components/Checks/Checks';
import Authorization from './components/Authorization/Authorization';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <main className="main-page">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <ExpensesChart />
                    <TrendsChart />
                  </>
                }
              />
              <Route path="/checks" element={<Checks />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/login" element={<Login />} />
              <Route path="/authorization" element={<Authorization />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;