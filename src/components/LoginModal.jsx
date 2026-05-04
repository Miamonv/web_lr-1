import { useState, useEffect } from 'react';

const LoginModal = ({ isOpen, onClose }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setMessage('');
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = email.trim();
    const passVal = password.trim();

    if (passVal.length < 6){
      setIsError(true);
      setMessage('Замалий пароль!!');
      return;
    }

    const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';
    const url = `https://web-lr-1.onrender.com${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: emailVal.split('@')[0],
          email: emailVal, 
          password: passVal 
        })
      });

      const data = await response.json();

      if (response.ok) {
        setIsError(false);
        setMessage(isRegisterMode ? 'Акаунт успішно створено!' : 'Успішний вхід!');
        localStorage.setItem('token', data.token);
        
        setTimeout(() => {
          onClose();
          window.location.reload(); 
        }, 1500);
      } else {
        setIsError(true);
        setMessage(data.message || 'Сталася помилка!');
      }
    } catch (error) {
      setIsError(true);
      setMessage('Помилка з\'єднання з сервером');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-section" onClick={(e) => e.stopPropagation()}>
        <h2>{isRegisterMode ? 'Створити акаунт' : 'Увійти до кабінету'}</h2>
        <p>
          {isRegisterMode 
            ? 'Зареєструйтесь, щоб отримати доступ до курсу.' 
            : 'Увійдіть до свого облікового запису.'}
        </p>

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
          <button type="submit" className="upload-btn">
            {isRegisterMode ? 'Зареєструватися' : 'Увійти'}
          </button>
        </form>

        <p style={{ marginTop: '15px', color: '#888', fontSize: '14px', cursor: 'pointer' }} 
           onClick={() => { setIsRegisterMode(!isRegisterMode); setMessage(''); }}>
          {isRegisterMode ? 'Вже є акаунт? Увійти' : 'Немає акаунту? Зареєструватися'}
        </p>

        {message && (
          <p className="error-message" style={{ color: isError ? 'red' : '#4CAF50', display: 'block'}}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginModal;