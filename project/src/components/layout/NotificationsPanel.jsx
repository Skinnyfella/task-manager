// src/components/layout/NotificationsPanel.jsx
import { useState, useRef, useEffect } from 'react';
import { FaBell, FaTimes } from 'react-icons/fa';

function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: 'Task Due Soon',
      message: 'Project presentation is due in 2 hours',
      time: '2 hours ago',
    },
    {
      id: 2,
      title: 'Task Completed',
      message: 'You completed the website redesign task',
      time: '4 hours ago',
    },
    {
      id: 3,
      title: 'New Task Assigned',
      message: 'Alex assigned you a new task',
      time: '1 day ago',
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <FaBell className="text-gray-600 dark:text-gray-200" />
      </button>
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Notifications
            </h2>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes className="text-gray-600 dark:text-gray-200" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-1"
              >
                <h3 className="font-medium text-gray-800 dark:text-gray-100">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {notification.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationsPanel;
