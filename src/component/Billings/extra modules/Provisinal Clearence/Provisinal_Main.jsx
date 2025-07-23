import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Outpatientander from './outpatientander';
import ProvisinalDischargeList from './provisinalDischageList';
import Outpatientview from './outpatientview';
import './Provisinal_Main.css';

function Provisinal_Main() {
  return (
    <div>
      <header className='provision_cl_main_header'>
        <nav className='provision_cl_main_nav'>
          <ul className='provision_cl_main_ul'>
            <li className='provisinal_clearence_links'>
              <NavLink
                to="out-patient-ander"
                className={({ isActive }) => 
                  isActive ? 'provisinal_clearence_links-active doto' : 'provisinal_clearence_links doto'}
              >
                Outpatient & ER
              </NavLink>
            </li>
            <li className='provisinal_clearence_links'>
              <NavLink
                to="provisinaldischargelist"
                className={({ isActive }) => 
                  isActive ? 'provisinal_clearence_links-active doto' : 'provisinal_clearence_links doto'}
              >
                Provisional Discharge List
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <Routes>
          {/* Nested Routes relative to "/Provisinal_clearence" */}
          <Route path="out-patient-ander" element={<Outpatientander />} />
          <Route path="Outpatientview" element={<Outpatientview />} />
          <Route path="provisinaldischargelist" element={<ProvisinalDischargeList />} />
        </Routes>
      </div>
    </div>
  );
}

export default Provisinal_Main;
