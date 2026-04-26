import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';
import LoginModal from './LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe(); 
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log("Ви успішно вийшли!");
    }).catch((error) => {
      console.error("Помилка виходу:", error);
    });
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

          {currentUser ? (
             <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '20px' }}>
                <span style={{ color: '#F28B22', fontSize: '14px' }}>{currentUser.email}</span>
                <button onClick={handleLogout} className="upload-btn" style={{ padding: '8px 15px', fontSize: '14px' }}>Вийти</button>
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
    </>
  );
};

export default Header;