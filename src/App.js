import React, { useEffect, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Main } from './pages/Main';
import { PageNotFound } from './pages/PageNotFound';
import { DetailPage } from './pages/DetailPage';
import { Loader } from './components/Loader';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <ErrorBoundary className="error">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="character/:id" element={<DetailPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;
