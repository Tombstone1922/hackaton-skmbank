// src/components/ExpensesChart/ExpensesChart.jsx
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import "../../styles/ExpensesChart.scss"; // Импорт SCSS

const ExpensesChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Храним ссылку на экземпляр диаграммы

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Если уже есть диаграмма, уничтожаем её
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Создаем новую диаграмму
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Продукты', 'Транспорт', 'Развлечения', 'Прочее'],
          datasets: [
            {
              data: [6000, 3750, 3000, 2250],
              backgroundColor: ['#2ecc71', '#3498db', '#e74c3c', '#f1c40f'],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }

    // Очистка при размонтировании компонента
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <section className="expenses">
      <h2>Расходы за апрель</h2>
      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
      <ul className="expense-list">
        <li>
          <span className="circle green"></span>
          <span>Продукты</span>
          <span>6 000 ₽</span>
        </li>
        <li>
          <span className="circle blue"></span>
          <span>Транспорт</span>
          <span>3 750 ₽</span>
        </li>
        <li>
          <span className="circle red"></span>
          <span>Развлечения</span>
          <span>3 000 ₽</span>
        </li>
        <li>
          <span className="circle yellow"></span>
          <span>Прочее</span>
          <span>2 250 ₽</span>
        </li>
      </ul>
      <button className="add-check">Добавить чек</button>
    </section>
  );
};

export default ExpensesChart;