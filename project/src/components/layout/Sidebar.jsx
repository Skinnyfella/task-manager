// src/components/layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaPlus, FaUser } from 'react-icons/fa';

function Sidebar() {
  const location = useLocation();

  const links = [
    { to: '/', icon: FaHome, label: 'Dashboard' },
    { to: '/create-task', icon: FaPlus, label: 'Create Task' },
    { to: '/profile', icon: FaUser, label: 'Profile' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm flex flex-col">
      <nav className="mt-8">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`
              flex items-center space-x-2 px-6 py-3
              text-gray-600 dark:text-gray-300
              hover:bg-primary-50 dark:hover:bg-gray-700
              hover:text-primary-600
              ${location.pathname === link.to ? 'bg-primary-50 dark:bg-gray-700 text-primary-600' : ''}
            `}
          >
            <link.icon />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
