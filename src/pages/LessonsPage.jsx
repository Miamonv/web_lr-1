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
            background: isDone ? 'transparent' : '#2B2B2B',
            color: isDone ? '#4CAF50' : '#fff',
            border: isDone ? '1px solid #4CAF50' : '1px solid #999',
            cursor: 'pointer'
          }}
          onClick={onToggleDone}
        >
          {isDone ? 'Пройдено (Скасувати)' : 'Відмітити як пройдений'}
        </button>
      </div>
    </div>
  );
};

const LessonsPage = () => {
  const [openModule, setOpenModule] = useState('module-1');
  const [completedLessons, setCompletedLessons] = useState({});
  const [lessonsFromDB, setLessonsFromDB] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then(res => res.json())
      .then(data => setLessonsFromDB(data.lessons || []))
      .catch(err => console.error('Помилка:', err));

    // пройдені уроки цього користувача
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
  }, []);

  const toggleModule = (moduleName) => {
    setOpenModule(openModule === moduleName ? null : moduleName);
  };

  const toggleLessonDone = async (lesson) => {
    const token = localStorage.getItem('token'); //токен для POST/DELETE запиту
    
    const isDone = completedLessons[lesson.id];
    const method = isDone ? 'DELETE' : 'POST';
    const url = isDone 
        ? `https://web-lr-1.onrender.com/api/lessons/passed/${lesson.id}` 
        : 'https://web-lr-1.onrender.com/api/lessons/passed';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: isDone ? null : JSON.stringify({
          lessonId: String(lesson.id),
          title: lesson.title
        })
      });

      if (response.ok) {
        setCompletedLessons(prev => {
          const next = { ...prev };
          if (isDone) delete next[lesson.id];
          else next[lesson.id] = true;
          return next;
        });
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

        {['module-1', 'module-2', 'module-3'].map((moduleId, index) => {
          const moduleTitles = ["Основи композиції", "Студійне світло", "Комерційна ретуш"];
          return (
            <section className="module-section" id={moduleId} key={moduleId}>
              <h2 
                className={`module-title accordion-btn ${openModule === moduleId ? 'active' : ''}`}
                onClick={() => toggleModule(moduleId)}
              >
                Модуль {index + 1}: {moduleTitles[index]}
              </h2>
              
              <div className={`lessons-grid accordion-content ${openModule === moduleId ? 'open' : ''}`}>
                {lessonsFromDB.filter(lesson => lesson.moduleId === moduleId).length > 0 ? (
                  lessonsFromDB.filter(lesson => lesson.moduleId === moduleId).map((lesson) => (
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
          );
        })}
      </div>
    </main>
  );
};

export default LessonsPage;