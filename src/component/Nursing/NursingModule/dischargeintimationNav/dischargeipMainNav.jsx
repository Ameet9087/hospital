import React, { useState } from 'react';
import './DischargeipMainNav.css';
import NurseClearanceTable from './bubbleNurseClearence/bubblenurseclearence';
import ReceptionClearanceTable from './bubblereceptionclearence/bubbleclearencetable';
import PharmacyClearanceTable from './bubblePharmacyclearence/pharmacyclearencetable';
import DischargeClearanceTable from './dischargeclearence/dischargeclearencetable';

function DischargeipMainNav() {
  const [activeTab, setActiveTab] = useState('discharge-intimation');

  const renderContent = () => {
    switch (activeTab) {
     
      case 'bubble-nurse-clearance':
        return <NurseClearanceTable/>;
      case 'bubble-reception-clearance':
        return <ReceptionClearanceTable/>;
      case 'bubble-pharmacy-clearance':
        return <PharmacyClearanceTable/>;
      case 'bubble-discharge-clearance':
        return <DischargeClearanceTable/>;
      // case 'discharge-clearance':
      //   return <div>Discharge Clearance Content</div>;
      // case 'bubble-ip-discharge':
      //   return <div>Bubble IP Discharge Content</div>;
      default:
        return <div>Select an option to view content</div>;
    }
  };

  return (
    <div className="DischargeipMainNav">
      <nav>
        <ul className="nav-list">
          <li>
            <button
              onClick={() => setActiveTab('bubble-nurse-clearance')}
              className={`nav-link ${activeTab === 'bubble-nurse-clearance' ? 'active' : ''}`}
            >
              Bubble Nurse Clearance
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('bubble-reception-clearance')}
              className={`nav-link ${activeTab === 'bubble-reception-clearance' ? 'active' : ''}`}
            >
              Bubble Reception Clearance
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('bubble-pharmacy-clearance')}
              className={`nav-link ${activeTab === 'bubble-pharmacy-clearance' ? 'active' : ''}`}
            >
              Bubble Pharmacy Clearance
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('bubble-discharge-clearance')}
              className={`nav-link ${activeTab === 'bubble-discharge-clearance' ? 'active' : ''}`}
            >
              Bubble Discharge Clearance
            </button>
          </li>
          {/* <li>
            <button
              onClick={() => setActiveTab('discharge-clearance')}
              className={`nav-link ${activeTab === 'discharge-clearance' ? 'active' : ''}`}
            >
              Discharge Clearance
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('bubble-ip-discharge')}
              className={`nav-link ${activeTab === 'bubble-ip-discharge' ? 'active' : ''}`}
            >
              Bubble IP Discharge
            </button>
          </li> */}
        </ul>
      </nav>
      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default DischargeipMainNav;
