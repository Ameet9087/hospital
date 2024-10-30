// src/EmployeeHeader.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EmployeeTable.css';

const EmployeeHeader = ({ onNavClick }) => {
  const [activeNav, setActiveNav] = useState(null);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const handleNavClick = (navType) => {
    setActiveNav(navType);  // Set the active navigation item
  };

  return (
    <>
      <header className="employee-header">
        <nav>
          <ul className="employee-header-form">
            <li onClick={() => handleNavClick('department')}
             className={activeNav === 'department' ? 'active' : ''}

              >Departments</li>
            <li onClick={() => handleNavClick('radiology')}
              className={activeNav === 'radiology' ? 'active' : ''}
              >Radiology</li> 
            <li onClick={() => handleNavClick('adt')}
             className={activeNav === 'adt' ? 'active' : ''}   >ADT</li>
            <li onClick={() => handleNavClick('security')}              className={activeNav === 'security' ? 'active' : ''}
            >Security</li>

            <li onClick={() => handleNavClick('billing')}              className={activeNav === 'billing' ? 'active' : ''}
            >Billing</li> 

            <li onClick={() => handleNavClick('employee')}              className={activeNav === 'employee' ? 'active' : ''}
            >Employee</li>
            {/* <li onClick={() => handleNavClick('geolocation')}              className={activeNav === 'geolocation' ? 'active' : ''}
            >Geolocation</li> Added onClick */}
            <li onClick={() => handleNavClick('clinical')}              className={activeNav === 'clinical' ? 'active' : ''}
            >Clinical</li> 
            {/* <li><Link to= '/manage-tax' className='SettingLinks'>Manage Tax</Link></li> 
            <li onClick={() => handleNavClick('dynamicTemplates')}              className={activeNav === 'dynamicTemplates' ? 'active' : ''}
            >Dynamic Templates</li> 
            <li><Link to= '/external-referrals' className='SettingLinks'>External Referrals</Link></li>
            <li><Link to= '/core-cfg-prmeter' className='SettingLinks'>Core CFG Parameters</Link></li>
             */}
      {/* <li><Link to="/manage-banks" className='SettingLinks'>Banks</Link></li>
      <li><Link to="/manage-printers" className='SettingLinks'>Printers</Link></li>
      <li><Link to="/print-export-configuration" className='SettingLinks'>PrintExport Configuration</Link></li>
      <li><Link to="/payment-mode-settings" className='SettingLinks'>Payment Mode Settings</Link></li>
      <li><Link to="/price-category" className='SettingLinks'>PriceCategory</Link></li> */}

          </ul>
        </nav>
      </header>
      {activeNav === 'employee' && (
        <div className="employee-sub-nav">
          <ul>
            <li><Link to="/manage-employee" >Manage Employee</Link></li>
            <li><Link to="/manage-employee-role" >Manage Employee Role</Link></li>
            <li><Link to="/manage-employee-type">Manage Employee Type</Link></li>
          </ul>
        </div>
      )}
      {activeNav === 'department' && (
        <div className="department-sub-nav">
          <ul>
            <li><Link to="/manage-department" >Manage Department</Link></li>
            <li><Link to="/manage-substore" >Manage Substore</Link></li>
            {/* <li><Link to="/manage-ward-substore" >Manage Ward Substore</Link></li> */}
          </ul>
        </div>
      )}
      {activeNav === 'adt' && (
        <div className="adt-sub-nav">
          <ul>
            <li><Link to="/manage-ward" >Manage Ward</Link></li>
            <li><Link to="/manage-bed-feature" >Manage Bed Feature</Link></li>
            <li><Link to="/manage-bed" >Manage Bed</Link></li>
            {/* <li><Link to="/manage-auto-add-billing-items" >Manage Auto Add Billing Items</Link></li>
            <li><Link to="/manage-bed-feature-scheme" >Manage Bed Feature Scheme And PriceCategory</Link></li>
            <li><Link to="/deposit-settings" >Deposit Settings</Link></li> */}
          </ul>
        </div>
      )}
      {activeNav === 'radiology' && (  /* Added Radiology sub-nav */
        <div className="radiology-sub-nav">
          <ul>
            <li><Link to="/manage-imaging-type">Manage Imaging Type</Link></li>
            <li><Link to="/manage-imaging-item" >Manage Imaging Item</Link></li>
            {/* <li><Link to="/manage-radiology-template" >Manage Radiology Template</Link></li> */}
            {/* <li><Link to="/default-signatories" >Default Signatories</Link></li> */}
          </ul>
        </div>
      )}
     {activeNav === 'security' && (
        <div className="security-sub-nav">
          <ul>
            <li><Link to="/manage-user" >Manage User</Link></li>
            <li><Link to="/manage-role" >Manage Role</Link></li>
          </ul>
        </div>
      )}
      {/* {activeNav === 'geolocation' && (  
        <div className="geolocation-sub-nav">
          <ul>
            <li><Link to="/manage-municipality" >Manage Municipality</Link></li>
            <li><Link to="/manage-country" >Manage Country</Link></li>
            <li><Link to="/manage-subdivision" >Manage SubDivision</Link></li>
          </ul>
        </div>
      )} */}
       {activeNav === 'clinical' && ( /* Added Clinical sub-nav */
        <div className="clinical-sub-nav">
          <ul>
            <li><Link to="/manage-reaction" >Manage Reaction</Link></li>
            <li><Link to="/icd-groups" >ICD Groups</Link></li>
            <li><Link to="/clinical-note" >Clinical Note</Link></li>
          </ul>
        </div>
      )}
       {/* {activeNav === 'dynamicTemplates' && ( 
        <div className="dynamic-templates-sub-nav">
          <ul>
            <li><Link to="/templates">Templates</Link></li>
            <li><Link to="/template-types" >Templates Types</Link></li>
            <li><Link to="/filed-master" >Filed Master</Link></li>
          </ul>
        </div>
      )} */}
      {/* {activeNav === 'billing' && ( 
        <div className="billing-sub-nav">
          <ul>
            <li><Link to="/map-ap-scheme" >Map AP Scheme And PriceCategory</Link></li>
            <li><Link to="/service-departments" >Service Departments</Link></li>
            <li><Link to="/deposit-heads" >Deposit Heads</Link></li>
            <li><Link to="/service-items">Service Items</Link></li>
            <li><Link to="/additional-service-items" >Additional Service Items</Link></li>
            <li><Link to="/billing-packages" >Billing Packages</Link></li>
            <li><Link to="/credit-organizations" >Credit Organizations</Link></li>
            <li><Link to="/schemes" >Schemes</Link></li>
            <li><Link to="/free-services-mapping">Free Services Mapping</Link></li>
            <li><Link to="/reporting-items-mapping">Reporting Items Mapping</Link></li>
            <li><Link to="/registration-sticker" >Registration Sticker</Link></li>
          </ul>
        </div>
      )} */}
     
    </>
  );
};

export default EmployeeHeader;
{/* <li>
<Link to="/manage-tax" onClick={() => onNavClick('ManageTax')}>
 
</Link>
</li>
<li>
<Link to="/external-referrals" onClick={() => onNavClick('ExternalReferrals')}>
 
</Link>
</li> */}