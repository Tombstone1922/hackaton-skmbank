// src/components/TrendsChart/TrendsChart.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import '../../styles/TrendsChart.scss'; // Импорт SCSS без `from`

const TrendsChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Храним ссылку на экземпляр диаграммы

  // Состояние для отслеживания выбранного периода
  const [selectedPeriod, setSelectedPeriod] = useState('неделя'); // По умолчанию выбрана "неделя"

  const periodData = {
    неделя: {
      labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      data: [1000, 1200, 1100, 1300, 1400, 1500, 1600],
    },
    месяц: {
      labels: ['1 неделя', '2 неделя', '3 неделя', '4 неделя'],
      data: [10000, 12000, 11000, 13000],
    },
    год: {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      data: [50000, 55000, 60000, 65000, 70000, 72000, 73000, 78000, 90000, 94000, 97000, 100500],
    },
  };

  // Функция для обработки клика на кнопки
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
  
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
  
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: periodData[selectedPeriod].labels,
          datasets: [{
            label: 'Расходы',
            data: periodData[selectedPeriod].data,
            borderColor: '#3498db',
            borderWidth: 2,
            fill: false,
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  
    return () => chartInstance.current?.destroy();
  }, [selectedPeriod]); // Добавлен selectedPeriod в зависимости

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