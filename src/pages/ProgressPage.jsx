import { useState, useEffect } from 'react';
import LoginModal from '../components/LoginModal';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const ProgressPage = () => {
  const [progressBars, setProgressBars] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });

    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then(res => res.json())
      .then(data => setProgressBars(data.progressBars))
      .catch(err => console.error('Помилка JSON:', err));

      return () => unsubscribe();
  }, []);

  const getProgressPercent = (id) => {
    const bar = progressBars.find(b => b.id === id);
    return bar ? bar.percent : 0;
  };

  if (loadingAuth) {
    return (
      <main style={{ textAlign: 'center', paddingTop: '150px', minHeight: '60vh' }}>
        <p style={{ color: '#888' }}>Перевірка доступу...</p>
      </main>
    );
  }

  // якщо користувач не увійшов
  if (!user) {
    return (
      <main className="progress-main" style={{ textAlign: 'center', paddingTop: '150px', minHeight: '60vh' }}>
        <h2 style={{ color: '#fff' }}>Доступ закрито</h2>
        <p style={{ marginTop: '20px', color: '#888' }}>
          Будь ласка, увійдіть у свій акаунт через меню зверху, щоб переглядати свій прогрес.
        </p>
      </main>
    );
  }  

  return (
    <>      
      <main className="progress-main">
        <div className="progress-container">
          <h1 className="progress-title">Мій <span className="gradient-text">Прогрес</span></h1>

          <section className="stats-grid">
            <div className="stat-card">
              <h3>33%</h3>
              <p>Курсу пройдено</p>
            </div>
            <div className="stat-card">
              <h3>5</h3>
              <p>Годин практики</p>
            </div>
            <div className="stat-card">
              <h3>1/3</h3>
              <p>Модулів закрито</p>
            </div>
          </section>

          <h2 className="modules-title">Програма навчання</h2>
          <section className="modules-grid">
            <Link to="/lessons#module-1" className="module-card completed" style={{ textDecoration: 'none' }}>
              <div className="module-header">
                <span className="module-status">✔️ Пройдено</span>
                <h4>Модуль 1: Основи композиції</h4>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ '--progress': `${getProgressPercent('module-1')}%` }}></div>
              </div>
            </Link>

            <Link to="/lessons#module-2" className="module-card in-progress" style={{ textDecoration: 'none' }}>
              <div className="module-header">
                <span className="module-status"> У процесі</span>
                <h4>Модуль 2: Студійне світло</h4>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ '--progress': `${getProgressPercent('module-2')}%` }}></div>
              </div>
            </Link>

            <Link to="/lessons#module-3" className="module-card locked" style={{ textDecoration: 'none' }}>
              <div className="module-header">
                <span className="module-status"> Заблоковано</span>
                <h4>Модуль 3: Комерційна ретуш</h4>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ '--progress': `${getProgressPercent('module-3')}%` }}></div>
              </div>
            </Link>
          </section>
        </div>
      </main>
    </>
  );
};

export default ProgressPage;