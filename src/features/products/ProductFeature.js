import React, { Suspense, useMemo } from 'react';
import ProductDashboard from '../../ProductDashboard';
import { loadRemoteModule } from '../../shell/loadRemoteModule';

const getRemoteProductDashboard = (remoteUrl) =>
  React.lazy(() =>
    loadRemoteModule({
      remoteUrl,
      scope: 'product_remote',
      module: './ProductDashboard'
    }).catch(() => import('../../ProductDashboard'))
  );

export default function ProductFeature() {
  const remoteUrl =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('PRODUCT_REMOTE_URL') || window.PRODUCT_REMOTE_URL || 'http://localhost:3001'
      : 'http://localhost:3001';

  const RemoteProductDashboard = useMemo(() => getRemoteProductDashboard(remoteUrl), [remoteUrl]);

  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading product module...</div>}>
      <RemoteProductDashboard />
    </Suspense>
  );
}
