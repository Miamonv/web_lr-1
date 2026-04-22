import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import LessonsPage from './pages/LessonsPage';
import ProgressPage from './pages/ProgressPage';

function App() {
  return (
    // Змінили BrowserRouter на HashRouter
    <HashRouter>
      <Routes>
        {/* Змінили path="/web_lr-1/" на просто path="/" */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="lessons" element={<LessonsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="progress" element={<ProgressPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;