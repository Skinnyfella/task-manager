// src/components/tasks/CreateTask.jsx
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function CreateTask() {
  const { currentUser } = useAuth();
  const [task, setTask] = useState({
    title: '',
    description: '',
    date: new Date(),
    category: 'work',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await currentUser.getIdToken();
      await axios.post(
        'http://localhost:5000/api/tasks',
        {
          title: task.title,
          description: task.description,
          due_date: task.date,
          category: task.category,
          // status will default to 'in_progress'
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Task created successfully!');
      setTask({
        title: '',
        description: '',
        date: new Date(),
        category: 'work',
      });
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-sm p-6 mb-6">
        Create New Task
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Task Title
            </label>
            <input
              type="text"
              className="input-field text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Category
            </label>
            <select
              className="input-field text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
              value={task.category}
              onChange={(e) => setTask({ ...task, category: e.target.value })}
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="study">Study</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Due Date
            </label>
            <DatePicker
              selected={task.date}
              onChange={(date) => setTask({ ...task, date })}
              className="input-field text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
              dateFormat="MMMM d, yyyy"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Description
            </label>
            <textarea
              className="input-field min-h-[100px] text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
