
import React from 'react';

const ProtectedRoute = ({ children }) => {
  // Add your auth logic here
  return <>{children}</>;
};

export default ProtectedRoute;