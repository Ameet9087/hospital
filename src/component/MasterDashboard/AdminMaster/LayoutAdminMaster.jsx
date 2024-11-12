
import React from 'react';
import Navigation from './Navigation';
import '../Reports/Layout.css';

function LayoutAdminMaster({ children }) {
    return (
        <div className="layout">
          
            <main>{children}</main>
        </div>
    );
}

export default LayoutAdminMaster;