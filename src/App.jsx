// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext/AuthContext';
import React from 'react';
import './styles/style.scss';
import Header from './components/Header/Header';
import ExpensesChart from './components/ExpensesChart/ExpensesChart';
import Recommendations from './components/Recommendations/Recommendations';

function App() {
  return (
    // <div className="App">
    //   <Header />
    //   <main>
    //     <ExpensesChart />
    //   </main>
    // </div>
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <div className='main'>
          <Routes>
          <Route path="/" element={<ExpensesChart />} />
          <Route path="/recommendations" element={<Recommendations />} />
          </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;