import React, { Suspense } from 'react';
import UserDashboard from '../../UserDashboard';
import { loadRemoteModule } from '../../shell/loadRemoteModule';

const remoteUrl =
  typeof window !== 'undefined'
    ? window.localStorage.getItem('USER_REMOTE_URL') || window.USER_REMOTE_URL || 'http://localhost:3002'
    : 'http://localhost:3002';

const RemoteUserDashboard = React.lazy(() =>
  loadRemoteModule({
    remoteUrl,
    scope: 'users_remote',
    module: './UserDashboard'
  }).catch(() => import('../../UserDashboard'))
);

export default function UserFeature() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading user module...</div>}>
      <RemoteUserDashboard />
    </Suspense>
  );
}
