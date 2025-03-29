import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';  // Vérifie bien ce chemin
import './styles/global.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />              {/* Page d'accueil */}
      <Route path="/auth" element={<AuthPage />} />          {/* Page d'authentification */}
    </Routes>
  );
}

export default App;
