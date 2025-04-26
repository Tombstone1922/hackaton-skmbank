// src/components/TrendsChart/TrendsChart.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import '../../styles/TrendsChart.scss'; // Импорт SCSS без `from`

const TrendsChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Храним ссылку на экземпляр диаграммы

  // Состояние для отслеживания выбранного периода
  const [selectedPeriod, setSelectedPeriod] = useState('неделя'); // По умолчанию выбрана "неделя"

  // Функция для обработки клика на кнопки
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Если уже есть диаграмма, уничтожаем её
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Создаем новую диаграмму
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['1 неделя', '2 неделя', '3 неделя', '4 неделя'],
          datasets: [
            {
              label: 'Расходы',
              data: [10000, 12000, 11000, 13000],
              borderColor: '#3498db',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
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
    <section className="trends">
      <h2>График трендов</h2>
      <div className="time-periods">
        {/* Кнопки для выбора периода */}
        <button
          className={selectedPeriod === 'неделя' ? 'active' : ''}
          onClick={() => handlePeriodChange('неделя')}
        >
          Неделя
        </button>
        <button
          className={selectedPeriod === 'месяц' ? 'active' : ''}
          onClick={() => handlePeriodChange('месяц')}
        >
          Месяц
        </button>
        <button
          className={selectedPeriod === 'год' ? 'active' : ''}
          onClick={() => handlePeriodChange('год')}
        >
          Год
        </button>
      </div>
      <div className="chart-container">
        <canvas ref={chartRef} className="chart"></canvas>
      </div>
      <div className="summary">
        <p>Самая крупная трата: 5000 ₽ (Продукты, 9 апреля)</p>
        <p>Средний дневной доход: 750 ₽</p>
      </div>
    </section>
  );
};

export default TrendsChart;