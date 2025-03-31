// src/components/tasks/TaskList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

function TaskList({ onTasksUpdated }) {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTasks = async () => {
    try {
      if (!currentUser) return;
      const token = await currentUser.getIdToken();
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // After we update or toggle a task, we want to refresh the Dashboard too
  const refreshAll = async () => {
    await fetchTasks();       // refresh tasks in TaskList
    onTasksUpdated && onTasksUpdated(); // ask Dashboard to refresh
  };

  const handleDelete = async (taskId) => {
    try {
      const token = await currentUser.getIdToken();
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      onTasksUpdated && onTasksUpdated();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditFormData({
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      category: task.category,
      status: task.status,
    });
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditFormData({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle status between completed <-> in_progress
  const handleStatusToggle = async (task) => {
    try {
      const token = await currentUser.getIdToken();
      const newStatus = task.status === 'completed' ? 'in_progress' : 'completed';

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks/${task.id}`,
        {
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          category: task.category,
          status: newStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // update local tasks
      setTasks((prev) => prev.map((t) => (t.id === task.id ? res.data : t)));
      onTasksUpdated && onTasksUpdated();
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  const handleUpdate = async (taskId) => {
    try {
      const token = await currentUser.getIdToken();
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks/${taskId}`,
      
        editFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? res.data : task))
      );
      setEditingTaskId(null);
      setEditFormData({});
      onTasksUpdated && onTasksUpdated();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-white dark:bg-gray-800 rounded shadow"
            >
              {editingTaskId === task.id ? (
                // Edit Mode
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleFormChange}
                    className="border p-1 rounded mb-2 w-full text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
                    placeholder="Title"
                  />
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleFormChange}
                    className="border p-1 rounded mb-2 w-full text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
                    placeholder="Description"
                  />
                  <input
                    type="datetime-local"
                    name="due_date"
                    value={
                      new Date(editFormData.due_date).toISOString().slice(0, 16)
                    }
                    onChange={handleFormChange}
                    className="border p-1 rounded mb-2 w-full text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
                  />
                  <input
                    type="text"
                    name="category"
                    value={editFormData.category}
                    onChange={handleFormChange}
                    className="border p-1 rounded mb-2 w-full text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
                    placeholder="Category"
                  />
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleFormChange}
                    className="border p-1 rounded mb-2 w-full text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
                  >
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>

                  <div className="space-x-2">
                    <button
                      onClick={() => handleUpdate(task.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() => handleStatusToggle(task)}
                      className="mr-2"
                    />
                    <h3
                      className={`text-lg font-semibold ${
                        task.status === 'completed'
                          ? 'line-through text-gray-500 dark:text-gray-400'
                          : ''
                      }`}
                    >
                      {task.title}
                    </h3>
                  </div>
                  <p className="mb-1">{task.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Due: {new Date(task.due_date).toLocaleString()}
                  </p>
                  <p className="text-sm mb-1">Category: {task.category}</p>
                  <p className="text-sm">
                    Status:{' '}
                    {task.status === 'completed' ? 'Completed' : 'In Progress'}
                  </p>

                  <div className="mt-2 space-x-2 flex">
                    <button
                      title="Edit Task"
                      onClick={() => handleEditClick(task)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete Task"
                      onClick={() => handleDelete(task.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
