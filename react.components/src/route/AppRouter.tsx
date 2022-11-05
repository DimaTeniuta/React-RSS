import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import ErrorPage from '../pages/ErrorPage';
import MainPage from 'pages/MainPage/MainPage';
import AboutPage from 'pages/AboutPage/AboutPage';
import CardPage from 'pages/CardPage/CardPage';
import FormPage from 'pages/FormPage/FormPage';

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
