import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import ErrorPage from '../pages/ErrorPage';
import MainPage from 'pages/MainPage/MainPage';
import AboutPage from 'pages/AboutPage/AboutPage';
import CardPage from 'pages/CardPage/CardPage';
import FormPage from 'pages/FormPage/FormPage';
import { RoutePath } from 'types/routeTypes';

const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path={RoutePath.HOME} element={<Layout />}>
        <Route index element={<AboutPage />} />
        <Route path={RoutePath.MAIN} element={<MainPage />} />
        <Route path={RoutePath.CARD_PAGE} element={<CardPage />} />
        <Route path={RoutePath.FORM} element={<FormPage />} />
        <Route path={RoutePath.ERROR} element={<ErrorPage />} />
        <Route path={RoutePath.GENERAL} element={<Navigate to={RoutePath.ERROR} replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
