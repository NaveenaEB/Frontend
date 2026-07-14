import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="container">
        <Sidebar />
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;