/* neha-mktreffaral-19/09/24 */
import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Transaction from './transaction/Transaction';
import Setting from './Setting/Setting';
import Mreport from './Report/Mreport';


import ReferralTracking from './RefferalTracking/refferaltracknig';
import './mrktrefference.css'; // Ensure the CSS file is correctly named and linked
import ReferralReward from './Patient Referral Rewards/patientReferralRewards';
import CampaignManagement from './Marketing Campaigns/marketingcampaigns';
import PatientOutreach from './Marketing Campaigns/PatientOutreach/patientoutreach';

import './mrktrefference.css'; // Ensure the CSS file is correctly named and linked


const Mkrtrefrrance = () => {
  return (
    <>
      <header className="mkrt_ref-header">
        <nav>
          <ul className="mkrt_ref-header-nav">
            <NavLink
              to="Transaction"
              className={({ isActive }) => isActive ? 'mkrt_ref-header-button active' : 'mkrt_ref-header-button'}
            >
              <li>Transaction</li>
            </NavLink>
            <NavLink
              to="Setting"
              className={({ isActive }) => isActive ? 'mkrt_ref-header-button active' : 'mkrt_ref-header-button'}
            >
              <li>Setting</li>
            </NavLink>
            <NavLink
              to="Mreport"
              className={({ isActive }) => isActive ? 'mkrt_ref-header-button active' : 'mkrt_ref-header-button'}
            >
              <li>Report</li>
            </NavLink>

            <NavLink to="refferaltracking" className={({isActive})=>isActive?'mkrt_ref-header-button active' : 'mkrt_ref-header-button'}> 
              <li>Refferal Tracking</li>
            </NavLink>
            <NavLink to="patientrefferingreward" className={({isActive})=>isActive?'mkrt_ref-header-button active' : 'mkrt_ref-header-button'}>
              <li> Patinet Refferal Reward</li>
            </NavLink>
            <NavLink to="marketingcampaign" className={({isActive})=>isActive?'mkrt_ref-header-button active' : 'mkrt_ref-header-button'} >
              <li>Marketing Campaigns</li>
            </NavLink>
            <NavLink to="patientoutreach" className={({isActive})=>isActive?'mkrt_ref-header-button active' : 'mkrt_ref-header-button'}>
              <li>Patient Outreach</li>
            </NavLink>
          </ul>
        </nav>
      </header>
      <div className="mkrt_ref-main-content">
        <Routes>
          <Route path="Transaction" element={<Transaction />} />
          <Route path="Setting/*" element={<Setting />} />
          <Route path="Mreport" element={<Mreport />} />

          <Route path="refferaltracking" element={<ReferralTracking/>}></Route>
          <Route path="patientrefferingreward" element={<ReferralReward/>}></Route>
          <Route path="marketingcampaign" element={<CampaignManagement/>}></Route>
          <Route path="patientoutreach" element={<PatientOutreach/>}></Route>
        </Routes>
      </div>
    </>
  );
};

export default Mkrtrefrrance;
