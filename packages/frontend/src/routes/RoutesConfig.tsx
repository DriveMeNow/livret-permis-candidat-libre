import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout       from '../layouts/Layout';
import HomePage     from '../pages/HomePage';
import SignUpPage   from '../pages/SignUpPage';
import LoginPage    from '../pages/LoginPage';
import Dashboard    from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

export default function RoutesConfig() {
  return (
    <Routes>
      {/* Route parente qui affiche Header + Footer */}
      <Route element={<Layout />}>
        {/* Page d’accueil */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login"  element={<LoginPage />} />

        {/* Page protégée */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirection pour toute autre URL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
