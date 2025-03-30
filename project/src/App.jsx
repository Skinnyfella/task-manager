// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './components/dashboard/Dashboard';
import CreateTask from './components/tasks/CreateTask';
import Profile from './components/profile/Profile';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Import the new ChangePassword component
import ChangePassword from './components/profile/ChangePassword';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected routes under Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="create-task" element={<CreateTask />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Change Password Route (also protected) */}
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
