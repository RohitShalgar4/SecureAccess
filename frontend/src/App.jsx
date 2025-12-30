import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import { authAPI } from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await authAPI.getCurrentUser();
        setUser(response.data.user);
        setCurrentPage('dashboard');
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
        setCurrentPage('login');
      }
    }
    setLoading(false);
  };

  const handleLogin = async (email, password) => {
    const response = await authAPI.login(email, password);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    setCurrentPage('dashboard');
  };

  const handleSignup = async (userData) => {
    const response = await authAPI.signup(userData);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    setCurrentPage('dashboard');
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('token');
    setUser(null);
    setCurrentPage('login');
  };

  const handleNavigate = (page) => {
    // Protected routes - check authentication
    if (!user) {
      setCurrentPage('login');
      return;
    }

    setCurrentPage(page);
  };

  const handleUserUpdate = async () => {
    // Refresh user data after profile update
    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Public routes
  if (currentPage === 'login') {
    return (
      <Login
        onLogin={handleLogin}
        onNavigateToSignup={() => setCurrentPage('signup')}
      />
    );
  }

  if (currentPage === 'signup') {
    return (
      <Signup
        onSignup={handleSignup}
        onNavigateToLogin={() => setCurrentPage('login')}
      />
    );
  }

  // Protected routes - require authentication
  if (!user) {
    return (
      <Login
        onLogin={handleLogin}
        onNavigateToSignup={() => setCurrentPage('signup')}
      />
    );
  }

  // Dashboard
  if (currentPage === 'dashboard') {
    return (
      <Dashboard
        user={user}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
    );
  }

  // User Profile
  if (currentPage === 'profile') {
    return (
      <UserProfile
        user={user}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        onUserUpdate={handleUserUpdate}
      />
    );
  }

  return null;
}

export default App;
