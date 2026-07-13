import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./shell/ProtectedRoute";
import FeatureLoader from "./shell/FeatureLoader";

const LoginFeature = lazy(() => import("./features/auth/LoginFeature"));
const RegisterFeature = lazy(() => import("./features/auth/RegisterFeature"));
const ProductFeature = lazy(() => import("./features/products/ProductFeature"));
const SalaryFeature = lazy(() => import("./features/salaries/SalaryFeature"));
const UserFeature = lazy(() => import("./features/users/UserFeature"));

const renderWithSuspense = (element) => (
  <Suspense fallback={<FeatureLoader />}>{element}</Suspense>
);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={renderWithSuspense(<LoginFeature />)} />
      <Route path="/register" element={renderWithSuspense(<RegisterFeature />)} />
      <Route
        path="/salaries"
        element={
          <ProtectedRoute>
            {renderWithSuspense(<SalaryFeature />)}
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            {renderWithSuspense(<UserFeature />)}
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            {renderWithSuspense(<ProductFeature />)}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
