import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import AboutPage from './pages/AboutPage/AboutPage';
import CardPage from './pages/CardPage/CardPage';
import ErrorPage from './pages/ErrorPage';
import FormPage from './pages/FormPage/FormPage';
import MainPage from './pages/MainPage/MainPage';

const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AboutPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="main/card" element={<CardPage />} />
        <Route path="form" element={<FormPage />} />
        <Route path="404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
