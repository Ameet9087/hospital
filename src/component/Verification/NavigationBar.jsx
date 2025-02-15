import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  const location = useLocation();

  // Determine active tab based on the current pathname
  const getActiveTab = () => {
    if (location.pathname.includes('/verification/inventory')) return 'Inventory';
    if (location.pathname.includes('/verification/pharmacy')) return 'Pharmacy';
    if (location.pathname.includes('/verification/opdcanclepostapproval')) return 'opdcanclepostapproval';
    // if (location.pathname.includes('/verification/identityverification')) return 'identity-verification';
    // if (location.pathname.includes('/verification/insuranceverification')) return 'insurance';
    return '';
  };

  const activeTab = getActiveTab();

  return (
    <div className="navigationBarContainer">
      {/* Sidebar Tabs */}
      <div className="navigationBarTabMenu">
        <NavLink
          to="/verification/inventory"
          className={({ isActive }) =>
            `navigationBarTabButton ${isActive ? 'navigationBarActive' : ''}`
          }
        >
          Inventory
        </NavLink>
        <NavLink
          to="/verification/pharmacy"
          className={({ isActive }) =>
            `navigationBarTabButton ${isActive ? 'navigationBarActive' : ''}`
          }
        >
          Pharmacy
        </NavLink>
        <NavLink
          to="/verification/opdcanclepostapproval"

          className={({ isActive }) =>
            `navigationBarTabButton ${isActive ? 'navigationBarActive' : ''}`
          }
        >
          Opd Billing Cancle and post Discount Approval
        </NavLink>

        {/* <NavLink
          to="/verification/identityverification"
          className={({ isActive }) =>
            `navigationBarTabButton ${isActive ? 'navigationBarActive' : ''}`
          }
        >
          Identity Verification
        </NavLink>
        <NavLink
          to="/verification/insuranceverification"
          className={({ isActive }) =>
            `navigationBarTabButton ${isActive ? 'navigationBarActive' : ''}`
          }
        >
          Insurance Verification
        </NavLink> */}
      </div>

      {/* Action Buttons */}
      <div className="navigationBarActionButtons">
        {activeTab === 'Inventory' && (
          <>
            <Link to="/verification/inventory/requisition">
              <button className="navigationBarActionButton">Requisition</button>
            </Link>
            <Link to="/verification/inventory/purchase-request">
              <button className="navigationBarActionButton">Purchase Request</button>
            </Link>
            {/* <Link to="/verification/inventory/verify-purchase-order">
              <button className="navigationBarActionButton">Purchase Order</button>
            </Link> */}
            {/* <Link to="/verification/inventory/gr-quality-inspection">
              <button className="navigationBarActionButton">GR Quality Inspection</button>
            </Link> */}
          </>
        )}
        {activeTab === 'Pharmacy' && (
          <>
            <Link to="/verification/pharmacy/verify-purchase-order">
              <button className="navigationBarActionButton">Purchase Order</button>
            </Link>
            <Link to="/verification/pharmacy/requisitionPharmacy">
              <button className="navigationBarActionButton">Requisition</button>
            </Link>
          </>
        )}
        {activeTab === 'document-verification' && (
          <>
            <Link to="/verification/document&employmentverification/employee-verification">
              <button className="navigationBarActionButton">Employee Verification</button>
            </Link>
            <Link to="/verification/document&employmentverification/patient-verification">
              <button className="navigationBarActionButton">Patient Verification</button>
            </Link>
          </>
        )}
        {activeTab === 'identity-verification' && (
          <>
            <Link to="/verification/identityverification/employee-identity-verification">
              <button className="navigationBarActionButton">Employee Identity Verification</button>
            </Link>
            <Link to="/verification/identityverification/patient-identity-verification">
              <button className="navigationBarActionButton">Patient Identity Verification</button>
            </Link>
          </>
        )}
        {activeTab === 'insurance' && (
          <>
            <Link to="/verification/insuranceverification/employee-insurance-verification">
              <button className="navigationBarActionButton">Employee Insurance Verification</button>
            </Link>
            <Link to="/verification/insuranceverification/patient-insurance-verification">
              <button className="navigationBarActionButton">Patient Insurance Verification</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavigationBar;
