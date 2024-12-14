import React from 'react';
import Sidebar from './Sidebar.js';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-60 w-full p-8">{children}</div>
    </div>
  );
};

export default Layout;
