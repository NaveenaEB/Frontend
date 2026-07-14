import React, { Suspense } from 'react';

/**
 * Premium animated loading skeleton shown while a micro-frontend
 * is being fetched from its remote server via Module Federation.
 */
const MFLoadingFallback = ({ name }) => (
  <div className="mf-loading">
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
      <div className="skeleton" style={{ width: 36, height: 36, borderRadius: 8 }} />
      <div style={{ flex: 1 }}>
        <div className="skeleton" style={{ height: 14, width: '40%', marginBottom: 6, borderRadius: 6 }} />
        <div className="skeleton" style={{ height: 11, width: '25%', borderRadius: 6 }} />
      </div>
    </div>
    <div className="skeleton" style={{ height: 80, borderRadius: 12, marginBottom: 8 }} />
    <div className="skeleton" style={{ height: 200, borderRadius: 12 }} />
    <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-500)' }}>
      Loading {name || 'module'}…
    </div>
  </div>
);

/**
 * FeatureLoader wraps a lazily-loaded micro-frontend with a Suspense boundary
 * and an animated skeleton fallback.
 */
const FeatureLoader = ({ children, name }) => (
  <Suspense fallback={<MFLoadingFallback name={name} />}>
    {children}
  </Suspense>
);

export default FeatureLoader;