import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import LessonsPage from './pages/LessonsPage';
import ProgressPage from './pages/ProgressPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="lessons" element={
            <ProtectedRoute>
              <LessonsPage />
            </ProtectedRoute>
          } />
          <Route path="gallery" element={
            <ProtectedRoute>
              <GalleryPage />
            </ProtectedRoute>
          } />
          <Route path="progress" element={
            <ProtectedRoute>
              <ProgressPage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;