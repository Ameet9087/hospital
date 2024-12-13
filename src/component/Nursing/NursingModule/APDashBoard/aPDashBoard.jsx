import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './aPDashBoard.css';
import BedTransferNote from '../BedTranferNote/bedTranferNote';
import DischargeIntimtion from '../DischargeIntimtion/dischargeIntimtion';
import DischargeTrack from '../DischargeTrack/dischargeTrack';
import IpMedicineIndent from '../IPMedicineIndent/iPMedicineIndent';
import IpdReturnIndent from '../IpdReturnIndent/ipdReturnIndent';
import IPBilling from '../IPBilling/iPBilling';
import IpdIssueWard from '../IPDIssuedWard/ipdissuedward';
import { useSelector } from 'react-redux';
import PatientDashboard from '../../../DashBoards/PatientDashboard';
import IPChangeRoom from '../IPChangeRoom/IPChangeRoom';

const APDashBoard = () => {
  const activePatient = useSelector((state) => state.patient.activePatient);

  const navigate = useNavigate();
  const location = useLocation();
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const patientData = useSelector((state) => state.patient?.patientData);
  const { patientName, patientAge, patientGender, mrNo } = location.state || {};

  const handleSidebarItemClick = (item) => {
    console.log('Sidebar item clicked:', item);  // Debugging log
    setSelectedItem(selectedItem === item ? null : item);
    switch (item) {
      case 'Bed Transfer Note':
        setActiveComponent('bedTransferNote');
        break;
      case 'Discharge Intimtion':
        setActiveComponent('dischargeIntimtion');
        break;
      case 'Discharge Track':
        setActiveComponent('dischargeTrack');
        break;
      case 'Ip Medicine Indent':
        setActiveComponent('ipMedicineIndent');
        break;
      case 'Ipd Return Indent':
        setActiveComponent('ipdReturnIndent');
        break;
      case 'IP Billing':
        setActiveComponent('iPBilling');
        break;
      case 'IPD Issues Ward':
        setActiveComponent('ipdissuedward');
        break;
      case 'IPD Returns Ward':
        setActiveComponent('ipdreturnward');
        break;
      case 'Orders':
        setActiveComponent('Orders');
        break;
      case 'IP Change Room':
        setActiveComponent('IPChangeRoom');
        console.log('Active component set to: IPChangeRoom');  // Debugging log
        break;
      default:
        setActiveComponent(null);
    }
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'bedTransferNote':
        return <BedTransferNote />;
      case 'dischargeIntimtion':
        return <DischargeIntimtion />;
      case 'dischargeTrack':
        return <DischargeTrack />;
      case 'ipMedicineIndent':
        return <IpMedicineIndent />;
      case 'ipdReturnIndent':
        return <IpdReturnIndent />;
      case 'iPBilling':
        return <IPBilling />;
      case 'ipdissuedward':
        return <IpdIssueWard />;
      case 'ipdreturnward':
        return <IpdReturnIndent />;
      case 'Orders':
        return <PatientDashboard patient={patientData} />;
      case 'IPChangeRoom':
        return <IPChangeRoom />;
      default:
        return <section className="aPDashBoard-content">Select an option from the sidebar</section>;
    }
  };

  return (
    <div className="aPDashBoard-container">
      <header className="aPDashBoard-header">
        <div className="aPDashBoard-profile">
          <img src="profile-placeholder.png" alt="Profile" className="aPDashBoard-profile-pic" />
          <div className="aPDashBoard-profile-info">
            <h2>{patientName || 'Patient Name'}</h2>
            <p>
              Age: {patientAge || 'Age'} Years / {patientGender || 'Gender'} | MR No: {mrNo || 'MR No'}
            </p>
          </div>
        </div>
        <div className="aPDashBoard-header-right">
          <a href="#">Online Consultation</a>
          <a href="#">Show Grid</a>
          <a href="#">Hide Header</a>
          <a href="#">Refresh</a>
          <span className="aPDashBoard-time">07:20</span>
        </div>
      </header>
      <div className="aPDashBoard-main">
        {renderContent()}
        <aside className="aPDashBoard-sidebar-right">
          <ul>
            {[
              { text: 'Orders', value: 'Orders' },
              { text: '+ Bed Transfer Note', value: 'Bed Transfer Note' },
              { text: 'IP Change Room', value: 'IP Change Room' },
              { text: '+ Discharge Intimtion', value: 'Discharge Intimtion' },
              { text: '+ Discharge Tracking', value: 'Discharge Track' },
              { text: '+ IP Medicine Indent', value: 'Ip Medicine Indent' },
              { text: '+ IPD Returns Indent', value: 'Ipd Return Indent' },
              { text: '+ IP Billing', value: 'IP Billing' },
              { text: '+ IPD Issues Ward', value: 'IPD Issues Ward' },
              { text: '+ IPD Returns Ward', value: 'IPD Returns Ward' },
              { text: 'Exit', value: null },
            ].map((item, index) => (
              <li
                key={index}
                className={selectedItem === item.value ? 'selected' : ''}
                onClick={() => item.value !== null && handleSidebarItemClick(item.value)}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default APDashBoard;
