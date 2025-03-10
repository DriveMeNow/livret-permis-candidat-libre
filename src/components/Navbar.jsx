import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 text-primary bg-darkBackground p-2 rounded-lg shadow-lg"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav
        className={`fixed left-0 top-0 h-full w-64 bg-darkBackground shadow-xl transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } z-40`}
      >
        <ul className="mt-20 flex flex-col space-y-4 p-4">
          <Link to="/" className="text-xl text-lightBackground hover:text-primary">Accueil</Link>
          <Link to="/candidat" className="text-xl text-lightBackground hover:text-primary">Candidat</Link>
          <Link to="/inscription" className="text-xl text-lightBackground hover:text-primary">Inscription</Link>
          <Link to="/suivi" className="text-xl text-lightBackground hover:text-primary">Suivi</Link>
          <Link to="/examen" className="text-xl text-lightBackground hover:text-primary">Examen</Link>
          <Link to="/permis" className="text-xl text-lightBackground hover:text-primary">Permis</Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
