import { Link, useLocation } from 'react-router-dom';
import { Home, User, FileText, LucideCarTaxiFront, MonitorCheck, CreditCard, LogIn } from 'lucide-react';

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const menuItems = [
    { to: "/", label: "Accueil", icon: Home },
    { to: "/candidat", label: "Candidat", icon: User },
    { to: "/inscription", label: "Inscription", icon: FileText },
    { to: "/suivi", label: "Suivi", icon: LucideCarTaxiFront },
    { to: "/examen", label: "Examens", icon: MonitorCheck },
    { to: "/permis", label: "Permis", icon: CreditCard },
    { to: "/auth", label: "Connexion", icon: LogIn },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 h-full w-[70%] md:w-64 bg-[#feecc7] shadow-xl transition-transform duration-300 ease-in-out ${
        open ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 z-40`}
    >
      <ul className="mt-20 flex flex-col space-y-4 p-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`flex flex-col items-center uppercase py-2 px-4 rounded-xl border border-black transition-colors ${
                isActive ? 'bg-orange-400' : 'hover:bg-orange-400'
              }`}
            >
              <IconComponent className="text-black mb-1" size={24} />
              <span className="text-black">{item.label}</span>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
