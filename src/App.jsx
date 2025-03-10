import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Candidat from './pages/Candidate';
import AuthPage from './pages/AuthPage';
import Exam from './pages/Exam';
import Permis from './pages/Permis';
import SessionTracker from './pages/SessionTracker';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/auth';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidat" element={<Candidat />} />
        <Route path="/inscription" element={<SessionTracker />} />
        <Route path="/suivi" element={<SessionTracker />} />
        <Route path="/examen" element={<Exam />} />
        <Route path="/permis" element={<Permis />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
