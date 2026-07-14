import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import FeatureLoader from './components/FeatureLoader';
import Home from './pages/Home';

const ProductsRemote = React.lazy(() => import('productRemote/ProductApp'));
const UsersRemote = React.lazy(() => import('usersRemote/UsersApp'));
const SalaryRemote = React.lazy(() => import('salaryRemote/SalaryApp'));

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/*" element={
              <ProtectedRoute>
                <FeatureLoader remoteModule={ProductsRemote} />
              </ProtectedRoute>
            } />
            <Route path="/users/*" element={
              <ProtectedRoute>
                <FeatureLoader remoteModule={UsersRemote} />
              </ProtectedRoute>
            } />
            <Route path="/salary/*" element={
              <ProtectedRoute>
                <FeatureLoader remoteModule={SalaryRemote} />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;