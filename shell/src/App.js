import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import FeatureLoader from './components/FeatureLoader';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

/**
 * Lazily loaded micro-frontend remotes via Webpack Module Federation.
 *
 * Naming must EXACTLY match the remote entries in webpack.config.js:
 *   productRemote → http://localhost:3001/remoteEntry.js  → exposes ./ProductApp
 *   usersRemote   → http://localhost:3002/remoteEntry.js  → exposes ./UsersApp
 *   salaryRemote  → http://localhost:3003/remoteEntry.js  → exposes ./SalaryApp
 */
const ProductsRemote = lazy(() => import('productRemote/ProductApp'));
const UsersRemote = lazy(() => import('usersRemote/UsersApp'));
const SalaryRemote = lazy(() => import('salaryRemote/SalaryApp'));

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes — no Layout wrapper */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes — wrapped in Layout (Navbar + Sidebar) */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Each remote is wrapped in its own FeatureLoader (Suspense boundary) */}
                    <Route
                      path="/products/*"
                      element={
                        <FeatureLoader name="Products">
                          <ProductsRemote />
                        </FeatureLoader>
                      }
                    />
                    <Route
                      path="/users/*"
                      element={
                        <FeatureLoader name="Users">
                          <UsersRemote />
                        </FeatureLoader>
                      }
                    />
                    <Route
                      path="/salary/*"
                      element={
                        <FeatureLoader name="Salaries">
                          <SalaryRemote />
                        </FeatureLoader>
                      }
                    />

                    {/* Catch-all → redirect to home */}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;