import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import { API_BASE_URL } from './utils/constant';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/user/HomePage';
import SearchPage from './pages/user/SearchPage';
import AddMoviePage from './pages/admin/AddMoviePage';
import EditMoviePage from './pages/admin/EditMoviePage';

const App = () => {

  useEffect(() => {
    const healthCheck = async () => {
      try {
        await fetch(`${API_BASE_URL}/api/health`);
        console.log('API is healthy');
      } catch (error) {
        console.error('API health check failed', error);
      }
    }
    healthCheck();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-movie"
              element={
                <ProtectedRoute adminOnly>
                  <AddMoviePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-movie"
              element={
                <ProtectedRoute adminOnly>
                  <EditMoviePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;