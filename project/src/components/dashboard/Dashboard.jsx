// src/components/dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaCheckCircle, FaBriefcase, FaUser, FaBook } from 'react-icons/fa';
import TaskList from '../tasks/TaskList';

function Dashboard() {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch tasks from DB
  const fetchTasks = async () => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      const res = await axios.get(`https://task-manager-p9ka.onrender.com/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks in Dashboard:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // Completed vs in_progress
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const inProgressTasks = totalTasks - completedTasks;

  // Categories (count only tasks in_progress for "Active tasks")
  const workCount = tasks.filter(
    (t) => t.category === 'work' && t.status !== 'completed'
  ).length;
  const personalCount = tasks.filter(
    (t) => t.category === 'personal' && t.status !== 'completed'
  ).length;
  const studyCount = tasks.filter(
    (t) => t.category === 'study' && t.status !== 'completed'
  ).length;

  // Progress bar
  const progressPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // For the single-row week calendar
  const generateWeekDays = () => {
    const days = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        isToday: i === 0,
        fullDate: date,
      });
    }
    return days;
  };
  const weekDays = generateWeekDays();

  // Helper to extract initials from displayName
  const getInitialsFromDisplayName = (displayName) => {
    if (!displayName) return 'U'; // default if no displayName
    const parts = displayName.trim().split(' ');

    // If there's only one name, just use the first letter
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }

    // Otherwise, use first letter of first name + first letter of last name
    const first = parts[0][0].toUpperCase();
    const second = parts[1][0]?.toUpperCase() || ''; // handle middle names or missing last name
    return first + second;
  };

  const initials = getInitialsFromDisplayName(currentUser?.displayName);

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="flex items-center mb-8">
        {/* Circular avatar with initials */}
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center mr-4 text-gray-800 dark:text-gray-100 font-bold">
          {initials}
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Welcome back,
          {currentUser?.displayName ? ` ${currentUser.displayName}!` : '!'}
        </h1>
      </div>

      {/* Task Progress & Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Task Progress */}
        <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Task Progress
            </h2>
            <FaCheckCircle className="text-green-500 text-xl" />
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
              ></div>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {completedTasks}/{totalTasks} tasks completed
              </span>
            </div>
          </div>
        </div>

        {/* Work */}
        <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Work
            </h2>
            <FaBriefcase className="text-green-500 text-xl" />
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {workCount}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Active tasks</p>
        </div>

        {/* Personal */}
        <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Personal
            </h2>
            <FaUser className="text-green-500 text-xl" />
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {personalCount}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Active tasks</p>
        </div>

        {/* Study */}
        <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Study
            </h2>
            <FaBook className="text-green-500 text-xl" />
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {studyCount}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Active tasks</p>
        </div>
      </div>

      {/* Single-Row Week Calendar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Weekly Overview
        </h2>
        <div className="flex space-x-3 overflow-x-auto bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          {generateWeekDays().map((day, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-center rounded-lg flex flex-col items-center w-14
                ${
                  day.isToday
                    ? 'bg-green-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100'
                }`}
              onClick={() => setSelectedDate(day.fullDate)}
            >
              <span className="text-sm font-medium">{day.label}</span>
              <span className="text-lg font-bold">{day.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <TaskList onTasksUpdated={fetchTasks} />
    </div>
  );
}

export default Dashboard;
