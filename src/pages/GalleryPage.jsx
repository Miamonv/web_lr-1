import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('landscape');
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    // статус Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });

    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then(res => res.json())
      .then(data => setPhotos(data.gallery))
      .catch(err => console.error('Помилка:', err));

      return () => unsubscribe();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhoto = {
          url: event.target.result,
          category: selectedCategory,
          likes: 0
        };
        setPhotos([newPhoto, ...photos]);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredPhotos = filter === 'all' 
    ? photos 
    : photos.filter(p => p.category === filter);

  if (loadingAuth) {
    return (
      <main style={{ textAlign: 'center', paddingTop: '150px', minHeight: '60vh' }}>
        <p style={{ color: '#888' }}>Перевірка доступу...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="gallery-main" style={{ textAlign: 'center', paddingTop: '150px', minHeight: '60vh' }}>
        <h2 style={{ color: '#fff' }}>Доступ закрито</h2>
        <p style={{ marginTop: '20px', color: '#888' }}>
          Будь ласка, увійдіть у свій акаунт через меню зверху, щоб переглядати та додавати роботи в галерею.
        </p>
      </main>
    );
  }

  return (
    <>
      <main className="gallery-main">
        <div className="gallery-container">
          <h1 className="gallery-title">Галерея <span className="gradient-text">Робіт</span></h1>
          <p className="gallery-subtitle">Діліться своїми шедеврами та надихайтеся роботами інших студентів.</p>

          <section className="upload-section">
            <div className="upload-box">
              <h3>Завантажити нове фото</h3>
              <p>Перетягніть файл сюди або натисніть кнопку нижче (JPG, PNG)</p>

              <select 
                className="upload-btn" 
                style={{ marginBottom: '20px', border: 'none', outline: 'none', background: '#2B2B2B', color: '#FFF' }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="landscape">Пейзаж</option>
                <option value="portrait">Портрет</option>
                <option value="macro">Макрозйомка</option>
                <option value="architecture">Архітектура</option>
              </select>
              <br />
              
              <label className="upload-btn">
                Обрати файл
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />
              </label>
            </div>
          </section>

          <section className="gallery-display">
            <div className="gallery-filter">
              <button className={`upload-btn filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Усі</button>
              <button className={`upload-btn filter-btn ${filter === 'landscape' ? 'active' : ''}`} onClick={() => setFilter('landscape')}>Пейзажі</button>
              <button className={`upload-btn filter-btn ${filter === 'portrait' ? 'active' : ''}`} onClick={() => setFilter('portrait')}>Портрети</button>
              <button className={`upload-btn filter-btn ${filter === 'macro' ? 'active' : ''}`} onClick={() => setFilter('macro')}>Макрозйомка</button>
              <button className={`upload-btn filter-btn ${filter === 'architecture' ? 'active' : ''}`} onClick={() => setFilter('architecture')}>Архітектура</button>
            </div>
            
            <div className="photo-grid">
              {filteredPhotos.map((photo, index) => (
                <div className="photo-item" data-category={photo.category} key={index}>
                  <img src={photo.url} alt="Фото" />
                  <div className="photo-overlay"><span>❤️ {photo.likes}</span></div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default GalleryPage;