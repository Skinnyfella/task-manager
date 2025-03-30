// src/components/layout/Layout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NotificationsPanel from './NotificationsPanel';
import ThemeToggle from '../../ThemeToggle';
import { FaBars } from 'react-icons/fa';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {isSidebarOpen && <Sidebar />}
      <main className="flex-1 overflow-auto">
        <header className="flex items-center justify-between p-4 bg-green-600 dark:bg-green-800 text-white">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded hover:bg-green-700 dark:hover:bg-green-900"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FaBars />
            </button>
            <h1 className="text-2xl font-bold">TaskMaster</h1>
          </div>
          <div className="flex items-center space-x-8">
            <ThemeToggle />
            <NotificationsPanel />
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
