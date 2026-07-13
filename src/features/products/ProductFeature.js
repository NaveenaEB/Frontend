import React from 'react';
import ProductDashboard from '../../ProductDashboard';

export default function ProductFeature() {
  // If a remote product app is deployed, set its URL in localStorage under
  // key `PRODUCT_REMOTE_URL` (e.g. http://localhost:5173). When present,
  // load it inside an iframe so the product app can be developed and deployed separately.
  const remote = typeof window !== 'undefined' ? window.localStorage.getItem('PRODUCT_REMOTE_URL') : null;
  if (remote) {
    return (
      <div style={{ height: '100vh' }}>
        <iframe src={remote} title="Product Remote" style={{ width: '100%', height: '100%', border: '0' }} />
      </div>
    );
  }

  // Fallback to local product dashboard when no remote is configured
  return <ProductDashboard />;
}
