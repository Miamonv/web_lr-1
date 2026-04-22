import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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