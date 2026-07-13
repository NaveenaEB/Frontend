import React, { Suspense } from 'react';
import SalaryDashboard from '../../SalaryDashboard';
import { loadRemoteModule } from '../../shell/loadRemoteModule';

const remoteUrl =
  typeof window !== 'undefined'
    ? window.localStorage.getItem('SALARY_REMOTE_URL') || window.SALARY_REMOTE_URL || 'http://localhost:3003'
    : 'http://localhost:3003';

const RemoteSalaryDashboard = React.lazy(() =>
  loadRemoteModule({
    remoteUrl,
    scope: 'salaries_remote',
    module: './SalaryDashboard'
  }).catch(() => import('../../SalaryDashboard'))
);

export default function SalaryFeature() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading salary module...</div>}>
      <RemoteSalaryDashboard />
    </Suspense>
  );
}
