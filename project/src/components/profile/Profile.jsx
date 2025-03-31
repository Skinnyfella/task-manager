// src/components/profile/Profile.jsx
import { FaCheckCircle, FaClock, FaCalendarCheck } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [stats, setStats] = useState({
    completedTasks: 0,
    inProgress: 0,
    onTimeCompletion: 0,
  });

  // 1) Helper to parse displayName for initials
  const getInitialsFromDisplayName = (displayName) => {
    if (!displayName) return 'U'; // fallback if no displayName
    const parts = displayName.trim().split(' ');
    if (parts.length === 1) {
      // single name => just first letter
      return parts[0][0].toUpperCase();
    }
    // multiple names => first letter of first two
    const first = parts[0][0].toUpperCase();
    const second = parts[1][0]?.toUpperCase() || '';
    return first + second;
  };

  // 2) We'll fetch stats from the DB
  useEffect(() => {
    const fetchStats = async () => {
      if (!currentUser) return;
      try {
        const token = await currentUser.getIdToken();
        const statsRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(statsRes.data);
      } catch (error) {
        console.error('Error fetching profile stats:', error);
      }
    };
    fetchStats();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // 3) Build name & initials from Firebase displayName
  const displayName = currentUser?.displayName || 'No Name';
  const initials = getInitialsFromDisplayName(displayName);

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          {/* Circle with user initials from displayName */}
          <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-800 dark:text-gray-100">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {displayName}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {currentUser?.email || 'No Email'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Completed Tasks */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <FaCheckCircle className="text-primary-500" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                Completed Tasks
              </h3>
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {stats.completedTasks}
            </p>
          </div>

          {/* In Progress */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <FaClock className="text-primary-500" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                In Progress
              </h3>
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {stats.inProgress}
            </p>
          </div>

          {/* On Time Completion */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <FaCalendarCheck className="text-primary-500" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                On Time Completion
              </h3>
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {stats.onTimeCompletion}%
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Account Settings
          </h2>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              Notification Settings
            </button>
            <button
              onClick={() => navigate('/change-password')}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
