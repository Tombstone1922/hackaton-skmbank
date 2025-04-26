// src/components/TrendsAndExpenses/TrendsAndExpenses.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "../../styles/TrendsAndExpenses.scss";

const TrendsAndExpenses = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="trends-and-expenses">
      {isAuthenticated ? (
        <>
          {/* График трендов */}
          <section className="chart-section">
            <h2>График трендов</h2>
            <div className="chart-placeholder">График трендов</div>
          </section>

          {/* Расходы за апрель */}
          <section className="chart-section">
            <h2>Расходы за апрель</h2>
            <div className="chart-placeholder">Расходы за апрель</div>
          </section>
        </>
      ) : (
        <div className='not-auth-part'>
            <div className='expenses-part'>
                <h2>График трендов</h2>
                <p className="auth-message">Зайдите в аккаунт или зарегистрируйтесь</p>
            </div>
            <div className='trends-part'>
                <h2>Расходы за апрель</h2>
                <p className="auth-message">Зайдите в аккаунт или зарегистрируйтесь</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default TrendsAndExpenses;