import { useState, useEffect } from 'react';

const LessonCard = ({ title, duration, description, videoSrc, isDone, onToggleDone }) => {
  return (
    <div className="lesson-card">
      <div className="video-container">
        <iframe 
          src={videoSrc} 
          title={title} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
      <div className="lesson-info">
        <span className="lesson-duration"> {duration} хв</span>
        <h3>{title}</h3>
        <p>{description}</p>
        
        <button 
          className="upload-btn" 
          style={{ 
            marginTop: '15px', 
            background: isDone ? '#4CAF50' : '#2B2B2B',
            color: '#fff',
            border: isDone ? '1px solid #4CAF50' : '1px solid #999',
            cursor: isDone ? 'default' : 'pointer'
          }}
          onClick={onToggleDone}
          disabled={isDone}
        >
          {isDone ? 'Пройдено' : 'Відмітити як пройдений'}
        </button>
      </div>
    </div>
  );
};

const LessonsPage = () => {
  const [openModule, setOpenModule] = useState('module-1');
  const [completedLessons, setCompletedLessons] = useState({});
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [lessonsFromDB, setLessonsFromDB] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(true);
    } else {
      setUser(null);
    }
    setLoadingAuth(false);

    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then(res => res.json())
      .then(data => {
        setLessonsFromDB(data.lessons || []);
      })
      .catch(err => console.error('Помилка:', err));

    if (token) {
      fetch('https://web-lr-1.onrender.com/api/lessons/passed', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(passedData => {
        const passedMap = {};
        if (Array.isArray(passedData)) {
          passedData.forEach(item => {
            passedMap[item.lessonId] = true;
          });
        }
        setCompletedLessons(passedMap);
      })
      .catch(err => console.error(err));
    }
  }, []);

  const toggleModule = (moduleName) => {
    setOpenModule(openModule === moduleName ? null : moduleName);
  };

  const toggleLessonDone = async (lesson) => {
    const token = localStorage.getItem('token');
    if (!token || completedLessons[lesson.id]) return;

    try {
      const response = await fetch('https://web-lr-1.onrender.com/api/lessons/passed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          lessonId: String(lesson.id),
          title: lesson.title
        })
      });

      if (response.ok) {
        setCompletedLessons(prev => ({
          ...prev,
          [lesson.id]: true
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const topicsList = [
    "1. Правило третин та золотий перетин",
    "2. Робота зі студійним світлом (Рембрандт)",
    "3. Комерційна ретуш у Photoshop",
    "4. Психологія роботи з моделлю",
    "5. Формування портфоліо"
  ];

  if (loadingAuth) {
    return (
      <main style={{ textAlign: 'center', paddingTop: '150px', minHeight: '60vh' }}>
        <p style={{ color: '#888' }}>Перевірка доступу...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="lessons-main" style={{ textAlign: 'center', paddingTop: '150px', minHeight: '60vh' }}>
        <h2 style={{ color: '#fff' }}>Доступ закрито</h2>
        <p style={{ marginTop: '20px', color: '#888' }}>
          Будь ласка, увійдіть у свій акаунт через меню зверху, щоб переглядати уроки.
        </p>
      </main>
    );
  }

  return (
    <main className="lessons-main">
      <div className="lessons-container">
        <h1 className="page-title">Програма <span className="gradient-text">Навчання</span></h1>
        <p className="page-subtitle">Переглядайте відео, читайте матеріали та виконуйте завдання.</p>

        <div className="topics-summary">
          <h4>Короткий зміст:</h4>
          <ul id="topics-list" style={{ color: '#888', lineHeight: '1.6' }}>
            {topicsList.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>

        <section className="module-section" id="module-1">
          <h2 
            className={`module-title accordion-btn ${openModule === 'module-1' ? 'active' : ''}`}
            onClick={() => toggleModule('module-1')}
          >
            Модуль 1: Основи композиції
          </h2>
          
          <div className={`lessons-grid accordion-content ${openModule === 'module-1' ? 'open' : ''}`}>
            {lessonsFromDB.filter(lesson => lesson.moduleId === 'module-1').length > 0 ? (
              lessonsFromDB.filter(lesson => lesson.moduleId === 'module-1').map((lesson) => (
                <LessonCard 
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  description={lesson.description}
                  videoSrc={lesson.videoSrc}
                  isDone={completedLessons[lesson.id]}
                  onToggleDone={() => toggleLessonDone(lesson)}
                />
              ))
            ) : (
              <p style={{color: '#888'}}>Завантаження уроків...</p>
            )}
          </div>
        </section>

        <section className="module-section" id="module-2">
          <h2 
            className={`module-title accordion-btn ${openModule === 'module-2' ? 'active' : ''}`}
            onClick={() => toggleModule('module-2')}
          >
            Модуль 2: Студійне світло
          </h2>
          <div className={`lessons-grid accordion-content ${openModule === 'module-2' ? 'open' : ''}`}>
             {lessonsFromDB.filter(lesson => lesson.moduleId === 'module-2').length > 0 ? (
              lessonsFromDB.filter(lesson => lesson.moduleId === 'module-2').map((lesson) => (
                <LessonCard 
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  description={lesson.description}
                  videoSrc={lesson.videoSrc}
                  isDone={completedLessons[lesson.id]}
                  onToggleDone={() => toggleLessonDone(lesson)}
                />
              ))
            ) : (
              <p style={{color: '#888'}}>Завантаження уроків...</p>
            )}
          </div>
        </section>

        <section className="module-section" id="module-3">
          <h2 
            className={`module-title accordion-btn ${openModule === 'module-3' ? 'active' : ''}`}
            onClick={() => toggleModule('module-3')}
          >
            Модуль 3: Комерційна ретуш
          </h2>
          <p className={`locked-text accordion-content ${openModule === 'module-3' ? 'open' : ''}`}> 
            Цей модуль відкриється після проходження попередніх.
          </p>
        </section>

      </div>
    </main>
  );
};

export default LessonsPage;