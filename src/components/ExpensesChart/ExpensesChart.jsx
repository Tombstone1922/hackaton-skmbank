// src/components/ExpensesChart/ExpensesChart.jsx
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { Link } from 'react-router-dom'; // Импортируем Link
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
          responsive: true, // Адаптивность включена
          maintainAspectRatio: false, // Отключаем сохранение пропорций
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }

    // Функция для обработки изменения размеров окна
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize(); // Перерисовываем диаграмму
        chartInstance.current.update(); // Принудительно обновляем
      }
    };

    // Добавляем обработчик события resize
    window.addEventListener('resize', handleResize);

    // Очистка при размонтировании компонента
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Уничтожаем диаграмму
      }
      window.removeEventListener('resize', handleResize); // Удаляем обработчик
    };
  }, []);

  return (
    <section className="expenses">
      <h2>Расходы за апрель</h2>
      <div className="chart-container">
        <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
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
      {/* Кнопка "Добавить чек" заменяется на Link */}
      <Link to="/checks" className="add-check">
        Добавить чек
      </Link>
    </section>
  );
};

export default ExpensesChart;