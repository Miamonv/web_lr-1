import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <main style={{ textAlign: 'center', paddingTop: '150px', minHeight: '60vh' }}>
        <p style={{ color: '#888' }}>Перевірка доступу...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main style={{ textAlign: 'center', paddingTop: '150px', minHeight: '60vh' }}>
        <h2 style={{ color: '#fff' }}>Доступ закрито</h2>
        <p style={{ marginTop: '20px', color: '#888' }}>
          Будь ласка, увійдіть у свій акаунт через меню зверху, щоб переглядати цю сторінку.
        </p>
      </main>
    );
  }

  return children;
};

export default ProtectedRoute;