import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 text-black bg-orange-400 p-2 rounded-lg shadow-lg md:hidden"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
