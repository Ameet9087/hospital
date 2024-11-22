// Prachi Parab vendorSupplymgmt 27-7-2024 backend+frontend merging 

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './VendorNavbar.css';

const VendorNavbar = () => {
  const location = useLocation(); // Get the current route location

  return (
    <nav className="vendor-navbar">
      <ul className="vendor-navbar-menu">
       
        <li>
          <Link 
            to="/superuser/vendorandsupplymanagement/purchase-order-acknowlegement" 
            className={`vendor-navbar-link ${location.pathname === '/purchase-order-acknowlegement' ? 'active' : ''}`}
          >
            Purchase Order from Hospital
          </Link>
        </li>
        <li>
          <Link 
            to="/superuser/vendorandsupplymanagement/purchase-order" 
            className={`vendor-navbar-link ${location.pathname === '/purchase-order' ? 'active' : ''}`}
          >
            Issue List of Items
          </Link>
        </li>
        <li>
          <Link 
            to="/superuser/vendorandsupplymanagement/QuotationForm" 
            className={`vendor-navbar-link ${location.pathname === '/QuotationForm' ? 'active' : ''}`}
          >
            Quotation Form
          </Link>
        </li>
        <li>
          <Link 
            to="/superuser/vendorandsupplymanagement/invoice" 
            className={`vendor-navbar-link ${location.pathname === '/invoice' ? 'active' : ''}`}
          >
            Invoice Form
          </Link>
        </li>
        <li>
          <Link 
            to="/superuser/vendorandsupplymanagement/InvoiceListItems" 
            className={`vendor-navbar-link ${location.pathname === '/InvoiceListItems' ? 'active' : ''}`}
          >
           Invoice List Items
          </Link>
        </li>
        <li>
          <Link 
            to="/superuser/vendorandsupplymanagement/report" 
            className={`vendor-navbar-link ${location.pathname === '/report' ? 'active' : ''}`}
          >
            Report Generation Form
          </Link>
        </li>
       
      </ul>
    </nav>
  );
};

export default VendorNavbar;
