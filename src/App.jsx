// src/App.jsx
import React from 'react';
import './styles/style.scss';
import Header from './components/Header/Header';
import ExpensesChart from './components/ExpensesChart/ExpensesChart';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <ExpensesChart />
      </main>
    </div>
  );
}

export default App;