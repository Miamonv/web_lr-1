import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProgressPage = () => {
  const [allLessons, setAllLessons] = useState([]);
  const [passedLessons, setPassedLessons] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // завантажуємо всі існуючі уроки
    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then(res => res.json())
      .then(data => setAllLessons(data.lessons || []))
      .catch(err => console.error('Помилка JSON:', err));

    // завантажуємо реально пройдені юзером
    fetch('https://web-lr-1.onrender.com/api/lessons/passed', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setPassedLessons(Array.isArray(data) ? data : []))
    .catch(err => console.error(err));
  }, []);

  // динамічний розрахунок прогресу для модулів
  const getProgressPercent = (moduleId) => {
    const moduleLessons = allLessons.filter(l => l.moduleId === moduleId);
    if (moduleLessons.length === 0) return 0;
    
    const passedInModule = passedLessons.filter(passed => 
       moduleLessons.some(l => String(l.id) === String(passed.lessonId))
    ).length;

    return Math.round((passedInModule / moduleLessons.length) * 100);
  };

  // загальна статистика
  const totalLessons = allLessons.length;
  const totalPassed = passedLessons.length;
  const totalPercent = totalLessons === 0 ? 0 : Math.round((totalPassed / totalLessons) * 100);
  
  // рахуємо години
  const totalMinutes = passedLessons.reduce((acc, passed) => {
    const lesson = allLessons.find(l => String(l.id) === String(passed.lessonId));
    return acc + (lesson ? lesson.duration : 0);
  }, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  // закриті модулі
  const modules = ['module-1', 'module-2', 'module-3'];
  const closedModules = modules.filter(m => getProgressPercent(m) === 100).length;

  return (
    <>      
      <main className="progress-main">
        <div className="progress-container">
          <h1 className="progress-title">Мій <span className="gradient-text">Прогрес</span></h1>

          <section className="stats-grid">
            <div className="stat-card">
              <h3>{totalPercent}%</h3>
              <p>Курсу пройдено</p>
            </div>
            <div className="stat-card">
              <h3>{totalHours}</h3>
              <p>Годин практики</p>
            </div>
            <div className="stat-card">
              <h3>{closedModules}/3</h3>
              <p>Модулів закрито</p>
            </div>
          </section>

          <h2 className="modules-title">Програма навчання</h2>
          <section className="modules-grid">
            {modules.map((moduleId, index) => {
              const percent = getProgressPercent(moduleId);
              const isCompleted = percent === 100;
              const moduleTitles = ["Основи композиції", "Студійне світло", "Комерційна ретуш"];
              
              let statusText = `${percent}% Пройдено`;
              let cardClass = "in-progress";
              
              if (isCompleted) {
                 statusText = "✔️ Пройдено";
                 cardClass = "completed";
              } else if (percent === 0) {
                 statusText = "⏳ Ще не розпочато";
                 cardClass = "locked";
              }

              return (
                <Link to={`/lessons#${moduleId}`} className={`module-card ${cardClass}`} style={{ textDecoration: 'none' }} key={moduleId}>
                  <div className="module-header">
                    <span className="module-status">{statusText}</span>
                    <h4>Модуль {index + 1}: {moduleTitles[index]}</h4>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ '--progress': `${percent}%` }}></div>
                  </div>
                </Link>
              );
            })}
          </section>
        </div>
      </main>
    </>
  );
};

export default ProgressPage;