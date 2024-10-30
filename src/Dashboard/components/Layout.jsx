// Layout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="hrmsLayout">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className={`hrmsLayoutMainContent ${isOpen ? '' : 'content-expanded'}`}>
        <Outlet /> {/* This renders the selected component based on the nested route */}
      </main>
    </div>
  );
};

export default Layout;
