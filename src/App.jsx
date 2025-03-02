import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Candidate from './pages/Candidate';
import Exam from './pages/Exam';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidat" element={<Candidate />} />
        <Route path="/examen" element={<Exam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

