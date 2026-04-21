import { useState, useEffect } from 'react';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailVal = email.trim();
    const passVal = password.trim();

    if (emailVal === '' || passVal === '') {
      setIsError(true);
      setMessage('Помилка: Будь ласка, заповніть всі поля!');
    } else if (!emailVal.includes('@')) {
      setIsError(true);
      setMessage('Помилка: Невірний формат email!');
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailVal)) {
      setIsError(true);
      setMessage('Помилка: Email може містити лише латинські літери, цифри та спеціальні символи (@, ., _, %, +, -)');
    } else {
      setIsError(false);
      setMessage(`Вітаємо, ${emailVal}! Вхід успішний.`);
      setTimeout(() => {
        onClose();
        setMessage('');
        setEmail('');
        setPassword('');
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-section" onClick={(e) => e.stopPropagation()}>
        <h2>Увійти до кабінету</h2>
        <p>Будь ласка, увійдіть до свого облікового запису, щоб переглянути свій прогрес.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Ваш email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Ваш пароль" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="upload-btn">Увійти</button>
        </form>
        {message && (
          <p className="error-message" style={{ color: isError ? 'red' : '#F28B22' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginModal;