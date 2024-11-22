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
              to="/mktreferral/transaction"
              className={({ isActive }) => isActive ? 'mkrt_ref-header-button active' : 'mkrt_ref-header-button'}
            >
              <li>Transaction</li>
            </NavLink>
            <NavLink
              to="/mktreferral/setting"
              className={({ isActive }) => isActive ? 'mkrt_ref-header-button active' : 'mkrt_ref-header-button'}
            >
              <li>Setting</li>
            </NavLink>
            <NavLink
              to="/mktreferral/report"
              className={({ isActive }) => isActive ? 'mkrt_ref-header-button active' : 'mkrt_ref-header-button'}
            >
              <li>Report</li>
            </NavLink>

            <NavLink to="/mktreferral/referraltracking" className={({isActive})=>isActive?'mkrt_ref-header-button active' : 'mkrt_ref-header-button'}> 
              <li>Refferal Tracking</li>
            </NavLink>
            <NavLink to="/mktreferral/patientreferralreward" className={({isActive})=>isActive?'mkrt_ref-header-button active' : 'mkrt_ref-header-button'}>
              <li> Patinet Refferal Reward</li>
            </NavLink>
            <NavLink to="/mktreferral/marketingcampaigns" className={({isActive})=>isActive?'mkrt_ref-header-button active' : 'mkrt_ref-header-button'} >
              <li>Marketing Campaigns</li>
            </NavLink>
            <NavLink to="/mktreferral/patientoutreach" className={({isActive})=>isActive?'mkrt_ref-header-button active' : 'mkrt_ref-header-button'}>
              <li>Patient Outreach</li>
            </NavLink>
          </ul>
        </nav>
      </header>
      <div className="mkrt_ref-main-content">
        <Routes>
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/setting/*" element={<Setting />} />
          <Route path="/report" element={<Mreport />} />

          <Route path="/referraltracking" element={<ReferralTracking/>}></Route>
          <Route path="/patientreferralreward" element={<ReferralReward/>}></Route>
          <Route path="/marketingcampaigns" element={<CampaignManagement/>}></Route>
          <Route path="/patientoutreach" element={<PatientOutreach/>}></Route>
        </Routes>
      </div>
    </>
  );
};

export default Mkrtrefrrance;
