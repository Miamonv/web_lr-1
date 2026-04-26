import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const LoginModal = ({ isOpen, onClose }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false); // вхід чи реєстрація
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailVal = email.trim();
    const passVal = password.trim();

    if (passVal < 6){
      setIsError(true);
      setMessage('Замалий пароль!!');
      return;
    }

    // для РЕЄСТРАЦІЇ
    if(isRegisterMode){
      createUserWithEmailAndPassword(auth, emailVal, passVal)
      .then ((userCredential) => {
        setIsError(false);
        setMessage('Акаунт успішно створено! Привіт, ${userCredential.user.email}');
        setTimeout(onClose, 2000);
      })

      .catch((error) => {
        setIsError(true);
        if (error.code === 'auth/email-already-in-use') {
            setMessage('Цей Email вже зареєстровано!');
          } else {
            setMessage(`Помилка: ${error.message}`);
          }
      });
    } 
    // для ВХОДУ
    else {
      signInWithEmailAndPassword(auth, emailVal, passVal)
      .then ((userCredential) => {
        setIsError(false);
        setMessage('Успішний вхід! Привіт, ${userCredential.user.email}');
        setTimeout(onClose, 2000);
      })

      .catch ((error) => {
        setIsError(true);
        if (error.code === 'auth/invalid-credential')
          setMessage('Невірний Email або пароль!');
        else
          setMessage(`Помилка: ${error.message}`);
      });
    }
      
  };

  if (!isOpen) return null;

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-section" onClick={(e) => e.stopPropagation()}>
        <h2>{isRegisterMode ? 'Створити акаунт' : 'Увійти до кабінету'}</h2>
        <p>
          {isRegisterMode 
            ? 'Зареєструйтесь, щоб отримати доступ до курсу.' //Будь ласка, увійдіть до свого облікового запису, щоб переглянути свій прогрес.
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
          <p className="error-message" style={{ color: isError ? 'red' : '#F28B22', display: 'block'}}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginModal;