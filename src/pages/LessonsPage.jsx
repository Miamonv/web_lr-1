import { useState } from 'react';

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
            cursor: 'pointer'
          }}
          onClick={onToggleDone}
        >
          {isDone ? '✔️ Пройдено' : 'Відмітити як пройдений'}
        </button>
      </div>
    </div>
  );
};

const LessonsPage = () => {
  const [openModule, setOpenModule] = useState('module-1');
  const [completedLessons, setCompletedLessons] = useState({});

  const toggleModule = (moduleName) => {
    setOpenModule(openModule === moduleName ? null : moduleName);
  };

  const toggleLessonDone = (lessonId) => {
    setCompletedLessons(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }));
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

        <section className="module-section" id="module-1">
          <h2 
            className={`module-title accordion-btn ${openModule === 'module-1' ? 'active' : ''}`}
            onClick={() => toggleModule('module-1')}
          >
            Модуль 1: Основи композиції
          </h2>
          
          <div className={`lessons-grid accordion-content ${openModule === 'module-1' ? 'open' : ''}`}>
            <LessonCard 
              title="Урок 1.1: Золотий перетин / Спіраль Фібоначчі"
              duration="7"
              description="Ви коли-небудь замислювалися, чому деякі кінокадри виглядають неймовірно гармонійно та привабливо? Відповідь криється в золотому перетині та його тісному зв'язку зі спіраллю Фібоначчі! У цьому відео ми розкриємо математичну красу, що лежить в основі композиції у кіно."
              videoSrc="https://www.youtube.com/embed/KXeD4Bs3lno" // Змінено watch?v= на embed/ для iframe
              isDone={completedLessons['1.1']}
              onToggleDone={() => toggleLessonDone('1.1')}
            />
            
            <LessonCard 
              title="Урок 1.2: 5 Принципів успішного фотографа"
              duration="30"
              description="Дуже важливі правила, які має засвоїти і використовувати у своїй діяльності кожен фотограф, який хоче досягти успіху у професіїї 'ФОТОГРАФ'"
              videoSrc="https://www.youtube.com/embed/E22nU7mYIuM"
              isDone={completedLessons['1.2']}
              onToggleDone={() => toggleLessonDone('1.2')}
            />
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
            <LessonCard 
              title="Урок 2.1: Заповнений кадр"
              duration="6"
              description="Аналіз яскравих прикладів використання «заповненого кадру» у культових кінофільмах. Практичні поради, як використовувати правило «Заповнений кадр» у ваших власних відео."
              videoSrc="https://www.youtube.com/embed/Hw1xNeDRonE"
              isDone={completedLessons['2.1']}
              onToggleDone={() => toggleLessonDone('2.1')}
            />
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