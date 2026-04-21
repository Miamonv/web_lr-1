import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <section className="contacts">
        <div className="social-media">
          <a href="#" target="_blank" rel="noreferrer"><img src="/facebook1.png" alt="Facebook" /></a>
          <a href="#" target="_blank" rel="noreferrer"><img src="/Insta.webp" alt="Instagram" /></a>
          <a href="#" target="_blank" rel="noreferrer"><img src="/twitter.webp" alt="Twitter" /></a>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Контакти</h4>
          <ul className="footer-list">
            <li><strong>Mail:</strong><a href="mailto:hello@emberlens.com"> hello@emberlens.com</a></li>
            <li><strong>Phone:</strong><a href="tel:+380991234567"> +380 99 123 45 67</a></li>
            <li><strong>Opening Hours:</strong> 10:00 - 18:00</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Локація</h4>
          <ul className="footer-list footer-list-bullets">
            <li>Вул. Фотографічна, 12</li>
            <li>м. Київ, Україна</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Сайт</h4>
          <ul className="footer-list footer-links">
            <li><Link to="/">➔ Про курс</Link></li>
            <li><Link to="/gallery">➔ Галерея</Link></li>
            <li><Link to="/progress">➔ Мій прогрес</Link></li>
          </ul>
        </div>
      </section>

      <section className="copyright">
        <p>&copy; 2026 EmberLens. Всі права захищені.</p>
      </section>
    </footer>
  );
};

export default Footer;