// src/components/profile/ChangePassword.jsx
import { useState } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setMessage('No user is logged in.');
      return;
    }
    try {
      await updatePassword(auth.currentUser, newPassword);
      setMessage('Password updated successfully!');
      // Optionally navigate back to profile
      navigate('/profile');
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleChangePassword} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            New Password
          </label>
          <input
            type="password"
            className="input-field text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
