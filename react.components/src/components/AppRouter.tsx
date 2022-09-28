import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage/AboutPage';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage/MainPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AboutPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/404" element={<ErrorPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
