import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LoginModal from './LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // чи авторизований користувач
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <>
      <header>
        <div className="header__logo">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Логотип курсу" className="header__logo-img" />
          <span className="header__logo-text">EmberLens</span>
        </div>
        
        <nav className={`nav__menu ${isMenuOpen ? 'active' : ''}`}>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Головна</NavLink>
          <NavLink to="/lessons" onClick={() => setIsMenuOpen(false)}>Програма</NavLink>
          <NavLink to="/gallery" onClick={() => setIsMenuOpen(false)}>Галерея</NavLink>
          <NavLink to="/progress" onClick={() => setIsMenuOpen(false)}>Мій прогрес</NavLink>

          {isLoggedIn ? (
             <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '20px' }}>
                <button onClick={handleLogout} className="upload-btn" style={{ padding: '8px 15px', fontSize: '14px' }}>
                  Вийти
                </button>
             </div>
          ) : (
             <button 
               onClick={() => { setIsLoginModalOpen(true); setIsMenuOpen(false); }} 
               className="upload-btn" 
               style={{ marginLeft: '20px', padding: '8px 15px' }}
             >
               Увійти
             </button>
          )}
        </nav>

        <button 
          className="hamburger" 
          onClick={toggleMenu} 
          onMouseEnter={() => setIsMenuOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
      
      <div 
        className={`overlay ${isMenuOpen ? 'active' : ''}`} 
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};

export default Header;