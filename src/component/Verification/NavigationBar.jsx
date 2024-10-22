// export default NavigationBar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  const [activeTab, setActiveTab] = useState('Inventory');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="navigationBarContainer">
      <div className="navigationBarTabMenu">
        <button
          className={`navigationBarTabButton ${activeTab === 'Inventory' ? 'navigationBarActive' : ''}`}
          onClick={() => handleTabClick('Inventory')}
        >
          Inventory
        </button>
        <button
          className={`navigationBarTabButton ${activeTab === 'Pharmacy' ? 'navigationBarActive' : ''}`}
          onClick={() => handleTabClick('Pharmacy')}
        >
          Pharmacy
        </button>
       
        <button
          className={`navigationBarTabButton ${activeTab === 'document-verification' ? 'navigationBarActive' : ''}`}
          onClick={() => handleTabClick('document-verification')}
        >
          Document & Employment Verification
        </button>

        <button
          className={`navigationBarTabButton ${activeTab === 'identity-verification' ? 'navigationBarActive' : ''}`}
          onClick={() => handleTabClick('identity-verification')}
        >
           Identity Verification
        </button>

        <button
          className={`navigationBarTabButton ${activeTab === 'insurance' ? 'navigationBarActive' : ''}`}
          onClick={() => handleTabClick('insurance')}
        >
           Insurance Verification
        </button>


      </div>
      <div className='navigationBarActionButtons'>
        {activeTab === 'Inventory' && (
          <>
            <Link to="/requisition">
              <button className='navigationBarActionButton'>Requisition</button>
            </Link>
            <Link to="/purchase-request">
              <button className='navigationBarActionButton'>Purchase Request</button>
            </Link>
            <Link to="/verify-purchase-order">
              <button className='navigationBarActionButton'>Purchase Order</button>
            </Link>
            <Link to="/gr-quality-inspection">
              <button className='navigationBarActionButton'>GR Quality Inspection</button>
            </Link>
          </>
        )}
        {activeTab === 'Pharmacy' && (
          <>
            <Link to="/verify-purchase-order">
              <button className='navigationBarActionButton'>Purchase Order</button>
            </Link>
            <Link to="/requisitionPharmacy">
              <button className='navigationBarActionButton'>Requisition</button>
            </Link>
          </>
        )}


       {activeTab === 'document-verification' && (
          <>
            <Link to="/employee-verification">
              <button className='navigationBarActionButton'> Employee Verification</button>
            </Link>
            <Link to="/patient-verification">
              <button className='navigationBarActionButton'> Patient Verification</button>
            </Link>
          </>
        )}
          {activeTab === 'identity-verification' && (
          <>
            <Link to="/employee-identity-verification">
              <button className='navigationBarActionButton'> Employee Identity Verification</button>
            </Link>
            <Link to="/patient-identity-verification">
              <button className='navigationBarActionButton'>Patient Identity Verification </button>
            </Link>
          </>
        )}
        {activeTab === 'insurance' && (
          <>
            <Link to="/employee-insurance-verification">
              <button className='navigationBarActionButton'>Employee Insurance Verification</button>
            </Link>
            <Link to="/patient-insurance-verification">
              <button className='navigationBarActionButton'> Patient Insurance Verification</button>
            </Link>
          </>
        )}

      </div>
    </div>
  );
}

export default NavigationBar;
