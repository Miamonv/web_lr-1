import { useState, useEffect } from 'react';

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('landscape');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchStaticPhotos = fetch(`${import.meta.env.BASE_URL}data.json`).then(res => res.json());
    
    const fetchUserPhotos = fetch('https://web-lr-1.onrender.com/api/gallery', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(res => res.json());

    Promise.all([fetchStaticPhotos, fetchUserPhotos])
      .then(([staticData, userData]) => {
        // позначка isUser, щоб знати, які картинки можна видаляти
        const userPhotosFormatted = userData.map(p => ({ ...p, isUser: true, likes: 0 }));
        setPhotos([...userPhotosFormatted, ...(staticData.gallery || [])]);
      })
      .catch(err => console.error('Помилка завантаження:', err));
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const token = localStorage.getItem('token');
    
    if (file && token) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Url = event.target.result;
        
        try {
          const res = await fetch('https://web-lr-1.onrender.com/api/gallery', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ url: base64Url, category: selectedCategory })
          });
          
          if (res.ok) {
            const newItem = await res.json();
            setPhotos([{ ...newItem, isUser: true, likes: 0 }, ...photos]);
          }
        } catch (err) {
          console.error("Помилка збереження на сервер", err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`https://web-lr-1.onrender.com/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setPhotos(photos.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error("Помилка видалення", err);
    }
  };

  const filteredPhotos = filter === 'all' 
    ? photos 
    : photos.filter(p => p.category === filter);

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
                <div className="photo-item" data-category={photo.category} key={photo.id || index}>
                  <img src={photo.url} alt="Фото" />
                  <div className="photo-overlay">
                    <span>❤️ {photo.likes}</span>
                    {photo.isUser && (
                      <button 
                        onClick={() => handleDelete(photo.id)} 
                        style={{ marginLeft: '10px', background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                      >
                        ❌
                      </button>
                    )}
                  </div>
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