const HomePage = () => {
  return (
    <main>
      <section className="main__section-1">
        <div className="main__content-text">
          <span className="main__slogan">Ignite your <br /> vision</span>
          <p>
            Пориньте у захоплюючий світ фотографії з нашим онлайн-курсом. Від основ до професійних технік - ми допоможемо вам розкрити свій творчий потенціал та створювати неймовірні знімки.
          </p>
        </div>
        <picture>
          <source srcSet={`${import.meta.env.BASE_URL}girl_black_background.png`} type="image/png" />
          <img src={`${import.meta.env.BASE_URL}girl_black_background.png`} alt="Жінка у світлі на чорному тлі" className="main__picture-1" />
        </picture>
      </section>

      <section className="main__about-us">
        <div className="main__about-us-container">
          <h2 className="main__about-us-title">The Art of Seeing</h2>

          <div className="main__about-us-text">
            <p>
              Ми віримо, що справжня фотографія народжується задовго до того, як ви натискаєте на спуск затвора. Вона починається з вашого унікального погляду на світ. Технічні налаштування, діафрагма та витримка — це лише базовий інструментарій, який ми допоможемо вам опанувати досконало.
            </p>
            <p>
              Цей курс створений для тих, хто прагне вийти за межі автоматичного режиму та знайти свій впізнаваний авторський стиль. Незалежно від того, знімаєте ви на професійну студійну камеру чи просто хочете створювати шедеври, ви отримаєте знання, які зроблять кожну вашу роботу усвідомленою.
            </p>
          </div>
          <hr className="main__about-us-divider" />
        </div>
      </section>

      <section className="skills-section">
        <div className="skills-image">
          <img src={`${import.meta.env.BASE_URL}model-2.png`} alt="Студентка курсу" />
        </div>
        
        <div className="skills-content">
          <h2 className="skills-title">
            ВІДТОЧУЙТЕ <br />
            <span className="gradient-text">СВОЮ МАЙСТЕРНІСТЬ</span>
          </h2>
          
          <p className="skills-desc">
            Отримайте всі необхідні інструменти, щоб перетворити своє захоплення на професію. Ми зібрали найкращі практики для вашого стрімкого розвитку.
          </p>
          
          <div className="skills-grid">
            <div className="skill-item">
              <h4>Топові ментори</h4>
              <p>Навчайтеся у професіоналів з багаторічним досвідом у комерційній фотографії.</p>
            </div>
            <div className="skill-item">
              <h4>Сертифікат</h4>
              <p>Отримайте офіційний документ, що підтверджує ваші навички після курсу.</p>
            </div>
            <div className="skill-item">
              <h4>Спільнота</h4>
              <p>Долучіться до закритого чату фотографів для обміну досвідом та замовленнями.</p>
            </div>
            <div className="skill-item">
              <h4>Практика</h4>
              <p>80% курсу складається з реальних зйомок та роботи зі складним студійним світлом.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;